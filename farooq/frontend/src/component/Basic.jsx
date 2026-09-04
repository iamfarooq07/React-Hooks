import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const getData = async () => {
  const res = await axios.get(`${import.meta.env.VITE_URL}/get-product`);
  return res.data.user;
};

const postData = async (newProduct) => {
  const res = await axios.post(
    `${import.meta.env.VITE_URL}/create-product`,
    newProduct,
  );
  return res.data;
};

function Basic() {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const { isPending, error, data } = useQuery({
    queryKey: ["product"],
    queryFn: getData,
  });

  const mutation = useMutation({
    mutationFn: postData,
    onSuccess: () => {
        // invalidateQueries tanstack ko batata hai ma data refersh hogaya hai new data lao and UI pr map Karwao
      queryClient.invalidateQueries({ queryKey: ["product"] });
      setTitle("");
      setPrice("");
      setDescription("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      title: title, // FIX 1: Backend schema ke mutabiq 'title' bheja
      price: price,
      description: description, // FIX 2: Correct spelling
    });
  };

  if (isPending) return <h1>Loading ....</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Adding..." : "Add Product"}
        </button>
      </form>

      {mutation.isError && (
        <p style={{ color: "red" }}>{mutation.error.message}</p>
      )}

      {/* Product List */}
      <div>
        {data?.map((val) => (
          <div key={val._id} style={{ borderBottom: "1px solid #ccc" }}>
            {/* FIX 3: Dynamic fallback agar backend se title ya name me se koi ek aaye */}
            <h1>{val.title || val.name || "No Title"}</h1>
            <h3>${val.price}</h3>
            <p>{val.description || val.discription}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Basic;
