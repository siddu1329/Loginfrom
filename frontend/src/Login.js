import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validation from "./Loginvalidation";
import axios from "axios";
import backgroundImg from './images.jpg';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validation(values);
    setErrors(validationErrors);
    if (
      validationErrors.email === "" &&
      validationErrors.password === ""
    ) {
      axios.post('http://localhost:8081/login', values)
        .then(res => {
          if (res.data.status === "success") {
            
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate('/home');
          } else {
            alert(res.data.error || "No record existed");
          }
        })
        .catch(err => {
          alert(err.response?.data?.error || "Login failed");
          console.error("Login error:", err);
        });
    }
  };

  return (
    <div className="loginform">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="id">

          <label htmlFor="email">Email</label>

          <input type="email"id="email"name="email"placeholder="Enter the email"onChange={handleInput}value={values.email}/>

          {errors.email && <span className="text-danger">{errors.email}</span>}
        </div>

        <div className="passkey">

          <label htmlFor="password">Password</label>

          <input type="password"id="password"name="password"placeholder="Enter the password"onChange={handleInput}value={values.password}/>
          {errors.password && <span className="text-danger">{errors.password}</span>}
        </div>

        <button className="sub" type="submit">
          Login
        </button>
        <div>
          <a className="forget" href="/sign">
            Forgot password?
          </a>
          <Link to="/Signin">
            <button className="sign" type="button">
            Signup
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
