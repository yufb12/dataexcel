import { Palette } from "../Base/CellHeaderStyle";
import { ConvertHelper } from "../Base/ConvertHelper";
import { Cursors } from "../Base/Cursors";
import { DataExcelConsole } from "../Base/DataExcelConsole";
import { EventView } from "../Base/EventView";
import { ImageLayout } from "../Base/ImageLayout";
import { Point, Rect, Size, Zoom } from "../Base/Point";
import { Events } from "../Control/Events";
import { IViewEvent, IZoom } from "../Control/IViewEvent";
import { Graphics } from "../Drawing/Graphics";
import { DataExcel } from "../main/DataExcel";
import { StateMode } from "../View/MoveView";
import { SizeChangMode } from "../View/ReSizeView";

declare var echarts: any;
export class Chart implements IViewEvent, IZoom {
    public Grid: DataExcel;
    private _Name: string;
    public get Name(): string {
        return this._Name;
    }
    public set Name(value: string) {
        this._Name = value;
    }
    private _offsetX: number = 0;
    public get offsetX(): number {
        return this._offsetX;
    }
    public set offsetX(value: number) {
        this._offsetX = value;
    }
    private _offsetY: number = 0;
    public get offsetY(): number {
        return this._offsetY;
    }
    public set offsetY(value: number) {
        this._offsetY = value;
    }

    protected _height = 0;
    public get Height() {

        return this._height;
    }
    public set Height(value) {
        this._height = value;
    }
    public get Right() {
        return this.Left + this.Width;
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
        rect.X = this.Left + this.offsetX;
        rect.Y = this.Top + this.offsetY;
        rect.Width = this.Width;
        rect.Height = this.Height;
        return rect;
    }
    public get Bound(): Rect {
        let rect = new Rect(0, 0, 0, 0);
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
        let rectf = new Rect(this.Left + this.offsetX - this._SelectBorderWidth - this._SelectBorderWidth,
            this.Top + this.offsetY - this._SelectBorderWidth - this._SelectBorderWidth,
            this._SelectBorderWidth, this._SelectBorderWidth);

        return rectf;


    }

    public get TopRight(): Rect {
        let rectf = new Rect(this.Right + this.offsetX + this._SelectBorderWidth + this._SelectBorderWidth,
            this.Top + this.offsetY - this._SelectBorderWidth - this._SelectBorderWidth,
            this._SelectBorderWidth, this._SelectBorderWidth);

        return rectf;


    }

    public get BottomLeft(): Rect {
        let rectf = new Rect(this.Left + this.offsetX - this._SelectBorderWidth - this._SelectBorderWidth,
            this.Bottom + this.offsetY + this._SelectBorderWidth + this._SelectBorderWidth,
            this._SelectBorderWidth, this._SelectBorderWidth);

        return rectf;


    }

    public get BottomRight(): Rect {
        let rectf = new Rect(this.Right + this.offsetX + this._SelectBorderWidth + this._SelectBorderWidth,
            this.Bottom + this.offsetY + this._SelectBorderWidth + this._SelectBorderWidth,
            this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }

    public get MidTop(): Rect {
        let rectf = new Rect(
            this.Left + this.offsetX + this.Width / 2 - this._SelectBorderWidth / 2,
            this.Top + this.offsetY - this._SelectBorderWidth - this._SelectBorderWidth,
            this._SelectBorderWidth,
            this._SelectBorderWidth);

        return rectf;

    }

    public get MidBottom(): Rect {
        let rectf = new Rect(this.Left + this.offsetX + this.Width / 2 - this._SelectBorderWidth / 2,
            this.Bottom + this.offsetY + this._SelectBorderWidth + this._SelectBorderWidth,
            this._SelectBorderWidth, this._SelectBorderWidth);

        return rectf;

    }

    public get MidLeft(): Rect {
        let rectf = new Rect(this.Left + this.offsetX - this._SelectBorderWidth - this._SelectBorderWidth,
            this.Top + this.offsetY + this.Height / 2 - this._SelectBorderWidth / 2,
            this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }

    get MidRight(): Rect {
        let rectf = new Rect(this.Right + this.offsetX + this._SelectBorderWidth + this._SelectBorderWidth,
            this.Top + this.offsetY + this.Height / 2 - this._SelectBorderWidth / 2,
            this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;

    }

    private _dsc: any;
    public get DSC(): any {
        return this._dsc;
    }
    public set DSC(value: any) {
        this._dsc = value;
    }


    public GetData() {
        try {
            let data = {
                name: this.Name,
                backcolor: this.BackColor,
                backimage: this.BackImage,
                backimageimagelayout: this.BackImageImageLayout,
                height: this.Height,
                left: this.Left,
                top: this.Top,
                width: this.Width,
                offsetx: this.offsetX,
                offsety: this.offsetY,
                chartdata: this.DSC
            };
            return data;
        } catch (e) {
            DataExcelConsole.log("dataexcelcell GetData", e);
        }
        return {};
    }

    public SetData(grid: DataExcel, data: any) {
        try {
            this.Name = data.name;
            this.BackColor = data.backcolor;
            this.BackImage = data.backimage;
            this.BackImageImageLayout = data.backimageimagelayout;
            this.Height = data.height;
            this.Left = data.left;
            this.Top = data.top;
            this.Width = data.width;
            this.DSC = data.chartdata;

            this.offsetX = data.offsetx;
            this.offsetY = data.offsety;
        } catch (e) {
            DataExcelConsole.log("dataexcelcell SetData", e);
        }

    }
    constructor() {
        this._SelectBorderWidth = 6;
        this.DSC = {
            data: {

            },
            style: {
                option: {}
            },
            controller: {

            },
        };
    }


    //Init
    dom: HTMLDivElement;
    chart: any;
    Init() {
        if (this.dom == null) {
            this.dom = document.createElement("div");
            this.dom.style.position = "absolute";
            this.dom.style.left = this.Left + "px";
            this.dom.style.top = this.Top + "px";
            this.dom.style.width = this.Width + "px";
            this.dom.style.height = this.Height + "px";
            this.Grid.maindom.appendChild(this.dom);

            this.dom["chart"] = this;
            //this.dom.addEventListener("mousedown", this.DoOnMouseDown);
            //this.dom.addEventListener("mouseup", this.DoOnMouseUp);
            //this.dom.addEventListener("mousemove", this.DoOnMouseMove);
            //window["chart"] = this;
            //window.addEventListener("mousemove", this.DoOnMouseMove);
            this.chart = echarts.init(this.dom);

            let option = this.DSC.style.option;
            this.chart.setOption(option);
        }
    }
    InitDefaultOption() {
        let option;
        option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    smooth: true
                }
            ]
        };
        this.DSC.style.option = option;
        this.chart.setOption(option);
    }
    Refresh() {
        this.offsetX = this.Grid.ContentLeft;
        this.offsetY = this.Grid.ContentTop;

        this.dom.style.left = this.offsetX + this.Left + "px";
        this.dom.style.top = this.offsetY + this.Top + "px";
        this.dom.style.width = this.Width + "px";
        this.dom.style.height = this.Height + "px";
        let option = this.DSC.style.option;
        this.chart.setOption(option, true);
        this.chart.resize();
    }
    RefreshData() {

    }
    Clear() {
        try {
            if (this.dom != null) {
                this.Grid.maindom.removeChild(this.dom);
            }
        } catch (e) {
            DataExcelConsole.log("Chart Clear", e);
        }

    }
    //DoOnMouseDown(evt: MouseEvent): void
    //{
    //    let obj2 = this["chart"] as any;
    //    let obj = obj2 as Chart;
    //    let ev = new EventView();
    //    try
    //    {
    //        ev.Canvas = evt.target;
    //        let dom = evt.target as HTMLElement;
    //        ev.Dom = dom;
    //        let vertex = dom.getBoundingClientRect();
    //        let x = evt.offsetX;
    //        let y = evt.offsetY;
    //        ev.Point = new Point(x, y);
    //        obj.OnChartMouseDown(this, evt, ev);
    //    }
    //    catch (ex)
    //    {
    //        DataExcelConsole.log("dom.OnMouseDown", ex);
    //    }
    //    finally
    //    {

    //    }
    //}
    //DoOnMouseUp(evt: MouseEvent): void
    //{
    //    let obj2 = this["chart"] as any;
    //    let obj = obj2 as Chart;
    //    let ev = new EventView();
    //    try
    //    {
    //        ev.Canvas = evt.target;
    //        let dom = evt.target as HTMLElement;
    //        ev.Dom = dom;
    //        let x = evt.offsetX;
    //        let y = evt.offsetY;
    //        ev.Point = new Point(x, y);
    //        obj.OnChartMouseUp(this, evt, ev);
    //    }
    //    catch (ex)
    //    {
    //        DataExcelConsole.log("dom.OnMouseUp", ex);
    //    }
    //    finally
    //    {

    //    }
    //}
    //DoOnMouseMove(evt: MouseEvent): void
    //{
    //    let obj2 = this["chart"] as any;
    //    let obj = obj2 as Chart;
    //    let ev = new EventView();
    //    try
    //    {
    //        ev.Canvas = evt.target;
    //        let dom = evt.target as HTMLElement;
    //        ev.Dom = dom;
    //        let x = evt.offsetX;
    //        let y = evt.offsetY;
    //        ev.Point = new Point(x, y);
    //        obj.OnChartMouseMove(this, evt, ev);
    //    }
    //    catch (ex)
    //    {
    //        DataExcelConsole.log("dom.click", ex);
    //    }
    //    finally
    //    {

    //    }
    //}

    //OnChartMouseDown(sender: any, e: any, ve: EventView): boolean
    //{
    //    if (this.Bound.Contains(ve.Point))
    //    {
    //        this.MouseDownPoint = ve.Point; 
    //        this.StateMode = StateMode.MOVE;
    //        this.Grid.ClearSelect();
    //        this.Selected = true;
    //        this.Grid.CellEvent = this;
    //        this.Grid.RePaint();
    //        return true;
    //    }
    //    return false;
    //}
    //OnChartMouseUp(sender: any, e: any, ve: EventView): boolean
    //{
    //    this.StateMode = StateMode.NULL;
    //    return false;
    //}
    //OnChartMouseMove(sender: any, e: any, ve: EventView): boolean
    //{ 
    //    if (this.StateMode == StateMode.MOVE)
    //    {
    //        let x = ve.Point.X - this.MouseDownPoint.X;
    //        let y = ve.Point.Y - this.MouseDownPoint.Y;
    //        this.Left = this.Left + x;
    //        this.Top = this.Top + y;
    //        this.dom.style.left = this.Left + "px";
    //        this.dom.style.top = this.Top + "px";
    //        this.Refresh();
    //        this.Grid.RePaint();
    //        return true;
    //    } 
    //    return false;
    //}
    //Over
    OnMouseDown(sender: any, e: any, ve: EventView): boolean {
        if (this.Rect.Contains(ve.offsetPoint)) {
            this.MouseDownPoint = ve.offsetPoint;
            this.MouseDownSize = new Size(this.Left, this.Top);
            this.StateMode = StateMode.MOVE;
            this.Grid.ClearSelect();
            this.Selected = true;
            ve.NeedRePaint = true;
            ve.CurrentEvent = this;
            this.Grid.emit(Events.SelectChanged, this.Grid, this);
            return true;
        }
        if (this.SizeChangedMouseDown(ve)) {
            this.StateMode = StateMode.SIZE;
            ve.NeedRePaint = true;
            ve.CurrentEvent = this;
            this.Grid.emit(Events.SelectChanged, this.Grid, this);
            return true;
        }
        return false;
    }
    OnMouseUp(sender: any, e: any, ve: EventView): boolean {
        this.StateMode = StateMode.NULL;
        return false;
    }
    OnMouseMove(sender: any, e: any, ve: EventView): boolean {
        if (this.StateMode == StateMode.MOVE) {
            let x = ve.offsetPoint.X - this.MouseDownPoint.X;
            let y = ve.offsetPoint.Y - this.MouseDownPoint.Y;
            this.Left = this.MouseDownSize.Width + x;
            this.Top = this.MouseDownSize.Height + y;
            this.dom.style.left = this.offsetX + this.Left + "px";
            this.dom.style.top = this.offsetY + this.Top + "px";
            ve.NeedRePaint = true;
            ve.CurrentEvent = this;
            return true;
        }
        if (this.StateMode == StateMode.SIZE) {
            this.ChangedSize(ve);
            this.dom.style.left = this.offsetX + this.Left + "px";
            this.dom.style.top = this.offsetY + this.Top + "px";
            this.dom.style.width = this.Width + "px";
            this.dom.style.height = this.Height + "px";
            this.chart.resize();
            ve.NeedRePaint = true;
            ve.CurrentEvent = this;
            return true;
        }
        else if (this.SizeChangedMouseDown(ve)) {
            ve.NeedRePaint = true;
            ve.CurrentEvent = this;
            return true;
        }
        return false;
    }
    SetCursor(cursor: any) {
        this.Grid.maindom.style.cursor = cursor;
    }
    OnMouseDoubleClick(sender: any, e: any, ve: EventView): boolean {
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

    OnDrawBack(sender: any, g: Graphics) {
        if (this.Grid == null)
            console.log("this.Grid == null");

        if (this.BackColor != null) {
            g.FillRect(this.BackColor, this.Left + this.offsetX, this.Top, this.Width, this.Height);
        }
        if (!ConvertHelper.StringIsNullOrEmpty(this.BackImage)) {
            g.FillRectangleImage(this.BackImage, this.Rect, this.BackImageImageLayout, null, 1);
        }
        if (this.Selected) {
            g.FillRect(Palette.A3399FF80, this.Left + this.offsetX, this.Top + this.offsetY, this.Width, this.Height);
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
    }
    SizeChangedMouseDown(ve: EventView) {
        let pt = ve.offsetPoint;
        this.MouseDownPoint = ve.offsetPoint;
        this.MouseDownSize = new Size(this.Width, this.Height);

        let result = false;
        if (this.TopLeft.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.TopLeft;
            this.SetCursor(Cursors.nw_resize);
            result = true;
        }
        else if (this.TopRight.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.TopRight;
            this.SetCursor(Cursors.ne_resize);

            result = true;
        }
        else if (this.BottomLeft.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.BoomLeft;
            this.SetCursor(Cursors.ne_resize);
            result = true;
        }
        else if (this.BottomRight.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.BoomRight;
            this.SetCursor(Cursors.nw_resize);
            result = true;
        }
        else if (this.MidTop.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.MidTop;
            this.SetCursor(Cursors.n_resize);
            result = true;
        }
        else if (this.MidBottom.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.MidBoom;
            this.SetCursor(Cursors.n_resize);
            result = true;
        }
        else if (this.MidLeft.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.MidLeft;
            this.SetCursor(Cursors.e_resize);
            result = true;
        }
        else if (this.MidRight.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.MidRight;
            this.SetCursor(Cursors.e_resize);
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

    //Zoom
    private _zoom: Zoom;
    SetZoom(zoom: Zoom): boolean {
        try {
            this.Left = this.Left * zoom.Width;
            this.Top = this.Top * zoom.Height;
            this.Height = this.Height * zoom.Height;
            this.Width = this.Width * zoom.Width;
            this._zoom = zoom;
        } catch (e) {
            DataExcelConsole.log("DataExcelRow SetZoom", e);
        }
        return false;
    }
    GetZoom(): Zoom {
        return this._zoom;
    }
}