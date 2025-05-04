from django.urls import path
from .views import WholeGraph

urlpatterns = [
    path("whole_graph/", WholeGraph.as_view(), name="whole_graph"),
]
