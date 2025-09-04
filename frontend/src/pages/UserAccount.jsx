// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { PostData } from "../context/PostContext";
// import PostCard from "../components/PostCard";
// import { FaArrowDownLong, FaArrowUp } from "react-icons/fa6";
// import axios from "axios";
// import { Loading } from "../components/Loading";
// import { UserData } from "../context/UserContext";
// import Modal from "../components/Modal";
// import { SocketData } from "../context/SocketContext";

// const UserAccount = ({ user: loggedInUser }) => {
//   const navigate = useNavigate();

//   const { posts, reels } = PostData();

//   const [user, setUser] = useState([]);

//   const params = useParams();

//   const [loading, setLoading] = useState(true);

//   async function fetchUser() {
//     try {
//       const { data } = await axios.get("/api/user/" + params.id);

//       setUser(data);
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   }

//   console.log(user);

//   useEffect(() => {
//     fetchUser();
//   }, [params.id]);

//   let myPosts;

//   if (posts) {
//     myPosts = posts.filter((post) => post.owner._id === user._id);
//   }
//   let myReels;

//   if (reels) {
//     myReels = reels.filter((reel) => reel.owner._id === user._id);
//   }

//   const [type, setType] = useState("post");

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

//   const [followed, setFollowed] = useState(false);

//   const { followUser } = UserData();

//   const followHandler = () => {
//     setFollowed(!followed);
//     followUser(user._id, fetchUser);
//   };

//   const followers = user.followers;

//   useEffect(() => {
//     if (followers && followers.includes(loggedInUser._id)) setFollowed(true);
//   }, [user]);

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

//   useEffect(() => {
//     followData();
//   }, [user]);

//   const { onlineUsers } = SocketData();
//   return (
//     <>
//       {loading ? (
//         <Loading />
//       ) : (
//         <>
//           {user && (
//             <>
//               <div className="bg-gray-100 min-h-screen flex flex-col gap-4 items-center justify-center pt-3 pb-14">
//                 {show && (
//                   <Modal
//                     value={followersData}
//                     title={"Followers"}
//                     setShow={setShow}
//                   />
//                 )}
//                 {show1 && (
//                   <Modal
//                     value={followingsData}
//                     title={"Followings"}
//                     setShow={setShow1}
//                   />
//                 )}
//                 <div className="bg-white flex justify-between gap-4 p-8 rounded-lg shadow-md max-w-md">
//                   <div className="image flex flex-col justify-between mb-4 gap-4">
//                     <img
//                       src={user.profilePic.url}
//                       alt=""
//                       className="w-[180px] h-[180px] rounded-full"
//                     />
//                   </div>

//                   <div className="flex flex-col gap-2">
//                     <p className="flex justify-center items-center text-gray-800 font-semibold">
//                       {user.name}{" "}
//                       {onlineUsers.includes(user._id) && (
//                         <div className="ml-5 ">
//                           <span className="font-bold text-green-400">
//                             Online
//                           </span>
//                         </div>
//                       )}
//                     </p>
//                     <p className="text-gray-500 text-sm">{user.email}</p>
//                     <p className="text-gray-500 text-sm">{user.gender}</p>
//                     <p
//                       className="text-gray-500 text-sm cursor-pointer"
//                       onClick={() => setShow(true)}
//                     >
//                       {user.followers.length} follower
//                     </p>
//                     <p
//                       className="text-gray-500 text-sm cursor-pointer"
//                       onClick={() => setShow1(true)}
//                     >
//                       {user.followings.length} following
//                     </p>

//                     {user._id === loggedInUser._id ? (
//                       ""
//                     ) : (
//                       <button
//                         onClick={followHandler}
//                         className={`py-2 px-5 text-white rounded-md ${
//                           followed ? "bg-red-500" : "bg-blue-400"
//                         }`}
//                       >
//                         {followed ? "UnFollow" : "Follow"}
//                       </button>
//                     )}
//                   </div>
//                 </div>

//                 <div className="controls flex justify-center items-center bg-white p-4 rounded-md gap-7">
//                   <button onClick={() => setType("post")}>Posts</button>
//                   <button onClick={() => setType("reel")}>Reels</button>
//                 </div>

//                 {type === "post" && (
//                   <>
//                     {myPosts && myPosts.length > 0 ? (
//                       myPosts.map((e) => (
//                         <PostCard type={"post"} value={e} key={e._id} />
//                       ))
//                     ) : (
//                       <p>No Post Yet</p>
//                     )}
//                   </>
//                 )}
//                 {type === "reel" && (
//                   <>
//                     {myReels && myReels.length > 0 ? (
//                       <div className="flex gap-3 justify-center items-center">
//                         <PostCard
//                           type={"reel"}
//                           value={myReels[index]}
//                           key={myReels[index]._id}
//                         />
//                         <div className="button flex flex-col justify-center items-center gap-6">
//                           {index === 0 ? (
//                             ""
//                           ) : (
//                             <button
//                               className="bg-gray-500 text-white py-5 px-5 rounded-full"
//                               onClick={prevReel}
//                             >
//                               <FaArrowUp />
//                             </button>
//                           )}
//                           {index === myReels.length - 1 ? (
//                             ""
//                           ) : (
//                             <button
//                               className="bg-gray-500 text-white py-5 px-5 rounded-full"
//                               onClick={nextReel}
//                             >
//                               <FaArrowDownLong />
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     ) : (
//                       <p>No Reels Yet</p>
//                     )}
//                   </>
//                 )}
//               </div>
//             </>
//           )}
//         </>
//       )}
//     </>
//   );
// };

// export default UserAccount;
















// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams, Link } from "react-router-dom";
// import { PostData } from "../context/PostContext";
// import PostCard from "../components/PostCard";
// import { FaArrowDownLong, FaArrowUp } from "react-icons/fa6";
// import axios from "axios";
// import { Loading } from "../components/Loading";
// import { UserData } from "../context/UserContext";
// import Modal from "../components/Modal";
// import { SocketData } from "../context/SocketContext";

// const UserAccount = ({ user: loggedInUser }) => {
//   const navigate = useNavigate();
//   const { posts, reels } = PostData();
//   const [user, setUser] = useState([]);
//   const params = useParams();
//   const [loading, setLoading] = useState(true);
//   const [type, setType] = useState("post");
//   const [index, setIndex] = useState(0);
//   const [followed, setFollowed] = useState(false);
//   const { followUser } = UserData();
//   const [show, setShow] = useState(false);
//   const [show1, setShow1] = useState(false);
//   const [followersData, setFollowersData] = useState([]);
//   const [followingsData, setFollowingsData] = useState([]);
//   const { onlineUsers } = SocketData();

//   async function fetchUser() {
//     try {
//       const { data } = await axios.get(`/api/user/${params.id}`);
//       setUser(data);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//     }
//   }

//   async function followData() {
//     try {
//       const { data } = await axios.get(`/api/user/followdata/${user._id}`);
//       setFollowersData(data.followers);
//       setFollowingsData(data.followings);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   useEffect(() => {
//     fetchUser();
//   }, [params.id]);

//   useEffect(() => {
//     if (user.followers?.includes(loggedInUser._id)) setFollowed(true);
//     followData();
//   }, [user]);

//   const myPosts = posts?.filter((post) => post.owner._id === user._id) || [];
//   const myReels = reels?.filter((reel) => reel.owner._id === user._id) || [];

//   const prevReel = () => setIndex((prev) => (prev > 0 ? prev - 1 : prev));
//   const nextReel = () =>
//     setIndex((prev) => (prev < myReels.length - 1 ? prev + 1 : prev));

//   const followHandler = () => {
//     setFollowed(!followed);
//     followUser(user._id, fetchUser);
//   };

//   return (
//     <>
//       {loading ? (
//         <Loading />
//       ) : (
//         user && (
//           <div className="bg-gray-100 min-h-screen flex flex-col gap-4 items-center justify-center pt-3 pb-14">
//             {show && (
//               <Modal
//                 value={followersData}
//                 title="Followers"
//                 setShow={setShow}
//               />
//             )}
//             {show1 && (
//               <Modal
//                 value={followingsData}
//                 title="Followings"
//                 setShow={setShow1}
//               />
//             )}
//             <div className="bg-white flex justify-between gap-4 p-8 rounded-lg shadow-md max-w-md">
//               <div className="flex flex-col items-center gap-4">
//                 <img
//                   src={user.profilePic.url}
//                   alt={user.name}
//                   className="w-[180px] h-[180px] rounded-full"
//                 />
//               </div>
//               <div className="flex flex-col gap-2">
//                 <p className="text-gray-800 font-semibold">
//                   {user.name}{" "}
//                   {onlineUsers.includes(user._id) && (
//                     <span className="font-bold text-green-400 ml-2">Online</span>
//                   )}
//                 </p>
//                 <p className="text-gray-500 text-sm">{user.email}</p>
//                 <p className="text-gray-500 text-sm">{user.gender}</p>
//                 <p
//                   className="text-gray-500 text-sm cursor-pointer"
//                   onClick={() => setShow(true)}
//                 >
//                   {user.followers?.length || 0} follower
//                 </p>
//                 <p
//                   className="text-gray-500 text-sm cursor-pointer"
//                   onClick={() => setShow1(true)}
//                 >
//                   {user.followings?.length || 0} following
//                 </p>
//                 {user._id !== loggedInUser._id && (
//                   <button
//                     onClick={followHandler}
//                     className={`py-2 px-5 text-white rounded-md ${
//                       followed ? "bg-red-500" : "bg-blue-400"
//                     }`}
//                   >
//                     {followed ? "Connected" : "Connect"}
//                   </button>
//                 )}
//                 <div className="flex gap-4 mt-4">
//                   <Link
//                     to="/chat"
//                     className="py-2 px-4 text-white rounded-md"
//                     style={{
//                       background: "linear-gradient(to right, #34D399, #60A5FA)",
//                     }}
//                   >
//                     Chat
//                   </Link>
//                   <Link
//                     to="/video"
//                     className="py-2 px-4 text-white rounded-md"
//                     style={{
//                       background: "linear-gradient(to right, #34D399, #60A5FA)",
//                     }}
//                   >
//                     Video
//                   </Link>
//                 </div>
//                 <button
//                   className="py-2 px-5 mt-2 text-white rounded-md"
//                   style={{
//                     background: "linear-gradient(to right, #34D399, #60A5FA)",
//                   }}
//                 >
//                   Pay
//                 </button>
//               </div>
//             </div>

//             <div className="controls flex justify-center items-center bg-white p-4 rounded-md gap-7">
//               <button onClick={() => setType("post")}>Images</button>
//               <button onClick={() => setType("reel")}>Videos</button>
//             </div>

//             {type === "post" &&
//               (myPosts.length > 0 ? (
//                 myPosts.map((post) => (
//                   <PostCard key={post._id} type="post" value={post} />
//                 ))
//               ) : (
//                 <p>No Images Yet</p>
//               ))}

//             {type === "reel" &&
//               (myReels.length > 0 ? (
//                 <div className="flex gap-3 justify-center items-center">
//                   <PostCard
//                     type="reel"
//                     value={myReels[index]}
//                     key={myReels[index]._id}
//                   />
//                   <div className="button flex flex-col gap-6">
//                     {index > 0 && (
//                       <button
//                         className="bg-gray-500 text-white py-5 px-5 rounded-full"
//                         onClick={prevReel}
//                       >
//                         <FaArrowUp />
//                       </button>
//                     )}
//                     {index < myReels.length - 1 && (
//                       <button
//                         className="bg-gray-500 text-white py-5 px-5 rounded-full"
//                         onClick={nextReel}
//                       >
//                         <FaArrowDownLong />
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <p>No Videos Yet</p>
//               ))}
//           </div>
//         )
//       )}
//     </>
//   );
// };

// export default UserAccount;













import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { PostData } from "../context/PostContext";
import PostCard from "../components/PostCard";
import { FaArrowDownLong, FaArrowUp } from "react-icons/fa6";
import axios from "axios";
import { Loading } from "../components/Loading";
import { UserData } from "../context/UserContext";
import Modal from "../components/Modal";
import { SocketData } from "../context/SocketContext";

const UserAccount = ({ user: loggedInUser }) => {
  const navigate = useNavigate();
  const { posts, reels } = PostData();
  const [user, setUser] = useState([]);
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("post");
  const [index, setIndex] = useState(0);
  const [followed, setFollowed] = useState(false);
  const { followUser } = UserData();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [followersData, setFollowersData] = useState([]);
  const [followingsData, setFollowingsData] = useState([]);
  const { onlineUsers } = SocketData();

  async function fetchUser() {
    try {
      const { data } = await axios.get(`/api/user/${params.id}`);
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  async function followData() {
    try {
      const { data } = await axios.get(`/api/user/followdata/${user._id}`);
      setFollowersData(data.followers);
      setFollowingsData(data.followings);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [params.id]);

  useEffect(() => {
    if (user.followers?.includes(loggedInUser._id)) setFollowed(true);
    followData();
  }, [user]);

  const myPosts = posts?.filter((post) => post.owner._id === user._id) || [];
  const myReels = reels?.filter((reel) => reel.owner._id === user._id) || [];

  const prevReel = () => setIndex((prev) => (prev > 0 ? prev - 1 : prev));
  const nextReel = () =>
    setIndex((prev) => (prev < myReels.length - 1 ? prev + 1 : prev));

  const followHandler = () => {
    setFollowed(!followed);
    followUser(user._id, fetchUser);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        user && (
          <div className="setbg bg-gray-50 min-h-screen flex flex-col gap-8 pt-5 pb-14 items-center">
            {show && (
              <Modal
                value={followersData}
                title="Followers"
                setShow={setShow}
              />
            )}
            {show1 && (
              <Modal
                value={followingsData}
                title="Followings"
                setShow={setShow1}
              />
            )}
            <div className="bg-white flex justify-between items-center gap-6 p-6 rounded-xl shadow-xl max-w-3xl w-full">
              <div className="flex flex-col items-center gap-6">
                <img
                  src={user.profilePic.url}
                  alt={user.name}
                  className="w-[180px] h-[180px] rounded-full object-cover border-4 border-gray-200"
                />
                <p className="text-xl font-semibold text-gray-800">{user.name}</p>
                {onlineUsers.includes(user._id) && (
                  <span className="text-green-500 font-semibold">Online</span>
                )}
              </div>
              <div className="flex flex-col gap-3 w-2/3">
                <p className="text-gray-600 text-sm">{user.email}</p>
                <p className="text-gray-600 text-sm">{user.gender}</p>
                <div className="flex justify-between">
                  <p
                    className="text-gray-600 text-sm cursor-pointer"
                    onClick={() => setShow(true)}
                  >
                    {user.followers?.length} followers
                  </p>
                  <p
                    className="text-gray-600 text-sm cursor-pointer"
                    onClick={() => setShow1(true)}
                  >
                    {user.followings?.length} following
                  </p>
                </div>
                {user._id !== loggedInUser._id && (
                  <button
                    onClick={followHandler}
                    className={`py-2 px-6 text-white rounded-lg ${
                      followed ? "bg-red-500" : "bg-[#009688]"
                    }`}
                  >
                    {followed ? "Connected" : "Connect"}
                  </button>
                )}
                <div className="flex gap-8 mt-4">
                  <Link
                    to="/chat"
                    className="py-2 px-4 text-white rounded-lg"
                    style={{
                      background: "#009688",
                    }}
                  >
                    Chat
                  </Link>
                  <a
  href="https://videoconferencing952004.netlify.app/"
  target="_blank"
  rel="noopener noreferrer"
  className="py-2 px-4 text-white rounded-lg"
  style={{
    background: "#009688",
  }}
>
  Meet
</a>

                  <button
                    className="py-2 px-4 text-white rounded-lg"
                    style={{
                      background: "#009688",
                    }}
                  >
                    Pay
                  </button>
                </div>
              </div>
            </div>

            <div className="controls flex justify-center items-center bg-white p-4 rounded-md gap-8 w-full max-w-3xl">
              <button
                onClick={() => setType("post")}
                className={`py-2 px-6 rounded-lg ${
                  type === "post" ? "bg-[#009688] text-white" : "bg-gray-200"
                }`}
              >
                Images
              </button>
              <button
                onClick={() => setType("reel")}
                className={`py-2 px-6 rounded-lg ${
                  type === "reel" ? "bg-[#009688] text-white" : "bg-gray-200"
                }`}
              >
                Videos
              </button>
            </div>

            {type === "post" &&
              (myPosts.length > 0 ? (
                myPosts.map((post) => (
                  <PostCard key={post._id} type="post" value={post} />
                ))
              ) : (
                <p className="text-gray-500">No Images Yet</p>
              ))}

            {type === "reel" &&
              (myReels.length > 0 ? (
                <div className="flex gap-6 justify-center items-center">
                  <PostCard
                    type="reel"
                    value={myReels[index]}
                    key={myReels[index]._id}
                  />
                  <div className="button flex flex-col gap-4">
                    {index > 0 && (
                      <button
                        className="bg-gray-500 text-white py-3 px-5 rounded-full"
                        onClick={prevReel}
                      >
                        <FaArrowUp />
                      </button>
                    )}
                    {index < myReels.length - 1 && (
                      <button
                        className="bg-gray-500 text-white py-3 px-5 rounded-full"
                        onClick={nextReel}
                      >
                        <FaArrowDownLong />
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No Videos Yet</p>
              ))}
          </div>
        )
      )}
    </>
  );
};

export default UserAccount;
