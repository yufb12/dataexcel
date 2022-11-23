import { Point, Size } from "../Base/Point";

export class SizeChangRect  
{
    constructor()
    { 
    }
    MouseDownPoint: Point;
    Size: Size;
    GetChangedWidth(newpoint: Point)
    {
        let w = newpoint.X - this.MouseDownPoint.X;
        w = w + this.Size.Width;
        return w;
    }
    GetChangedHeight(newpoint: Point)
    {
        let h = newpoint.Y - this.MouseDownPoint.Y;
        h = h + this.Size.Height;
        return h;
    }
}
 
