import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../contexts/DataProvider";
export default function City(props) {
    const { deleteCity } = useContext(DataContext);
    return (

        <div className="city">
            <h1>{props.city.name}</h1>
            {
                (props.hideLink) ?
                    <></> : <div className="clickables">
                        <button onClick={() => deleteCity(props.city.uid, props.city.id)}>Delete</button>
                        <Link to={`/city/${props.city.uid}/${props.city.id}`} className="button-link">More Info</Link>
                    </div>
            }
        </div>

    )
}