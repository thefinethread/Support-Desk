import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from '../components/common/Container';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Spinner from '../components/common/Spinner';
import SelectInput from '../components/common/SelectInput';
import useSelectInput from '../hooks/useSelectInput';
import { getRef } from '../features/referenceData/referenceDataSlice';
import { PRODUCTS_REF_TYPE } from '../constants/constants';
import { reset } from '../features/referenceData/referenceDataSlice';
import { toast } from 'react-toastify';

const TicketForm = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const {
    referenceData,
    success,
    hasError,
    loading: refDataLoading,
  } = useSelector((state) => state.referenceData);

  const [product, setProduct] = useState('');
  const [description, setDescription] = useState('');
  const [productOptions, setProductOptions] = useState([]);
  const [message, setMessage] = useState('');
  // const [selectedProduct, setSelectedProduct] = useState('')

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

  const { value: selectedProduct, onChange: handleProductValueChange } =
    useSelectInput('', productOptions);

  useEffect(() => {
    if (referenceData && success) {
      setProductOptions(
        referenceData[PRODUCTS_REF_TYPE]?.map((item) => {
          return { value: item?.code || item?.name, label: item?.name };
        })
      );
    }

    if (hasError) {
      setMessage(`Couldn't fetch product list`);
    }
  }, [referenceData, hasError, success]);

  useEffect(() => {
    const fetchRefTypes = async () => {
      await dispatch(getRef(PRODUCTS_REF_TYPE));
      dispatch(reset());
    };
    fetchRefTypes();
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProduct || !description || !user.name || !user.email) {
      toast.info('Please fill in all the details');
      return;
    }

    // dispatch(
    //   createTicket({
    //     product: selectedProduct,
    //     description,
    //   })
    // );
  };

  const handleTextAreaChange = (e) => setDescription(e.target.value);

  return (
    <main className="flex-1 z-10 flex flex-col justify-center">
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
                required={true}
              />

              {/* show spinner while fetching refData */}
              {(refDataLoading || hasError) && (
                <div className="w-fit -mt-2 mb-2 text-red-500 text-xs font-semibold">
                  {refDataLoading ? (
                    <Spinner size={20}>fetching products...</Spinner>
                  ) : (
                    hasError && <p>{message}</p>
                  )}
                </div>
              )}

              <div>
                <label
                  htmlFor="description"
                  className="font-semibold text-left block mb-1"
                >
                  Description of the issue
                </label>
                <textarea
                  id="description"
                  placeholder="description"
                  required={true}
                  onChange={handleTextAreaChange}
                  className={`w-full outline-none p-2 rounded-md outline-1 outline-gray-300 outline-offset-0 focus:outline-secondaryLightShade focus:shadow-custom`}
                ></textarea>
              </div>

              <Button
                type="submit"
                className={'flex justify-center items-center mt-6'}
              >
                {false ? <Spinner color="white" size={24} /> : 'Submit'}
              </Button>
            </form>
          </section>
        </div>
      </Container>
    </main>
  );
};

export default TicketForm;
