import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Auth from "./components/Auth/Auth.js";
import LandingPage from "./components/LandingPage/LandingPage.js";

function App() {
  return (
    <BrowserRouter>
      <body>
        <Routes>
          <Route path='/' element={<Auth />} />
          <Route path='/overview' element={<LandingPage />} />
        </Routes>
      </body>
    </BrowserRouter>
  );
}

export default App;
