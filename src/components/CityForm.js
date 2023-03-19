import { useState, useContext } from "react";
import { DataContext } from "../contexts/DataProvider";
export default function CityForm() {
    const [name, setName] = useState('')
    const { addCity } = useContext(DataContext)
    async function handleSubmit(e) {
        e.preventDefault()
        const newCity = await addCity(name)
        setName('')
    }
    return (
        <form onSubmit = { handleSubmit } >
            <div className="cityForm">
        <div>
        <input type="text" name="name" id="name" onChange={(e)=>setName(e.target.value)} value={name} /></div>
        <button>Add City</button></div>
        </form >
    )
}