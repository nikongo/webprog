import { useState } from 'react';

function SaladSelect({ value, onChange, values }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} className="form-select">
      {values.map(name => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  )
}

function ComposeSalad(props) {
  const inventory = Object.keys(props.inventory);
  const foundations = inventory.filter(name => props.inventory[name].foundation);
  const proteins = inventory.filter(name => props.inventory[name].protein);
  const dressings = inventory.filter(name => props.inventory[name].dressing);
  const extras = inventory.filter(name => props.inventory[name].extra);

  const [foundation, setFoundation] = useState('Pasta');
  const [protein, setProtein] = useState();
  const [dressing, setDressing] = useState();
  const [extra, setExtra] = useState({ Bacon: true, Fetaost: true });

  return (
    <div className="container col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <form>
          <div className="mb-3">
            <label className="form-label">Välj bas</label>
            <SaladSelect value={foundation} onChange={setFoundation} values={foundations} />
          </div>

          <div className="mb-3">
            <label className="form-label">Välj protein</label>
            <SaladSelect value={protein} onChange={setProtein} values={proteins} />
          </div>

          <div className="mb-3">
            <label className="form-label">Välj dressing</label>
            <SaladSelect value={dressing} onChange={setDressing} values={dressings} />
          </div>

          <div className="mb-3">
            <label className="form-label">Välj extra</label>
            {extras.map(name => (
              <div key={name} className="form-check">
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
        </form>
      </div>
    </div>
  );
}

export default ComposeSalad;
