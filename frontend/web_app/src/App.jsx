import './App.css'

function App() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  console.log('API Base URL loaded from .env.local:', apiBaseUrl);
  return (
    
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">SIH Dashboard</h1>
        <p className="mt-4 text-gray-400">
          API is configured to point to: <span className="font-mono text-green-400">{apiBaseUrl || "Not Set"}</span>
        </p>
      </div>
    </div>
  )
}

export default App
