import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import inventory from './inventory.ES6';

function App() {
  const [cart, setCart] = useState([]);

  function handleAddSalad(salad) {
    setCart(cart.concat([salad]));
  }

  return (
    <div className="container py-4">
      <Header />
      <Navbar />
      <Outlet context={{ handleAddSalad, cart, inventory }} />
      <Footer />
    </div>
  );
}


function Header() {
  return (
    <header className="pb-3 mb-4 border-bottom">
      <span className="fs-4">Min egen salladsbar</span>
    </header>
  );
}

function Navbar() {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <NavLink className="nav-link" to="/">
          Hem
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/compose-salad">
          Komponera en sallad
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/view-order">
          Se din beställning
        </NavLink>
      </li>
    </ul>
  );
}

function Footer() {
  return (
    <footer className="pt-3 mt-4 text-muted border-top">
      EDAF90 - webprogrammering
    </footer>
  );
}

export default App;
