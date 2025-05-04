from neo4j import GraphDatabase
import json


class Neo4jConnection:

    search_history = {}  # Static dictionary to hold search queries
    query_id_counter = 1  # Initialize a counter for query IDs

    def __init__(self, uri, user, pwd):
        self.__uri = uri
        self.__user = user
        self.__pwd = pwd
        self.__driver = GraphDatabase.driver(self.__uri, auth=(self.__user, self.__pwd))

    def close(self):
        if self.__driver is not None:
            self.__driver.close()

    def execute_query(self, query, should_log=False):
        print(f"In execute_query, should_log={should_log}")
        with self.__driver.session() as session:
            result = session.run(query)
            # Execute a given query and log it.
            if should_log:
                self.log_search_query(query)
            return [record for record in result]

    def _sanitize_input(self, input_value):
        # 实现一个简单的清洁函数来避免注入
        return input_value.replace("`", "").replace("~", "")

    def match_all_node(self):
        cypher_query = f"""
        MATCH (n) RETURN n
        """

        result = self.execute_query(cypher_query)
        nodes_dict = {}
        for record in result:
            node = record["n"]
            labels = list(node.labels)  # 转换 labels 为列表
            element_id = node.element_id  # 获取节点的唯一标识符，假设使用的是公共API
            properties = dict(node)  # 获取节点的所有属性
            # 构造符合要求的字典结构
            nodes_dict[element_id] = {"labels": labels, "properties": properties}
        json_str = json.dumps(nodes_dict)
        return nodes_dict

    def match_all_relationship(self):
        cypher_query = f"""
        MATCH (a)-[r]->(b) RETURN r
        """
        result = self.execute_query(cypher_query)
        nodes_dict = {}
        for record in result:
            relationship = record["r"]
            relationship_id = relationship.element_id
            start_node_id = relationship.nodes[0].element_id
            end_node_id = relationship.nodes[1].element_id
            properties = dict(relationship)
            transformed_data = {
                "node_id": [start_node_id, end_node_id],
                "type": relationship.type,
                "properties": properties,
            }
            nodes_dict[relationship_id] = transformed_data
        return nodes_dict

    def dashboard(self):
        labels_query = "CALL db.labels()"
        labels_result = self.execute_query(labels_query)
        labels = [record[0] for record in labels_result]
        relationships_query = "CALL db.relationshipTypes()"
        relationships_result = self.execute_query(relationships_query)
        relationships = [record[0] for record in relationships_result]
        dashboard = {"labels": labels, "relationship_types": relationships}
        return dashboard

    def dashboard_match(self, dict_):
        return_data = ""
        if "relationship_type" in dict_:
            relationship_type = dict_["relationship_type"]
            query = "MATCH (a)-[:{}]->(b) RETURN a AS node UNION MATCH (a)-[:{}]->(b) RETURN b AS node;".format(
                relationship_type, relationship_type
            )
            result = self.execute_query(query)
            nodes_dict = {}
            for record in result:
                node = record["node"]
                labels = list(node.labels)  # 转换 labels 为列表
                element_id = (
                    node.element_id
                )  # 获取节点的唯一标识符，假设使用的是公共API
                properties = dict(node)  # 获取节点的所有属性
                # 构造符合要求的字典结构
                nodes_dict[element_id] = {"labels": labels, "properties": properties}
            query2 = "MATCH (a)-[r:{}]-(b) RETURN r".format(relationship_type)
            result2 = self.execute_query(query2)
            nodes_dict2 = {}
            for record in result2:
                relationship = record["r"]
                relationship_id = relationship.element_id
                start_node_id = relationship.nodes[0].element_id
                end_node_id = relationship.nodes[1].element_id
                properties = dict(relationship)
                transformed_data = {
                    "node_id": [start_node_id, end_node_id],
                    "type": relationship.type,
                    "properties": properties,
                }
                nodes_dict2[relationship_id] = transformed_data
            return_data = {"nodes": nodes_dict, "relationships": nodes_dict2}
            return_data = json.dumps(return_data)
            return return_data
        if "label" in dict_:
            label = dict_["label"]
            query = "MATCH (r:{}) RETURN r".format(label)
            result = self.execute_query(query)
            nodes_dict = {}
            for record in result:
                node = record["r"]
                labels = list(node.labels)  # 转换 labels 为列表
                element_id = (
                    node.element_id
                )  # 获取节点的唯一标识符，假设使用的是公共API
                properties = dict(node)  # 获取节点的所有属性
                # 构造符合要求的字典结构
                nodes_dict[element_id] = {"labels": labels, "properties": properties}
                return_data = {"nodes": nodes_dict}
                return_data = json.dumps(return_data)
            return return_data

    def color(self):
        query1 = "MATCH (n) RETURN DISTINCT labels(n) AS Labels"
        query2 = "MATCH ()-[r]->() RETURN DISTINCT type(r) AS RelationshipTypes"
        result1 = self.execute_query(query1)
        result2 = self.execute_query(query2)
        list1 = []
        list2 = []
        for record in result1:
            list_ = {}
            list_["name"] = record["Labels"][0]
            list_["color"] = "undefined"
            list1.append(list_)
        for record in result2:
            list_ = {}
            list_["name"] = record["RelationshipTypes"]
            list_["color"] = "undefined"
            list2.append(list_)
        return_data = {"Labels": list1, "Links": list2}
        return_data = json.dumps(return_data)
        return return_data

    def match_all_attribute(self):
        cypher_query = f"""
        MATCH (n)
        UNWIND keys(n) AS key
        WITH collect(DISTINCT key) AS allKeys
        RETURN allKeys
        """
        attribute_dict = {}
        result = self.execute_query(cypher_query)
        return result[0]["allKeys"]

    def match_all_relationship_type(self):
        cypher_query = f"""
        MATCH ()-[r]->()
        RETURN DISTINCT type(r) AS RelationshipType
        """
        result = self.execute_query(cypher_query)
        relationship_type = []
        for record in result:
            record = record["RelationshipType"]
            relationship_type.append(record)

        return relationship_type

    def match_norelationship(self, label, attributes, should_log=False):
        # 初始化一个空的列表来存储每个属性的查询条件
        query_conditions = []

        # 遍历属性字典
        for key, value in attributes.items():
            # 尝试将值转换为整数
            value = value.split(" ", 1)
            try:
                float_value = float(value[1])
                # 检查浮点数是否为整数
                if float_value.is_integer():
                    # 如果是整数，使用整数值构建查询条件字符串
                    condition = f"n.{key} {value[0]} {int(float_value)}"
                else:
                    # 如果不是整数，使用浮点数值构建查询条件字符串
                    condition = f"n.{key} {value[0]} {float_value}"
            except ValueError:
                # 如果转换失败，直接使用原始值构建查询条件字符串
                # 注意：这里假设非整数值都是字符串，需要加引号
                condition = f"n.{key} {value[0]} '{value[1]}'"

            # 将查询条件字符串添加到列表中
            query_conditions.append(condition)

        # 使用 ' AND ' 将所有查询条件连接起来形成完整的查询条件字符串
        if len(query_conditions) > 0:
            attributes_cypher = " AND ".join(query_conditions)

            cypher_query = f"MATCH (n:{label}) WHERE " + attributes_cypher + " RETURN n"
        else:
            cypher_query = f"MATCH (n:{label}) RETURN n"

        result = self.execute_query(cypher_query, should_log=should_log)
        nodes_dict = {}
        for record in result:
            node = record["n"]
            labels = list(node.labels)  # 转换 labels 为列表
            element_id = node.element_id  # 获取节点的唯一标识符，假设使用的是公共API
            properties = dict(node)  # 获取节点的所有属性
            # 构造符合要求的字典结构
            nodes_dict[element_id] = {"labels": labels, "properties": properties}
        return_data = {"nodes": nodes_dict}
        return return_data

    def match_withrelationship(
        self,
        label1,
        label2,
        attribute1,
        attribute2,
        relationship_type,
        relationship_attribute,
        should_log=False,
    ):
        query_condition = []

        if len(attribute1) != 0:
            for key, value in attribute1.items():
                value = value.split(" ", 1)
                try:
                    float_value = float(value[1])
                    # 检查浮点数是否为整数
                    if float_value.is_integer():
                        # 如果是整数，使用整数值构建查询条件字符串
                        condition = f"label1.{key} {value[0]} {int(float_value)}"
                    else:
                        # 如果不是整数，使用浮点数值构建查询条件字符串
                        condition = f"label1.{key} {value[0]} {float_value}"
                except ValueError:
                    # 如果转换失败，直接使用原始值构建查询条件字符串
                    # 注意：这里假设非整数值都是字符串，需要加引号
                    condition = f"label1.{key} {value[0]} '{value[1]}'"
                query_condition.append(condition)
        if len(attribute2) != 0:
            for key, value in attribute2.items():
                value = value.split(" ", 1)
                try:
                    float_value = float(value[1])
                    # 检查浮点数是否为整数
                    if float_value.is_integer():
                        # 如果是整数，使用整数值构建查询条件字符串
                        condition = f"label2.{key} {value[0]} {int(float_value)}"
                    else:
                        # 如果不是整数，使用浮点数值构建查询条件字符串
                        condition = f"label2.{key} {value[0]} {float_value}"
                except ValueError:
                    # 如果转换失败，直接使用原始值构建查询条件字符串
                    # 注意：这里假设非整数值都是字符串，需要加引号
                    condition = f"label2.{key} {value[0]} '{value[1]}'"
                query_condition.append(condition)
        if len(relationship_attribute) != 0:
            for key, value in relationship_attribute.items():
                value = value.split(" ", 1)
                try:
                    float_value = float(value[1])
                    # 检查浮点数是否为整数
                    if float_value.is_integer():
                        # 如果是整数，使用整数值构建查询条件字符串
                        condition = (
                            f"relationship_type.{key} {value[0]} {int(float_value)}"
                        )
                    else:
                        # 如果不是整数，使用浮点数值构建查询条件字符串
                        condition = f"relationship_type.{key} {value[0]} {float_value}"
                except ValueError:
                    # 如果转换失败，直接使用原始值构建查询条件字符串
                    # 注意：这里假设非整数值都是字符串，需要加引号
                    condition = f"relationship_type.{key} {value[0]} '{value[1]}'"
                query_condition.append(condition)

        if label1 != "" and label2 != "":
            if len(query_condition) != 0:
                attributes_cypher = " AND ".join(query_condition)
                cypher_query = (
                    f"MATCH (label1:{label1}) - [relationship_type:{relationship_type}] -> (label2:{label2}) WHERE "
                    + attributes_cypher
                    + " RETURN label1, relationship_type, label2"
                )
            else:
                cypher_query = f"MATCH (label1:{label1}) - [relationship_type:{relationship_type}] -> (label2:{label2}) RETURN label1, relationship_type, label2"
            result = self.execute_query(cypher_query, should_log=should_log)

        if label1 == "" and label2 != "":
            if len(query_condition) != 0:
                attributes_cypher = " AND ".join(query_condition)
                cypher_query = (
                    f"MATCH (label1) - [relationship_type:{relationship_type}] -> (label2:{label2}) WHERE "
                    + attributes_cypher
                    + " RETURN label1, relationship_type, label2"
                )
            else:
                cypher_query = f"MATCH (label1) - [relationship_type:{relationship_type}] -> (label2:{label2}) RETURN label1, relationship_type, label2"
            result = self.execute_query(cypher_query, should_log=should_log)

        if label1 != "" and label2 == "":
            if len(query_condition) != 0:
                attributes_cypher = " AND ".join(query_condition)
                cypher_query = (
                    f"MATCH (label1:{label1}) - [relationship_type:{relationship_type}] -> (label2) WHERE "
                    + attributes_cypher
                    + " RETURN label1, relationship_type, label2"
                )
            else:
                cypher_query = f"MATCH (label1:{label1}) - [relationship_type:{relationship_type}] -> (label2) RETURN label1, relationship_type, label2"
            result = self.execute_query(cypher_query, should_log=should_log)
        if label1 == "" and label2 == "":
            if len(query_condition) != 0:
                attributes_cypher = " AND ".join(query_condition)
                cypher_query = (
                    f"MATCH (label1) - [relationship_type:{relationship_type}] -> (label2) WHERE "
                    + attributes_cypher
                    + " RETURN label1, relationship_type, label2"
                )
            else:
                cypher_query = f"MATCH (label1) - [relationship_type:{relationship_type}] -> (label2) RETURN label1, relationship_type, label2"
            result = self.execute_query(cypher_query, should_log=should_log)

        nodes_dict_label1 = {}
        for record in result:
            node = record["label1"]
            labels = list(node.labels)  # 转换 labels 为列表
            element_id = node.element_id  # 获取节点的唯一标识符，假设使用的是公共API
            properties = dict(node)  # 获取节点的所有属性
            # 构造符合要求的字典结构
            nodes_dict_label1[element_id] = {"labels": labels, "properties": properties}
        nodes_dict_label2 = {}
        for record in result:
            node = record["label2"]
            labels = list(node.labels)  # 转换 labels 为列表
            element_id = node.element_id  # 获取节点的唯一标识符，假设使用的是公共API
            properties = dict(node)  # 获取节点的所有属性
            # 构造符合要求的字典结构
            nodes_dict_label2[element_id] = {"labels": labels, "properties": properties}
        nodes_dict_relationship = {}
        for record in result:
            relationship = record["relationship_type"]
            relationship_id = relationship.element_id
            start_node_id = relationship.nodes[0].element_id
            end_node_id = relationship.nodes[1].element_id
            properties = dict(relationship)
            transformed_data = {
                "node_id": [start_node_id, end_node_id],
                "type": relationship.type,
                "properties": properties,
            }
            nodes_dict_relationship[relationship_id] = transformed_data
        return_data = {
            "nodes": {**nodes_dict_label1, **nodes_dict_label2},
            "relationships": nodes_dict_relationship,
        }
        return return_data

    def match_withrelationship_new(self, my_dict, should_log=False):
        query_condition = []
        for key, value in my_dict.items():
            if len(value["attribute"]) != 0:
                for sub_key, sub_value in value["attribute"].items():
                    sub_value = sub_value.split(" ", 1)
                    try:
                        float_value = float(sub_value[1])
                        # 检查浮点数是否为整数
                        if float_value.is_integer():
                            # 如果是整数，使用整数值构建查询条件字符串
                            condition = (
                                f"{key}.{sub_key} {sub_value[0]} {int(float_value)}"
                            )
                        else:
                            # 如果不是整数，使用浮点数值构建查询条件字符串
                            condition = f"{key}.{sub_key} {sub_value[0]} {float_value}"
                    except ValueError:
                        # 如果转换失败，直接使用原始值构建查询条件字符串
                        # 注意：这里假设非整数值都是字符串，需要加引号
                        condition = f"{key}.{sub_key} {sub_value[0]} '{sub_value[1]}'"
                    query_condition.append(condition)
        cypher_query_top = ""
        number = 0
        for key, value in my_dict.items():
            if (number % 2) == 0:
                sub_content = " " + "(" + key + ":" + value["type"] + ")" + " -"
                cypher_query_top = cypher_query_top + sub_content
            else:
                sub_content = " " + "[" + key + ":" + value["type"] + "]" + " ->"
                cypher_query_top = cypher_query_top + sub_content
            number += 1
        cypher_query_top = cypher_query_top[::-1]
        cypher_query_top = cypher_query_top.replace("- ", "", 1)
        cypher_query_top = cypher_query_top[::-1]

        cypher_query_bottom = ""
        for key, value in my_dict.items():
            sub_content = " " + key + ","
            cypher_query_bottom = cypher_query_bottom + sub_content
        cypher_query_bottom = cypher_query_bottom[::-1]
        cypher_query_bottom = cypher_query_bottom.replace(",", "", 1)
        cypher_query_bottom = cypher_query_bottom[::-1]

        if len(query_condition) != 0:
            attributes_cypher = " AND ".join(query_condition)
            cypher_query = (
                "MATCH"
                + cypher_query_top
                + " "
                + "WHERE "
                + attributes_cypher
                + " "
                + "RETURN"
                + cypher_query_bottom
            )
        else:
            cypher_query = (
                "MATCH" + cypher_query_top + " " + "RETURN" + cypher_query_bottom
            )
        print(cypher_query)
        print(f"Calling execute_query with should_log={should_log}")
        result = self.execute_query(cypher_query, should_log=should_log)
        nodes_dict_label = {}
        nodes_dict_relationship = {}
        check = 0
        for key in my_dict.keys():
            if check % 2 == 0:
                for record in result:
                    node = record[key]
                    labels = list(node.labels)
                    element_id = node.element_id
                    properties = dict(node)
                    nodes_dict_label[element_id] = {
                        "labels": labels,
                        "properties": properties,
                    }
            else:
                for record in result:
                    relationship = record[key]
                    relationship_id = relationship.element_id
                    start_node_id = relationship.nodes[0].element_id
                    end_node_id = relationship.nodes[1].element_id
                    properties = dict(relationship)
                    transformed_data = {
                        "node_id": [start_node_id, end_node_id],
                        "type": relationship.type,
                        "properties": properties,
                    }
                    nodes_dict_relationship[relationship_id] = transformed_data
            check += 1
        return_data = {
            "nodes": nodes_dict_label,
            "relationships": nodes_dict_relationship,
        }

        return return_data

    @staticmethod
    def log_search_query(query):
        query_id = str(Neo4jConnection.query_id_counter)

        # Remove leading and trailing whitespace
        formatted_query = query.strip()
        Neo4jConnection.search_history[query_id] = formatted_query.replace('"', '"')
        Neo4jConnection.query_id_counter += 1

    @staticmethod
    def get_search_history():
        # Retrieve the search history.
        return Neo4jConnection.search_history

    @staticmethod
    def get_query_by_id(query_id):
        query_id = str(query_id)
        return Neo4jConnection.search_history.get(query_id)
