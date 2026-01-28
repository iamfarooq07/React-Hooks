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

// import React, { useEffect, useState } from "react";

// function UseEffect() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   function addData() {
//     setLoading(true);

//     fetch("https://jsonplaceholder.typicode.com/todos")
//       .then((res) => res.json())
//       .then((data) => {
//         setData(data.slice(0, 9));
//         setLoading(false);
//       })
//       .catch(() => {
//         setLoading(false);
//       });
//   }

//   useEffect(() => {
//     addData();
//   }, []);
//   if (loading) {
//     return (
//       <h1 className="text-2xl text-black font-bold text-center">
//         Loading .......
//       </h1>
//     );
//   }

//   return (
//     <div className="p-6">
//       <div className="flex justify-center gap-4 mb-6">
//         <button className="px-5 py-2 text-white bg-green-500 rounded-full font-medium hover:bg-green-600 transition">
//           Completed
//         </button>
//         <button className="px-5 py-2 text-white bg-red-500 rounded-full font-medium hover:bg-red-600 transition">
//           Not Completed
//         </button>
//         <button className="px-5 py-2 text-white bg-gray-500 rounded-full font-medium hover:bg-gray-600 transition">
//           All Data
//         </button>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {data.map((m) => {
//           return (
//             <div
//               key={m.id}
//               className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition duration-300"
//             >
//               <h1 className="text-lg font-semibold text-gray-800 mb-3">
//                 {m.title}
//               </h1>

//               <span
//                 className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
//                   m.completed
//                     ? "bg-green-100 text-green-700"
//                     : "bg-red-100 text-red-600"
//                 }`}
//               >
//                 {m.completed ? "Completed" : "Not Completed"}
//               </span>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default UseEffect;

