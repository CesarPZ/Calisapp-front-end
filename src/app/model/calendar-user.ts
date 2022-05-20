import { Exercise } from "./exercise";
import { Routine } from "./routine";

export class CalendarUser {
    dayRoutine:Date;
    routineName:string;
    exerciseNumberDayRoutine:number;
    exercises:Exercise[];
    routine:Routine;
}
