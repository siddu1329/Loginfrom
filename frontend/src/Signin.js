import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import validation from "./Signinvalidation";

function Signin() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Handlesubmit triggered!", values);

    const validationErrors = validation(values);
    console.log("Validation errors:", validationErrors);
    setErrors(validationErrors);

  
    if (
      validationErrors.name === "" &&
      validationErrors.email === "" &&
      validationErrors.password === ""
    ) {
      console.log("Validation passed, sending POST request:", values);
      axios.post('http://localhost:8081/signin', values)
        .then(res => {
          console.log("Backend response:", res);
          navigate('/');
        })
        .catch(err => console.log("Axios error:", err));
    } else {
      console.log("Validation failed, not sending POST");
    }
  };

  return (
    <div className="signupform">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="name">
          <label htmlFor="name">Name</label>

          <input type="text"id="name"name="name"placeholder="Enter your name"value={values.name}onChange={handleInput}autoComplete="given-name"required/>
          {errors.name && <span className="text-danger">{errors.name}</span>}
        </div>
        <div className="email">

          <label htmlFor="email">Email</label>

          <input type="email"id="email"name="email"placeholder="Enter your email"value={values.email}onChange={handleInput}autoComplete="email"required/>
          {errors.email && <span className="text-danger">{errors.email}</span>}
        </div>
        <div className="password">

          <label htmlFor="password">Password</label>

          <input type="password"id="password"name="password"placeholder="Enter your password"value={values.password}onChange={handleInput}autoComplete="new-password"required/>
          {errors.password && <span className="text-danger">{errors.password}</span>}
        </div>

        <button className="sub" type="submit">Signup</button>
      </form>
      
      <p className="already">Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default Signin;
