import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { useSelector } from "react-redux";
import { clearCart } from "./cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Cart() {
  const username = useSelector((store) => store.user.username);
  const cart = useSelector((store) => store.cart.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
        {cart.length < 1 && <EmptyCart />}
      </ul>
      <div className="mt-6 space-x-2">
        <Button
          disabled={cart.length < 1}
          onClick={() => navigate("/order/new")}
        >
          Order pizzas
        </Button>
        <Button
          noBackground={true}
          onClick={() => {
            dispatch(clearCart());
          }}
        >
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
