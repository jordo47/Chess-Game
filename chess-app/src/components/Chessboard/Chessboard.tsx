import { useRef, useState } from "react";
import './Chessboard.css';
import Tile from '../Tile/Tile';
import Referee from "../../referee/Referee";
import { X_AXIS, Y_AXIS, Piece, PieceType, TeamType, initialBoardState, Position, GRID_SIZE, isSamePosition } from "../../Constants";


export default function Chessboard() 
{
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [grabPos, setGrabPos] = useState<Position>({x: -1, y: -1});
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
    const boardRef = useRef<HTMLDivElement>(null);
    const referee = new Referee();

    function grabPiece(e: React.MouseEvent) 
    {
        const element = e.target as HTMLElement;
        const chessboard = boardRef.current;
        if (element.classList.contains("piece") && chessboard) 
        {
            const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
            const grabY = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800)  / GRID_SIZE));
            setGrabPos({ x: grabX, y: grabY});
    
            const x = e.clientX - GRID_SIZE/2;
            const y = e.clientY - GRID_SIZE/2;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top =  `${y}px`;

            setActivePiece(element);
            
        }
    }

    function movePiece(e: React.MouseEvent)
    {
        const board = boardRef.current;
        
        if (activePiece && board)
        {  
            const minX = board.offsetLeft - GRID_SIZE/4;
            const minY = board.offsetTop - GRID_SIZE/4;
            const maxX = board.offsetLeft + board.offsetWidth - GRID_SIZE;
            const maxY = board.offsetTop + board.offsetHeight - GRID_SIZE;
            const x = e.clientX - GRID_SIZE/2;
            const y = e.clientY - GRID_SIZE/2;
            activePiece.style.position = "absolute";
            
            if (x < minX) {
                activePiece.style.left = `${minX}px`;
            } else if (x > maxX) {
                activePiece.style.left = `${maxX}px`;
            } else {
                activePiece.style.left = `${x}px`;
            }

            if (y < minY) {
                activePiece.style.top = `${minY}px`;
            } else if (y > maxY) {
                activePiece.style.top = `${maxY}px`;
            } else {
                activePiece.style.top = `${y}px`;
            }

        }
        
    }

    function dropPiece(e: React.MouseEvent)
    {
        const chessboard = boardRef.current;
        if(activePiece && chessboard) {
            const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
            const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800)  / GRID_SIZE));

            const currentPiece = pieces.find(p=> isSamePosition(p.position, grabPos));

            if (currentPiece) {
                const validMove = referee.isValidMove(grabPos, {x,  y}, currentPiece.type, currentPiece.team, pieces);
                const isEnPassant = referee.isEnPassant(grabPos, {x,  y}, currentPiece.type, currentPiece.team, pieces);
                const pawnDirection = (currentPiece.team === TeamType.OUR) ? 1 : -1;
                if(isEnPassant) {
                    const updatePieces = pieces.reduce((results, piece) => {
                        if (isSamePosition(piece.position, grabPos)) {
                            piece.enPassant = false;
                            piece.position.x = x;
                            piece.position.y = y;
                            results.push(piece);

                        } else if (!isSamePosition(piece.position, { x, y: y-pawnDirection})) {
                            if (piece.type === PieceType.PAWN) {
                                piece.enPassant = false;
                            }
                            results.push(piece);
                        }
                        return results;
                    }, [] as Piece[]);
                    setPieces(updatePieces);

                } else if (validMove) {
                    const updatePieces = pieces.reduce((results, piece) => {
                        if(isSamePosition(piece.position, grabPos))
                        {
                            piece.enPassant = 
                                Math.abs(grabPos.y - y) === 2 &&
                                piece.type === PieceType.PAWN;
                            piece.position.x = x;
                            piece.position.y = y;
                            results.push(piece);
                        } else if (!isSamePosition(piece.position, { x, y})){
                            if(piece.type === PieceType.PAWN) {
                                piece.enPassant = false;
                            }
                            results.push(piece);
                        }

                        return results;
                    }, [] as Piece[]);

                    setPieces(updatePieces);
                } else {
                    //reset piece position
                    activePiece.style.position = 'relative';
                    activePiece.style.removeProperty('top');
                    activePiece.style.removeProperty('left');
                }
            }
            setActivePiece(null);           
        }
    }

    let board = [];
    for (let j = Y_AXIS.length - 1; j >= 0; j--)
    {
        for (let i = 0; i < X_AXIS.length; i++)
        {
            const num = j + i + 2;
            const piece = pieces.find(p => isSamePosition(p.position, {x: i, y: j}));
            let image = piece ? piece.img : undefined;

            board.push(<Tile key={`${j},${i}`} img={image} num={num}/>);
            
        }
    }
    return (
        <div 
          onMouseMove={(e) => movePiece(e)} 
          onMouseDown={(e) => grabPiece(e)} 
          onMouseUp={(e) => dropPiece(e)}
          id="chessboard"
          ref ={boardRef}
        >
            {board}
        </div>);
}