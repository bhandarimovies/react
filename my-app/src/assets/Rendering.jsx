import { FaCheck, FaClock } from "react-icons/fa";
import "./Rendering.css";

function Item({ name, isPacked }) {
  return (
    <div className="Rendering">
    <li className={`item ${isPacked ? "packed" : ""}`}>
      {isPacked ? (
        <FaCheck className="icon check-icon" />
      ) : (
        <FaClock className="icon pending-icon" />
      )}
      {name}
    </li>
    </div>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>My friends</h1>
      <ul>
        <Item isPacked={true} name="Pema" />
        <Item isPacked={true} name="Dorji" />
        <Item isPacked={false} name="Tashi Zangmo" />
      </ul>
    </section>
  );
}