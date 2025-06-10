import LinkButton from "../../ui/LinkButton";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function CartOverview() {
  const cart = useSelector((store) => store.cart.cart);
  const cartLength = useSelector((store) => store.cart.cart.length);
  const pizzaLength = cart.reduce((prev, curr) => prev + curr.quantity, 0);
  const totalPrice = cart.reduce((prev, curr) => prev + curr.totalPrice, 0);

  //serve para mostrar em tela
  const [isVisible, setIsVisible] = useState(cartLength > 0);
  //serve para saber quando ira fazer a animacao
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (cartLength > 0) {
      if (!isVisible) {
        setIsAnimatingOut(false);
        setIsVisible(true);
      }
    } else if (cartLength === 0 && isVisible) {
      setIsAnimatingOut(true);
      const timeout = setTimeout(() => {
        setIsVisible(false);
        setIsAnimatingOut(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [cartLength, isVisible]);

  //so retorna null depois de fazer a animacao de sumir
  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between bg-stone-800 p-4 uppercase text-stone-200 ${isAnimatingOut ? "animate-fade-out-down" : "animate-fade-in-up"}`}
    >
      <p className="space-x-4 font-semibold text-stone-300">
        <span>{pizzaLength} pizzas</span>
        <span>${totalPrice.toFixed(2)}</span>
      </p>
      <LinkButton to="/cart">Open cart &rarr;</LinkButton>
    </div>
  );
}

export default CartOverview;
