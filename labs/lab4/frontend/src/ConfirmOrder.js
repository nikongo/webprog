import { useParams, useOutletContext } from "react-router-dom";

export default function ConfirmOrder() {
  const { id } = useParams();
  const props = useOutletContext();

  const salad = props.cart.find(salad => salad.id === id);
  return (salad) ?
    (
      <div className="mt-3 alert alert-danger alert-dismissible fade show" role="alert">
        <p>Vi hittade inte din beställning</p>
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Stäng"></button>
      </div>
    ) : (
      <div className="mt-3 alert alert-success alert-dismissible fade show" role="alert">
        <p>Din beställning är bekräftad!</p>
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Stäng"></button>
      </div>
    )
}
