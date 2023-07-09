import { List } from "../Base/ArrayList";
import { GridLineStyle, FocusedCellStyle, SelectCellsStyle, SelectCellsStyleAdd, SelectCellsAddStyle } from "../Base/CellHeaderStyle";
import { CheckState, ConstantValue, Border } from "../Base/ConstantValue";
import { ConvertHelper } from "../Base/ConvertHelper";
import { Cursors } from "../Base/Cursors";
import { DataExcelConsole } from "../Base/DataExcelConsole";
import { Dictionary } from "../Base/Dictionary";
import { EventView } from "../Base/EventView";
import { ImageLayout } from "../Base/ImageLayout";
import { MouseButtons } from "../Base/MouseButtons";
import { NextType } from "../Base/NextType";
import { Zoom, Rect, Point } from "../Base/Point";
import { SelectMode } from "../Base/SelectMode";
import { DefaultEdit } from "../Base/Tool";
import { Observer } from "../Control/EventObserver2";
import { Events } from "../Control/Events";
import { IViewEvent } from "../Control/IViewEvent";
import { DataExcelViewVScroll, DataExcelViewHScroll } from "../Control/ScrollerView";
import { Graphics } from "../Drawing/Graphics";
import { DataExcelCellEditEdit } from "../Edit/DataExcelCellEditEdit";
import { Chart } from "../Plus/Chart";
import { ChartList } from "../Plus/ChartList";
import { Displayable } from "../Plus/Displayable/Displayable";
import { Primitive } from "../Plus/Primitive";
import { PrimitiveList } from "../Plus/PrimitiveList";
import { DataExcelBackCell } from "./DataExcelBackCell";
import { DataExcelBackCellList } from "./DataExcelBackCellList";
import { DataExcelCell } from "./DataExcelCell";
import { DataExcelCellList } from "./DataExcelCellList";
import { DataExcelColumn } from "./DataExcelColumn";
import { DataExcelColumnCollection } from "./DataExcelColumnCollection";
import { DataExcelColumnList } from "./DataExcelColumnList";
import { DataExcelMergeCell } from "./DataExcelMergeCell";
import { DataExcelMergeCellList } from "./DataExcelMergeCellList";
import { DataExcelRow } from "./DataExcelRow";
import { DataExcelRowCollection } from "./DataExcelRowCollection";
import { DataExcelRowList } from "./DataExcelRowList";
import { SelectAddRectCollection } from "./SelectAddRectCollection";
import { SelectCellCollection } from "./SelectCellCollection";
declare var zrender: any;
export class DataExcel {
    //集合
    public Rows: DataExcelRowCollection<number, DataExcelRow>;
    public Columns: DataExcelColumnCollection<number, DataExcelColumn>;
    public AllVisibleColumns: DataExcelColumnList;
    public AllVisibleRows: DataExcelRowList;
    public VisibleRows: DataExcelRowList;
    public VisibleColumns: DataExcelColumnList;
    public SelectRows: DataExcelRowList;
    public SelectColumns: DataExcelColumnList;
    public SelectRange: DataExcelCellList;
    public SelectCells: SelectCellCollection | null;
    public SelectAddRectCollection: SelectAddRectCollection | null;

    public MergeCells: DataExcelMergeCellList;
    public BackCells: DataExcelBackCellList;
    public CopyCells: SelectCellCollection | null;
    public Charts: ChartList;
    public Primitives: PrimitiveList;

    //对象
    public HeaderRow: DataExcelRow;
    public HeaderColumn: DataExcelColumn;
    public _focusedcell: DataExcelCell | null;
    public EditCell: DataExcelCell | null;
    public VScroll: DataExcelViewVScroll;
    public HScroll: DataExcelViewHScroll;
    public DefaultEdit: DataExcelCellEditEdit;
    public IDCells = new Dictionary<string, DataExcelCell>();
    //值属性
    public Width = 1200;
    private _heigth: number = 600;
    public get Height(): number {
        return this._heigth;
    }
    public set Height(value: number) {
        this._heigth = value;
    }
    public ShowBorder = false;
    public ShowColumnHeader = true;
    public ShowRowHeader = true;

    public ShowGridLine = true;
    private _FirstDisplayedRowIndex = 1;
    public get FirstDisplayedRowIndex() {
        return this._FirstDisplayedRowIndex;
    }
    public set FirstDisplayedRowIndex(value) {
        this._FirstDisplayedRowIndex = value;
    }
    public EndDisplayedRowIndex = 1;
    private _FirstDisplayedColumnIndex = 1;
    public get FirstDisplayedColumnIndex() {
        return this._FirstDisplayedColumnIndex;
    }
    public set FirstDisplayedColumnIndex(value) {
        this._FirstDisplayedColumnIndex = value;
    }
    public EndDisplayedColumnIndex = 1;
    private _ReadOnly: number = CheckState.Unkown;
    public get ReadOnly(): number {
        return this._ReadOnly;
    }
    public set ReadOnly(value: number) {
        this._ReadOnly = value;
    }
    public TopSideHeight = 0;
    public LeftSideWidth = 0;
    public Font = "14px 宋体";
    public AutoGenerateRows = true;
    public AutoGenerateColumns = true;
    public DefaultColumnWidth = 72;
    public DefaultRowHeight = 20;
    public MaxRow = 1000000;
    public MaxColumn = 512;
    public FrozenRow = 0;
    public FrozenColumn = 0;
    public ContentTop = 20;
    public ContentLeft = 20;
    public ContentRight = 20;
    public ContentBottom = 0;
    public Zoom: Zoom | null = null;
    private _EndReFresh = 0;
    private _BeginReFresh = 0;
    private _CurrentEdit: any = null;
    public get CurrentEdit(): any {
        return this._CurrentEdit;
    }
    public set CurrentEdit(value: any) {
        this._CurrentEdit = value;
    }

    private _ForeColor: any = "black";
    public get ForeColor(): any {
        return this._ForeColor;
    }
    public set ForeColor(value: any) {
        this._ForeColor = value;
    }
    private _BackColor: any = null;
    public get BackColor(): any {
        return this._BackColor;
    }
    public set BackColor(value: any) {
        this._BackColor = value;
    }

    public BackImage: string = "";
    public BackImageImageLayout: number = ImageLayout.ZoomClip;
    //style

    private _BorderColor = "Silver";
    public get BorderColor() {
        return this._BorderColor;
    }
    public set BorderColor(value) {
        this._BorderColor = value;
    }
    //显示
    public ShowFocusedCellBorder: boolean = true;
    public ShowSelectBorder: boolean = true;
    public Selectmode: number = SelectMode.Null;
    public editcontrol: HTMLInputElement;
    public maindom: HTMLElement;
    public graphic: Graphics;
    public MouseDownPoint: object;
    private _CellEvent: IViewEvent | null;
    public get CurrentEvent(): IViewEvent | null {
        return this._CellEvent;
    }
    public set CurrentEvent(value: IViewEvent | null) {
        //if (value == null)
        //{
        //    console.log(" set CellEvent " + new Date().toLocaleTimeString());
        //    console.trace(value);
        //}
        this._CellEvent = value;
    }
    public ShowSelectAddRect: boolean = true;
    public MultiSelect: boolean = true;
    public AllowChangedFirstDisplayRow: boolean = true;
    public AllowChangedFirstDisplayColumn: boolean = true;
    //DEFINE EVENT
    public EventHandlers: Observer;
    public CellSelectChangedEvent: any;
    public zrendermain: any = null;
    //DEBUG
    public DebugRect: Rect;
    public DebugMouseDown: Rect;
    public DebugText: string;
    public DebugText2: string;

    private _StartTime: Date;
    public get StartTime(): Date {
        return this._StartTime;
    }

    public get FocusedCell(): DataExcelCell | null {
        return this._focusedcell;
    }
    public set FocusedCell(cell: DataExcelCell | null) {
        this._focusedcell = cell;
    }
    get InEdit(): boolean {
        if (this.FocusedCell == null) {
            return false;
        }
        let res = (this.FocusedCell == this.EditCell);
        if (res) {
            if (this.CurrentEdit == null) {
                res = false;
            }
        }
        return res;
    }
    get ClientBounds() {
        let left = this.ContentLeft;
        let top = this.ContentTop;
        let width = this.Width - this.ContentRight - left;
        let height = this.Height - this.ContentBottom - top;
        let rect = new Rect(left, top, width, height);
        return rect;

    }
    //FIle
    public GetData() {
        let data = {
            height: this.Height,
            rows: [],
            columns: [],
            mergecells: [],
            backcells: [],
            charts: [],
            primitives: []
        } as any;
        data.allowchangedfirstdisplaycolumn = this.AllowChangedFirstDisplayColumn;
        data.allowchangedfirstdisplayrow = this.AllowChangedFirstDisplayRow;
        data.backcolor = this.BackColor;
        data.backimage = this.BackImage;
        data.backimageimagelayout = this.BackImageImageLayout;
        data.bordercolor = this.BorderColor;
        data.firstdisplayedcolumnindex = this.FirstDisplayedColumnIndex;
        data.firstdisplayedrowindex = this.FirstDisplayedRowIndex;
        data.forecolor = this.ForeColor;
        data.frozencolumn = this.FrozenColumn;
        data.frozenrow = this.FrozenRow;
        data.font = this.Font;
        data.multiselect = this.MultiSelect;
        data.readonly = this.ReadOnly;
        data.showborder = this.ShowBorder;
        data.showcolumnheader = this.ShowColumnHeader;
        data.showfocusedcellborder = this.ShowFocusedCellBorder;
        data.showgridline = this.ShowGridLine;
        data.showrowheader = this.ShowRowHeader;
        data.showselectaddrect = this.ShowSelectAddRect;
        data.showselectborder = this.ShowSelectBorder;
        data.zoom = this.Zoom;
        data.vscrollvisible = this.VScroll.Visible;
        data.hscrollvisible = this.HScroll.Visible;
        data.width = this.Width;
        data.height = this.Height;
        data.zoom = this.Zoom;
        data.defaultrowheight = this.DefaultRowHeight;
        data.defaultcolumnwidth = this.DefaultColumnWidth;

        this.Columns.forEach((column: DataExcelColumn) => {
            data.columns.push(column.GetData());
        });

        this.Rows.forEach((row: DataExcelRow) => {
            data.rows.push(row.GetData());
        });

        this.MergeCells.forEach((mergecell: DataExcelMergeCell) => {
            data.mergecells.push(mergecell.GetData());
        });
        this.BackCells.forEach((mergecell: DataExcelBackCell) => {
            data.backcells.push(mergecell.GetData());
        });
        this.Charts.forEach((chart: Chart) => {
            data.charts.push(chart.GetData());
        });

        this.Primitives.forEach((chart: Primitive) => {
            data.primitives.push(chart.GetData());
        });

        return data;
    }
    public SetData(data: any) {
        try {
            this.Clear();
            this.AllowChangedFirstDisplayColumn = data.allowchangedfirstdisplaycolumn;
            this.AllowChangedFirstDisplayRow = data.allowchangedfirstdisplayrow;
            this.BackColor = data.backcolor;
            this.BackImage = data.backimage;
            this.BackImageImageLayout = data.backimageimagelayout;
            this.BorderColor = data.bordercolor;
            this.FirstDisplayedColumnIndex = data.firstdisplayedcolumnindex;
            this.FirstDisplayedRowIndex = data.firstdisplayedrowindex;
            this.ForeColor = data.forecolor;
            this.FrozenColumn = data.frozencolumn;
            this.FrozenRow = data.frozenrow;
            this.Font = data.font;
            this.MultiSelect = data.multiselect;
            this.ReadOnly = data.readonly;
            this.ShowBorder = data.showborder;
            this.ShowColumnHeader = data.showcolumnheader;
            this.ShowFocusedCellBorder = data.showfocusedcellborder;
            this.ShowGridLine = data.showgridline;
            this.ShowRowHeader = data.showrowheader;
            this.ShowSelectAddRect = data.showselectaddrect;
            this.ShowSelectBorder = data.showselectborder;
            this.Zoom = data.zoom;
            this.VScroll.Visible = data.vscrollvisible;
            this.HScroll.Visible = data.hscrollvisible;
            this.Zoom = data.zoom;
            if (data.defaultrowheight != null) {
                this.DefaultRowHeight = data.defaultrowheight;
            }
            if (data.defaultcolumnwidth != null) {
                this.DefaultColumnWidth = data.defaultcolumnwidth;
            }
            this.Width = data.width;
            this.Height = data.height;

            let len = data.columns.length;
            for (let i = 0; i < len; i++) {
                let columndata = data.columns[i];
                let column = new DataExcelColumn();
                column.Grid = this;
                column.SetData(this, columndata)
                this.Columns.Add(column.Index, column);
            }

            len = data.rows.length;
            for (let i = 0; i < len; i++) {
                let rowdata = data.rows[i];
                let row = new DataExcelRow();
                row.Grid = this;
                row.SetData(this, rowdata)
                this.Rows.Add(row.Index, row);
            }

            len = data.mergecells.length;
            for (let i = 0; i < len; i++) {
                let itemdata = data.mergecells[i];
                let item = new DataExcelMergeCell();
                item.Grid = this;
                item.SetData(this, itemdata)
                this.MergeCells.Add(item);
            }
            len = data.backcells.length;
            for (let i = 0; i < len; i++) {
                let itemdata = data.backcells[i];
                let item = new DataExcelBackCell();
                item.Grid = this;
                item.SetData(this, itemdata)
                this.BackCells.Add(item);
            }

            len = data.backcells.length;
            for (let i = 0; i < len; i++) {
                let itemdata = data.backcells[i];
                let item = new DataExcelBackCell();
                item.Grid = this;
                item.SetData(this, itemdata)
                this.BackCells.Add(item);
            }

            len = data.charts.length;
            for (let i = 0; i < len; i++) {
                let itemdata = data.charts[i];
                let item = new Chart();
                item.Grid = this;
                item.SetData(this, itemdata);
                this.Charts.Add(item);
            }

            len = data.primitives.length;
            for (let i = 0; i < len; i++) {
                let itemdata = data.primitives[i];
                let item = new Primitive();
                item.Grid = this;
                item.SetData(this, itemdata);
                this.Primitives.Add(item);
            }

        } catch (e) {
            DataExcelConsole.log("SetData", e);
        }
    }
    //构告函数
    constructor() {
        this.Rows = new DataExcelRowCollection();
        this.Columns = new DataExcelColumnCollection();
        this.AllVisibleColumns = new DataExcelColumnList();
        this.VisibleColumns = new DataExcelColumnList();
        this.AllVisibleRows = new DataExcelRowList();
        this.VisibleRows = new DataExcelRowList();
        this.SelectRange = new DataExcelCellList();
        this.SelectRows = new DataExcelRowList();
        this.SelectColumns = new DataExcelColumnList();
        this.MergeCells = new DataExcelMergeCellList();
        this.BackCells = new DataExcelBackCellList();
        this.DefaultEdit = new DataExcelCellEditEdit();
        this.Charts = new ChartList();
        this.Primitives = new PrimitiveList();
        this.EventHandlers = new Observer();
        this.VScroll = new DataExcelViewVScroll(this);
        this.HScroll = new DataExcelViewHScroll(this);


        this.Width = 1200;
        this.Height = 600;
        this.ShowBorder = true;
        this.ShowColumnHeader = true;
        this.ShowRowHeader = true;
        this.ShowGridLine = true;
        this.FirstDisplayedRowIndex = 1;
        this.EndDisplayedRowIndex = 1;
        this.FirstDisplayedColumnIndex = 1;
        this.EndDisplayedColumnIndex = 1;
        this.ReadOnly = CheckState.Unkown;
        this.TopSideHeight = 0;
        this.Font = "14px 宋体";
        //this.BackColor = "red";
        this.AutoGenerateRows = true;
        this.MaxRow = 1000000;
        this.FrozenRow = 0;
        this.ContentTop = 0;
        this.ContentBottom = 0;
        this._StartTime = new Date();

    };
    InitDom(dom: HTMLElement) {
        this.maindom = dom;
        this.Width = dom.clientWidth;
        this.Height = dom.clientHeight;
        // this.maindom.style.width = this.Width + "px";
        // this.maindom.style.height = this.Height + "px";
        dom.onwheel = (e) => { e.stopPropagation(); return false; };
        let zr = zrender.init(dom);
        this.zrendermain = zr;
        this.graphic = new Graphics(zr);
        zr["Grid"] = this;
        dom["Grid"] = this;
        window["Grid"] = this;
        document["Grid"] = this;
        dom.addEventListener("wheel", this.OnWheel);
        dom.addEventListener("resize", this.OnResize);

        dom.addEventListener("mousedown", this.OnMouseDown);
        dom.addEventListener("mouseup", this.OnMouseUp);
        dom.addEventListener("mousemove", this.OnMouseMove);
        dom.addEventListener("dblclick", this.OnMouseDoubleClick);
        dom.addEventListener("touchstart", this.OnTouchStart);
        dom.addEventListener("touchmove", this.OnTouchMove, { passive: false });
        dom.addEventListener("touchend", this.OnTouchEnd);
        dom.addEventListener("touchcancel", this.OnTouchCancel);

        //window.addEventListener("mousedown", this.OnMouseDown);
        //window.addEventListener("mouseup", this.OnMouseUp);
        //window.addEventListener("mousemove", this.OnMouseMove);
        //window.addEventListener("dblclick", this.OnMouseDoubleClick);
        //window.addEventListener("touchstart", this.OnTouchStart);
        //window.addEventListener("touchmove", this.OnTouchMove, { passive: false });
        //window.addEventListener("touchend", this.OnTouchEnd);
        //window.addEventListener("touchcancel", this.OnTouchCancel);



        window.addEventListener("keypress", this.OnKeyPress);
        window.addEventListener("keydown", this.OnKeyDown);
        window.addEventListener("paste", this.OnPaste);
        window.addEventListener("cut", this.OnCut);
        window.addEventListener("copy", this.OnCopy);
        //window.addEventListener("mousemove", this.OnMouseMove, true);
        //window.addEventListener("mousemove", this.OnWindowMouseMove, true);
        this.Height = zr.getHeight();
        this.Width = zr.getWidth();
        this.VScroll.RefreshScrollThumd();
        this.HScroll.RefreshScrollThumd();
    }
    //test
    //OnWindowMouseMove(evt: MouseEvent): void
    //{
    //    DataExcelConsole.log("OnWindowMouseMove __", evt);     
    //}
    //endtest
    RePaint(e?: any) {
        this.graphic.Clear();
        var g = this.graphic as any;
        g.tag = e;
        this.OnDraw(this.graphic);
    }
    InitEdit(edit: HTMLInputElement) {
        this.editcontrol = edit;
        let d = this.maindom;
        d.appendChild(edit);
    }
    SetSize(width: number, height: number) {
        this.Width = width;
        this.Height = height;
        DataExcelConsole.log("SetSize", width + " " + height);

        this.maindom.style.width = (width - 1) + "px";
        this.maindom.style.height = (height - 1) + "px";

        let opts = { width: width, height: height };
        this.zrendermain.resize();
        //this.Height = this.zrendermain.getHeight();
        //this.Width = this.zrendermain.getWidth();
        this.maindom.style.width = width + "px";
        this.maindom.style.height = height + "px";
        this.zrendermain.resize();
    }
    InitChart() {
        this.Charts.forEach((chart) => {
            chart.Init();
            chart.Refresh();
            chart.RefreshData();
        });

    }
    RefreshChart() {
        this.Charts.forEach((chart) => {
            chart.Refresh();
            chart.RefreshData();
        });
    }
    RefreshZrender() {
        this.maindom.style.width = this.Width + "px";
        this.maindom.style.height = this.Height + "px";
        this.zrendermain.resize();
    }
    Refresh() {
        this.SetFirstDisplayRow(this.FirstDisplayedRowIndex);
        this.SetFirstDisplayColumn(this.FirstDisplayedColumnIndex);
        if (this.SelectCells != null) {
            this.SelectCells.Refresh();
        }
        if (this.MergeCells != null) {
            this.MergeCells.Refresh();
        }
        if (this.BackCells != null) {
            this.BackCells.Refresh();
        }

        if (this.VScroll.Value != this.FirstDisplayedRowIndex) {
            this.VScroll.Value = this.FirstDisplayedRowIndex;
            this.VScroll.RefreshScrollThumd();
        }
        if (this.HScroll.Value != this.FirstDisplayedColumnIndex) {
            this.HScroll.Value = this.FirstDisplayedColumnIndex;
            this.HScroll.RefreshScrollThumd();

        }
        this.EndEdit();
    }
    //EVENT OVERRIDE
    private debugmode: boolean = false;

    OnPaste(evt: any) {
        try {
            var obj = this["Grid"] as DataExcel;
            //DataExcelConsole.log("OnPaste", this);
            evt.stopPropagation();
            obj.DoPaste(evt);
            obj.RePaint();
        }
        catch (ex) {
            DataExcelConsole.log("OnPaste", ex);
        }
        finally {

        }
    }
    OnCopy(evt: any) {
        try {
            var obj = this["Grid"] as DataExcel;
            //DataExcelConsole.log("OnPaste", this);
            evt.stopPropagation();
            obj.DoCopy(evt);
        }
        catch (ex) {
            DataExcelConsole.log("OnPaste", ex);
        }
        finally {

        }
    }
    OnCut(evt: any) {
        try {
            var obj = this["Grid"] as DataExcel;
            //DataExcelConsole.log("OnPaste", this);
            evt.stopPropagation();
            obj.DoCut(evt);
            obj.RePaint();
        }
        catch (ex) {
            DataExcelConsole.log("OnPaste", ex);
        }
        finally {

        }
    }
    OnMouseDoubleClick(evt: MouseEvent) {
        let ev = new EventView();
        var grid: DataExcel;
        try {
            grid = this["Grid"] as DataExcel;
            this.debugmode = true;
            ev.Canvas = evt.target;
            let dom = evt.target as HTMLElement;
            ev.Dom = dom;
            let x = evt.offsetX;
            let y = evt.offsetY;
            let evtpath = evt as any;
            let path = evtpath.path;
            let offsetleft = 0;
            let offsettop = 0;
            if (path != null) {
                let len = path.length;
                for (var i = 0; i < len; i++) {
                    let domt = path[i];
                    if (domt == grid.maindom) {
                        break;
                    }
                    offsetleft = offsetleft + domt.offsetLeft;
                    offsettop = offsettop + domt.offsetTop;
                }
            }
            else {
                var rect = dom.getBoundingClientRect();
                console.log("rect");
                console.log(rect);
                console.log("dom");
                console.log(dom);
                console.log("grid");
                console.log(grid);
                offsetleft = rect.left;
                offsettop = rect.top;
            }
            ev.offsetPoint = new Point(x + offsetleft, y + offsettop);
            grid.DoOnMouseDoubleClick(this, evt, ev);
        }
        catch (ex) {
            DataExcelConsole.log("dom.OnMouseDoubleClick", ex);
        }
        finally {

        }
        if (ev.NeedRePaint) {
            grid.RePaint();
        }
    }
    OnWheel(evt: any) {
        try {
            evt.stopPropagation();
            let step = -3;
            let obj = this["Grid"] as DataExcel;
            let target = evt.target as HTMLCanvasElement;
            if (evt.wheelDelta < 0) {
                step = 3;
            }
            if (evt.ctrlKey) {
                obj.FirstDisplayedColumnIndex = obj.FirstDisplayedColumnIndex + step;
            }
            else {
                obj.FirstDisplayedRowIndex = obj.FirstDisplayedRowIndex + step;
            }
            if (obj.FirstDisplayedColumnIndex < 1) {
                obj.FirstDisplayedColumnIndex = 1;
            }
            if (obj.FirstDisplayedRowIndex < 1) {
                obj.FirstDisplayedRowIndex = 1;

            }
            obj.emit(Events.FirstDisplayRowChanged, obj, obj.VScroll, obj.FirstDisplayedRowIndex);
            obj.emit(Events.FirstDisplayColumnChanged, obj, obj.VScroll, obj.FirstDisplayedColumnIndex);
            obj.Refresh();
            obj.RePaint(evt);
        }
        catch (ex) {
            DataExcelConsole.log("dom.addEventListener OnWheel", ex);
        }
        return true;
    }
    OnMouseDown(evt: MouseEvent): void {
        var grid = this["Grid"] as DataExcel;

        let ev = new EventView();
        try {
            this.debugmode = true;
            ev.Canvas = evt.target;
            let dom = evt.target as HTMLElement;

            ev.Dom = dom;
            let x = evt.offsetX;
            let y = evt.offsetY;
            let evtpath = evt as any;
            let path = evtpath.path;
            let offsetleft = 0;
            let offsettop = 0;

            if (path != null) {
                let len = path.length;
                for (var i = 0; i < len; i++) {
                    let domt = path[i];
                    if (domt == grid.maindom) {
                        break;
                    }
                    offsetleft = offsetleft + domt.offsetLeft;
                    offsettop = offsettop + domt.offsetTop;
                }
            }
            else {
                var rect = dom.getBoundingClientRect();
                console.log("rect");
                console.log(rect);
                console.log("dom");
                console.log(dom);
                console.log("grid");
                console.log(grid);
                offsetleft = rect.left;
                offsettop = rect.top;
            }
            ev.offsetPoint = new Point(x + offsetleft, y + offsettop);
            grid.DebugMouseDown=new Rect(ev.offsetPoint.X,ev.offsetPoint.Y,4,4); 
            grid.DoOnMouseDown(this, evt, ev);
        }
        catch (ex) {
            DataExcelConsole.log("dom.OnMouseDown", ex);
        }
        finally {

        }
        if (ev.NeedRePaint) {
            grid.RePaint();
        }
        grid.CurrentEvent = ev.CurrentEvent;
    }

    OnMouseUp(evt: MouseEvent): void {
        this.debugmode = false;
        var grid = this["Grid"] as DataExcel;
        let ev = new EventView();
        try {
            this.debugmode = true;
            ev.Canvas = evt.target;
            let dom = evt.target as HTMLElement;
            ev.Dom = dom;
            let x = evt.offsetX;
            let y = evt.offsetY;
            let evtpath = evt as any;
            let path = evtpath.path;
            let offsetleft = 0;
            let offsettop = 0;
            if (path != null) {
                let len = path.length;
                for (var i = 0; i < len; i++) {
                    let domt = path[i];
                    if (domt == grid.maindom) {
                        break;
                    }
                    offsetleft = offsetleft + domt.offsetLeft;
                    offsettop = offsettop + domt.offsetTop;
                }
            }
            else {
                var rect = dom.getBoundingClientRect();
                console.log("rect");
                console.log(rect);
                console.log("dom");
                console.log(dom);
                console.log("grid");
                console.log(grid);
                offsetleft = rect.left;
                offsettop = rect.top;
            }
            ev.offsetPoint = new Point(x + offsetleft, y + offsettop);
            grid.DoOnMouseUp(this, evt, ev);
            grid.Selectmode = SelectMode.Null;
        }
        catch (ex) {
            DataExcelConsole.log("dom.OnMouseUp", ex);
        }
        finally {

        }
        if (ev.NeedRePaint) {
            grid.RePaint();
        }
    }
    OnMouseMove(evt: MouseEvent): void {
        if (this.debugmode) {
            this.debugmode = false;
        }
        let grid = this["Grid"] as DataExcel;
        let ev = new EventView();
        try {
            let dom = evt.target as HTMLElement;
            ev.Canvas = evt.target;
            ev.Dom = dom;
            let x = evt.offsetX;
            let y = evt.offsetY;
            let evtpath = evt as any;
            let path = evtpath.path;
            let offsetleft = 0;
            let offsettop = 0;
            if (path != null) {
                let len = path.length;

                for (var i = 0; i < len; i++) {
                    let domt = path[i];
                    if (domt == grid.maindom) {
                        break;
                    }
                    offsetleft = offsetleft + domt.offsetLeft;
                    offsettop = offsettop + domt.offsetTop;
                }
            }
            else {
                var rect = dom.getBoundingClientRect();
                console.log("rect");
                console.log(rect);
                console.log("dom");
                console.log(dom);
                console.log("grid");
                console.log(grid);

                offsetleft = rect.left;
                offsettop = rect.top;
            }

            ev.offsetPoint = new Point(x + offsetleft, y + offsettop);
            grid.DoOnMouseMove(this, evt, ev);
        }
        catch (ex) {
            DataExcelConsole.log("dom.click", ex);
        }
        finally {

        }
        if (ev.NeedRePaint) {
            grid.RePaint();
        }
    }

    OnKeyPress(evt: KeyboardEvent) {
        var obj = this["Grid"] as DataExcel;
        let ev = new EventView();
        try {
            ev.Canvas = evt.target;
            let dom = evt.target as HTMLElement;
            ev.Dom = dom;
            //this.debugmode = true;
            obj.DoOnKeyPress(this, evt, ev);
        }
        catch (ex) {
            DataExcelConsole.log("dom.OnMouseDown", ex);
        }
        finally {

        }
    }
    OnKeyDown(evt: KeyboardEvent) {
        var obj = this["Grid"] as DataExcel;
        let ev = new EventView();
        try {
            ev.Canvas = evt.target;
            let dom = evt.target as HTMLElement;
            ev.Dom = dom;
            obj.DoOnKeyDown(this, evt, ev);
        }
        catch (ex) {
            DataExcelConsole.log("dom.OnMouseDown", ex);
        }
        finally {

        }
    }
    OnTouchStart(evt: TouchEvent) {
        let obj = this["Grid"] as DataExcel;
        let ev = new EventView();
        try {
            let dom = evt.target as HTMLElement;
            ev.Canvas = evt.target;
            ev.Dom = dom;
            let x = evt.touches[0].clientX;
            let y = evt.touches[0].clientY;
            let evtpath = evt as any;
            let path = evtpath.path;
            let len = path.length;
            let offsetleft = 0;
            let offsettop = 0;
            for (var i = 0; i < len; i++) {
                let domt = path[i];
                if (domt == obj.maindom) {
                    break;
                }
                offsetleft = offsetleft + domt.offsetLeft;
                offsettop = offsettop + domt.offsetTop;
            }
            ev.offsetPoint = new Point(x + offsetleft, y + offsettop);
            obj.DoOnTouchStart(this, evt, ev);
        }
        catch (ex) {
            DataExcelConsole.log("OnTouchStart", ex);
        }
        finally {

        }
        if (ev.NeedRePaint) {
            obj.RePaint();
        }
        obj.CurrentEvent = ev.CurrentEvent;
    }
    OnTouchMove(evt: TouchEvent) {
        let obj = this["Grid"] as DataExcel;
        let ev = new EventView();
        try {
            let dom = evt.target as HTMLElement;
            ev.Canvas = evt.target;
            ev.Dom = dom;
            let x = evt.touches[0].clientX;
            let y = evt.touches[0].clientY;
            let evtpath = evt as any;
            let path = evtpath.path;
            let len = path.length;
            let offsetleft = 0;
            let offsettop = 0;
            for (var i = 0; i < len; i++) {
                let domt = path[i];
                if (domt == obj.maindom) {
                    break;
                }
                offsetleft = offsetleft + domt.offsetLeft;
                offsettop = offsettop + domt.offsetTop;
            }
            ev.offsetPoint = new Point(x + offsetleft, y + offsettop);
            obj.DoOnTouchMove(this, evt, ev);
        }
        catch (ex) {
            DataExcelConsole.log("dom.click", ex);
        }
        finally {

        }
        if (ev.NeedRePaint) {
            obj.Refresh();
            obj.RePaint();
            return true;
        }
    }
    OnTouchEnd(evt: TouchEvent) {
        let obj = this["Grid"] as DataExcel;
        let ev = new EventView();
        try {
            let dom = evt.target as HTMLElement;
            ev.Canvas = evt.target;
            ev.Dom = dom;
            let x = evt.touches[0].clientX;
            let y = evt.touches[0].clientY;
            let evtpath = evt as any;
            let path = evtpath.path;
            let len = path.length;
            let offsetleft = 0;
            let offsettop = 0;
            for (var i = 0; i < len; i++) {
                let domt = path[i];
                if (domt == obj.maindom) {
                    break;
                }
                offsetleft = offsetleft + domt.offsetLeft;
                offsettop = offsettop + domt.offsetTop;
            }
            ev.offsetPoint = new Point(x + offsetleft, y + offsettop);
            obj.DoOnTouchEnd(this, evt, ev);
        }
        catch (ex) {
            DataExcelConsole.log("dom.click", ex);
        }
        finally {

        }
        if (ev.NeedRePaint) {
            obj.RePaint();
        }
    }
    OnTouchCancel(evt: TouchEvent) {
        let obj = this["Grid"] as DataExcel;
        let ev = new EventView();
        try {
            obj.DoOnTouchCancel(this, evt, ev);
        }
        catch (ex) {
            DataExcelConsole.log("dom.click", ex);
        }
        finally {

        }
        if (ev.NeedRePaint) {
            obj.RePaint();
        }
    }
    OnResize(evt: UIEvent) {
        try {
            let obj = this["Grid"] as DataExcel;
            obj.zrendermain.resize();
        }
        catch (ex) {
            DataExcelConsole.log("dom.OnResize", ex);
        }
    }

    //PAINT

    Paint() {
        this.OnDraw(this.graphic);
    }

    OnDraw(g: Graphics) {
        g.AddDrawTimes();
        this._EndReFresh = 0;
        this._BeginReFresh = 0;

        this.OnDrawGridLine(g);
        this.OnDrawBack(g)
        this.OnDrawColumn(g);
        this.OnDrawBackCell(g);
        this.OnDrawCellBack(g);
        this.OnDrawMergeCellBack(g);
        this.OnDrawRow(g);
        this.OnDrawMergeCell(g);
        this.OnDrawPrimitives(g);
        this.OnDrawRowHeader(g);
        this.OnDrawColumnHeader(g);
        this.OnDrawBorder(g);
        this.OnDrawListExtendCells(g);
        this.OnDrawSelectCells(g);
        this.OnDrawFunctionSelect(g);
        this.OnDrawMoveBorder(g);
        this.OnDrawCopyCellRect(g);
        this.OnShowMultSelectCells(g);
        this.OnDrawShowFocusedCellBorder(g);
        this.OnDrawFunctionBorder(g);
        this.OnDrawHScroll(g);
        this.OnDrawDebug(g);
        this.OnDrawGridBorder(g);
        this.OnDrawCharts(g);
    }
    OnDrawBack(g: Graphics) {
        if (this.BackColor != null) {
            g.FillRect(this.BackColor, 0, 0, this.Width, this.Height);
        }
        if (!ConvertHelper.StringIsNullOrEmpty(this.BackImage)) {
            let rect = new Rect(this.ContentLeft, this.ContentTop, this.Width, this.Height);
            g.FillRectangleImage(this.BackImage, rect, this.BackImageImageLayout, null, 1);
        }
    }
    OnDrawColumn(g: Graphics) {
        var i: number;
        var count: number;
        count = this.AllVisibleColumns.Count;

        for (i = 0; i < count; i++) {
            var column = this.AllVisibleColumns.Get(i);
            column.OnDraw(this, g);
        }
    }
    OnDrawBackCell(g: Graphics) {

    }
    OnDrawCellBack(g: Graphics) {
        var i: number;
        var count: number;
        count = this.AllVisibleRows.Count;
        for (i = 0; i < count; i++) {
            var row = this.AllVisibleRows.Get(i);
            row.OnDrawBack(this, g);
        }
    }
    OnDrawMergeCellBack(g: Graphics) {

    }
    OnDrawRow(g: Graphics) {
        var i: number;
        var count: number;
        count = this.AllVisibleRows.Count;
        for (i = 0; i < count; i++) {
            var row = this.AllVisibleRows.Get(i);
            row.OnDraw(this, g);
        }
    }
    OnDrawMergeCell(g: Graphics) {

    }
    OnDrawRowHeader(g: Graphics) {

    }
    OnDrawColumnHeader(g: Graphics) {

    }
    OnDrawGridLine(g: Graphics) {
        if (this.ShowGridLine) {
            g.DrawLine(GridLineStyle.stroke, 0, 0, this.Width, 0);
            g.DrawLine(GridLineStyle.stroke, 0, 0, 0, this.Height);
            var rhcount = this.AllVisibleRows.Count;
            var chcount = this.AllVisibleColumns.Count;
            for (var i = 0; i < rhcount; i++) {
                var row = this.AllVisibleRows.Get(i);
                for (var j = 0; j < chcount; j++) {
                    var column = this.AllVisibleColumns.Get(j);
                    var cell = row.Cells.Get(column);
                    if (cell == null) {
                        cell = this.NewCell(row, column);
                    }
                    cell.OnDrawGridLine(this, g);
                }
            }
        }
    }

    OnDrawBorder(g: Graphics) {
        var rhcount = this.AllVisibleRows.Count;
        var chcount = this.AllVisibleColumns.Count;
        for (var i = 0; i < rhcount; i++) {
            var rh = this.AllVisibleRows.Get(i);
            for (var j = 0; j < chcount; j++) {
                var ch = this.AllVisibleColumns.Get(j);
                var cell = rh.Cells.Get(ch);
                if (cell != null) {
                    cell.OnDrawBorder(this, g);
                }
            }
        }
    }
    OnDrawListExtendCells(g: Graphics) {

    }
    OnDrawSelectCells(g: Graphics) {

        if (this.ShowSelectBorder) {
            if (this.FocusedCell != null) {
                if (this.InVisible(this.FocusedCell)) {
                    if (this.FocusedCell.ShowFocusedSelectBorder) {
                        g.FillRectangleStyle(FocusedCellStyle, this.FocusedCell.Rect);
                    }
                }
            }
            if (!this.InEdit) {
                if (this.SelectCells != null) {
                    //let drawselectcells = true;
                    if (this.SelectCells.BeginCell != this.SelectCells.EndCell) {

                        g.FillRectStyle(SelectCellsStyle,
                            this.SelectCells.Left, this.SelectCells.Top, this.SelectCells.Width, this.SelectCells.Height);

                        //g.FillRectangle("red", this.SelectCells.Left, this.SelectCells.Top, this.SelectCells.Width, this.SelectCells.Height);
                    }
                    g.FillRectStyle(SelectCellsStyleAdd,
                        this.SelectCells.Right - 2, this.SelectCells.Bottom - 2, 4, 4, Cursors.crosshair, 99);
                }
                if (this.SelectAddRectCollection != null) {
                    //this.SelectAddRectCollection.OnDraw(this, g);
                    g.FillRectStyle(SelectCellsAddStyle,
                        this.SelectAddRectCollection.Left, this.SelectAddRectCollection.Top,
                        this.SelectAddRectCollection.Width, this.SelectAddRectCollection.Height);
                }

                //if (this.MergeCellCollectionRect != null)
                //{
                //    this.MergeCellCollectionRect.OnDraw(g);
                //}
                //if (this.MergeCellCollectionAddRect != null)
                //{
                //    this._MergeCellCollectionAddRect.OnDraw(g);
                //}
            }
        }

    }
    OnDrawMoveBorder(g: Graphics) {

    }
    OnDrawCopyCellRect(g: Graphics) {

    }
    OnShowMultSelectCells(g: Graphics) {

    }
    OnDrawShowFocusedCellBorder(g: Graphics) {
        //if (this.FocusedCell != null)
        //{
        //    if (this.InVisible(this.FocusedCell))
        //    {
        //        if (this.ShowFocusedCellBorder)
        //        {
        //            g.DrawRectangle(SelectStyle.FouscedCellSelectBorderColor,
        //                this.FocusedCell.Left, this.FocusedCell.Top,
        //                this.FocusedCell.Width, this.FocusedCell.Height);
        //        }
        //    }
        //}
    }
    OnDrawFunctionBorder(g: Graphics) {

    }
    OnDrawFunctionSelect(g: Graphics) {
        //if (this.FunctionSelectCells != null)
        //{
        //    this.FunctionSelectCells.OnDraw(this, g);
        //}
    }

    OnDrawGridBorder(g: Graphics) {
        if (this.ShowBorder) {
            g.DrawRectangle(this.BorderColor, 0, 0, this.Width - 1, this.Height - 1);
        }
        else {
            //this.DrawGridLine(g, 0, 0, 0, this.Height);
        }
    }
    OnDrawHScroll(g: Graphics) {
        this.VScroll.OnDraw(g);
        this.HScroll.OnDraw(g);
    }
    OnDrawDebug(g: Graphics) {
        try {
            if (this.DebugRect != null) {
                g.FillRectangleColor("red", this.DebugRect);
                g.DrawTextColor(this.Font, "red", this.DebugText, this.ContentLeft, this.ContentTop);
                g.DrawTextColor(this.Font, "red", this.DebugText2, this.ContentLeft, this.ContentTop + 30);
            }
            if (this.DebugMouseDown != null) {
                g.FillRectangleColor("blue", this.DebugMouseDown); 
            }
            let now = new Date();
            let timespan = now.getTime() - this.StartTime.getTime();
            if ((timespan / 1000 / 60 / 60) > 2) {
                if (!this.isRegistered(this.RegisteredCode)) {
                    let NotRegistered = "Not Registered";
                    g.DrawText(this.Font, "red", NotRegistered, this.Width - 150, 36, 100, 100, "left", 0.5);
                }
            }
        } catch (e) {
            DataExcelConsole.log("OnDrawDebug rowindex", e);
        }

    }
    OnDrawCharts(g: Graphics) {
        try {
            this.Charts.forEach((chart: Chart) => {
                chart.OnDrawBack(this, g);
            });
        } catch (e) {
            DataExcelConsole.log("OnDrawDebug rowindex", e);

        }

    }
    OnDrawPrimitives(g: Graphics) {
        try {
            this.Primitives.forEach((chart: Primitive) => {
                chart.OnDrawBack(this, g);
            });
        } catch (e) {
            DataExcelConsole.log("OnDrawDebug rowindex", e);

        }

    }
    Invalidate() {

    }
    BeginReFresh() {

    }
    EndReFresh() {
    }
    GetGraphics() {
        return this.graphic;
    }
    MeasureString(text: any, font: any) {
        var graphics = this.GetGraphics();
        var metrics = graphics.MeasureText(text, font);
        return metrics.width;
    }
    //NEW
    NewRow(grid: any, index: any) {
        let row = new DataExcelRow();
        row.Index = index;
        row.Grid = grid;
        row.Height = this.DefaultRowHeight
        return row;
    }
    NewColumn(grid: any, index: any) {
        let row = new DataExcelColumn();
        row.Index = index;
        row.Grid = grid;
        row.Width = this.DefaultColumnWidth;
        return row;
    }
    NewCell(row: DataExcelRow, column: DataExcelColumn) {
        let cell = new DataExcelCell();
        cell.Grid = this;
        cell.Row = row;
        cell.Column = column;
        if (column == null) {
            DataExcelConsole.log("dataexcel NewCell", "column is null");
        }
        row.Cells.Add(cell);
        cell.OwnEditControl = DefaultEdit.GetDefauleEdit(cell);
        return cell;
    }
    NewMergeCell(grid: any, selectcells: SelectCellCollection) {
        let model = new DataExcelMergeCell();
        model.Grid = grid;
        if (selectcells.BeginCell != null) {
            model.BeginCell = selectcells.BeginCell;
        }
        if (selectcells.EndCell != null) {
            model.EndCell = selectcells.EndCell;
        }
        this.MergeCells.Add(model);
        return model;
    }
    NewBackCell(grid: any, selectcells: SelectCellCollection) {
        let model = new DataExcelBackCell();
        model.Grid = grid;
        if (selectcells.BeginCell != null) {
            model.BeginCell = selectcells.BeginCell;
        }
        if (selectcells.EndCell != null) {
            model.EndCell = selectcells.EndCell;
        }
        this.BackCells.Add(model);
        return model;
    }
    NewChart() {
        let sel = this.SelectCells;
        if (sel != null) {
            let chart = new Chart();
            chart.Grid = this;
            chart.Left = sel.Left;
            chart.Top = sel.Top;
            chart.Width = sel.Width;
            chart.Height = sel.Height;
            chart.Init();
            this.Charts.Add(chart);
            return chart;
        }
        return null;
    }
    NewPrimitive() {
        let sel = this.SelectCells;
        if (sel != null) {
            let chart = new Primitive();
            chart.Grid = this;
            chart.Left = sel.Left;
            chart.Top = sel.Top;
            chart.Width = sel.Width;
            chart.Height = sel.Height;
            this.Primitives.Add(chart);
            return chart;
        }
        return null;
    }
    //RowColumn
    DeleteRow(index: any) {
        this.Rows.Delete(index);
        let list = new List<DataExcelRow>();
        this.Rows.forEach((value, key) => {
            list.add(value);
            if (value.Index > index) {
                value.Index = value.Index - 1;
            }
        });
        this.Rows.Clear();
        list.forEach((value) => {
            this.Rows.Add(value.Index, value);
        });
    }
    DeleteColumn(index: any) {
        this.Columns.Delete(index);

        let list = new List<DataExcelColumn>();
        this.Columns.forEach((value, key) => {
            list.add(value);
            if (value.Index > index) {
                value.Index = value.Index - 1;
            }
        });
        this.Columns.Clear();
        list.forEach((value) => {
            this.Columns.Add(value.Index, value);
        });
    }
    InsertRow(index: any) {
        let list = new List<DataExcelRow>();
        this.Rows.forEach((value, key) => {
            list.add(value);
            if (value.Index >= index) {
                value.Index = value.Index + 1;
            }
        });
        this.Rows.Clear();
        list.forEach((value) => {
            this.Rows.Add(value.Index, value);
        });
    }
    InsertColumn(index: any) {
        let list = new List<DataExcelColumn>();
        this.Columns.forEach((value, key) => {
            list.add(value);
            if (value.Index >= index) {
                value.Index = value.Index + 1;
            }
        });
        this.Columns.Clear();
        list.forEach((value) => {
            this.Columns.Add(value.Index, value);
        });
    }
    DeleteCellRow(cells: SelectCellCollection) {
        if (cells == null) {
            return;
        }
        let maxcolumn = cells.MaxColumn();
        let mincolumn = cells.MinColumn();
        let minrow = cells.MinRow();
        let maxrow = cells.MaxRow();
        for (let rowindex = minrow; rowindex <= maxrow; rowindex++) {
            let row = this.Rows.Get(rowindex);
            if (row == null) {
                continue;
            }
            for (let columnindex = mincolumn; columnindex <= maxcolumn; columnindex++) {
                let column = this.Columns.Get(columnindex);
                if (column == null) {
                    continue;
                }
                let cell = row.Cells.Get(column);
                row.Cells.Remove(column);
            }
        }
        let count = maxrow - minrow + 1;

        this.Rows.forEach((row, key) => {
            if (row.Index > maxrow) {
                let targetrow = this.Rows.Get(row.Index - count) as DataExcelRow;
                if (targetrow != null) {
                    for (let columnindex = mincolumn; columnindex <= maxcolumn; columnindex++) {
                        let column = this.Columns.Get(columnindex);
                        if (column != null) {
                            let cell = row.Cells.Get(column) as DataExcelCell;
                            if (cell != null) {
                                cell.Row = targetrow;
                                targetrow.Cells.Add(cell);
                                row.Cells.Remove(column);
                            }
                        }
                    }
                }
            }
        });
    }
    InsertCellRow(cells: SelectCellCollection) {
        if (cells == null) {
            return;
        }
        let maxcolumn = cells.MaxColumn();
        let mincolumn = cells.MinColumn();
        let minrow = cells.MinRow();
        let maxrow = cells.MaxRow();

        let count = maxrow - minrow + 1;
        let list = new List<DataExcelRow>();
        this.Rows.forEach((row, key) => {
            if (row.Index >= minrow) {
                list.Add(row);
            }
        });
        list.sort((a, b) => {
            return a.Index - b.Index;
        });
        let rowcount = list.Count;
        for (var i = rowcount - 1; i >= 0; i--) {
            let row = list[i];
            let targetrow = this.Rows.Get(row.Index + count) as DataExcelRow;
            if (targetrow != null) {
                for (let columnindex = mincolumn; columnindex <= maxcolumn; columnindex++) {
                    let column = this.Columns.Get(columnindex);
                    if (column != null) {
                        let cell = row.Cells.Get(column) as DataExcelCell;
                        if (cell != null) {
                            cell.Row = targetrow;
                            targetrow.Cells.Add(cell);
                            row.Cells.Remove(column);
                        }
                    }
                }
            }
        }
    }

    DeleteCellColumn(cells: SelectCellCollection) {
        if (cells == null) {
            return;
        }
        let maxcolumn = cells.MaxColumn();
        let mincolumn = cells.MinColumn();
        let minrow = cells.MinRow();
        let maxrow = cells.MaxRow();
        let listrow = new List<DataExcelRow>();
        for (let rowindex = minrow; rowindex <= maxrow; rowindex++) {
            let row = this.Rows.Get(rowindex);
            if (row == null) {
                continue;
            }
            if (!listrow.contains(row)) {
                listrow.Add(row);
            }
            for (let columnindex = mincolumn; columnindex <= maxcolumn; columnindex++) {
                let column = this.Columns.Get(columnindex);
                if (column == null) {
                    continue;
                }
                let cell = row.Cells.Get(column);
                row.Cells.Remove(column);
            }
        }
        let count = maxcolumn - mincolumn + 1;

        listrow.forEach((row) => {
            this.Columns.forEach((column, key) => {
                if (column.Index > maxcolumn) {
                    let targetcolumn = this.Columns.Get(column.Index - count);
                    if (targetcolumn != null) {
                        let cell = row.Cells.Get(column) as DataExcelCell;
                        if (cell != null) {
                            row.Cells.Remove(column);
                            cell.Column = targetcolumn;
                            row.Cells.Add(cell);

                        }
                    }
                }
            });
        });
    }
    InsertCellColumn(cells: SelectCellCollection) {
        if (cells == null) {
            return;
        }
        let maxcolumn = cells.MaxColumn();
        let mincolumn = cells.MinColumn();
        let minrow = cells.MinRow();
        let maxrow = cells.MaxRow();
        let listrow = new List<DataExcelRow>();
        for (let rowindex = minrow; rowindex <= maxrow; rowindex++) {
            let row = this.Rows.Get(rowindex);
            if (row == null) {
                continue;
            }
            if (!listrow.contains(row)) {
                listrow.Add(row);
            }
        }
        let count = maxcolumn - mincolumn + 1;
        let list = new List<DataExcelColumn>();
        this.Columns.forEach((row, key) => {
            if (row.Index >= mincolumn) {
                list.Add(row);
            }
        });
        list.sort((a, b) => {
            return a.Index - b.Index;
        });
        listrow.forEach((row) => {
            let countcolumn = list.Count;
            for (var i = countcolumn - 1; i >= 0; i--) {
                let column = list.get(i);
                if (column.Index >= mincolumn) {
                    let targetcolumn = this.Columns.Get(column.Index + count);
                    if (targetcolumn != null) {
                        let cell = row.Cells.Get(column) as DataExcelCell;
                        if (cell != null) {
                            row.Cells.Remove(column);
                            cell.Column = targetcolumn;
                            row.Cells.Add(cell);

                        }
                    }
                }
            };
        });
    }

    // FIRST DISPLAY
    InitRowHeader(top: any) {
        let rowindex = 0;
        let row: DataExcelRow | undefined | null = this.HeaderRow;
        let value = top;
        if (row == null) {
            row = this.Rows.Get(rowindex);
            if (row == null) {
                if (this.AutoGenerateRows) {
                    row = this.NewRow(this, rowindex);
                    row.Height = 26;
                    this.Rows.Add(rowindex, row);
                }
            }
            if (row != null) {
                row.Visible = this.ShowColumnHeader;
                if (row.Visible) {
                    this.AllVisibleRows.Add(row);
                    row.Top = top;
                    value = top + row.Height;
                }
            }
        }
        return value;
    }
    InitColumnHeader(left: any) {
        let columnindex = 0;
        let column: DataExcelColumn | undefined | null = this.HeaderColumn;
        let value = left;

        if (column == null) {
            column = this.Columns.Get(columnindex);
            if (column == null) {
                if (this.AutoGenerateColumns) {
                    column = this.NewColumn(this, columnindex);
                    column.Width = 30;
                    this.Columns.Add(columnindex, column);
                }
            }
            if (column != null) {
                column.Visible = this.ShowRowHeader;
                if (column.Visible) {
                    this.AllVisibleColumns.Add(column);
                    column.Left = left;
                    if (this.FirstDisplayedRowIndex + 50 > 1000) {
                        let w = 30 + (30 / 4) * (Math.round(this.FirstDisplayedRowIndex / 1000).toString()).length;
                        column.Width = w;
                    }
                    else {
                        column.Width = 30;
                    }
                    value = left + column.Width;
                }
            }
        }
        return value;
    }
    SetFirstDisplayRow(index: any) {
        try {
            this.BeginReFresh();
            if (index > this.MaxRow) {
                index = this.MaxRow;
            }
            if (index < 1) {
                index = 1;
            }

            var top = this.TopSideHeight;
            this.AllVisibleRows.Clear();
            this.VisibleRows.Clear();
            var row: DataExcelRow | undefined | null = null;
            top = this.InitRowHeader(top);
            this.ContentTop = top;

            var height = 0;
            var listtemp = new DataExcelRowList();
            this.ContentBottom = height;
            var i = 0;
            var res = this.SetFirstDisplayFrozenFooterIndex(top, i);
            top = res.h;
            i = res.index;
            var rowindex = i + this.FirstDisplayedRowIndex;
            var h = top;
            while (top <= (this.Height - height)) {
                rowindex = i + this.FirstDisplayedRowIndex;
                if (this.MaxRow > 0) {
                    if (rowindex > this.MaxRow) {
                        break;
                    }

                }
                row = this.Rows.Get(rowindex);
                if (row == null) {
                    if (this.AutoGenerateRows) {
                        row = this.NewRow(this, rowindex);
                        this.Rows.Add(rowindex, row);
                    }
                }
                if (row != null) {
                    if (row.Visible) {
                        this.AllVisibleRows.Add(row);
                        this.VisibleRows.Add(row);
                        row.Top = top;
                        var rindex = i + index;
                        this.EndDisplayedRowIndex = rowindex;
                        top += row.Height;
                    }

                }
                i++;
            }
            var len = listtemp.Count;
            for (var i = 0; i < len; i++) {
                this.AllVisibleRows.Add(listtemp.Get(i));
            }


        }
        finally {
            this.AutoShowScroll();
            this.EndReFresh();
        }
    }
    SetFirstDisplayColumn(index: any) {

        if (index < 1) {
            index = 1;
        }

        if (index > this.MaxColumn) {
            index = this.MaxColumn;
        }

        var tempcolindex = index;
        index = tempcolindex;
        this.FirstDisplayedColumnIndex = index;
        var i = 0;
        var width = this.LeftSideWidth;
        this.AllVisibleColumns.Clear();
        this.VisibleColumns.Clear();
        width = this.InitColumnHeader(width);

        this.ContentLeft = width;
        var height2 = 0;
        this.ContentRight = height2;
        var res = this.SetFrozenColumn(i, width);
        width = res.w;
        i = res.index;
        this.SetColumnWidthByFirstIndex(i, width, index);

        this.AutoShowScroll();
    }
    SetColumnWidthByFirstIndex(i: any, width: any, index: any) {
        var column: DataExcelColumn | undefined | null = null;
        var columnindex = i + this.FirstDisplayedColumnIndex;
        var ci = columnindex;
        for (ci = columnindex; ci <= this.MaxColumn; ci++) {
            if (width < this.Width) {
                columnindex = i + this.FirstDisplayedColumnIndex;
                if (columnindex > this.MaxColumn) {
                    break;
                }
                column = this.Columns.Get(columnindex);
                if (column == null) {
                    if (this.AutoGenerateColumns) {
                        column = this.NewColumn(this, columnindex);
                        this.Columns.Add(columnindex, column);
                    }
                }
                if (column != null) {
                    if (column.Visible) {
                        this.AllVisibleColumns.Add(column);
                        this.VisibleColumns.Add(column);
                        column.Left = width;
                        //int colindex = i + index;
                        width = width + column.Width;
                        this.EndDisplayedColumnIndex = columnindex;
                    }
                }
                i++;
            }
            else {
                break;
            }
        }
    }
    SetFrozenColumn(i: any, width: any) {
        var column: DataExcelColumn | undefined | null = null;
        if (this.FrozenColumn > 0) {
            var colindex = 0;
            var ci = colindex;
            for (ci = colindex; ci < this.FrozenColumn; ci++) {
                colindex = colindex + 1;
                column = this.Columns.Get(colindex);
                if (column != null) {
                    if (column.Visible) {
                        this.AllVisibleColumns.Add(column);
                        this.VisibleColumns.Add(column);
                        column.Left = width;
                        width = width + column.Width;
                    }
                }
                i++;
            }
        }
        var obj = { w: width, index: i };
        return obj;
    }
    SizeRowHeader() {
        var count: number;
        count = this.VisibleRows.Count;
        for (var i = 0; i < count; i++) {
            var row = this.VisibleRows.Get(i);
            var col = this.Columns.Get(0);
            if (col != null) {
                var g = this.GetGraphics();
                if (g == null)
                    return;
                var sf = g.MeasureText("" + row.Index + "", this.Font);
                if (sf.width > col.Width) {
                    col.Width = sf.width;
                }
                else {
                    if (col.Width > 40 && sf.width < 40) {
                        col.Width = 40;
                    }
                }
            }
        }
    }
    AutoShowScroll() {
    }
    SetFirstDisplayFrozenFooterIndex(height: any, i: any) {
        var row: DataExcelRow | undefined | null = null;
        if (this.FrozenRow > 0) {
            var colindex = 0;
            while (height < this.Height) {
                colindex = colindex + 1;
                if (this.FrozenRow < colindex) {
                    break;
                }
                row = this.Rows.Get(colindex);
                if (row != null) {
                    if (row.Visible) {
                        this.AllVisibleRows.Add(row);
                        this.VisibleRows.Add(row);
                        row.Top = height;
                        height = height + row.Height;
                    }
                }
                i++;
            }
        }
        var obj = { h: height, index: i };
        return obj;
    }
    PointControlToView(point: any) {
        return point;
    }

    AddEdit(edit: any) {
        this.CurrentEdit = edit;
        this.CopyCells = null;
    }
    EndEdit() {
        if (this.CurrentEdit == null) {
            this.emit(Events.EndEdit, this, this.FocusedCell, this.CurrentEdit);
        }
        if (this.FocusedCell != null) {
            this.FocusedCell.EndEdit();
        }
        this.EditCell = null;
        if (this.CurrentEdit != null) {
            this.CurrentEdit.EndEdit();
            this.CurrentEdit = null;
        }
    }
    GetCellByPoint(pt: Point): DataExcelCell | null {
        let rowcount = this.AllVisibleRows.Count;
        let row: DataExcelRow | null = null;
        for (var i = 0; i < rowcount; i++) {
            let row1 = this.AllVisibleRows.Get(i);
            if (pt.Y > row1.Top && pt.Y <= (row1.Top + row1.Height)) {
                row = row1;
                break;
            }
        }
        if (row == null) {
            return null;
        }
        let columncount = this.AllVisibleColumns.Count;
        let column: DataExcelColumn | null = null;
        for (var i = 0; i < columncount; i++) {
            let column1 = this.AllVisibleColumns.Get(i);
            if (pt.X > column1.Left && pt.X <= (column1.Left + column1.Width)) {
                column = column1;
                break;
            }
        }
        if (row == null) {
            return null;
        }
        if (column == null) {
            return null;
        }
        var cell = row.Cells.Get(column);
        if (cell == null) {
            cell = this.NewCell(row, column);
        }
        return cell;
    }

    GetFocusedCell(): DataExcelCell | null {
        return this._focusedcell;
    }
    SetFocusedCell(cell: DataExcelCell) {
        this.BeginReFresh();
        this.EndEdit();
        let cel = cell;
        //if (cell != null)
        //{
        //    if (cell.OwnMergeCell != null)
        //    {
        //        cel = cell.OwnMergeCell;
        //    }
        //}
        if (cel.OwnMergeCell != null) {
            this.FocusedCell = cel.OwnMergeCell;
        }
        else {
            this.FocusedCell = cel;
        }
        this.emit(Events.FocusedCellChanged, this, this.FocusedCell);
        //this._ICellEvents = this._focusedcell;
        //if (FocusedCellChanged != null)
        //{
        //    FocusedCellChanged(this, this._focusedcell);
        //}
        this.EndReFresh();
    }
    SetSelectCells(begin: any, end?: any) {
        if (this.SelectCells == null) {
            this.SelectCells = new SelectCellCollection();
            this.SelectCells.Grid = this;
        }
        let cellbegin = begin as DataExcelCell;
        if (cellbegin.OwnMergeCell != null) {
            this.SelectCells.BeginCell = cellbegin.OwnMergeCell.BeginCell;
        }
        else {
            this.SelectCells.BeginCell = cellbegin;
        }
        if (end == null) {
            if (cellbegin.OwnMergeCell != null) {
                this.SelectCells.EndCell = cellbegin.OwnMergeCell.EndCell;
                this.SelectCells.Refresh();
            }
            else {
                this.SelectCells.EndCell = cellbegin;
                this.SelectCells.Refresh();
            }
        }
        else {
            let cellend = end as DataExcelCell;
            if (cellend.OwnMergeCell != null) {
                this.SelectCells.EndCell = cellbegin.OwnMergeCell.EndCell;
                this.SelectCells.Refresh();
            }
            else {
                this.SelectCells.EndCell = cellend;
                this.SelectCells.Refresh();
            }
        }

    }
    GetSelectCells(): object {
        let list = new List<DataExcelCell>();
        if (this.SelectRange.Count < 1) {
            if (this.SelectCells != null) {
                list = this.SelectCells.GetAllCells();
            }
            else if (this.FocusedCell != null) {
                if (this.FocusedCell.OwnMergeCell != null) {
                    list.Add(this.FocusedCell.OwnMergeCell);
                }
                else {
                    list.Add(this.FocusedCell);
                }
            }
        }
        else {
            list = (this.SelectRange);
        }
        return list;
    }
    GetSelectChart(): Chart | null {
        for (var i = 0; i < this.Charts.length; i++) {
            let chart = this.Charts[i];
            if (chart.Selected) {
                return chart;
            }
        }
        return null;
    }
    GetSelectPrimitive(): Primitive | null {
        for (var i = 0; i < this.Primitives.length; i++) {
            let chart = this.Primitives[i];
            if (chart.Selected) {
                return chart;
            }
        }
        return null;
    }
    //Custom Event
    On(eventname: any, functioncallback: any) {
        this.EventHandlers.on(eventname, functioncallback);
    }
    Off(eventname: any, functioncallback: any) {
        this.EventHandlers.off(eventname, functioncallback);
    }
    emit(eventname: any, ...args: any) {
        this.EventHandlers.emit(eventname, args);
    }

    RaiseCellInitEditEvent(cell: DataExcelCell) {
        this.emit(Events.CellInitEdit, cell, this);
    }
    private RegisteredCode = "";
    public isRegistered(txt: any) {
        this.RegisteredCode = txt;
        let host = window.location.host;
        let txt2 = host + " are registered from dataexcel";
        if (txt == txt2) {
            return true;
        }
        return false;
    }
    //ONEVENT
    ClearSelect() {
        this.Charts.forEach((chart: Chart) => { chart.Selected = false; });
        this.Primitives.forEach((chart: Primitive) => {
            chart.Selected = false;
            chart.Displayables.forEach((disp: Displayable) => {
                disp.Selected = false;
            });
        });

        //  var cs = this.GetSelectCells();
        //foreach(ICell cell in cs)
        //{
        //    cell.Selected = false;
        //}
        //this.FunctionSelectCells = null;

        this.SelectCells = null;
        //this.MergeCellCollectionRect = null;
        //this.SelectAddRectCollection = null;
        //this.TempSelectRect = null;
        //  var count = this.Selecteds.Count;
        //for ( var index = count - 1; index >= 0; index--)
        //{
        //    var row = this.Selecteds[index];
        //    row.Selected = false;
        //}
        //this.SelectRows.Clear();
        //this.SelectColumns.Clear();
        //this.Selecteds.Clear();
        //if (this.MergeCells != null)
        //{
        //    count = this.MergeCells.Count;
        //    for (int index = count - 1; index >= 0; index--)
        //    {
        //        IMergeCell imc = this.MergeCells[index];
        //        imc.Selected = false;
        //    }
        //}
        //if (this.ListExtendCells != null)
        //{
        //    count = this.ListExtendCells.Count;
        //    for (int index = count - 1; index >= 0; index--)
        //    {
        //        IExtendCell imc = this.ListExtendCells[index];
        //        imc.Selected = false;
        //    }
        //}
    }
    OnMouseDownScroll(e: any, ve: EventView) {
        if (this.VScroll.Visible) {
            let res = this.VScroll.OnMouseDown(this, e, ve);
            if (res) {
                this.FirstDisplayedRowIndex = Math.round(this.VScroll.Value);
                this.Refresh();
                this.RePaint();
                ve.NeedRePaint = true;
                ve.CurrentEvent = this.VScroll;
                return res;
            }
        }

        if (this.HScroll.Visible) {
            let res = this.HScroll.OnMouseDown(this, e, ve);
            if (res) {
                this.FirstDisplayedColumnIndex = Math.round(this.HScroll.Value);
                this.Refresh();
                this.RePaint();
                ve.NeedRePaint = true;
                ve.CurrentEvent = this.HScroll;
                return res;
            }
        }
        return false;
    }
    SetDataExcelMouseDown(e: any) {
        return false;
    }
    SetScrollerMouseDown(e: any) {
        return false;
    }
    SetExtendCellMouseDown(e: any) {
        return false;
    }
    SetMergeCellCollectionRectMouseDown(e: any) {
        return false;
    }
    SetSelectCellCollectionMouseDown(e: MouseEvent) {
        let viewloaction = this.PointControlToView(new Point(e.offsetX, e.offsetY));
        let pt = viewloaction;
        if (this.ShowSelectAddRect) {
            if (this.SelectCells != null) {
                if (this.SelectCells.AddRectContains(pt)) {
                    this.BeginReFresh();
                    this.BeginSetCursor(Cursors.crosshair);
                    if (this.SelectAddRectCollection == null) {
                        this.SelectAddRectCollection = new SelectAddRectCollection(this);
                    }
                    this.SelectAddRectCollection.SelectCellCollection = this.SelectCells;

                    this.Selectmode = SelectMode.CellAddSelected;

                    this.EndReFresh();
                    return true;
                }
            }
        }
        return false;
    }
    SetCellMouseDown(sender: any, e: MouseEvent, ve: EventView): boolean {
        let point = new Point(e.offsetX, e.offsetY);
        let viewloaction = this.PointControlToView(point);
        let pt = viewloaction;

        let cell = this.GetCellByPoint(pt);
        if (cell != null) {
            if (e.button == MouseButtons.Right) {
                //if (this.SelectCells != null)
                //{
                //    if (this.SelectCells.Rect.Contains(pt))
                //    {
                //        return true;
                //    }
                //}
            }


            if (this.Selectmode != SelectMode.Null) {

                //if (this.Selectmode == SelectMode.CellRangeFunctionCellSelected)
                //{
                //    this.BeginReFresh();
                //    if (e.ctrlKey)
                //    {
                //        if (FunctionSelectCells == null)
                //        {
                //            FunctionSelectCells = new CellRangeCollection();
                //            FunctionSelectCells.BeginCell = cell;
                //            OnFunctionSelectCellChanged(FunctionSelectCells);
                //            this.Invalidate();
                //        }
                //    }
                //    else
                //    {
                //        this.OnFunctionSelectedFinish();
                //    }
                //    this.EndReFresh();
                //}
                //return true;
            }
            if (cell.OnMouseDown(sender, e, ve)) {
                return true;
            }
            if (e.button == MouseButtons.Left) {
                this.Selectmode = SelectMode.CellSelected;
            }
            this.BeginReFresh();
            this.ClearSelect();
            this.SetSelectCells(cell);
            cell.Selected = true;

            if (e.ctrlKey) {
                let fcell = this.GetFocusedCell();
                if (fcell != null) {
                    this.SelectRange.Add(fcell);
                    this.SelectRange.Add(cell);
                }
            }
            else {
                this.SelectRange.Clear();
            }
            if (e.shiftKey) {
                //this.SelectCell(this.FocusedCell, cell);
            }
            this.SetFocusedCell(cell);
            e.stopPropagation();
            ve.NeedRePaint = true;
            ve.CurrentEvent = cell;
            //this.MouseDownCell = cell;
            //this.AddFocsedCellMark(cell);
            //if (this.FocusedCell != null)
            //{
            //    this.FocusedCell.OnMouseDown(this, e, ve);
            //}
            //if (this.SelectRange.Count > 0)
            //{
            //    OnSelectRangeChanged(this.SelectRange);
            //}  
            this.EndReFresh();
            return true;
        }
        return false;
    }

    OnException(ex: any) {

    }
    //DO event
    DoOnMouseUp(sender: any, e: MouseEvent, ve: EventView) {
        if (this.CurrentEvent != null) {
            if (this.CurrentEvent.OnMouseUp(this, e, ve)) {
                return;
            }
        }
        let result = false;
        result = this.DoOnMouseUpChart(sender, e, ve);
        if (result)
            return true;
        result = this.DoOnMouseUpPrimitive(sender, e, ve);
        if (result)
            return true;
        if (e.button == MouseButtons.Right) {
            return;
        }

        switch (this.Selectmode) {
            case SelectMode.CellAddSelected:
                //this.BeginReFresh();
                this.UpdateSelectAddRect();
                ve.NeedRePaint = true;
                this.SelectAddRectCollection = null;
                //this.EndReFresh();
                break;
            case SelectMode.MergeCellAddSelected:
                //this.BeginReFresh();
                //DoMergeCellCollectionAddRectDown(this.MergeCellCollectionAddRect);
                //this.EndReFresh();
                break;
            default:
                this.SelectAddRectCollection = null;
                //this._MergeCellCollectionAddRect = null;

                break;
        }
        this.Selectmode = SelectMode.Null;

    }
    DoOnMouseDown(sender: any, e: MouseEvent, ve: EventView): boolean {
        try {
            if (this.CurrentEvent != null) {
                if (this.CurrentEvent.OnMouseDown(this, e, ve)) {
                    return true;
                }
            }
            var point = { x: e.offsetX, y: e.offsetY };
            var viewloaction = this.PointControlToView(point);
            this.MouseDownPoint = viewloaction;
            let result = false;
            result = this.DoOnMouseDownChart(sender, e, ve);
            if (result)
                return true;
            result = this.DoOnMouseDownPrimitive(sender, e, ve);
            if (result)
                return true;
            //if (this.CellEvent != null)
            //{
            //    if (this.CellEvent.OnMouseDown(this, e, ve))
            //    {
            //        return true;
            //    }
            //}
            if (this.FocusedCell != null) {
                let point = viewloaction;
                if (this.maindom == e.target) {
                    if (!this.FocusedCell.Rect.Contains(point)) {
                        if (this.CurrentEdit != null) {
                            this.EndEdit();
                        }
                    }
                }
            }
            if (e.button == MouseButtons.Right) {
                if (this.SetCellMouseDown(sender, e, ve)) {
                }
                return false;
            }
            else if (e.button == MouseButtons.Left) {
                if (this.OnMouseDownScroll(e, ve)) {
                    return true;
                }
                if (this.SetDataExcelMouseDown(e)) {
                    return true;
                }
                if (this.SetScrollerMouseDown(e)) {
                    return true;
                }
                if (this.SetExtendCellMouseDown(e)) {
                    return true;
                }
                if (this.SetMergeCellCollectionRectMouseDown(e)) {
                    return true;
                }
                if (this.SetSelectCellCollectionMouseDown(e)) {
                    return true;
                }
            }

            if (this.SetCellMouseDown(sender, e, ve)) {
                return true;
            }

        }
        catch (ex) {
            DataExcelConsole.log("DoOnMouseDown", ex);
            this.OnException(ex);
        }
        finally {
        }
        return false;
    }
    DoOnMouseMove(sender: any, e: MouseEvent, ve: EventView) {
        this.DebugRect = new Rect(ve.offsetPoint.X, ve.offsetPoint.Y, 4, 4);
        if (this.CurrentEvent != null) {
            if (this.CurrentEvent.OnMouseMove(this, e, ve)) {
                return true;
            }
        }
        let result = false;
        result = this.DoOnMouseMoveChart(sender, e, ve);
        if (result)
            return true;
        result = this.DoOnMouseMovePrimitive(sender, e, ve);
        if (result)
            return true;
        let res = false;
        switch (this.Selectmode) {
            case SelectMode.Null:
                res = this.SelectModeNullMouseMove(e, ve);
                break;
            //case SelectMode.RowHeaderSelected:
            //    break;
            //case SelectMode.RowHeaderSplitSelected:
            //    break;
            //case SelectMode.FullRowSelected:
            //    this.BeginReFresh();
            //    //SelectModeRowHeaderSelectedMouseMove(e);
            //    this.EndReFresh();
            //    break;
            //case SelectMode.ColumnHeaderSelected:

            //    break;
            //case SelectMode.ColumnHeaderSplitSelected:
            //    this.BeginReFresh();
            //    this.EndReFresh();
            //    break;
            //case SelectMode.FullColumnSelected:
            //    this.BeginReFresh();
            //    //SelectModeColumnHeaderSelectedMouseMove(e);
            //    this.EndReFresh();
            //    break;
            case SelectMode.CellSelected:

                if (this.MultiSelect) {
                    this.BeginReFresh();
                    res = this.SelectModeCellSeletedMouseMove(ve);
                    this.SetSelectCellRowSelect();
                    this.EndReFresh();
                }
                break;
            //case SelectMode.CellRangeFunctionCellSelected:
            //    this.BeginReFresh();
            //    //SCellRangeFunctionCellSelectedMouseMove(e);
            //    this.EndReFresh();
            //    break;
            //case SelectMode.MergeCellSelected:
            //    this.BeginReFresh();
            //    //SelectModeMergeCellSelectedMouseMove(e);
            //    this.EndReFresh();
            //    break;
            //case SelectMode.MergeCellAddSelected:
            //    this.BeginReFresh();
            //    //SelectModeMergeCellAddSelectedMouseMove(e);
            //    this.EndReFresh();
            //    break;
            //case SelectMode.ImageCellSelected:
            //    this.BeginReFresh();
            //    //SelectModeImageMouseMove(e);
            //    this.EndReFresh();
            //    break;
            case SelectMode.CellAddSelected:
                this.BeginReFresh();
                res = this.SelectModeCellAddSelectedMouseMove(e);
                this.EndReFresh();
                break;
            //case SelectMode.TextCellSelected:
            //    this.BeginReFresh();
            //    //SelectModeTextMouseMove(e);
            //    this.EndReFresh();
            //    break;
            //case SelectMode.ExtendCellSizeRectSelected:
            //    this.BeginReFresh();
            //    //TextCellSizeRectSelected(e);
            //    this.EndReFresh();
            //    break;
            //case SelectMode.ChangedSize:
            //    this.BeginReFresh();
            //    //ChangedSize(e);
            //    this.EndReFresh();
            //    break;
            //case SelectMode.Drag:
            //    this.BeginReFresh();
            //    //this.Cursor = Cursors.Hand;
            //    this.EndReFresh();
            //    break;
            default:
                break;
        }
        if (res) {
            ve.NeedRePaint = true;
        }
    }
    DoOnWheel(evt: any) {

    }
    DoOnMouseDoubleClick(sender: any, e: MouseEvent, ve: EventView) {
        if (this.CurrentEvent != null) {
            if (this.CurrentEvent.OnMouseDoubleClick(this, e, ve)) {
                return;
            }
        }
    }
    DoOnKeyPress(sender: any, e: KeyboardEvent, ve: EventView) {
        if (this.CurrentEvent != null) {
            if (this.CurrentEvent.OnKeyPress(this, e, ve)) {
                return;
            }
        }

    }
    DoOnKeyDown(sender: any, e: KeyboardEvent, ve: EventView) {
        if (this.CurrentEvent != null) {
            if (this.CurrentEvent.OnKeyDown(this, e, ve)) {
                return;
            }
        }
        if (e.srcElement == document.body) {
            switch (e.code) {
                case "ArrowRight":
                    if (e.shiftKey) {
                        if (this.SelectCells != null) {
                            this.CellMoveRight(this.SelectCells, 1);
                        }
                    }
                    else {
                        this.MoveFocusedCellToRightCell();
                    }
                    ve.CurrentEvent = this.FocusedCell;
                    this.Refresh();
                    this.RePaint();
                    break;
                case "ArrowLeft":
                    if (e.shiftKey) {
                        if (this.SelectCells != null) {
                            this.CellMoveLeft(this.SelectCells, 1);
                        }
                    }
                    else {
                        this.MoveFocusedCellToLeftCell();
                    }
                    ve.CurrentEvent = this.FocusedCell;
                    this.Refresh();
                    this.RePaint();
                    break;
                case "ArrowUp":
                    if (e.shiftKey) {
                        if (this.SelectCells != null) {
                            this.CellMoveUp(this.SelectCells, 1);
                        }
                    }
                    else {
                        this.MoveFocusedCellToUpCell();
                    }
                    ve.CurrentEvent = this.FocusedCell;
                    this.Refresh();
                    this.RePaint();
                    break;
                case "ArrowDown":

                    if (e.shiftKey) {
                        if (this.SelectCells != null) {
                            this.CellMoveDown(this.SelectCells, 1);
                        }
                    }
                    else {
                        this.MoveFocusedCellToDownCell();
                    }
                    ve.CurrentEvent = this.FocusedCell;
                    this.Refresh();
                    this.RePaint();
                    break;
                default:
            }
        }

    }
    DoOnTouchStart(sender: any, e: TouchEvent, ve: EventView) {
        this.SetCellTouchStart(sender, e, ve);
    }
    DoOnTouchMove(sender: any, e: TouchEvent, ve: EventView) {
        this.DebugRect = new Rect(ve.offsetPoint.X, ve.offsetPoint.Y, 4, 4);
        if (this.CurrentEvent != null) {
            if (this.CurrentEvent.OnTouchMove(this, e, ve)) {
                return true;
            }
        }
        let res = false;
        switch (this.Selectmode) {
            //case SelectMode.Null:
            //    res = this.SelectModeNullTouchMove(e, ve);
            //    break;
            case SelectMode.TouchMove:
                res = this.FirstShowTouchMove(e, ve);
                break;
            case SelectMode.CellSelected:
                if (e.targetTouches.length == 1) {
                    if (this.MultiSelect) {
                        this.BeginReFresh();
                        res = this.SelectModeCellSeletedMouseMove(ve);
                        this.SetSelectCellRowSelect();
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        this.EndReFresh();
                    }
                }
                break;
            case SelectMode.CellAddSelected:
                this.BeginReFresh();
                //res = this.SelectModeCellAddSelectedMouseMove(e,ve);
                this.EndReFresh();
                break;
            default:
                break;
        }
        if (res) {
            ve.NeedRePaint = true;
        }

    }
    DoOnTouchEnd(sender: any, e: TouchEvent, ve: EventView) {
        if (this.CurrentEvent != null) {
            if (this.CurrentEvent.OnTouchEnd(this, e, ve)) {
                return true;
            }
        }
    }
    DoOnTouchCancel(sender: any, e: TouchEvent, ve: EventView) {
        DataExcelConsole.log("DoOnTouchCancel", e);
    }
    DoPaste(e: any) {
        if (e.srcElement == document.body) {
            return this.Paste(e);
        }
    }
    DoCopy(e: ClipboardEvent) {
        return this.Copy(e);
    }
    DoCut(e: any) {
        return this.Cut(e);
    }
    ///plus event
    DoOnMouseDownChart(sender: any, e: MouseEvent, ve: EventView): boolean {
        try {
            for (var i = 0; i < this.Charts.length; i++) {
                let chart = this.Charts[i];
                let res = chart.OnMouseDown(sender, e, ve);
                if (res) {
                    return true;
                }
            }
        } catch (e) {
            DataExcelConsole.log("DoOnMouseDownChart", e);
        }
        return false;
    }
    DoOnMouseUpChart(sender: any, e: MouseEvent, ve: EventView): boolean {
        try {
            for (var i = 0; i < this.Charts.length; i++) {
                let chart = this.Charts[i];
                let res = chart.OnMouseUp(sender, e, ve);
                if (res) {
                    return true;
                }
            }
        } catch (e) {
            DataExcelConsole.log("DoOnMouseUpChart", e);
        }
        return false;
    }
    DoOnMouseMoveChart(sender: any, e: MouseEvent, ve: EventView): boolean {
        try {
            for (var i = 0; i < this.Charts.length; i++) {
                let chart = this.Charts[i];
                let res = chart.OnMouseMove(sender, e, ve);
                if (res) {
                    return true;
                }
            }
        } catch (e) {
            DataExcelConsole.log("DoOnMouseMoveChart", e);
        }
        return false;
    }

    DoOnMouseDownPrimitive(sender: any, e: MouseEvent, ve: EventView): boolean {
        try {
            for (var i = 0; i < this.Primitives.length; i++) {
                let chart = this.Primitives[i];
                let res = chart.OnMouseDown(sender, e, ve);
                if (res) {
                    return true;
                }
            }
        } catch (e) {
            DataExcelConsole.log("DoOnMouseDownChart", e);
        }
        return false;
    }
    DoOnMouseUpPrimitive(sender: any, e: MouseEvent, ve: EventView): boolean {
        try {
            for (var i = 0; i < this.Primitives.length; i++) {
                let chart = this.Primitives[i];
                let res = chart.OnMouseUp(sender, e, ve);
                if (res) {
                    return true;
                }
            }
        } catch (e) {
            DataExcelConsole.log("DoOnMouseUpPrimitive", e);
        }
        return false;
    }
    DoOnMouseMovePrimitive(sender: any, e: MouseEvent, ve: EventView): boolean {
        try {
            for (var i = 0; i < this.Primitives.length; i++) {
                let chart = this.Primitives[i];
                let res = chart.OnMouseMove(sender, e, ve);
                if (res) {
                    return true;
                }
            }
        } catch (e) {
            DataExcelConsole.log("DoOnMouseMovePrimitive", e);
        }
        return false;
    }

    //Touch
    private touchdownpoint: Point;
    private touchdownfirstrow: number;
    private touchdownfirstcolumn: number;
    private touchdowntime: Date;
    SetCellTouchStart(sender: any, e: TouchEvent, ve: EventView): boolean {
        this.touchdowntime = new Date();
        let touch = e.touches[0] as Touch;
        let point = new Point(ve.offsetPoint.X, ve.offsetPoint.Y);
        this.DebugRect = new Rect(point.X, point.Y, 4, 4);
        let viewloaction = this.PointControlToView(point);
        let pt = viewloaction;

        let cell = this.GetCellByPoint(pt);

        if (cell == null) {
            return false;
        }
        if (cell.OnTouchStart(sender, e, ve)) {
            return true;
        }
        if (this.FocusedCell == cell && this.Selectmode != SelectMode.TouchMove) {
            this.touchdownpoint = point;
            this.touchdownfirstrow = this.FirstDisplayedRowIndex;
            this.touchdownfirstcolumn = this.FirstDisplayedColumnIndex;
            this.Selectmode = SelectMode.TouchMove;
            return true;
        }
        this.Selectmode = SelectMode.CellSelected;
        this.BeginReFresh();
        this.ClearSelect();
        this.SetSelectCells(cell);
        cell.Selected = true;

        if (e.ctrlKey) {
            let fcell = this.GetFocusedCell();
            if (fcell != null) {
                this.SelectRange.Add(fcell);
                this.SelectRange.Add(cell);
            }
        }
        else {
            this.SelectRange.Clear();
        }
        if (e.shiftKey) {
            //this.SelectCell(this.FocusedCell, cell);
        }
        this.SetFocusedCell(cell);
        e.stopPropagation();
        ve.NeedRePaint = true;
        ve.CurrentEvent = cell;
        ve.NeedRePaint = true;
        this.EndReFresh();
        return true;
    }
    FirstShowTouchMove(e: TouchEvent, ve: EventView): boolean {
        let pt = new Point(ve.offsetPoint.X, ve.offsetPoint.Y);
        let w = this.touchdownpoint.X - pt.X;
        let h = this.touchdownpoint.Y - pt.Y;
        DataExcelConsole.log("touchdownpoint", this.touchdownpoint);
        if (Math.abs(w) < Math.abs(h)) {
            let index = 0;
            let len = 0;
            if (!this.AllowChangedFirstDisplayRow)
                return false;
            len = Math.round(h / 10);
            index = this.touchdownfirstrow + len;
            DataExcelConsole.log("touchdownpoint rowindex", index);
            if (index > 0) {
                this.FirstDisplayedRowIndex = index;
                this.FirstDisplayedColumnIndex = this.touchdownfirstcolumn;
                ve.NeedRePaint = true;
            }
            try {
                e.preventDefault();
            } catch (ex) {
                DataExcelConsole.log("touchdownpoint rowindex", ex);
            }
            return true;
        }
        else {
            let index = 0;
            let len = 0;
            if (!this.AllowChangedFirstDisplayColumn)
                return false;
            len = Math.round(w / 20);
            index = this.touchdownfirstcolumn + len;
            DataExcelConsole.log("touchdownpoint columnindex", index);
            if (index > 0) {
                this.FirstDisplayedRowIndex = this.touchdownfirstrow;
                this.FirstDisplayedColumnIndex = index;
                ve.NeedRePaint = true;
            }
            try {
                e.preventDefault();
            } catch (ex) {
                DataExcelConsole.log("touchdownpoint columnindex", ex);
            }
            return true;
        }
        return false;
    }
    SelectModeNullTouchMove(e: TouchEvent, ve: EventView) {

        let pt = new Point(ve.offsetPoint.X, ve.offsetPoint.Y);
        let viewlocation = this.PointControlToView(pt);

        let cell = this.GetCellByPoint(pt);
        if (cell != null) {
            if (cell.OwnMergeCell != null) {
                cell = cell.OwnMergeCell;
            }
            if (cell != null) {
                if (cell.OnTouchMove(this, e, ve)) {
                    return true;
                }
            }
            return false;

        }
    }
    //PASTE COPY CUT
    Cut(e?: any) {
        try {
            if (this.FocusedCell == null) {
                return;
            }
            if (this.InEdit) {
                return;
            }
            this.CopyCells = null;
            if (this.InEdit)
                return;

            let list = this.GetSelectCells() as List<DataExcelCell>;
            let row: DataExcelRow | null = null;
            let count = list.Count;
            let sb = "";
            for (let i = 0; i < count; i++) {
                let cell = list.get(i);
                if (row == null) {
                    row = cell.Row;
                }
                else if (row != cell.Row) {
                    row = cell.Row;
                    sb = sb + (ConstantValue.CopySplitSymbolRow);
                }
                let celltext = "";
                celltext = cell.Text;
                sb = sb + (celltext);
                if (cell != list[list.Count - 1]) {
                    sb = sb + (ConstantValue.CopySplitSymbolColumn);
                }
            }
            let text = sb;
            if (this.SelectCells != null) {
                this.CopyCells = new SelectCellCollection();
                this.CopyCells.Grid = this;
                this.CopyCells.BeginCell = this.SelectCells.BeginCell;
                this.CopyCells.EndCell = this.SelectCells.EndCell;
                this.CopyCells.Refresh();
            }

            //let clipboardData = e.clipboardData || window.Clipboard;
            //clipboardData.setData('text/plain', text)
            list = this.GetSelectCells() as List<DataExcelCell>;
            for (let i = 0; i < count; i++) {
                let cell = list.get(i);
                cell.Text = "";
                cell.Value = null;
            }
            this.emit(Events.CellValueChanged, this, list);
            this.SetClipData(text, e);
            return text;
        }
        catch (ex) {
            DataExcelConsole.log("copy", ex);
        }
    }
    Copy(e?: ClipboardEvent) {
        try {
            if (this.FocusedCell == null) {
                return;
            }
            if (this.InEdit) {
                return;
            }
            this.CopyCells = null;

            let list = this.GetSelectCells() as List<DataExcelCell>;
            let row: DataExcelRow | null = null;
            let count = list.Count;
            let sb = "";
            let arr = [];
            for (let i = 0; i < count; i++) {
                let cell = list.get(i);
                if (row == null) {
                    row = cell.Row;
                }
                else if (row != cell.Row) {
                    row = cell.Row;
                    sb = sb + (ConstantValue.CopySplitSymbolRow);
                }
                let celltext = "";
                celltext = cell.Text;
                sb = sb + (celltext);
                if (cell != list[list.Count - 1]) {
                    sb = sb + (ConstantValue.CopySplitSymbolColumn);
                }
            }
            let text = sb;
            if (this.SelectCells != null) {
                this.CopyCells = new SelectCellCollection();
                this.CopyCells.Grid = this;
                this.CopyCells.BeginCell = this.SelectCells.BeginCell;
                this.CopyCells.EndCell = this.SelectCells.EndCell;
                this.CopyCells.Refresh();

            }
            this.SetClipData(text, e);
            return text;
        }
        catch (ex) {
            DataExcelConsole.log("copy", ex);
        }
    }
    Paste(e: any, txt?: any) {
        try {
            if (this.FocusedCell == null) {
                return;
            }
            if (this.CopyCells != null) {
                this.PasteCopyCells();
                return;
            }
            if (this.InEdit) {
                return;
            }
            let text = txt;
            if (e != null) {
                let clipboardData = e.clipboardData || window.Clipboard;
                text = clipboardData.getData('text/plain');
                //let texthtml = clipboardData.getData('text/html');
                //console.log(texthtml);
            }
            let str = text as string;
            let strs = str.split(ConstantValue.CopySplitSymbolRow);
            if (strs.length > 1) {
                let minrow = this.FocusedCell.Row.Index;
                let mincolumn = this.FocusedCell.Column.Index;
                let maxrow = this.FocusedCell.Row.Index + strs.length;
                let rowindex = 0;
                let maxcolumn = 0;
                for (let i = minrow; i < maxrow; i++) {
                    let s = strs[rowindex];
                    rowindex++;
                    let ss = s.split(ConstantValue.CopySplitSymbolColumn);
                    maxcolumn = this.FocusedCell.MaxColumnIndex() + ss.length;
                    let columnindex = 0;
                    for (let j = mincolumn; j < maxcolumn; j++) {
                        let cell = this.GetCellByIndex(i, j);
                        if (cell.OwnMergeCell != null) {
                            if (cell == cell.OwnMergeCell.BeginCell) {
                                cell = cell.OwnMergeCell;
                            }
                            else {
                                continue;
                            }
                        }

                        let texti = ss[columnindex];
                        columnindex++;
                        cell.Value = texti;
                        cell.Text = texti;
                    }
                }
            }

            else if (this.SelectCells != null) {
                let list = this.SelectCells.GetCellList();

                for (let obj in list) {
                    let cell = list[obj] as DataExcelCell;
                    cell.Value = text;
                    cell.Text = text;
                }
                this.emit(Events.CellValueChanged, this, list);
            }
        }
        catch (ex) {
            DataExcelConsole.log("dom DoPaste", ex);
        }
    }
    PasteStyle() {
        try {
            this.PasteValue = false;
            this.PasteCopyCells();
        }
        finally {
            this.PasteValue = true;
        }

    }

    SetClipData(text: any, e?: any) {
        if (e != null) {
            let clipboardData = e.clipboardData || window.Clipboard;
            clipboardData.setData('text/plain', text);
        }
        const textarea = document.createElement('textarea')
        document.body.appendChild(textarea)
        // 隐藏此输入框
        textarea.style.display = 'none'
        // 赋值
        textarea.value = text
        // 选中
        textarea.select()
        // 复制
        document.execCommand('copy', true)
        // 移除输入框
        document.body.removeChild(textarea);
    }
    PasteCopyCells() {
        if (this.CopyCells != null) {
            let focusedcell = this.FocusedCell;
            if (focusedcell == null)
                return;
            let cells = this.CopyCells;
            let minrow = cells.MinRow();
            let maxrow = cells.MaxRow();
            let mincolumn = cells.MinColumn();
            let maxcolumn = cells.MaxColumn();
            let rowcount = maxrow - minrow + 1;
            let columncount = maxcolumn - mincolumn + 1;
            let pased = new List<DataExcelCell>();
            if (this.SelectRange.Count > 0) {
                let selectcells = this.GetSelectCells() as List<DataExcelCell>;

                for (let r = 0; r < selectcells.Count; r++) {
                    let cell = selectcells.get(r);
                    for (let i = 0; i < rowcount; i++) {
                        for (let j = 0; j < columncount; j++) {

                            let targetcell = this.GetCellByIndex(cell.MaxRowIndex() + i, cell.MaxColumnIndex() + j);
                            if (pased.contains(targetcell)) {
                                continue;
                            }
                            pased.Add(targetcell);
                            let sourcecell = this.GetCellByIndex(minrow + i, mincolumn + j);
                            let row = targetcell.Row;
                            let column = targetcell.Column;

                            this.PasteCell(sourcecell, targetcell);
                            targetcell.Row = row;
                            targetcell.Column = column;
                        }
                    }
                }
            }
            if (this.SelectCells != null) {
                let minselrow = this.SelectCells.MinRow();
                let minselcolumn = this.SelectCells.MinColumn();
                let maxselrow = this.SelectCells.MaxRow();
                let maxselcolumn = this.SelectCells.MaxColumn();
                if (minselrow == maxselrow) {
                    maxselrow = minselrow + rowcount - 1;
                }
                if (minselcolumn == maxselcolumn) {
                    maxselcolumn = minselcolumn + columncount - 1;
                }
                for (let m = minselrow; m <= maxselrow; m = m + rowcount) {
                    for (let n = minselcolumn; n <= maxselcolumn; n = n + columncount) {
                        let cell = this.GetCellByIndex(m, n);
                        for (let i = 0; i < rowcount; i++) {
                            for (let j = 0; j < columncount; j++) {

                                let targetcell = this.GetCellByIndex(cell.MaxRowIndex() + i, cell.MaxColumnIndex() + j);
                                if (pased.Contains(targetcell)) {
                                    continue;
                                }
                                if (targetcell.Row.Index > maxselrow) {
                                    continue;
                                }
                                if (targetcell.Column.Index > maxselcolumn) {
                                    continue;
                                }
                                pased.Add(targetcell);
                                let sourcecell = this.GetCellByIndex(minrow + i, mincolumn + j);
                                let row = targetcell.Row;
                                let column = targetcell.Column;

                                this.PasteCell(sourcecell, targetcell);
                                targetcell.Row = row;
                                targetcell.Column = column;
                            }
                        }
                    }

                }
            }
        }
    }
    private PasteValue: boolean = true;
    PasteCell(sourcecell: DataExcelCell, targetcell: DataExcelCell) {
        if (targetcell.ReadOnly == CheckState.Check)
            return;
        this.PasteCellMerger(sourcecell, targetcell);
        this.PasteAction(sourcecell, targetcell);
        this.PasteProperty(sourcecell, targetcell);
        this.PasteBorder(sourcecell, targetcell);
        this.PasteCellEdit(sourcecell, targetcell);
        this.PasteCellStyle(sourcecell, targetcell);
        if (this.PasteValue) {
            this.PasteCellValue(sourcecell, targetcell);
            this.PasteExpression(sourcecell, targetcell);
        }
    }
    public PasteCellEdit(sourcecell: DataExcelCell, targetcell: DataExcelCell) {
        if (targetcell.ReadOnly == CheckState.Check)
            return;
        targetcell.OwnEditControl = sourcecell.OwnEditControl;
    }
    public PasteExpression(sourcecell: DataExcelCell, targetcell: DataExcelCell) {
        //if (targetcell.ReadOnly)
        //    return;
        //if (string.IsNullOrWhiteSpace(targetcell.Expression) && string.IsNullOrWhiteSpace(sourcecell.Expression))
        //    return;
        //targetcell.Expression = sourcecell.Expression;
    }
    public PasteCellValue(sourcecell: DataExcelCell, targetcell: DataExcelCell) {
        if (targetcell.ReadOnly == CheckState.Check)
            return;
        targetcell.Value = sourcecell.Value;
        targetcell.Text = sourcecell.Text;
    }
    public PasteCellStyle(sourcecell: DataExcelCell, targetcell: DataExcelCell) {
        if (targetcell.ReadOnly == CheckState.Check)
            return;
        targetcell.BackColor = sourcecell.BackColor;
        targetcell.ForeColor = sourcecell.ForeColor;
        targetcell.BackImage = sourcecell.BackImage;
        //targetcell.BackImgeSizeMode = sourcecell.BackImgeSizeMode;
        //targetcell.DisableImage = sourcecell.DisableImage;
        //targetcell.DisableImageSizeMode = sourcecell.DisableImageSizeMode;
        //targetcell.FocusBackColor = sourcecell.FocusBackColor;
        //targetcell.FocusForeColor = sourcecell.FocusForeColor;
        //targetcell.FocusImage = sourcecell.FocusImage;
        //targetcell.FocusImageSizeMode = sourcecell.FocusImageSizeMode;
        //targetcell.MouseDownBackColor = sourcecell.MouseDownBackColor;
        //targetcell.MouseDownForeColor = sourcecell.MouseDownForeColor;
        //targetcell.MouseDownImage = sourcecell.MouseDownImage;
        //targetcell.MouseDownImageSizeMode = sourcecell.MouseDownImageSizeMode;
        //targetcell.MouseOverBackColor = sourcecell.MouseOverBackColor;
        //targetcell.MouseOverForeColor = sourcecell.MouseOverForeColor;
        //targetcell.MouseOverImage = sourcecell.MouseOverImage;
        //targetcell.MouseOverImageSizeMode = sourcecell.MouseOverImageSizeMode;
        //targetcell.ReadOnlyImage = sourcecell.ReadOnlyImage;
        //targetcell.ReadOnlyImageSizeMode = sourcecell.ReadOnlyImageSizeMode;
        //targetcell.SelectBackColor = sourcecell.SelectBackColor;
        //targetcell.SelectBorderColor = sourcecell.SelectBorderColor;
        //targetcell.SelectForceColor = sourcecell.SelectForceColor;
        targetcell.ShowFocusedSelectBorder = sourcecell.ShowFocusedSelectBorder;
        targetcell.Style = JSON.parse(JSON.stringify(sourcecell.Style));

    }
    public PasteAction(sourcecell: DataExcelCell, targetcell: DataExcelCell) {
        if (targetcell.ReadOnly == CheckState.Check)
            return;
        //targetcell.PropertyOnCellEndEdit = sourcecell.PropertyOnCellEndEdit;
        //targetcell.PropertyOnCellInitEdit = sourcecell.PropertyOnCellInitEdit;
        //targetcell.PropertyOnCellValueChanged = sourcecell.PropertyOnCellValueChanged;
        //targetcell.PropertyOnClick = sourcecell.PropertyOnClick;
        //targetcell.PropertyOnDoubleClick = sourcecell.PropertyOnDoubleClick;
        //targetcell.PropertyOnDrawBack = sourcecell.PropertyOnDrawBack;
        //targetcell.PropertyOnDrawCell = sourcecell.PropertyOnDrawCell;
        //targetcell.PropertyOnKeyDown = sourcecell.PropertyOnKeyDown;
        //targetcell.PropertyOnKeyPress = sourcecell.PropertyOnKeyPress;
        //targetcell.PropertyOnKeyUp = sourcecell.PropertyOnKeyUp;
        //targetcell.PropertyOnMouseCaptureChanged = sourcecell.PropertyOnMouseCaptureChanged;
        //targetcell.PropertyOnMouseClick = sourcecell.PropertyOnMouseClick;
        //targetcell.PropertyOnMouseDoubleClick = sourcecell.PropertyOnMouseDoubleClick;
        //targetcell.PropertyOnMouseDown = sourcecell.PropertyOnMouseDown;
        //targetcell.PropertyOnMouseEnter = sourcecell.PropertyOnMouseEnter;
        //targetcell.PropertyOnMouseHover = sourcecell.PropertyOnMouseHover;
        //targetcell.PropertyOnMouseLeave = sourcecell.PropertyOnMouseMove;
        //targetcell.PropertyOnMouseUp = sourcecell.PropertyOnMouseUp;
        //targetcell.PropertyOnMouseWheel = sourcecell.PropertyOnMouseWheel;
        //targetcell.PropertyOnPreviewKeyDown = sourcecell.PropertyOnPreviewKeyDown;
    }
    public PasteProperty(sourcecell: DataExcelCell, targetcell: DataExcelCell) {
        if (targetcell.ReadOnly)
            return;
        targetcell.BackColor = sourcecell.BackColor;
        targetcell.ForeColor = sourcecell.ForeColor;
        targetcell.FormatType = sourcecell.FormatType;
        targetcell.Format = sourcecell.Format;
        //targetcell.FieldName = sourcecell.FieldName;
        targetcell.Font = sourcecell.Font;
        targetcell.BackImage = sourcecell.BackImage;
        //targetcell.BackImgeSizeMode = sourcecell.BackImgeSizeMode;
        //targetcell.DirectionVertical = sourcecell.DirectionVertical;
        //targetcell.DisableImage = sourcecell.DisableImage;
        //targetcell.DisableImageSizeMode = sourcecell.DisableImageSizeMode;
        //targetcell.DisplayMember = sourcecell.DisplayMember;
        //targetcell.FocusBackColor = sourcecell.FocusBackColor;
        //targetcell.FocusForeColor = sourcecell.FocusForeColor;
        //targetcell.FocusImage = sourcecell.FocusImage;
        //targetcell.FocusImageSizeMode = sourcecell.FocusImageSizeMode;
        //targetcell.FunctionBorder = sourcecell.FunctionBorder;
        targetcell.HorizontalAlignment = sourcecell.HorizontalAlignment;
        //targetcell.InhertReadOnly = sourcecell.InhertReadOnly;
        //targetcell.MouseDownBackColor = sourcecell.MouseDownBackColor;
        //targetcell.MouseDownForeColor = sourcecell.MouseDownForeColor;
        //targetcell.MouseDownImage = sourcecell.MouseDownImage;
        //targetcell.MouseDownImageSizeMode = sourcecell.MouseDownImageSizeMode;
        //targetcell.MouseOverBackColor = sourcecell.MouseOverBackColor;
        //targetcell.MouseOverForeColor = sourcecell.MouseOverForeColor;
        //targetcell.MouseOverImage = sourcecell.MouseOverImage;
        //targetcell.MouseOverImageSizeMode = sourcecell.MouseOverImageSizeMode;

        targetcell.ReadOnly = sourcecell.ReadOnly;
        //targetcell.ReadOnlyImage = sourcecell.ReadOnlyImage;
        //targetcell.ReadOnlyImageSizeMode = sourcecell.ReadOnlyImageSizeMode;
        //targetcell.SelectBackColor = sourcecell.SelectBackColor;
        //targetcell.SelectBorderColor = sourcecell.SelectBorderColor;
        //targetcell.SelectForceColor = sourcecell.SelectForceColor;
        targetcell.ShowFocusedSelectBorder = sourcecell.ShowFocusedSelectBorder;
        //targetcell.Value = sourcecell.Value;
        //targetcell.ValueMember = sourcecell.ValueMember;
        targetcell.VerticalAlignment = sourcecell.VerticalAlignment;
        targetcell.Visible = sourcecell.Visible;
    }
    public PasteBorder(sourcecell: DataExcelCell, targetcell: DataExcelCell) {
        if (targetcell.ReadOnly == CheckState.Check)
            return;

        targetcell.TopLineStyle = sourcecell.TopLineStyle
        targetcell.BottomLineStyle = sourcecell.BottomLineStyle;
        targetcell.LeftLineStyle = sourcecell.LeftLineStyle;
        targetcell.RightLineStyle = sourcecell.RightLineStyle;


    }
    public PasteCellMerger(sourcecell: DataExcelCell, targetcell: DataExcelCell) {
        if (targetcell.ReadOnly == CheckState.Check)
            return;
        if (sourcecell.OwnMergeCell != null) {
            let mcell = sourcecell.OwnMergeCell;
            if (mcell.BeginCell == sourcecell) {
                let minrow = mcell.Row.Index;
                let maxrow = mcell.MaxRowIndex();
                let mincolumn = mcell.Column.Index;
                let maxcolumn = mcell.MaxColumnIndex();
                let rowcount = maxrow - minrow;
                let columncount = maxcolumn - mincolumn;
                let endcell = this.GetCellByIndex(targetcell.MaxRowIndex() + rowcount, targetcell.MaxColumnIndex() + columncount);
                this.MergeCell(targetcell, endcell);
            }
        }
    }

    SelectModeNullMouseMove(e: MouseEvent, ve: EventView): boolean {

        let pt = new Point(e.offsetX, e.offsetY);
        let viewlocation = this.PointControlToView(pt);

        let cell = this.GetCellByPoint(pt);
        if (cell != null) {
            if (cell.OwnMergeCell != null) {
                cell = cell.OwnMergeCell;
            }
            if (cell != null) {
                if (cell.OnMouseMove(this, e, ve)) {
                    return true;
                }
            }
        }
        return false;
    }

    SelectModeCellSeletedMouseMove(ve: EventView): boolean {
        let pt = new Point();
        pt.X = ve.offsetPoint.X;
        pt.Y = ve.offsetPoint.Y;

        let viewloaction = this.PointControlToView(pt);
        let location = viewloaction;
        if (this.SelectCells != null) {
            if (this.SelectCells.BeginCell != null) {
                if (this.SelectCells.BeginCell.Row.Index > 0 && this.SelectCells.BeginCell.Column.Index > 0) {
                    if (!this.ClientBounds.Contains(location)) {
                        if (this.AllowChangedFirstDisplayRow) {
                            location = this.SetFirstShowIndex(location);
                        }
                    }
                }
            }
        }


        let cell = this.GetCellByPoint(pt);
        if (cell != null) {
            if (cell.OwnMergeCell != null) {
                cell = cell.OwnMergeCell;
            }
            if (this.SelectCells != null) {
                if (this.SelectCells.EndCell != cell) {
                    this.SelectCells.EndCell = cell;
                    this.SelectCells.Refresh();
                }
                return true;

            }
        }
        return false;
    }

    SelectModeCellAddSelectedMouseMove(e: MouseEvent): boolean {
        let viewloaction = this.PointControlToView(new Point(e.offsetX, e.offsetY));
        let pt = viewloaction;
        let location = this.SetFirstShowIndex(pt);
        let cell = this.GetCellByPoint(location);
        if (this.SelectAddRectCollection != null) {
            this.SelectAddRectCollection.EndCell = cell;
        }
        return true;
    }

    SetSelectCellRowSelect() {
        this.SelectRows.Clear();
        this.SelectColumns.Clear();
        if (this.SelectCells != null) {
            let minrow = this.SelectCells.MinRow();
            let maxrow = this.SelectCells.MaxRow();
            let mincolumn = this.SelectCells.MinColumn();
            let maxcolumn = this.SelectCells.MaxColumn();
            if (minrow == 0 && maxrow == 0) {
                for (let i = mincolumn; i <= maxcolumn; i++) {
                    let column = this.Columns.Get(i);
                    if (column != null) {
                        column.Selected = true;
                    }
                }
            }
            if (mincolumn == 0 && maxcolumn == 0) {
                for (let i = minrow; i <= maxrow; i++) {
                    let row = this.Rows.Get(i);
                    if (row != null) {
                        row.Selected = true;
                    }
                }
            }
        }
    }



    //merge
    Merge(selectcells: SelectCellCollection) {
        return this.NewMergeCell(this, selectcells);
    }
    MergeCell(cellbegin: DataExcelCell, cellend: DataExcelCell) {
        let model = new DataExcelMergeCell();
        model.Grid = this;
        model.BeginCell = cellbegin;
        model.EndCell = cellend;
        this.MergeCells.Add(model);
        return model;

    }
    UnMerge(selectcells: SelectCellCollection) {
        let list = selectcells.GetAllCells();
        list.forEach((cell) => {
            if (cell.OwnMergeCell != null) {
                let mergecell = cell.OwnMergeCell as DataExcelMergeCell;
                mergecell.Released = true;
                this.MergeCells.Remove(mergecell);
            }
            cell.OwnMergeCell = null;
        });
    }
    BackCell(selectcells: SelectCellCollection) {
        return this.NewBackCell(this, selectcells);
    }
    BackCell2(cellbegin: DataExcelCell, cellend: DataExcelCell) {
        let model = new DataExcelBackCell();
        model.Grid = this;
        model.BeginCell = cellbegin;
        model.EndCell = cellend;
        this.BackCells.Add(model);
        return model;

    }
    UnBackCell(selectcells: SelectCellCollection) {
        let list = selectcells.GetAllCells();
        list.forEach((cell) => {
            if (cell.OwnBackCell != null) {
                let mergecell = cell.OwnBackCell as DataExcelBackCell;
                mergecell.Released = true;
                this.BackCells.Remove(mergecell);
            }
            cell.OwnBackCell = null;
        });
    }
    //TOOL
    BeginSetCursor(cursor: string) {
        this.maindom.style.cursor = cursor;
        this.zrendermain.dom.style.cursor = cursor;
    }
    InVisible(cell: DataExcelCell): boolean {
        if (cell == null)
            return false;
        if (cell.Row.Index >= this.FirstDisplayedRowIndex && cell.Row.Index <= this.EndDisplayedRowIndex) {

            if (cell.Column.Index >= this.FirstDisplayedColumnIndex && cell.Column.Index <= this.EndDisplayedColumnIndex) {
                return true;
            }
        }
        return false;
    }
    GetRow(rowindex: number) {
        let row = this.Rows.Get(rowindex);
        if (row == null) {
            row = this.NewRow(this, rowindex);
            this.Rows.Add(rowindex, row);
        }

        return row;
    }
    GetColumn(columnindex: number) {
        let column = this.Columns.Get(columnindex);
        if (column == null) {
            column = this.NewColumn(this, columnindex);
            this.Columns.Add(columnindex, column);
        }
        return column;
    }
    GetCellByIndex(rowindex: number, columnindex: number): DataExcelCell {
        let row = this.Rows.Get(rowindex);
        if (row == null) {
            row = this.NewRow(this, rowindex);
            this.Rows.Add(rowindex, row);
        }
        let column = this.Columns.Get(columnindex);
        if (column == null) {
            column = this.NewColumn(this, columnindex);
            this.Columns.Add(columnindex, column);
        }
        let cell = row.Cells.Get(column);
        if (cell == null) {
            cell = this.NewCell(row, column);
        }
        return cell;


    }

    SetFirstShowIndex(point: Point) {
        let location = point;
        let movestep = 1;
        if (point.X <= this.ContentLeft) {
            location.X = this.ContentLeft + 1;
        }
        if (point.X >= (this.Width - this.ContentRight)) {
            location.X = this.Width - this.ContentRight - 1;
        }
        if (point.Y <= this.ContentTop) {
            location.Y = this.ContentTop + 1;
        }
        if (point.Y >= (this.Height - this.ContentBottom)) {
            location.Y = this.Height - this.ContentBottom - 1;
        }
        let firstcolumnindex = 0;
        if (point.X <= this.ContentLeft) {
            firstcolumnindex = (this.FirstDisplayedColumnIndex - movestep);
            if (firstcolumnindex <= 0) {
                firstcolumnindex = 0;
            }
            if (this.AllowChangedFirstDisplayColumn) {
                this.SetFirstDisplayColumn(firstcolumnindex);
            }
            return location;
        }
        else if (point.X >= (this.Width - this.ContentRight)) {
            firstcolumnindex = (this.FirstDisplayedColumnIndex + movestep);
            if (firstcolumnindex <= 0) {
                firstcolumnindex = 0;
            }
            if (this.AllowChangedFirstDisplayColumn) {
                this.SetFirstDisplayColumn(firstcolumnindex);
            }
            return location;
        }
        if (point.Y <= this.ContentTop) {
            firstcolumnindex = (this.FirstDisplayedRowIndex - movestep);
            if (firstcolumnindex <= 0) {
                firstcolumnindex = 0;
            }
            if (this.AllowChangedFirstDisplayRow) {
                this.SetFirstDisplayRow(firstcolumnindex);
            }
            return location;
        }
        else if (point.Y >= (this.Height - this.ContentBottom)) {
            firstcolumnindex = (this.FirstDisplayedRowIndex + movestep);
            if (firstcolumnindex <= 0) {
                firstcolumnindex = 0;
            }
            if (this.AllowChangedFirstDisplayRow) {
                this.SetFirstDisplayRow(firstcolumnindex);
            }
            return location;
        }
        return location;
    }

    GetOwnCell(cell: DataExcelCell) {
        if (cell == null)
            return null;
        if (cell.OwnMergeCell != null)
            return cell.OwnMergeCell;
        return cell;
    }

    GetLeftCell(cell: DataExcelCell): DataExcelCell | null {
        if (cell == null)
            return null;
        let rowindex = cell.Row.Index;
        let columnindex = cell.Column.Index - 1;
        if (columnindex < 1) {
            return null;
        }
        let rescell = this.GetCellByIndex(rowindex, columnindex);
        return rescell;
    }
    GetRightCell(cell: DataExcelCell): DataExcelCell | null {
        if (cell == null)
            return null;
        let rowindex = cell.Row.Index;
        let columnindex = cell.Column.Index + 1;
        if (columnindex < 1) {
            return null;
        }
        let rescell = this.GetCellByIndex(rowindex, columnindex);
        return rescell;
    }
    GetTopCell(cell: DataExcelCell): DataExcelCell | null {
        if (cell == null)
            return null;
        let rowindex = cell.Row.Index - 1;
        let columnindex = cell.Column.Index;
        if (rowindex < 1) {
            return null;
        }
        let rescell = this.GetCellByIndex(rowindex, columnindex);
        return rescell;
    }
    GetBottomCell(cell: DataExcelCell): DataExcelCell | null {
        if (cell == null)
            return null;
        let rowindex = cell.Row.Index + 1;
        let columnindex = cell.Column.Index;
        if (rowindex < 1) {
            return null;
        }
        let rescell = this.GetCellByIndex(rowindex, columnindex);
        return rescell;
    }
    //CommandMethod
    public Clear() {
        //this.BookMarkList.Clear();
        //this.FocsedCellList.Clear();
        this.SelectCells = null;
        this.Selectmode = SelectMode.Null;
        //this._password = string.Empty;
        //this._filename = string.Empty;
        //this.ListFilter = null;
        this.AllowChangedFirstDisplayColumn = true;
        this.AllowChangedFirstDisplayRow = true;
        this.AutoGenerateColumns = true;
        this.AutoGenerateRows = true;

        this.ShowBorder = true;
        this.ShowColumnHeader = true;
        this.ShowRowHeader = true;
        this.ShowGridLine = true;
        this.FirstDisplayedRowIndex = 1;
        this.EndDisplayedRowIndex = 1;
        this.FirstDisplayedColumnIndex = 1;
        this.EndDisplayedColumnIndex = 1;
        this.ReadOnly = CheckState.Unkown;
        this.TopSideHeight = 0;
        this.Font = "14px 宋体";
        //this.BackColor = "red";
        this.AutoGenerateRows = true;
        this.MaxRow = 1000000;
        this.FrozenRow = 0;
        this.ContentTop = 0;
        this.ContentBottom = 0;
        this.BackImage = "";
        this.BackImageImageLayout = ImageLayout.ZoomClip;

        this.CopyCells = null
        if (this.MergeCells != null) {
            this.MergeCells.Clear();
        }
        if (this.BackCells != null) {
            this.BackCells.Clear();
        }
        if (this.Charts != null) {
            this.Charts.Clear();
        }
        if (this.Primitives != null) {
            this.Primitives.Clear();
        }
        if (this.Rows != null) {
            this.Rows.Clear();
        }
        if (this.Columns != null) {
            this.Columns.Clear();
        }
        //if (this.FunctionCells != null)
        //{
        //    this.FunctionCells.Clear();
        //}
        //if (this.ListExtendCells != null)
        //{
        //    this.ListExtendCells.Clear();
        //}
        //if (this.FieldCells != null)
        //{
        //    this.FieldCells.Clear();
        //}
        this.IDCells.Clear();
        //this.BackgroundImage = null;
        //this._code = string.Empty;
        //    this.ExtensData.Clear();
        this.CurrentEdit = null;
        this._CellEvent = null;
        //this.CellSaveEdits.Clear();
        //this._DataSource = null;
        //this._datamember = null;
        this.FirstDisplayedRowIndex = 1;
        this.FirstDisplayedColumnIndex = 1;
        //this._showgridcolumnline = true;
        //this._showgridrowline = true;
        this.ShowSelectBorder = true;
        //this._showselectaddrect = true;
        //this._password = string.Empty;
        //this._maxRow = int.MaxValue;
        //this._maxColumn = MAXCOLUMNINDEX; 
        this.ShowRowHeader = true;
        this.ShowGridLine = true;
        this.ShowColumnHeader = true;
        this._focusedcell = null;
        this.VisibleColumns.Clear();
        this.VisibleRows.Clear();
    }
    OpenFile(file: any) {
        try {
            let read = new FileReader();
            let grid = this;
            read.onload = function readf() {
                let txt = read.result as string;
                let data = JSON.parse(txt);
                grid.SetData(data);
                grid.InitChart();
                grid.RefreshZrender();
                grid.Refresh();
                grid.RePaint();
                grid.Charts.Refresh();
                grid.emit("OpenFile", this, data);
            };
            read.readAsText(file);

        } catch (e) {
            DataExcelConsole.log("OpenFile", e);
        }


    }
    //Command
    CommandNew() {
        this.Clear();
        this.Refresh();
    }
    CommandBackGroudColor(color: any) {
        let list = this.GetSelectCells();
        for (let i in list) {
            let cell = list[i] as DataExcelCell;
            cell.BackColor = color;
        }
    }
    CommandForeColor(color: any) {
        let list = this.GetSelectCells();
        for (let i in list) {
            let cell = list[i] as DataExcelCell;
            cell.ForeColor = color;
        }
    }
    CommandFontName(fontname: any) {
        let list = this.GetSelectCells();
        for (let i in list) {
            let cell = list[i] as DataExcelCell;
            cell.Style.fontFamily = fontname;
        }
    }
    CommandFontSize(fontsize: any) {
        let list = this.GetSelectCells();
        for (let i in list) {
            let cell = list[i] as DataExcelCell;
            cell.Style.fontSize = fontsize;
        }
    }
    CommandFontSizeAdd(num: any) {
        let list = this.GetSelectCells();
        for (let i in list) {
            let cell = list[i] as DataExcelCell;
            let fontsize = cell.Style.fontSize as string;
            if (fontsize == null) {
                fontsize = '14px';
            }
            fontsize = fontsize.replace("px", "");
            let size = Number(fontsize)
            cell.Style.fontSize = (size + num) + "px";
        }
    }
    CommandFontWeight(fontweight: any) {
        let list = this.GetSelectCells();
        for (let i in list) {
            let cell = list[i] as DataExcelCell;
            cell.Style.fontWeight = fontweight;
        }
    }
    CommandFontStyle(fontstyle: any) {
        let list = this.GetSelectCells();
        for (let i in list) {
            let cell = list[i] as DataExcelCell;
            if (fontstyle == "bold") {
                cell.Style.fontWeight = fontstyle;
            }
            else {
                cell.Style.fontStyle = fontstyle;
            }
            if (fontstyle == "normal") {
                cell.Style.fontWeight = fontstyle;
                cell.Style.fontStyle = fontstyle;
            }
        }
    }
    CommandCellBorder(border: any) {
        let list = this.GetSelectCells();
        let style = { stroke: "black" };
        for (let i in list) {
            let cell = list[i] as DataExcelCell;
            switch (border) {
                case Border.all:
                    let leftcell = this.GetLeftCell(cell);
                    if (leftcell != null) {
                        leftcell = this.GetOwnCell(leftcell);
                        if (leftcell != null) {
                            if (leftcell.RightLineStyle == null) {
                                cell.LeftLineStyle = style;
                            }
                        }
                    }
                    let topcell = this.GetTopCell(cell);
                    if (topcell != null) {
                        topcell = this.GetOwnCell(topcell);
                        if (topcell != null) {
                            if (topcell.BottomLineStyle == null) {
                                cell.TopLineStyle = style;
                            }
                        }
                    }
                    cell.RightLineStyle = style;
                    cell.BottomLineStyle = style;
                    break;
                case Border.left:
                    cell.LeftLineStyle = style;
                    break;
                case Border.right:
                    cell.RightLineStyle = style;
                    break;
                case Border.top:
                    cell.TopLineStyle = style;
                    break;
                case Border.bottom:
                    cell.BottomLineStyle = style;
                    break;

                default:
            }
        }
    }
    CommandTextAlign(algin: any) {
        let list = this.GetSelectCells();
        for (let i in list) {
            let cell = list[i] as DataExcelCell;
            cell.Style.align = algin;
        }
    }
    //Script
    ExecScript(txt: string) {
        eval(txt);
    }
    //Test
    Test() {
        if (this.FocusedCell != null) {
            this.FocusedCell.BackImage = "";
        }
    }

    //Add Select
    public UpdataSelectAdd() {

        let selectionadd = this.SelectAddRectCollection;

        if (selectionadd == null)
            return;
        if (selectionadd.SelectCellCollection == null)
            return;
        if (selectionadd.EndCell == null)
            return;
        let target = selectionadd.EndCell;
        let selminrowindex = selectionadd.SelectCellCollection.MinRow();
        let selmincolumnindex = selectionadd.SelectCellCollection.MinColumn();

        let selmaxrowindex = selectionadd.SelectCellCollection.MaxRow();
        let selmaxcolumnindex = selectionadd.SelectCellCollection.MaxColumn();

        let targetrowindex = selectionadd.EndCell.Row.Index;
        let targetcolumnindex = selectionadd.EndCell.Column.Index;
        let rowcount = targetrowindex - selmaxrowindex;
        let columncount = targetcolumnindex - selmaxcolumnindex;

        if (rowcount >= 0) {
            if (columncount >= 0) {
                if (rowcount >= columncount) {
                    this.UpdataSelectRowsDown(selectionadd, target);
                }
                else {
                    this.UpdataSelectColumnsRight(selectionadd, target);
                }
            }
            else {
                columncount = selmincolumnindex - targetcolumnindex;
                if (rowcount >= columncount) {
                    this.UpdataSelectRowsDown(selectionadd, target);
                }
                else {
                    this.UpdataSelectColumnsLeft(selectionadd, target);
                }
            }
        }
        else {
            rowcount = selminrowindex - targetrowindex;
            if (columncount >= 0) {
                if (rowcount >= columncount) {
                    this.UpdataSelectRowsUp(selectionadd, target);
                }
                else {
                    this.UpdataSelectColumnsRight(selectionadd, target);
                }
            }
            else {
                columncount = selmincolumnindex - targetcolumnindex;
                if (rowcount >= columncount) {
                    this.UpdataSelectRowsUp(selectionadd, target);
                }
                else {
                    this.UpdataSelectColumnsLeft(selectionadd, target);
                }
            }
        }


        rowcount = targetrowindex - selminrowindex;
        columncount = targetcolumnindex - selmincolumnindex;

        this.EndEdit();
    }
    public UpdataSelectRowsUp(selectionadd: any, target: any) {
        let selminrowindex = selectionadd.SelectCellCollection.MinRow();
        let selmincolumnindex = selectionadd.SelectCellCollection.MinColumn();

        let selmaxrowindex = selectionadd.SelectCellCollection.MaxRow();
        let selmaxcolumnindex = selectionadd.SelectCellCollection.MaxColumn();

        let targetrowindex = selectionadd.EndCell.Row.Index;
        let targetcolumnindex = selectionadd.EndCell.Column.Index;

        for (let i = selmincolumnindex; i <= selmaxcolumnindex; i++) {
            let cellend = this.GetCellByIndex(selminrowindex, i);
            let cellbegin = this.GetCellByIndex(selmaxrowindex, i);
            let target2 = this.GetCellByIndex(targetrowindex, i);
            this.UpdataSelectRowsUp2(cellbegin, cellend, target2);
        }
    }
    public UpdataSelectRowsDown(selectionadd: any, target: any) {
        let selminrowindex = selectionadd.SelectCellCollection.MinRow();
        let selmincolumnindex = selectionadd.SelectCellCollection.MinColumn();

        let selmaxrowindex = selectionadd.SelectCellCollection.MaxRow();
        let selmaxcolumnindex = selectionadd.SelectCellCollection.MaxColumn();

        let targetrowindex = selectionadd.EndCell.Row.Index;
        let targetcolumnindex = selectionadd.EndCell.Column.Index;

        for (let i = selmincolumnindex; i <= selmaxcolumnindex; i++) {
            let cellbegin = this.GetCellByIndex(selminrowindex, i);
            let cellend = this.GetCellByIndex(selmaxrowindex, i);
            let target2 = this.GetCellByIndex(targetrowindex, i);
            this.UpdataSelectRowsDown2(cellbegin, cellend, target2);
        }

    }
    public UpdataSelectColumnsRight(selectionadd: any, target: any) {
        let selminrowindex = selectionadd.SelectCellCollection.MinRow();
        let selmincolumnindex = selectionadd.SelectCellCollection.MinColumn();

        let selmaxrowindex = selectionadd.SelectCellCollection.MaxRow();
        let selmaxcolumnindex = selectionadd.SelectCellCollection.MaxColumn();

        let targetrowindex = selectionadd.EndCell.Row.Index;
        let targetcolumnindex = selectionadd.EndCell.Column.Index;

        for (let i = selminrowindex; i <= selmaxrowindex; i++) {
            let cellbegin = this.GetCellByIndex(i, selmincolumnindex);
            let cellend = this.GetCellByIndex(i, selmaxcolumnindex);
            let target2 = this.GetCellByIndex(i, targetcolumnindex);
            this.UpdataSelectColumnsDown2(cellbegin, cellend, target2);
        }

    }
    public UpdataSelectColumnsLeft(selectionadd: any, target: any) {

        let selminrowindex = selectionadd.SelectCellCollection.MinRow();
        let selmincolumnindex = selectionadd.SelectCellCollection.MinColumn();

        let selmaxrowindex = selectionadd.SelectCellCollection.MaxRow();
        let selmaxcolumnindex = selectionadd.SelectCellCollection.MaxColumn();

        let targetrowindex = selectionadd.EndCell.Row.Index;
        let targetcolumnindex = selectionadd.EndCell.Column.Index;

        for (let i = selminrowindex; i <= selmaxrowindex; i++) {
            let cellend = this.GetCellByIndex(i, selmincolumnindex);
            let cellbegin = this.GetCellByIndex(i, selmaxcolumnindex);
            let target2 = this.GetCellByIndex(i, targetcolumnindex);
            this.UpdataSelectColumnsLeft2(cellbegin, cellend, target2);
        }
    }


    public ADDVALUE = 1;
    public DateType = 4;
    public DateLen = 1;


    private GetSelectDataTimeAdd(dt: any, DateType: any, i: any, DateLen: any) {
        let len = i * DateLen;
        switch (DateType) {
            case 1:
                dt = dt.AddSeconds(len);
                break;
            case 2:
                dt = dt.AddMinutes(len);
                break;
            case 3:
                dt = dt.AddHours(len);
                break;
            case 4:
                dt = dt.AddDays(len);
                break;
            case 5:
                dt = dt.AddDays(len * 7);
                break;
            case 6:
                dt = dt.AddMonths(len);
                break;
            case 7:
                dt = dt.AddYears(len);
                break;
            default:
                dt = dt.AddDays(i * 1);
                break;
        }
        return dt;
    }

    public UpdataSelectRowsDown2(cellbegin: DataExcelCell, cellend: DataExcelCell, target: any) {
        //if (System.Windows.Forms.Control.ModifierKeys == Keys.Control)
        //{
        this.UpdataSelectRows2DownAdd(cellbegin, cellend, target, false);
        //}
        //else
        //{
        //this.UpdataSelectRows2DownAdd(cellbegin, cellend, target, true);
        //}
    }
    public UpdataSelectRows2DownAdd(cellbegin: DataExcelCell, cellend: DataExcelCell, target: any, copy: any) {
        let minrow = cellbegin.Row.Index;
        let maxrow = cellend.MaxRowIndex();
        let targetrow = target.Row.Index;
        let tcolumn = cellbegin.Column.Index;
        let targetcount = targetrow - maxrow;
        let scount = maxrow - minrow + 1;
        if (scount < 1)
            return;
        let count = targetcount / scount;
        let hasSet = false;
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < scount; j++) {
                let trow = maxrow + i * scount + j + 1;
                let srow = minrow + j;
                if (tcolumn < 1 || trow < 1) {
                    return;
                }
                let tcell = this.GetCellByIndex(trow, tcolumn);
                let scell = this.GetCellByIndex(srow, tcolumn);
                this.PasteCell(scell, tcell);
                let num = (i + 1) * this.ADDVALUE;
                this.setUpdataCellValue(tcell, scell, num)
                //if (!copy)
                //{
                //if (!string.IsNullOrWhiteSpace(scell.Expression))
                //{
                //    tcell.Expression = Function.GetNextRowExpress(scell.Expression, i + 1);
                //    continue;
                //}
                //DateTime ? dt = Feng.Utils.ConvertHelper.ToDateTimeNullable(scell.Value);
                //if (dt.HasValue)
                //{
                //    if (hasSet)
                //    {
                //        if (System.Windows.Forms.Control.ModifierKeys == Keys.Shift)
                //        {
                //            SetSelectDateTimeAddType(ref DateType, ref DateLen);
                //        }
                //    }
                //        DateTime dttime = dt.Value;
                //    tcell.Value = GetSelectDataTimeAdd(dttime, DateType, (i + 1), DateLen);
                //    continue;
                //}

                //decimal ? dvalue = Feng.Utils.ConvertHelper.ToDecimalNullable(scell.Value);
                //if (dvalue.HasValue)
                //{
                //    if (hasSet)
                //    {
                //        if (System.Windows.Forms.Control.ModifierKeys == Keys.Shift)
                //        {
                //            SetSelectDecimalAddType(ref DateType, ref DateLen);
                //        }
                //    }
                //        decimal value = dvalue.Value + (i + 1) * ADDVALUE;
                //    tcell.Value = value;
                //    continue;
                //}
                //tcell.Value = scell.Value;
                //}

            }
        }
    }


    public UpdataSelectRowsUp2(cellbegin: DataExcelCell, cellend: DataExcelCell, target: any) {
        //if (System.Windows.Forms.Control.ModifierKeys == Keys.Control)
        //{
        this.UpdataSelectRows2UpAdd(cellbegin, cellend, target);
        //}
        //else
        //{
        //    UpdataSelectRows2UpCopy(cellbegin, cellend, target);
        //}
    }
    public UpdataSelectRows2UpAdd(cellbegin: DataExcelCell, cellend: DataExcelCell, target: any) {
        let minrow = cellend.Row.Index;
        let maxrow = cellbegin.MaxRowIndex();
        let targetrow = target.Row.Index;
        let tcolumn = cellbegin.Column.Index;
        let targetcount = maxrow - targetrow;
        let scount = maxrow - minrow + 1;
        if (scount < 1)
            return;
        let count = targetcount / scount;
        let hasSet = false;
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < scount; j++) {
                let trow = maxrow - i * scount - j - 1;
                let srow = minrow - j;
                if (tcolumn < 1 || trow < 1) {
                    return;
                }
                let tcell = this.GetCellByIndex(trow, tcolumn);
                let scell = this.GetCellByIndex(srow, tcolumn);
                this.PasteCell(scell, tcell);
                let num = -1 * (i + 1) * this.ADDVALUE;
                this.setUpdataCellValue(tcell, scell, num)


            }
        }
    }
    public UpdataSelectRows2UpCopy(cellbegin: DataExcelCell, cellend: DataExcelCell, target: any) {
        let minrow = cellend.MaxRowIndex();
        let maxrow = cellbegin.Row.Index;
        let targetrow = target.Row.Index;
        let tcolumn = cellbegin.Column.Index;
        let targetcount = maxrow - targetrow;
        let scount = maxrow - minrow + 1;
        if (scount < 1)
            return;
        let count = targetcount / scount;
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < scount; j++) {
                let trow = minrow - i * scount - j - 1;
                let srow = maxrow - j;
                if (tcolumn < 1 || trow < 1) {
                    return;
                }
                let tcell = this.GetCellByIndex(trow, tcolumn);
                let scell = this.GetCellByIndex(srow, tcolumn);
                if (tcolumn < 1 || trow < 1) {
                    return;
                }
                this.PasteCell(scell, tcell);
            }
        }
    }

    public UpdataSelectColumnsDown2(cellbegin: DataExcelCell, cellend: DataExcelCell, target: any) {
        //if (System.Windows.Forms.Control.ModifierKeys == Keys.Control)
        //{
        this.UpdataSelectColumns2DownAdd(cellbegin, cellend, target);
        //}
        //else
        //{
        //    UpdataSelectColumns2DownCopy(cellbegin, cellend, target);
        //}
    }
    public UpdataSelectColumns2DownAdd(cellbegin: DataExcelCell, cellend: DataExcelCell, target: any) {
        let minrow = cellbegin.Column.Index;
        let maxrow = cellend.MaxColumnIndex();
        let targetrow = target.Column.Index;
        let trow = cellbegin.Row.Index;
        let targetcount = targetrow - maxrow;
        let scount = maxrow - minrow + 1;
        if (scount < 1)
            return;
        let count = targetcount / scount;
        let hasSet = false;
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < scount; j++) {
                let tcolumn = maxrow + i * scount + j + 1;
                let srow = minrow + j;
                if (tcolumn < 1 || trow < 1) {
                    return;
                }
                let tcell = this.GetCellByIndex(trow, tcolumn);
                let scell = this.GetCellByIndex(trow, srow);
                this.PasteCell(scell, tcell);
                let num = (i + 1) * this.ADDVALUE;
                this.setUpdataCellValue(tcell, scell, num)


            }
        }
    }
    public UpdataSelectColumns2DownCopy(cellbegin: DataExcelCell, cellend: DataExcelCell, target: any) {
        let mincolumn = cellbegin.Column.Index;
        let maxcolumn = cellend.MaxColumnIndex();
        let targetcolumn = target.Column.Index;
        let trow = cellbegin.Row.Index;
        let targetcount = targetcolumn - maxcolumn;
        let scount = maxcolumn - mincolumn + 1;
        if (scount < 1)
            return;
        let count = targetcount / scount;
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < scount; j++) {
                let tcolumn = maxcolumn + i * scount + j + 1;
                let srow = mincolumn + j;
                if (tcolumn < 1 || trow < 1) {
                    return;
                }
                let tcell = this.GetCellByIndex(trow, tcolumn);
                let scell = this.GetCellByIndex(trow, srow);

                this.PasteCell(scell, tcell);
            }
        }
    }


    public UpdataSelectColumnsLeft2(cellbegin: DataExcelCell, cellend: any, target: any) {
        //if (System.Windows.Forms.Control.ModifierKeys == Keys.Control)
        //{
        this.UpdataSelectColumns2UpAdd(cellbegin, cellend, target);
        //}
        //else
        //{
        //    UpdataSelectColumns2UpCopy(cellbegin, cellend, target);
        //}
    }
    public UpdataSelectColumns2UpAdd(cellbegin: DataExcelCell, cellend: any, target: any) {
        let minrow = cellend.Column.Index;
        let maxrow = cellbegin.MaxColumnIndex();
        let targetrow = target.Column.Index;
        let trow = cellbegin.Row.Index;
        let targetcount = maxrow - targetrow;
        let scount = maxrow - minrow + 1;
        if (scount < 1)
            return;
        let count = targetcount / scount;
        let hasSet = false;
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < scount; j++) {
                let tcolumn = maxrow - i * scount - j - 1;
                let srow = minrow - j;
                if (tcolumn < 1 || trow < 1) {
                    return;
                }
                let tcell = this.GetCellByIndex(trow, tcolumn);
                let scell = this.GetCellByIndex(trow, srow);
                this.PasteCell(scell, tcell);
                let num = -1 * (i + 1) * this.ADDVALUE;
                this.setUpdataCellValue(tcell, scell, num)


            }
        }
    }
    private setUpdataCellValue(tcell: DataExcelCell, scell: DataExcelCell, value: number) {
        let isnum = ConvertHelper.IsNumber(scell.Value);
        if (tcell.ReadOnly == CheckState.Check) {
            return;
        }
        if (isnum) {
            let num = parseInt(scell.Value)
            let tvalue = num + value;
            tcell.Value = tvalue;
            tcell.Text = tvalue.toString();
        }
        else {
            tcell.Value = scell.Value;
            tcell.Text = scell.Text;
        }
    }
    public UpdataSelectColumns2UpCopy(cellbegin: DataExcelCell, cellend: any, target: any) {
        let minrow = cellend.MaxColumnIndex;
        let maxrow = cellbegin.Column.Index;
        let targetrow = target.Column.Index;
        let trow = cellbegin.Row.Index;
        let targetcount = maxrow - targetrow;
        let scount = maxrow - minrow + 1;
        if (scount < 1)
            return;
        let count = targetcount / scount;
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < scount; j++) {
                let tcolumn = minrow - i * scount - j - 1;
                let srow = maxrow - j;
                if (tcolumn < 1 || trow < 1) {
                    return;
                }
                let tcell = this.GetCellByIndex(trow, tcolumn);
                let scell = this.GetCellByIndex(trow, srow);
                this.PasteCell(scell, tcell);
            }
        }
    }

    private UpdateSelectAddRect() {
        this.UpdataSelectAdd();
    }

    MoveFocusedCellToNextCell(nct: any, initedit: any) {
        let cell = this.FocusedCell;
        if (this.FocusedCell == null) {
            cell = this.GetCellByIndex(1, 1);
        }
        if (cell == null)
            return;
        let rindex = cell.Row.Index;
        let cindex = cell.Column.Index;
        this.ClearSelect();
        this.EndEdit();
        if (this.FocusedCell != null) {
            switch (nct) {
                case NextType.Left:
                    rindex = cell.Row.Index;
                    cindex = cell.Column.Index;
                    if (cindex > 1) {
                        cindex = cindex - 1;
                        cell = this.GetCellByIndex(rindex, cindex);
                        if (cell.OwnMergeCell != null) {
                            cell = cell.OwnMergeCell;
                        }
                    }
                    break;
                case NextType.Up:
                    rindex = cell.Row.Index;
                    cindex = cell.Column.Index;
                    if (rindex > 1) {
                        rindex = rindex - 1;
                        cell = this.GetCellByIndex(rindex, cindex);
                        if (cell.OwnMergeCell != null) {
                            cell = cell.OwnMergeCell;
                        }
                    }
                    break;
                case NextType.Right:
                    rindex = cell.Row.Index;
                    cindex = cell.MaxColumnIndex();
                    cindex = cindex + 1;
                    cell = this.GetCellByIndex(rindex, cindex);
                    if (cell.OwnMergeCell != null) {
                        cell = cell.OwnMergeCell;
                    }
                    break;
                case NextType.Down:
                    rindex = cell.MaxRowIndex();
                    cindex = cell.Column.Index;
                    rindex = rindex + 1;
                    cell = this.GetCellByIndex(rindex, cindex);
                    if (cell.OwnMergeCell != null) {
                        cell = cell.OwnMergeCell;
                    }
                    break;
                default:
                    break;
            }
            this.ShowAndFocusedCell(cell);
            //this.FocusedCell = cell;
            if (initedit) {
                this.FocusedCell.InitEdit(this);
            }
        }
    }

    MoveFocusedCellToLeftCell() {
        this.MoveFocusedCellToNextCell(NextType.Left, false);
    }
    MoveFocusedCellToUpCell() {
        this.MoveFocusedCellToNextCell(NextType.Up, false);
    }
    MoveFocusedCellToRightCell() {
        this.MoveFocusedCellToNextCell(NextType.Right, false);
    }
    MoveFocusedCellToDownCell() {
        this.MoveFocusedCellToNextCell(NextType.Down, false);
    }

    ShowAndFocusedCell(cell: any) {
        if (cell == this.FocusedCell)
            return;
        let precell = this.FocusedCell;
        this.CurrentEvent = cell;
        this.FocusedCell = cell;
        this.SetSelectCells(cell);
        this.ShowCell(precell, this.FocusedCell);
        this.emit(Events.FocusedCellChanged, this, this.FocusedCell);
    }
    ShowCell(precell: any, nextcell: any) {
        if (precell == null) {
            precell = this.GetCellByIndex(1, 1);
        }
        if (nextcell == null) {
            return;
        }
        if (precell == nextcell) {
            return;
        }
        if (precell.Row.Index == nextcell.Row.Index) {
            if ((precell.Column.Index - nextcell.Column.Index) == 1) {
                if (this.FirstDisplayedColumnIndex > nextcell.Column.Index) {
                    this.SetFirstDisplayColumn(this.FirstDisplayedColumnIndex - 1);
                }
            }
            else if ((precell.Column.Index - nextcell.Column.Index) == -1) {
                if (this.VisibleColumns != null) {
                    if (this.VisibleColumns.Count > 0) {
                        if ((this.VisibleColumns[this.VisibleColumns.Count - 1].Index) < nextcell.Column.Index) {
                            this.SetFirstDisplayColumn(this.FirstDisplayedColumnIndex + 1);
                        }
                    }
                }

            }
        }
        else {
            if ((precell.Row.Index - nextcell.Row.Index) == 1) {
                if (this.FirstDisplayedRowIndex > nextcell.Row.Index) {
                    this.SetFirstDisplayRow(this.FirstDisplayedRowIndex - 1);
                }
            }
            else if ((precell.Row.Index - nextcell.Row.Index) == -1) {
                if (this.VisibleRows != null) {
                    if (this.VisibleRows.Count > 0) {
                        if ((this.VisibleRows[this.VisibleRows.Count - 1].Index) < nextcell.Row.Index) {
                            this.SetFirstDisplayRow(this.FirstDisplayedRowIndex + 1);
                        }
                    }
                }

            }
        }
    }


    CellMoveUp(cells: SelectCellCollection, step: number) {
        if (cells != null) {
            let minrow = cells.MinRow();
            let maxrow = cells.MaxRow();
            let mincolumn = cells.MinColumn();
            let maxcolumn = cells.MaxColumn();

            for (let i = minrow; i <= maxrow; i++) {
                for (let j = mincolumn; j <= maxcolumn; j++) {
                    if (i < 2) {
                        return;
                    }
                    let scell = this.GetCellByIndex(i - step, j);
                    let tcell = this.GetCellByIndex(i, j);
                    if (tcell.ReadOnly == CheckState.Check) {
                        continue;
                    }
                    this.Swap(scell, tcell);
                }
            }
        }
    }
    CellMoveDown(cells: SelectCellCollection, step: number) {
        if (cells != null) {
            let minrow = cells.MinRow();
            let maxrow = cells.MaxRow();
            let mincolumn = cells.MinColumn();
            let maxcolumn = cells.MaxColumn();

            for (let i = maxrow; i >= minrow; i--) {
                for (let j = mincolumn; j <= maxcolumn; j++) {
                    let scell = this.GetCellByIndex(i + step, j);
                    let tcell = this.GetCellByIndex(i, j);
                    if (tcell.ReadOnly == CheckState.Check) {
                        continue;
                    }
                    this.Swap(scell, tcell);
                }
            }
        }
    }
    CellMoveLeft(cells: SelectCellCollection, step: number) {
        if (cells != null) {
            let minrow = cells.MinRow();
            let maxrow = cells.MaxRow();
            let mincolumn = cells.MinColumn();
            let maxcolumn = cells.MaxColumn();

            for (let i = minrow; i <= maxrow; i++) {
                for (let j = mincolumn; j <= maxcolumn; j++) {
                    if (j < 2) {
                        return;
                    }
                    let scell = this.GetCellByIndex(i, j - step);
                    let tcell = this.GetCellByIndex(i, j);
                    if (tcell.ReadOnly == CheckState.Check) {
                        continue;
                    }
                    this.Swap(scell, tcell);
                }
            }
        }
    }
    CellMoveRight(cells: SelectCellCollection, step: number) {
        if (cells != null) {
            let minrow = cells.MinRow();
            let maxrow = cells.MaxRow();
            let mincolumn = cells.MinColumn();
            let maxcolumn = cells.MaxColumn();

            for (let i = minrow; i <= maxrow; i++) {
                for (let j = maxcolumn; j >= mincolumn; j--) {

                    let scell = this.GetCellByIndex(i, j + step);
                    let tcell = this.GetCellByIndex(i, j);
                    if (tcell.ReadOnly == CheckState.Check) {
                        continue;
                    }
                    this.Swap(scell, tcell);
                }
            }
        }
    }
    Swap(cell1: DataExcelCell, cell2: DataExcelCell) {
        let column1 = cell1.Column;
        let column2 = cell2.Column;


        let row1 = cell1.Row;
        let row2 = cell2.Row;

        cell1.Row.Cells.Remove(cell1.Column);
        cell2.Row.Cells.Remove(cell2.Column);


        cell1.Column = column2;
        cell2.Column = column1;


        cell1.Row = row2;
        cell2.Row = row1;

        row1.Cells.Add(cell2);
        row2.Cells.Add(cell1);
    }

    //zoom
    SetZoom(zoom: Zoom) {
        this.Zoom = zoom;
        this.ClearSelect();
        this.DefaultColumnWidth = this.DefaultColumnWidth * zoom.Width;
        this.DefaultRowHeight = this.DefaultRowHeight * zoom.Height;
        this.Rows.forEach((value: DataExcelRow) => {
            value.SetZoom(zoom);
        });
        this.Columns.forEach((value: DataExcelColumn) => {
            value.SetZoom(zoom);
        });

        this.Charts.forEach((value: Chart) => {
            value.SetZoom(zoom);
        });

        this.Primitives.forEach((value: Primitive) => {
            value.SetZoom(zoom);
        });
    }

    SetZoomNormal() {
        if (this.Zoom != null) {
            let zoomwidth = 72 / this.DefaultColumnWidth;
            let zooheight = 20 / this.DefaultRowHeight;
            let zoom = {
                Type: this.Zoom.Type,
                Width: zoomwidth,
                Height: zooheight,
            };
            this.SetZoom(zoom);
        }
    }
} 