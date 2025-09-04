// import React, { useEffect, useState } from "react";
// import { ChatData } from "../context/ChatContext";
// import axios from "axios";
// import { FaSearch } from "react-icons/fa";
// import Chat from "../components/chat/Chat";
// import MessageContainer from "../components/chat/MessageContainer";
// import { SocketData } from "../context/SocketContext";

// const ChatPage = ({ user }) => {
//   const { createChat, selectedChat, setSelectedChat, chats, setChats } =
//     ChatData();

//   const [users, setUsers] = useState([]);
//   const [query, setQuery] = useState("");
//   const [search, setSearch] = useState(false);

//   async function fetchAllUsers() {
//     try {
//       const { data } = await axios.get("/api/user/all?search=" + query);

//       setUsers(data);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const getAllChats = async () => {
//     try {
//       const { data } = await axios.get("/api/messages/chats");
//       setChats(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchAllUsers();
//   }, [query]);

//   useEffect(() => {
//     getAllChats();
//   }, []);

//   async function createNewChat(id) {
//     await createChat(id);
//     setSearch(false);
//     getAllChats();
//   }

//   const { onlineUsers, socket } = SocketData();
//   return (
//     <div className="w-[100%] md:w-[750px] md:p-4">
//       <div className="flex gap-4 mx-auto">
//         <div className="w-[30%]">
//           <div className="top">
//             <button
//               className="bg-blue-500 text-white px-3 py-1 rounded-full"
//               onClick={() => setSearch(!search)}
//             >
//               {search ? "X" : <FaSearch />}
//             </button>
//             {search ? (
//               <>
//                 <input
//                   type="text"
//                   className="custom-input"
//                   style={{ width: "100px", border: "gray solid 1px" }}
//                   placeholder="Enter name"
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                 />

//                 <div className="users">
//                   {users && users.length > 0 ? (
//                     users.map((e) => (
//                       <div
//                         key={e._id}
//                         onClick={() => createNewChat(e._id)}
//                         className="bg-gray-500 text-white p-2 mt-2 cursor-pointer flex justify-center items-center gap-2"
//                       >
//                         <img
//                           src={e.profilePic.url}
//                           className="w-8 h-8 rounded-full"
//                           alt=""
//                         />
//                         {e.name}
//                       </div>
//                     ))
//                   ) : (
//                     <p>No Users</p>
//                   )}
//                 </div>
//               </>
//             ) : (
//               <div className="flex flex-col justify-center items-center mt-2">
//                 {chats.map((e) => (
//                   <Chat
//                     key={e._id}
//                     chat={e}
//                     setSelectedChat={setSelectedChat}
//                     isOnline={onlineUsers.includes(e.users[0]._id)}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//         {selectedChat === null ? (
//           <div className="w-[70%] mx-20 mt-40 text-2xl">
//             Hello 👋 {user.name} select a chat to start conversation
//           </div>
//         ) : (
//           <div className="w-[70%]">
//             <MessageContainer selectedChat={selectedChat} setChats={setChats} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatPage;












// import React, { useEffect, useState } from "react";
// import { ChatData } from "../context/ChatContext";
// import axios from "axios";
// import { FaSearch } from "react-icons/fa";
// import Chat from "../components/chat/Chat";
// import MessageContainer from "../components/chat/MessageContainer";
// import { SocketData } from "../context/SocketContext";

// const ChatPage = ({ user }) => {
//   const { createChat, selectedChat, setSelectedChat, chats, setChats } =
//     ChatData();

//   const [users, setUsers] = useState([]);
//   const [query, setQuery] = useState("");
//   const [search, setSearch] = useState(false);

//   async function fetchAllUsers() {
//     try {
//       const { data } = await axios.get("/api/user/all?search=" + query);

//       setUsers(data);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const getAllChats = async () => {
//     try {
//       const { data } = await axios.get("/api/messages/chats");
//       setChats(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchAllUsers();
//   }, [query]);

//   useEffect(() => {
//     getAllChats();
//   }, []);

//   async function createNewChat(id) {
//     await createChat(id);
//     setSearch(false);
//     getAllChats();
//   }

//   const { onlineUsers, socket } = SocketData();
//   return (
//     <div className="w-[100%] md:w-[750px] md:p-4">
//       <div className="flex gap-4 mx-auto">
//         <div className="w-[30%]">
//           <div className="top">
//             <button
//               className="bg-blue-500 text-white px-3 py-1 rounded-full"
//               onClick={() => setSearch(!search)}
//             >
//               {search ? "X" : <FaSearch />}
//             </button>
//             {search ? (
//               <>
//                 <input
//                   type="text"
//                   className="custom-input"
//                   style={{ width: "12rem", border: "gray solid 1px" }}
//                   placeholder="Search"
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                 />

//                 <div className="users">
//                   {users && users.length > 0 ? (
//                     users.map((e) => (
//                       <div
//                         key={e._id}
//                         onClick={() => createNewChat(e._id)}
//                         className="bg-gray-500 text-white p-2 mt-2 cursor-pointer flex justify-center items-center gap-2"
//                       >
//                         <img
//                           src={e.profilePic.url}
//                           className="w-8 h-8 rounded-full"
//                           alt=""
//                         />
//                         {e.name}
//                         <span className="ml-2">{e.skill}</span> {/* Added margin-left to create a gap */}
//                       </div>
//                     ))
//                   ) : (
//                     <p>No Users</p>
//                   )}
//                 </div>
//               </>
//             ) : (
//               <div className="flex flex-col justify-center items-center mt-2">
//                 {chats.map((e) => (
//                   <Chat
//                     key={e._id}
//                     chat={e}
//                     setSelectedChat={setSelectedChat}
//                     isOnline={onlineUsers.includes(e.users[0]._id)}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//         {selectedChat === null ? (
//           <div className="w-[70%] mx-20 mt-40 text-2xl">
//             Hello 👋 {user.skill} select a chat to start conversation
//           </div>
//         ) : (
//           <div className="w-[70%]">
//             <MessageContainer selectedChat={selectedChat} setChats={setChats} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatPage;












import React, { useEffect, useState } from "react";
import { ChatData } from "../context/ChatContext";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import Chat from "../components/chat/Chat";
import MessageContainer from "../components/chat/MessageContainer";
import { SocketData } from "../context/SocketContext";

const ChatPage = ({ user }) => {
  const { createChat, selectedChat, setSelectedChat, chats, setChats } =
    ChatData();

  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(false);

  async function fetchAllUsers() {
    try {
      const { data } = await axios.get("/api/user/all?search=" + query);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }

  const getAllChats = async () => {
    try {
      const { data } = await axios.get("/api/messages/chats");
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, [query]);

  useEffect(() => {
    getAllChats();
  }, []);

  async function createNewChat(id) {
    await createChat(id);
    setSearch(false);
    getAllChats();
  }

  const { onlineUsers, socket } = SocketData();
  return (
    <div className="chatbg w-full md:w-3/4 md:p-6 mx-auto">
      <div className="flex gap-6">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-white shadow-lg rounded-lg p-4">
          <div className="flex justify-between items-center">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-full focus:outline-none"
              onClick={() => setSearch(!search)}
            >
              {search ? "Close" : <FaSearch />}
            </button>
          </div>

          {search ? (
            <>
              <input
                type="text"
                className="custom-input mt-4 px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search users"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <div className="mt-4 max-h-72 overflow-y-auto">
                {users && users.length > 0 ? (
                  users.map((e) => (
                    <div
                      key={e._id}
                      onClick={() => createNewChat(e._id)}
                      className="bg-gray-200 text-gray-800 p-3 mt-2 rounded-md cursor-pointer hover:bg-blue-50"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={e.profilePic.url}
                          className="w-10 h-10 rounded-full"
                          alt={e.name}
                        />
                        <div className="flex-1">
                          <p className="text-lg font-semibold">{e.name}</p>
                          <span className="text-sm text-gray-500">{e.skill}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No Users</p>
                )}
              </div>
            </>
          ) : (
            <div className="mt-4">
              {chats.map((e) => (
                <Chat
                  key={e._id}
                  chat={e}
                  setSelectedChat={setSelectedChat}
                  isOnline={onlineUsers.includes(e.users[0]._id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Message Container */}
        <div className="w-2/3">
          {selectedChat === null ? (
            <div className="flex justify-center items-center text-center h-full">
              <h2 className="text-2xl text-gray-600">
                Hello 👋 {user.skill}, select a chat to start a conversation
              </h2>
            </div>
          ) : (
            <MessageContainer selectedChat={selectedChat} setChats={setChats} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;











// import React, { useEffect, useState } from "react";
// import { ChatData } from "../context/ChatContext";
// import axios from "axios";
// import { FaSearch } from "react-icons/fa";
// import Chat from "../components/chat/Chat";
// import MessageContainer from "../components/chat/MessageContainer";
// import { SocketData } from "../context/SocketContext";

// const ChatPage = ({ user }) => {
//   const { createChat, selectedChat, setSelectedChat, chats, setChats } =
//     ChatData();

//   const [users, setUsers] = useState([]);
//   const [query, setQuery] = useState("");
//   const [search, setSearch] = useState(false);

//   async function fetchAllUsers() {
//     try {
//       const { data } = await axios.get("/api/user/all?search=" + query);
//       setUsers(data);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const getAllChats = async () => {
//     try {
//       const { data } = await axios.get("/api/messages/chats");
//       setChats(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchAllUsers();
//   }, [query]);

//   useEffect(() => {
//     getAllChats();
//   }, []);

//   async function createNewChat(id) {
//     await createChat(id);
//     setSearch(false);
//     getAllChats();
//   }

//   const { onlineUsers } = SocketData();

//   return (
//     <div className="h-screen bg-gray-100">
//       <div className="flex h-full">
//         {/* Sidebar */}
//         <div className="w-full md:w-1/3 lg:w-1/4 bg-white shadow-lg flex flex-col p-4">
//           <div className="flex justify-between items-center">
//             <button
//               className="bg-blue-600 text-white px-4 py-2 rounded-full focus:outline-none"
//               onClick={() => setSearch(!search)}
//             >
//               {search ? "Close" : <FaSearch />}
//             </button>
//           </div>

//           {search ? (
//             <div className="mt-4">
//               <input
//                 type="text"
//                 className="custom-input px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Search users"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//               />
//               <div className="mt-4 max-h-[70vh] overflow-y-auto">
//                 {users.length > 0 ? (
//                   users.map((e) => (
//                     <div
//                       key={e._id}
//                       onClick={() => createNewChat(e._id)}
//                       className="bg-gray-200 text-gray-800 p-3 mt-2 rounded-md cursor-pointer hover:bg-blue-50 flex items-center gap-4"
//                     >
//                       <img
//                         src={e.profilePic.url}
//                         className="w-10 h-10 rounded-full"
//                         alt={e.name}
//                       />
//                       <div className="flex-1">
//                         <p className="text-lg font-semibold">{e.name}</p>
//                         <span className="text-sm text-gray-500">{e.skill}</span>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-center text-gray-500">No Users Found</p>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <div className="mt-4 max-h-[80vh] overflow-y-auto">
//               {chats.map((e) => (
//                 <Chat
//                   key={e._id}
//                   chat={e}
//                   setSelectedChat={setSelectedChat}
//                   isOnline={onlineUsers.includes(e.users[0]._id)}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Chat Container */}
//         <div className="flex-grow bg-gray-50 flex items-center justify-center">
//           {selectedChat ? (
//             <MessageContainer selectedChat={selectedChat} setChats={setChats} />
//           ) : (
//             <div className="text-center">
//               <h2 className="text-2xl text-gray-600">
//                 Hello 👋 {user.skill}, select a chat to start a conversation
//               </h2>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;
