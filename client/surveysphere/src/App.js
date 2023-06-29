import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import AuthPage from "./pages/AuthPage/AuthPage.js";
import LandingPage from "./pages/LandingPage/LandingPage.js";
import CreatePage from "./pages/CreatePage/CreatePage.js";
import SurveyPage from "./pages/SurveyPage/SurveyPage.js";
import ReviewPage from "./pages/ReviewPage/ReviewPage.js";
import ResultPage from "./pages/ResultPage/ResultPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import StartingPage from "./pages/StartingPage/StartingPage";
import ImpressumPage from "./pages/ImpressumPage/ImpressumPage";
import Modal from 'react-modal';

function App() {
  Modal.setAppElement('#root');
  return (
    <BrowserRouter>
      <body>
        <Routes>
          <Route path='/' element={<StartingPage />} />
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/overview' element={<LandingPage />} />
          <Route path='/creator' element={<CreatePage />} />
          <Route path='/surveyor/:id' element={<SurveyPage />} />
          <Route path='/reviewer' element={<ReviewPage />} />
          <Route path='/result' element={<ResultPage />} />
          <Route path='/impressum' element={<ImpressumPage />}/>
          <Route path='*' element={<NotFoundPage />}/>
        </Routes>
      </body>
    </BrowserRouter>
  );
}

export default App;
