import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!title.trim() || !body.trim()) {
            alert("Title and body cannot be empty.");
            return;
        }

        const newPost = {
            id: Date.now(), 
            title: title.trim(),
            body: body.trim(),
        };

        const stored = JSON.parse(localStorage.getItem('posts') || '[]');
        localStorage.setItem('posts', JSON.stringify([newPost, ...stored]));

        navigate('/');
    };
    
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Create New Post</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Title</label>
                    <input
                        className="w-full border px-4 py-2 rounded shadow-sm"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter post title"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Body</label>
                    <textarea
                        className="w-full border px-4 py-2 rounded shadow-sm"
                        rows={5}
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Enter post content"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                     Create Post
                </button>
            </form>
        </div>
    );
}

export default CreatePost;