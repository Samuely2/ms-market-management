from requests import Session
from src.Infrastructure.http.whats_app import generateNumber, sendMessage
from src.Infrastructure.Models.user import UsersMarketModel

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
