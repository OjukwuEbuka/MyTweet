import random
from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render

from .models import Tweet

# Create your views here.

def home_view(request):
    # print(Tweet.objects.get())
    # return HttpResponse('Hello world')
    return render(request, 'pages/home.html', context={})

def tweet_list_view(request, *args, **kwargs):
    qs = Tweet.objects.all()
    tweets_list = [{"id": x.id, "content": x.content, "likes": random.randint(0, 1000)} for x in qs]
    data = {
        "response": tweets_list
    }
    return JsonResponse(data)

def tweet_detail_view(request, tweet_id, *args, **kwargs):
    data = {
        "id": tweet_id,
        # "image_path":obj.image.url
    }
    status = 200
    try:
        tweet = Tweet.objects.get(id=tweet_id)
        data['content']= tweet.content
    except:
        # return Http404
        data['message'] = "Not found"
        status = 404
    print(tweet.content)
    
    return JsonResponse(data, status=status)