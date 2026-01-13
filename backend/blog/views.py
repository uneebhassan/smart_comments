from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response

from .models import Post, Comment
from .serializers import (
    PostListSerializer,
    PostDetailSerializer,
    CommentSerializer,
    MorderatorSerializer
)
from .classifier import classify_comment


class PostListView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer


class PostMorderatorView(generics.ListAPIView):
    queryset = Post.objects.filter(comments__flagged=True)
    serializer_class = MorderatorSerializer

class PostDetailView(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer


class AddCommentView(generics.CreateAPIView):
    serializer_class = CommentSerializer

    def create(self, request, *args, **kwargs):
        post = get_object_or_404(Post, id=kwargs["post_id"])

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        classification = classify_comment(
            serializer.validated_data["text"]
        )

        comment = Comment.objects.create(
            post=post,
            author=serializer.validated_data["author"],
            text=serializer.validated_data["text"],
            flagged=(classification == "needs_review"),
        )

        return Response(
            CommentSerializer(comment).data,
            status=status.HTTP_201_CREATED,
        )
