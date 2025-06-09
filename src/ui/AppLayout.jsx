import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import Loader from "./Loader";
import { Outlet, useNavigation } from "react-router-dom";

function AppLayout() {
  //serve para conseguir identificar se a rota esta fazendo fecthing do dado.
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="layout">
      {isLoading && <Loader />}

      {!isLoading && (
        <>
          <Header />
          <main>
            <Outlet />
          </main>

          <CartOverview />
        </>
      )}
    </div>
  );
}

export default AppLayout;
