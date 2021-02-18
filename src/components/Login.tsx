import React from "react";

export default function Login() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      accessToken: {
        value: string
      }
    };

    const accessToken = target.accessToken.value;

    localStorage.setItem("accessToken", accessToken);

    window.location.reload();
  }

  return (
    <div>
      <p>Please enter an access token to log in.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="accessToken">Access Token</label>
        <input type="text" name="accessToken" />
        <input type="submit" name="submit" value="Log in" />
      </form>
    </div>
  );
}
