import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function useBoard(boardId: string) {
  const [board, setBoard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const s = io(API);
    s.emit('join-board', boardId);
    s.on('task-updated', () => fetchBoard());
    setSocket(s);
    return () => { s.disconnect(); };
  }, [boardId]);

  const fetchBoard = useCallback(async () => {
    const { data } = await axios.get(`${API}/api/boards/${boardId}`);
    setBoard(data);
    setLoading(false);
  }, [boardId]);

  useEffect(() => { fetchBoard(); }, [fetchBoard]);

  const moveTask = async (taskId: string, columnId: string, order: number) => {
    await axios.put(`${API}/api/tasks/${taskId}`, { columnId, order });
    socket?.emit('task-moved', { boardId, taskId, columnId });
  };

  const addTask = async (columnId: string, title: string) => {
    await axios.post(`${API}/api/tasks`, { columnId, title });
    fetchBoard();
  };

  const deleteTask = async (taskId: string) => {
    await axios.delete(`${API}/api/tasks/${taskId}`);
    fetchBoard();
  };

  return { board, loading, moveTask, addTask, deleteTask };
}
