import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
