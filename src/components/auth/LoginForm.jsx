import { useForm } from "react-hook-form";
import Field from "../common/Field";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const formSubmit = async (data) => {
    try {
      const res = await axios.post(`http://localhost:3000/auth/login`, data);
      if (res.status === 200) {
        const { token, user } = res.data;
        if (token) {
          const authtoken = token.token;
          const refreshToken = token.refreshToken;

          setAuth({ user, authtoken, refreshToken });

          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      setError("root.random", {
        type: "random",
        message: `user email is not found`,
      });
    }
  };
  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
      onSubmit={handleSubmit(formSubmit)}
    >
      {/* <!-- email --> */}
      <Field label={"Email"} error={errors.email}>
        <input
          {...register("email", { required: "Email is required" })}
          className={`auth-input ${
            errors.email ? "border-red-500" : "border-gray-200"
          }`}
          name="email"
          type="email"
          id="email"
        />
      </Field>
      {/* <!-- password --> */}
      <Field label={"Password"} error={errors.password}>
        <input
          {...register("password", {
            required: "Pass is required",
            minLength: { value: 8, message: "Pass 8 character" },
          })}
          className={`auth-input ${
            errors.password ? "border-red-500" : "border-gray-200"
          }`}
          name="password"
          type="password"
          id="password"
        />
      </Field>
      <p>{errors?.root?.random?.message}</p>
      {/* <!-- Submit --> */}
      <Field>
        <button
          className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
          type="submit"
        >
          Login
        </button>
      </Field>
    </form>
  );
};

export default LoginForm;
