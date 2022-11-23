import { ConvertHelper } from "../../Base/ConvertHelper";
import { Cursors } from "../../Base/Cursors";
import { EventView } from "../../Base/EventView";
import { ImageLayout } from "../../Base/ImageLayout";
import { Point, Rect, Size, Zoom } from "../../Base/Point";
import { IViewEvent, IZoom } from "../../Control/IViewEvent";
import { Graphics } from "../../Drawing/Graphics";
import { DataExcel } from "../../main/DataExcel";
import { StateMode } from "../../View/MoveView";
import { SizeChangMode } from "../../View/ReSizeView";
import { Primitive } from "../Primitive";

export class Displayable implements IViewEvent, IZoom
{
    private _Grid: DataExcel;
    public get Grid(): DataExcel
    {
        return this._Grid;
    }
    public set Grid(value: DataExcel)
    {
        this._Grid = value;
    }
    private _Primitive: Primitive;
    public get Primitive(): Primitive
    {
        return this._Primitive;
    }
    public set Primitive(value: Primitive)
    {
        this._Primitive = value;
    }

    public get TypeName(): string
    {
        return "";
    }
    private _Name: string;
    public get Name(): string
    {
        return this._Name;
    }
    public set Name(value: string)
    {
        this._Name = value;
    }

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
    public get Bound(): Rect
    {
        let rect = new Rect(0, 0, 0, 0);
        rect.X = this.Left;
        rect.Y = this.Top;
        rect.Width = this.Width;
        rect.Height = this.Height;
        return rect;
    }
    private _BackColor: any;
    public get BackColor(): any
    {
        //if (this._BackColor == null)
        //{
        //    return this.Grid.BackColor;
        //}
        return this._BackColor;
    }
    public set BackColor(value: any)
    {
        this._BackColor = value;
    }

    private _BackImage: string = "";
    public get BackImage(): string
    {
        return this._BackImage;
    }
    public set BackImage(value: string)
    {
        this._BackImage = value;
    }
    private _BackImageImageLayout: number = ImageLayout.ZoomClip;
    public get BackImageImageLayout(): number
    {
        return this._BackImageImageLayout;
    }
    public set BackImageImageLayout(value: number)
    {
        this._BackImageImageLayout = value;
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


    private _SelectBorderWidth: number = 6;
    private _StateMode_1: StateMode;
    public get StateMode(): StateMode
    {
        return this._StateMode_1;
    }
    public set StateMode(value: StateMode)
    {
        this._StateMode_1 = value;
    }

    private _Selected: boolean;
    public get Selected(): boolean {
        return this._Selected;
    }
    public set Selected(value: boolean) {
        this._Selected = value;
    }


    private _DesignMode: boolean = false;
    public get DesignMode(): boolean
    {
        return this._DesignMode;
    }
    public set DesignMode(value: boolean)
    {
        this._DesignMode = value;
    }

    public get TopLeft(): Rect
    {
        let rectf = new Rect(this.Left - this._SelectBorderWidth - this._SelectBorderWidth,
            this.Top - this._SelectBorderWidth - this._SelectBorderWidth, this._SelectBorderWidth, this._SelectBorderWidth);

        return rectf;


    }

    public get TopRight(): Rect
    {
        let rectf = new Rect(this.Right + this._SelectBorderWidth + this._SelectBorderWidth,
            this.Top - this._SelectBorderWidth - this._SelectBorderWidth,
            this._SelectBorderWidth, this._SelectBorderWidth);

        return rectf;


    }

    public get BottomLeft(): Rect
    {
        let rectf = new Rect(this.Left - this._SelectBorderWidth - this._SelectBorderWidth,
            this.Bottom + this._SelectBorderWidth + this._SelectBorderWidth,
            this._SelectBorderWidth, this._SelectBorderWidth);

        return rectf;


    }

    public get BottomRight(): Rect
    {
        let rectf = new Rect(this.Right + this._SelectBorderWidth + this._SelectBorderWidth,
            this.Bottom + this._SelectBorderWidth + this._SelectBorderWidth,
            this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }

    public get MidTop(): Rect
    {
        let rectf = new Rect(
            this.Left + this.Width / 2 - this._SelectBorderWidth / 2,
            this.Top - this._SelectBorderWidth - this._SelectBorderWidth,
            this._SelectBorderWidth,
            this._SelectBorderWidth);

        return rectf;

    }

    public get MidBottom(): Rect
    {
        let rectf = new Rect(this.Left + this.Width / 2 - this._SelectBorderWidth / 2,
            this.Bottom + this._SelectBorderWidth + this._SelectBorderWidth,
            this._SelectBorderWidth, this._SelectBorderWidth);

        return rectf;

    }

    public get MidLeft(): Rect
    {
        let rectf = new Rect(this.Left - this._SelectBorderWidth - this._SelectBorderWidth,
            this.Top + this.Height / 2 - this._SelectBorderWidth / 2,
            this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }

    get MidRight(): Rect
    {
        let rectf = new Rect(this.Right + this._SelectBorderWidth + this._SelectBorderWidth,
            this.Top + this.Height / 2 - this._SelectBorderWidth / 2,
            this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;

    }

    public GetData()
    {
    }

    public SetData(grid: DataExcel, data:any)
    {
    }
    constructor()
    {
    }
    Refresh()
    {
        this.Grid.RePaint();
    }
    OnDraw(sender:any, g:Graphics): boolean
    {
        return false;
    }
    OnDrawBack(sender:any, g: Graphics): boolean
    {
        return false;
    }

    DoDraw(sender:any, g:Graphics): boolean
    {
        return false;
    }
    DoDrawBack(sender:any, g: Graphics): boolean
    {
        if (this.Grid == null)
            console.log("this.Grid == null");

        if (this.BackColor != null)
        {
            g.FillRect(this.BackColor, this.Left, this.Top, this.Width, this.Height);
        }
        if (!ConvertHelper.StringIsNullOrEmpty(this.BackImage))
        {
            g.FillRectangleImage(this.BackImage, this.Rect, this.BackImageImageLayout, null, 1);
        }
        if (this.Selected)
        {
            g.FillRectangleColor("gray", this.TopLeft, Cursors.nw_resize);
            g.FillRectangleColor("gray", this.BottomRight, Cursors.nw_resize);


            g.FillRectangleColor("gray", this.TopRight, Cursors.ne_resize);
            g.FillRectangleColor("gray", this.BottomLeft, Cursors.ne_resize);


            g.FillRectangleColor("gray", this.MidRight, Cursors.e_resize);
            g.FillRectangleColor("gray", this.MidLeft, Cursors.e_resize);

            g.FillRectangleColor("gray", this.MidTop, Cursors.n_resize);
            g.FillRectangleColor("gray", this.MidBottom, Cursors.n_resize);
        }
        return false;
    }


    OnMouseDown(sender:any, e:MouseEvent, ve: EventView): boolean
    {
        return false;
    }

    OnMouseUp(sender:any, e:MouseEvent, ve: EventView): boolean
    {
        return false;
    }
    OnMouseMove(sender:any, e:MouseEvent, ve: EventView): boolean
    {
        return false;
    }
    OnMouseDoubleClick(sender:any, e:MouseEvent, ve: EventView): boolean
    {
        return false;
    }
    OnKeyPress(sender:any, e:KeyboardEvent, ve:EventView): boolean
    {
        return false;
    }
    OnKeyDown(sender:any, e:KeyboardEvent, ve:EventView): boolean
    {
        return false;
    }
    OnTouchStart(sender:any, e: TouchEvent, ve: EventView): boolean
    {
        return false;
    }
    OnTouchMove(sender:any, e: TouchEvent, ve: EventView): boolean
    {
        return false;
    }
    OnTouchEnd(sender:any, e: TouchEvent, ve: EventView): boolean
    {
        return false;
    }

    Clone()
    {

    }
    DoMouseDown(sender:any, e:MouseEvent, ve: EventView): boolean
    {

        if (this.MouseDownSizeChanged(ve))
        {
            this.StateMode = StateMode.SIZE;
            return true;
        }

        if (this.MouseDownMove(ve))
        {
            return true;
        }
        return false;
    }
    DoMouseUp(sender:any, e:MouseEvent, ve:EventView): boolean
    {

        this.StateMode = StateMode.NULL;
        return false;
    }
    DoMouseMove(sender:any, e:MouseEvent, ve: EventView): boolean
    {
        if (this.StateMode == StateMode.SIZE)
        {
            this.ChangedSize(ve);
            this.Grid.RePaint();
        }

        if (this.StateMode == StateMode.MOVE)
        {
            let x = ve.offsetPoint.X - this.MouseDownPoint.X;
            let y = ve.offsetPoint.Y - this.MouseDownPoint.Y;
            let ptorg = new Point(this.Left, this.Top);
            this.Left = this.MouseDownSize.Width + x;
            this.Top = this.MouseDownSize.Height + y;
            let pttar = new Point(this.Left, this.Top);
            this.LocationChanged(ptorg, pttar);
            this.Grid.RePaint();
            return true;
        }
        return false;
    }
    MouseDownSizeChanged(ve: EventView)
    {
        let pt = new Point(ve.offsetPoint.X, ve.offsetPoint.Y);
        this.MouseDownPoint = pt;
        this.MouseDownSize = new Size(this.Width, this.Height);

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
    MouseDownMove(ve: EventView): boolean
    {
        let pt = new Point(ve.offsetPoint.X, ve.offsetPoint.Y);
        if (this.Bound.Contains(pt))
        {
            this.MouseDownPoint = pt;
            this.MouseDownSize = new Size(this.Left, this.Top);
            this.StateMode = StateMode.MOVE;
            this.Grid.ClearSelect();
            this.Selected = true;
            this.Grid.RePaint();
            return true;
        }
        return false;
    }
    ChangedSize(ve: EventView)
    {
        let location = new Point(ve.offsetPoint.X, ve.offsetPoint.Y);
        let sf = new Size(location.X - this.MouseDownPoint.X, location.Y - this.MouseDownPoint.Y);
        let ptorg = new Point(this.Left, this.Top);
        let szieorg = new Size(this.Width, this.Height);
        switch (this.SizeChangMode)
        {
            case SizeChangMode.Null:
                break;
            case SizeChangMode.TopLeft:
                let w1 = this.MouseDownSize.Width - sf.Width;
                let h1 = this.MouseDownSize.Height - sf.Height;
                if (w1 > 10 && h1 > 10)
                {
                    this.Width = this.MouseDownSize.Width - sf.Width;
                    this.Height = this.MouseDownSize.Height - sf.Height;
                    this.Top = location.Y;// this.MouseDownPoint.Y + sf.Height;
                    this.Left = location.X;// this.MouseDownPoint.X + sf.Width;
                }
                break;
            case SizeChangMode.TopRight:
                let w2 = this.MouseDownSize.Width + sf.Width;
                let h2 = this.MouseDownSize.Height - sf.Height;
                if (w2 > 10 && h2 > 10)
                {
                    this.Width = this.MouseDownSize.Width + sf.Width;
                    this.Height = this.MouseDownSize.Height - sf.Height;
                    this.Top = location.Y;// this.MouseDownPoint.Y + sf.Height;
                }
                break;
            case SizeChangMode.MidLeft:
                let w3 = this.MouseDownSize.Width - sf.Width;
                if (w3 > 10)
                {
                    this.Width = this.MouseDownSize.Width - sf.Width;
                    this.Left = this.MouseDownPoint.X + sf.Width;
                }
                break;
            case SizeChangMode.MidRight:
                let w4 = this.MouseDownSize.Width + sf.Width;
                if (w4 > 10)
                {
                    this.Width = this.MouseDownSize.Width + sf.Width;
                }
                break;
            case SizeChangMode.BoomLeft:
                let w5 = this.MouseDownSize.Width - sf.Width;
                let h5 = this.MouseDownSize.Height + sf.Height;
                if (w5 > 10 && h5 > 10)
                {
                    this.Width = this.MouseDownSize.Width - sf.Width;
                    this.Height = this.MouseDownSize.Height + sf.Height;
                    this.Left = this.MouseDownPoint.X + sf.Width;
                }
                break;
            case SizeChangMode.BoomRight:
                let w6 = this.MouseDownSize.Width + sf.Width;
                let h6 = this.MouseDownSize.Height + sf.Height;
                if (w6 > 10 && h6 > 10)
                {
                    this.Width = this.MouseDownSize.Width + sf.Width;
                    this.Height = this.MouseDownSize.Height + sf.Height;
                }
                break;
            case SizeChangMode.MidTop:
                let h7 = this.MouseDownSize.Height - sf.Height;
                if (h7 > 10)
                {
                    this.Height = this.MouseDownSize.Height - sf.Height;
                    this.Top = this.MouseDownPoint.Y + sf.Height;
                }
                break;
            case SizeChangMode.MidBoom:
                let h8 = this.MouseDownSize.Height + sf.Height;
                if (h8 > 10)
                {
                    this.Height = this.MouseDownSize.Height + sf.Height;
                }
                break;
            default:
                break;
        }
        let pttar = new Point(this.Left, this.Top);
        this.LocationChanged(ptorg, pttar);
        let szietar = new Size(this.Width, this.Height);
        this.SizeChanged(szieorg, szietar);
    }
    //OnTimerInterval(): boolean
    //{
    //    this.Primitive.CloseTime();
    //    return false;
    //}
    LocationChanged(ptorg: Point, pttar: Point)
    {

    }
    SizeChanged(sizeorg: Size, sizetar: Size)
    {

    }
    LocationOffset(x:any,y:any)
    {
        //let ptorg = new Point(this.Left, this.Top);
        //this.Left = this.Left + x;
        //this.Top = this.Top + y;
        //let pttar = new Point(this.Left, this.Top);
        //this.LocationChanged(ptorg, pttar);
    }
    SizeOffset(x:any, y:any)
    {

    }
    SetZoom(zoom: Zoom): boolean
    { 
        return false;
    }
    GetZoom(): Zoom
    {
        return null;
    }


}
