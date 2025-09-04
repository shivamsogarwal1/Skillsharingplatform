// import axios from "axios";
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { LoadingAnimation } from "../components/Loading";

// const Search = () => {
//   const [users, setUsers] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);
//   async function fetchUsers() {
//     setLoading(true);
//     try {
//       const { data } = await axios.get("/api/user/all?search=" + search);

//       setUsers(data);
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   }
//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <div className="flex justify-center items-center flex-col pt-5">
//         <div className="search flex justify-between items-center gap-4">
//           <input
//             type="text"
//             className="custom-input"
//             style={{ border: "gray solid 1px" }}
//             placeholder="Enter Name"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <button
//             onClick={fetchUsers}
//             className="px-3 py-2 bg-blue-500 text-white rounded-md"
//           >
//             Search
//           </button>
//         </div>
//         {loading ? (
//           <LoadingAnimation />
//         ) : (
//           <>
//             {users && users.length > 0 ? (
//               users.map((e) => (
//                 <Link
//                   key={e._id}
//                   className="mt-3 px-3 py-2 bg-gray-300 rounded-md flex justify-center items-center gap-3"
//                   to={`/user/${e._id}`}
//                 >
//                   <img
//                     src={e.profilePic.url}
//                     alt=""
//                     className="w-8 h-8 rounded-full"
//                   />{" "}
//                   {e.name}
//                   <span className="ml-2">{e.skill}</span> {/* Added margin-left to create a gap */}
//                 </Link>
//               ))
//             ) : (
//               <p>No User please Search</p>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Search;













// import axios from "axios";
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { LoadingAnimation } from "../components/Loading";

// const Search = () => {
//   const [users, setUsers] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);
//   async function fetchUsers() {
//     setLoading(true);
//     try {
//       const { data } = await axios.get("/api/user/all?search=" + search);

//       setUsers(data);
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   }
//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <div className="flex justify-center items-center flex-col pt-5">
//         <div className="search flex justify-between items-center gap-4">
//           <input
//             type="text"
//             className="custom-input"
//             style={{ border: "gray solid 1px" }}
//             placeholder="Search"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <button
//             onClick={fetchUsers}
//             className="px-3 py-2 bg-blue-500 text-white rounded-md"
//           >
//             Search
//           </button>
//         </div>
//         {loading ? (
//           <LoadingAnimation />
//         ) : (
//           <>
//             {users && users.length > 0 ? (
//               users.map((e) => (
//                 <Link
//                   key={e._id}
//                   className="mt-3 px-3 py-2 bg-gray-300 rounded-md flex justify-center items-center gap-3"
//                   to={`/user/${e._id}`}
//                 >
//                   <img
//                     src={e.profilePic.url}
//                     alt=""
//                     className="w-8 h-8 rounded-full"
//                   />{" "}
//                   {e.name}
//                   <span className="ml-2">{e.skill}</span> {/* Added margin-left to create a gap */}
//                 </Link>
//               ))
//             ) : (
//               <p>No User please Search</p>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Search;














import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LoadingAnimation } from "../components/Loading";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchUsers() {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/user/all?search=" + search);
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div className="search-page">
      <div className="search">
        <input
          type="text"
          className="custom-input"
          placeholder="Search users"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={fetchUsers}>Search</button>
      </div>

      {loading ? (
        <div className="loading">
          <LoadingAnimation />
        </div>
      ) : (
        <>
          {users && users.length > 0 ? (
            <div className="user-list">
              {users.map((e) => (
                <Link
                  key={e._id}
                  className="user-item"
                  to={`/user/${e._id}`}
                >
                  <img
                    src={e.profilePic.url}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="user-info">
                    <div className="name">{e.name}</div>
                    <div className="skill">{e.skill}</div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p>No users found. Please try another search.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
