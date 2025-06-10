import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import Order, { loader as orderLoader } from "./features/order/Order";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import ProtectedRoute from "./protectedRoute";

// nova forma de criar rotas que serve para
//lidar com FECTH DATA atraves das rotas.
const router = createBrowserRouter([
  {
    //o FATO Dessa rota nn ter um PATH, faz o REACT ROUTER entender
    //que esse element é omente para LAYOUT
    element: <AppLayout />,
    //Todo o erro que tiver na aplicacao, vai chamar esse componente
    //pois ira ocorrer o BUBBLING
    errorElement: <Error />,
    //passando NESTED ROUTES para essa rota
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: (
          <ProtectedRoute>
            <Menu />
          </ProtectedRoute>
        ),
        //essa é a forma que passamos a FUNCTION de pegar dados API
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order/new",
        element: (
          <ProtectedRoute>
            <CreateOrder />
          </ProtectedRoute>
        ),
        errorElement: <Error />,
        //toda vez que o form do REACT ROUTER der submit ele vai chamar essa function
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: (
          <ProtectedRoute>
            <Order />
          </ProtectedRoute>
        ),
        errorElement: <Error />,
        loader: orderLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
