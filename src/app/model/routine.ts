import { Exercise } from "./exercise";

export class Routine {
    id:number;
    nameRoutine:string;
    generatedBy:String;
    level:string;
    exercises:Array<Exercise>;
    daySelected:number;
    opinion:number;
}