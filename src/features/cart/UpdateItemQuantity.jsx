import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { changeItemQuantity } from "./cartSlice";

function UpdateItemQuantity({ id, currentQuantity }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button
        onClick={() => dispatch(changeItemQuantity({ id, quantity: -1 }))}
      >
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button onClick={() => dispatch(changeItemQuantity({ id, quantity: 1 }))}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
