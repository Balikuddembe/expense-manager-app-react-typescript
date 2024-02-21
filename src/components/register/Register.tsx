import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./Register.css";

const Register = () => {
  const [succesMsg, setSuccesMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  console.log(setSuccesMsg);
  console.log(setErrorMsg);
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {};

  console.log("errors", errors);

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
                required: true,
                pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              })}
              placeholder="Enter your email"
            />
            {/* errors will return when field validation fails  */}
            {errors.email && errors.email.type === "required" && (
              <p className="error-msg">Email is required.</p>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <p className="error-msg">Email is not valid.</p>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>password</Form.Label>
            <Form.Control
              type="password"
              {...register("password", {
                required: true,
              })}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="error-msg">Password is required.</p>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="cpassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter confirm password"
              {...register("cpassword", {
                required: true,
              })}
            />
            {errors.cpassword && (
              <p className="error-msg">Confirm password is required.</p>
            )}
          </Form.Group>

          <Form.Group>
            <Button type="submit" variant="success">
              Register
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Register;
