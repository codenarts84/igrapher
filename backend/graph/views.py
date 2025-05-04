from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema
from .serializers import DynamicDictSerializer
from .neo4j_connection_query import Neo4jConnection
import logging
import json

CONN_INFO = {
    "URI": "neo4j+s://ea5a7bfb.databases.neo4j.io",
    "USER": "neo4j",
    "PASSWORD": "9bHKhl755RCYTv9fO5MobU8fOdcmci8brPJzFBbf6Jc",
}


class login(APIView):
    @swagger_auto_schema(request_body=DynamicDictSerializer)
    def post(self, request, *args, **kwargs):
        serializer = DynamicDictSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            data = serializer.validated_data
            # 将数据库连接信息存储在会话中
            logging.info(f"Connection info: {data}")
            request.session["neo4j_conn_info"] = {
                "URI": data["URI"],
                "USER": data["USER"],
                "PASSWORD": data["PASSWORD"],
            }
            try:
                # 尝试建立连接
                conn = Neo4jConnection(data["URI"], data["USER"], data["PASSWORD"])
                print(data["URI"], data["USER"], data["PASSWORD"])
                conn.color()  # 关闭连接，因为此时我们只是在验证凭据
                conn.close()
                return Response("OK")
            except Exception:
                # 如果连接失败（例如，因为认证信息错误），则捕获异常并返回相应的错误消息
                return Response("Wrong Password")
        else:
            return Response(serializer.errors, status=400)


class wholegraph(APIView):
    permission_classes = [AllowAny]

    def get(self, request, format=None):
        # conn_info = request.session.get("neo4j_conn_info")
        conn_info = CONN_INFO
        # if conn_info is None:
        #     logging.error("No connection information found in session")
        #     return Response(
        #         {"error": "No connection information found in session"},
        #         status=400
        #     )
        conn = Neo4jConnection(
            conn_info["URI"], conn_info["USER"], conn_info["PASSWORD"]
        )
        all_nodes = conn.match_all_node()
        all_relationships = conn.match_all_relationship()
        start_data = {"nodes": all_nodes, "relationships": all_relationships}
        json_start_data = json.dumps(start_data)
        conn.close()
        return Response(json_start_data)


class color(APIView):
    permission_classes = [AllowAny]

    def get(self, request, format=None):
        # conn_info = request.session.get("neo4j_conn_info")
        conn_info = CONN_INFO
        conn = Neo4jConnection(
            conn_info["URI"], conn_info["USER"], conn_info["PASSWORD"]
        )
        return_data = conn.color()
        conn.close()
        return Response(return_data)


class query_dashboard(APIView):
    permission_classes = [AllowAny]

    def get(self, request, format=None):
        # conn_info = request.session.get("neo4j_conn_info")
        conn_info = CONN_INFO
        conn = Neo4jConnection(
            conn_info["URI"], conn_info["USER"], conn_info["PASSWORD"]
        )
        dashboard_data = conn.dashboard()
        json_dashboard_data = json.dumps(dashboard_data)
        conn.close()
        return Response(json_dashboard_data)

    @swagger_auto_schema(request_body=DynamicDictSerializer)
    def post(self, request, *args, **kwargs):
        # conn_info = request.session.get("neo4j_conn_info")
        conn_info = CONN_INFO
        conn = Neo4jConnection(
            conn_info["URI"], conn_info["USER"], conn_info["PASSWORD"]
        )
        serializer = DynamicDictSerializer(data=request.data)

        # 直接调用.is_valid()来尝试对数据进行验证/转换
        if serializer.is_valid(raise_exception=True):
            # 由于DynamicDictSerializer的to_internal_value方法直接返回数据，
            # serializer.validated_data将包含原始请求数据
            data = serializer.validated_data
            json_match_data = conn.dashboard_match(data)
            conn.close()
            return Response(json_match_data)
        else:
            # 如果数据不符合基本的格式要求（例如，不是有效的JSON），返回错误
            return Response(serializer.errors, status=400)


class query(APIView):
    permission_classes = [AllowAny]

    def get(self, request, format=None):
        # conn_info = request.session.get("neo4j_conn_info")
        conn_info = CONN_INFO
        conn = Neo4jConnection(
            conn_info["URI"], conn_info["USER"], conn_info["PASSWORD"]
        )
        all_attribute = conn.match_all_attribute()
        all_relationship_type = conn.match_all_relationship_type()
        query_start_data = {
            "attributes": all_attribute,
            "relationship_types": all_relationship_type,
        }
        json_query_start_data = json.dumps(query_start_data)
        conn.close()
        return Response(json_query_start_data)

    @swagger_auto_schema(request_body=DynamicDictSerializer)
    def post(self, request, *args, **kwargs):
        # conn_info = request.session.get("neo4j_conn_info")
        conn_info = CONN_INFO
        conn = Neo4jConnection(
            conn_info["URI"], conn_info["USER"], conn_info["PASSWORD"]
        )
        # Check if the 'Drawing-Record' header is present and set to 'true'
        should_log = request.headers.get("Drawing-Record", "").lower() == "true"

        serializer = DynamicDictSerializer(data=request.data)

        # 直接调用.is_valid()来尝试对数据进行验证/转换
        if serializer.is_valid(raise_exception=True):
            # 由于DynamicDictSerializer的to_internal_value方法直接返回数据，
            # serializer.validated_data将包含原始请求数据
            data = serializer.validated_data

            match_data = conn.match_withrelationship_new(data, should_log=should_log)
            json_match_data = json.dumps(match_data)
            # 根据你的需要处理data
            # 例如，你可以直接返回这些数据，或者进行一些业务逻辑处理
            conn.close()
            print(json_match_data)
            print(f"should_log in view: {should_log}")
            return Response(json_match_data)
        else:
            # 如果数据不符合基本的格式要求（例如，不是有效的JSON），返回错误
            return Response(serializer.errors, status=400)


# 关闭连接
# conn.close()
