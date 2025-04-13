from flask import Blueprint, request, jsonify
from src.Application.Controllers.product_controller import ProductController
from src.Application.Services.auth_services import AuthService

product_routes = Blueprint('products', __name__)

@product_routes.route('/api/products', methods=['POST'])
@AuthService.token_required
def create_product(current_user):
    data = request.json
    response = ProductController.create_product(data, current_user['id'])
    if 'error' in response:
        return jsonify(response), 400
    return jsonify(response), 201

@product_routes.route('/api/products', methods=['GET'])
@AuthService.token_required
def get_products(current_user):
    response = ProductController.get_products(current_user['id'])
    if 'error' in response:
        return jsonify(response), 400
    return jsonify(response), 200

@product_routes.route('/api/products/<int:product_id>', methods=['GET'])
@AuthService.token_required
def get_product(current_user, product_id):
    response = ProductController.get_product(product_id, current_user['id'])
    if 'error' in response:
        return jsonify(response), response[1] if isinstance(response, tuple) else 400
    return jsonify(response), 200

@product_routes.route('/api/products/<int:product_id>', methods=['PUT'])
@AuthService.token_required
def update_product(current_user, product_id):
    data = request.json
    response = ProductController.update_product(product_id, current_user['id'], data)
    if 'error' in response:
        return jsonify(response), 400
    return jsonify(response), 200

@product_routes.route('/api/products/<int:product_id>/toggle-status', methods=['PATCH'])
@AuthService.token_required
def toggle_product_status(current_user, product_id):
    response = ProductController.toggle_product_status(product_id, current_user['id'])
    if 'error' in response:
        return jsonify(response), 400
    return jsonify(response), 200

@product_routes.route('/api/products/<int:product_id>/sell', methods=['POST'])
@AuthService.token_required
def sell_product(current_user, product_id):
    data = request.json
    response = ProductController.sell_product(product_id, current_user['id'], data)
    if 'error' in response:
        return jsonify(response), 400
    return jsonify(response), 201