import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { BsFillPersonFill } from "react-icons/bs";
import { NavLink, Link } from "react-router-dom";
import './Sidebar.css';

const Sidebar = () => {
  return (
        <ul className="list">
          <li className="list-item">
            <NavLink to="/">
            <AiFillHome size={25} />
            <div>Dashboard</div>
            </NavLink>
          </li>
          <li className="list-item">
            <NavLink to="/add">
            <BiAddToQueue size={25} />
            <div>Add Expense</div>
            </NavLink>
          </li>
          <li className="list-item">
            <NavLink to="/search">
            <FiSearch size={25} />
            <div>Search Expense</div>
            </NavLink>
          </li>
          <li className="list-item">
            <NavLink to="/profile">
            <BsFillPersonFill size={25} />
            <div>Profile</div>
            </NavLink>
          </li>
          <li className="list-item">
            <Link to="/">
            <AiOutlineLogout size={25} />
            <div>Logout</div>
            </Link>
          </li>
        </ul>
  )
}

export default Sidebar