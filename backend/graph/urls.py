from django.urls import path
from .views import wholegraph, query, query_dashboard, color, login
from .historyViews import HistoryView, ExecuteQueryView

urlpatterns = [
    path("login", login.as_view(), name="abcd"),
    path("wholegraph", wholegraph.as_view(), name="abcd"),
    path("color", color.as_view(), name="abcd"),
    path("query", query.as_view(), name="abcd"),
    path("dashboard", query_dashboard.as_view(), name="abcd"),
    path("history", HistoryView.as_view(), name="search-history"),
    path(
        "history/search",
        ExecuteQueryView.as_view(),
        name="execute-history-query",
    ),
]
