import useDesigner from "@/hooks/useDesigner";
import { useHotkeys } from "react-hotkeys-hook"; 
import SubmitButton from "@/components/ui/SubmitButton";
import DragDropAria from "./formBuilderElements/DragDropAria";

export default function FormBuilder() {
  const { undo, redo ,elements } = useDesigner();

  useHotkeys("ctrl+z, meta+z", undo, { preventDefault: true });
  useHotkeys("ctrl+y, meta+y", redo, { preventDefault: true });
  return (
    <div className="max-w-2xl mt-3   bg-white border shadow rounded-xl w-1/2 h-auto p-10 ml-4">
      {/* <div className="flex justify-between mb-4">
      <Button onClick={undo} disabled={undoStack.length === 0}>
          Undo
        </Button>
        <Button onClick={redo} disabled={redoStack.length === 0}>
          Redo
        </Button>
      </div> */}
     <span className="text-md font-semibold"> {elements.length==0 && "No elements added yet"}</span> 

      <DragDropAria />
      <SubmitButton/>
    </div>
  );
}
