

import { Palette } from "../../Base/CellHeaderStyle";
import { DataExcelConsole } from "../../Base/DataExcelConsole";
import { EventView } from "../../Base/EventView";
import { Point, Zoom } from "../../Base/Point";
import { Events } from "../../Control/Events";
import { Graphics } from "../../Drawing/Graphics";
import { DataExcel } from "../../main/DataExcel";
import { Displayable } from "./Displayable";
import { DisplayableBuild } from "./DisplayableBuild";
export class DisplayableText extends Displayable {
    public get TypeName(): string {
        return DisplayableBuild.text;
    }

    public get Text(): string {
        return this.DSC.style.option.style.text;
    }
    public set Text(value: string) {
        this.DSC.style.option.style.text = value;
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
                rotation: 0,
                position: [600, 120],
                style: {
                    text: '',
                    fill: '#ffe',
                    font: '18px Arial',
                    padding: [10, 10, 10, 10],
                    backgroundColor: 'rgba(124, 0, 123, 0.4)',
                    borderColor: '#112233',
                    borderWidth: 2,
                    borderRadius: 5,
                    textShadowBlur: 2,
                    textShadowColor: '#893e95',
                    textShadowOffsetX: 2,
                    textShadowOffsetY: 4,
                    boxShadowBlur: 5,
                    boxShadowColor: '#1099ee',
                    boxShadowOffsetX: 5,
                    boxShadowOffsetY: 10
                }
            },
            animate: [
                {
                    type: "style", interval: 3000, value: { textShadowBlur: 15, textShadowColor: "white", borderColor: 'white', },
                    animate: { type: "style", interval: 6000, value: { textShadowBlur: 15, textShadowColor: "#ffe", borderColor: '#112233', } }
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
        this.Width = 200;
        this.Height = 30;
    }

    OnDrawBack(sender: any, g: Graphics): boolean {
        try {
            if (this.DoDrawBack(sender, g)) {
                return true;
            }
            if (this.Selected) {
                g.FillRect(Palette.A3399FF80, this.Left, this.Top, this.Width, this.Height);
            }

            this.DSC.style.option.position = [this.Left, this.Top];
            this.DSC.style.option.style.text = this.Text;
            g.DrawPrimitiveText(this.DSC.style);// this.Animation); 
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
        return false;
    }
    OnMouseMove(sender: any, e: MouseEvent, ve: EventView): boolean {
        if (this.DoMouseMove(sender, e, ve)) {
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
