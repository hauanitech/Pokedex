import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedSection } from './components/FeaturedSection';
import { Redirect } from './components/Redirect';
import { Auth } from './components/Auth';
import { Pokedex } from './components/Pokedex';
import { About } from './components/About';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <Hero />
              <FeaturedSection />
              <Redirect />
            </>
          } />
          <Route path="/auth" element={<Auth />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
