import { useEffect, useState } from "react";

import ProgramEditor from "./components/program-editor";
import MazeRenderer from "./components/maze-renderer";
import MazeControls, { Action, PlaySpeed } from "./components/maze-controls";

import { cpuTick, Instruction, newMaze, parseInstructions } from "./maze";

import { MAZES } from "./data";

const App = () => {
  const initialInstructions = parseInstructions(MAZES.long) ?? [];
  const initialMaze = newMaze(initialInstructions);

  const [instructions, setInstructions] = useState(initialInstructions);
  const [maze, setMaze] = useState(initialMaze);

  const [playing, setPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState<PlaySpeed>(1);

  useEffect(() => {
    if (!maze || !playing) return;

    const ticker = () => {
      let nextMaze = cpuTick(maze);
      if (nextMaze.pc.state === "exited") setPlaying(false);
      setMaze(nextMaze);
    };

    const playIntervalMs = Math.floor(250 / playSpeed);
    const playTimer = setInterval(ticker, playIntervalMs);

    return () => clearInterval(playTimer);
  }, [maze, playing, playSpeed]);

  const loadMaze = (instrs: Instruction[]) => {
    setPlaying(false);
    setInstructions(instrs);
    setMaze(newMaze(instrs));
  };

  // Dispatch an action from the controls
  const applyAction = (action: Action) => {
    // TODO
  };

  return (
    <div className="app">
      <div className="editor-container">
        <ProgramEditor
          initialMazeText={MAZES.long}
          onInstrsChanged={loadMaze}
        />
      </div>
      <div className="maze-container">
        <MazeControls
          onAction={applyAction}
          playing={playing}
          playSpeed={playSpeed}
          steps={maze.steps}
        />
        <MazeRenderer maze={maze} />
      </div>
    </div>
  );
};

export default App;
