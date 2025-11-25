import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"; // ✅ FIXED import
import { ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";
import api from '../lib/axios.js';

function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required!!");
      return;
    }

    setLoading(true);

    try {
      await api.post("/notes", { title, content });
      toast.success("Note created successfully!!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create note!!");
    } finally {
      setLoading(false);
    }
  };

  // bg-base-200
  return (
    <div className='min-h-screen bg-transparent  flex items-center justify-center px-4'>
      <div className='w-full max-w-2xl'>
        <Link to="/" className='btn btn-ghost mb-6 flex items-center gap-2 text-lg font-bold'>
          <ArrowLeftIcon className='size-6' />
          Back to Notes
        </Link>

        <div className='card bg-base-100 shadow-lg'>
          <div className='card-body'>
            <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
            <form onSubmit={handleSubmit}>
              <div className='form-control mb-4'>
                <label className="label">
                  <span className='label-text'>Title</span>
                </label>
                <input
                  type="text"
                  placeholder='Note title'
                  className='input input-bordered'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className='form-control mb-4'>
                <label className="label">
                  <span className='label-text'>Content</span>
                </label>
                <textarea
                  placeholder='Note content'
                  className='textarea textarea-bordered h-32'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="card-actions justify-end">
                <button type='submit' className='btn btn-primary' disabled={loading}>
                  {loading ? "Creating..." : "Create Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
