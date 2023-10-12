import { Piece, PieceType, Position, TeamType, isSamePosition } from "../Constants"

export default class Referee 
{
    //Checks if tile is empty or occupied by an opponent;
    moveOrAttack(position: Position, boardState: Piece[], team: TeamType) {
        return !this.tileIsOccupied(position, boardState) || this.tileIsOccupiedByOpponent(position, boardState, team);
    }

    //Checks if tile is occupied*
    tileIsOccupied(position: Position, boardState: Piece[]): boolean {
        const piece = boardState.find(p => isSamePosition(p.position, position));
        if (piece)
            return true;
        return false;
    }

    //Checks if the tile is occupied *by and opponent
    tileIsOccupiedByOpponent(position: Position, boardState: Piece[], team: TeamType): boolean {
        const piece = boardState.find((p) => isSamePosition(p.position, position) && p.team !== team);
        if (piece)
            return true;
        return false;
    }

    //Checks for en passant move;
    isEnPassant(initPos: Position, nextPos: Position, type: PieceType, team: TeamType, boardState: Piece[]) {
        if(type === PieceType.PAWN) {
            const pawnDirection = (team === TeamType.OUR) ? 1 : -1;
            if ((nextPos.x - initPos.x === -1 || nextPos.x - initPos.x === 1) && nextPos.y - initPos.y === pawnDirection) {
                const piece = boardState.find(p => p.position.x === nextPos.x && p.position.y === nextPos.y - pawnDirection && p.enPassant);
                if (piece)
                    return true;
                return false;
            } 
        }
        return false;
    }

    //pawn move logic
    pawnMove(initPos: Position, nextPos: Position, team: TeamType, boardState: Piece[]):boolean {
        //not moving, abort;
        if (nextPos.x === initPos.x && nextPos.y === initPos.y)
            return false;
    
        const specialRow = (team === TeamType.OUR) ? 1 : 6;
        const pawnDirection = (team === TeamType.OUR) ? 1 : -1;
    
        //Movement (Checks for extra pawn movement)
        if (initPos.y === specialRow && nextPos.y - initPos.y === 2*pawnDirection) {
            if (!this.tileIsOccupied(nextPos, boardState) && !this.tileIsOccupied({x: nextPos.x, y: nextPos.y - pawnDirection}, boardState))
                return true;
        } else if (initPos.x === nextPos.x && nextPos.y - initPos.y === pawnDirection){ 
            if (!this.tileIsOccupied(nextPos,boardState))
                return true;       
        //attack
        } else if (nextPos.x - initPos.x === -1 && nextPos.y - initPos.y === pawnDirection) {
            if (this.tileIsOccupiedByOpponent(nextPos, boardState, team))
                return true;
        }else if (nextPos.x - initPos.x === 1 && nextPos.y - initPos.y === pawnDirection) {
            if (this.tileIsOccupiedByOpponent(nextPos, boardState, team))
                return true;
        }
        return false;
    }

    //knight move logic
    knightMove(initPos: Position, nextPos: Position, team: TeamType, boardState: Piece[]):boolean {
        //not moving, abort;
        if (nextPos.x === initPos.x && nextPos.y === initPos.y)
            return false;
        for (let i = -1; i < 2; i += 2) {
            for (let j = -1; j < 2; j += 2) {
                //Long-Y Movement
                if (nextPos.y - initPos.y === 2 * i) 
                    if (nextPos.x - initPos.x === j) 
                        if(this.moveOrAttack(nextPos, boardState, team))
                            return true;
                //Long-X Movement
                if (nextPos.x - initPos.x === 2 * i) 
                    if (nextPos.y - initPos.y === j) 
                        if(this.moveOrAttack(nextPos, boardState, team))
                            return true;       
            }
        }
        return false;
    }
    
    //Bishop Move logia
    bishopMove(initPos: Position, nextPos: Position, team: TeamType, boardState: Piece[]):boolean {
        //not moving, abort;
        if (nextPos.x === initPos.x && nextPos.y === initPos.y)
            return false;
        for (let i = 1; i < 8; i++) {
            //Forward-Right Movement
            if(nextPos.x > initPos.x && nextPos.y > initPos.y) {
                //passedPos == each position from the initPos to the nextPos;
                let passedPos: Position = {x: initPos.x + i, y: initPos.y + i};
                //if the passedPos == nextPos, i've reached my destination;
                if (passedPos.x === nextPos.x && passedPos.y === nextPos.y)
                    if(this.moveOrAttack(passedPos, boardState, team))
                        return true;
                //is it occupied;
                if (this.tileIsOccupied(passedPos, boardState))
                    //can't go, turn back;
                    break;
            }   
            //Backward-Right Movement
            if(nextPos.x > initPos.x && nextPos.y < initPos.y) {
                //passedPos == each position incrementing from the initPos to the nextPos;
                let passedPos: Position = {x: initPos.x + i, y: initPos.y - i};
                //if the passedPos == nextPos, i've reached my destination;
                if (passedPos.x === nextPos.x && passedPos.y === nextPos.y)
                    //is the space i want occupied or can i capture;
                    if (this.moveOrAttack(passedPos, boardState, team))
                        return true;
                //is passedPos occupied;
                if (this.tileIsOccupied(passedPos, boardState))
                    //can't go, turn back;
                    break;  
            }
            //Forward-Left Movement 
            if(nextPos.x < initPos.x && nextPos.y > initPos.y) {
                //passedPos == each position from the initPos to the nextPos;
                let passedPos: Position = {x: initPos.x - i, y: initPos.y + i};
                //if the passedPos == nextPos, i've reached my destination;
                if (passedPos.x === nextPos.x && passedPos.y === nextPos.y)
                    if (this.moveOrAttack(passedPos, boardState, team))
                        return true;
                //is it occupied;
                if (this.tileIsOccupied(passedPos, boardState))
                    //can't go, turn back;
                    break;  
            }
            //Backward-Left Movement
            if(nextPos.x < initPos.x && nextPos.y < initPos.y) {
                //passedPos == each position from the initPos to the nextPos;
                let passedPos: Position = {x: initPos.x - i, y: initPos.y - i};
                //if the passedPos == nextPos, i've reached my destination;
                if (passedPos.x === nextPos.x && passedPos.y === nextPos.y)
                    if (this.moveOrAttack(passedPos, boardState, team))
                        return true;
                //is it occupied;
                if (this.tileIsOccupied(passedPos, boardState))
                    //can't go, turn back;
                    break;   
            }
        }
        return false;
    }

    //ROOK Move logic
    rookMove(initPos: Position, nextPos: Position, team: TeamType, boardState: Piece[]):boolean {
        //not moving, abort;
        if (nextPos.x === initPos.x && nextPos.y === initPos.y)
            return false;
        //VERTICAL Movement?
        if (nextPos.x === initPos.x) {
            for (let i = 1; i < 8; i++) {
                //up or down?
                let multiplier = (nextPos.y < initPos.y) ? -1 : 1;
                //passedPos == each position from the initPos to the nextPos;
                let passedPos: Position = {x: initPos.x, y: initPos.y+(i*multiplier)};
                //are we there yet?
                if (passedPos.y === nextPos.y) 
                    //can i move or attack?
                    if(this.moveOrAttack(passedPos, boardState, team))
                        return true;
                //is my bro in the way?
                if (this.tileIsOccupied(passedPos, boardState))
                    break;
            }
        }
        //HORIZONTAL Movement?
        if (nextPos.y === initPos.y) {
            for (let i = 1; i < 8; i++) {
                //left or right?
                let multiplier = (nextPos.x < initPos.x) ? -1 : 1;
                //passedPos == each position from the initPos to the nextPos;
                let passedPos: Position = {x: initPos.x+(i*multiplier), y: initPos.y};
                //there?
                if (passedPos.x === nextPos.x)
                    //can i move or attack?
                    if(this.moveOrAttack(passedPos, boardState, team))
                        return true;
                //brody in the way?
                if (this.tileIsOccupied(passedPos, boardState))
                    break;
            }
        }
    return false;
    }

    // queen mOVE 🧠 
    queenMove(initPos: Position, nextPos: Position, team: TeamType, boardState: Piece[]):boolean {
        //not moving, abort;
        if (nextPos.x === initPos.x && nextPos.y === initPos.y)
            return false;

        for (let i = 1; i < 8; i++) {
            
            let dirx = (nextPos.x < initPos.x) ? -1 : (nextPos.x > initPos.x) ? 1 : 0;
            let diry = (nextPos.y < initPos.y) ? -1 : (nextPos.y > initPos.y) ? 1 : 0;

            let passedPos: Position = {x: initPos.x + (i * dirx), y: initPos.y + (i * diry)};

            if(isSamePosition(passedPos, nextPos))
                if(this.moveOrAttack(passedPos, boardState, team))
                    return true;
            if(this.tileIsOccupied(passedPos, boardState))
                break;
        }
    return false;
    }

    kingMove(initPos: Position, nextPos: Position, team: TeamType, boardState: Piece[]) {
        //not moving, abort;
        if (nextPos.x === initPos.x && nextPos.y === initPos.y)
            return false;
        
        //find difference in x & y values
        const dx = initPos.x - nextPos.x;
        const dy = initPos.y - nextPos.y;

        //am i moving like a king? if not invalid move
        if(!(Math.abs(dx) <= 1 && Math.abs(dy) <= 1))
            return false;

        //move or attack
        return this.moveOrAttack(nextPos, boardState, team);
    }

    //Checks if move is valid
    isValidMove(initPos: Position, nextPos: Position, type: PieceType, team: TeamType, boardState: Piece[]) {
        let valid = false;
        switch(type) {
            case PieceType.PAWN:
                valid = this.pawnMove(initPos, nextPos, team, boardState);
                break;
            case PieceType.KNIGHT:
                valid = this.knightMove(initPos, nextPos, team, boardState);
                break;
            case PieceType.BISHOP:
                valid = this.bishopMove(initPos, nextPos, team, boardState);
                break;
            case PieceType.ROOK:
                valid = this.rookMove(initPos, nextPos, team, boardState);
                break;
            case PieceType.QUEEN:
                valid = this.queenMove(initPos, nextPos, team, boardState);
                break;
            case PieceType.KING:
                valid = this.kingMove(initPos, nextPos, team, boardState);
                break;
        }
        //NOT VALID
        return valid;
    }
}