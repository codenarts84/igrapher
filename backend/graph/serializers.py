from rest_framework import serializers


class DynamicDictSerializer(serializers.Serializer):
    def to_internal_value(self, data):
        return data  # 直接返回接收到的数据，不做任何序列化处理
