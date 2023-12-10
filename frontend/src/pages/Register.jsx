import { useRef, useState } from 'react';
import { RiUserAddLine } from 'react-icons/ri';
import Container from '../components/common/Container';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({});

  const { name, email, password, password2 } = formData;

  const nameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const password2Ref = useRef('');

  const registerInputs = [
    {
      label: 'name',
      type: 'text',
      placeholder: 'Enter your name',
      ref: nameRef,
    },
    {
      label: 'email',
      type: 'email',
      placeholder: 'Enter your email',
      ref: emailRef,
    },
    {
      label: 'password',
      type: 'password',
      placeholder: 'Enter password',
      ref: passwordRef,
    },
    {
      label: 'password-2',
      type: 'password',
      placeholder: 'Confirm password',
      ref: password2Ref,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormData({
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password2: password2Ref.current.value,
    });

    if (password !== password2) {
      toast.warn('passwords do not match');
      return;
    }
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
                <div className="mb-6" key={input.label}>
                  <Input ref={input.ref} {...input} required={true} />
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
