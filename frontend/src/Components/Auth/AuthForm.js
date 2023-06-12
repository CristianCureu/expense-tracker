import { Link, useLocation } from "react-router-dom";
import "./style.css";

const AuthForm = ({ submitHandler, user, setUser }) => {
  const location = useLocation();

  return (
    <form className="form-auth" onSubmit={submitHandler}>
      {location.pathname === "/register" && (
        <div className="form-group">
          <input
            type="text"
            autoComplete="off"
            name="name"
            required
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <label htmlFor="name" className="label">
            <span className="form-content">Name</span>
          </label>
        </div>
      )}
      <div className="form-group">
        <input
          type="text"
          autoComplete="off"
          name="email"
          required
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label htmlFor="email" className="label">
          <span className="form-content">Email</span>
        </label>
      </div>
      <div className="form-group">
        <input
          type="password"
          autoComplete="off"
          name="password"
          required
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <label htmlFor="password" className="label">
          <span className="form-content">Password</span>
        </label>
      </div>
      {location.pathname === "/login" && (
        <div className="register-link">
          <p>Dont' have an account?</p>
          <Link to="/register">Register</Link>
        </div>
      )}
      <div className="form-group">
        <button type="submit">
          {location.pathname === "/register" ? "Register" : "Login"}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
