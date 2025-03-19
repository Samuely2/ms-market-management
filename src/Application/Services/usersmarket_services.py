from requests import Session
from dotenv import load_dotenv
import os

from src.Infrastructure.http.whats_app import generateNumber, sendMessage
from src.Infrastructure.Models.user import UsersMarketModel

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")

class UsersMarketService:
    @staticmethod
    def create_usermarket(session, name, cnpj, phone, email, password):        
        try:
            numberMessage = generateNumber()      
            sendMessage(numberMessage)  
            users_market_model = UsersMarketModel(
                name=name,
                cnpj=cnpj,
                phone=phone,
                email=email,
                password=password,
                code=numberMessage
            )

            session.add(users_market_model)
            session.commit()

            return users_market_model
        except Exception as e:
            session.rollback()
            raise e

    @staticmethod
    def activate_usermarket(session, activation_code):
        # Tenta encontrar o usuário com o código de ativação
        user = session.query(UsersMarketModel).filter_by(code=activation_code).first()
        
        if user is None:
            raise ValueError("Código de ativação inválido.")
        
        # Ativar o usuário
        user.is_active = 1
        session.commit()
        
        return user

    @staticmethod
    def login(session: Session, email: str, password: str):
        user = session.query(UsersMarketModel).filter_by(email=email, password=password).first()

        if not user:
            raise ValueError("Email ou senha incorretos")

        return {"token": AuthService.generate_token(user.id, user.email)}

    @staticmethod
    def generate_token(user_id: int, email: str) -> str:
        payload = {
            "user_id": user_id,
            "email": email,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=8)
        }
        return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

    @staticmethod
    def verify_token(token: str):
        try:
            return jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            raise ValueError("Token expirado")
        except jwt.InvalidTokenError:
            raise ValueError("Token inválido")