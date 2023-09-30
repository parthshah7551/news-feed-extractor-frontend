import "./App.css";
import { AppProvider } from "./AppContext";
import Navbar from "./Components/Navbar/Navbar";
import ToastifyContainer from "./ToastifyContainer";

function App() {
  return (
    <div className="App">
      <AppProvider>
        <Navbar />
        <ToastifyContainer />
      </AppProvider>
    </div>
  );
}

export default App;
