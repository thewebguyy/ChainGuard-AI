from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class AlertBase(BaseModel):
    supplier_id: str
    type: str
    severity: str
    title: str
    description: str
    predicted_impact: float
    probability: int
    time_to_impact: int

class AlertCreate(AlertBase):
    id: str

class AlertUpdate(BaseModel):
    acknowledged: Optional[bool] = None
    resolved: Optional[bool] = None

class Alert(AlertBase):
    id: str
    acknowledged: bool
    resolved: bool
    timestamp: datetime

    class Config:
        from_attributes = True
