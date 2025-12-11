import './App.css';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedSection } from './components/FeaturedSection';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <FeaturedSection />
    </div>
  );
}

export default App;
