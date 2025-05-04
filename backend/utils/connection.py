from neo4j import GraphDatabase
from utils.tokenTooler import check_token, generate_token
from typing import Dict


class Neo4jConnectionManager:
    def __init__(self) -> None:
        self.connections = {}

    def get_connection(self, token_key: str):
        if token_key in self.connections:
            # check if the token is still valid
            payload = check_token(token_key)
            if payload == "Token is expired" or payload == "Token is invalid":
                self.close_connection(token_key)
                return None
            else:
                return self.connections[token_key]
        return None

    def close_connection(self, token_key: str):
        if token_key in self.connections:
            self.connections[token_key].close()
            del self.connections[token_key]

    def create_connection(self, database_info: Dict[str, str]) -> GraphDatabase.driver:
        """
        @args: database_info: {
            'url': 'bolt://localhost:7687',
            'username': 'neo4j',
            'password': 'password'
        }
        """
        token_key = generate_token(database_info)
        # if the connection is already created,
        # return the connection and the token key
        if self.get_connection(token_key):
            return self.get_connection(token_key), token_key
        # create a driver
        driver = GraphDatabase.driver(
            database_info["url"],
            auth=(database_info["username"], database_info["password"]),
        )
        self.connections[token_key] = driver
        return driver, token_key


neo4j_connection_manager = Neo4jConnectionManager()
