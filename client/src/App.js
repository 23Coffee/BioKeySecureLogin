import Login from "./Pages/login"
import Register from "./Pages/register"
import {
  BrowserRouter as Router,
  Switch,
  Route

} from "react-router-dom";

function App() {
  return (
    <div className="App" style={{
      backgroundImage: "url('https://cdn.dribbble.com/users/43762/screenshots/1438974/ng-colab-space_night.gif')",
      backgroundSize: "cover", // Adjust size to cover the entire container
      backgroundRepeat: "no-repeat", // Prevent repetition
      backgroundPosition: "center" // Center the image
    }}>
      <div className="bg-lightslategray h-screen font-sans">
        <div className="container mx-auto h-full flex justify-center items-center">
      <Router>
        <Switch>
          <Route exact path="/"><Login /></Route>
          <Route path="/register"><Register /></Route>
        </Switch>

      </Router>
      </div>
    </div>
    </div>
  );
}

export default App;