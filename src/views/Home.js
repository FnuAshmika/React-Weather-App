import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { DataContext } from "../contexts/DataProvider";
import City from '../components/City';
import CityForm from "../components/CityForm";



export default function Home({ setShowLogout }) {
    const { login, user, logout } = useContext(AuthContext)
    const { cities } = useContext(DataContext)
    useEffect(() => {
        setShowLogout(true);
        return () => setShowLogout(false);
    }, [setShowLogout]);
    const filteredCities = cities.filter(city => city.uid === user.uid);
    return (
        <div>
            {user.loggedIn ?

                <div className="profile-container">
                    {/* <button onClick={logout}>Logout</button> */}
                    <h2>Welcome {user.displayName}!</h2>
                    <h2>Here are your cities below:</h2>
                    <CityForm />
                    <div className="inner-Profile">
                        {filteredCities.map((city) => <City city={city} key={city.id} />)}
                    </div>
                </div> :
                <div className="home">
                    <h2>Welcome to the Weather App!</h2>
                    <h2>Please login to Continue</h2>
                    <button onClick={login}>Login</button>
                </div>}
        </div>
    )
}