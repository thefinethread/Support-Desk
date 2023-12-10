import { useState } from 'react';
import { RiUserAddLine } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../features/auth/authThunk';
import Container from '../components/common/Container';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();

  const registerInputs = [
    {
      id: 'name',
      type: 'text',
      placeholder: 'Enter your name',
      required: true,
      value: name,
    },
    {
      id: 'email',
      type: 'email',
      placeholder: 'Enter your email',
      required: true,
      value: email,
    },
    {
      id: 'password',
      type: 'password',
      placeholder: 'Enter password',
      required: true,
      value: password,
    },
    {
      id: 'password2',
      type: 'password',
      placeholder: 'Confirm password',
      required: true,
      value: password2,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.warn('passwords do not match');
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
    <main className="flex-1 flex flex-col justify-center">
      <Container>
        <div className="h-full text-center max-w-md m-auto py-8">
          <header className="mb-10">
            <h1 className="flex justify-center items-center font-bold gap-2 text-3xl mb-2">
              <RiUserAddLine />
              <span>Register</span>
            </h1>
            <h3 className="font-bold text-gray-400 text-2xl">
              Please create an account
            </h3>
          </header>
          <section className="px-6">
            <form onSubmit={handleSubmit}>
              {registerInputs.map((input) => (
                <div className="mb-6" key={input.id}>
                  <Input onChange={handleChange} {...input} />
                </div>
              ))}
              <Button type="submit">Submit</Button>
            </form>
          </section>
        </div>
      </Container>
    </main>
  );
};

export default Register;
