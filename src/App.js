import "./App.css";
import { AppProvider } from "./AppContext";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <AppProvider>
        <Navbar />
      </AppProvider>
    </div>
  );
}

export default App;
