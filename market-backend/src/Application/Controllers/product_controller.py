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
    def sell_product(product_id, seller_id, data):
        try:
            sale = product_services.ProductService.sell_product(
                session=db.session,
                product_id=product_id,
                seller_id=seller_id,
                quantity=data['quantity']
            )
            
            return {
                'sale_id': sale.id,
                'product_id': sale.product_id,
                'quantity_sold': sale.quantity_sold,
                'sale_price': sale.sale_price,
                'sale_date': sale.sale_date.isoformat()
            }
        except Exception as e:
            return {'error': str(e)}, 400