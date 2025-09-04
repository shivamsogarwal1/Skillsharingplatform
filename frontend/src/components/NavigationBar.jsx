// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { AiOutlineHome, AiFillHome } from "react-icons/ai";
// import { BsCameraReelsFill, BsCameraReels } from "react-icons/bs";
// import { IoSearchCircleOutline, IoSearchCircle } from "react-icons/io5";
// import {
//   IoChatbubbleEllipses,
//   IoChatbubbleEllipsesOutline,
// } from "react-icons/io5";
// import { RiAccountCircleFill, RiAccountCircleLine } from "react-icons/ri";

// const NavigationBar = () => {
//   const [tab, setTab] = useState(window.location.pathname);
//   return (
//     <div className="fixed bottom-0 w-full bg-white py-3">
//       <div className="flex justify-around">
//         <Link
//           to={"/"}
//           onClick={() => setTab("/")}
//           className="flex flex-col items-center text-2xl"
//         >
//           <span>{tab === "/" ? <AiFillHome /> : <AiOutlineHome />}</span>
//         </Link>
//         <Link
//           to={"/reels"}
//           onClick={() => setTab("/reels")}
//           className="flex flex-col items-center text-2xl"
//         >
//           <span>
//             {tab === "/reels" ? <BsCameraReelsFill /> : <BsCameraReels />}
//           </span>
//         </Link>
//         <Link
//           onClick={() => setTab("/search")}
//           to={"/search"}
//           className="flex flex-col items-center text-2xl"
//         >
//           <span>
//             {tab === "/search" ? <IoSearchCircle /> : <IoSearchCircleOutline />}
//           </span>
//         </Link>
//         <Link
//           onClick={() => setTab("/chat")}
//           to={"/chat"}
//           className="flex flex-col items-center text-2xl"
//         >
//           <span>
//             {tab === "/chat" ? (
//               <IoChatbubbleEllipses />
//             ) : (
//               <IoChatbubbleEllipsesOutline />
//             )}
//           </span>
//         </Link>
//         <Link
//           onClick={() => setTab("/account")}
//           to={"/account"}
//           className="flex flex-col items-center text-2xl"
//         >
//           <span>
//             {tab === "/account" ? (
//               <RiAccountCircleFill />
//             ) : (
//               <RiAccountCircleLine />
//             )}
//           </span>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default NavigationBar;











import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { BsCameraReelsFill, BsCameraReels } from "react-icons/bs";
import { IoSearchCircleOutline, IoSearchCircle } from "react-icons/io5";
import { IoChatbubbleEllipses, IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { RiAccountCircleFill, RiAccountCircleLine } from "react-icons/ri";

const NavigationBar = () => {
  const [tab, setTab] = useState(window.location.pathname);

  return (
    <div className="fixed bottom-0 w-full bg-white py-4 shadow-xl rounded-t-3xl border-t-4 border-teal-400 z-50">
      <div className="flex justify-around items-center">
        <Link
          to={"/"}
          onClick={() => setTab("/")}
          className={`flex flex-col items-center text-xl ${
            tab === "/" ? "text-teal-500" : "text-gray-600"
          } transition-all duration-300 ease-in-out hover:text-teal-600`}
        >
          <span>{tab === "/" ? <AiFillHome /> : <AiOutlineHome />}</span>
          <span className="text-sm">Home</span>
        </Link>

        <Link
          to={"/reels"}
          onClick={() => setTab("/reels")}
          className={`flex flex-col items-center text-xl ${
            tab === "/reels" ? "text-teal-500" : "text-gray-600"
          } transition-all duration-300 ease-in-out hover:text-teal-600`}
        >
          <span>{tab === "/reels" ? <BsCameraReelsFill /> : <BsCameraReels />}</span>
          <span className="text-sm">Videos</span>
        </Link>

        <Link
          to={"/search"}
          onClick={() => setTab("/search")}
          className={`flex flex-col items-center text-xl ${
            tab === "/search" ? "text-teal-500" : "text-gray-600"
          } transition-all duration-300 ease-in-out hover:text-teal-600`}
        >
          <span>{tab === "/search" ? <IoSearchCircle /> : <IoSearchCircleOutline />}</span>
          <span className="text-sm">Search</span>
        </Link>

        <Link
          to={"/chat"}
          onClick={() => setTab("/chat")}
          className={`flex flex-col items-center text-xl ${
            tab === "/chat" ? "text-teal-500" : "text-gray-600"
          } transition-all duration-300 ease-in-out hover:text-teal-600`}
        >
          <span>
            {tab === "/chat" ? <IoChatbubbleEllipses /> : <IoChatbubbleEllipsesOutline />}
          </span>
          <span className="text-sm">Chat</span>
        </Link>

        <Link
          to={"/account"}
          onClick={() => setTab("/account")}
          className={`flex flex-col items-center text-xl ${
            tab === "/account" ? "text-teal-500" : "text-gray-600"
          } transition-all duration-300 ease-in-out hover:text-teal-600`}
        >
          <span>
            {tab === "/account" ? <RiAccountCircleFill /> : <RiAccountCircleLine />}
          </span>
          <span className="text-sm">Account</span>
        </Link>
      </div>
    </div>
  );
};

export default NavigationBar;
