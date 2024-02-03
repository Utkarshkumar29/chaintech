import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import HomePage from "./pages/homePage";
import Forgot from "./components/forgot";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Login />}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/home" element={<HomePage/>}/>
              <Route path="/register/:id" element={<Register/>}/>
              <Route path="/forgot" element={<Forgot/>}/>
          </Routes>
      </Router>
  );
}

export default App;
