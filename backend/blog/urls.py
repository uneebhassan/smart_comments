from django.urls import path
from .views import PostListView, PostDetailView, AddCommentView, PostMorderatorView

urlpatterns = [
    path("posts/", PostListView.as_view()),
    path("posts/morderator/", PostMorderatorView.as_view()),

    path("posts/<int:pk>/", PostDetailView.as_view()),
    path("posts/<int:post_id>/comments/", AddCommentView.as_view()),

]
