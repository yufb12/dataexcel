import { Palette } from "../Base/CellHeaderStyle";
import { ConvertHelper } from "../Base/ConvertHelper";
import { Cursors } from "../Base/Cursors";
import { DataExcelConsole } from "../Base/DataExcelConsole";
import { EventView } from "../Base/EventView";
import { ImageLayout } from "../Base/ImageLayout";
import { Point, Rect, Size, Zoom } from "../Base/Point";
import { IViewEvent, IZoom } from "../Control/IViewEvent";
import { Graphics } from "../Drawing/Graphics";
import { DataExcel } from "../main/DataExcel";
import { StateMode } from "../View/MoveView";
import { SizeChangMode } from "../View/ReSizeView";
import { Displayable } from "./Displayable/Displayable";
import { DisplayableBuild } from "./Displayable/DisplayableBuild";
import { DisplayableCircle } from "./Displayable/DisplayableCircle";
import { DisplayableImage } from "./Displayable/DisplayableImage";
import { DisplayableLine } from "./Displayable/DisplayableLine";
import { DisplayableList } from "./Displayable/DisplayableList";
import { DisplayablePolygon } from "./Displayable/DisplayablePolygon";
import { DisplayableRect } from "./Displayable/DisplayableRect";
import { DisplayableSector } from "./Displayable/DisplayableSector";
import { DisplayableText } from "./Displayable/DisplayableText";

export class Primitive implements IViewEvent, IZoom {
    public Grid: DataExcel;
    private _Name: string;
    public get Name(): string {
        return this._Name;
    }
    public set Name(value: string) {
        this._Name = value;
    }

    protected _height = 0;
    public get Height() {

        return this._height;
    }
    public set Height(value) {
        this._height = value;
    }
    public get Right() {
        return this._left + this.Width;
    }

    public get Bottom() {
        return this.Top + this.Height;
    }

    protected _left = 0;
    public get Left() {

        return this._left;
    }
    public set Left(value) {
        this._left = value;
    }

    protected _top = 0;
    public get Top() {
        return this._top;
    }
    public set Top(value) {
        this._top = value;
    }
    protected _width = 0;

    public get Width() {

        return this._width;
    }
    public set Width(value) {
        this._width = value;
    }
    public get Rect(): Rect {
        let rect = new Rect(0, 0, 0, 0);
        rect.X = this.Left;
        rect.Y = this.Top;
        rect.Width = this.Width;
        rect.Height = this.Height;
        return rect;
    }
    public get Bound(): Rect {
        let rect = new Rect(0, 0, 0, 0);
        rect.X = this.Left;
        rect.Y = this.Top;
        rect.Width = this.Width;
        rect.Height = this.Height;
        return rect;
    }
    private _BackColor: any;
    public get BackColor(): any {
        //if (this._BackColor == null)
        //{
        //    return this.Grid.BackColor;
        //}
        return this._BackColor;
    }
    public set BackColor(value: any) {
        this._BackColor = value;
    }

    private _BackImage: string = "";
    public get BackImage(): string {
        return this._BackImage;
    }
    public set BackImage(value: string) {
        this._BackImage = value;
    }
    private _BackImageImageLayout: number = ImageLayout.ZoomClip;
    public get BackImageImageLayout(): number {
        return this._BackImageImageLayout;
    }
    public set BackImageImageLayout(value: number) {
        this._BackImageImageLayout = value;
    }
    private _MouseDownPoint: Point;
    public get MouseDownPoint(): Point {
        return this._MouseDownPoint;
    }
    public set MouseDownPoint(value: Point) {
        this._MouseDownPoint = value;
    }

    private _MouseDownSize: Size;
    public get MouseDownSize(): Size {
        return this._MouseDownSize;
    }
    public set MouseDownSize(value: Size) {
        this._MouseDownSize = value;
    }


    private _SizeChangMode: SizeChangMode;
    public get SizeChangMode(): SizeChangMode {
        return this._SizeChangMode;
    }
    public set SizeChangMode(value: SizeChangMode) {
        this._SizeChangMode = value;
    }


    private _SelectBorderWidth: number = 6;
    private _StateMode_1: StateMode;
    public get StateMode(): StateMode {
        return this._StateMode_1;
    }
    public set StateMode(value: StateMode) {
        this._StateMode_1 = value;
    }

    public Selected: boolean;
    public get TopLeft(): Rect {
        let rectf = new Rect(this.Left - this._SelectBorderWidth - this._SelectBorderWidth,
            this.Top - this._SelectBorderWidth - this._SelectBorderWidth, this._SelectBorderWidth, this._SelectBorderWidth);

        return rectf;


    }

    public get TopRight(): Rect {
        let rectf = new Rect(this.Right + this._SelectBorderWidth + this._SelectBorderWidth,
            this.Top - this._SelectBorderWidth - this._SelectBorderWidth,
            this._SelectBorderWidth, this._SelectBorderWidth);

        return rectf;


    }

    public get BottomLeft(): Rect {
        let rectf = new Rect(this.Left - this._SelectBorderWidth - this._SelectBorderWidth,
            this.Bottom + this._SelectBorderWidth + this._SelectBorderWidth,
            this._SelectBorderWidth, this._SelectBorderWidth);

        return rectf;


    }

    public get BottomRight(): Rect {
        let rectf = new Rect(this.Right + this._SelectBorderWidth + this._SelectBorderWidth,
            this.Bottom + this._SelectBorderWidth + this._SelectBorderWidth,
            this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }

    public get MidTop(): Rect {
        let rectf = new Rect(
            this.Left + this.Width / 2 - this._SelectBorderWidth / 2,
            this.Top - this._SelectBorderWidth - this._SelectBorderWidth,
            this._SelectBorderWidth,
            this._SelectBorderWidth);

        return rectf;

    }

    public get MidBottom(): Rect {
        let rectf = new Rect(this.Left + this.Width / 2 - this._SelectBorderWidth / 2,
            this.Bottom + this._SelectBorderWidth + this._SelectBorderWidth,
            this._SelectBorderWidth, this._SelectBorderWidth);

        return rectf;

    }

    public get MidLeft(): Rect {
        let rectf = new Rect(this.Left - this._SelectBorderWidth - this._SelectBorderWidth,
            this.Top + this.Height / 2 - this._SelectBorderWidth / 2,
            this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }

    get MidRight(): Rect {
        let rectf = new Rect(this.Right + this._SelectBorderWidth + this._SelectBorderWidth,
            this.Top + this.Height / 2 - this._SelectBorderWidth / 2,
            this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;

    }

    public Displayables: DisplayableList;

    public GetData() {
        let data = {
            name: this.Name,
            height: this.Height,
            left: this.Left,
            top: this.Top,
            width: this.Width,
            backcolor: this.BackColor,
            backimage: this.BackImage,
            backimageimagelayout: this.BackImageImageLayout,
            displayables: [] as any[],

        };
        this.Displayables.forEach((chart: Displayable) => {
            data.displayables.push(chart.GetData());
        });
        return data;
    }

    public SetData(grid: DataExcel, data: any) {
        this.Name = data.name;
        this.Height = data.height;
        this.Left = data.left;
        this.Top = data.top;
        this.Width = data.width;
        this.BackColor = data.backcolor;
        this.BackImage = data.backimage;
        this.BackImageImageLayout = data.backimageimagelayout;
        let len = data.displayables.length;
        for (let i = 0; i < len; i++) {
            let itemdata = data.displayables[i];
            let item = DisplayableBuild.build(itemdata.typename);
            if (item != null) {
                item.Grid = grid;
                item.Primitive = this;
                item.SetData(grid, itemdata);
                this.Displayables.Add(item);
            }
        }
    }
    constructor() {
        this.Displayables = new DisplayableList();
    }
    Mixin(obj: any) {

    }

    OnDraw(sender: any, g: Graphics): boolean {
        return false;
    }
    OnDrawBack(sender: any, g: Graphics): boolean {
        if (this.Grid == null)
            console.log("this.Grid == null");

        if (this.BackColor != null) {
            g.FillRect(this.BackColor, this.Left, this.Top, this.Width, this.Height);
        }
        if (this.Selected) {
            g.FillRect(Palette.A3399FF80, this.Left, this.Top, this.Width, this.Height);
        }
        if (!ConvertHelper.StringIsNullOrEmpty(this.BackImage)) {
            g.FillRectangleImage(this.BackImage, this.Rect, this.BackImageImageLayout, null, 1);
        }
        if (this.Selected) {
            g.FillRectangleColor("gray", this.TopLeft, Cursors.nw_resize);
            g.FillRectangleColor("gray", this.BottomRight, Cursors.nw_resize);


            g.FillRectangleColor("gray", this.TopRight, Cursors.ne_resize);
            g.FillRectangleColor("gray", this.BottomLeft, Cursors.ne_resize);


            g.FillRectangleColor("gray", this.MidRight, Cursors.e_resize);
            g.FillRectangleColor("gray", this.MidLeft, Cursors.e_resize);

            g.FillRectangleColor("gray", this.MidTop, Cursors.n_resize);
            g.FillRectangleColor("gray", this.MidBottom, Cursors.n_resize);
        }
        try {
            for (var i = 0; i < this.Displayables.Count; i++) {
                let display = this.Displayables.Get(i);
                display.OnDrawBack(sender, g);

            }
        } catch (e) {
            DataExcelConsole.log("OnDrawBack", e);
        }
        return false;
    }

    OnMouseDown(sender: any, e: MouseEvent, ve: EventView): boolean {
        if (this.CurrentDiaplay != null) {
            ve.offsetPoint.X = ve.offsetPoint.X - this.Left;
            ve.offsetPoint.Y = ve.offsetPoint.Y - this.Top;
            let res = this.CurrentDiaplay.OnMouseDown(sender, e, ve);
            if (res) {
                return res;
            }
        }
        for (var i = 0; i < this.Displayables.Count; i++) {
            let disp = this.Displayables.Get(i);
            if (disp == null) {
                DataExcelConsole.log("Primitive OnMouseDown error", e);
                continue;
            }
            let res = disp.OnMouseDown(sender, e, ve);
            if (res) {
                return res;
            }
        }
        if (this.SizeChangedMouseDown(ve)) {
            this.StateMode = StateMode.SIZE;
            ve.NeedRePaint = true;
            ve.CurrentEvent = this;
            return true;
        }
        if (this.Bound.Contains(ve.offsetPoint)) {
            this.MouseDownPoint = ve.offsetPoint;
            this.MouseDownSize = new Size(this.Left, this.Top);
            this.StateMode = StateMode.MOVE;
            this.Grid.ClearSelect();
            this.Selected = true;

            ve.NeedRePaint = true;
            ve.CurrentEvent = this;
            return true;
        }
        return false;
    }
    OnMouseUp(sender: any, e: MouseEvent, ve: EventView): boolean {
        if (this.CurrentDiaplay != null) {
            ve.offsetPoint.X = ve.offsetPoint.X - this.Left;
            ve.offsetPoint.Y = ve.offsetPoint.Y - this.Top;
            let res = this.CurrentDiaplay.OnMouseUp(sender, e, ve);
            if (res) {
                ve.NeedRePaint = true;
                ve.CurrentEvent = this;
                return res;
            }
        }
        this.CurrentDiaplay = null;
        this.StateMode = StateMode.NULL;
        return false;
    }
    OnMouseMove(sender: any, e: MouseEvent, ve: EventView): boolean {
        if (this.CurrentDiaplay != null) {
            ve.offsetPoint.X = ve.offsetPoint.X - this.Left;
            ve.offsetPoint.Y = ve.offsetPoint.Y - this.Top;
            let res = this.CurrentDiaplay.OnMouseMove(sender, e, ve);
            if (res) {
                ve.NeedRePaint = true;
                ve.CurrentEvent = this;
                return res;
            }
        }
        if (this.StateMode == StateMode.SIZE) {
            this.ChangedSize(ve);
            ve.NeedRePaint = true;
            ve.CurrentEvent = this;
            return true;
        }

        if (this.StateMode == StateMode.MOVE) {
            let x = ve.offsetPoint.X - this.MouseDownPoint.X;
            let y = ve.offsetPoint.Y - this.MouseDownPoint.Y;
            this.Left = this.MouseDownSize.Width + x;
            this.Top = this.MouseDownSize.Height + y;
            this.Displayables.forEach((item: Displayable) => { item.LocationOffset(x, y) });
            ve.NeedRePaint = true;
            ve.CurrentEvent = this;
            return true;
        }
        return false;
    }
    OnMouseDoubleClick(sender: any, e: MouseEvent, ve: EventView): boolean {
        if (this.CurrentDiaplay != null) {
            ve.offsetPoint.X = ve.offsetPoint.X - this.Left;
            ve.offsetPoint.Y = ve.offsetPoint.Y - this.Top;
            let res = this.CurrentDiaplay.OnMouseDoubleClick(sender, e, ve);
            if (res) {
                return res;
            }
        }
        return false;
    }
    OnKeyPress(sender: any, e: KeyboardEvent, ve: EventView): boolean {
        return false;
    }
    OnKeyDown(sender: any, e: KeyboardEvent, ve: EventView): boolean {
        return false;
    }
    OnTouchStart(sender: any, e: TouchEvent, ve: EventView): boolean {
        return false;
    }
    OnTouchMove(sender: any, e: TouchEvent, ve: EventView): boolean {
        return false;
    }
    OnTouchEnd(sender: any, e: TouchEvent, ve: EventView): boolean {
        return false;
    }

    Clear() {
        try {
            this.CurrentDiaplay = null;
            this.Displayables.Clear();
        } catch (e) {
            DataExcelConsole.log("Primitive Clear", e);
        }

    }
    Clone() {

    }
    SizeChangedMouseDown(ve: EventView) {
        let pt = ve.offsetPoint;
        this.MouseDownPoint = ve.offsetPoint;
        this.MouseDownSize = new Size(this.Width, this.Height);

        let result = false;
        if (this.TopLeft.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.TopLeft;
            result = true;
        }
        else if (this.TopRight.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.TopRight;
            result = true;
        }
        else if (this.BottomLeft.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.BoomLeft;
            result = true;
        }
        else if (this.BottomRight.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.BoomRight;
            result = true;
        }
        else if (this.MidTop.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.MidTop;
            result = true;
        }
        else if (this.MidBottom.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.MidBoom;
            result = true;
        }
        else if (this.MidLeft.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.MidLeft;
            result = true;
        }
        else if (this.MidRight.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.MidRight;
            result = true;
        }
        return result;
    }
    ChangedSize(ve: EventView) {
        let location = ve.offsetPoint;// e.Location;
        let sf = new Size(location.X - this.MouseDownPoint.X, location.Y - this.MouseDownPoint.Y);

        switch (this.SizeChangMode) {
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

    public CurrentDiaplay: Displayable | null = null;
    //private timeid: number = -1;
    //timer
    //OpenTime()
    //{
    //    if (this.timeid > -1)
    //    {
    //        return;
    //    }
    //    this.timeid = setInterval(this.OnTimerInterval, 100,this);
    //}
    //CloseTime()
    //{
    //    try
    //    {
    //        if (this.timeid==-1)
    //        {
    //            return;
    //        }
    //        clearInterval(this.timeid);
    //        this.timeid = -1;
    //    } catch (e)
    //    {
    //        DataExcelConsole.log("CloseTime", e);     
    //    }
    //}
    //OnTimerInterval(obj)
    //{
    //    try
    //    {
    //        let pri = obj as Primitive;
    //        if (pri.CurrentDiaplay != null)
    //        {
    //            let res = pri.CurrentDiaplay.OnTimerInterval();
    //            if (res)
    //            {
    //                return res;
    //            }
    //        }
    //        pri.CloseTime();
    //    } catch (e)
    //    {
    //        DataExcelConsole.log("OnTimerInterval", e);
    //    } 
    //}
    //displayable
    NewDiaplayLine() {
        let item = new DisplayableLine();
        item.Grid = this.Grid;
        item.Primitive = this;
        this.Displayables.Add(item);
        this.CurrentDiaplay = item;
        this.Grid.CurrentEvent = this.CurrentDiaplay;
        return item;
    }
    NewDiaplayRect() {
        let item = new DisplayableRect();
        item.Grid = this.Grid;
        item.Primitive = this;
        this.Displayables.Add(item);
        this.CurrentDiaplay = item;
        this.Grid.CurrentEvent = this.CurrentDiaplay;
        return item;
    }
    NewDiaplayText() {
        let item = new DisplayableText();
        item.Grid = this.Grid;
        item.Primitive = this;
        this.Displayables.Add(item);
        this.CurrentDiaplay = item;
        this.Grid.CurrentEvent = this.CurrentDiaplay;
        return item;
    }
    NewDiaplayCircle() {
        let item = new DisplayableCircle();
        item.Grid = this.Grid;
        item.Primitive = this;
        this.Displayables.Add(item);
        this.CurrentDiaplay = item;
        this.Grid.CurrentEvent = this.CurrentDiaplay;
        return item;
    }
    NewDisplayableImage() {
        let item = new DisplayableImage();
        item.Grid = this.Grid;
        item.Primitive = this;
        this.Displayables.Add(item);
        this.CurrentDiaplay = item;
        this.Grid.CurrentEvent = this.CurrentDiaplay;
        return item;
    }
    NewDisplayablePolygon() {
        let item = new DisplayablePolygon();
        item.Grid = this.Grid;
        item.Primitive = this;
        this.Displayables.Add(item);
        this.CurrentDiaplay = item;
        this.Grid.CurrentEvent = this.CurrentDiaplay;
        return item;
    }
    NewDisplayableSector() {
        let item = new DisplayableSector();
        item.Grid = this.Grid;
        item.Primitive = this;
        this.Displayables.Add(item);
        this.CurrentDiaplay = item;
        this.Grid.CurrentEvent = this.CurrentDiaplay;
        return item;
    }

    //Zoom
    private _zoom: Zoom;
    SetZoom(zoom: Zoom): boolean {
        try {
            this.Left = this.Left * zoom.Width;
            this.Top = this.Top * zoom.Height;
            this.Height = this.Height * zoom.Height;
            this.Width = this.Width * zoom.Width;
            this._zoom = zoom;
            this.Displayables.forEach((value: Displayable) => {
                value.SetZoom(zoom);
            });
        } catch (e) {
            DataExcelConsole.log("DataExcelRow SetZoom", e);
        }
        return false;
    }
    GetZoom(): Zoom {
        return this._zoom;
    }
}
