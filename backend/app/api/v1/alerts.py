from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app import crud
from app.schemas import alert as schemas
from app.db.session import get_db

router = APIRouter()

@router.get("/", response_model=List[schemas.Alert])
def read_alerts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_alerts(db, skip=skip, limit=limit)

@router.post("/{alert_id}/acknowledge", response_model=schemas.Alert)
def acknowledge_alert(alert_id: str, db: Session = Depends(get_db)):
    db_alert = crud.acknowledge_alert(db, alert_id=alert_id)
    if not db_alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    return db_alert

@router.post("/{alert_id}/resolve", response_model=schemas.Alert)
def resolve_alert(alert_id: str, db: Session = Depends(get_db)):
    db_alert = crud.resolve_alert(db, alert_id=alert_id)
    if not db_alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    return db_alert
