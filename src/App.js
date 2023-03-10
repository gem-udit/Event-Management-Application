import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/Navbar/Navbar'
import Home from './pages/Home/Home';
import Login from './pages/Login/Login'
import Register from './pages/Register/Register';
import { useContext } from 'react';
import PathContext from './context/pathContext';
import UserProfile from './pages/Profile/UserProfile/UserProfile';
import EmployeeProfile from './pages/Profile/EmployeeProfile/EmployeeProfile'
import EmployeeDirectory from './pages/Directory/EmployeeDirectory/EmployeeDirectory';
import UserDirectory from './pages/Directory/UserDirectory/UserDirectory';

function App() {

    const pathContext = useContext(PathContext);
    return (
        <Router>
            {(pathContext.pathName !== "/register" && pathContext.pathName !== "/login") && <NavigationBar />}
            <Routes>
                <Route path="/login" exact element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/employee-directory" element={<EmployeeDirectory />} />
                <Route path="/user-directory" element={<UserDirectory />} />
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/employee-profile/:empId" element={<EmployeeProfile />} />
            </Routes>
        </Router>
    );
}

export default App;
