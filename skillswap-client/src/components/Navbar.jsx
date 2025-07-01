import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // ✅ use Redux properly

  const handleLogout = () => {
    dispatch(logout()); // ✅ clear Redux state
    navigate("/login");
  };

  return (
    <nav style={{ display: "flex", gap: "16px", padding: "10px" }}>
      <Link to="/home">Home</Link>

      {user ? (
        <>
          <Link to="/create">
            <button
              style={{
                padding: "8px 16px",
                borderRadius: "5px",
                backgroundColor: "#4f46e5",
                color: "#fff",
              }}
            >
              Post a Skill
            </button>
          </Link>

          <Link to="/my">My Posts</Link>
          <Link to="/match">Find Matches</Link>
          <Link to="/user">User Profile</Link>

          <button onClick={handleLogout}>Logout</button>
          <span>Welcome, {user.username}!</span>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          {user && <Link to="/profile">Profile</Link>}
        </>
      )}
    </nav>
  );
};

export default Navbar;
