import { useParams } from "react-router-dom";
import { useDiscussion } from "../context/DiscussionContext";

function DiscussionDetails() {
  const { id } = useParams();
  const { posts } = useDiscussion();

  const post = posts.find((p) => p.id === Number(id));

  if (!post) return <p>Post not found</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
}

export default DiscussionDetails;
