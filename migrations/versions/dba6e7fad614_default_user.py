"""Default User

Revision ID: dba6e7fad614
Revises: 64f9e7a69925
Create Date: 2025-03-16 18:45:07.549344

"""
from typing import Sequence, Union

from alembic import op
from sqlalchemy.sql import table, column
from sqlalchemy import String, Integer, Boolean


# revision identifiers, used by Alembic.
revision: str = 'dba6e7fad614'
down_revision: Union[str, None] = '64f9e7a69925'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Add a default user."""
    user_table = table(
        'users',
        column('id', Integer),
        column('username', String),
        column('email', String),
        column('country', String),
        column('city', String),
        column('update_interval', Integer),
        column('is_active', Boolean),
    )

    op.bulk_insert(user_table, [
        {
            'id': 1,
            'username': 'admin',
            'email': 'admin@example.com',
            'country': 'Ukraine',
            'city': 'Kyiv',
            'update_interval': 4,
            'is_active': True,
        }
    ])


def downgrade() -> None:
    """Remove the default user."""
    op.execute("DELETE FROM users WHERE username='admin'")
