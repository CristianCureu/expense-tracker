import swal from "sweetalert";
import { useGlobalContext } from "../../context/globalContext";
import { checkEmail } from "../../utils/validation";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const { register } = useGlobalContext();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const { isValid, text } = checkEmail(user.email);
    if (!isValid) {
      swal("Error", text, "error");
    } else {
      try {
        const { response, responseJson } = await register(user);
        if (response.status === 201) {
          swal("Success", "Account created!", "success");
          navigate("/login");
        } else {
          swal("Error", responseJson.message, "error");
        }
      } catch (error) {
        console.log("Register::submitHandler::", error);
      }
    }
  };

  return (
    <AuthForm submitHandler={submitHandler} user={user} setUser={setUser} />
  );
};

export default Register;
