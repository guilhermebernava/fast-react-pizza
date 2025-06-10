import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { removeItem } from "./cartSlice";
import UpdateItemQuantity from "./UpdateItemQuantity";

function CartItem({ item }) {
  const dispatch = useDispatch();
  const { id, name, quantity, totalPrice } = item;

  function handleOnDelete() {
    dispatch(removeItem(id));
  }

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <UpdateItemQuantity id={id} currentQuantity={quantity} />
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <Button isSmall={true} onClick={handleOnDelete}>
          Delete
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
