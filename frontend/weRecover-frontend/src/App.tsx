import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import StepDetail from './components/StepDetail'; // Import the new StepDetail component

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard/*" element={<ProtectedRoute component={Dashboard} />} />
                <Route path="/steps/:step_id/*" element={<ProtectedRoute component={StepDetail} />} />{' '}
                {/* Add the trailing '*' */}
            </Routes>
        </Router>
    );
};

export default App;
