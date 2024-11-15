import styles from "./Pieces.module.css";

type PieceProps = {
  color: "white" | "black";
};

const svgProps = {
  width: "44",
  height: "44",
  fill: "currentColor",
  viewBox: "0 0 45 45",
};

const getPieceProps = (color: "white" | "black") => ({
  mainColor: color === "white" ? "white" : "black",
  outerStroke: color === "white" ? "black" : "white",
  innerStroke: color === "white" ? "#666" : "#333",
});

export const King: React.FC<PieceProps> = ({ color }) => {
  const { mainColor, outerStroke, innerStroke } = getPieceProps(color);
  return (
    <div className={styles.piece}>
      <svg {...svgProps}>
        <g>
          <g
            fill={mainColor}
            stroke={outerStroke}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 22.5,11.63 L 22.5,6 M 20,8 L 25,8 M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25" />
            <path d="M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37" />
          </g>
          <g
            fill="none"
            stroke={innerStroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 22.5,11.63 L 22.5,6 M 20,8 L 25,8 M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25" />
            <path d="M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export const Queen: React.FC<PieceProps> = ({ color }) => {
  const { mainColor, outerStroke, innerStroke } = getPieceProps(color);
  return (
    <div className={styles.piece}>
      <svg {...svgProps}>
        <g>
          <g
            fill={mainColor}
            stroke={outerStroke}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="6" cy="12" r="2.75" />
            <circle cx="14" cy="9" r="2.75" />
            <circle cx="22.5" cy="8" r="2.75" />
            <circle cx="31" cy="9" r="2.75" />
            <circle cx="39" cy="12" r="2.75" />
            <path d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26" />
            <path d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26" />
          </g>
          <g
            fill="none"
            stroke={innerStroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="6" cy="12" r="2.75" />
            <circle cx="14" cy="9" r="2.75" />
            <circle cx="22.5" cy="8" r="2.75" />
            <circle cx="31" cy="9" r="2.75" />
            <circle cx="39" cy="12" r="2.75" />
            <path d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26" />
            <path d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export const Bishop: React.FC<PieceProps> = ({ color }) => {
  const { mainColor, outerStroke, innerStroke } = getPieceProps(color);
  return (
    <div className={styles.piece}>
      <svg {...svgProps}>
        <g>
          <g
            fill={mainColor}
            stroke={outerStroke}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36" />
            <path d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32" />
            <path d="M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8" />
          </g>
          <g
            fill="none"
            stroke={innerStroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36" />
            <path d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32" />
            <path d="M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export const Knight: React.FC<PieceProps> = ({ color }) => {
  const { mainColor, outerStroke, innerStroke } = getPieceProps(color);
  return (
    <div className={styles.piece}>
      <svg {...svgProps}>
        <g>
          <g
            fill={mainColor}
            stroke={outerStroke}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18" />
            <path d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10" />
            <path d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5" />
          </g>
          <g
            fill="none"
            stroke={innerStroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18" />
            <path d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10" />
            <path d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export const Rook: React.FC<PieceProps> = ({ color }) => {
  const { mainColor, outerStroke, innerStroke } = getPieceProps(color);
  return (
    <div className={styles.piece}>
      <svg {...svgProps}>
        <g>
          <g
            fill={mainColor}
            stroke={outerStroke}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39" />
            <path d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36" />
            <path d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14" />
            <path d="M 34,14 L 31,17 L 14,17 L 11,14" />
            <path d="M 31,17 L 31,29.5 L 14,29.5 L 14,17" />
          </g>
          <g
            fill="none"
            stroke={innerStroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39" />
            <path d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36" />
            <path d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14" />
            <path d="M 34,14 L 31,17 L 14,17 L 11,14" />
            <path d="M 31,17 L 31,29.5 L 14,29.5 L 14,17" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export const Pawn: React.FC<PieceProps> = ({ color }) => {
  const { mainColor, outerStroke, innerStroke } = getPieceProps(color);
  return (
    <div className={styles.piece}>
      <svg {...svgProps}>
        <g>
          <g
            fill={mainColor}
            stroke={outerStroke}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9" />
          </g>
          <g
            fill="none"
            stroke={innerStroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9" />
          </g>
        </g>
      </svg>
    </div>
  );
};
