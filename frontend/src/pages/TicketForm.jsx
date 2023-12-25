import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../components/common/Container";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Spinner from "../components/common/spinner/Spinner";
import SelectInput from "../components/common/SelectInput";
import useSelectInput from "../hooks/useSelectInput";
import { getRef } from "../features/referenceData/referenceDataSlice";
import { PRODUCTS_REF_TYPE } from "../constants/constants";
import { reset as resetRefData } from "../features/referenceData/referenceDataSlice";
import { reset as resetTicket } from "../features/ticket/ticketSlice";
import { toast } from "react-toastify";
import { createTicketThunk } from "../features/ticket/ticketThunk";

const TicketForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const {
    referenceData,
    success: refDataSuccess,
    hasError: refDataError,
    loading: refDataLoading,
  } = useSelector((state) => state.referenceData);

  const {
    success: { createTicketSuccess },
    refDataError: ticketError,
    loading: ticketLoading,
    message: ticketMessage,
  } = useSelector((state) => state.ticket);

  const [description, setDescription] = useState(
    sessionStorage.getItem("description") || "",
  );
  const [productOptions, setProductOptions] = useState([]);
  const [message, setMessage] = useState("");
  const [hasFieldsError, setHasFieldsError] = useState(true);
  const [product, setProduct] = useState(
    sessionStorage.getItem("product") || "",
  );

  const textInputs = [
    {
      id: "name",
      label: "Customer Name",
      type: "text",
      placeholder: "",
      required: true,
      value: user.name,
      disabled: true,
    },
    {
      id: "email",
      label: "Customer Email",
      type: "email",
      required: true,
      value: user.email,
      disabled: true,
    },
  ];

  const { value: selectedProduct, onChange: handleProductValueChange } =
    useSelectInput(product, productOptions);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProduct || !description || !user.name || !user.email) {
      toast.info("Please fill in all the details");
      return;
    }

    dispatch(
      createTicketThunk({
        product: selectedProduct,
        description,
      }),
    );
  };

  const handleTextAreaChange = (e) => {
    setDescription(e.target.value);
    sessionStorage.setItem("description", e.target.value);
  };

  useEffect(() => {
    setProduct(selectedProduct);
    sessionStorage.setItem("product", selectedProduct);
  }, [selectedProduct]);

  useEffect(() => {
    !selectedProduct || !description
      ? setHasFieldsError(true)
      : setHasFieldsError(false);
  }, [selectedProduct, description]);

  useEffect(() => {
    if (createTicketSuccess) {
      toast.success(ticketMessage);
      sessionStorage.clear();
      dispatch(resetTicket());
      navigate("/tickets");
    } else if (ticketError) {
      toast.error(ticketMessage);
      dispatch(resetTicket());
    }
  }, [createTicketSuccess, ticketError]);

  useEffect(() => {
    if (referenceData && refDataSuccess) {
      setProductOptions(
        referenceData[PRODUCTS_REF_TYPE]?.map((item) => {
          return { value: item?.code || item?.name, label: item?.name };
        }),
      );
    }

    if (refDataError) {
      setMessage(`Couldn't fetch product list`);
    }
  }, [referenceData, refDataError, refDataSuccess]);

  useEffect(() => {
    const fetchRefTypes = async () => {
      await dispatch(getRef(PRODUCTS_REF_TYPE));
      dispatch(resetRefData());
    };
    fetchRefTypes();
  }, []);

  return (
    <main className="z-10 flex flex-1 flex-col justify-center">
      <Container>
        <div className="m-auto flex h-full max-w-md flex-col items-center justify-between py-8 text-center sm:max-w-3xl sm:flex-row">
          <header className="mb-10 sm:mb-0">
            <h1 className="mb-3 text-3xl font-bold">Create New Ticket</h1>
            <h3 className="text-2xl font-bold text-gray-400">
              Please fill out the form
            </h3>
          </header>
          <section className="w-full min-w-[400px] px-6 sm:flex-1">
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
              {(refDataLoading || refDataError) && (
                <div className="-mt-2 mb-2 w-fit text-xs font-semibold text-red-500">
                  {refDataLoading ? (
                    <Spinner size={20}>fetching products...</Spinner>
                  ) : (
                    refDataError && <p>{message}</p>
                  )}
                </div>
              )}

              <div>
                <label
                  htmlFor="description"
                  className="mb-1 block text-left font-semibold"
                >
                  Description of the issue
                </label>
                <textarea
                  id="description"
                  placeholder="description"
                  value={description}
                  required={true}
                  onChange={handleTextAreaChange}
                  className={`w-full rounded-md p-2 outline-none outline-1 outline-offset-0 outline-gray-300 focus:shadow-custom focus:outline-secondaryLightShade dark:bg-zinc-800 dark:outline-zinc-700 dark:focus:shadow-darkCustom`}
                ></textarea>
              </div>

              <Button
                type="submit"
                className={"mt-6 flex items-center justify-center"}
                disabled={hasFieldsError}
              >
                {ticketLoading ? <Spinner color="white" size={24} /> : "Submit"}
              </Button>
            </form>
          </section>
        </div>
      </Container>
    </main>
  );
};

export default TicketForm;
