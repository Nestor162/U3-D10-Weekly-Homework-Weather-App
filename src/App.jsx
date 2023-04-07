import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Row } from "react-bootstrap";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import CityPage from "./components/CityPage";

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Row>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/city/:city" element={<CityPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Row>
      </BrowserRouter>
    </main>
  );
}

export default App;
