import CreateUser from "../features/user/CreateUser";
import { useSelector } from "react-redux";
import Button from "./Button";

function Home() {
  const username = useSelector((store) => store.user.username);
  return (
    <div className="my-10">
      <h1 className="mb-8 px-4 text-center text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {!username && <CreateUser />}
      {username && (
        <div className="flex translate-y-10 flex-col items-center justify-center gap-12">
          <h2 className="text-center text-3xl">Hello {username}!</h2>
          <Button to={"/menu"}>Go to Menu</Button>
        </div>
      )}
    </div>
  );
}

export default Home;
