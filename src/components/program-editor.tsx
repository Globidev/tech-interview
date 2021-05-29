import { useState } from "react";
import { Instruction, parseInstructions } from "../maze";

type Props = {
  initialMazeText: string;
  onInstrsChanged: (instructions: Instruction[]) => void;
};

const ProgramEditor = ({ initialMazeText, onInstrsChanged }: Props) => {
  const [mazeText, setMazeText] = useState(initialMazeText);

  const onTextChanged = (text: string) => {
    setMazeText(text);
    const instructions = parseInstructions(text);
    if (instructions) onInstrsChanged(instructions);
  };

  return (
    <div className="program-editor-container">
      <span>Program</span>
      <textarea
        className="text-area"
        value={mazeText}
        onChange={(e) => onTextChanged(e.target.value)}
      />
    </div>
  );
};

export default ProgramEditor;
