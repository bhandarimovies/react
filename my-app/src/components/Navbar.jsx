import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-black text-green-400 p-4 flex justify-between">
      <h1 className="font-bold">Madhav</h1>

      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/resume">Resume</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar;