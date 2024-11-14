import styles from "./Pieces.module.css";

type PieceProps = {
  color: "white" | "black";
};

export const King: React.FC<PieceProps> = ({ color }) => {
  return <div className={`${styles.piece} ${styles[color]}`}>K</div>;
};

export const Queen: React.FC<PieceProps> = ({ color }) => {
  return <div className={`${styles.piece} ${styles[color]}`}>Q</div>;
};

export const Bishop: React.FC<PieceProps> = ({ color }) => {
  return <div className={`${styles.piece} ${styles[color]}`}>B</div>;
};

export const Knight: React.FC<PieceProps> = ({ color }) => {
  return <div className={`${styles.piece} ${styles[color]}`}>Kn</div>;
};

export const Rook: React.FC<PieceProps> = ({ color }) => {
  return <div className={`${styles.piece} ${styles[color]}`}>R</div>;
};

export const Pawn: React.FC<PieceProps> = ({ color }) => {
  return <div className={`${styles.piece} ${styles[color]}`}>P</div>;
};
