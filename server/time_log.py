import time

def logging_time(original_fn):
    def wrapper_fn(*args, **kwargs):
        start_time = time.time()
        result = original_fn(*args, **kwargs)
        end_time = time.time()
        print("완료 시간[{}]: {} sec".format(original_fn.__name__, end_time-start_time))
        return result
    return wrapper_fn