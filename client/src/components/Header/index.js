import {Link} from "react-router-dom"
import { useHistory } from "react-router-dom";
import '../../styles/Header.css'

export default function Header() {
  let history = useHistory();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    history.push('/auth');
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/houses">Houses</Link>
        </li>
        {
          (localStorage.getItem("role") == 0) ?
          <li>
            <Link to="/worker">Worker Cabiner</Link>
          </li> : null
        }
        {
          (localStorage.getItem("role") == 1) ?
            <li>
              <Link to="/owner">House Owner Cabiner</Link>
            </li> : null
        }
        <li>
          {(localStorage.getItem('role')==1)? `Hello, House Owner id:${localStorage.getItem('id')}`
            : `Hello, Worker id:${localStorage.getItem('id')}`}
        </li>
        <button onClick={logout} className="btn btn-secondary">
          Logout
        </button>
      </ul>
    </nav>
  );
}

