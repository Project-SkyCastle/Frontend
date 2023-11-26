# followed the example in this tutorial https://realpython.com/flask-google-login/
# no backend yet, for now the "database" is just a array of objects persistent in local memory

import json
import os
from flask import Flask, redirect, request, url_for, render_template
from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
    UserMixin
)
from oauthlib.oauth2 import WebApplicationClient
import requests

GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET")
GOOGLE_DISCOVERY_URL = "https://accounts.google.com/.well-known/openid-configuration"

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY") or os.urandom(24)
login_manager = LoginManager()
login_manager.init_app(app)
users = []


class User(UserMixin):
    def __init__(self, id, name, email, profile_pic):
        self.id = id
        self.name = name
        self.email = email
        self.profile_pic = profile_pic

    @staticmethod
    def get(user_id):
        attribute_to_match = 'id'
        value_to_match = user_id
        filtered_objects = [obj for obj in users if getattr(obj, attribute_to_match) == value_to_match]
        if not filtered_objects:
            return None
        
        user_dict = filtered_objects[0].__dict__
        user = User(
            id=user_dict['id'],
            name=user_dict['name'], 
            email=user_dict['email'], 
            profile_pic=user_dict['profile_pic']
        )
        return user

    @staticmethod
    def create(id, name, email, profile_pic):
        new_user = User(id, name, email, profile_pic)
        users.append(new_user)


def get_google_provider_cfg():
    return requests.get(GOOGLE_DISCOVERY_URL).json()


@login_manager.unauthorized_handler
def unauthorized():
    return "You must be logged in to access this.", 403


client = WebApplicationClient(GOOGLE_CLIENT_ID)


@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)


@app.route("/")
def index():
    if current_user.is_authenticated:
        return render_template('user_home.html', 
                               user_name=current_user.name,
                               user_email=current_user.email,
                               user_propic=current_user.profile_pic)
    else:
        return render_template('home.html')


@app.route("/login")
def login():
    gcp_cfg = get_google_provider_cfg()
    g_auth_endpoint = gcp_cfg["authorization_endpoint"]
    redirect_url = client.prepare_request_uri(
        g_auth_endpoint,
        redirect_uri=request.base_url + "/callback",
        scope=["openid", "email", "profile"],
    )
    return redirect(redirect_url)


@app.route("/login/callback")
def callback():
    code = request.args.get("code")
    google_provider_cfg = get_google_provider_cfg()
    token_endpoint = google_provider_cfg["token_endpoint"]
    token_url, headers, body = client.prepare_token_request(
        token_endpoint,
        authorization_response=request.url,
        redirect_url=request.base_url,
        code=code,
    )
    token_response = requests.post(
        token_url,
        headers=headers,
        data=body,
        auth=(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET),
    )

    client.parse_request_body_response(json.dumps(token_response.json()))
    userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
    uri, headers, body = client.add_token(userinfo_endpoint)
    userinfo_response = requests.get(uri, headers=headers, data=body)

    if userinfo_response.json().get("email_verified"):
        unique_id = userinfo_response.json()["sub"]
        users_email = userinfo_response.json()["email"]
        picture = userinfo_response.json()["picture"]
        users_name = userinfo_response.json()["name"]
    else:
        return "User email not available or not verified by Google.", 400

    user = User(unique_id, users_name, users_email, picture)

    if not User.get(unique_id):
        User.create(unique_id, users_name, users_email, picture)    

    login_user(user)

    return redirect(url_for("index"))


@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("index"))


if __name__ == "__main__":
    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
    app.run(host='0.0.0.0', port=8011)
