import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [boards, setBoards] = useState<any[]>([]);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    axios.get(`${API}/api/boards`).then(({ data }) => setBoards(data));
  }, []);

  const createBoard = async () => {
    if (!newTitle.trim()) return;
    const { data } = await axios.post(`${API}/api/boards`, { title: newTitle.trim() });
    setBoards((prev) => [data, ...prev]);
    setNewTitle('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <h1 className="font-semibold text-gray-900">TaskFlow</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{user?.name}</span>
          <button onClick={logout} className="text-sm text-gray-400 hover:text-gray-600">Sign out</button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-8">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && createBoard()}
            placeholder="New board name..."
            className="border border-gray-200 rounded-lg px-4 py-2 text-sm flex-1 max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <button
            onClick={createBoard}
            className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Create board
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {boards.map((board) => (
            <button
              key={board.id}
              onClick={() => navigate(`/board/${board.id}`)}
              className="bg-white rounded-xl border border-gray-100 p-5 text-left hover:shadow-md transition-shadow"
            >
              <h2 className="font-medium text-gray-800 mb-1">{board.title}</h2>
              <p className="text-xs text-gray-400">
                {board.columns?.reduce((acc: number, c: any) => acc + c.tasks.length, 0)} tasks
              </p>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
