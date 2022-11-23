import { Point, Size } from "./Point";

export class EventView
{
    offsetPoint: Point;
    Size: Size;
    Canvas: any;
    Dom: any;
    Touches: any; 
    NeedRePaint: boolean = false;
    CurrentEvent: any; 
    constructor()
    {
        
    }
}
 