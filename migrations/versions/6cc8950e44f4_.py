"""empty message

Revision ID: 6cc8950e44f4
Revises: 
Create Date: 2020-09-15 19:38:06.021316

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6cc8950e44f4'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_index('wine_indeces', 'wines', ['wine_type', 'avg_price', 'name', 'color', 'verietal', 'country', 'community_rank', 'pairings'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('wine_indeces', table_name='wines')
    # ### end Alembic commands ###