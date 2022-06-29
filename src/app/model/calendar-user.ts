import { DayAndOpinion } from "./day-and-opinion";
import { Exercise } from "./exercise";
import { Routine } from "./routine";

export class CalendarUser {
    dayRoutine:Date;
    routineName:string;
    exerciseNumberDayRoutine:number;
    exercises:Exercise[];
    idCalendarUser:number;
    estadoDeAnimo:string;
    id:number;
    dayFinishRoutine:Date;
    dayInitRoutine:Date;
    weeksRoutine:number;
    daysRoutine:number[];
    dayAndOpinion:DayAndOpinion[];
    routine:Routine;
}
