from src.database import db
from datetime import datetime

class ProductModel(db.Model):
    __tablename__ = "products"
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    status = db.Column(db.Boolean, default=True)  
    image = db.Column(db.String(255)) 
    seller_id = db.Column(db.Integer, db.ForeignKey('sellers.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __init__(self, name, price, quantity, image, seller_id, status=True):
        self.name = name
        self.price = price
        self.quantity = quantity
        self.image = image
        self.seller_id = seller_id
        self.status = status

class SaleModel(db.Model):
    __tablename__ = "sales"
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    seller_id = db.Column(db.Integer, db.ForeignKey('sellers.id'), nullable=False)
    quantity_sold = db.Column(db.Integer, nullable=False)
    sale_price = db.Column(db.Float, nullable=False)  
    sale_date = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, product_id, seller_id, quantity_sold, sale_price):
        self.product_id = product_id
        self.seller_id = seller_id
        self.quantity_sold = quantity_sold
        self.sale_price = sale_price