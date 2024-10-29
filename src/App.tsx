import MainMenu from "./components/screens/Home/HomePrincipal";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppRouter } from "./routes/AppRouter";

function App() {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
