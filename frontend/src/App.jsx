import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from "./pages/Signup.jsx";
import { Signin } from './pages/Signin.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { SendMoney } from './pages/SendMoney.jsx';
import { useAuth } from './context/auth.jsx';
import { Children } from "react";

function App() {
  const auth = useAuth();
  return (
    <>
      <Routes>
        <Route path="/" element={auth ? <Navigate to="/dashboard" /> : <Navigate to="/signin" />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path='/send' element={
          <ProtectedRoute>
            <SendMoney />
          </ProtectedRoute>} />
      </Routes>
    </>
  )
}

function ProtectedRoute({ children }) {
  const auth = useAuth();
  if (!auth) {
    return <Navigate to="/signin" />;
  }
  return children;
}

export default App
