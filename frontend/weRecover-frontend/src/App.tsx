import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import StepsPage from './pages/StepsPage'; // Updated import
import ProtectedRoute from './components/ProtectedRoute';
import StepDetail from './components/StepDetail';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/steps/*" element={<ProtectedRoute component={StepsPage} />} /> {/* Updated path */}
                <Route path="/steps/:step_id/*" element={<ProtectedRoute component={StepDetail} />} />
            </Routes>
        </Router>
    );
};

export default App;
