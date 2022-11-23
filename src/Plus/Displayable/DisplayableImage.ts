import { Palette } from "../../Base/CellHeaderStyle";
import { DataExcelConsole } from "../../Base/DataExcelConsole";
import { EventView } from "../../Base/EventView";
import { Point, Zoom } from "../../Base/Point";
import { Events } from "../../Control/Events";
import { Graphics } from "../../Drawing/Graphics";
import { DataExcel } from "../../main/DataExcel";
import { Displayable } from "./Displayable";
import { DisplayableBuild } from "./DisplayableBuild";
export class DisplayableImage extends Displayable   
{
    public get TypeName(): string
    {
        return DisplayableBuild.imag;
    }

    private _dsc: any;
    public get DSC(): any
    {
        return this._dsc;
    }
    public set DSC(value: any)
    {
        this._dsc = value;
    }

    public GetData()
    {
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

    public SetData(grid: DataExcel, data:any)
    {

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

    constructor()
    {
        super();

        let style = {
            option: {
                style: {
                    lineDash: [10, 10],
                    stroke: 'rgba(220, 20, 60, 0.8)',
                    lineWidth: 1,
                    shadowBlur: 8,
                    shadowColor: 'rgba(255, 255, 255, 0.8)',
                    fill: 'rgba(255, 255, 255, 0)',
                    image: './image/test/test.png',
                } 
            },
            animate: [
                {
                    type: "style", interval: 3000, value: { lineWidth: 7, shadowBlur: 18, stroke: "white" },
                    animate: {
                        interval: 6000, value: { lineWidth: 1, shadowBlur: 8, stroke: "rgba(220, 20, 60, 0.8)", }
                    }
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
        this.Width = 20;
        this.Height = 20;
        this.DSC.style = style;
    }

    OnDrawBack(sender:any, g: Graphics): boolean
    {
        try
        {
            if (this.DoDrawBack(sender, g))
            {
                return true;
            }
            if (this.Selected)
            {
                g.FillRect(Palette.A3399FF80, this.Left, this.Top, this.Width, this.Height);
            }
            if (this.DSC == null)
            {
                this.DSC = {
                    data: {

                    },
                    style: {
                        option: {
                            shape: {}
                        }
                    },
                    controller: {

                    },
                };
            }
            this.DSC.style.option.style.x = this.Left;
            this.DSC.style.option.style.y = this.Top;
            this.DSC.style.option.style.width = this.Width;
            this.DSC.style.option.style.height = this.Height;
            g.DrawPrimitiveImage(this.DSC.style);

        } catch (e)
        {
            DataExcelConsole.log("DisplayableLine OnDisplayDrawBack", e);
        }
        return false;
    }
    private init = true;
    OnMouseDown(sender:any, e:MouseEvent, ve: EventView): boolean
    {
        if (this.DoMouseDown(sender, e, ve))
        {
            ve.NeedRePaint = true;
            ve.CurrentEvent = this;
            this.Grid.emit(Events.SelectChanged, this.Grid, this);
            return true;
        }
        let pt = new Point(ve.offsetPoint.X, ve.offsetPoint.Y);
        if (!this.Primitive.Rect.Contains(ve.offsetPoint))
        {
            this.DesignMode = false;
            return false;
        }
        if (this.init)
        {
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
    OnMouseUp(sender:any, e: MouseEvent, ve: EventView): boolean
    {
        if (this.DoMouseUp(sender, e, ve))
        {
            return true;
        }
        if (this.DesignMode)
        {
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
    OnMouseMove(sender:any, e: MouseEvent, ve: EventView): boolean
    {
        if (this.DoMouseMove(sender, e, ve))
        {
            return true;
        }
        if (this.DesignMode)
        {
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
    private _zoom: Zoom ;
    SetZoom(zoom: Zoom): boolean
    {
        try
        {
            this.Left = this.Left * zoom.Width;
            this.Top = this.Top * zoom.Height;
            this.Height = this.Height * zoom.Height;
            this.Width = this.Width * zoom.Width;
            this._zoom = zoom;
        } catch (e)
        {
            DataExcelConsole.log("DataExcelRow SetZoom", e);
        }
        return false;
    }
    GetZoom(): Zoom
    {
        return this._zoom;
    }
}
