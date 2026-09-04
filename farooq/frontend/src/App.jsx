import React, { useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function App() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [context, setContext] = useState("");

  const queryClient = useQueryClient();

  const getData = async () => {
    const res = await axios.get(`${import.meta.env.VITE_URL}/get-product`);
    console.log(res.data);

    return res.data;
  };

  const { isPending, data, error } = useQuery({
    queryKey: ["user-all"],
    queryFn: getData,
  });

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: async (product) => {
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/create-product`,
        product,
      );

      return res.data;
    },

    onSuccess: (data) => {
      console.log("Product Created:", data);

      // GET dobara fetch hoga
      queryClient.invalidateQueries({
        queryKey: ["user-all"],
      });

      // Form clear
      setTitle("");
      setPrice("");
      setDescription("");
    },

    onError: (error) => {
      console.log("Error:", error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate({
      title,
      price,
      context,
    });
  };

  if (isPending) {
    return <h1>Loading .....</h1>;
  }

  if (error) {
    return <h1>Error .....</h1>;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          placeholder="Enter Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          value={price}
          placeholder="Enter Price"
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="text"
          value={context}
          placeholder="Enter Context"
          onChange={(e) => setContext(e.target.value)}
        />

        <button type="submit" disabled={isCreating}>
          {isCreating ? "Creating..." : "Submit"}
        </button>
      </form>

      <div>
        {data?.user?.map((value) => {
          return (
            <div key={value._id}>
              <h1>Title: {value.title || "Title Not Found"}</h1>

              <h2>Price: {value.price || "Price Not Found"}</h2>

              <p>Context: {value.context || "Context Not Found"}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
