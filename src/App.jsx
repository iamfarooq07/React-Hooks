import { useEffect, useReducer } from "react";

const initialState = {
  post: [],
  error: false,
  loading: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { loading: true, post: [], error: false };
    case "FETCH_SUCCESS":
      return { loading: false, error: false, post: action.payload };
    case "FETCH_ERROR":
      return { loading: false, error: true, post: [] };

    default:
      state;
  }

  // if (action.type === "FETCH_START") {
  //   return { ...state, loading: true, post: [], error: false };
  // } else if (action.type === "FETCH_SUCCESS") {
  //   return { ...state, loading: false, error: false, post: action.payload };
  // } else if (action.type === "FETCH_ERROR") {
  //   return { ...state, loading: false, post: [], error: true };
  // }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "FETCH_START" });
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "FETCH_SUCCESS",
          payload: data.slice(0, 5),
        });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_ERROR" });
        console.log(err);
      });
  }, []);
  if (state.loading) {
    return (
      <h1 className="text-4xl font-extrabold text-center my-10">Loading...</h1>
    );
  }

  return (
    <>
      <div className="m-4">
        {state.error && (
          <h1 className="text-4xl font-extrabold text-center my-10 text-red-500">
            Sometime Went Wrong
          </h1>
        )}
        {state.post.map((item) => (
          <div
            key={item.id}
            className="p-5 mb-4 rounded-lg border border-black bg-white"
          >
            <h3 className="text-xl font-semibold text-black mb-2">
              {item.title}
            </h3>

            <p className="text-gray-600 leading-6">{item.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;

// ==========================
// ==========================
// ==========================

// import { useEffect, useReducer } from "react";

// const initialState = {
//   post: [],
//   loading: false,
//   error: false,
// };

// // reducer function
// function reducer(state, action) {
//   switch (action.type) {
//     case "FETCH_START":
//       return { ...state, loading: true, error: false };

//     case "FETCH_SUCCESS":
//       return { ...state, loading: false, post: action.payload };

//     case "FETCH_ERROR":
//       return { ...state, loading: false, error: true };

//     default:
//       return state;
//   }
// }

// function App() {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   useEffect(() => {
//     dispatch({ type: "FETCH_START" });

//     fetch("https://jsonplaceholder.typicode.com/posts")
//       .then((res) => res.json())
//       .then((data) => {
//         dispatch({
//           type: "FETCH_SUCCESS",
//           payload: data.slice(0, 5),
//         });
//       })
//       .catch(() => {
//         dispatch({ type: "FETCH_ERROR" });
//       });
//   }, []);

//   if (state.loading) {
//     return <h1>Loading...</h1>;
//   }

//   return (
//     <>
//       <div>
//         {state.error && <h1>Something Went Wrong</h1>}

//         {state.post.map((item) => (
//           <div key={item.id}>
//             <h3>{item.title}</h3>
//             <p>{item.body}</p>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default App;
