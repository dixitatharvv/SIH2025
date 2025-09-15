## Hazard Tweet Monitor

Monitors X/Twitter for ocean-related hazards (tsunami, flooding, storm surge, high waves), analyzes posts with Gemini, and stores relevant results in PostgreSQL.

### Features
- Precision search with v2 Recent Search
- Fast prefilter and in-run deduplication to reduce LLM calls
- Rule-based detection for alerts (e.g., "Coastal Flood Advisory/Watch/Warning")
- Gemini-powered analysis with resilient JSON parsing and backoff
- PostgreSQL persistence and CLI viewer

### Requirements
- Windows 10/11 (PowerShell)
- Python 3.12
- PostgreSQL running locally

### Quick Start
1) Create and activate venv (optional if you use the bundled `sih` env)

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

2) Install dependencies

```powershell
pip install -r requirements.txt
```

3) Configure secrets in `config.py`
- Set `TWITTER_BEARER_TOKEN`
- Set `GEMINI_API_KEY`
- Set `POSTGRES` connection values

Important: Do not commit real API keys. Prefer environment variables in production.

4) Initialize DB

```powershell
python setup_db.py
```

5) Run once

```powershell
python main.py
```

### What happens on run
- Fetches up to 10 English tweets with hazard-relevant terms (see `QUERY` in `main.py`).
- Skips obvious noise via prefilter; de-duplicates similar texts within the batch.
- If a rule-based alert is detected (e.g., "Coastal Flood Advisory/Watch/Warning", "Tsunami Warning"), stores immediately.
- Otherwise calls Gemini and stores if model indicates the content is hazard-related.
- Persists the latest tweet ID to `since_id.txt` to avoid reprocessing.

### Viewing stored hazards

```powershell
python view_hazards.py
```

### Clearing the database

```powershell
python clear_db.py
```

### Handling rate limits
- Twitter v2 recent search: ~300 requests per 15 minutes (per app). The client waits on rate limit, but do not run continuously.
- Gemini free tiers: typically ~15 RPM. Code uses exponential backoff and jitter.

Recommendations:
- Run at most every 15–30 minutes for production-like usage.
- Use the helper to calculate a safe cadence:

```powershell
python rate_limit_config.py
```

- To wait then run automatically:

```powershell
python run_with_delay.py
```

### Tuning relevance and cost
- Update `QUERY` in `main.py` for stricter/looser matching.
- Adjust `is_relevant_fast()` blacklist/keywords to skip more noise.
- Extend `extract_rule_based_alert()` patterns (e.g., "flash flood warning", "high surf advisory").

### Troubleshooting
- 400 Bad Request (Twitter): ensure `count >= 10` and valid query syntax.
- 429 Too Many Requests (Twitter): wait ~15 minutes; reduce run frequency.
- Gemini 404: ensure model path is current (uses `gemini-1.5-flash`).
- JSON parse errors: code strips markdown code fences from model output.

### Scripts
- `main.py` — end-to-end pipeline
- `view_hazards.py` — prints latest hazards
- `clear_db.py` — truncates table, resets IDs
- `rate_limit_config.py` — suggests safe run frequency
- `run_with_delay.py` — waits then runs `main.py`
- `test_db.py` — inserts test rows and confirms retrieval

### Security note
`config.py` currently contains inline secrets for convenience. Replace these with environment variables or a secrets manager before sharing or deploying.


