import { EventView } from "../Base/EventView";
import { Point, Rect, Size } from "../Base/Point";
import { IViewEvent } from "../Control/IViewEvent";
import { StateMode } from "./MoveView";

 export  enum SizeChangMode
{
    Null,
    TopLeft,
    TopRight,
    MidLeft,
    MidRight,
    BoomLeft,
    BoomRight,
    MidTop,
    MidBoom
}
export class ReSizeView implements IViewEvent
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
    private _MouseDownsize: Size;
    public get MouseDownsize(): Size {
        return this._MouseDownsize;
    }
    public set MouseDownsize(value: Size) {
        this._MouseDownsize = value;
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

    SetDataExcelMouseDown(ve: EventView)
    {
        let pt = ve.offsetPoint;
        this.MouseDownPoint = ve.offsetPoint;
        this.MouseDownsize = new Size(this.Width, this.Height);

        let result = false;
        if (this.TopLeft.Contains(pt))
        {
            this.SizeChangMode = SizeChangMode.TopLeft;
            result = true;
        }
        else if (this.TopRight.Contains(pt))
        {
            this.SizeChangMode = SizeChangMode.TopRight;
            result = true;
        }
        else if (this.BottomLeft.Contains(pt))
        {
            this.SizeChangMode = SizeChangMode.BoomLeft;
            result = true;
        }
        else if (this.BottomRight.Contains(pt))
        {
            this.SizeChangMode = SizeChangMode.BoomRight;
            result = true;
        }
        else if (this.MidTop.Contains(pt))
        {
            this.SizeChangMode = SizeChangMode.MidTop;
            result = true;
        }
        else if (this.MidBottom.Contains(pt))
        {
            this.SizeChangMode = SizeChangMode.MidBoom;
            result = true;
        }
        else if (this.MidLeft.Contains(pt))
        {
            this.SizeChangMode = SizeChangMode.MidLeft;
            result = true;
        }
        else if (this.MidRight.Contains(pt))
        {
            this.SizeChangMode = SizeChangMode.MidRight;
            result = true;
        }
        return result;
    }
    ChangedSize(ve: EventView)
    {
        let location = ve.offsetPoint;// e.Location;
        let sf = new Size(location.X - this.MouseDownPoint.X, location.Y - this.MouseDownPoint.Y);

        switch (this.SizeChangMode)
        {
            case SizeChangMode.Null:
                break;
            case SizeChangMode.TopLeft:
                this.Width = this.MouseDownSize.Width - sf.Width;
                this.Height = this.MouseDownSize.Height - sf.Height;
                this.Top = location.Y;// this.MouseDownPoint.Y + sf.Height;
                this.Left = location.X;// this.MouseDownPoint.X + sf.Width;

                break;
            case SizeChangMode.TopRight:
                this.Width = this.MouseDownSize.Width + sf.Width;
                this.Height = this.MouseDownSize.Height - sf.Height;
                this.Top = location.Y;// this.MouseDownPoint.Y + sf.Height;

                break;
            case SizeChangMode.MidLeft:
                this.Width = this.MouseDownSize.Width - sf.Width;
                this.Left = this.MouseDownPoint.X + sf.Width;
                break;
            case SizeChangMode.MidRight:
                this.Width = this.MouseDownSize.Width + sf.Width;
                break;
            case SizeChangMode.BoomLeft:
                this.Width = this.MouseDownSize.Width - sf.Width;
                this.Height = this.MouseDownSize.Height + sf.Height;
                this.Left = this.MouseDownPoint.X + sf.Width;

                break;
            case SizeChangMode.BoomRight:

                this.Width = this.MouseDownSize.Width + sf.Width;
                this.Height = this.MouseDownSize.Height + sf.Height;
                break;
            case SizeChangMode.MidTop:
                this.Height = this.MouseDownSize.Height - sf.Height;
                this.Top = this.MouseDownPoint.Y + sf.Height;
                break;
            case SizeChangMode.MidBoom:
                this.Height = this.MouseDownSize.Height + sf.Height;
                break;
            default:
                break;
        }
    }
 
    private _MouseDownSize: Size;
    public get MouseDownSize(): Size
    {
        return this._MouseDownSize;
    }
    public set MouseDownSize(value: Size)
    {
        this._MouseDownSize = value;
    }


    private _SizeChangMode: SizeChangMode;
    public get SizeChangMode(): SizeChangMode
    {
        return this._SizeChangMode;
    }
    public set SizeChangMode(value: SizeChangMode)
    {
        this._SizeChangMode = value;
    }


    private _SelectBorderWidth: 6;
    public get TopLeft(): Rect
    {

        let rectf = this.Rect;

        rectf = new Rect(rectf.Left, rectf.Top, this._SelectBorderWidth, this._SelectBorderWidth);

        return rectf;


    }

    public get TopRight(): Rect
    {

        let rectf = this.Rect;

        rectf = new Rect(rectf.Right - this._SelectBorderWidth, rectf.Top, this._SelectBorderWidth, this._SelectBorderWidth);

        return rectf;


    }

    public get BottomLeft(): Rect
    {

        let rectf = this.Rect;

        rectf = new Rect(rectf.Left, rectf.Bottom - this._SelectBorderWidth, this._SelectBorderWidth, this._SelectBorderWidth);

        return rectf;


    }

    public get BottomRight(): Rect
    {

        let rectf = this.Rect;

        rectf = new Rect(rectf.Right - this._SelectBorderWidth, rectf.Bottom - this._SelectBorderWidth, this._SelectBorderWidth, this._SelectBorderWidth);

        return rectf;
    }

    public get MidTop(): Rect
    {
        let rectf = this.Rect;


        rectf = new Rect(
            rectf.Left + rectf.Width / 2 - this._SelectBorderWidth / 2,
            rectf.Top,
            this._SelectBorderWidth,
            this._SelectBorderWidth);

        return rectf;

    }

    public get MidBottom(): Rect
    {

        let rectf = this.Rect;

        rectf = new Rect(rectf.Left + rectf.Width / 2 - this._SelectBorderWidth / 2, rectf.Bottom - this._SelectBorderWidth, this._SelectBorderWidth, this._SelectBorderWidth);

        return rectf;

    }

    public get MidLeft(): Rect
    {
        let rectf = this.Rect;
        rectf = new Rect(rectf.Left, rectf.Top + rectf.Height / 2 - this._SelectBorderWidth / 2, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }

    get MidRight(): Rect
    {
        let rectf = this.Rect;
        rectf = new Rect(rectf.Right - this._SelectBorderWidth, rectf.Top + rectf.Height / 2 - this._SelectBorderWidth / 2, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;

    }

}