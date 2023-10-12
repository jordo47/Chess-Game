export const X_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const Y_AXIS = ["1", "2", "3", "4", "5", "6", "7", "8"];

export const GRID_SIZE = 100;

export function isSamePosition(p1: Position, p2: Position) {
    return p1.x === p2.x && p1.y === p2.y;
}

export interface Position 
{
    x: number;
    y: number; 
}

export enum TeamType 
{
    OUR,
    OPPONENT
}

export enum PieceType 
{
    PAWN,
    BISHOP,
    KNIGHT,
    ROOK,
    KING,
    QUEEN
}
export interface Piece 
{
    img: string;
    position: Position;
    type: PieceType;
    team: TeamType;
    enPassant?: boolean;
}

export const initialBoardState: Piece[] = [
    {img:`/assets/img/B R.png`, position: {x: 0, y: 7,}, type: PieceType.ROOK, team: TeamType.OPPONENT},
    {img:`/assets/img/B R.png`, position: {x: 7, y: 7,}, type: PieceType.ROOK, team: TeamType.OPPONENT},
    {img:`/assets/img/W R.png`, position: {x: 0, y: 0,}, type: PieceType.ROOK, team: TeamType.OUR},
    {img:`/assets/img/W R.png`, position: {x: 7, y: 0,}, type: PieceType.ROOK, team: TeamType.OUR},
    {img:`/assets/img/B B.png`, position: {x: 2, y: 7,}, type: PieceType.BISHOP, team: TeamType.OPPONENT},
    {img:`/assets/img/B B.png`, position: {x: 5, y: 7,}, type: PieceType.BISHOP, team: TeamType.OPPONENT},
    {img:`/assets/img/W B.png`, position: {x: 2, y: 0,}, type: PieceType.BISHOP, team: TeamType.OUR},
    {img:`/assets/img/W B.png`, position: {x: 5, y: 0,}, type: PieceType.BISHOP, team: TeamType.OUR},
    {img:`/assets/img/B Kn.png`, position: {x: 1, y: 7,}, type: PieceType.KNIGHT, team: TeamType.OPPONENT},
    {img:`/assets/img/B Kn.png`, position: {x: 6, y: 7,}, type: PieceType.KNIGHT, team: TeamType.OPPONENT},
    {img:`/assets/img/W Kn.png`, position: {x: 1, y: 0,}, type: PieceType.KNIGHT, team: TeamType.OUR},
    {img:`/assets/img/W Kn.png`, position: {x: 6, y: 0,}, type: PieceType.KNIGHT, team: TeamType.OUR},
    {img:`/assets/img/B Kg.png`, position: {x: 4, y: 7,}, type: PieceType.KING, team: TeamType.OPPONENT},
    {img:`/assets/img/W Kg.png`, position: {x: 4, y: 0,}, type: PieceType.KING, team: TeamType.OUR},
    {img:`/assets/img/B Q.png`, position: {x: 3, y: 7,}, type: PieceType.QUEEN, team: TeamType.OPPONENT},
    {img:`/assets/img/W Q.png`, position: {x: 3, y: 0,}, type: PieceType.QUEEN, team: TeamType.OUR},
    {img:"/assets/img/B P.png", position: {x: 0, y: 6,}, type: PieceType.PAWN, team: TeamType.OPPONENT},
    {img:"/assets/img/B P.png", position: {x: 1, y: 6,}, type: PieceType.PAWN, team: TeamType.OPPONENT},
    {img:"/assets/img/B P.png", position: {x: 2, y: 6,}, type: PieceType.PAWN, team: TeamType.OPPONENT},
    {img:"/assets/img/B P.png", position: {x: 3, y: 6,}, type: PieceType.PAWN, team: TeamType.OPPONENT},
    {img:"/assets/img/B P.png", position: {x: 4, y: 6,}, type: PieceType.PAWN, team: TeamType.OPPONENT},
    {img:"/assets/img/B P.png", position: {x: 5, y: 6,}, type: PieceType.PAWN, team: TeamType.OPPONENT},
    {img:"/assets/img/B P.png", position: {x: 6, y: 6,}, type: PieceType.PAWN, team: TeamType.OPPONENT},
    {img:"/assets/img/B P.png", position: {x: 7, y: 6,}, type: PieceType.PAWN, team: TeamType.OPPONENT},
    {img:"/assets/img/W P.png", position: {x: 0, y: 1,}, type: PieceType.PAWN, team: TeamType.OUR},
    {img:"/assets/img/W P.png", position: {x: 1, y: 1,}, type: PieceType.PAWN, team: TeamType.OUR},
    {img:"/assets/img/W P.png", position: {x: 2, y: 1,}, type: PieceType.PAWN, team: TeamType.OUR},
    {img:"/assets/img/W P.png", position: {x: 3, y: 1,}, type: PieceType.PAWN, team: TeamType.OUR},
    {img:"/assets/img/W P.png", position: {x: 4, y: 1,}, type: PieceType.PAWN, team: TeamType.OUR},
    {img:"/assets/img/W P.png", position: {x: 5, y: 1,}, type: PieceType.PAWN, team: TeamType.OUR},
    {img:"/assets/img/W P.png", position: {x: 6, y: 1,}, type: PieceType.PAWN, team: TeamType.OUR},
    {img:"/assets/img/W P.png", position: {x: 7, y: 1,}, type: PieceType.PAWN, team: TeamType.OUR}
];