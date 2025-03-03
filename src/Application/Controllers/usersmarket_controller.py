from src.Application.Services import usersmarket_services
from src.database import db

class UsersMarketController:
    @staticmethod
    def create_usermarket(data):
        """
        Controlador para criar um novo usuário.
        """
        try:
            # Chama o service, passando o session e os dados
            new_user = usersmarket_services.UsersMarketService.create_usermarket(
                session=db.session,
                name=data['name'],
                cnpj=data['cnpj'],
                phone=data['phone'],
                email=data['email'],
                password=data['password']
            )
            return new_user
        except Exception as e:
            raise e