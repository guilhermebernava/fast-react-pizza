import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { addItemThunk } from "../cart/cartSlice";
import { show } from "../../utils/toastSlice";
import { useDispatch } from "react-redux";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();

  async function handleAddItem() {
    if (soldOut) return;
    const alreadyAdded = await dispatch(addItemThunk(pizza));

    if (!alreadyAdded) {
      dispatch(
        show({
          message: "Item Already in cart",
          duration: 3000,
          isError: true,
        }),
      );
      return;
    }
    dispatch(show({ message: "Added item to cart", duration: 3000 }));
  }

  return (
    <li className="flex gap-4 py-4">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-60 grayscale" : ""}`}
      />
      <div className="flex flex-grow flex-col justify-between">
        <p className="font-semibold">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-semibold uppercase text-stone-500">
              Sold out
            </p>
          )}

          {!soldOut && (
            <Button
              isSmall={true}
              onClick={async () => await handleAddItem()}
              disabled={soldOut}
            >
              <span className="block sm:hidden">+🛒</span>
              <span className="hidden sm:block">Add to Cart</span>
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
