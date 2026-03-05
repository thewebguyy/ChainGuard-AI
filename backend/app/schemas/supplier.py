from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class SupplierBase(BaseModel):
    name: str
    country: str
    country_code: str
    region: str
    category: str
    annual_spend: float
    lat: float
    lng: float
    contact_name: Optional[str] = None
    contact_email: Optional[str] = None
    tier: int = 1

class SupplierCreate(SupplierBase):
    id: str

class SupplierUpdate(BaseModel):
    risk_score: Optional[int] = None
    risk_level: Optional[str] = None
    status: Optional[str] = None
    trend: Optional[str] = None

class Supplier(SupplierBase):
    id: str
    risk_score: int
    risk_level: str
    status: str
    trend: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
