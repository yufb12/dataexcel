import { CheckState } from "../Base/ConstantValue";
import { Rect, Zoom } from "../Base/Point";
import { Tool } from "../Base/Tool";
import { IZoom } from "../Control/IViewEvent";
import { Graphics } from "../Drawing/Graphics";
import { DataExcelCellEditBase } from "../Edit/DataExcelCellEditBase";
import { DataExcel } from "./DataExcel";

export class DataExcelColumn implements IZoom {
    public Visible: boolean;
    public Left: number;
    public Top: number;
    public Width: number;
    public get Height() {
        return this.Grid.Height;
    }
    public Index = 0;
    public Grid: DataExcel;
    //public ForeColor = "#00887733";
    //public SelectBackColor = "#00337733";
    public Selected: boolean;
    private _font: any;
    public get Font() {
        if (this._font == null) {
            return this.Grid.Font;
        }
        return this._font;
    }
    public set Font(value) {
        this._font = value;
    }
    public FullColumnSelectedColor: any;
    public BackColor: any = null;
    public DefaultCellEdit: DataExcelCellEditBase|null = null;

    private _Caption: string;
    public get Caption(): string {
        return this._Caption;
    }
    public set Caption(value: string) {
        this._Caption = value;
    }
    private _ReadOnly: number = CheckState.Unkown;
    public get ReadOnly(): number {
        if (this._ReadOnly == CheckState.Unkown) {
            return this.Grid.ReadOnly;
        }
        return this._ReadOnly;
    }
    public set ReadOnly(value: number) {
        this._ReadOnly = value;
    }
    private _ID: string;
    public get ID(): string {
        return this._ID;
    }
    public set ID(value: string) {
        this._ID = value;
    }
    public GetData() {
        let data = {
            index: this.Index,
            width: this.Width,
            caption: this.Caption,
            visible: this.Visible,
            id: this.ID,
        };

        return data;
    }
    public SetData(grid: DataExcel, data: any) {
        this.Index = data.index;
        this.Width = data.width;
        this.Caption = data.caption;
        this.Visible = data.visible;
        this.ID = data.id;
    }
    constructor() {
        this.Visible = true;
        this.Left = 0;
        this.Top = 20;
        this.Width = 72;
        this.Index = 0;

    }
    public get Name() {
        switch (this.Index) {
            case 1:
                return "A";
            case 2:
                return "B";
            case 3:
                return "C";
            case 4:
                return "D";
            case 5:
                return "E";
            case 6:
                return "F";
            case 7:
                return "G";
            case 8:
                return "H";
            case 9:
                return "I";
            case 10:
                return "J";
            case 11:
                return "K";
            case 12:
                return "L";
            case 13:
                return "M";
            case 14:
                return "N";
            case 15:
                return "O";
            case 16:
                return "P";
            case 17:
                return "Q";
            case 18:
                return "R";
            case 19:
                return "S";
            case 20:
                return "T";
            case 21:
                return "U";
            case 22:
                return "V";
            case 23:
                return "W";
            case 24:
                return "X";
            case 25:
                return "Y";
            case 26:
                return "Z";
            case 27:
                return "AA";
            default:
                break;
        }
        return Tool.GetColumnHeaderByColumnIndex(this.Index);
    }
    H(): number {
        return this.Grid.Height;
    }
    OnDraw(sender: any, g: Graphics) {
        if (this.Grid == null)
            console.log("this.Grid == null");
        if (!this.Visible)
            return;
        //g.FillRect(this.ForeColor, this.Left, this.Top, this.Width, this.Grid.Height);
        //g.DrawText("14px ����", "black", this.Index, this.Left + this.Width / 2, this.Top, this.Width, 100, "center");
        if (this.Selected) {
            g.FillRectangle(this.FullColumnSelectedColor, this.Left, this.Top, this.Width, this.Grid.Height);

        }
        else {
            if (this.BackColor != null) {
                g.FillRectangle(this.BackColor, this.Left, this.Top, this.Width, this.Grid.Height);
            }
        }
    }
    get Rect(): Rect {
        let rect = new Rect(0, 0, 0, 0);
        rect.X = this.Left;
        rect.Y = this.Top;
        rect.Width = this.Width;
        rect.Height = this.Grid.Height;
        return rect;
    }
    get CellSelect() {
        if (this.Grid == null)
            return false;
        if (this.Grid.SelectCells == null)
            return false;
        let max = this.Grid.SelectCells.MaxColumn();
        let min = this.Grid.SelectCells.MinColumn();
        return (this.Index >= min && this.Index <= max);
    }


    private _zoom: Zoom;
    SetZoom(zoom: Zoom): boolean {
        this.Width = this.Width * zoom.Width;
        this._zoom = zoom;
        return false;
    }
    GetZoom(): Zoom {
        return this._zoom;
    }
}

