from src.database import db

class UsersMarketModel(db.Model):
    __tablename__ = "usersmarket"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    cnpj = db.Column(db.String(20), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(100), default="inativo")

    def __init__(self, name, cnpj, phone, email, password):
        self.name = name
        self.cnpj = cnpj
        self.phone = phone
        self.email = email
        self.password = password
       
