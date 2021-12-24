import logo from "./logo.svg";
import { SearchInput } from "./components/searchinput/search";
import { Home } from "./home/index";
import styles from "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className={styles.App} id="app">
        <Home />
      </div>
    </Router>
  );
}

export default App;
