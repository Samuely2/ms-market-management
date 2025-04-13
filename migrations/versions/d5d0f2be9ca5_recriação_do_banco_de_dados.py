"""Recriação do banco de dados

Revision ID: d5d0f2be9ca5
Revises: 
Create Date: 2025-04-13 17:09:39.437946

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd5d0f2be9ca5'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('sellers',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('cnpj', sa.String(length=20), nullable=False),
    sa.Column('phone', sa.String(length=20), nullable=False),
    sa.Column('email', sa.String(length=100), nullable=False),
    sa.Column('password', sa.String(length=100), nullable=False),
    sa.Column('code', sa.String(length=100), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('products',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('price', sa.Float(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.Column('status', sa.Boolean(), nullable=True),
    sa.Column('image', sa.String(length=255), nullable=True),
    sa.Column('seller_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['seller_id'], ['sellers.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('sales',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('seller_id', sa.Integer(), nullable=False),
    sa.Column('quantity_sold', sa.Integer(), nullable=False),
    sa.Column('sale_price', sa.Float(), nullable=False),
    sa.Column('sale_date', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], ),
    sa.ForeignKeyConstraint(['seller_id'], ['sellers.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('sales')
    op.drop_table('products')
    op.drop_table('sellers')
    # ### end Alembic commands ###
