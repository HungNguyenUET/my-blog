import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => res.json())
            .then(data => setPost(data))
            .catch(err => console.error("Error fetching post:", err));
    }, [id]);

    if (!post) return <p>Loading...</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-700">{post.body}</p>
        </div>
    );
}

export default PostDetail;