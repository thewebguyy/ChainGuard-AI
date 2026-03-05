import sys
import os

# Add the backend directory to the sys.path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'backend'))

from app.db.session import engine, Base
from app.models.supplier import Supplier
from app.models.alert import Alert

def init_db():
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully.")

if __name__ == "__main__":
    init_db()
