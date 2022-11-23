

import { Palette } from "../../Base/CellHeaderStyle";
import { DataExcelConsole } from "../../Base/DataExcelConsole";
import { EventView } from "../../Base/EventView";
import { Point, Zoom } from "../../Base/Point";
import { Events } from "../../Control/Events";
import { Graphics } from "../../Drawing/Graphics";
import { DataExcel } from "../../main/DataExcel";
import { Displayable } from "./Displayable";
import { DisplayableBuild } from "./DisplayableBuild";
export class DisplayableSector extends Displayable {
    public get TypeName(): string {
        return DisplayableBuild.sect;
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
        };
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
    }

    constructor() {
        super();

        let style = {
            option: {
                style: { fill: '#33AECC', lineWidth: 5 },
                shape: { r: 30, r0: 20, cx: 200, cy: 200, startAngle: 3.14, endAngle: 6.14 },
            },
            animate: [
                {
                    type: "style", interval: 3000, value: { fill: 'white' }, animate:
                        { interval: 6000, value: { fill: '#33AECC' } }
                },
                {
                    type: "shape", interval: 3000, value: { r: 60 }, animate:
                        { interval: 6000, value: { r: 30 } }
                }]
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

            this.DSC.style.option.shape.cx = this.Left + this.Width / 2;
            this.DSC.style.option.shape.cy = this.Top + this.Width / 2;
            this.DSC.style.option.shape.r = Math.abs(this.Width / 2);

            g.DrawPrimitiveSector(this.DSC.style);
        } catch (e) {
            DataExcelConsole.log("DisplayableCircle OnDrawBack", e);
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
        let pt = new Point(ve.offsetPoint.X, ve.offsetPoint.Y);
        if (!this.Primitive.Rect.Contains(ve.offsetPoint)) {
            this.DesignMode = false;
            return false;
        }
        if (this.init) {
            this.DesignMode = true;
            this.Left = pt.X;
            this.Top = pt.Y;
            ve.NeedRePaint = true;
            ve.CurrentEvent = this;
            this.init = false;
            return true;
        }
        return false;
    }
    OnMouseUp(sender: any, e: MouseEvent, ve: EventView): boolean {
        if (this.DoMouseUp(sender, e, ve)) {
            return true;
        }
        if (this.DesignMode) {
            let pt = new Point(ve.offsetPoint.X, ve.offsetPoint.Y);
            this.Width = pt.X - this.Left;
            this.Height = pt.Y - this.Top;
            this.DesignMode = false;
            ve.NeedRePaint = true;
            ve.CurrentEvent = this;
            return true;
        }
        return false;
    }
    OnMouseMove(sender: any, e: MouseEvent, ve: EventView): boolean {
        if (this.DoMouseMove(sender, e, ve)) {
            return true;
        }
        if (this.DesignMode) {
            let pt = new Point(ve.offsetPoint.X, ve.offsetPoint.Y);
            this.Width = pt.X - this.Left;
            this.Height = pt.Y - this.Top;
            ve.NeedRePaint = true;
            ve.CurrentEvent = this;
            return true;
        }
        return false;
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
