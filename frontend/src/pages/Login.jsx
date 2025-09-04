// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { UserData } from "../context/UserContext";
// import { PostData } from "../context/PostContext";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const { loginUser, loading } = UserData();
//   const { fetchPosts } = PostData();

//   const submitHandler = (e) => {
//     e.preventDefault();
//     loginUser(email, password, navigate, fetchPosts);
//   };
//   return (
//     <>
//       {loading ? (
//         <h1>Loading...</h1>
//       ) : (
//         <div className="flex justify-center">
//           <div className="flex flex-col justify-center items-center md:flex-row shadow-md rounded-xl max-w-7xl w-[90%] md:w-[50%] md:mt-[140px]">
//             <div className="w-full md:w-3/4">
//               <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0 py-4">
//                 <h1 className="font-semibold text-xl md:text-3xl text-gray-600 m-2">
//                   Login to NEXTALENT
//                 </h1>
//               </div>

//               <form onSubmit={submitHandler}>
//                 <div className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-8">
//                   <input
//                     type="email"
//                     className="custom-input"
//                     placeholder="User Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                   <input
//                     type="password"
//                     className="custom-input"
//                     placeholder="User Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="text-center mt-7">
//                   <button className="auth-btn">Login</button>
//                 </div>
//               </form>
//             </div>

//             <div className="h-[100%] w-full md:w-1/3 bg-gradient-to-l from-blue-400 to-yellow-400 items-center justify-center flex">
//               <div className="text-white text-base font-semibold text-center my-10 space-y-2 m-2">
//                 <h1 className="text-5xl">Don't Have Account?</h1>
//                 <h1>Register to NEXTALENT</h1>
//                 <Link
//                   to="/register"
//                   className="bg-white rounded-2xl px-4 text-emerald-400 py-1"
//                 >
//                   Register
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Login;












import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loginUser, loading } = UserData();
  const { fetchPosts } = PostData();

  const submitHandler = (e) => {
    e.preventDefault();
    loginUser(email, password, navigate, fetchPosts);
  };

  const registrationBackgroundStyle = {
    backgroundImage: 'url("https://i.pinimg.com/736x/88/23/0b/88230bee7b2351e65a7bb98fa12b7485.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="login flex justify-center items-center h-screen w-screen bg-gray-100">
      <div className="flex flex-col md:flex-row shadow-md rounded-xl max-w-7xl w-[90%] md:w-[50%] h-[90%]">
        {/* Login Section */}
        <div className="w-full md:w-3/4 p-8 bg-gray-200 flex flex-col justify-center">
          <h1 className="text-xl md:text-3xl font-semibold text-gray-700 text-center mb-6">
            Login to NEXTALENT
          </h1>
          <form onSubmit={submitHandler} className="space-y-6">
            <input
              type="email"
              className="custom-input"
              placeholder="User Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="custom-input"
              placeholder="User Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="text-center mt-7">
              <button className="auth-btn bg-gradient-to-r from-blue-500 to-green-400 text-white hover:from-blue-600 hover:to-green-500">
                Login
              </button>
            </div>
          </form>
        </div>

        {/* Registration Section */}
        <div
          className="h-full w-full md:w-1/3 flex items-center justify-center"
          style={{ ...registrationBackgroundStyle, height: "100%" }}
        >
          <div className="text-white text-base font-semibold text-center my-10 space-y-2 m-2">
            <h1 className="text-5xl">Don't Have an Account?</h1>
            <h1>Register to NEXTALENT</h1>
            <Link to="/register" className="bg-white rounded-2xl px-4 py-1 text-emerald-400">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
