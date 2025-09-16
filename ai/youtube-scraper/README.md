# Ocean Hazard Monitoring

Find recent YouTube videos about ocean hazards, analyze text with Gemini via LangChain, and store high-confidence alerts in PostgreSQL.

## Project structure

```
X/
  analyse_text.py        # Main entry: search → fetch → analyze → store
  search_videos.py       # YouTube search (time window, keywords)
  get_text_data.py       # Fetch description, tags, top comments
  db_utils.py            # DB connection, schema creation/migration, insert
  view_alerts.py         # Read-only viewer for stored alerts
  db_check.py            # Connectivity + permissions check
  requirements.txt       # Python dependencies
  .gitignore             # Git ignore rules
  # .env.example         # (create this): template env variables
  # .env                 # (do not commit): your secrets
  yt/                    # Local virtual environment (ignored)
```

## Requirements
- Python 3.12+
- PostgreSQL (local or remote)
- API keys: YouTube Data API v3, Google Gemini

## Setup

1. Create and activate a virtual environment
   ```powershell
   python -m venv yt
   .\yt\Scripts\activate
   ```

2. Install dependencies
   ```powershell
   pip install --upgrade pip
   pip install --upgrade -r requirements.txt
   ```

3. Environment variables
   - Create `.env` (not tracked) with:
     ```
     YOUTUBE_API_KEY=your_youtube_api_key
     GOOGLE_API_KEY=your_gemini_api_key
     DB_NAME=ocean_alerts
     DB_USER=postgres
     DB_PASSWORD=postgres
     DB_HOST=localhost
     DB_PORT=5432
     ```

4. Database: create DB if missing
   ```powershell
   psql -h localhost -U postgres -c "CREATE DATABASE ocean_alerts;"
   ```

## Usage

- Check DB connectivity/schema:
  ```powershell
  python db_check.py
  ```

- Search only (debug):
  ```powershell
  python search_videos.py
  ```

- Full pipeline (creates/migrates schema, analyzes, stores alerts):
  ```powershell
  python analyse_text.py
  ```

- View stored alerts:
  ```powershell
  python view_alerts.py
  ```

## Notes
- Analysis uses LangChain `ChatGoogleGenerativeAI` with `gemini-1.5-flash`.
- Alerts schema (columns):
  - `event_type`, `location`, `urgency`, `sentiment`, `video_url` (PK),
    `video_created_at` (timestamptz), `video_date` (date), `video_time` (time)
- Schema migrations are applied automatically on startup via `ensure_schema()`.
- Keep `.env` out of git; customize `.gitignore` as needed.
