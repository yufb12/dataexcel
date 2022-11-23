import { DataExcel } from "../main/DataExcel";
import { DataExcelConsole } from "../Base/DataExcelConsole";
import { EventView } from "../Base/EventView";
import { Rect, Size, Point } from "../Base/Point";
import { Graphics } from "../Drawing/Graphics";
import { HScrollerSkin } from "../Plus/HScrollerSkin";
import { VScrollerSkin } from "../Plus/VScrollerSkin";
import { Events } from "./Events";
import { IViewEvent } from "./IViewEvent";

export class ScrollerView  
{ 
    private _min = 1;
    private _max = 100;
    private _thickness = 10;

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


    public get Thickness(): number
    {
        return this._thickness;
    }
    public set Thickness(value: number)
    {
        this._thickness = value;
    }
    private _scrolltop = 0;

    public get ScrollTop(): number
    {
        return this._scrolltop;
    }
    public set ScrollTop(value: number)
    {
        this._scrolltop = value;
    }

    private _Header: number;
    public get Header(): number {
        return this._Header;
    }
    public set Header(value: number) {
        this._Header = value;
    }

    public get Max()
    {
        return this._max;
    }
    public set Max(value)
    {
        this._max = value;
        if (this._max < 1)
        {
            this._max = 0;
        }
        this.RefreshScrollThumd();

    }

    public get Min()
    {
        return this._min;
    }
    public set Min(value)
    {
        this._min = value;
    }

    private _value = 1;

    public get Value()
    {
        return this._value;
    }
    public set Value(value)
    {
        if (value == this.Value)
        {
            return;
        }
 
        if (value < this.Min)
        {
            value = this.Min;
        }

        this._value = value;
        this.OnValueChanged(this._value);
        this.RefreshScrollThumd(); 
    }

    private _smallchange = 1;

    public get SmallChange()
    {
        return this._smallchange;
    }
    public set SmallChange(value)
    {
        this._smallchange = value;
    }

    private _largechange = 3;
    public get LargeChange()
    {
        return this._largechange;
    }
    public set LargeChange(value)
    {
        this._largechange = value;
        this.RefreshScrollThumd(); 
    }

    public get Rect()
    {
        let left = this.Left;
        let top = this.Top;
        let width = this.Width;
        let height = this.Height;
        return new Rect(left, top, width, height);

    }

    private _visible = true;
    public get Visible()
    {
        return this._visible;
    }
    public set Visible(value)
    {
        this._visible = value;
    }
    private _MoveSelected = false;
    public get MoveSelected()
    {
        return this._MoveSelected;
    }
    public set MoveSelected(value)
    {
        this._MoveSelected = value;
    }
    public get Count()
    {
        return this.Max - this.Min;

    }
    public ProvPage()
    {
        let value = this._value - this.LargeChange;
        this.Value = value < this._min ? this._min : value;
    }
    public Prov()
    {
        let value = this._value - this._smallchange;
        this.Value = value < this._min ? this._min : value;
    }
    public NextPage()
    {
        let value = this._value + this.LargeChange;
        this.Value = value > this._max ? this._max : value;
    }
    public Next()
    {
        let value = this._value + this._smallchange;
        this.Value = value > this._max ? this._max : value;
    }
    public Home()
    {
        this.Value = this._min;
    }
    public End()
    {
        this.Value = this._max;
    }
    public Clear()
    {
        this._min = 0;
        this._max = 0;
        this._smallchange = 1;
        this._value = 0;
        this._thickness = 10;
        this._scrolltop = 0;
    }
    public OnDraw(g:Graphics)
    {
        return false;
    }
    public RefreshScrollThumd()
    {
        let count = this.Count;
        if (count < 1)
        {
            count = 1;
        }
        let height = this.BodyArea.Height;
        let large = this.LargeChange;
        let thickness = 1 * height * (1 / (count + 1) * 1);
        if (thickness < 36) 
        {
            thickness = 36;
        }
        this.Thickness = thickness;
        let smallwidth = 1 * (height - thickness) / count;


        let top = ((this.Value - this.Min) * smallwidth);
        if ((top + thickness) > height)
        {
            top = height - thickness;
        }
        this.ScrollTop = top;
    }


    private downpoint: any;
    private downsize: any;

    public DoOnMouseMove(pt:any)
    {

        if (this.MoveSelected)
        {
            let pd = this.GetMovePoint(pt, this.downsize);
            this.PointToIndex(pd);
            this.RefreshScrollThumd();
            return true;
        }
        return false;
    }
    public DoOnMouseClick(pt:any)
    {
        if (this.MoveSelected)
            return false;
        if (this.UpArrowArea.Contains(pt))
        {
            this.Prov();
            //if (this.UpArrowAreaClick != null)
            //{
            //    this.UpArrowAreaClick(this, pt);
            //}
            return true;
        }
        if (this.DownArrowArea.Contains(pt))
        {
            this.Next();
            //if (this.DownArrowAreaClick != null)
            //{
            //    this.DownArrowAreaClick(this, pt);
            //}
            return true;
        }

        return false;
    }
    public DoOnMouseDown(pt:any)
    {

        if (this.Rect.Contains(pt))
        {
            if (this.ThumdArea.Contains(pt))
            {
                this.downpoint = pt;
                let pth = this.ThumdArea.Location;
                this.downsize = new Size(pt.X - pth.X, pt.Y - pth.Y);
                this.MoveSelected = true;
                //if (this.ThumdAreaClick != null)
                //{
                //    this.ThumdAreaClick(this, pt);
                //}
                return true;
            }
            if (this.BodyArea.Contains(pt))
            {
                this.PointToIndex(pt);
            }
            if (this.DownArrowArea.Contains(pt))
            {
                this.Next();
            }
            if (this.UpArrowArea.Contains(pt))
            {
                this.Prov();
            }
            return true;

        }
        return false;
    }
    public DoOnMouseUp()
    {
        this.MoveSelected = false;
        return false;
    }
 
    public OnValueChanged(value:any)
    {
        //if (ValueChanged != null)
        //{
        //    ValueChanged(this, value);
        //}
    }


    public PointToIndex(pt:any)
    {
        let count = this.Count;
        let height = this.BodyArea.Height;
        let large = this.LargeChange;
        let thickness = (1 * height * large / count);
        let smallwidth = 1 * (height - thickness) / count;
        let pheight = pt.Y - this.Top - this.Header;
        let topcount = pheight / smallwidth;
        let i = topcount;
        this.Value = this.Min + i;
    }
    public GetMovePoint(pt:any, sf:any)
    {
        let pd = new Point(pt.X, pt.Y - sf.Height);
        return pd;
    }

    public get BodyArea()
    {
        return new Rect(this.Left, this.Top + this.Header, this.Width, this.Height - this.Header - this.Header);
    }
    public get UpArrowArea()
    {
        let rects = this.Rect;
        return new Rect(rects.X, rects.Y, rects.Width, this.Header);

    }
    public get DownArrowArea()
    {
        let rects = this.Rect;
        return new Rect(rects.X, rects.Bottom - this.Header, rects.Width, this.Header);

    }
    public get ThumdArea()
    {
        let rects = this.Rect;
        return new Rect(rects.X, rects.Y + this.Header + this.ScrollTop, this.Rect.Width - 2, this.Thickness);

    }

}

export class VScrollerView extends ScrollerView
{
    constructor()
    {
        super();
    }
    public get Width()
    {
        if (this._width < 18)
        { return 18; }
        return this._width;
    }
    set Width(value)
    {
        this._width = value;
    }

    private DrawArrow(g:Graphics)
    {
        this.DrawUpArrow(g);
        this.DrawDownArrow(g);
    }
    private DrawArea(g:Graphics)
    {
        let rect = this.Rect;
        VScrollerSkin.DrawArea(g, rect);
    }
    private DrawBorder(g:Graphics)
    {
        return;

    }
    private DrawThumdBack(g:Graphics)
    {
        if (this.Thickness <= 0)
            return;
        VScrollerSkin.DrawThumdBack(g, this.ThumdArea, this.MoveSelected);

    }
    private DrawThumd(g:Graphics)
    {
        VScrollerSkin.DrawThumd(g, this.ThumdArea, this.Thickness);
    }
    private DrawUpArrow(g:Graphics)
    {
        let rects = this.Rect;
        let rectt = new Rect(rects.X, rects.Y, rects.Width, this.Header);

        VScrollerSkin.DrawUpArrow(g, rectt);
    }
    private DrawDownArrow(g:Graphics)
    {
        let rects = this.Rect;
        let rectt = new Rect(rects.X, rects.Height - this.Header, rects.Width, this.Header);
        VScrollerSkin.DrawDownArrow(g, rectt);
    }
    public OnDraw(g:Graphics)
    {
        if (this.Visible)
        {
            this.DrawArea(g);
            this.DrawThumdBack(g);
            this.DrawArrow(g);
            this.DrawThumd(g);
            this.DrawBorder(g);
        }
        return false;
    }



}


export class DataExcelViewVScroll extends VScrollerView  implements IViewEvent
{
    public constructor(grid: DataExcel)
    {
        super();
        this._Grid = grid;
        grid.On(Events.FirstDisplayRowChanged, this.Grid_FirstDisplayRowChanged);
    }

    Grid_FirstDisplayRowChanged(args:any)
    {
        try
        {
            let sender = args[0];
            let target = args[1];
            let index  = args[2];
            if (index > target.Max)
            {
                target.Max = index;
            }
            target.Value = index;
            target.RefreshScrollThumd();
        }
        catch (ex)
        {
            DataExcelConsole.log("Grid_FirstDisplayRowChanged", ex);
        }
    }
    private _Grid: DataExcel;
    public get Grid(): DataExcel
    {
        return this._Grid;
    }
     
    public get Header(): number
    {
        return this.Grid.ContentTop;
    }
 
    public get Height(): number
    {
        return this.Grid.Height - this.Width - this.Top;
    }

    public get Left(): number
    {
        return this.Grid.Width - this.Width;
    }

    public get Rect()
    {
        return new Rect(this.Left, this.Top, this.Width, this.Height);
    }

    public get Top(): number
    {
        return 0;
    }
    public lck: boolean = false;
    //public OnValueChanged(value: number)
    //{
    //    if (!this.Visible)
    //        return;
    //    try
    //    {
    //        if (this.lck)
    //            return;
    //        this.lck = true;
    //        let position = value;
    //        this.Grid.FirstDisplayedRowIndex = (position);
    //    }
    //    catch (ex)
    //    {
    //        DataExcelConsole.log("OnValueChanged", ex);

    //    }
    //    finally
    //    {
    //        this.lck = false;
    //    }
    //}
     

    public OnMouseDown(sender:any, e:MouseEvent, ve:EventView)
    {
        if (!this.Visible)
            return false;

        let pt = new Point(e.offsetX, e.offsetY);
        //let pt = point;// this.Grid.PointControlToView(e.Location);
        if (this.Rect.Contains(pt))
        {
            return this.DoOnMouseDown(pt);
        }
        return false;
    }

    public OnMouseUp(sender:any, e:MouseEvent, ve:EventView)
    {
        if (!this.Visible)
            return false;
        this.MoveSelected = false;
        return this.DoOnMouseUp();
    }

    public OnMouseMove(sender:any, e:MouseEvent, ve:EventView)
    {
        if (!this.Visible)
            return false;
        //let pt = this.Grid.PointControlToView(e.Location);

        let pt = new Point(e.offsetX, e.offsetY);
        //if (this.Rect.Contains(pt) && this.MoveSelected)
        if (this.MoveSelected)
        { 
            let res = this.DoOnMouseMove(pt);
            if (res)
            {
                this.Grid.FirstDisplayedRowIndex = Math.round(this.Value);
                this.Grid.Refresh();
                this.Grid.RePaint();
            }
            return res;
        }
        return false;
    }

    public OnMouseClick(sender:any, e:MouseEvent, ve:EventView)
    {
        if (!this.Visible)
            return false;
        let pt = this.Grid.PointControlToView(ve.offsetPoint);
        if (this.Rect.Contains(pt))
        {
            return this.DoOnMouseClick(pt);
        }
        return false;
    }
    OnTouchStart(sender:any, e: TouchEvent, ve:EventView): boolean
    {
        return false;
    }
    OnTouchMove(sender:any, e: TouchEvent, ve:EventView): boolean
    {
        return false;
    }
    OnTouchEnd(sender:any, e: TouchEvent, ve:EventView): boolean
    {
        return false;
    }

    //OnMouseDown(sender, e, ve): boolean
    //OnMouseUp(sender, e, ve): boolean
    //OnMouseMove(sender, e, ve): boolean
    OnMouseDoubleClick(sender:any, e:MouseEvent, ve:EventView): boolean
    {
        if (!this.Visible)
            return false; 

        let pt = new Point(e.offsetX, e.offsetY);
        if (this.Rect.Contains(pt))
        {
            return true;
        }
        return false;
    }
    OnKeyPress(sender:any, e: KeyboardEvent, ve:EventView): boolean
    {
        return false;
    }
    OnKeyDown(sender:any, e: KeyboardEvent, ve:EventView): boolean
    {
        return false;
    }
    public Next()
    {
        let value = this.Value + this.SmallChange;
        this.Value = value;// value > this.Max ? this.Max : value;
    }
}

export class HScrollerView extends ScrollerView
{
    constructor()
    {
        super();
    }
    public get Height()
    {
        if (this._height < 18)
        { return 18; }
        return this._height;
    }
    set Height(value)
    {
        this._height = value;
    }

    private DrawArrow(g:Graphics)
    {
        this.DrawUpArrow(g);
        this.DrawDownArrow(g);
    }
    private DrawArea(g:Graphics)
    {
        let rect = this.Rect;
        HScrollerSkin.DrawArea(g, rect);
    }
    private DrawBorder(g:Graphics)
    {
        return;

    }
    private DrawThumdBack(g:Graphics)
    {
        if (this.Thickness <= 0)
            return;
        HScrollerSkin.DrawThumdBack(g, this.ThumdArea, this.MoveSelected);

    }
    private DrawThumd(g:Graphics)
    {
        HScrollerSkin.DrawThumd(g, this.ThumdArea, this.Thickness);
    }
    private DrawUpArrow(g:Graphics)
    {
        let rect = this.UpArrowArea; 

        HScrollerSkin.DrawUpArrow(g, rect);
    }
    private DrawDownArrow(g:Graphics)
    {
        let rect = this.DownArrowArea; 
        HScrollerSkin.DrawDownArrow(g, rect);
    }
    public OnDraw(g:Graphics)
    {
        if (this.Visible)
        {
            this.DrawArea(g);
            this.DrawThumdBack(g);
            this.DrawArrow(g);
            this.DrawThumd(g);
            this.DrawBorder(g);
        }
        return false;
    }


    public RefreshScrollThumd()
    {
        let count = this.Count;
        if (count < 1)
        {
            count = 1;
        }
        let width = this.BodyArea.Width;
        let large = this.LargeChange;
        let thickness = 1 * width * (1 / (count + 1) * 1);
        if (thickness < 36) 
        {
            thickness = 36;
        }
        this.Thickness = thickness;
        let smallwidth = 1 * (width - thickness) / count;


        let top = ((this.Value - this.Min) * smallwidth);
        if ((top + thickness) > width)
        {
            top = width - thickness;
        }
        this.ScrollTop = top;
    }
    public PointToIndex(pt: Point)
    {
        let count = this.Count;
        let width = this.BodyArea.Width;
        let large = this.LargeChange;
        let thickness = (1 * width * large / count);
        let smallwidth = 1 * (width - thickness) / count;
        let pheight = pt.X - this.Left - this.Header;
        let topcount = pheight / smallwidth;
        let i = topcount;
        this.Value = this.Min + i;
    }
    public GetMovePoint(pt:any, sf: Size)
    {
        let pd = new Point(pt.X - sf.Width, pt.Y );
        return pd;
    }

    public get BodyArea()
    {
        return new Rect(this.Left + this.Header, this.Top, this.Width - this.Header - this.Header, this.Height);
    }
    public get UpArrowArea()
    {
        let rects = this.Rect;
        return new Rect(rects.X, rects.Y, this.Header, rects.Height);

    }
    public get DownArrowArea()
    {
        let rects = this.Rect;
        return new Rect(rects.Right - this.Header, rects.Y , this.Header, rects.Height);

    }
    public get ThumdArea()
    {
        let rects = this.Rect;
        return new Rect(rects.X + this.Header + this.ScrollTop, rects.Y, this.Thickness, this.Rect.Height - 2);

    }
}

export class DataExcelViewHScroll extends HScrollerView implements IViewEvent
{
    public constructor(grid: DataExcel)
    {
        super();
        this._Grid = grid;
        grid.On(Events.FirstDisplayColumnChanged, this.Grid_FirstDisplayRowChanged);
    }

    Grid_FirstDisplayRowChanged(args:any)
    {
        try
        {
            let sender = args[0];
            let target = args[1];
            let index = args[2];
            if (index > target.Max)
            {
                target.Max = index;
            }
            target.Value = index;
            target.RefreshScrollThumd();

        }
        catch (ex)
        {
            DataExcelConsole.log("Grid_FirstDisplayRowChanged", ex);
        }
    }
    private _Grid: DataExcel;
    public get Grid(): DataExcel
    {
        return this._Grid;
    }

    public get Header(): number
    {
        return this.Grid.ContentLeft;
    }

    public get Width(): number
    {
        return this.Grid.Width - this.Height - this.Left;
    }

    public get Left(): number
    {
        return 0;
    }

    public get Rect()
    {
        return new Rect(this.Left, this.Top, this.Width, this.Height);
    }

    public get Top(): number
    {
        return this.Grid.Height - this.Height;
    }
    public lck: boolean = false;
    public OnValueChanged(value: number)
    {
        //if (!this.Visible)
        //    return;
        //try
        //{
        //    if (this.lck)
        //        return;
        //    this.lck = true;
        //    let position = value;
        //    this.Grid.FirstDisplayedRowIndex = (position);
        //}
        //catch (ex)
        //{
        //    DataExcelConsole.log("OnValueChanged", ex);

        //}
        //finally
        //{
        //    this.lck = false;
        //}
    }
     

    public OnMouseDown(sender:any, e:MouseEvent, ve:EventView)
    {
        if (!this.Visible)
            return false;

        let pt = new Point(e.offsetX, e.offsetY);
        //let pt = point;// this.Grid.PointControlToView(e.Location);
        if (this.Rect.Contains(pt))
        {
            return this.DoOnMouseDown(pt);
        }
        return false;
    }

    public OnMouseUp(sender:any, e:MouseEvent, ve:EventView)
    {
        if (!this.Visible)
            return false;
        this.MoveSelected = false;
        return this.DoOnMouseUp();
    }

    public OnMouseMove(sender:any, e:MouseEvent, ve:EventView)
    {
        if (!this.Visible)
            return false;
        //let pt = this.Grid.PointControlToView(e.Location);

        let pt = new Point(e.offsetX, e.offsetY);
        //if (this.Rect.Contains(pt) && this.MoveSelected)
        if (this.MoveSelected)
        {
            let res = this.DoOnMouseMove(pt);
            if (res)
            {
                this.Grid.FirstDisplayedColumnIndex = Math.round(this.Value);
                this.Grid.Refresh();
                this.Grid.RePaint();
            }
            return res;
        }
        return false;
    }

    public OnMouseClick(sender:any, e:MouseEvent, ve:EventView)
    {
        if (!this.Visible)
            return false;
        let pt = this.Grid.PointControlToView(ve.offsetPoint);
        if (this.Rect.Contains(pt))
        {
            return this.DoOnMouseClick(pt);
        }
        return false;
    }
    OnTouchStart(sender:any, e: TouchEvent, ve:EventView): boolean
    {
        return false;
    }
    OnTouchMove(sender:any, e: TouchEvent, ve:EventView): boolean
    {
        return false;
    }
    OnTouchEnd(sender:any, e: TouchEvent, ve:EventView): boolean
    {
        return false;
    }

    //OnMouseDown(sender, e, ve): boolean
    //OnMouseUp(sender, e, ve): boolean
    //OnMouseMove(sender, e, ve): boolean
    OnMouseDoubleClick(sender:any, e:MouseEvent, ve:EventView): boolean
    {
        if (!this.Visible)
            return false;

        let pt = new Point(e.offsetX, e.offsetY);
        if (this.Rect.Contains(pt))
        {
            return true;
        }
        return false;
    }
    OnKeyPress(sender:any, e: KeyboardEvent, ve:EventView): boolean
    {
        return false;
    }
    OnKeyDown(sender:any, e: KeyboardEvent, ve:EventView): boolean
    {
        return false;
    }
    public Next()
    {
        let value = this.Value + this.SmallChange;
        this.Value = value;// value > this.Max ? this.Max : value;
    }
}