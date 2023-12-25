import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { RiUserAddLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../features/auth/authThunk";
import Container from "../components/common/Container";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { toast } from "react-toastify";
import Spinner from "../components/common/spinner/Spinner";
import { reset } from "../features/auth/authSlice";
import useAuthStatus from "../hooks/useAuthStatus";

const Register = () => {
  const [hasFieldsError, setHasFieldsError] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const { user, loading, success, message, hasError } = useSelector(
    (state) => state.auth,
  );

  const { loggedIn } = useAuthStatus();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerInputs = [
    {
      id: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter your name",
      required: true,
      value: name,
    },
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
    {
      id: "password2",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm password",
      required: true,
      value: password2,
    },
  ];

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }

    if (user && success) {
      toast.success(message);
      navigate("/");
      dispatch(reset());
    }

    if (hasError) {
      toast.error(message);
      dispatch(reset());
    }
  }, [user, success, hasError, message, dispatch, navigate, loggedIn]);

  useEffect(() => {
    // enable/disable submit button
    const allFieldsFilled = [...Object.values(formData)].every((field) =>
      field.trim(),
    );
    setHasFieldsError(!allFieldsFilled);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([...Object.values(formData)].some((field) => !field)) {
      toast.warn("Please fill in all the fields");
      return;
    }

    if (password !== password2) {
      toast.warn("Passwords do not match");
      return;
    }

    dispatch(register(formData));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <main className="z-10 flex flex-1 flex-col justify-center text-[15px]">
      <Container>
        <div className="m-auto flex h-full max-w-md flex-col items-center justify-between py-8 text-center sm:max-w-2xl sm:flex-row">
          <header className="mb-10 sm:mb-0">
            <h1 className="mb-2 flex items-center justify-center gap-2 text-3xl font-bold">
              <RiUserAddLine />
              <span>Register</span>
            </h1>
            <h3 className="text-2xl font-bold text-gray-400">
              Please create an account
            </h3>
          </header>
          <section className="w-full px-6 sm:w-auto sm:flex-1">
            <form onSubmit={handleSubmit}>
              {registerInputs.map((input) => (
                <div className="mb-3 text-left" key={input.id}>
                  <Input onChange={handleChange} {...input} />
                </div>
              ))}
              <Button
                type="submit"
                className={"mt-6 flex items-center justify-center"}
                disabled={hasFieldsError}
              >
                {loading ? <Spinner color="white" size={24} /> : "Submit"}
              </Button>
            </form>
            <div className="mt-4 text-sm">
              Already have an account?{" "}
              <Link
                className="font-medium text-accentDarkShade hover:underline"
                to="/login"
              >
                Log in
              </Link>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
};

export default Register;
