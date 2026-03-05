from sqlalchemy.orm import Session
from app.models.supplier import Supplier
from app.models.alert import Alert
from app.schemas import supplier as supplier_schema
from app.schemas import alert as alert_schema

# Suppliers
def get_suppliers(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Supplier).offset(skip).limit(limit).all()

def create_supplier(db: Session, supplier: supplier_schema.SupplierCreate):
    db_supplier = Supplier(**supplier.dict())
    db.add(db_supplier)
    db.commit()
    db.refresh(db_supplier)
    return db_supplier

# Alerts
def get_alerts(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Alert).offset(skip).limit(limit).all()

def acknowledge_alert(db: Session, alert_id: str):
    db_alert = db.query(Alert).filter(Alert.id == alert_id).first()
    if db_alert:
        db_alert.acknowledged = True
        db.commit()
        db.refresh(db_alert)
    return db_alert

def resolve_alert(db: Session, alert_id: str):
    db_alert = db.query(Alert).filter(Alert.id == alert_id).first()
    if db_alert:
        db_alert.resolved = True
        db.commit()
        db.refresh(db_alert)
    return db_alert
