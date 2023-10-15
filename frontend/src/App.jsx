import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element="Home page" />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
