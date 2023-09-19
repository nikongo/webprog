import Salad from './Salad';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function SaladSelect({ value, onChange, values, ...props }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} className="form-select" {...props}>
      <option value="">Välj...</option>
      {values.map(name => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  )
}

function ComposeSalad() {
  const props = useOutletContext();
  const navigate = useNavigate();

  const inventory = Object.keys(props.inventory);
  const foundations = inventory.filter(name => props.inventory[name].foundation);
  const proteins = inventory.filter(name => props.inventory[name].protein);
  const dressings = inventory.filter(name => props.inventory[name].dressing);
  const extras = inventory.filter(name => props.inventory[name].extra);

  const [foundation, setFoundation] = useState('');
  const [protein, setProtein] = useState('');
  const [dressing, setDressing] = useState('');
  const [extra, setExtra] = useState({});


  function reset(e) {
    setFoundation('');
    setProtein('');
    setDressing('');
    setExtra({});
    e.target.classList.remove('was-validated');
  }

  function handleSubmit(e) {
    e.preventDefault();

    e.target.classList.add('was-validated');

    if (!e.target.checkValidity()) return;

    const salad = new Salad({
      foundation: { name: foundation, ...props.inventory[foundation] },
      protein: { name: protein, ...props.inventory[protein] },
      dressing: { name: dressing, ...props.inventory[dressing] },
      ...Object.keys(extra).filter(name => extra[name]).reduce((acc, name) => ({ ...acc, [name]: { name, ...props.inventory[name] } }), {})
    })

    props.handleAddSalad(salad);

    reset(e);

    navigate(`/view-order`);
  }

  return (
    <div className="container col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label">Välj bas</label>
            <SaladSelect value={foundation} onChange={setFoundation} values={foundations} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Välj protein</label>
            <SaladSelect value={protein} onChange={setProtein} values={proteins} required />
          </div>

          <span className="form-label">Välj tillbehör</span>
          <div className="mb-3 d-flex flex-wrap justify-content-start">
            {extras.map(name => (
              <div key={name} className="form-check" style={{ flexBasis: "25%" }}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={name}
                  checked={extra[name] || false}
                  onChange={e => setExtra({ ...extra, [name]: e.target.checked })}
                />
                <label className="form-check-label">{name}</label>
              </div>
            ))}
          </div>

          <div className="mb-3">
            <label className="form-label">Välj dressing</label>
            <SaladSelect value={dressing} onChange={setDressing} values={dressings} required />
          </div>

          <button className="btn btn-primary" type="submit">Beställ</button>
        </form>
      </div>
    </div>
  );
}

export default ComposeSalad;
