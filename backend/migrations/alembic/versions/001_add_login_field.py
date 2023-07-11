"""Add login field

Revision ID: 001
Revises:
Create Date: 2023-07-08 12:00:00

"""

from alembic import op
from sqlalchemy import Column, String

# revision identifiers, used by Alembic.
revision = '001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('user', Column('login', String(50)))


def downgrade():
    op.drop_column('user', 'login')
