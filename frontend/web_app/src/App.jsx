import './App.css'
import ReportForm from './components/ReportForm'

function App() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  console.log('API Base URL loaded from .env.local:', apiBaseUrl);
  
  return (
    <div className="app">
      <ReportForm />
    </div>
  )
}

export default App
