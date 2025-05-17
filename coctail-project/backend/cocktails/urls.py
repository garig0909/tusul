from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CocktailViewSet, RegisterView, UserProfileView

router = DefaultRouter()
router.register(r'cocktails', CocktailViewSet)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('', include(router.urls)),
]
