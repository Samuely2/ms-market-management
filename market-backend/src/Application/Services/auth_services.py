import jwt
import datetime
from functools import wraps
from flask import request, jsonify

class AuthService:
    # Chave fixa para desenvolvimento (em produção use variável de ambiente)
    SECRET_KEY = "sua_chave_secreta_super_segura_aqui_12345"  
    
    @staticmethod
    def generate_token(user_id: int, email: str) -> str:
        payload = {
            "user_id": user_id,
            "email": email,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=8)
        }
        return jwt.encode(payload, AuthService.SECRET_KEY, algorithm="HS256")

    @staticmethod
    def verify_token(token: str):
        try:
            payload = jwt.decode(token, AuthService.SECRET_KEY, algorithms=["HS256"])
            return payload
        except jwt.ExpiredSignatureError:
            return {"error": "Token expirado"}
        except jwt.InvalidTokenError as e:
            print(f"Erro detalhado: {str(e)}")  # Log para debug
            return {"error": "Token inválido"}

    @staticmethod
    def token_required(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = None
            
            if 'Authorization' in request.headers:
                token = request.headers['Authorization'].split(" ")[1]
            
            if not token:
                return jsonify({"error": "Token de autorização ausente"}), 401
                
            payload = AuthService.verify_token(token)
            
            if 'error' in payload:
                return jsonify({"error": payload['error']}), 401
                
            current_user = {
                'id': payload['user_id'],
                'email': payload['email']
            }
            
            return f(current_user, *args, **kwargs)
            
        return decorated