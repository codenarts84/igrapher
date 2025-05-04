import jwt
from django.conf import settings
import datetime


def generate_token(data):
    payload = {
        "data": data,
        "exp": datetime.datetime.now() + datetime.timedelta(days=1),
        "iat": datetime.datetime.now(),  # # Issued at time
    }

    # Encode the payload to generate the token
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")
    return token


def check_token(token):
    try:
        # Decode the token to get the payload
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms="HS256")
        return payload
    except jwt.ExpiredSignatureError:
        print("Token is expired")
        return "Token is expired"
    except jwt.InvalidTokenError:
        print("Token is invalid")
        return "Token is invalid"
