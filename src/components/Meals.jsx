import MealItem from "./MealItem.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

const requestConfig = {};

function Meals() {
    const {data: meals, isLoading, error} = useHttp('http://localhost:3000/meals', requestConfig, []);

    if (isLoading) return <p className="center">Fetching meals...</p>;

    if (error) return <Error title="Failed to fetch meals" message={error}/>;

    return (
        <ul id="meals">
            {meals.map(m => <MealItem key={m.id} meal={m}/>)}
        </ul>
    );
}

export default Meals;