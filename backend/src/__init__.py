from flask import Flask
from src.database import db, migrate

def create_app():
    app = Flask(__name__)
    
    # Configurações do banco de dados
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:123456@db/mydb'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Inicializações do banco de dados
    db.init_app(app)
    migrate.init_app(app, db)
    
    # Importar e registrar blueprints aqui para evitar circular imports
    from src.Application.Routes.auth_routes import auth_routes
    from src.Application.Routes.product_routes import product_routes
    
    app.register_blueprint(auth_routes)
    app.register_blueprint(product_routes)

    return app