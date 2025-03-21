from flask import Blueprint, jsonify, request
from src.Application.Controllers.usersmarket_controller import UsersMarketController

main_routes = Blueprint('main', __name__)

@main_routes.route('/')
def index():
    return "Olá, mundo!"

@main_routes.route('/api/sellers', methods=['POST'])
def create_usersmarket():
    data = request.json
    try:
        new_user = UsersMarketController.create_usermarket(data)        
        return jsonify(new_user), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@main_routes.route('/api/activate', methods=['POST'])
def activate_usersmarket():
    data = request.json
    try:
        response = UsersMarketController.activate_usermarket(data)
        
        if 'error' in response:
            return jsonify(response), 400
        return jsonify(response), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@main_routes.route('/api/login', methods=['POST'])
def login():
    data = request.json
    try:
        result = UsersMarketController.login(data)
        if 'error' in result:
            return jsonify(result), 400
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500  
