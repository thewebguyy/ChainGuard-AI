from celery import Celery
from app.core.config import settings

app = Celery("chainguard_tasks", broker=settings.CELERY_BROKER_URL)

@app.task
def process_news_feed():
    print("Fetching news from NewsAPI...")
    # Logic to fetch news and update risk scores
    return "News feed processed"

@app.task
def check_shipping_status():
    print("Checking shipping statuses via AfterShip...")
    # Logic to poll shipping trackers
    return "Shipping statuses updated"

@app.task
def send_alert_notification(alert_id: str, channel: str = "email"):
    print(f"Sending {channel} alert for {alert_id}...")
    # Logic for Twilio SMS or SMTP email
    return "Notification sent"
