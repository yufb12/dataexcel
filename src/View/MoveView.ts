import { EventView } from "../Base/EventView";
import { Point, Rect } from "../Base/Point";
import { IViewEvent } from "../Control/IViewEvent";

export enum StateMode
{
    NULL = 0,
    MOVE = 1,
    SIZE=2

}
export class MoveView implements IViewEvent
{
    protected _height = 0;
    public get Height()
    {

        return this._height;
    }
    public set Height(value)
    {
        this._height = value;
    }
    public get Right()
    {
        return this._left + this.Width;
    }

    public get Bottom()
    {
        return this.Top + this.Height;
    }

    protected _left = 0;
    public get Left()
    {

        return this._left;
    }
    public set Left(value)
    {
        this._left = value;
    }

    protected _top = 0;

    public get Top()
    {
        return this._top;
    }
    public set Top(value)
    {
        this._top = value;
    }


    protected _width = 0;

    public get Width()
    {

        return this._width;
    }
    public set Width(value)
    {
        this._width = value;
    }
    public get Rect(): Rect
    {
        let rect = new Rect(0, 0, 0, 0);
        rect.X = this.Left;
        rect.Y = this.Top;
        rect.Width = this.Width;
        rect.Height = this.Height;
        return rect;
    }
    private _MouseDownPoint: Point;
    public get MouseDownPoint(): Point
    {
        return this._MouseDownPoint;
    }
    public set MouseDownPoint(value: Point)
    {
        this._MouseDownPoint = value;
    }
    private _StateMode_1: StateMode;
    public get StateMode(): StateMode
    {
        return this._StateMode_1;
    }
    public set StateMode(value: StateMode)
    {
        this._StateMode_1 = value;
    }
    public constructor()
    {

    } 

    OnMouseDown(sender: any, e: any, ve: any): boolean
    {
        if (this.Rect.Contains(ve.ViewPoint))
        {
            this.MouseDownPoint = ve.Point;
            this.StateMode = StateMode.MOVE;
            return true;
        } 
        return false;
    }
    OnMouseUp(sender: any, e: any, ve: any): boolean
    {
        this.StateMode = StateMode.NULL;
        return false;
    }
    OnMouseMove(sender: any, e: any, ve: EventView): boolean
    {
        if (this.StateMode == StateMode.MOVE)
        {
            let x = ve.offsetPoint.X - this.MouseDownPoint.X;
            let y = ve.offsetPoint.Y - this.MouseDownPoint.Y;
            this.Left = this.Left + x;
            this.Top = this.Top + y;
            return true;
        }
        return false;
    }
    OnMouseDoubleClick(sender: any, e: any, ve: any): boolean
    {
        return false;
    }
    OnKeyPress(sender: any, e: KeyboardEvent, ve: any): boolean
    {
        return false;
    }
    OnKeyDown(sender: any, e: KeyboardEvent, ve: any): boolean
    {
        return false;
    }
    OnTouchStart(sender: any, e: TouchEvent, ve: any): boolean
    {
        return false;
    }
    OnTouchMove(sender: any, e: TouchEvent, ve: any): boolean
    {
        return false;
    }
    OnTouchEnd(sender: any, e: TouchEvent, ve: any): boolean
    {
        return false;
    }
     

}