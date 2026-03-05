import random

def calculate_risk_score(supplier_data: dict, news_sentiment: float, shipping_delays: int) -> int:
    """
    Very basic placeholder for ML risk scoring logic.
    Actual implementation would use scikit-learn models.
    """
    base_score = supplier_data.get("base_risk", 20)
    
    # news_sentiment: -1.0 (very negative) to 1.0 (very positive)
    sentiment_factor = (1.0 - news_sentiment) * 30 
    
    # shipping_delays: days
    delay_factor = shipping_delays * 5
    
    score = base_score + sentiment_factor + delay_factor
    
    # Add some randomness for simulation
    score += random.randint(-5, 5)
    
    return min(100, max(0, int(score)))

def predict_disruption_probability(risk_score: int) -> int:
    """
    Returns probability of disruption in next 48 hours.
    """
    if risk_score >= 80:
        return random.randint(75, 95)
    if risk_score >= 60:
        return random.randint(40, 74)
    if risk_score >= 40:
        return random.randint(15, 39)
    return random.randint(1, 14)
