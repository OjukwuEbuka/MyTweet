from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework.test import APIClient

from .models import Tweet
# Create your tests here.
User = get_user_model()


class TweetTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='Ebuka', password='testpword')
        self.user2 = User.objects.create_user(username='Ebuka2', password='testpword')
        Tweet.objects.create(content="First Test tweet", user=self.user)
        Tweet.objects.create(content="Second Test tweet", user=self.user)
        Tweet.objects.create(content="3rd Test tweet", user=self.user2)
        self.current_count = Tweet.objects.all().count()
        # User.objects.create_user(username='obi', password='testpword')

    """def test_user_exists(self):
        self.assertEqual(self.user.username, 'Ebuka')"""

    def test_tweet_created(self):
        tweet_obj = Tweet.objects.create(content="Test tweet", user=self.user)
        self.assertEqual(tweet_obj.id, 4)
        self.assertEqual(tweet_obj.user, self.user)

    def get_client(self):
        client = APIClient()
        client.login(username=self.user.username, password='testpword')
        return client
        
    def test_tweet_list(self):
        client = self.get_client()
        response = client.get("/api/tweets/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)
        # print(response.json())

    def test_action_like(self):
        client = self.get_client()
        response = client.post("/api/tweets/action", {"id":1, "action": "like"})
        self.assertEqual(response.status_code, 200)
        like_count = response.json().get("likes")
        self.assertEqual(like_count, 1)
        print(response.json())
    
    def test_action_unlike(self):
        client = self.get_client()
        response = client.post("/api/tweets/action", {"id":2, "action": "like"})
        self.assertEqual(response.status_code, 200)
        response = client.post("/api/tweets/action", {"id":2, "action": "unlike"})
        self.assertEqual(response.status_code, 200)
        like_count = response.json().get("likes")
        self.assertEqual(like_count, 0)
        print(response.json())

    def test_action_retweet(self):
        client = self.get_client()
        current_count = self.current_count
        response = client.post("/api/tweets/action", {"id":2, "action": "retweet"})
        self.assertEqual(response.status_code, 201)
        data = response.json()
        new_tweet_id = data.get("id")
        self.assertNotEqual(2, new_tweet_id)
        self.assertEqual(current_count + 1, new_tweet_id)

    def test_tweet_create_api_view(self):
        request_data = {"content": "This is my test tweet"}
        client = self.get_client()
        response = client.post("/api/tweets/create", request_data)
        self.assertEqual(response.status_code, 201)
        response_data = response.json()
        new_tweet_id = response_data.get("id")
        self.assertEqual(self.current_count + 1, new_tweet_id)

    def test_tweet_detail_api_view(self):
        client = self.get_client()
        response = client.get("/api/tweets/1")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        _id = data.get("id")
        self.assertEqual(_id, 1)
    
    def test_tweet_delete_api_view(self):
        client = self.get_client()
        response = client.delete("/api/tweets/1/delete")
        self.assertEqual(response.status_code, 200)
        """response = client.delete("/api/tweets/1/delete")
        self.assertEqual(response.status_code, 404)"""
        obj = Tweet.objects.filter(id=1)
        self.assertEqual(obj.first(), None)
        response = client.delete("/api/tweets/3/delete")
        print(response)
        self.assertEqual(response.status_code, 403)