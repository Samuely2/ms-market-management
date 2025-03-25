import datetime
import os
import bcrypt
from src.Application.Services.auth_services import AuthService
from sqlalchemy.orm import Session
from src.Infrastructure.http.whats_app import generateNumber, sendMessage
from src.Infrastructure.Models.user import UsersMarketModel

class UsersMarketService:
    @staticmethod
    def create_usermarket(session, name, cnpj, phone, email, password):        
        try:
            salt = bcrypt.gensalt()
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
            numberMessage = generateNumber()      
            sendMessage(numberMessage)  
            users_market_model = UsersMarketModel(
                name=name,
                cnpj=cnpj,
                phone=phone,
                email=email,
                password=hashed_password.decode('utf-8'),
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
        user = session.query(UsersMarketModel).filter_by(code=activation_code).first()
        
        if user is None:
            raise ValueError("Código de ativação inválido.")
        
        user.is_active = 1
        session.commit()
        
        return user

    @staticmethod
    def login(session, email, password):
        user = session.query(UsersMarketModel).filter_by(email=email).first()
        try:
            if not user:
                raise ValueError("Email ou senha incorretos")

            if user.is_active == 0:
                raise ValueError("O usuário não está ativo")
            
            if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
                return {"error": "Senha incorreta."}

            token = {"token": AuthService.generate_token(user.id, user.email)}

            return {"message": "Login bem-sucedido!", "token": token, "user": {"id": user.id, "name": user.name, "email": user.email}}
        except Exception as e:
            return {"error": str(e)}


