import { useState } from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAuthenticated }) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const onTextChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!credentials.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!credentials.password) {
      newErrors.password = "Password is required";
    } else if (credentials.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const DoLogin = () => {
    if (validateForm()) {
      axios.post(`http://localhost:8082/login`, credentials)
        .then((result) => {
          if (result.data) {
            sessionStorage.setItem("user", JSON.stringify(result.data));
            setIsAuthenticated(true);
            navigate("/dashboard");
          } else {
            alert("Invalid Credentials");
          }
        })
        .catch(() => {
          alert("Invalid Credentials");
        });
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h3 className="display-4">Login</h3>
        <div className="form-group mb-3">
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={credentials.email}
            onChange={onTextChange}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="form-group mb-3">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={credentials.password}
            onChange={onTextChange}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        <button onClick={DoLogin} className="btn btn-primary btn-block mb-2">Sign in</button>
      </div>
    </div>
  );
}

export default Login;
