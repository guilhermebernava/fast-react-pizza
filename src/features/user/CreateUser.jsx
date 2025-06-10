import { useState } from "react";

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
        className="w-72 text-stone-600"
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== "" && (
        <div>
          <button>Start ordering</button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
