from sqlalchemy import Column, String, Integer, Float, Enum, DateTime
from sqlalchemy.sql import func
from app.db.session import Base
import enum

class RiskLevel(str, enum.Enum):
    CRITICAL = "critical"
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"
    NONE = "none"

class SupplierStatus(str, enum.Enum):
    ACTIVE = "active"
    AT_RISK = "at_risk"
    DISRUPTED = "disrupted"
    RECOVERING = "recovering"

class Supplier(Base):
    __tablename__ = "suppliers"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    country = Column(String)
    country_code = Column(String)
    region = Column(String)
    category = Column(String)
    risk_score = Column(Integer, default=0)
    risk_level = Column(String, default="none")
    status = Column(String, default="active")
    annual_spend = Column(Float, default=0.0)
    lat = Column(Float)
    lng = Column(Float)
    trend = Column(String, default="stable")
    contact_name = Column(String)
    contact_email = Column(String)
    tier = Column(Integer, default=1)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
