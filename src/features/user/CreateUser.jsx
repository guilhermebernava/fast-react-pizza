import { useState } from "react";
import Button from "../../ui/Button";

function CreateUser() {
  const [username, setUsername] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
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

      {username !== "" && (
        <div className="my-8">
          <Button className="bg-black">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
