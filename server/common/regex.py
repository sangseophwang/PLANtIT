from re import compile

def validate_email(email):
    email_regex = compile('^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\\.[a-zA-Z]{2,3}$')
    return email_regex.match(email)

def validate_password(password):
    count = 0;
    if len(password) < 8:
        return False
    if compile('[a-zA-Z]').search(password):
        count += 1
    if compile('[0-9]').search(password):
        count += 1
    if compile('\W').search(password):
        count += 1
    if len(password) < 10 and count < 3:
        return False
    if count < 2:
        return False
    return True