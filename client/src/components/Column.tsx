import { useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';

interface Task { id: string; title: string; label?: string; dueDate?: string; }
interface Props {
  column: { id: string; title: string; tasks: Task[] };
  onAddTask: (columnId: string, title: string) => void;
  onDeleteTask: (id: string) => void;
}

export default function Column({ column, onAddTask, onDeleteTask }: Props) {
  const [adding, setAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleAdd = () => {
    if (newTitle.trim()) {
      onAddTask(column.id, newTitle.trim());
      setNewTitle('');
      setAdding(false);
    }
  };

  return (
    <div className="bg-gray-50 rounded-xl p-3 w-72 flex-shrink-0 flex flex-col">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="font-medium text-sm text-gray-700">{column.title}</h3>
        <span className="text-xs text-gray-400 bg-gray-200 rounded-full px-2 py-0.5">
          {column.tasks.length}
        </span>
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 min-h-16 rounded-lg transition-colors
              ${snapshot.isDraggingOver ? 'bg-blue-50' : ''}`}
          >
            {column.tasks.map((task, i) => (
              <TaskCard key={task.id} task={task} index={i} onDelete={onDeleteTask} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {adding ? (
        <div className="mt-2">
          <textarea
            autoFocus
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAdd(); } }}
            className="w-full text-sm rounded-lg border border-blue-300 p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
            rows={2}
            placeholder="Task title..."
          />
          <div className="flex gap-2 mt-1">
            <button onClick={handleAdd} className="text-xs bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600">
              Add
            </button>
            <button onClick={() => setAdding(false)} className="text-xs text-gray-500 hover:text-gray-700">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="mt-2 text-sm text-gray-400 hover:text-gray-600 text-left px-1 py-1 rounded hover:bg-gray-100 transition-colors"
        >
          + Add a task
        </button>
      )}
    </div>
  );
}
