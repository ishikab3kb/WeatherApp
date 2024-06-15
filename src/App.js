import './App.css';
import MapDisplay from './Components/mapDisplay/MapDisplay';
import WeatherDisplay from './Components/weatherDisplay/weatherDisplay'
import { useStateValue } from './StateProvider';



function App() {

  const [{lat,lon},dispatch] = useStateValue()

  return (
    <div className="app">
      {lat && lon && <MapDisplay></MapDisplay>}
      <WeatherDisplay></WeatherDisplay>
    </div>
  );
}

export default App;
