import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import About from './pages/About';
import Contact from './pages/Contact';
import Confidentialite from './pages/Confidentialite';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/confidentialite" element={<Confidentialite />} />
      </Routes>
    </Router>
  );
}

export default App;
