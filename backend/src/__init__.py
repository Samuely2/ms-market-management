from flask import Flask
from flask_cors import CORS  # Importe o CORS
from src.database import db, migrate

def create_app():
    app = Flask(__name__)
    
    # Configurações do CORS
    CORS(app, resources={
        r"/api/*": {
            "origins": ["http://localhost:3000", "http://seu-frontend.com"],
            "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })
    
    # Configurações do banco de dados
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:123456@db/mydb'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Inicializações do banco de dados
    db.init_app(app)
    migrate.init_app(app, db)
    
    # Importar e registrar blueprints
    from src.Application.Routes.auth_routes import auth_routes
    from src.Application.Routes.product_routes import product_routes
    
    app.register_blueprint(auth_routes)
    app.register_blueprint(product_routes)

    # Configuração adicional para OPTIONS
    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response

    return app