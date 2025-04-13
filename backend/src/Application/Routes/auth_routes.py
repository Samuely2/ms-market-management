from flask import Blueprint, jsonify, request
from src.Application.Controllers.usersmarket_controller import UsersMarketController

auth_routes = Blueprint('auth', __name__)

@auth_routes.route('/')
def index():
    return "Olá, mundo!"

@auth_routes.route('/api/sellers', methods=['POST'])
def create_usersmarket():
    data = request.json
    try:
        new_user = UsersMarketController.create_usermarket(data)        
        return jsonify(new_user), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@auth_routes.route('/api/activate', methods=['POST'])
def activate_usersmarket():
    data = request.json
    try:
        response = UsersMarketController.activate_usermarket(data)
        
        if 'error' in response:
            return jsonify(response), 400
        return jsonify(response), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_routes.route('/api/login', methods=['POST'])
def login():
    data = request.json
    try:
        result = UsersMarketController.login(data)
        if 'error' in result:
            return jsonify(result), 400
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500