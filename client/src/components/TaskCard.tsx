import { Draggable } from '@hello-pangea/dnd';
import { format } from 'date-fns';

interface Task {
  id: string;
  title: string;
  label?: string;
  dueDate?: string;
}

const LABEL_COLORS: Record<string, string> = {
  bug: 'bg-red-100 text-red-700',
  feature: 'bg-blue-100 text-blue-700',
  design: 'bg-purple-100 text-purple-700',
  docs: 'bg-yellow-100 text-yellow-700',
};

interface Props {
  task: Task;
  index: number;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, index, onDelete }: Props) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white rounded-lg p-3 mb-2 border border-gray-100 shadow-sm
            ${snapshot.isDragging ? 'shadow-md rotate-1' : ''}
            group relative`}
        >
          {task.label && (
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium mb-2 inline-block
              ${LABEL_COLORS[task.label] ?? 'bg-gray-100 text-gray-600'}`}>
              {task.label}
            </span>
          )}
          <p className="text-sm text-gray-800 leading-snug">{task.title}</p>
          {task.dueDate && (
            <p className="text-xs text-gray-400 mt-2">
              Due {format(new Date(task.dueDate), 'MMM d')}
            </p>
          )}
          <button
            onClick={() => onDelete(task.id)}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100
              text-gray-300 hover:text-red-400 transition-opacity text-xs"
          >
            ✕
          </button>
        </div>
      )}
    </Draggable>
  );
}
