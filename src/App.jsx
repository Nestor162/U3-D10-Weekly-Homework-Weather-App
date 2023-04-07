import "./App.css";
import SearchInput from "./components/SearchInput";
import { Row } from "react-bootstrap";

function App() {
  return (
    <main className="App">
      <Row>
        <SearchInput />
      </Row>
    </main>
  );
}

export default App;
