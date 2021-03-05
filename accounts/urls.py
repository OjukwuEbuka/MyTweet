from django.urls import path, include
from .views import login_view
from knox import views as knox_views

urlpatterns = [
    path('', include('knox.urls')),
    path('login', login_view),
    path('logout', knox_views.LogoutView.as_view())
]