"use client";

import { King, Queen, Bishop, Knight, Rook, Pawn } from "@/components/Pieces";
import styles from "./Chessboard.module.css";
import { useCallback, useState, useEffect } from "react";

type PieceColor = "white" | "black";

type PieceType = "king" | "queen" | "bishop" | "knight" | "rook" | "pawn";

type PiecePosition = {
  color: PieceColor;
  type: PieceType;
  position: BoardCoordinates;
};

type GameState = {
  currentTurn: PieceColor;
  isCheck: boolean;
  isCheckmate: boolean;
  moveHistory: Array<{
    piece: PiecePosition;
    from: BoardCoordinates;
    to: BoardCoordinates;
    capture?: PiecePosition;
  }>;
  timeLeft: {
    white: number;
    black: number;
  };
  isTimerRunning: boolean;
  isDraw: boolean;
  drawReason?: "stalemate" | "insufficient" | "threefold" | "fifty-move";
  movesSincePawnOrCapture: number;
  positionHistory: string[];
  lastMove?: {
    piece: PiecePosition;
    from: BoardCoordinates;
    to: BoardCoordinates;
  };
};

const defaultPiecePositions: PiecePosition[] = [
  {
    color: "white",
    type: "king",
    position: { x: "e", y: "1" },
  },
  {
    color: "white",
    type: "queen",
    position: { x: "d", y: "1" },
  },
  {
    color: "white",
    type: "rook",
    position: { x: "a", y: "1" },
  },
  {
    color: "white",
    type: "rook",
    position: { x: "h", y: "1" },
  },
  {
    color: "white",
    type: "knight",
    position: { x: "b", y: "1" },
  },
  {
    color: "white",
    type: "knight",
    position: { x: "g", y: "1" },
  },
  {
    color: "white",
    type: "bishop",
    position: { x: "c", y: "1" },
  },
  {
    color: "white",
    type: "bishop",
    position: { x: "f", y: "1" },
  },
  {
    color: "white",
    type: "pawn",
    position: { x: "a", y: "2" },
  },
  {
    color: "white",
    type: "pawn",
    position: { x: "b", y: "2" },
  },
  {
    color: "white",
    type: "pawn",
    position: { x: "c", y: "2" },
  },
  {
    color: "white",
    type: "pawn",
    position: { x: "d", y: "2" },
  },
  {
    color: "white",
    type: "pawn",
    position: { x: "e", y: "2" },
  },
  {
    color: "white",
    type: "pawn",
    position: { x: "f", y: "2" },
  },
  {
    color: "white",
    type: "pawn",
    position: { x: "g", y: "2" },
  },
  {
    color: "white",
    type: "pawn",
    position: { x: "h", y: "2" },
  },
  {
    color: "black",
    type: "king",
    position: { x: "e", y: "8" },
  },
  {
    color: "black",
    type: "queen",
    position: { x: "d", y: "8" },
  },
  {
    color: "black",
    type: "rook",
    position: { x: "a", y: "8" },
  },
  {
    color: "black",
    type: "rook",
    position: { x: "h", y: "8" },
  },
  {
    color: "black",
    type: "knight",
    position: { x: "b", y: "8" },
  },
  {
    color: "black",
    type: "knight",
    position: { x: "g", y: "8" },
  },
  {
    color: "black",
    type: "bishop",
    position: { x: "c", y: "8" },
  },
  {
    color: "black",
    type: "bishop",
    position: { x: "f", y: "8" },
  },
  {
    color: "black",
    type: "pawn",
    position: { x: "a", y: "7" },
  },
  {
    color: "black",
    type: "pawn",
    position: { x: "b", y: "7" },
  },
  {
    color: "black",
    type: "pawn",
    position: { x: "c", y: "7" },
  },
  {
    color: "black",
    type: "pawn",
    position: { x: "d", y: "7" },
  },
  {
    color: "black",
    type: "pawn",
    position: { x: "e", y: "7" },
  },
  {
    color: "black",
    type: "pawn",
    position: { x: "f", y: "7" },
  },
  {
    color: "black",
    type: "pawn",
    position: { x: "g", y: "7" },
  },
  {
    color: "black",
    type: "pawn",
    position: { x: "h", y: "7" },
  },
];

const RenderPiece = ({
  type,
  color,
  onClick,
}: {
  type: PieceType;
  color: PieceColor;
  onClick?: () => void;
}) => {
  const pieceMap: Record<PieceType, React.ReactNode> = {
    king: <King color={color} />,
    queen: <Queen color={color} />,
    bishop: <Bishop color={color} />,
    knight: <Knight color={color} />,
    rook: <Rook color={color} />,
    pawn: <Pawn color={color} />,
  };

  return <div onClick={onClick}>{pieceMap[type]}</div>;
};

type XCoord = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
type YCoord = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
interface BoardCoordinates {
  x: XCoord;
  y: YCoord;
}

const xCoords: XCoord[] = ["a", "b", "c", "d", "e", "f", "g", "h"];
const yCoords: YCoord[] = ["1", "2", "3", "4", "5", "6", "7", "8"];

const getBasicMoves = (
  piece: PiecePosition,
  allPieces: PiecePosition[],
  gameState: GameState
): BoardCoordinates[] => {
  const { position, type, color } = piece;

  const isValidCoordinate = ({ x, y }: { x: XCoord; y: YCoord }): boolean => {
    return xCoords.includes(x) && yCoords.includes(y);
  };

  const isPieceAtPosition = (
    pos: BoardCoordinates
  ): PiecePosition | undefined => {
    return allPieces.find(
      (p) => p.position.x === pos.x && p.position.y === pos.y
    );
  };

  const isValidMove = (pos: BoardCoordinates): boolean => {
    const pieceAtPosition = isPieceAtPosition(pos);
    return !pieceAtPosition || pieceAtPosition.color !== color;
  };

  const getKingMoves = ({ x, y }: BoardCoordinates): BoardCoordinates[] => {
    const xIndex = xCoords.indexOf(x);
    const yIndex = yCoords.indexOf(y);

    const potentialMoves: BoardCoordinates[] = [
      { x: xCoords[xIndex + 1], y },
      { x: xCoords[xIndex - 1], y },
      { x, y: yCoords[yIndex + 1] },
      { x, y: yCoords[yIndex - 1] },
      { x: xCoords[xIndex + 1], y: yCoords[yIndex + 1] },
      { x: xCoords[xIndex - 1], y: yCoords[yIndex + 1] },
      { x: xCoords[xIndex + 1], y: yCoords[yIndex - 1] },
      { x: xCoords[xIndex - 1], y: yCoords[yIndex - 1] },
    ].filter(isValidCoordinate) as BoardCoordinates[];

    return potentialMoves;
  };

  const getQueenMoves = ({ x, y }: BoardCoordinates): BoardCoordinates[] => [
    ...getRookMoves({ x, y }),
    ...getBishopMoves({ x, y }),
  ];

  const getBishopMoves = ({ x, y }: BoardCoordinates): BoardCoordinates[] => {
    const moves: BoardCoordinates[] = [];
    const xIndex = xCoords.indexOf(x);
    const yIndex = yCoords.indexOf(y);

    const directions = [
      { dx: 1, dy: 1 }, // up-right
      { dx: 1, dy: -1 }, // down-right
      { dx: -1, dy: 1 }, // up-left
      { dx: -1, dy: -1 }, // down-left
    ];

    directions.forEach(({ dx, dy }) => {
      for (let i = 1; i < 8; i++) {
        const newPos = {
          x: xCoords[xIndex + dx * i],
          y: yCoords[yIndex + dy * i],
        };

        if (!isValidCoordinate(newPos)) break;

        const pieceAtPosition = isPieceAtPosition(newPos);
        if (pieceAtPosition) {
          if (pieceAtPosition.color !== color) {
            moves.push(newPos as BoardCoordinates);
          }
          break;
        }
        moves.push(newPos as BoardCoordinates);
      }
    });

    return moves;
  };

  const getKnightMoves = ({ x, y }: BoardCoordinates): BoardCoordinates[] => {
    const xIndex = xCoords.indexOf(x);
    const yIndex = yCoords.indexOf(y);

    const potentialMoves: BoardCoordinates[] = [
      { x: xCoords[xIndex + 2], y: yCoords[yIndex + 1] },
      { x: xCoords[xIndex + 2], y: yCoords[yIndex - 1] },
      { x: xCoords[xIndex - 2], y: yCoords[yIndex + 1] },
      { x: xCoords[xIndex - 2], y: yCoords[yIndex - 1] },
      { x: xCoords[xIndex + 1], y: yCoords[yIndex + 2] },
      { x: xCoords[xIndex + 1], y: yCoords[yIndex - 2] },
      { x: xCoords[xIndex - 1], y: yCoords[yIndex + 2] },
      { x: xCoords[xIndex - 1], y: yCoords[yIndex - 2] },
    ].filter(isValidCoordinate) as BoardCoordinates[];

    return potentialMoves;
  };

  const getRookMoves = ({ x, y }: BoardCoordinates): BoardCoordinates[] => {
    const moves: BoardCoordinates[] = [];
    const xIndex = xCoords.indexOf(x);
    const yIndex = yCoords.indexOf(y);

    const directions = [
      { dx: 1, dy: 0 }, // right
      { dx: -1, dy: 0 }, // left
      { dx: 0, dy: 1 }, // up
      { dx: 0, dy: -1 }, // down
    ];

    directions.forEach(({ dx, dy }) => {
      for (let i = 1; i < 8; i++) {
        const newPos = {
          x: xCoords[xIndex + dx * i],
          y: yCoords[yIndex + dy * i],
        };

        if (!isValidCoordinate(newPos)) break;

        const pieceAtPosition = isPieceAtPosition(newPos);
        if (pieceAtPosition) {
          if (pieceAtPosition.color !== color) {
            moves.push(newPos as BoardCoordinates);
          }
          break;
        }
        moves.push(newPos as BoardCoordinates);
      }
    });

    return moves;
  };

  const getPawnMoves = ({ x, y }: BoardCoordinates): BoardCoordinates[] => {
    const moves: BoardCoordinates[] = [];
    const xIndex = xCoords.indexOf(x);
    const yIndex = yCoords.indexOf(y);
    const direction = color === "white" ? 1 : -1;
    const startRow = color === "white" ? "2" : "7";

    const forwardMove = { x, y: yCoords[yIndex + direction] };
    if (isValidCoordinate(forwardMove) && !isPieceAtPosition(forwardMove)) {
      moves.push(forwardMove);

      if (y === startRow) {
        const doubleMove = { x, y: yCoords[yIndex + 2 * direction] };
        if (isValidCoordinate(doubleMove) && !isPieceAtPosition(doubleMove)) {
          moves.push(doubleMove);
        }
      }
    }

    const captures = [
      { x: xCoords[xIndex + 1], y: yCoords[yIndex + direction] },
      { x: xCoords[xIndex - 1], y: yCoords[yIndex + direction] },
    ];

    captures.forEach((captureMove) => {
      if (isValidCoordinate(captureMove)) {
        const pieceAtPosition = isPieceAtPosition(captureMove);
        if (pieceAtPosition && pieceAtPosition.color !== color) {
          moves.push(captureMove);
        }
      }
    });

    // En passant captures
    if ((color === "white" && y === "5") || (color === "black" && y === "4")) {
      const lastMove = gameState.lastMove;
      if (lastMove?.piece.type === "pawn") {
        const isDoublePawnMove =
          Math.abs(Number(lastMove.to.y) - Number(lastMove.from.y)) === 2;
        if (isDoublePawnMove && lastMove.to.y === y) {
          // Check if enemy pawn is adjacent
          if (
            lastMove.to.x === xCoords[xIndex + 1] ||
            lastMove.to.x === xCoords[xIndex - 1]
          ) {
            moves.push({
              x: lastMove.to.x as XCoord,
              y: yCoords[yIndex + direction] as YCoord,
            });
          }
        }
      }
    }

    return moves;
  };

  const moveMap: Record<
    PieceType,
    (position: BoardCoordinates) => BoardCoordinates[]
  > = {
    king: getKingMoves,
    queen: getQueenMoves,
    bishop: getBishopMoves,
    knight: getKnightMoves,
    rook: getRookMoves,
    pawn: getPawnMoves,
  };

  return moveMap[type](position).filter(isValidMove);
};

const wouldMoveExposeCheck = (
  piece: PiecePosition,
  targetMove: BoardCoordinates,
  allPieces: PiecePosition[],
  gameState: GameState
): boolean => {
  const simulatedPositions = allPieces
    .map((p) => {
      if (p === piece) {
        return { ...p, position: targetMove };
      }
      if (p.position.x === targetMove.x && p.position.y === targetMove.y) {
        return null; // Piece would be captured
      }
      return p;
    })
    .filter((p): p is PiecePosition => p !== null);

  const king = simulatedPositions.find(
    (p) => p.type === "king" && p.color === piece.color
  );
  if (!king) return false;

  return simulatedPositions.some((p) => {
    if (p.color === piece.color) return false;
    const basicMoves = getBasicMoves(p, simulatedPositions, gameState);
    return basicMoves.some(
      (move) => move.x === king.position.x && move.y === king.position.y
    );
  });
};

const getAvailableMoves = (
  piece: PiecePosition,
  allPieces: PiecePosition[],
  gameState: GameState
): BoardCoordinates[] => {
  const basicMoves = getBasicMoves(piece, allPieces, gameState);
  const legalMoves = basicMoves.filter(
    (move) => !wouldMoveExposeCheck(piece, move, allPieces, gameState)
  );

  if (piece.type === "king") {
    const castlingMoves = getCastlingMoves(piece, allPieces, gameState);
    return [...legalMoves, ...castlingMoves];
  }

  return legalMoves;
};

const getCastlingMoves = (
  king: PiecePosition,
  allPieces: PiecePosition[],
  gameState: GameState
): BoardCoordinates[] => {
  const moves: BoardCoordinates[] = [];

  // Only check castling if king hasn't moved
  if (king.position.x !== "e") return moves;
  const rank = king.color === "white" ? "1" : "8";
  if (king.position.y !== rank) return moves;

  // Check kingside castling
  const kingsideRook = allPieces.find(
    (p) =>
      p.type === "rook" &&
      p.color === king.color &&
      p.position.x === "h" &&
      p.position.y === rank
  );

  if (kingsideRook) {
    const kingsidePath = ["f", "g"];
    const isKingsideClear = kingsidePath.every(
      (x) => !allPieces.some((p) => p.position.x === x && p.position.y === rank)
    );

    if (isKingsideClear && !isKingInCheck(allPieces, king.color, gameState)) {
      // Check if king moves through check
      const isPathSafe = kingsidePath.every((x) => {
        const testMove = { x: x as XCoord, y: rank as YCoord };
        return !wouldMoveExposeCheck(king, testMove, allPieces, gameState);
      });

      if (isPathSafe) {
        moves.push({ x: "g" as XCoord, y: rank as YCoord });
      }
    }
  }

  // Check queenside castling
  const queensideRook = allPieces.find(
    (p) =>
      p.type === "rook" &&
      p.color === king.color &&
      p.position.x === "a" &&
      p.position.y === rank
  );

  if (queensideRook) {
    const queensidePath = ["b", "c", "d"];
    const isQueensideClear = queensidePath.every(
      (x) => !allPieces.some((p) => p.position.x === x && p.position.y === rank)
    );

    if (isQueensideClear && !isKingInCheck(allPieces, king.color, gameState)) {
      // Check if king moves through check
      const isPathSafe = queensidePath.every((x) => {
        const testMove = { x: x as XCoord, y: rank as YCoord };
        return !wouldMoveExposeCheck(king, testMove, allPieces, gameState);
      });

      if (isPathSafe) {
        moves.push({ x: "c" as XCoord, y: rank as YCoord });
      }
    }
  }

  return moves;
};

const isKingInCheck = (
  positions: PiecePosition[],
  kingColor: PieceColor,
  gameState: GameState
): boolean => {
  const king = positions.find(
    (p) => p.type === "king" && p.color === kingColor
  );
  if (!king) return false;

  return positions.some((piece) => {
    if (piece.color === kingColor) return false;
    const basicMoves = getBasicMoves(piece, positions, gameState);
    return basicMoves.some(
      (move) => move.x === king.position.x && move.y === king.position.y
    );
  });
};

const PromotionSelector = ({
  color,
  onSelect,
}: {
  color: PieceColor;
  onSelect: (pieceType: PieceType) => void;
}) => {
  const pieces: PieceType[] = ["queen", "rook", "bishop", "knight"];

  return (
    <div className={styles.promotionSelector}>
      {pieces.map((piece) => (
        <div key={piece} onClick={() => onSelect(piece)}>
          <RenderPiece type={piece} color={color} />
        </div>
      ))}
    </div>
  );
};

const Timer = ({ seconds }: { seconds: number }) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return (
    <div className={styles.timer}>
      {minutes}:{remainingSeconds.toString().padStart(2, "0")}
    </div>
  );
};

const hasInsufficientMaterial = (board: PiecePosition[]): boolean => {
  const pieces = board.map((p) => ({ color: p.color, type: p.type }));

  // King vs King
  if (pieces.length === 2) return true;

  // King + Bishop/Knight vs King
  if (
    pieces.length === 3 &&
    pieces.some((p) => p.type === "bishop" || p.type === "knight")
  )
    return true;

  // King + Bishop vs King + Bishop (same color bishops)
  if (
    pieces.length === 4 &&
    pieces.filter((p) => p.type === "bishop").length === 2
  ) {
    const bishops = board.filter((p) => p.type === "bishop");
    const isSameColorSquare =
      (xCoords.indexOf(bishops[0].position.x) + Number(bishops[0].position.y)) %
        2 ===
      (xCoords.indexOf(bishops[1].position.x) + Number(bishops[1].position.y)) %
        2;
    if (isSameColorSquare) return true;
  }

  return false;
};

const isStalemate = (
  board: PiecePosition[],
  currentTurn: PieceColor,
  gameState: GameState
): boolean => {
  const currentPlayerPieces = board.filter((p) => p.color === currentTurn);
  return (
    currentPlayerPieces.every(
      (piece) => getAvailableMoves(piece, board, gameState).length === 0
    ) && !isKingInCheck(board, currentTurn, gameState)
  );
};

const getBoardPosition = (board: PiecePosition[]): string => {
  return board
    .sort(
      (a, b) =>
        Number(a.position.y) * 8 +
        xCoords.indexOf(a.position.x) -
        (Number(b.position.y) * 8 + xCoords.indexOf(b.position.x))
    )
    .map((p) => `${p.color}${p.type}${p.position.x}${p.position.y}`)
    .join("|");
};

export const Chessboard = () => {
  const [piecePositions, setPiecePositions] = useState<PiecePosition[]>(() => {
    const saved = localStorage.getItem("chessPieces");
    return saved ? JSON.parse(saved) : defaultPiecePositions;
  });
  const [availableMoves, setAvailableMoves] = useState<BoardCoordinates[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<PiecePosition | null>(
    null
  );
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem("chessGame");
    return saved
      ? JSON.parse(saved)
      : {
          currentTurn: "white",
          isCheck: false,
          isCheckmate: false,
          moveHistory: [],
          timeLeft: { white: 600, black: 600 },
          isTimerRunning: false,
          isDraw: false,
          drawReason: undefined,
          movesSincePawnOrCapture: 0,
          positionHistory: [],
        };
  });
  const [promotionSquare, setPromotionSquare] =
    useState<BoardCoordinates | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (gameState.isTimerRunning && !gameState.isCheckmate) {
      interval = setInterval(() => {
        setGameState((prev) => {
          const newTimeLeft = {
            ...prev.timeLeft,
            [prev.currentTurn]: Math.max(
              0,
              prev.timeLeft[prev.currentTurn] - 1
            ),
          };

          // Check for time out
          if (newTimeLeft[prev.currentTurn] === 0) {
            return {
              ...prev,
              isTimerRunning: false,
              isCheckmate: true,
              timeLeft: newTimeLeft,
            };
          }

          return {
            ...prev,
            timeLeft: newTimeLeft,
          };
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [gameState.isTimerRunning, gameState.currentTurn, gameState.isCheckmate]);

  useEffect(() => {
    localStorage.setItem("chessPieces", JSON.stringify(piecePositions));
    localStorage.setItem("chessGame", JSON.stringify(gameState));
  }, [piecePositions, gameState]);

  const mapIndexToBoardCoordinates = (rowIndex: number, colIndex: number) => {
    const rowMap: Record<number, BoardCoordinates["x"]> = {
      0: "a",
      1: "b",
      2: "c",
      3: "d",
      4: "e",
      5: "f",
      6: "g",
      7: "h",
    };
    const colMap: Record<number, BoardCoordinates["y"]> = {
      0: "8",
      1: "7",
      2: "6",
      3: "5",
      4: "4",
      5: "3",
      6: "2",
      7: "1",
    };

    return { x: rowMap[colIndex], y: colMap[rowIndex] };
  };

  const getColor = useCallback((rowIndex: number, cellIndex: number) => {
    return (rowIndex + cellIndex) % 2 === 0 ? "black" : "white";
  }, []);

  const getPieceForBoardCell = useCallback(
    (rowIndex: number, cellIndex: number) => {
      const { x, y } = mapIndexToBoardCoordinates(rowIndex, cellIndex);
      const piece = piecePositions.find((piece) => {
        return piece.position.x === x && piece.position.y === y;
      });

      return piece;
    },
    [piecePositions]
  );

  const isCellAvailable = (rowIndex: number, cellIndex: number) => {
    const { x, y } = mapIndexToBoardCoordinates(rowIndex, cellIndex);
    return availableMoves.some((move) => move.x === x && move.y === y);
  };

  const handlePieceClick = (piece: PiecePosition) => {
    setSelectedPiece(piece);
    setAvailableMoves(getAvailableMoves(piece, piecePositions, gameState));
  };

  const handleCellClick = (coordinates: BoardCoordinates) => {
    if (selectedPiece && selectedPiece.color !== gameState.currentTurn) {
      return;
    }

    if (
      selectedPiece &&
      availableMoves.some(
        (move) => move.x === coordinates.x && move.y === coordinates.y
      )
    ) {
      // Check for en passant capture
      const isEnPassant =
        selectedPiece.type === "pawn" &&
        coordinates.x !== selectedPiece.position.x &&
        !piecePositions.some(
          (p) =>
            p.position.x === coordinates.x && p.position.y === coordinates.y
        );

      setPiecePositions((prev) =>
        prev
          .filter((p) => {
            // Remove captured piece (including en passant captures)
            if (isEnPassant && gameState.lastMove) {
              return !(
                p.position.x === coordinates.x &&
                p.position.y === selectedPiece.position.y
              );
            }
            return !(
              p.position.x === coordinates.x && p.position.y === coordinates.y
            );
          })
          .map((p) =>
            p === selectedPiece ? { ...p, position: coordinates } : p
          )
      );

      setGameState((prev) => {
        const newPositions = piecePositions.map((p) =>
          p === selectedPiece ? { ...p, position: coordinates } : p
        );

        const nextTurn = prev.currentTurn === "white" ? "black" : "white";
        const isInStalemate = isStalemate(newPositions, nextTurn, prev);
        const hasInsufficient = hasInsufficientMaterial(newPositions);

        return {
          ...prev,
          currentTurn: nextTurn,
          isDraw: isInStalemate || hasInsufficient,
          drawReason: isInStalemate
            ? "stalemate"
            : hasInsufficient
            ? "insufficient"
            : prev.drawReason,
          lastMove: {
            piece: selectedPiece,
            from: selectedPiece.position,
            to: coordinates,
          },
          positionHistory: [
            ...prev.positionHistory,
            getBoardPosition(newPositions),
          ],
          // ... other state updates ...
        };
      });

      setSelectedPiece(null);
      setAvailableMoves([]);
    }
    // ... rest of the function
  };

  const isCellSelected = (rowIndex: number, cellIndex: number) => {
    if (!selectedPiece) return false;
    const coords = mapIndexToBoardCoordinates(rowIndex, cellIndex);
    return (
      coords.x === selectedPiece.position.x &&
      coords.y === selectedPiece.position.y
    );
  };

  const handlePromotion = (pieceType: PieceType) => {
    if (!selectedPiece || !promotionSquare) return;

    setPiecePositions((prev) =>
      prev
        .filter(
          (p) =>
            !(
              p.position.x === promotionSquare.x &&
              p.position.y === promotionSquare.y
            )
        )
        .map((p) =>
          p === selectedPiece
            ? { ...p, position: promotionSquare, type: pieceType }
            : p
        )
    );

    setGameState((prev) => ({
      ...prev,
      currentTurn: prev.currentTurn === "white" ? "black" : "white",
      isCheck: isKingInCheck(
        piecePositions,
        prev.currentTurn === "white" ? "black" : "white",
        gameState
      ),
      moveHistory: [
        ...prev.moveHistory,
        {
          piece: { ...selectedPiece, type: pieceType },
          from: selectedPiece.position,
          to: promotionSquare,
          capture: piecePositions.find(
            (p) =>
              p.position.x === promotionSquare.x &&
              p.position.y === promotionSquare.y
          ),
        },
      ],
    }));

    setSelectedPiece(null);
    setAvailableMoves([]);
    setPromotionSquare(null);
  };

  const status = gameState.isCheckmate
    ? `Checkmate! ${
        gameState.currentTurn === "white" ? "Black" : "White"
      } wins!`
    : gameState.isDraw
    ? `Draw by ${
        gameState.drawReason === "stalemate"
          ? "stalemate"
          : gameState.drawReason === "insufficient"
          ? "insufficient material"
          : gameState.drawReason === "threefold"
          ? "threefold repetition"
          : "fifty-move rule"
      }`
    : gameState.isCheck
    ? "Check!"
    : `Current turn: ${gameState.currentTurn}`;

  const resetGame = () => {
    localStorage.removeItem("chessGame");
    setGameState({
      currentTurn: "white",
      isCheck: false,
      isCheckmate: false,
      moveHistory: [],
      timeLeft: {
        white: 600,
        black: 600,
      },
      isTimerRunning: false,
      isDraw: false,
      drawReason: undefined,
      movesSincePawnOrCapture: 0,
      positionHistory: [],
    });
    setPiecePositions(defaultPiecePositions);
  };

  return (
    <div className={styles.chessboard}>
      <h1>Chessboard</h1>
      <div className={styles.status}>{status}</div>
      <div className={styles.timers}>
        <div className={styles.timerContainer}>
          <span>Black</span>
          <Timer seconds={gameState.timeLeft.black} />
        </div>
        <div className={styles.timerContainer}>
          <span>White</span>
          <Timer seconds={gameState.timeLeft.white} />
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <table>
          <thead>
            <tr>
              <th></th>
              {["a", "b", "c", "d", "e", "f", "g", "h"].map((label) => (
                <th key={`col-label-${label}`} className={styles.colLabel}>
                  {label.toUpperCase()}
                </th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 8 }).map((_, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                <td className={styles.rowLabel}>{8 - rowIndex}</td>
                {Array.from({ length: 8 }).map((_, cellIndex) => {
                  const piece = getPieceForBoardCell(rowIndex, cellIndex);
                  return (
                    <td
                      className={`${styles.cell} 
                        ${styles[getColor(rowIndex, cellIndex)]} 
                        ${
                          isCellAvailable(rowIndex, cellIndex)
                            ? styles.available
                            : ""
                        }
                        ${
                          isCellSelected(rowIndex, cellIndex)
                            ? styles.selected
                            : ""
                        }`}
                      key={`cell-${cellIndex}-${rowIndex}`}
                      onClick={() =>
                        handleCellClick(
                          mapIndexToBoardCoordinates(rowIndex, cellIndex)
                        )
                      }
                    >
                      {piece ? (
                        <RenderPiece
                          onClick={() => {
                            handlePieceClick(piece);
                          }}
                          type={piece.type}
                          color={piece.color}
                        />
                      ) : null}
                    </td>
                  );
                })}
                <td className={styles.rowLabel}>{8 - rowIndex}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              {["a", "b", "c", "d", "e", "f", "g", "h"].map((label) => (
                <th key={`col-label-${label}`} className={styles.colLabel}>
                  {label.toUpperCase()}
                </th>
              ))}
              <th></th>
            </tr>
          </tfoot>
        </table>
        {promotionSquare && selectedPiece && (
          <div
            style={{
              position: "absolute",
              left: `${xCoords.indexOf(promotionSquare.x) * 64}px`,
              top: `${(selectedPiece.color === "white" ? 0 : 4) * 64}px`,
            }}
          >
            <PromotionSelector
              color={selectedPiece.color}
              onSelect={handlePromotion}
            />
          </div>
        )}
      </div>
      <button onClick={resetGame}>New Game</button>
    </div>
  );
};

export default Chessboard;
