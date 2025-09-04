// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserData } from "../context/UserContext";
// import { PostData } from "../context/PostContext";
// import PostCard from "../components/PostCard";
// import { FaArrowDownLong, FaArrowUp } from "react-icons/fa6";
// import Modal from "../components/Modal";
// import axios from "axios";
// import { Loading } from "../components/Loading";
// import { CiEdit } from "react-icons/ci";
// import toast from "react-hot-toast";

// const Account = ({ user }) => {
//   const navigate = useNavigate();

//   const { logoutUser, updateProfilePic, updateProfileName } = UserData();

//   const { posts, reels, loading } = PostData();

//   let myPosts;

//   if (posts) {
//     myPosts = posts.filter((post) => post.owner._id === user._id);
//   }
//   let myReels;

//   if (reels) {
//     myReels = reels.filter((reel) => reel.owner._id === user._id);
//   }

//   const [type, setType] = useState("post");

//   const logoutHandler = () => {
//     logoutUser(navigate);
//   };

//   const [index, setIndex] = useState(0);

//   const prevReel = () => {
//     if (index === 0) {
//       console.log("null");
//       return null;
//     }
//     setIndex(index - 1);
//   };
//   const nextReel = () => {
//     if (index === myReels.length - 1) {
//       console.log("null");
//       return null;
//     }
//     setIndex(index + 1);
//   };

//   const [show, setShow] = useState(false);
//   const [show1, setShow1] = useState(false);

//   const [followersData, setFollowersData] = useState([]);
//   const [followingsData, setFollowingsData] = useState([]);

//   async function followData() {
//     try {
//       const { data } = await axios.get("/api/user/followdata/" + user._id);

//       setFollowersData(data.followers);
//       setFollowingsData(data.followings);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const [file, setFile] = useState("");

//   const changeFileHandler = (e) => {
//     const file = e.target.files[0];
//     setFile(file);
//   };

//   const changleImageHandler = () => {
//     const formdata = new FormData();

//     formdata.append("file", file);

//     updateProfilePic(user._id, formdata, setFile);
//   };

//   useEffect(() => {
//     followData();
//   }, [user]);

//   const [showInput, setShowInput] = useState(false);
//   const [name, setName] = useState(user.name ? user.name : "");

//   const UpdateName = () => {
//     updateProfileName(user._id, name, setShowInput);
//   };

//   const [showUpdatePass, setShowUpdatePass] = useState(false);
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");

//   async function updatePassword(e) {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("/api/user/" + user._id, {
//         oldPassword,
//         newPassword,
//       });

//       toast.success(data.message);
//       setOldPassword("");
//       setNewPassword("");
//       setShowUpdatePass(false);
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   }
//   return (
//     <>
//       {loading ? (
//         <Loading />
//       ) : (
//         <>
//           {user && (
//             <>
//               {loading ? (
//                 <Loading />
//               ) : (
//                 <div className="bg-gray-100 min-h-screen flex flex-col gap-4 items-center justify-center pt-3 pb-14">
//                   {show && (
//                     <Modal
//                       value={followersData}
//                       title={"Followers"}
//                       setShow={setShow}
//                     />
//                   )}
//                   {show1 && (
//                     <Modal
//                       value={followingsData}
//                       title={"Followings"}
//                       setShow={setShow1}
//                     />
//                   )}
//                   <div className="bg-white flex justify-between gap-4 p-8 rounded-lg shadow-md max-w-md">
//                     <div className="image flex flex-col justify-between mb-4 gap-4">
//                       <img
//                         src={user.profilePic.url}
//                         alt=""
//                         className="w-[180px] h-[180px] rounded-full"
//                       />
//                       <div className="update w-[150px] flex flex-col justify-center items-center">
//                         <input
//                           type="file"
//                           onChange={changeFileHandler}
//                           required
//                         />
//                         <button
//                           className="bg-blue-500 text-white px-3 py-2"
//                           onClick={changleImageHandler}
//                         >
//                           Update Profile
//                         </button>
//                       </div>
//                     </div>

//                     <div className="flex flex-col gap-2">
//                       {showInput ? (
//                         <>
//                           <div className="flex justify-center items-center gap-2">
//                             <input
//                               className="custom-input"
//                               style={{ width: "80px" }}
//                               value={name}
//                               onChange={(e) => setName(e.target.value)}
//                               placeholder="Enter Name"
//                               required
//                             />
//                             <button onClick={UpdateName}>Update</button>
//                             <button
//                               onClick={() => setShowInput(false)}
//                               className="bg-red-400 text-white p-2 rounded-full"
//                             >
//                               X
//                             </button>
//                           </div>
//                         </>
//                       ) : (
//                         <p className="text-gray-800 font-semibold">
//                           {user.name}{" "}
//                           <button onClick={() => setShowInput(true)}>
//                             <CiEdit />
//                           </button>
//                         </p>
//                       )}
//                       <p className="text-gray-500 text-sm">{user.email}</p>
//                       <p className="text-gray-500 text-sm">{user.gender}</p>
//                       <p
//                         className="text-gray-500 text-sm cursor-pointer"
//                         onClick={() => setShow(true)}
//                       >
//                         {user.followers.length} follower
//                       </p>
//                       <p
//                         className="text-gray-500 text-sm cursor-pointer"
//                         onClick={() => setShow1(true)}
//                       >
//                         {user.followings.length} following
//                       </p>
//                       <button
//                         onClick={logoutHandler}
//                         className=" bg-red-500 text-white rounded-md"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   </div>

//                   <button
//                     onClick={() => setShowUpdatePass(!showUpdatePass)}
//                     className="bg-blue-500 px-2 py-1 rounded-sm text-white"
//                   >
//                     {showUpdatePass ? "X" : "Update Password"}
//                   </button>

//                   {showUpdatePass && (
//                     <form
//                       onSubmit={updatePassword}
//                       className="flex justify-center items-center flex-col bg-white p-2 rounded-sm gap-4"
//                     >
//                       <input
//                         type="password"
//                         className="custom-input"
//                         placeholder="Old Password"
//                         value={oldPassword}
//                         onChange={(e) => setOldPassword(e.target.value)}
//                         required
//                       />
//                       <input
//                         type="password"
//                         className="custom-input"
//                         placeholder="new Password"
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                         required
//                       />
//                       <button
//                         type="submit"
//                         className="bg-blue-500 px-2 py-1 rounded-sm text-white"
//                       >
//                         Update Password
//                       </button>
//                     </form>
//                   )}

//                   <div className="controls flex justify-center items-center bg-white p-4 rounded-md gap-7">
//                     <button onClick={() => setType("post")}>Posts</button>
//                     <button onClick={() => setType("reel")}>Reels</button>
//                   </div>

//                   {type === "post" && (
//                     <>
//                       {myPosts && myPosts.length > 0 ? (
//                         myPosts.map((e) => (
//                           <PostCard type={"post"} value={e} key={e._id} />
//                         ))
//                       ) : (
//                         <p>No Post Yet</p>
//                       )}
//                     </>
//                   )}
//                   {type === "reel" && (
//                     <>
//                       {myReels && myReels.length > 0 ? (
//                         <div className="flex gap-3 justify-center items-center">
//                           <PostCard
//                             type={"reel"}
//                             value={myReels[index]}
//                             key={myReels[index]._id}
//                           />
//                           <div className="button flex flex-col justify-center items-center gap-6">
//                             {index === 0 ? (
//                               ""
//                             ) : (
//                               <button
//                                 className="bg-gray-500 text-white py-5 px-5 rounded-full"
//                                 onClick={prevReel}
//                               >
//                                 <FaArrowUp />
//                               </button>
//                             )}
//                             {index === myReels.length - 1 ? (
//                               ""
//                             ) : (
//                               <button
//                                 className="bg-gray-500 text-white py-5 px-5 rounded-full"
//                                 onClick={nextReel}
//                               >
//                                 <FaArrowDownLong />
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                       ) : (
//                         <p>No Reels Yet</p>
//                       )}
//                     </>
//                   )}
//                 </div>
//               )}
//             </>
//           )}
//         </>
//       )}
//     </>
//   );
// };

// export default Account;






















// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserData } from "../context/UserContext";
// import { PostData } from "../context/PostContext";
// import PostCard from "../components/PostCard";
// import { FaArrowDownLong, FaArrowUp } from "react-icons/fa6";
// import Modal from "../components/Modal";
// import axios from "axios";
// import { Loading } from "../components/Loading";
// import { CiEdit } from "react-icons/ci";
// import toast from "react-hot-toast";

// const Account = ({ user }) => {
//   const navigate = useNavigate();

//   const { logoutUser, updateProfilePic, updateProfileName } = UserData();

//   const { posts, reels, loading } = PostData();

//   let myPosts;

//   if (posts) {
//     myPosts = posts.filter((post) => post.owner._id === user._id);
//   }
//   let myReels;

//   if (reels) {
//     myReels = reels.filter((reel) => reel.owner._id === user._id);
//   }

//   const [type, setType] = useState("post");

//   const logoutHandler = () => {
//     logoutUser(navigate);
//   };

//   const [index, setIndex] = useState(0);

//   const prevReel = () => {
//     if (index === 0) {
//       console.log("null");
//       return null;
//     }
//     setIndex(index - 1);
//   };
//   const nextReel = () => {
//     if (index === myReels.length - 1) {
//       console.log("null");
//       return null;
//     }
//     setIndex(index + 1);
//   };

//   const [show, setShow] = useState(false);
//   const [show1, setShow1] = useState(false);

//   const [followersData, setFollowersData] = useState([]);
//   const [followingsData, setFollowingsData] = useState([]);

//   async function followData() {
//     try {
//       const { data } = await axios.get("/api/user/followdata/" + user._id);

//       setFollowersData(data.followers);
//       setFollowingsData(data.followings);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const [file, setFile] = useState("");

//   const changeFileHandler = (e) => {
//     const file = e.target.files[0];
//     setFile(file);
//   };

//   const changleImageHandler = () => {
//     const formdata = new FormData();

//     formdata.append("file", file);

//     updateProfilePic(user._id, formdata, setFile);
//   };

//   useEffect(() => {
//     followData();
//   }, [user]);

//   const [showInput, setShowInput] = useState(false);
//   const [name, setName] = useState(user.name ? user.name : "");

//   const UpdateName = () => {
//     updateProfileName(user._id, name, setShowInput);
//   };

//   const [showUpdatePass, setShowUpdatePass] = useState(false);
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");

//   async function updatePassword(e) {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("/api/user/" + user._id, {
//         oldPassword,
//         newPassword,
//       });

//       toast.success(data.message);
//       setOldPassword("");
//       setNewPassword("");
//       setShowUpdatePass(false);
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   }
//   return (
//     <>
//       {loading ? (
//         <Loading />
//       ) : (
//         <>
//           {user && (
//             <>
//               {loading ? (
//                 <Loading />
//               ) : (
//                 <div className="bg-gray-100 min-h-screen flex flex-col gap-4 items-center justify-center pt-3 pb-14">
//                   {show && (
//                     <Modal
//                       value={followersData}
//                       title={"Followers"}
//                       setShow={setShow}
//                     />
//                   )}
//                   {show1 && (
//                     <Modal
//                       value={followingsData}
//                       title={"Followings"}
//                       setShow={setShow1}
//                     />
//                   )}
//                   <div className="bg-white flex justify-between gap-4 p-8 rounded-lg shadow-md max-w-md">
//                     <div className="image flex flex-col justify-between mb-4 gap-4">
//                       <img
//                         src={user.profilePic.url}
//                         alt=""
//                         className="w-[180px] h-[180px] rounded-full"
//                       />
//                       <div className="update w-[150px] flex flex-col justify-center items-center">
//                         <input
//                           type="file"
//                           onChange={changeFileHandler}
//                           required
//                         />
//                         <button
//                           className="bg-blue-500 text-white px-3 py-2"
//                           onClick={changleImageHandler}
//                         >
//                           Update Profile
//                         </button>
//                       </div>
//                     </div>

//                     <div className="flex flex-col gap-2">
//                       {showInput ? (
//                         <>
//                           <div className="flex justify-center items-center gap-2">
//                             <input
//                               className="custom-input"
//                               style={{ width: "80px" }}
//                               value={name}
//                               onChange={(e) => setName(e.target.value)}
//                               placeholder="Enter Name"
//                               required
//                             />
//                             <button onClick={UpdateName}>Update</button>
//                             <button
//                               onClick={() => setShowInput(false)}
//                               className="bg-red-400 text-white p-2 rounded-full"
//                             >
//                               X
//                             </button>
//                           </div>
//                         </>
//                       ) : (
//                         <p className="text-gray-800 font-semibold">
//                           {user.name}{" "}
//                           <button onClick={() => setShowInput(true)}>
//                             <CiEdit />
//                           </button>
//                         </p>
//                       )}
//                       <p className="text-gray-500 text-sm">{user.email}</p>
//                       <p className="text-gray-500 text-sm font-bold">{user.skill}</p>
//                       <p
//                         className="text-gray-500 text-sm cursor-pointer"
//                         onClick={() => setShow(true)}
//                       >
//                         {user.followers.length} follower
//                       </p>
//                       <p
//                         className="text-gray-500 text-sm cursor-pointer"
//                         onClick={() => setShow1(true)}
//                       >
//                         {user.followings.length} following
//                       </p>
//                       <button
//                         onClick={logoutHandler}
//                         className=" bg-red-500 text-white rounded-md"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   </div>

//                   <button
//                     onClick={() => setShowUpdatePass(!showUpdatePass)}
//                     className="bg-blue-500 px-2 py-1 rounded-sm text-white"
//                   >
//                     {showUpdatePass ? "X" : "Update Password"}
//                   </button>

//                   {showUpdatePass && (
//                     <form
//                       onSubmit={updatePassword}
//                       className="flex justify-center items-center flex-col bg-white p-2 rounded-sm gap-4"
//                     >
//                       <input
//                         type="password"
//                         className="custom-input"
//                         placeholder="Old Password"
//                         value={oldPassword}
//                         onChange={(e) => setOldPassword(e.target.value)}
//                         required
//                       />
//                       <input
//                         type="password"
//                         className="custom-input"
//                         placeholder="new Password"
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                         required
//                       />
//                       <button
//                         type="submit"
//                         className="bg-blue-500 px-2 py-1 rounded-sm text-white"
//                       >
//                         Update Password
//                       </button>
//                     </form>
//                   )}
//                   <div className="controls flex justify-center items-center bg-gray-100 text-teal-500 font-bold text-3xl underline p-4 rounded-md gap-7">
//   Skills & Achievements Gallery
// </div>

//                   <div className="controls flex justify-center items-center bg-white p-4 rounded-md gap-7">
//                     <button onClick={() => setType("post")}>Images</button>
//                     <button onClick={() => setType("reel")}>Videos</button>
//                   </div>

//                   {type === "post" && (
//                     <>
//                       {myPosts && myPosts.length > 0 ? (
//                         myPosts.map((e) => (
//                           <PostCard type={"post"} value={e} key={e._id} />
//                         ))
//                       ) : (
//                         <p>No Images Yet</p>
//                       )}
//                     </>
//                   )}
//                   {type === "reel" && (
//                     <>
//                       {myReels && myReels.length > 0 ? (
//                         <div className="flex gap-3 justify-center items-center">
//                           <PostCard
//                             type={"reel"}
//                             value={myReels[index]}
//                             key={myReels[index]._id}
//                           />
//                           <div className="button flex flex-col justify-center items-center gap-6">
//                             {index === 0 ? (
//                               ""
//                             ) : (
//                               <button
//                                 className="bg-gray-500 text-white py-5 px-5 rounded-full"
//                                 onClick={prevReel}
//                               >
//                                 <FaArrowUp />
//                               </button>
//                             )}
//                             {index === myReels.length - 1 ? (
//                               ""
//                             ) : (
//                               <button
//                                 className="bg-gray-500 text-white py-5 px-5 rounded-full"
//                                 onClick={nextReel}
//                               >
//                                 <FaArrowDownLong />
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                       ) : (
//                         <p>No Videos Yet</p>
//                       )}
//                     </>
//                   )}
//                 </div>
//               )}
//             </>
//           )}
//         </>
//       )}
//     </>
//   );
// };

// export default Account;















// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserData } from "../context/UserContext";
// import { PostData } from "../context/PostContext";
// import PostCard from "../components/PostCard";
// import { FaArrowDownLong, FaArrowUp } from "react-icons/fa6";
// import Modal from "../components/Modal";
// import axios from "axios";
// import { Loading } from "../components/Loading";
// import { CiEdit } from "react-icons/ci";
// import toast from "react-hot-toast";

// const Account = ({ user }) => {
//   const navigate = useNavigate();
//   const { logoutUser, updateProfilePic, updateProfileName } = UserData();
//   const { posts, reels, loading } = PostData();

//   let myPosts = posts ? posts.filter((post) => post.owner._id === user._id) : [];
//   let myReels = reels ? reels.filter((reel) => reel.owner._id === user._id) : [];

//   const [type, setType] = useState("post");
//   const [index, setIndex] = useState(0);
//   const [show, setShow] = useState(false);
//   const [show1, setShow1] = useState(false);
//   const [followersData, setFollowersData] = useState([]);
//   const [followingsData, setFollowingsData] = useState([]);
//   const [file, setFile] = useState("");
//   const [showInput, setShowInput] = useState(false);
//   const [name, setName] = useState(user.name || "");
//   const [showUpdatePass, setShowUpdatePass] = useState(false);
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");

//   async function followData() {
//     try {
//       const { data } = await axios.get("/api/user/followdata/" + user._id);
//       setFollowersData(data.followers);
//       setFollowingsData(data.followings);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const changeFileHandler = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const changleImageHandler = () => {
//     const formdata = new FormData();
//     formdata.append("file", file);
//     updateProfilePic(user._id, formdata, setFile);
//   };

//   const UpdateName = () => {
//     updateProfileName(user._id, name, setShowInput);
//   };

//   async function updatePassword(e) {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("/api/user/" + user._id, {
//         oldPassword,
//         newPassword,
//       });
//       toast.success(data.message);
//       setOldPassword("");
//       setNewPassword("");
//       setShowUpdatePass(false);
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   }

//   const logoutHandler = () => {
//     logoutUser(navigate);
//   };

//   useEffect(() => {
//     followData();
//   }, [user]);

//   return (
//     <>
//       {loading ? (
//         <Loading />
//       ) : (
//         <div className="bg-gray-200 min-h-screen flex flex-col gap-6 items-center justify-center pt-5 pb-14 px-4">
//           {show && <Modal value={followersData} title={"Followers"} setShow={setShow} />}
//           {show1 && <Modal value={followingsData} title={"Followings"} setShow={setShow1} />}

//           <div className="bg-white rounded-xl shadow-lg p-6 w-full sm:w-80">
//             <div className="flex justify-center items-center mb-6">
//               <img src={user.profilePic.url} alt="profile" className="w-40 h-40 rounded-full object-cover border-4 border-teal-300 shadow-md" />
//             </div>

//             <div className="text-center mb-6">
//               {showInput ? (
//                 <div className="flex justify-center items-center gap-2">
//                   <input
//                     className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
//                     style={{ width: "200px" }}
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="Enter Name"
//                     required
//                   />
//                   <button onClick={UpdateName} className="bg-teal-500 text-white px-4 py-2 rounded-md">Update</button>
//                   <button onClick={() => setShowInput(false)} className="bg-red-500 text-white px-4 py-2 rounded-md">Cancel</button>
//                 </div>
//               ) : (
//                 <div className="flex justify-center items-center gap-2">
//                   <h3 className="text-2xl font-semibold">{user.name}</h3>
//                   <button onClick={() => setShowInput(true)}><CiEdit className="text-teal-500" /></button>
//                 </div>
//               )}
//               <p className="text-gray-600">{user.email}</p>
//               <p className="text-gray-600">{user.skill}</p>
//               <div className="flex justify-center gap-4 mt-4">
//               <button
//   onClick={() => setShow(true)}
//   className="bg-teal-100 text-teal-500 cursor-pointer px-4 py-2 rounded-md hover:bg-teal-200 transition duration-300"
// >
//   {user.followers.length} Follower
// </button>

// <button
//   onClick={() => setShow1(true)}
//   className="bg-teal-100 text-teal-500 cursor-pointer px-4 py-2 rounded-md hover:bg-teal-200 transition duration-300"
// >
//   {user.followings.length} Following
// </button>

//               </div>
//             </div>

//             <button onClick={logoutHandler} className="w-full py-2 bg-red-500 text-white rounded-md mt-6">Logout</button>
//           </div>

//           <button onClick={() => setShowUpdatePass(!showUpdatePass)} className="py-2 px-4 bg-teal-500 text-white rounded-md mt-6">
//             {showUpdatePass ? "Cancel" : "Update Password"}
//           </button>

//           <h1 className="text-4xl font-bold mt-10 bg-gradient-to-r from-teal-500 to-orange-400 text-transparent bg-clip-text animate-textShadow">
//   Skills and Achievement Gallery
// </h1>


//           {showUpdatePass && (
//             <form onSubmit={updatePassword} className="bg-white p-4 rounded-xl shadow-md mt-6 w-full sm:w-80">
//               <input
//                 type="password"
//                 className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none"
//                 placeholder="Old Password"
//                 value={oldPassword}
//                 onChange={(e) => setOldPassword(e.target.value)}
//                 required
//               />
//               <input
//                 type="password"
//                 className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none"
//                 placeholder="New Password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 required
//               />
//               <button type="submit" className="w-full py-2 bg-teal-500 text-white rounded-md">Update Password</button>
//             </form>
//           )}

//           <div className="flex justify-center items-center gap-4 mt-8 w-full sm:w-80">
//             <button onClick={() => setType("post")} className="px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">Images</button>
//             <button onClick={() => setType("reel")} className="px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">Videos</button>
//           </div>

//           {type === "post" && (
//             <div className="mt-6">
//               {myPosts.length > 0 ? (
//                 myPosts.map((post) => <PostCard key={post._id} type="post" value={post} />)
//               ) : (
//                 <p className="text-center text-gray-500">No Images Yet</p>
//               )}
//             </div>
//           )}

//           {type === "reel" && (
//             <div className="mt-6 flex flex-col justify-center items-center gap-4">
//               {myReels.length > 0 ? (
//                 <div className="flex gap-6 justify-center items-center">
//                   <PostCard key={myReels[index]._id} type="reel" value={myReels[index]} />
//                   <div className="flex flex-col items-center gap-4">
//                     <button onClick={prevReel} className="bg-teal-500 text-white p-3 rounded-full">{index !== 0 && <FaArrowUp />}</button>
//                     <button onClick={nextReel} className="bg-teal-500 text-white p-3 rounded-full">{index !== myReels.length - 1 && <FaArrowDownLong />}</button>
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-center text-gray-500">No Videos Yet</p>
//               )}
//             </div>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default Account;














// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserData } from "../context/UserContext";
// import { PostData } from "../context/PostContext";
// import PostCard from "../components/PostCard";
// import { FaArrowDownLong, FaArrowUp } from "react-icons/fa6";
// import Modal from "../components/Modal";
// import axios from "axios";
// import { Loading } from "../components/Loading";
// import { CiEdit } from "react-icons/ci";
// import toast from "react-hot-toast";

// const Account = ({ user }) => {
//   const navigate = useNavigate();
//   const { logoutUser, updateProfilePic, updateProfileName } = UserData();
//   const { posts, reels, loading } = PostData();

//   let myPosts = posts ? posts.filter((post) => post.owner._id === user._id) : [];
//   let myReels = reels ? reels.filter((reel) => reel.owner._id === user._id) : [];

//   const [type, setType] = useState("post");
//   const [index, setIndex] = useState(0);
//   const [show, setShow] = useState(false);
//   const [show1, setShow1] = useState(false);
//   const [followersData, setFollowersData] = useState([]);
//   const [followingsData, setFollowingsData] = useState([]);
//   const [file, setFile] = useState("");
//   const [showInput, setShowInput] = useState(false);
//   const [name, setName] = useState(user.name || "");
//   const [showUpdatePass, setShowUpdatePass] = useState(false);
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");

//   async function followData() {
//     try {
//       const { data } = await axios.get("/api/user/followdata/" + user._id);
//       setFollowersData(data.followers);
//       setFollowingsData(data.followings);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const changeFileHandler = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const changleImageHandler = () => {
//     const formdata = new FormData();
//     formdata.append("file", file);
//     updateProfilePic(user._id, formdata, setFile);
//   };

//   const UpdateName = () => {
//     updateProfileName(user._id, name, setShowInput);
//   };

//   async function updatePassword(e) {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("/api/user/" + user._id, {
//         oldPassword,
//         newPassword,
//       });
//       toast.success(data.message);
//       setOldPassword("");
//       setNewPassword("");
//       setShowUpdatePass(false);
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   }

//   const logoutHandler = () => {
//     logoutUser(navigate);
//   };

//   useEffect(() => {
//     followData();
//   }, [user]);

//   return (
//     <>
//       {loading ? (
//         <Loading />
//       ) : (
//         <div className="bg-gray-200 min-h-screen flex flex-col gap-6 items-center justify-center pt-5 pb-14 px-4">
//           {show && <Modal value={followersData} title={"Followers"} setShow={setShow} />}
//           {show1 && <Modal value={followingsData} title={"Followings"} setShow={setShow1} />}

//           <div className="bg-white rounded-xl shadow-lg p-6 w-full sm:w-[500px]">
//             <div className="flex justify-center items-center mb-6">
//               <img
//                 src={user.profilePic.url}
//                 alt="profile"
//                 className="w-40 h-40 rounded-full object-cover border-4 border-teal-300 shadow-md"
//               />
//             </div>

//             <div className="text-center mb-6">
//               {showInput ? (
//                 <div className="flex justify-center items-center gap-2">
//                   <input
//                     className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
//                     style={{ width: "200px" }}
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="Enter Name"
//                     required
//                   />
//                   <button
//                     onClick={UpdateName}
//                     className="bg-teal-500 text-white px-4 py-2 rounded-md"
//                   >
//                     Update
//                   </button>
//                   <button
//                     onClick={() => setShowInput(false)}
//                     className="bg-red-500 text-white px-4 py-2 rounded-md"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex justify-center items-center gap-2">
//                   <h3 className="text-2xl font-semibold">{user.name}</h3>
//                   <button onClick={() => setShowInput(true)}>
//                     <CiEdit className="text-teal-500" />
//                   </button>
//                 </div>
//               )}
//               <p className="text-gray-600">{user.email}</p>
//               <p className="text-gray-600">{user.skill}</p>
//               <div className="flex justify-center gap-4 mt-4">
//                 <button
//                   onClick={() => setShow(true)}
//                   className="bg-teal-100 text-teal-500 cursor-pointer px-4 py-2 rounded-md hover:bg-teal-200 transition duration-300"
//                 >
//                   {user.followers.length} Followers
//                 </button>

//                 <button
//                   onClick={() => setShow1(true)}
//                   className="bg-teal-100 text-teal-500 cursor-pointer px-4 py-2 rounded-md hover:bg-teal-200 transition duration-300"
//                 >
//                   {user.followings.length} Following
//                 </button>
//               </div>

//               <button
//                 onClick={() => setShowUpdatePass(!showUpdatePass)}
//                 className="w-1/2 py-2 mt-2 bg-teal-500 text-white rounded-md"
//               >
//                 {showUpdatePass ? "Cancel Update Password" : "Update Password"}
//               </button>
//             </div>

//             {showUpdatePass && (
//               <form
//                 onSubmit={updatePassword}
//                 className="bg-white p-4 rounded-xl shadow-md mt-6 w-full"
//               >
//                 <input
//                   type="password"
//                   className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none"
//                   placeholder="Old Password"
//                   value={oldPassword}
//                   onChange={(e) => setOldPassword(e.target.value)}
//                   required
//                 />
//                 <input
//                   type="password"
//                   className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none"
//                   placeholder="New Password"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                   required
//                 />
//                 <button
//                   type="submit"
//                   className="w-full py-2 bg-teal-500 text-white rounded-md"
//                 >
//                   Update Password
//                 </button>
//               </form>
//             )}

//             <button
//               onClick={logoutHandler}
//               className="w-full py-2 bg-red-500 text-white rounded-md mt-6"
//             >
//               Logout
//             </button>
//           </div>

//           <h1 className="text-4xl font-bold mt-10 bg-gradient-to-r from-teal-500 to-orange-400 text-transparent bg-clip-text animate-textShadow">
//             Skills and Achievement Gallery
//           </h1>

//           <div className="flex justify-center items-center gap-4 mt-8 w-full sm:w-96">
//             <button
//               onClick={() => setType("post")}
//               className="px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
//             >
//               Images
//             </button>
//             <button
//               onClick={() => setType("reel")}
//               className="px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
//             >
//               Videos
//             </button>
//           </div>

//           {type === "post" && (
//             <div className="mt-6">
//               {myPosts.length > 0 ? (
//                 myPosts.map((post) => (
//                   <PostCard key={post._id} type="post" value={post} />
//                 ))
//               ) : (
//                 <p className="text-center text-gray-500">No Images Yet</p>
//               )}
//             </div>
//           )}

//           {type === "reel" && (
//             <div className="mt-6 flex flex-col justify-center items-center gap-4">
//               {myReels.length > 0 ? (
//                 <div className="flex gap-6 justify-center items-center">
//                   <PostCard
//                     key={myReels[index]._id}
//                     type="reel"
//                     value={myReels[index]}
//                   />
//                   <div className="flex flex-col items-center gap-4">
//                     <button
//                       onClick={prevReel}
//                       className="bg-teal-500 text-white p-3 rounded-full"
//                     >
//                       {index !== 0 && <FaArrowUp />}
//                     </button>
//                     <button
//                       onClick={nextReel}
//                       className="bg-teal-500 text-white p-3 rounded-full"
//                     >
//                       {index !== myReels.length - 1 && <FaArrowDownLong />}
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-center text-gray-500">No Videos Yet</p>
//               )}
//             </div>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default Account;













import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";
import PostCard from "../components/PostCard";
import { FaArrowDownLong, FaArrowUp } from "react-icons/fa6";
import Modal from "../components/Modal";
import axios from "axios";
import { Loading } from "../components/Loading";
import { CiEdit } from "react-icons/ci";
import toast from "react-hot-toast";

const Account = ({ user }) => {
  const navigate = useNavigate();
  const { logoutUser, updateProfilePic, updateProfileName } = UserData();
  const { posts, reels, loading } = PostData();

  let myPosts = posts ? posts.filter((post) => post.owner._id === user._id) : [];
  let myReels = reels ? reels.filter((reel) => reel.owner._id === user._id) : [];

  const [type, setType] = useState("post");
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [followersData, setFollowersData] = useState([]);
  const [followingsData, setFollowingsData] = useState([]);
  const [file, setFile] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [showUpdatePass, setShowUpdatePass] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  async function followData() {
    try {
      const { data } = await axios.get("/api/user/followdata/" + user._id);
      setFollowersData(data.followers);
      setFollowingsData(data.followings);
    } catch (error) {
      console.log(error);
    }
  }

  const changeFileHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const changleImageHandler = () => {
    const formdata = new FormData();
    formdata.append("file", file);
    updateProfilePic(user._id, formdata, setFile);
  };

  const UpdateName = () => {
    updateProfileName(user._id, name, setShowInput);
  };

  async function updatePassword(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/user/" + user._id, {
        oldPassword,
        newPassword,
      });
      toast.success(data.message);
      setOldPassword("");
      setNewPassword("");
      setShowUpdatePass(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  // Logout handler
  const logoutHandler = () => {
    logoutUser(navigate);  // Logout and navigate to login page
  };

  useEffect(() => {
    followData();
  }, [user]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="setbg bg-gray-200 min-h-screen flex flex-col gap-6 items-center justify-center pt-5 pb-14 px-4">
          {show && <Modal value={followersData} title={"Followers"} setShow={setShow} />}
          {show1 && <Modal value={followingsData} title={"Followings"} setShow={setShow1} />}

          <div className="bg-white rounded-xl shadow-lg p-6 w-full sm:w-[500px]">
            {/* User Info Section */}
            <div className="flex justify-center items-center mb-6">
              <img
                src={user.profilePic.url}
                alt="profile"
                className="w-40 h-40 rounded-full object-cover border-4 border-teal-300 shadow-md"
              />
            </div>

            <div className="text-center mb-6">
              {/* Profile name and edit button */}
              {showInput ? (
                <div className="flex justify-center items-center gap-2">
                  <input
                    className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
                    style={{ width: "200px" }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Name"
                    required
                  />
                  <button
                    onClick={UpdateName}
                    className="bg-teal-500 text-white px-4 py-2 rounded-md"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setShowInput(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex justify-center items-center gap-2">
                  <h3 className="text-2xl font-semibold">{user.name}</h3>
                  <button onClick={() => setShowInput(true)}>
                    <CiEdit className="text-teal-500" />
                  </button>
                </div>
              )}
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">{user.skill}</p>

              {/* Followers and Following */}
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => setShow(true)}
                  className="bg-teal-100 text-teal-500 cursor-pointer px-4 py-2 rounded-md hover:bg-teal-200 transition duration-300"
                >
                  {user.followers.length} Followers
                </button>

                <button
                  onClick={() => setShow1(true)}
                  className="bg-teal-100 text-teal-500 cursor-pointer px-4 py-2 rounded-md hover:bg-teal-200 transition duration-300"
                >
                  {user.followings.length} Following
                </button>
              </div>

              {/* Update Password Button */}
              <button
                onClick={() => setShowUpdatePass(!showUpdatePass)}
                className="w-1/2 py-2 mt-2 bg-teal-500 text-white rounded-md"
              >
                {showUpdatePass ? "Cancel Update Password" : "Update Password"}
              </button>
            </div>

            {/* Password Update Form */}
            {showUpdatePass && (
              <form
                onSubmit={updatePassword}
                className="bg-white p-4 rounded-xl shadow-md mt-6 w-full"
              >
                <input
                  type="password"
                  className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none"
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-teal-500 text-white rounded-md"
                >
                  Update Password
                </button>
              </form>
            )}

            {/* Logout Button */}
            <button
              onClick={logoutHandler}
              className="w-full py-2 bg-red-500 text-white rounded-md mt-6"
            >
              Logout
            </button>
          </div>

          {/* Skills and Achievements Gallery Section */}
          <h1 className="text-4xl font-bold mt-10 bg-gradient-to-r from-teal-500 to-orange-400 text-transparent bg-clip-text animate-textShadow">
            Skills and Achievement Gallery
          </h1>
          
          {/* Post and Reel Buttons */}
          <div className="flex justify-center items-center gap-4 mt-8 w-full sm:w-96">
            <button
              onClick={() => setType("post")}
              className="px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
            >
              Images
            </button>
            <button
              onClick={() => setType("reel")}
              className="px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
            >
              Videos
            </button>
          </div>

          {/* Post or Reel Display */}
          {type === "post" && (
            <div className="mt-6">
              {myPosts.length > 0 ? (
                myPosts.map((post) => (
                  <PostCard key={post._id} type="post" value={post} />
                ))
              ) : (
                <p className="text-center text-gray-500">No Images Yet</p>
              )}
            </div>
          )}

          {type === "reel" && (
            <div className="mt-6 flex flex-col justify-center items-center gap-4">
              {myReels.length > 0 ? (
                myReels.map((reel) => (
                  <PostCard key={reel._id} type="reel" value={reel} />
                ))
              ) : (
                <p className="text-center text-gray-500">No Videos Yet</p>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Account;
