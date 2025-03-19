from src.Application.Services import usersmarket_services
from src.database import db

class UsersMarketController:
    @staticmethod
    def create_usermarket(data):
        try:
            new_user = usersmarket_services.UsersMarketService.create_usermarket(
                session=db.session,
                name=data['name'],
                cnpj=data['cnpj'],
                phone=data['phone'],
                email=data['email'],
                password=data['password']
            )

            # Retorne como um dicionário com os dados do novo usuário
            return {
                'id': new_user.id,
                'name': new_user.name,
                'cnpj': new_user.cnpj,
                'phone': new_user.phone,
                'email': new_user.email,
                'activation_code': new_user.code
            }
        except Exception as e:
            return {'error': str(e)}
        
    @staticmethod  
    def activate_usermarket(data):
        try:
            # Chama o serviço para ativar o usuário
            user = usersmarket_services.UsersMarketService.activate_usermarket(
                session=db.session,
                activation_code=data['activation_code']
            )

            if user:
                return {
                    'message': 'Conta ativada com sucesso!',
                    'user': {
                        'id': user.id,
                        'name': user.name,
                        'email': user.email
                    }
                }
            else:
                return {'error': 'Código de ativação inválido.'}
        except Exception as e:
            return {'error': str(e)}

    @staticmethod
    def login(data):
        try:
            token = usersmarket_services.login(
                session=db.session,
                email=data["email"],
                password=data["password"]
            )

            return token 
        except Exception as e:
            return {"error": str(e)}

