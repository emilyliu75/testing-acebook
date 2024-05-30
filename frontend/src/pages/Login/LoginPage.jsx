import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../services/authentication";
import DOMpurify from "dompurify";


export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const CleanEmail = DOMpurify.sanitize(email)
    const CleanPassword = DOMpurify.sanitize(password)



    try {
      const token = await login(CleanEmail, CleanPassword);
      localStorage.setItem("token", token);
      navigate("/posts");
    } catch (err) {
      console.error(err);
      console.log({CleanEmail})
      navigate("/login");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
      {/* <script type="text/javascript" src="dist/purify.min.js"></script> */}
    </>
  );
};

