import jwt
import datetime
import secrets

class AuthService:
    @staticmethod
    def get_secret_key() -> str:
        secret = secrets.token_hex(24)
        return secret

    @staticmethod
    def generate_token(user_id: int, email: str) -> str:
        SECRET_KEY = AuthService.get_secret_key() 
        payload = {
            "user_id": user_id,
            "email": email,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=8)
        }
        return jwt.encode(payload, SECRET_KEY, algorithm="HS256")
