export type Action =
  | { type: "play-pause"; playing: boolean }
  | { type: "next" }
  | { type: "stop" }
  | { type: "play-speed"; speed: PlaySpeed }
  | { type: "set-step"; step: number };

export type PlaySpeed = 1 | 2 | 4 | 8 | 16 | 32;

type Props = {
  playing: boolean;
  playSpeed: PlaySpeed;
  steps: number;
  onAction: (action: Action) => void;
};

const MazeControls = ({ playing, playSpeed, steps, onAction }: Props) => {
  return (
    <div className="maze-controls">
      <button
        onClick={() => onAction({ type: "play-pause", playing: !playing })}
      >
        {playing ? "⏸️" : "▶️"}
      </button>
      <button
        onClick={() => {
          onAction({
            type: "play-speed",
            speed: NEXT_PLAYSPEED_TABLE[playSpeed],
          });
        }}
      >
        ⏩ x{playSpeed}
      </button>
      <button onClick={() => onAction({ type: "next" })}>⏭️</button>
      <button onClick={() => onAction({ type: "stop" })}>⏹️</button>
      <button className="steps-container">
        <span>⏱️</span>
        <input
          className="step-counter"
          type="number"
          value={steps}
          onChange={(e) =>
            onAction({ type: "set-step", step: e.target.valueAsNumber })
          }
        />
      </button>
    </div>
  );
};

const NEXT_PLAYSPEED_TABLE: Record<PlaySpeed, PlaySpeed> = {
  1: 2,
  2: 4,
  4: 8,
  8: 16,
  16: 32,
  32: 1,
};

export default MazeControls;
