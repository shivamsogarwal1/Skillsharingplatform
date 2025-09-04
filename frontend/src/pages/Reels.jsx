// import React, { useState } from "react";
// import AddPost from "../components/AddPost";
// import { PostData } from "../context/PostContext";
// import PostCard from "../components/PostCard";
// import { FaArrowUp, FaArrowDownLong } from "react-icons/fa6";
// import { Loading } from "../components/Loading";

// const Reels = () => {
//   const { reels, loading } = PostData();
//   const [index, setIndex] = useState(0);

//   const prevReel = () => {
//     if (index === 0) {
//       console.log("null");
//       return null;
//     }
//     setIndex(index - 1);
//   };
//   const nextReel = () => {
//     if (index === reels.length - 1) {
//       console.log("null");
//       return null;
//     }
//     setIndex(index + 1);
//   };
//   return (
//     <>
//       {loading ? (
//         <Loading />
//       ) : (
//         <div className="bg-gray-100">
//           <AddPost type="reel" />
//           <div className="flex m-auto gap-3 w-[300px] md:w-[500px]">
//             {reels && reels.length > 0 ? (
//               <PostCard
//                 key={reels[index]._id}
//                 value={reels[index]}
//                 type={"reel"}
//               />
//             ) : (
//               <p>No videos yet</p>
//             )}
//             <div className="button flex flex-col justify-center items-center gap-6">
//               {index === 0 ? (
//                 ""
//               ) : (
//                 <button
//                   className="bg-gray-500 text-white py-5 px-5 rounded-full"
//                   onClick={prevReel}
//                 >
//                   <FaArrowUp />
//                 </button>
//               )}
//               {index === reels.length - 1 ? (
//                 ""
//               ) : (
//                 <button
//                   className="bg-gray-500 text-white py-5 px-5 rounded-full"
//                   onClick={nextReel}
//                 >
//                   <FaArrowDownLong />
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Reels;












import React, { useState } from "react";
import AddPost from "../components/AddPost";
import { PostData } from "../context/PostContext";
import PostCard from "../components/PostCard";
import { FaArrowUp, FaArrowDownLong } from "react-icons/fa6";
import { Loading } from "../components/Loading";

const Reels = () => {
  const { reels, loading } = PostData();
  const [index, setIndex] = useState(0);

  const prevReel = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const nextReel = () => {
    if (index < reels.length - 1) {
      setIndex(index + 1);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="reels-container">
          {/* Add Post Section */}
          <div className="add-post">
            <AddPost type="reel" />
          </div>

          {/* Reels Display Section */}
          <div className="reels-content">
            {reels && reels.length > 0 ? (
              <div className="reels-card-container">
                <PostCard
                  key={reels[index]._id}
                  value={reels[index]}
                  type="reel"
                  className="post-card"
                />

                {/* Navigation Buttons */}
                <div className="reels-navigation">
                  {index > 0 && (
                    <button className="nav-button" onClick={prevReel}>
                      <FaArrowUp size={20} />
                    </button>
                  )}
                  {index < reels.length - 1 && (
                    <button className="nav-button" onClick={nextReel}>
                      <FaArrowDownLong size={20} />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <p className="empty-state">
                No videos yet. Start uploading your reels!
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Reels;
