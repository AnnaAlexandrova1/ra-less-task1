import { useState } from "react";
import List from "./components/List/List";
import "./App.css";
import Details from "./components/Details/Details";

function App() {
  const [selectedChar, setChar] = useState(null);

  const onCharSelected = (id) => {
    setChar(id);
  };

  return (
    <div className="container">
      <List onCharSelected={onCharSelected} />
      <Details itemId={selectedChar} />
    </div>
  );
}

export default App;
