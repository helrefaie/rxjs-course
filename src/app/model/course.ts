import * as moment from "moment";


export interface Course {
    id:number;
    description:string;
    iconUrl: string;
    courseListIcon: string;
    longDescription: string;
    category:string;
    lessonsCount:number;
    releasedAt: Date;
}
