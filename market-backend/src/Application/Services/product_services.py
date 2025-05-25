from sqlalchemy.orm import Session
from src.Infrastructure.Models.product import ProductModel, SaleModel
from src.Infrastructure.Models.user import UsersMarketModel

class ProductService:
    @staticmethod
    def create_product(session, name, price, quantity, image, seller_id):
        try:
            product = ProductModel(
                name=name,
                price=price,
                quantity=quantity,
                image=image,
                seller_id=seller_id
            )
            session.add(product)
            session.commit()
            return product
        except Exception as e:
            session.rollback()
            raise e

    @staticmethod
    def get_products(session, seller_id):
        return session.query(ProductModel).filter_by(seller_id=seller_id).all()

    @staticmethod
    def get_product(session, product_id, seller_id):
        return session.query(ProductModel).filter_by(id=product_id, seller_id=seller_id).first()

    @staticmethod
    def update_product(session, product_id, seller_id, **kwargs):
        try:
            product = session.query(ProductModel).filter_by(id=product_id, seller_id=seller_id).first()
            if not product:
                return None
                
            for key, value in kwargs.items():
                if hasattr(product, key):
                    setattr(product, key, value)
            
            session.commit()
            return product
        except Exception as e:
            session.rollback()
            raise e

    @staticmethod
    def toggle_product_status(session, product_id, seller_id):
        try:
            product = session.query(ProductModel).filter_by(id=product_id, seller_id=seller_id).first()
            if not product:
                return None
                
            product.status = not product.status
            session.commit()
            return product
        except Exception as e:
            session.rollback()
            raise e

    @staticmethod
    def sell_product(session, product_id, seller_id, quantity):
        try:
            seller = session.query(UsersMarketModel).filter_by(id=seller_id).first()
            if not seller or not seller.is_active:
                raise ValueError("Vendedor inativo ou não encontrado")
            
            product = session.query(ProductModel).filter_by(id=product_id, seller_id=seller_id).first()
            if not product:
                raise ValueError("Produto não encontrado")
                
            if not product.status:
                raise ValueError("Produto inativo não pode ser vendido")
                
            if product.quantity < quantity:
                raise ValueError(f"Quantidade insuficiente. Disponível: {product.quantity}")
                
            sale = SaleModel(
                product_id=product_id,
                seller_id=seller_id,
                quantity_sold=quantity,
                sale_price=product.price
            )
            
            product.quantity -= quantity
            
            session.add(sale)
            session.commit()
            
            return {
                'sale': sale,
                'product': product
            }
            
        except Exception as e:
            session.rollback()
            raise e