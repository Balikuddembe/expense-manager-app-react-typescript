import { FC, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./Login.css";
import axios from "axios";
import { BASE_API_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";

interface Iprofile {
  email: string;
  password: string;
}

interface LoginProps {
  setIsLoggedIn: (data: boolean) => void;
}
const Login: FC<LoginProps> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Iprofile>();

  const onSubmit = async (data: Iprofile) => {
    console.log("data", data);
    try {
      setErrorMsg("");
      const {data: response} = await axios.get(
        `${BASE_API_URL}/users?email=${data.email}&password=${data.password}`
      );
      if(response.length > 0) {
        setIsLoggedIn(true);
        navigate("/");
      } else {
        setErrorMsg('Invalid login credentials')
      }
 
    } catch (error) {
      console.log(error);
      setErrorMsg("Error during login. Try again later.");
    }
  };

  return (
    <div className="main-content">
      <h2 className="mt-3 text-center">Login</h2>
      <div className="login-section">
        <Form onSubmit={handleSubmit(onSubmit)}>
          {errorMsg && <p className="error-msg">{errorMsg}</p>}
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Email is not valid",
                },
              })}
              placeholder="Enter your email"
            />
            {/* errors will return when field validation fails  */}
            {errors.email && (
              <p className="error-msg">{errors.email.message}</p>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>password</Form.Label>
            <Form.Control
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password should be at-least 6 characters.",
                },
              })}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="error-msg">{errors.password.message}</p>
            )}
          </Form.Group>

          <Form.Group>
            <Button type="submit">
              Login
            </Button>
            <div className="mt-3 register-btn">
              Don't have an account?<Link to="/register">register here</Link>
            </div>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Login;
