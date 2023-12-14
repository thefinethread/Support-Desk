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
import SelectInput from '../components/common/SelectInput';
import useSelectInput from '../hooks/useSelectInput';

const TicketForm = () => {
  const [product, setProduct] = useState('');
  const [description, setDescription] = useState('');
  // const [selectedProduct, setSelectedProduct] = useState('')

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const textInputs = [
    {
      id: 'name',
      label: 'Customer Name',
      type: 'text',
      placeholder: '',
      required: true,
      value: user.name,
      disabled: true,
    },
    {
      id: 'email',
      label: 'Customer Email',
      type: 'email',
      required: true,
      value: user.email,
      disabled: true,
    },
  ];

  const productOptions = [
    { value: 'iPhone', label: 'iPhone' },
    { value: 'iMac', label: 'iMac' },
  ];

  const { value: selectedProduct, onChange: handleProductValueChange } =
    useSelectInput('', productOptions);

  const handleSubmit = () => {};

  return (
    <main className="flex-1 z-10 flex flex-col justify-center text-[15px]">
      <Container>
        <div className="h-full text-center flex flex-col sm:flex-row justify-between items-center max-w-md sm:max-w-2xl m-auto py-8">
          <header className="mb-10 sm:mb-0">
            <h1 className="font-bold text-3xl mb-3">Create New Ticket</h1>
            <h3 className="font-bold text-gray-400 text-2xl">
              Please fill out the form below
            </h3>
          </header>
          <section className="px-6 w-full sm:w-auto sm:flex-1">
            <form onSubmit={handleSubmit}>
              {textInputs.map((input) => (
                <div className="mb-3 text-left" key={input.id}>
                  <Input {...input} />
                </div>
              ))}

              {/********** Select Inputs***********************/}
              <SelectInput
                id="productOptions"
                label="Product"
                value={selectedProduct}
                options={productOptions}
                placeholder="Select"
                onChange={handleProductValueChange}
              />

              <Button
                type="submit"
                className={'flex justify-center items-center mt-6'}
              >
                {false ? <Spinner color="white" size={24} /> : 'Submit'}
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

export default TicketForm;
