from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .neo4j_connection_query import Neo4jConnection
import json


class HistoryView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        history = Neo4jConnection.get_search_history()

        # Use safe=False if returning a list
        return JsonResponse(history, safe=False)


class ExecuteQueryView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        query = request.GET.get("query", "")
        if not query:
            return JsonResponse({"error": "No query provided"}, status=400)

        conn_info = request.session.get("neo4j_conn_info")
        if not conn_info:
            return JsonResponse(
                {"error": "Neo4j connection info not found in session"}, status=500
            )

        conn = Neo4jConnection(
            conn_info["URI"], conn_info["USER"], conn_info["PASSWORD"]
        )

        should_log = request.headers.get("Drawing-Record", "false").lower() == "true"
        if should_log:
            conn.log_search_query(query)

        result = conn.execute_query(query)
        if result is None:
            conn.close()
            return JsonResponse({"error": "Error executing query"}, status=500)

        transformed_result = self.transform_result(result)
        trans_result = json.dumps(transformed_result)
        conn.close()
        print(trans_result)
        return Response(trans_result)

    def transform_result(self, result):
        nodes_dict_label = {}
        nodes_dict_relationship = {}

        for record in result:
            for key, item in record.items():
                if hasattr(item, "labels"):
                    node_id = str(item.element_id)
                    nodes_dict_label[node_id] = {
                        "labels": list(item.labels),
                        "properties": dict(item),
                    }
                elif hasattr(item, "type"):
                    relationship_id = str(item.element_id)
                    start_node_id = str(item.nodes[0].element_id)
                    end_node_id = str(item.nodes[1].element_id)
                    nodes_dict_relationship[relationship_id] = {
                        "node_id": [start_node_id, end_node_id],
                        "type": item.type,
                        "properties": dict(item),
                    }
        return {
            "nodes": nodes_dict_label,
            "relationships": nodes_dict_relationship,
        }
