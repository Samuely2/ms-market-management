from flask import Flask
from flask_cors import CORS 
from src.Application.Routes.auth_routes import auth_routes
from src.Application.Routes.product_routes import product_routes
from src.database import db, migrate

def create_app():
    app = Flask(__name__)
    app.url_map.strict_slashes = False

    # Configurações do banco de dados
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:123456@db/mydb'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Inicializações do banco de dados
    db.init_app(app)
    migrate.init_app(app, db)
    
    # Configurações corretas de CORS
    CORS(app,
         origins=["http://localhost:3000"],  # frontend
         supports_credentials=True,
         allow_headers=["Content-Type", "Authorization"],
         expose_headers=["Authorization"],
         methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    )
    
    # Rotas
    app.register_blueprint(auth_routes)
    app.register_blueprint(product_routes)

    return app
