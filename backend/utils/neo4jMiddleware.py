from utils.connection import neo4j_connection_manager
from django.http import JsonResponse

# reference:
# https://docs.djangoproject.com/en/3.2/topics/http/middleware/
# https://medium.com/scalereal/everything-you-need-to-know-about-middleware-in-django-2a3bd3853cd6


class Neo4jConnectionMiddleware:
    def __init__(self, get_response) -> None:
        self.get_response = get_response
        self.white_list = ["/path/to/whitelist/"]

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.

        # check if the path is in the whitelist
        if self.is_whitelisted(request.path):
            return self.get_response(request)
        token_key = request.headers.get("Authorization")
        driver = neo4j_connection_manager.get_connection(token_key)
        if driver is None:
            return JsonResponse({"error": "Invalid credentials"}, status=401)
        if not driver.verify_authentication():
            return JsonResponse({"error": "Invalid credentials"}, status=401)
        request.driver = driver
        response = self.get_response(request)
        # Code to be executed for each request/response after
        # the view is called.
        return response

    def is_whitelisted(self, path):
        # Check if the path is in the whitelist
        return path in self.whitelist
