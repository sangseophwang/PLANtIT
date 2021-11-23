import jwt
from flask import Flask, request, jsonify, abort, current_app
from flask_bcrypt import Bcrypt
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt()


user_info_email = list()
user_info_pw = dict()
user_info_nickname = dict()
user_info_hashed_pw = dict()
user_info_type = dict()

def create_token(data):
    return jwt.encode(data, current_app.config["JWT_SECRET_KEY"], algorithm="HS256")

def decode_token(token):
    return jwt.decode(token, current_app.config["JWT_SECRET_KEY"], "HS256")

def create_access_token(id):
    return create_token(
        {
            "id": id,
            "exp": datetime.utcnow() + timedelta(minutes=2)
        }
    )

def create_refresh_token():
    return create_token(
        {
            "exp": datetime.utcnow() + timedelta(hours=12)
        }
    )


@app.route("/api/user/register", methods=["POST"])
def register():
    if request.method == 'POST':
        json_data = request.get_json()
        
        email = json_data['email']
        password1 = json_data['password1']
        password2 = json_data['password2']
        nickname = json_data['nickname']
        type = "0"
        
        hashed_password = bcrypt.generate_password_hash(password1)
        
        if email not in user_info_email:
            user_info_email.append(email)
            user_info_pw[email] = password1
            user_info_nickname = nickname
            user_info_hashed_pw[email] = hashed_password
            user_info_type[email] = type
            
            response = "register success"
        else:
            return abort(409, "DUPLICATE_ID")

        return jsonify({"message" : response})
        # return {"": 200, "code": response}
        
        
@app.route("/api/user/login", methods=["POST"])
def login_plantint():
    if request.method == 'POST':
        json_data = request.get_json()
        email = json_data['email']
        password = json_data['password']
        
        if user_info_pw[email] == password:
            return jsonify({"message": "login success", "token" :"access_token: " + email})
        else:
            abort(401, "INVALID_DATA")
            
            
@app.route("/api/user/naver_login", methods=["POST"])
def login_naver_plantint():
    if request.method == 'POST':
        json_data = request.get_json()
        access_token = json_data['access_token']
        token_type = json_data['token_type']
        
        if access_token not in user_info_email:
            user_info_email.append(access_token)
            user_info_pw[access_token] = token_type
            
        
        if user_info_pw[access_token] == token_type:
            return jsonify({"message": "naver login success", "token" : access_token })
        else:
            abort(401, "INVALID_DATA")
            
@app.route("/api/user/google_login", methods=["POST"])
def login_google_plantint():
    if request.method == 'POST':
        json_data = request.get_json()
        id_token = json_data['id_token']
        
        
        if id_token not in user_info_email:
            user_info_email.append(id_token)
            user_info_pw[id_token] = "google_id_token : " + id_token
        
        if user_info_pw[id_token] == "google_id_token : " + id_token:
            return jsonify({"message": "google login success", "token" : id_token })
        else:
            abort(401, "INVALID_DATA")
            

# @app.route("/login", methods=["POST"])
# def login():
#     if request.method == 'POST':
#         json_data = request.get_json()
#         email = json_data['email']
#         password = json_data['passowrd']
#         type = json_data['type']
        
#         if (email in user_info_email) and bcrypt.check_password_hash(user_info_pw[email], user_info_hashed_pw[email]):
#             return {
#                 "message": "login success",
#                 "access-token": create_access_token(email),
#                 "refresh-token": create_refresh_token()
#             }
#         else:
#             return abort(401, "INVALID_DATA")
    
    # return {"code": code, "message": message, "nickname":nickname, "token": token}
    
    
@app.route("/info", methods=["GET", "POST"])
def info_data():
    return jsonify(user_info_pw)


if __name__ == '__main__':
    app.run(host='localhost', port='5000', debug=True)
    

