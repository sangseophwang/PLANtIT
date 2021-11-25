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
    
def remove_blog(blog_id):
    target_blog = find_blog_by_id(blog_id)
    try:
        target_blog.delete()
    except:
        return False
    else:
        return True
    
def get_all_blog_by_view():
    blogs = Blog.objects.all().order_by('-view')
    return blogs

def get_all_blog_by_date():
    blogs = Blog.objects.all().order_by('-id')
    return blogs