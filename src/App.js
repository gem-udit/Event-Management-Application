import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/Navbar/Navbar'
import Home from './pages/Home/Home';
import AllUser from './pages/AllUser/AllUser'
import UserDetails from './pages/UserDetails/UserDetails'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register';
import User from './pages/User/User';
import { useContext } from 'react';
import PathContext from './context/pathContext';

function App() {

    const pathContext = useContext(PathContext);
    return (
        <Router>
            {(pathContext.pathName !== "/Register" && pathContext.pathName !== "/Login") && <NavigationBar />}
            <Routes>
                <Route path="/Login" exact element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/" element={<Navigate to="/Login" />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/AllUser" element={<AllUser />} />
                <Route path="/UserDetails" element={<UserDetails />} />
                <Route path="/User/:userId" element={<User />} />
            </Routes>
        </Router>
    );
}

export default App;
