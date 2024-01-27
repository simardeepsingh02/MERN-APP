import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [password, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const loggedUserId = sessionStorage.getItem("userId");
    if (loggedUserId) {
      // Redirect to the "All Users" page if user is already logged in
      navigate("/read");
    }
  }, [navigate]);
  //const navigate = useNavigate();
  //passing edited data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }
    const response = await fetch(`https://astro-y23d.onrender.com/signin/${email}/${password}`);
    const result1 = await response.json();
    if (!response.ok) {
      setError("Error");
    }
    if (response.ok) {
      console.log("Success", response.ok);
      if(result1.res==="WrongEmail"){
        setError("Wrong Email");
      }
      else if(result1.res==="Fail"){
        setError("Login Failed");
      }else {
        console.log(result1.id);
        sessionStorage.setItem("userId", result1.id);
        sessionStorage.setItem("userName", result1.name);

        // Navigate to the "All Users" page after successful login
        navigate("/read");
        setError();
      }
    }
      
      setTimeout(() => {
        setError("");
      }, 2000);
};


  return (
    <div className="container my-2">
      <h1 className="h1 text-center">Login</h1>

      {error && <div className="alert alert-danger"> {error} </div>}
      <form className="form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;