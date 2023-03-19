import { useState, useEffect, createContext, useContext } from "react";
import { getFirestore, getDocs, collection, doc, getDoc, collectionGroup, addDoc, query, deleteDoc } from '@firebase/firestore';
import { AuthContext } from "./AuthProvider";


export const DataContext = createContext()
export const DataProvider = function (props) {
    const [cities, setCities] = useState([])
    const { user } = useContext(AuthContext)
    const db = getFirestore()
    useEffect(() => {
        async function getCities() {
            const cityQuery = query(collectionGroup(db, 'cities'))
            const querySnapshot = await getDocs(cityQuery)
            const loadedcities = []
            querySnapshot.forEach((doc) => {
                loadedcities.push({
                    id: doc.id,
                    uid: doc.ref.parent.parent.id,
                    ...doc.data()
                })
            })
            setCities(loadedcities)
        }
        getCities()
    }, [])
    async function getCity(uid, id) {
        const docRef = doc(db, 'users', uid, 'cities', id)
        const docSnap = await getDoc(docRef)
        if (!docSnap.exists()) {
            throw new Error
        }
        return docSnap.data()
    }

    async function addCity(name) {
        const newCity = {
            name,
            username: user.displayName
        }
        const docRef = await addDoc(collection(db, 'users', user.uid, 'cities'), newCity)
        newCity.id = docRef.id
        setCities([
            newCity,
            ...cities
        ])
        window.location.reload()
        return newCity
    }
    async function deleteCity(uid, id) {
        const docRef = doc(db, 'users', uid, 'cities', id);
        await deleteDoc(docRef);
        setCities(prevCities=>prevCities.filter(city => city.id !== id));
      }
    async function getWeather(name, apiKey){
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}&units=imperial`)
        const data = await response.json()
        return data
                
    }
    const value = {
        cities,
        addCity,
        getCity,
        deleteCity,
        getWeather

    }
    return (
        <DataContext.Provider value={value}>
            {props.children}
        </DataContext.Provider>
    )
}