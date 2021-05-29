import { Maze, ProgramCounter } from "../maze";

type Props = {
  maze: Maze;
};

const MazeRenderer = ({ maze }: Props) => {
  const cells = maze.instructions.map((instr, idx) => {
    const cpuOnCell = maze.pc.state === "inside" && maze.pc.index === idx;

    return (
      <div className={cpuOnCell ? "busy-cell" : "free-cell"} key={idx}>
        {instr.offset}
      </div>
    );
  });

  return (
    <div>
      <CpuStatus {...maze} />
      <div className="maze-grid">{cells}</div>
    </div>
  );
};

export default MazeRenderer;

type CpuStatusProps = {
  pc: ProgramCounter;
  steps: number;
};

const CpuStatus = ({ pc, steps }: CpuStatusProps) => {
  switch (pc.state) {
    case "inside":
      return (
        <span>
          CPU <span className="trapped">trapped</span> at instruction
          <span className="instr-index"> #{pc.index}</span>
        </span>
      );

    case "exited":
      return (
        <span>
          CPU <span className="escaped">escaped</span> after
          <span className="steps"> {steps}</span> steps
        </span>
      );
  }
};
