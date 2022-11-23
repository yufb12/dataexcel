
import { List } from "../../Base/ArrayList";
import { Palette } from "../../Base/CellHeaderStyle";
import { DataExcelConsole } from "../../Base/DataExcelConsole";
import { EventView } from "../../Base/EventView";
import { MouseButtons } from "../../Base/MouseButtons";
import { Point, Size, Zoom } from "../../Base/Point";
import { Events } from "../../Control/Events";
import { Graphics } from "../../Drawing/Graphics";
import { DataExcel } from "../../main/DataExcel";
import { Displayable } from "./Displayable";
import { DisplayableBuild } from "./DisplayableBuild";
export class DisplayableLine extends Displayable {
    public Points: List<Point>;
    private lastpoint: Point | null = null;
    //private lasttime: Date;

    public get TypeName(): string {
        return DisplayableBuild.line;
    }

    private _dsc: any;
    public get DSC(): any {
        return this._dsc;
    }
    public set DSC(value: any) {
        this._dsc = value;
    }


    public GetData() {
        let data = {
            typename: this.TypeName,
            name: this.Name,
            height: this.Height,
            left: this.Left,
            top: this.Top,
            width: this.Width,
            backcolor: this.BackColor,
            backimage: this.BackImage,
            backimageimagelayout: this.BackImageImageLayout,
            dsc: this.DSC,
            points: [] as any[],
        };
        let points: any[] = [];
        if (this.Points != null) {
            this.Points.forEach((point) => {
                points.push([point.X, point.Y]);
            });
        }
        data.points = points;
        return data;
    }

    public SetData(grid: DataExcel, data: any) {
        this.init = false;
        this.Name = data.name;
        this.Height = data.height;
        this.Left = data.left;
        this.Top = data.top;
        this.Width = data.width;
        this.BackColor = data.backcolor;
        this.BackImage = data.backimage;
        this.BackImageImageLayout = data.backimageimagelayout;
        this.DSC = data.dsc;

        let len = data.points.length;
        for (let i = 0; i < len; i++) {
            let itemdata = data.points[i];
            let x = itemdata[0];
            let y = itemdata[1];
            if (this.Points != null) {
                this.Points.add(new Point(x, y));
            }
        }

    }

    constructor() {
        super();
        this.Points = new List<Point>();

        let style = {
            option: {
                style: {
                    lineDash: [10, 10],
                    stroke: 'rgba(220, 20, 60, 0.8)',
                    lineWidth: 1,
                    shadowBlur: 8,
                    shadowColor: 'rgba(255, 255, 255, 0.8)',
                },
                shape: {
                    points: [] as any[],
                    smooth: 0
                },
            },
            animate: [
                {
                    type: "style", interval: 2500, value: { lineWidth: 7, shadowBlur: 18, stroke: "white" },
                    animate: { interval: 5000, value: { lineWidth: 1, shadowBlur: 8, stroke: "rgba(220, 20, 60, 0.8)" } }
                },
                {
                    type: "shape", interval: 3000, value: { smooth: 1 },
                    animate: { interval: 6000, value: { smooth: 0 } }
                }
            ]
        };
        this.DSC = {
            data: {

            },
            style: {
                option: {}
            },
            controller: {

            },
        };
        this.DSC.style = style;
    }

    OnDrawBack(sender: any, g: Graphics): boolean {
        try {
            if (this.DoDrawBack(sender, g)) {
                return true;
            }
            if (this.Selected) {
                g.FillRect(Palette.A3399FF80, this.Left, this.Top, this.Width, this.Height);
            }
            let points: any[] = [];
            let zoomx = 1;
            let zoomy = 1;
            if (this.Points != null) {
                this.Points.forEach((point) => {
                    points.push([(point.X * zoomx), (point.Y * zoomy)]);
                });
            }
            if (this.DesignMode) {
                if (this.lastpoint != null) {
                    points.push([(this.lastpoint.X * zoomx), (this.lastpoint.Y * zoomy)]);
                }
            }
            this.DSC.style.option.shape.points = points;
            g.DrawPolyline(this.DSC.style);



        } catch (e) {
            DataExcelConsole.log("DisplayableLine OnDisplayDrawBack", e);
        }
        return false;
    }

    private init = true;
    OnMouseDown(sender: any, e: MouseEvent, ve: EventView): boolean {
        if (this.DoMouseDown(sender, e, ve)) {
            ve.NeedRePaint = true;
            ve.CurrentEvent = this;
            this.Grid.emit(Events.SelectChanged, this.Grid, this);
            return true;
        }
        if (!this.Primitive.Rect.Contains(ve.offsetPoint)) {
            this.DesignMode = false;
            return false;
        }
        if (e.button == MouseButtons.Right) {
            if (this.DesignMode) {
                this.DesignMode = false;
                this.RefreshRectSize();
                return true;
            }
        }
        if (this.init) {
            this.init = false;
            let pt = new Point(ve.offsetPoint.X, ve.offsetPoint.Y);
            if (this.Points != null) {
                this.Points.Add(pt);
            }
            this.DesignMode = true;
            //this.lasttime = new Date();
            //this.Primitive.OpenTime();
            this.lastpoint = null;
            ve.NeedRePaint = true;
            ve.CurrentEvent = this;
            return true;
        }
        if (this.DesignMode) {
            let pt = new Point(ve.offsetPoint.X, ve.offsetPoint.Y);
            if (this.Points != null) {
                this.Points.Add(pt);
            }
            this.DesignMode = true;
            //this.lasttime = new Date();
            //this.Primitive.OpenTime();
            this.lastpoint = null;
            ve.NeedRePaint = true;
            ve.CurrentEvent = this;
            return true;
        }
        return false;
    }
    OnMouseUp(sender: any, e: MouseEvent, ve: EventView): boolean {
        if (this.DoMouseUp(sender, e, ve)) {
            return true;
        }
        return false;
    }
    OnMouseMove(sender: any, e: MouseEvent, ve: EventView): boolean {
        if (this.DoMouseMove(sender, e, ve)) {
            return true;
        }
        if (this.DesignMode) {
            this.lastpoint = new Point(ve.offsetPoint.X, ve.offsetPoint.Y);
            ve.NeedRePaint = true;
            ve.CurrentEvent = this;
            return true;
        }
        return false;
    }
    OnMouseDoubleClick(sender: any, e: MouseEvent, ve: EventView): boolean {
        if (this.DesignMode) {
            this.DesignMode = false;
            return true;
        }
        return false;
    }

    RefreshRectSize() {
        //let pt = new Point(ve.offsetPoint.X, ve.offsetPoint.Y);
        //this.Points.Add(pt);
        let minx = 100000000;
        let miny = 100000000;
        let maxx = 0;
        let maxy = 0;
        let width = 0;
        let height = 0;
        for (var i = 0; i < this.Points.Count; i++) {
            let pt = this.Points.get(i);
            if (minx > pt.X) {
                minx = pt.X;
            }
            if (miny > pt.Y) {
                miny = pt.Y;
            }

            if (maxx < pt.X) {
                maxx = pt.X;
            }
            if (maxy < pt.Y) {
                maxy = pt.Y;
            }
        }
        width = maxx - minx;
        if (width < 6) {
            width = 6;
        }
        height = maxy - miny;
        if (height < 6) {
            height = 6;
        }
        this.Left = minx;
        this.Top = miny;
        this.Width = width;
        this.Height = height;
    }

    LocationChanged(ptorg: Point, pttar: Point) {
        let w = pttar.X - ptorg.X;
        let h = pttar.Y - ptorg.Y;
        for (var i = 0; i < this.Points.Count; i++) {
            let pt = this.Points.get(i);
            pt.X = pt.X + w;
            pt.Y = pt.Y + h;
        }
    }
    SizeChanged(sizeorg: Size, sizetar: Size) {
        let w = sizetar.Width / sizeorg.Width;
        let h = sizetar.Height / sizeorg.Height;
        for (var i = 0; i < this.Points.Count; i++) {
            let pt = this.Points.get(i);
            pt.X = (pt.X - this.Left) * w + this.Left;
            pt.Y = (pt.Y - this.Top) * h + this.Top;
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
            for (var i = 0; i < this.Points.Count; i++) {
                let pt = this.Points.get(i);
                pt.X = pt.X * zoom.Width;
                pt.Y = pt.Y * zoom.Height;
            }
            this._zoom = zoom;
        } catch (e) {
            DataExcelConsole.log("DataExcelRow SetZoom", e);
        }
        return false;
    }
    GetZoom(): Zoom {
        return this._zoom;
    }
    //public static timeuse = 600;
    //OnTimerInterval(): boolean
    //{
    //    if (this.DesignMode)
    //    {
    //        if (this.lastpoint != null)
    //        {
    //            let time = (new Date().getTime() - this.lasttime.getTime());
    //            if (time > DisplayableLine.timeuse)
    //            {
    //                let pt = this.lastpoint;
    //                this.Points.Add(pt);
    //                this.lasttime = new Date();
    //                this.lastpoint = null;
    //                this.Grid.RePaint();
    //            }
    //        }
    //        return true;
    //    }
    //    this.Primitive.CloseTime();
    //    return false;
    //}

}
