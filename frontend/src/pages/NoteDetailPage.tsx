import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // ✅ Correct import
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { LoaderIcon, ArrowLeftIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router-dom'; // ✅ Correct import

function NoteDetailPage() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // ✅ Fetch note by ID
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        toast.error("Failed to fetch the note!!");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  // ✅ Delete handler
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete note");
    }
  };

  // ✅ Save (update) handler
  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add the title or the content");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully!!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  // ✅ Show loader while fetching
  if (loading) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10' />
      </div>
    );
  }

  // ✅ Page content
  return (
    <div className='min-h-screen bg-base-200'>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Back & Delete Buttons */}
          <div className='flex items-center justify-between mb-6'>
            <Link to="/" className='btn btn-ghost flex items-center gap-2'>
              <ArrowLeftIcon className='h-5 w-5' />
              Back to Notes
            </Link>
            <button
              onClick={handleDelete}
              className='btn btn-error btn-outline flex items-center gap-2'
            >
              <Trash2Icon className='h-5 w-5' />
              Delete Note
            </button>
          </div>

          {/* Note Form */}
          <div className='card bg-base-100'>
            <div className="card-body">
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Title</span>
                </label>
                <input
                  type="text"
                  placeholder='Note Title'
                  className='input input-bordered'
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Content</span>
                </label>
                <textarea
                  placeholder='Write your note here'
                  className='textarea textarea-bordered h-32'
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                ></textarea>
              </div>

              <div className="card-actions justify-end">
                <button
                  className='btn btn-primary'
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteDetailPage;
