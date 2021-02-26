from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render

from .models import Tweet

# Create your views here.

def home_view(request):
    print(Tweet.objects.get())
    # return HttpResponse('Hello world')
    return render(request, 'pages/home.html', context={})

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