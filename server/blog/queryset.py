from django.core.exceptions import ObjectDoesNotExist
from .models import Blog

def find_blog_by_id(blog_id):
    try:
        blog = Blog.objects.get(pk=blog_id)
    except ObjectDoesNotExist:
        return False
    else:
        return blog
    
def create_blog(user, title, content, thumbnail):    
    new_blog = Blog(user=user, title=title, content=content, thumbnail=thumbnail, view=0)
    try:
        new_blog.save()
    except:
        return False
    else:
        return new_blog
    
def update_blog(blog_id, title, content, thumbnail):
    target_blog = find_blog_by_id(blog_id)
    try:
        target_blog.title = title
        target_blog.content = content
        target_blog.thumbnail = thumbnail
        target_blog.save()
    except:
        return False
    else:
        return True