import { useState } from "react";
import { useDiscussion } from "../context/DiscussionContext";

function AskQuestion() {
  const { addPost } = useDiscussion();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <div>
      <h2>Ask a Question</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Describe your question"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AskQuestion;
