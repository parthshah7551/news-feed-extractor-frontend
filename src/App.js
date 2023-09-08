import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Header from "./Components/Header/Header";
import CustomToggleAccordion from "./Components/Accordian/Accordian";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />
      <CustomToggleAccordion />
    </div>
  );
}

export default App;
