import { useState } from "react";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./userSlice";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState("");
  const name = useSelector((store) => store.user.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (username === "") return;

    dispatch(login(username));
    navigate("/menu");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 text-center text-sm text-stone-600 md:text-base"
    >
      <p className="mb-8">👋 Welcome! Please start by telling us your name:</p>

      <input
        className="input w-72 transition-all sm:w-96"
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {name !== "" && (
        <div className="my-8">
          <Button className="bg-black">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
