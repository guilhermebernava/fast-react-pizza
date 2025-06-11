import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { clearCart } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const formErrors = useActionData();
  const cart = useSelector((store) => store.cart.cart).map((item) => {
    return {
      ...item,
      pizzaId: item.id,
    };
  });

  const {
    username: name,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";
  const isSubmiting = navigation.state === "submitting";
  let totalPrice = cart.reduce((prev, curr) => prev + curr.totalPrice, 0);

  if (withPriority) totalPrice = totalPrice + totalPrice * 0.2;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      {cart.length > 0 && (
        <Form method="POST">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-40">First Name</label>
            <input
              className="input grow"
              type="text"
              name="customer"
              required
              defaultValue={name}
            />
          </div>

          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-40">Phone number</label>
            <div className="grow">
              <input
                className="input w-full"
                type="tel"
                name="phone"
                required
              />
              {formErrors?.phone && (
                <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                  {formErrors.phone}
                </p>
              )}
            </div>
          </div>

          <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-40">Address</label>
            <div className="grow">
              <input
                className="input w-full"
                type="text"
                name="address"
                defaultValue={address}
                disabled={isLoadingAddress}
                required
              />
              {position == null && (
                <span className="absolute right-[3px] top-[5px] z-50 md:right-[5px] md:top-[7px]">
                  <Button
                    disabled={isLoadingAddress}
                    isSmall={true}
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(fetchAddress());
                    }}
                  >
                    Get position
                  </Button>
                </span>
              )}
              {addressStatus === "error" && (
                <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                  {errorAddress}
                </p>
              )}
            </div>
          </div>

          <div className="mb-12 flex items-center gap-5">
            <input
              className="focus-yellow h-6 w-6 accent-yellow-400"
              type="checkbox"
              name="priority"
              id="priority"
              value={withPriority}
              onChange={(e) => setWithPriority(e.target.checked)}
            />
            <label htmlFor="priority" className="font-medium">
              Want to yo give your order priority?
            </label>
          </div>

          <div>
            <input type="hidden" name="cart" value={JSON.stringify(cart)} />

            <Button disabled={isSubmiting || isLoadingAddress}>
              {isSubmiting
                ? "Loading...."
                : `Order now from ${formatCurrency(totalPrice)}`}
            </Button>
          </div>
        </Form>
      )}
      {cart.length < 1 && <EmptyCart />}
    </div>
  );
}

//Criando a ACTION para o FORM poder chamar ela assim que ele tiver o SUBMIT
export async function action({ request }) {
  //pegando os dados que o form enviou
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority,
  };

  console.log(order);

  //adicionando validacoes de erros na action
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  //vai mudar para a pagina com a nova order.
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
