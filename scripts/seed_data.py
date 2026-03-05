import sys
import os
from datetime import datetime

# Add the backend directory to the sys.path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'backend'))

from app.db.session import SessionLocal
from app.models.supplier import Supplier
from app.models.alert import Alert

SUPPLIERS = [
    {
        "id": "sup_001",
        "name": "Shenzhen TechParts Co.",
        "country": "China",
        "country_code": "CN",
        "region": "asia",
        "category": "Semiconductors",
        "risk_score": 87,
        "risk_level": "critical",
        "status": "disrupted",
        "annual_spend": 2400000,
        "lat": 22.54,
        "lng": 114.07,
        "trend": "up",
        "contact_name": "Wei Zhang",
        "contact_email": "w.zhang@sztechparts.cn",
        "tier": 1
    },
    {
        "id": "sup_012",
        "name": "Kuala Lumpur Sensors Sdn.",
        "country": "Malaysia",
        "country_code": "MY",
        "region": "asia",
        "category": "Sensors & ICs",
        "risk_score": 91,
        "risk_level": "critical",
        "status": "disrupted",
        "annual_spend": 1750000,
        "lat": 3.14,
        "lng": 101.69,
        "trend": "up",
        "contact_name": "Ahmad Razali",
        "contact_email": "a.razali@klsensors.my",
        "tier": 1
    },
    # Add more if needed, but these are enough to test
]

ALERTS = [
    {
        "id": "alt_001",
        "supplier_id": "sup_012",
        "type": "weather",
        "severity": "critical",
        "title": "Typhoon Alert – Factory Closure Imminent",
        "description": "Category 4 typhoon tracking directly over Kuala Lumpur manufacturing district. Estimated factory closure of 72–120 hours. Expedite alternative sourcing immediately.",
        "predicted_impact": 380000,
        "probability": 94,
        "time_to_impact": 18
    },
    {
        "id": "alt_002",
        "supplier_id": "sup_001",
        "type": "geopolitical",
        "severity": "critical",
        "title": "Trade Restriction – Semiconductor Export Controls",
        "description": "New US-China export control measures effective in 48 hours may restrict MCU chip shipments. Estimated 60% probability of supply halt for Q2 orders.",
        "predicted_impact": 520000,
        "probability": 88,
        "time_to_impact": 48
    }
]

def seed():
    db = SessionLocal()
    try:
        # Seed suppliers
        for s_data in SUPPLIERS:
            db_sup = db.query(Supplier).filter(Supplier.id == s_data["id"]).first()
            if not db_sup:
                db_sup = Supplier(**s_data)
                db.add(db_sup)
        
        db.commit()

        # Seed alerts
        for a_data in ALERTS:
            db_alert = db.query(Alert).filter(Alert.id == a_data["id"]).first()
            if not db_alert:
                db_alert = Alert(**a_data)
                db.add(db_alert)
        
        db.commit()
        print("Database seeded successfully.")
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed()
