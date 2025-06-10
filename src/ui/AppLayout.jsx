import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import Loader from "./Loader";
import { Outlet, useNavigation } from "react-router-dom";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="flex min-h-screen flex-col">
      {isLoading && <Loader />}

      {!isLoading && (
        <>
          <Header />

          <main className="flex flex-1 flex-col overflow-auto">
            <Outlet />
          </main>

          <CartOverview />
        </>
      )}
    </div>
  );
}

export default AppLayout;
