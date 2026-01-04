import { useDiscussion } from "../context/DiscussionContext";

function Discussions() {
  const { posts, deletePost } = useDiscussion();

  return (
    <div>
      <h2>All Discussions</h2>

      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>

          <button onClick={() => deletePost(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Discussions;
