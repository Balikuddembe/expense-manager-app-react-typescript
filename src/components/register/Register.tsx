import { FC, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./Register.css";
import axios from "axios";
import { BASE_API_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";

interface Iprofile {
  cpassword: string;
  email: string;
  password: string;
}

interface RegisterProps {
  setIsLoggedIn: (data: boolean) => void;
}
const Register: FC<RegisterProps> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [succesMsg, setSuccesMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Iprofile>();

  const onSubmit = async (data: Iprofile) => {
    console.log("data", data);
    try {
      setErrorMsg("");
      setSuccesMsg("");
      const { cpassword, ...rest } = data;
      console.log(cpassword);
      const { data: registeredUser } = await axios.post(
        `${BASE_API_URL}/users`,
        rest
      );
      setSuccesMsg("Registration is successful.");
      reset({
        email: "",
        password: "",
        cpassword: "",
      });
      setTimeout(() => {
        setSuccesMsg("");
        setIsLoggedIn(true);
        navigate("/");
      }, 3000);
      console.log("registeredUser", registeredUser);
    } catch (error) {
      console.log(error);
      setErrorMsg("Error while registering user.Please try again later.");
    }
  };

  return (
    <div className="main-content">
      <h2 className="mt-3 text-center">Register</h2>
      <div className="register-section">
        <Form onSubmit={handleSubmit(onSubmit)}>
          {succesMsg && <p className="success-msg">{succesMsg}</p>}
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

          <Form.Group className="mb-3" controlId="cpassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter confirm password"
              {...register("cpassword", {
                required: "Confirm password is required.",
                validate: {
                  match: (value) => {
                    if (value !== watch("password")) {
                      return "Password and confirm password do not match";
                    }
                  },
                },
              })}
            />

            {errors.cpassword && (
              <p className="error-msg">{errors.cpassword.message}</p>
            )}
          </Form.Group>

          <Form.Group>
            <Button type="submit" variant="success">
              Register
            </Button>
            <div className="mt-3 register-btn">
              Already have an account?<Link to="/login">login here</Link>
            </div>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Register;
