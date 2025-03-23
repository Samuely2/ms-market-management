"""recriacoa banco

Revision ID: b12009098f01
Revises: 
Create Date: 2025-03-23 18:20:22.850251

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b12009098f01'
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
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('sellers')
    # ### end Alembic commands ###
