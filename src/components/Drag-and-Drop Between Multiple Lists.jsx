import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const MultipleLists = () => {
  const [list1, setList1] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [list2, setList2] = useState(['Item 4', 'Item 5']);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    let sourceList, destinationList, setSourceList, setDestinationList;

    if (source.droppableId === 'list1') {
      sourceList = list1;
      setSourceList = setList1;
    } else {
      sourceList = list2;
      setSourceList = setList2;
    }

    if (destination.droppableId === 'list1') {
      destinationList = list1;
      setDestinationList = setList1;
    } else {
      destinationList = list2;
      setDestinationList = setList2;
    }

    const [movedItem] = sourceList.splice(source.index, 1);
    destinationList.splice(destination.index, 0, movedItem);

    setSourceList([...sourceList]);
    setDestinationList([...destinationList]);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Droppable droppableId="list1">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                padding: '10px',
                backgroundColor: '#f0f0f0',
                width: '200px',
                minHeight: '100px',
              }}
            >
              {list1.map((item, index) => (
                <Draggable key={item} draggableId={item} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        margin: '5px 0',
                        padding: '10px',
                        backgroundColor: '#ccc',
                        borderRadius: '4px',
                      }}
                    >
                      {item}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId="list2">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                padding: '10px',
                backgroundColor: '#f0f0f0',
                width: '200px',
                minHeight: '100px',
              }}
            >
              {list2.map((item, index) => (
                <Draggable key={item} draggableId={item} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        margin: '5px 0',
                        padding: '10px',
                        backgroundColor: '#ccc',
                        borderRadius: '4px',
                      }}
                    >
                      {item}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default MultipleLists;
