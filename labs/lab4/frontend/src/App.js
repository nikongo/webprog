import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useLocalStorage from './useLocalStorage';

async function safeFetchJson(url){
  return fetch(url)
    .then(response => {
      if(!response.ok){
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    })
}

async function fetchIngredient(type, ingredient) {
  return ingredient ?
    safeFetchJson(`http://localhost:8080/${type}/${ingredient}`) :
    safeFetchJson(`http://localhost:8080/${type}`) 
}

async function fetchIngredients(categoryName) {
  const category = await safeFetchJson(`http://localhost:8080/${categoryName}`);
  const bob = await Promise.all(category.map(async f => {
    const found = await fetchIngredient(`${categoryName}`, f);
    return {
      [f] : {
        name: f, 
        ...found
      } 
    };
  }));
 
  return bob.reduce((acc, curr) => ({...acc, ...curr}), {});
}

function App() {
  const [cart, setCart] = useLocalStorage('cart', []);
  const [inventory, setInventory] = useLocalStorage('inventory', {});
  useEffect(() => {
    Promise.all([
      fetchIngredients('foundations'),
      fetchIngredients('proteins'),
      fetchIngredients('extras'),
      fetchIngredients('dressings'),
    ]).then(([foundations, proteins, extras, dressings]) => {
      console.log(foundations);
      setInventory({
        ...foundations,
        ...proteins,
        ...extras,
        ...dressings,
      });
    });
  }, [setInventory]);

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
