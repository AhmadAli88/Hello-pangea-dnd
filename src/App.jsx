import './App.css';
import DrageAndDropTwoDimension from './components/2D Drag-and-Drop';
import MultipleLists from './components/Drag-and-Drop Between Multiple Lists';
import KanbanBoard from './components/Drag-and-Drop for Task Management (Kanban Board)';
import DragDropTable from './components/DragDropTable';
import SimpleDragAndDrop from './components/Simple Drag-and-Drop';

function App() {
  return (
    <div>
      <SimpleDragAndDrop />
      <DrageAndDropTwoDimension/>
      <MultipleLists/>
      <KanbanBoard/>
      <DragDropTable/>
    </div>
  );
}

export default App;
