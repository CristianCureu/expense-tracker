import swal from "sweetalert";
import { useGlobalContext } from "../../context/globalContext";
import { checkEmail } from "../../utils/validation";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const { login } = useGlobalContext();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const { isValid, text } = checkEmail(user.email);
    if (!isValid) {
      swal("Error", text, "error");
    } else {
      try {
        const { response, responseJson } = await login(user);
        if (response.status === 200) {
          console.log(responseJson);
          localStorage.setItem("user-token", responseJson.token);
          localStorage.setItem("user-id", responseJson.id);
          localStorage.setItem("user-name", responseJson.name);
          localStorage.setItem("user-picture", responseJson.picture);
          navigate("/");
        } else {
          swal("Error", responseJson.message, "error");
        }
      } catch (error) {
        console.log("Login::submitHandler::", error);
      }
    }
  };

  return (
    <AuthForm submitHandler={submitHandler} user={user} setUser={setUser} />
  );
};

export default Login;
