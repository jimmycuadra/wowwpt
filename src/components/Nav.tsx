import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  const accessToken = localStorage.getItem("accessToken");

  function handleLogOut(e: React.SyntheticEvent) {
    e.preventDefault();

    localStorage.removeItem("accessToken");

    window.location.reload();
  }

  if (accessToken) {
    return <button onClick={handleLogOut}>Log out</button>;
  } else {
    return <Link to="/login">Log in</Link>;
  }
}
