import { useEffect, useState } from "react"
import PostCard from "../components/PostCard";
import useDebounce from "../hooks/useDebounce";
import { Link } from "react-router-dom";

function Home () {
    const [posts, setPosts] = useState([]);
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 300);

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 2;

    useEffect(() => {
        const localPosts = JSON.parse(localStorage.getItem('posts') || '[]');

       fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
        .then(res => res.json())
        .then(apiPosts  => {
                setPosts([...localPosts, ...apiPosts]);
            });
    }, []);

    // Filter posts by query
    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(debouncedQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

    const goToPrevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
    const goToNextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

    return (
        <div>
            <Link
                to="/create"
                className="inline-block mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                ➕ Create New Post
            </Link>
            <h1 className="text-3xl font-bold mb-4">Latest Posts</h1>

            <div className="relative mb-6">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    🔍
                </span>
                <input
                    type="text"
                    placeholder="Search posts..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-10 w-full border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {currentPosts.length > 0 ? (
                <div className="space-y-4 mb-4">
                    {currentPosts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))} 
                </div>
            ) : (
                <p className="text-gray-500">No matching posts found.</p>
            )}

            {totalPages > 1 && (
                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={goToPrevPage}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded bg-blue-500 text-white disabled:bg-gray-300">
                        ← Prev   
                    </button>
                    <span className="text-sm">
                        Page <strong>{currentPage}</strong> of {totalPages}
                    </span>
                    <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded bg-blue-500 text-white disabled:bg-gray-300">
                        Next →
                    </button>
                </div>
            )}
        </div>
    );
}

export default Home