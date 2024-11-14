import  { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState({
    todo: ['Task 1', 'Task 2'],
    inProgress: ['Task 3'],
    done: ['Task 4'],
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return; // Dropped outside of the board

    const sourceList = tasks[source.droppableId];
    const destinationList = tasks[destination.droppableId];

    // Remove the task from the source list
    const [movedTask] = sourceList.splice(source.index, 1);
    // Add the task to the destination list
    destinationList.splice(destination.index, 0, movedTask);

    // Update the state with the modified lists
    setTasks({
      ...tasks,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destinationList,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {['todo', 'inProgress', 'done'].map((columnId) => (
          <Droppable key={columnId} droppableId={columnId}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  width: '250px',
                  minHeight: '300px',
                  backgroundColor: '#f4f4f4',
                }}
              >
                <h2>{columnId.replace(/([A-Z])/g, ' $1').toUpperCase()}</h2>
                {tasks[columnId].map((task, index) => (
                  <Draggable key={task} draggableId={task} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          margin: '10px 0',
                          padding: '10px',
                          backgroundColor: '#fff',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                        }}
                      >
                        {task}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
