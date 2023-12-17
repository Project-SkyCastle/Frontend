from flask import Flask, render_template, request, jsonify, make_response, redirect, url_for
import json
import os
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)  # Enable CORS for all routes
app.secret_key = os.environ.get("SECRET_KEY") or os.urandom(24)

g_logged_in_user = False
g_email = ""
g_search = ""


@app.route('/')
def home_page():
   return render_template('login.html')


@app.route('/google-sso-callback', methods=['POST'])
def google_sso_callback():
    try:
        # Extract the token from the Authorization header
        data = json.loads(str(request.data, encoding='utf-8'))
        encoded_key = data
        secret_key = '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'
        client_id = '683899391622-2a7tpakgchh1vaaa3at1h5ojejk2fgt8.apps.googleusercontent.com'
        idinfo = id_token.verify_oauth2_token(encoded_key, google_requests.Request(), client_id)
        print("google-sso-callback email :",idinfo['email'])

        global g_email
        global g_logged_in_user
        g_email = idinfo['email']
        g_logged_in_user = True

        return jsonify({'email': idinfo['email']}), 200
    except Exception as e:
        print("google-sso-callback: ", str(e))
        return jsonify({'error': str(e)}), 400


# FUTURE ROUTES
"""
@app.route('/get_user_profile', methods=['GET'])        # get user name, role
@app.route('/get_subscriptions', methods=['GET'])       # get list of subscribed reports and respective analysts
@app.route('/get_reports', methods=['GET'])            # get list of published reports if role = analyst
@app.route('/enroll', methods=['POST'])                 # enroll as analyst 
@app.route('/get_reports', methods=['GET'])             # get all reports
@app.route('/update_subscription', methods=['POST'])    # update user subscribe / unsubscribe
@app.route('/update_content', methods=['POST'])         # analyst can update report
@app.route('/admin', methods=['GET'])                   # get statistics of users/reports/subscriptions
"""



if __name__ == '__main__':
   os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
   app.run(debug = True)