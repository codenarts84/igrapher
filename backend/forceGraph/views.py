from rest_framework.response import Response
from rest_framework.views import APIView
from utils.connection import neo4j_connection_manager


class WholeGraph(APIView):
    # 127.0.0.1:8000/force_graph/whole_graph/
    def get(self, request):
        driver, token_key = neo4j_connection_manager.create_connection(
            {
                "url": "neo4j+s://ea5a7bfb.databases.neo4j.io",
                "username": "neo4j",
                "password": "9bHKhl755RCYTv9fO5MobU8fOdcmci8brPJzFBbf6Jc",
            }
        )
        # get data from headers
        if not driver.verify_authentication():
            return Response({"error": "Invalid credentials"})
        print(neo4j_connection_manager.connections)
        return Response({"data": token_key})

    def post(self, request):
        # get data from headers
        token_key = request.headers.get("Authorization")
        if not neo4j_connection_manager.connections.get(token_key):
            return Response({"error": "Invalid credentials"})
        driver = neo4j_connection_manager.get_connection(token_key)
        if not driver.verify_authentication():
            return Response({"error": "Invalid credentials"})
        with driver.session() as session:
            result = session.run("MATCH (n) RETURN n")
            nodes = []
            for record in result:
                nodes.append(record["n"])
        return Response({"data": nodes})
