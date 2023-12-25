import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { RiLoginBoxLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../features/auth/authThunk";
import Container from "../components/common/Container";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { toast } from "react-toastify";
import Spinner from "../components/common/spinner/Spinner";
import { reset } from "../features/auth/authSlice";
import useAuthStatus from "../hooks/useAuthStatus";

const Login = () => {
  const [hasFieldsError, setHasFieldsError] = useState(true);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const { user, success, loading, message, hasError } = useSelector(
    (state) => state.auth,
  );

  const { loggedIn } = useAuthStatus();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const loginInputs = [
    {
      id: "email",
      label: "Email Address",
      type: "email",
      placeholder: "Enter your email",
      required: true,
      value: email,
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter password",
      required: true,
      value: password,
    },
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([...Object.values(formData)].some((field) => !field)) {
      toast.warn("Please fill in all the fields");
      return;
    }

    dispatch(login(formData));
  };

  useEffect(() => {
    // If already logged in, redirect away from the login page
    if (loggedIn) {
      navigate("/"); // Redirect to '/'
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    if (loggedIn && success) {
      toast.success(message);
      // redirect to be the previous url
      const redirectUrl = location.state?.from || "/";
      navigate(redirectUrl);

      dispatch(reset());
    } else if (hasError) {
      toast.error(message);
      dispatch(reset());
    }
  }, [
    user,
    success,
    loading,
    message,
    hasError,
    dispatch,
    navigate,
    location,
    loggedIn,
  ]);

  useEffect(() => {
    // enable/disable submit button
    const allFieldsFilled = [...Object.values(formData)].every((field) =>
      field.trim(),
    );
    setHasFieldsError(!allFieldsFilled);
  }, [formData]);

  return (
    <main className="z-10 flex flex-1 flex-col justify-center text-[15px]">
      <Container>
        <div className="m-auto flex h-full max-w-md flex-col items-center justify-between py-8 text-center sm:max-w-2xl sm:flex-row">
          <header className="mb-10 sm:mb-0">
            <h1 className="mb-2 flex items-center justify-center gap-2 text-3xl font-bold">
              <RiLoginBoxLine />
              <span>Login</span>
            </h1>
            <h3 className="text-2xl font-bold text-gray-400">
              Please login to get support
            </h3>
          </header>
          <section className="w-full px-6 sm:w-auto sm:flex-1">
            <form onSubmit={handleSubmit}>
              {loginInputs.map((input) => (
                <div className="mb-3 text-left" key={input.id}>
                  <Input onChange={handleChange} {...input} />
                </div>
              ))}
              <Button
                type="submit"
                className={"mt-6 flex items-center justify-center"}
                disabled={hasFieldsError}
              >
                {loading ? <Spinner color="white" size={24} /> : "Login"}
              </Button>
            </form>
            <div className="mt-4 text-sm">
              Don’t have an account?{" "}
              <Link
                className="font-medium text-accentDarkShade hover:underline"
                to="/register"
              >
                Register
              </Link>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
};

export default Login;
