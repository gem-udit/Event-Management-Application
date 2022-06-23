import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MyNavbar from './Components/Navbar/Navbar'
import Home from './pages/Home/Home';
import AllUser from './pages/AllUser/AllUser'
import UserDetails from './pages/UserDetails/UserDetails'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register';
function App() {
    return (
        <Router>
            <MyNavbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/AllUser" element={<AllUser />} />
                <Route path="/UserDetails" element={<UserDetails />} />
                <Route path="/Login" exact element={<Login />} />
                <Route path="/Register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
