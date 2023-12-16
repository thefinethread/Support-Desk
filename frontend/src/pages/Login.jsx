import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { RiLoginBoxLine } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../features/auth/authThunk';
import Container from '../components/common/Container';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { toast } from 'react-toastify';
import Spinner from '../components/common/Spinner';
import { reset } from '../features/auth/authSlice';
import useAuthStatus from '../hooks/useAuthStatus';

const Login = () => {
  const [hasFieldsError, setHasFieldsError] = useState(true);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const { user, success, loading, message, hasError } = useSelector(
    (state) => state.auth
  );

  const { loggedIn } = useAuthStatus();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const loginInputs = [
    {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'Enter your email',
      required: true,
      value: email,
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter password',
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
      toast.warn('Please fill in all the fields');
      return;
    }

    dispatch(login(formData));
  };

  useEffect(() => {
    // If already logged in, redirect away from the login page
    if (loggedIn) {
      navigate('/'); // Redirect to '/'
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    if (loggedIn && success) {
      toast.success(message);
      // redirect to be the previous url
      const redirectUrl = location.state?.from || '/';
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
      field.trim()
    );
    setHasFieldsError(!allFieldsFilled);
  }, [formData]);

  return (
    <main className="flex-1 z-10 flex flex-col justify-center text-[15px]">
      <Container>
        <div className="h-full text-center flex flex-col sm:flex-row justify-between items-center max-w-md sm:max-w-2xl m-auto py-8">
          <header className="mb-10 sm:mb-0">
            <h1 className="flex justify-center items-center font-bold gap-2 text-3xl mb-2">
              <RiLoginBoxLine />
              <span>Login</span>
            </h1>
            <h3 className="font-bold text-gray-400 text-2xl">
              Please login to get support
            </h3>
          </header>
          <section className="px-6 w-full sm:w-auto sm:flex-1">
            <form onSubmit={handleSubmit}>
              {loginInputs.map((input) => (
                <div className="mb-3 text-left" key={input.id}>
                  <Input onChange={handleChange} {...input} />
                </div>
              ))}
              <Button
                type="submit"
                className={'flex justify-center items-center mt-6'}
                disabled={hasFieldsError}
              >
                {loading ? <Spinner color="white" size={24} /> : 'Login'}
              </Button>
            </form>
            <div className="mt-4 text-sm">
              Don’t have an account?{' '}
              <Link
                className="text-accentDarkShade font-medium hover:underline"
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
