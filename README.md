first clone the repo 

```bash
git clone https://github.com/dixitatharvv/SIH2025.git
cd SIH2025
```


make one terminal for backend
Navigate to the backend directory:
```bash
cd backend
```

Create and activate a Python virtual environment:
```bash
# Create the environment
python -m venv venv

# Activate it (on Windows)
venv\Scripts\activate

# On macOS/Linux, use: source venv/bin/activate
```

Install the required Python packages:
```bash
pip install -r requirements.txt
```

Create your environment file:
```bash
# backend/.env
DATABASE_URL="postgresql://user:password@localhost/your_db_name"
SECRET_KEY="your_super_secret_key_for_jwt"
```

Run the backend server:
```bash
uvicorn main:app --reload
```

The backend should now be running at [http://127.0.0.1:8000](http://127.0.0.1:8000).



make another terminal for frontend

You'll need a new, separate terminal for the mobile app.

Navigate to the mobile app directory:
```bash
cd frontend/mobile_app
```

Install the Flutter packages:
```bash
flutter pub get
```

Create your environment file:
```bash
# frontend/mobile_app/.env

# Use 10.0.2.2 for the Android Emulator to connect to your PC's localhost
# For a physical device on the same Wi-Fi, use your PC's network IP address (e.g., 192.168.1.5:8000)
API_BASE_URL="http://10.0.2.2:8000"
```

Run the mobile app:
```bash
flutter run
```


You'll need a third terminal for the web dashboard.

Navigate to the web app directory:
```bash
cd frontend/web_app
```

Install the Node.js packages:
```bash
npm install
```

Create your environment file:
```bash
# frontend/web_app/.env.local
VITE_API_BASE_URL="http://127.0.0.1:8000"
```

Run the development server:
```bash
npm run dev
```


The React dashboard should now be running at [http://localhost:5173](http://localhost:5173)


To ensure code consistency across the team, please use the configured code formatters.

- **Python**: Use `black` and `ruff`. We recommend installing the official VS Code extensions for these tools to format your code automatically on save.
- **React**: Use `Prettier` and `ESLint`. The VS Code "Prettier - Code formatter" and "ESLint" extensions are highly recommended.
- **Flutter**: Use the default `dart format`. VS Code and Android Studio will do this automatically if configured.
