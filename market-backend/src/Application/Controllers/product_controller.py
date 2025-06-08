from src.Application.Services import product_services
from src.database import db
from flask import jsonify

class ProductController:
    @staticmethod
    def create_product(data, seller_id):
        try:
            product = product_services.ProductService.create_product(
                session=db.session,
                name=data['name'],
                price=data['price'],
                quantity=data['quantity'],
                image=data.get('image'),
                seller_id=seller_id
            )
            
            return {
                'id': product.id,
                'name': product.name,
                'price': product.price,
                'quantity': product.quantity,
                'status': product.status,
                'image': product.image
            }
        except Exception as e:
            return {'error': str(e)}, 400

    @staticmethod
    def get_products(seller_id):
        try:
            products = product_services.ProductService.get_products(db.session, seller_id)
            return [{
                'id': p.id,
                'name': p.name,
                'price': p.price,
                'quantity': p.quantity,
                'status': p.status,
                'image': p.image
            } for p in products]
        except Exception as e:
            return {'error': str(e)}, 400

    @staticmethod
    def get_product(product_id, seller_id):
        try:
            product = product_services.ProductService.get_product(db.session, product_id, seller_id)
            if not product:
                return {'error': 'Produto não encontrado'}, 404
                
            return {
                'id': product.id,
                'name': product.name,
                'price': product.price,
                'quantity': product.quantity,
                'status': product.status,
                'image': product.image,
                'created_at': product.created_at.isoformat(),
                'updated_at': product.updated_at.isoformat()
            }
        except Exception as e:
            return {'error': str(e)}, 400

    @staticmethod
    def update_product(product_id, seller_id, data):
        try:
            product = product_services.ProductService.update_product(
                session=db.session,
                product_id=product_id,
                seller_id=seller_id,
                **data
            )
            
            if not product:
                return {'error': 'Produto não encontrado'}, 404
                
            return {
                'id': product.id,
                'name': product.name,
                'price': product.price,
                'quantity': product.quantity,
                'status': product.status,
                'image': product.image
            }
        except Exception as e:
            return {'error': str(e)}, 400

    @staticmethod
    def toggle_product_status(product_id, seller_id):
        try:
            product = product_services.ProductService.toggle_product_status(
                session=db.session,
                product_id=product_id,
                seller_id=seller_id
            )
            
            if not product:
                return {'error': 'Produto não encontrado'}, 404
                
            return {
                'id': product.id,
                'name': product.name,
                'status': product.status
            }
        except Exception as e:
            return {'error': str(e)}, 400

    @staticmethod
    def sell_product(product_id, seller_id, quantity):
        try:
            # Chama o service para processar a venda
            result = product_services.ProductService.sell_product(
                session=db.session,
                product_id=product_id,
                seller_id=seller_id,
                quantity=quantity
            )
            
            return {
                'sale_id': result['sale'].id,
                'product_id': result['sale'].product_id,
                'quantity_sold': result['sale'].quantity_sold,
                'sale_price': float(result['sale'].sale_price),
                'sale_date': result['sale'].sale_date.isoformat(),
                'remaining_stock': result['product'].quantity
            }
        except ValueError as e:
            return {'error': str(e)}, 400
        except Exception as e:
            db.session.rollback()
            return {'error': 'Erro interno no servidor'}, 500
        
    @staticmethod
    def duplicate_product(product_id, seller_id):
        try:
            new_product = product_services.ProductService.duplicate_product(
                session=db.session,
                product_id=product_id,
                seller_id=seller_id
            )
            
            return {
                'id': new_product.id,
                'name': new_product.name,
                'price': new_product.price,
                'quantity': new_product.quantity,
                'status': new_product.status,
                'image': new_product.image,
                'created_at': new_product.created_at.isoformat(),
                'updated_at': new_product.updated_at.isoformat()
            }
        except ValueError as e:
            return {'error': str(e)}, 404
        except Exception as e:
            db.session.rollback()
            return {'error': 'Erro interno ao duplicar o produto'}, 500