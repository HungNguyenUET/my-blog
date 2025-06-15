import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-2">{post.body.substring(0, 100)}...</p>
      <Link to={`/posts/${post.id}`} className="text-blue-500 hover:underline">
        Read more →
      </Link>
    </div>
  );
}

export default PostCard;