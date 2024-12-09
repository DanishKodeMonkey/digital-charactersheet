import { Link } from "react-router-dom";

/// <reference path="../images.d.ts" />

function Header() {
  return (
    <header>
      <div className="flex flex-col justify-between items-center">
        <div>
          <h1>Digital Character sheet</h1>
        </div>
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link to={"/"} className="text-lg hover:text-yellow-400">
                Overview
              </Link>
            </li>
            <li>
              <Link to={"/character"} className="text-lg hover:text-yellow-400">
                Character
              </Link>
            </li>
            <li>
              <Link to={"/inventory"} className="text-lg hover:text-yellow-400">
                Inventory
              </Link>
            </li>
            <li>
              <Link to={"/spells"} className="text-lg hover:text-yellow-400">
                Spells
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
