// We represent the maze's state with:
// - a list of instructions
// - a "program counter" (or "instruction pointer")
// - the current number of steps
export type Maze = {
  instructions: Instruction[];
  pc: ProgramCounter;
  steps: number;
};

// The program counter represents the "position" of the CPU.
// It is either pointing at a valid instruction inside the maze, or it escaped
export type ProgramCounter =
  | { state: "inside"; index: number }
  | { state: "exited" };

// An instruction can only be a jump for now, but we use a discriminated union
// so that we can more easily add other instruction types later
export type Instruction = { type: "jump"; offset: number };

// Makes a new maze from a list of instructions, with the PC pointing at the
// first one
export const newMaze = (instructions: Instruction[]): Maze => ({
  instructions,
  pc: { state: "inside", index: 0 },
  steps: 0,
});

// Parses raw input text into a list of instructions
export const parseInstructions = (input: string): Instruction[] | undefined => {
  // TODO
  return undefined;
};

// Executes one "CPU tick" inside the maze, returning the next maze
export const cpuTick = (maze: Readonly<Maze>): Maze => {
  // TODO
  return maze;
};

// Executes multiple "CPU ticks" inside the maze
export const cpuTicks = (maze: Maze, tickCount: number): Maze => {
  for (let tick = 0; tick < tickCount; ++tick) maze = cpuTick(maze);

  return maze;
};
