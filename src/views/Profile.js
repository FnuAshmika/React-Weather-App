// import { useContext } from "react";
// import City from '../components/City';
// import CityForm from "../components/CityForm";
// import { AuthContext } from "../contexts/AuthProvider";
// import { DataContext } from "../contexts/DataProvider";
// export default function Profile() {
//     const { cities } = useContext(DataContext)
//     const { user, logout } = useContext(AuthContext)
//     return (
//         <div className="profile-container">
//             {user.loggedIn ?
//                 <>  <button onClick={logout}>Logout</button>
//                     <h2>Welcome {user.displayName}!</h2>
//                     <h2>Here are your cities below:</h2>
//                     <CityForm />
//                     <div className="inner-Profile">
//                     {cities.map((city) => <City city={city} key={city.id} />)}
//                     </div>
//                 </> : <></>

//             }
//         </div >
//     )
// }