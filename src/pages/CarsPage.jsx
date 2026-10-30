import { Link } from 'react-router-dom';
import CarList from '../components/carList';
import { useAuth } from '../context/AuthContext';

const CarsPage = () => {
    const { token } = useAuth();

    return (
        <div className="App">
            <h1>Auto's</h1>
            {token && <Link to="/toevoegenAuto">Auto toevoegen</Link>}
            {!token && <Link to="/login">Log in om auto's te beheren</Link>}
            <CarList />
        </div>
    );
};

export default CarsPage;
