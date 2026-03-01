"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Bot, PartyPopper, RefreshCw } from "lucide-react";

type Player = "X" | "O" | null;

const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

export function TicTacToeEasterEgg() {
    const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [winner, setWinner] = useState<Player | "Tie">(null);

    const checkWinner = (squares: Player[]) => {
        for (let i = 0; i < winLines.length; i++) {
            const [a, b, c] = winLines[i];
            if (
                squares[a] &&
                squares[a] === squares[b] &&
                squares[a] === squares[c]
            ) {
                return squares[a];
            }
        }
        return squares.includes(null) ? null : "Tie";
    };

    const handleSquareClick = (index: number) => {
        if (board[index] || winner || !isPlayerTurn) return;

        const newBoard = [...board];
        newBoard[index] = "X";
        setBoard(newBoard);
        setIsPlayerTurn(false);
    };

    useEffect(() => {
        const currentWinner = checkWinner(board);
        if (currentWinner) {
            setWinner(currentWinner);
            return;
        }

        if (!isPlayerTurn) {
            const timer = setTimeout(() => {
                const aiMove = getBestMove(board);
                if (aiMove !== -1) {
                    const newBoard = [...board];
                    newBoard[aiMove] = "O";
                    setBoard(newBoard);
                    setIsPlayerTurn(true);
                }
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [board, isPlayerTurn]);

    const getBestMove = (squares: Player[]) => {
        const emptySpots = squares
            .map((val, idx) => (val === null ? idx : null))
            .filter((val) => val !== null) as number[];
        if (emptySpots.length === 0) return -1;

        const findWinningMove = (player: Player) => {
            for (let i of emptySpots) {
                const temp = [...squares];
                temp[i] = player;
                if (checkWinner(temp) === player) return i;
            }
            return -1;
        };

        const winMove = findWinningMove("O");
        if (winMove !== -1) return winMove;

        const blockMove = findWinningMove("X");
        if (blockMove !== -1) return blockMove;

        if (squares[4] === null) return 4;

        return emptySpots[Math.floor(Math.random() * emptySpots.length)];
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setWinner(null);
        setIsPlayerTurn(true);
    };

    return (
        <div className="flex flex-col items-center bg-card shadow-lg p-6 border border-border rounded-xl w-full max-w-sm">
            <div className="flex justify-between items-center mb-6 w-full">
                <h3 className="font-bold text-lg">Tic-Tac-Toe vs Bot</h3>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={resetGame}
                    aria-label="Reset game"
                >
                    <RefreshCw className="size-4" />
                </Button>
            </div>

            <div className="gap-2 grid grid-cols-3 w-full aspect-square">
                {board.map((square, index) => (
                    <button
                        key={index}
                        onClick={() => handleSquareClick(index)}
                        disabled={!!square || !!winner || !isPlayerTurn}
                        className={`
                            flex items-center justify-center text-4xl font-bold rounded-md
                            transition-all duration-200
                            ${square ? "bg-muted cursor-default" : "bg-secondary hover:bg-muted/80 cursor-pointer"}
                            ${square === "X" ? "text-blue-500" : "text-destructive"}
                        `}
                        aria-label={`Square ${index}`}
                    >
                        {square}
                    </button>
                ))}
            </div>

            <div className="mt-6 h-6 font-medium text-center">
                {winner === "Tie" ? (
                    <span className="text-muted-foreground">It's a draw!</span>
                ) : winner === "X" ? (
                    <span className="flex items-center gap-2 text-blue-500">
                        You won! <PartyPopper />
                    </span>
                ) : winner === "O" ? (
                    <span className="flex items-center gap-2 text-destructive">
                        Bot wins! <Bot />
                    </span>
                ) : !isPlayerTurn ? (
                    <span className="text-muted-foreground animate-pulse">
                        Bot is thinking...
                    </span>
                ) : (
                    <span className="text-foreground">Your turn (X)</span>
                )}
            </div>
        </div>
    );
}
