from db.models import get_connection

def view_hazards():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT event_type, location, urgency, sentiment FROM hazard_tweets ORDER BY id DESC;")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    if not rows:
        print("No hazards found.")
        return
    print(f"{'Event Type':20} | {'Location':20} | {'Urgency':10} | {'Sentiment':10}")
    print("-"*70)
    for event_type, location, urgency, sentiment in rows:
        print(f"{event_type[:20]:20} | {location[:20]:20} | {urgency[:10]:10} | {sentiment[:10]:10}")

if __name__ == "__main__":
    view_hazards()

