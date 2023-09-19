import React from 'react';
import { useOutletContext, Outlet, useNavigate } from 'react-router-dom';
import Salad from './Salad';

export default function ViewOrder() {
  const props = useOutletContext();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:8080/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(props.cart.map(salad => Object.keys(salad).map(key => salad[key].name))),
    }).then(res => 
      navigate(`/view-order/confirm/${res.id}`),
    )

  }

  return (
    <>
      <Outlet context={props} />

      <div className="container bg-light col-12">
        <div className="row h-200 p-5 border rounded-3">
          <h2>Din beställning</h2>
          <div className="mb-3 d-flex flex-wrap gap-2">
            {props.cart.map(salad => (
              <div key={salad.id} className='bg-light-subtle py-2 px-3 border rounded-3'>
                <p> <strong> Bas: </strong> {salad['foundation'].name}</p>
                <p> <strong> Protein: </strong> {salad['protein'].name}</p>
                <p> <strong> Dressing: </strong> {salad['dressing'].name}</p>
                <p> <strong> Tillbehör: </strong> {Object.keys(salad).filter(key => salad[key].extra).map(k => salad[k].name).join(', ')}</p>
                <p> <strong> Pris: </strong> {new Salad(salad).getPrice()} kr</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button className="btn btn-primary mt-3" type="submit" onClick={handleSubmit}>Betala</button>
    </>
  )
}
