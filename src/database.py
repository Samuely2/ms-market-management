from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# Inicializa o SQLAlchemy e o Migrate
db = SQLAlchemy()
migrate = Migrate()