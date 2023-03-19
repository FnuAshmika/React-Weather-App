import logo from './logo.svg';
import './App.css';
import { useContext, useState } from 'react';
import { Routes, Route, Link, BrowserRouter} from 'react-router-dom';
import Home from './views/Home';
import Profile from './views/Profile'
import Weather from './views/Weather';
import { AuthContext } from './contexts/AuthProvider';


function App() {
  const { login, user, logout } = useContext(AuthContext)
  const [showLogout, setShowLogout] = useState(false)
  
  return (
    <BrowserRouter>
      <div>
        <nav>
          
            <h4>Weather App</h4>
            {user.loggedIn ? (
              <><h4><Link to="/"> {"\u{021E8}"} Go To Profile: {user.displayName}</Link></h4>
                {showLogout && (
            <button onClick={logout}>Logout</button>
          )}
              
              </>
            ) : <>
            {/* <h4><Link to="/">Home</Link></h4>
              <button onClick={(login)=> navigate("/profile")}>Login</button> */}
        
              </>}
         
        </nav>
      </div>

      <Routes>
        <Route path='/' element={<Home setShowLogout={setShowLogout}/>} />
        {/* <Route path='/profile' element={<Profile />} /> */}
        <Route path='/city/:uid/:id' element={<Weather />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App;
