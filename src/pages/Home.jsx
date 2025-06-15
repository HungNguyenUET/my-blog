import { use, useEffect, useState } from "react"
import PostCard from "../components/PostCard";

function Home () {
    const [posts, setPosts] = useState([]);
    const [query, setQuery] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
       fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then(res => res.json())
      .then(data => setPosts(data));
    }, [])

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Latest Posts</h1>
            <div className="space-y-4">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}

export default Home