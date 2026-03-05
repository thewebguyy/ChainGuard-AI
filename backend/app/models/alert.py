from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.db.session import Base

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(String, primary_key=True, index=True)
    supplier_id = Column(String, ForeignKey("suppliers.id"))
    type = Column(String)  # geopolitical, weather, etc.
    severity = Column(String)
    title = Column(String)
    description = Column(String)
    predicted_impact = Column(Float)
    probability = Column(Integer)
    time_to_impact = Column(Integer)  # hours
    acknowledged = Column(Boolean, default=False)
    resolved = Column(Boolean, default=False)
    
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
