import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const DragDropTable = () => {
  const [rows, setRows] = useState([
    { id: '1', name: 'John Doe', age: 28 },
    { id: '2', name: 'Jane Smith', age: 34 },
    { id: '3', name: 'Sam Brown', age: 22 },
  ]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const reorderedRows = Array.from(rows);
    const [removedRow] = reorderedRows.splice(source.index, 1);
    reorderedRows.splice(destination.index, 0, removedRow);

    setRows(reorderedRows);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <table border="1" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <Droppable droppableId="droppable">
          {(provided) => (
            <tbody
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {rows.map((row, index) => (
                <Draggable key={row.id} draggableId={row.id} index={index}>
                  {(provided) => (
                    <tr
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        cursor: 'move',
                      }}
                    >
                      <td>{row.name}</td>
                      <td>{row.age}</td>
                    </tr>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </tbody>
          )}
        </Droppable>
      </table>
    </DragDropContext>
  );
};

export default DragDropTable;
