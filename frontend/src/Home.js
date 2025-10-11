import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImg from './images.jpg'; 

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  const style = {
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white"
  };

  return (
    <div style={style}>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={handleLogout} style={{ marginTop: "16px" }}>
        Logout
      </button>
    </div>
  );
}

export default Home;
