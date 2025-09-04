// import React from "react";
// import AddPost from "../components/AddPost";
// import PostCard from "../components/PostCard";
// import { PostData } from "../context/PostContext";
// import { Loading } from "../components/Loading";

// const Home = () => {
//   const { posts, loading } = PostData();
//   return (
//     <>
//       {loading ? (
//         <Loading />
//       ) : (
//         <div>
//           <AddPost type="post" />
//           {posts && posts.length > 0 ? (
//             posts.map((e) => <PostCard value={e} key={e._id} type={"post"} />)
//           ) : (
//             <p>No Post Yet</p>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default Home;












import React from "react";
import AddPost from "../components/AddPost";
import PostCard from "../components/PostCard";
import { PostData } from "../context/PostContext";
import { Loading } from "../components/Loading";

const Home = () => {
  const { posts, loading } = PostData();
  return (
    <>
      {loading ? (
        <div className="loading">
          <Loading />
        </div>
      ) : (
        <div className="home-container">
          <div className="add-post">
            <AddPost type="post" />
          </div>
          {posts && posts.length > 0 ? (
            posts.map((e) => (
              <div className="post-card" key={e._id}>
                <PostCard value={e} type={"post"} />
              </div>
            ))
          ) : (
            <p>No Post Yet</p>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
