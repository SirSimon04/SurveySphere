import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Auth from "./components/Auth/Auth.js";
import LandingPage from "./components/LandingPage/LandingPage.js";
import Creator from "./components/Creator/Creator.js";
import Surveyor from "./components/Surveyor/Surveyor.js";
import Reviewer from "./components/Reviewer/Reviewer.js";

function App() {
  return (
    <BrowserRouter>
      <body>
        <Routes>
          <Route path='/' element={<Auth />} />
          <Route path='/overview' element={<LandingPage />} />
          <Route path='/creator' element={<Creator />} />
          <Route path='/surveyor/:id' element={<Surveyor />} />
          <Route path='/reviewer' element={<Reviewer />} />
        </Routes>
      </body>
    </BrowserRouter>
  );
}

export default App;
