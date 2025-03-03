from flask import Blueprint, jsonify, request
from src.Application.Controllers.usersmarket_controller import UsersMarketController

main_routes = Blueprint('main', __name__)

@main_routes.route('/')
def index():
    return "Olá, mundo!"

@main_routes.route('/users', methods=['POST'])
def create_usersmarket():
    data = request.json
    try:
        new_user = UsersMarketController.create_usermarket(data)
        return jsonify({
            'id': new_user.id,
            'name': new_user.name,
            'cnpj': new_user.cnpj,
            'phone': new_user.phone,
            'email': new_user.email
        }), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400