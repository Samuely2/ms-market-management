from src.Infrastructure.Models.user import UsersMarketModel

class UsersMarketService:
    @staticmethod
    def create_usermarket(session, name, cnpj, phone, email, password):
        """
        Cria um novo usuário no banco de dados.
        """
        try:
            # Cria uma instância do modelo UsersMarketModel
            users_market_model = UsersMarketModel(
                name=name,
                cnpj=cnpj,
                phone=phone,
                email=email,
                password=password
            )

            # Adiciona e commita no banco de dados
            session.add(users_market_model)
            session.commit()

            return users_market_model
        except Exception as e:
            session.rollback()
            raise e