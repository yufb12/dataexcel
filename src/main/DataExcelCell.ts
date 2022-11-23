import { GridLineStyle } from "../Base/CellHeaderStyle";
import { CheckState } from "../Base/ConstantValue";
import { ConvertHelper } from "../Base/ConvertHelper";
import { DataExcelConsole } from "../Base/DataExcelConsole";
import { EditMode } from "../Base/EditMode";
import { EventView } from "../Base/EventView";
import { ImageLayout } from "../Base/ImageLayout";
import { Rect, Point, Zoom } from "../Base/Point";
import { StringAlignment } from "../Base/StringAlignment";
import { DefaultEdit } from "../Base/Tool";
import { IViewEvent, IZoom } from "../Control/IViewEvent";
import { Graphics } from "../Drawing/Graphics";
import { DataExcelCellEditBase } from "../Edit/DataExcelCellEditBase";
import { DataExcelRow } from "../export";
import { DataExcel } from "./DataExcel";
import { DataExcelBackCell } from "./DataExcelBackCell";
import { DataExcelBackCellList } from "./DataExcelBackCellList";
import { DataExcelColumn } from "./DataExcelColumn";
import { DataExcelMergeCell } from "./DataExcelMergeCell";
export class DataExcelCell implements IViewEvent, IZoom
{
    private _Row: DataExcelRow;
    public get Row(): DataExcelRow
    {
        return this._Row;
    }
    public set Row(value: DataExcelRow)
    {
        this._Row = value;
    }
    private _Column: DataExcelColumn;
    public get Column(): DataExcelColumn
    {
        return this._Column;
    }
    public set Column(value: DataExcelColumn)
    {
        this._Column = value;
    }
    private _OwnMergeCell: any;
    public get OwnMergeCell(): any
    {
        if (this._OwnMergeCell != null)
        {
            if (this._OwnMergeCell.Released)
            {
                this._OwnMergeCell = null;
            }
        }
        return this._OwnMergeCell;
    }
    public set OwnMergeCell(value: DataExcelMergeCell|null)
    {
        this._OwnMergeCell = value;
    }

    private _OwnBackCell: DataExcelBackCell|null;
    public get OwnBackCell(): any
    {
        if (this._OwnBackCell != null)
        {
            if (this._OwnBackCell.Released)
            {
                this._OwnBackCell = null;
            }
        }
        return this._OwnBackCell;
    }
    public set OwnBackCell(value: DataExcelBackCell|null)
    {
        this._OwnBackCell = value;
    }

    public MaxRowIndex(): number
    {
        if (this.OwnMergeCell != null)
        {
            return this.OwnMergeCell.MaxRowIndex();
        }
        return this.Row.Index;
    }
    public MaxColumnIndex(): number
    {
        if (this.OwnMergeCell != null)
        {
            return this.OwnMergeCell.MaxColumnIndex();
        }
        return this.Column.Index;
    }
    public Selected: boolean;
    public ShowFocusedSelectBorder: boolean = true;
    public Grid: DataExcel;
    public EditMode: number = EditMode.Default;
    private _ReadOnly: number = CheckState.Unkown;
    public get ReadOnly(): number
    {
        try
        {
            if (this.Column == null)
            {
                DataExcelConsole.log("ReadOnly", this.Column);
            }
            if (this._ReadOnly == CheckState.Unkown)
            {
                if (this.Column.Index > 1)
                    return this.Column.ReadOnly;
                return this.Row.ReadOnly;
            }
        } catch (e)
        {
            DataExcelConsole.log("ReadOnly", e);
        }
        return this._ReadOnly;
    }
    public set ReadOnly(value: number)
    {
        this._ReadOnly = value;
    }
    private _Style: any;
    public get Style(): any
    {
        return this._Style;
    }
    public set Style(value: any)
    {
        this._Style = value;
    }
    private _font: FontFace;
    public get Font(): FontFace
    {
        if (this._font == null)
        {
            if (this.Column.Index > 1)
                return this.Column.Font;
            return this.Row.Font;
        }
        return this._font;
    }
    public set Font(value: FontFace)
    {
        this._font = value;
    }
    private _ForeColor: any;
    public get ForeColor(): any
    {
        if (this._ForeColor == null)
        {
            return this.Grid.ForeColor;
        }
        return this._ForeColor;
    }
    public set ForeColor(value: any)
    {
        this._ForeColor = value;
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
    private _Format: string;
    public get Format(): string
    {
        return this._Format;
    }
    public set Format(value: string)
    {
        this._Format = value;
    }


    private _FormatType: string;
    public get FormatType(): string
    {
        return this._FormatType;
    }
    public set FormatType(value: string)
    {
        this._FormatType = value;
    }

    private _id: string;
    public get ID(): string
    {
        return this._id;
    }
    public set ID(value: string)
    {
        if (ConvertHelper.StringIsNullOrEmpty(value))
        {
            this.Grid.IDCells.Remove(this._id);
            this._id = "";
            return;
        }
        if (!ConvertHelper.StringIsNullOrEmpty(this._id))
        {
            this.Grid.IDCells.Remove(this._id);
        }
        this._id = value;
        this.Grid.IDCells.set(this._id, this);
    }

    private _Visible: boolean = true;
    public get Visible(): boolean
    {
        return this._Visible;
    }
    public set Visible(value: boolean)
    {
        this._Visible = value;
    }
    private _Text: string;
    public get Text(): string
    {
        return this._Text;
    }
    public set Text(value: string)
    {
        this._Text = value;
    }
    private _Value: any;
    public get Value(): any
    {
        return this._Value;
    }
    public set Value(value: any)
    {
        this._Value = value;
    }
    private _AutoMultiline: boolean = true;
    public get AutoMultiline(): boolean
    {
        return this._AutoMultiline;
    }
    public set AutoMultiline(value: boolean)
    {
        this._AutoMultiline = value;


    }
    private _LeftLineStyle: any;
    public get LeftLineStyle(): any
    {
        return this._LeftLineStyle;
    }
    public set LeftLineStyle(value: any)
    {
        this._LeftLineStyle = value;
    }
    private _TopLineStyle: any;
    public get TopLineStyle(): any
    {
        return this._TopLineStyle;
    }
    public set TopLineStyle(value: any)
    {
        this._TopLineStyle = value;
    }
    private _RightLineStyle: any;
    public get RightLineStyle(): any
    {
        return this._RightLineStyle;
    }
    public set RightLineStyle(value: any)
    {
        this._RightLineStyle = value;
    }
    private _BottomLineStyle: any;
    public get BottomLineStyle(): any
    {
        return this._BottomLineStyle;
    }
    public set BottomLineStyle(value: any)
    {
        this._BottomLineStyle = value;
    }
    private _VerticalAlignment: StringAlignment = StringAlignment.Near;
    public get VerticalAlignment(): StringAlignment
    {
        return this._VerticalAlignment;
    }
    public set VerticalAlignment(value: StringAlignment)
    {
        this._VerticalAlignment = value;
    }
    private _HorizontalAlignment: StringAlignment = StringAlignment.Near;
    public get HorizontalAlignment(): StringAlignment
    {
        return this._HorizontalAlignment;
    }
    public set HorizontalAlignment(value: StringAlignment)
    {
        this._HorizontalAlignment = value;
    }

    private _OwnEditControl: DataExcelCellEditBase;

    public get OwnEditControl()
    {
        if (this._OwnEditControl != null)
        {
            return this._OwnEditControl;
        }
        if (this.Row != null)
        {
            if (this.Row.DefaultCellEdit != null)
            {
                return this.Row.DefaultCellEdit;
            }
        }
        if (this.Column != null)
        {
            if (this.Column.DefaultCellEdit != null)
            {
                return this.Column.DefaultCellEdit;
            }
        }
        return this._OwnEditControl;
    }
    public set OwnEditControl(value:any)
    {
        this._OwnEditControl = value;
    }

    public get Left()
    {
        return this.Column.Left;
    }
    public get Top()
    {
        return this.Row.Top;
    }
    public get Width()
    {
        return this.Column.Width;
    }
    public get Height()
    {
        return this.Row.Height;
    }
    public get Right()
    {
        return this.Left + this.Width;
    }
    public get Bottom()
    {
        return this.Top + this.Height;
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

    public GetData()
    {
        let data = {} as any;
        try
        {
            let emptycell = new DataExcelCell();
            data.rowindex = this.Row.Index;
            data.columnindex = this.Column.Index;
            if (emptycell.Text != this.Text)
            {
                data.text = this.Text;
            }
            if (emptycell.Value != this.Value)
            {
                data.value = this.Value;
            }
            if (emptycell.AutoMultiline != this.AutoMultiline)
            {
                data.automultiline = this.AutoMultiline;
            }
            if (emptycell.BackColor != this.BackColor)
            {
                data.backcolor = this.BackColor;
            }
            if (emptycell.BackImage != this.BackImage)
            {
                data.backimage = this.BackImage;
            }
            if (emptycell.BackImageImageLayout != this.BackImageImageLayout)
            {
                data.backimageimagelayout = this.BackImageImageLayout;
            }
            if (emptycell.BottomLineStyle != this.BottomLineStyle)
            {
                data.bottomlinestyle = this.BottomLineStyle;
            }
            if (emptycell._font != this._font)
            {
                data.font = this._font;
            }
            if (emptycell._ForeColor != this._ForeColor)
            {
                data.forecolor = this._ForeColor;
            }
            if (emptycell.Format != this.Format)
            {
                data.format = this.Format;
            }
            if (emptycell.FormatType != this.FormatType)
            {
                data.formattype = this.FormatType;
            }
            if (emptycell.HorizontalAlignment != this.HorizontalAlignment)
            {
                data.horizontalalignment = this.HorizontalAlignment;
            }
            if (emptycell.ID != this.ID)
            {
                data.id = this.ID;
            }
            if (emptycell.LeftLineStyle != this.LeftLineStyle)
            {
                data.leftlinestyle = this.LeftLineStyle;
            }
            if (emptycell._ReadOnly != this.ReadOnly)
            {
                data.readonly = this.ReadOnly;
            }
            if (emptycell.RightLineStyle != this.RightLineStyle)
            {
                data.rightlinestyle = this.RightLineStyle;
            }
            if (emptycell.ShowFocusedSelectBorder != this.ShowFocusedSelectBorder)
            {
                data.showfocusedselectborder = this.ShowFocusedSelectBorder;
            }
            if (emptycell.Style != this.Style)
            {
                data.style = this.Style;
            }
            if (emptycell.TopLineStyle != this.TopLineStyle)
            {
                data.toplinestyle = this.TopLineStyle;
            }
            if (emptycell.VerticalAlignment != this.VerticalAlignment)
            {
                data.verticalalignment = this.VerticalAlignment;
            }
            if (emptycell.Visible != this.Visible)
            {
                data.visible = this.Visible;
            }
        }
        catch (e)
        {
            DataExcelConsole.log("dataexcelcell GetData", e);
        }

        return data;
    }

    public SetData(grid: DataExcel, data:any)
    {
        try
        {
            if (data.text != null)
            {
                this.Text = data.text;
            }
            if (data.value != null)
            {
                this.Value = data.value;
            }
            if (data.visible != null)
            {
                this.Visible = data.visible;
            }
            if (data.id != null)
            {
                this.ID = data.id;
            }
            if (data.columnindex != null)
            {
                let columnindex = data.columnindex;
                let column = grid.GetColumn(columnindex);
                if (column == null)
                {
                    DataExcelConsole.log("dataexcelcell", "column is null");
                }
                this.Column = column;
            }
            if (data.automultiline != null)
            {

                this.AutoMultiline = data.automultiline;
            }
            if (data.backcolor != null)
            {
                this.BackColor = data.backcolor;
            }
            if (data.backimage != null)
            {
                this.BackImage = data.backimage;
            }
            if (data.backimageimagelayout != null)
            {
                this.BackImageImageLayout = data.backimageimagelayout;
            }
            if (data.bottomlinestyle != null)
            {
                this.BottomLineStyle = data.bottomlinestyle;
            }
            if (data.font != null)
            {
                this.Font = data.font;
            }
            if (data.forecolor != null)
            {
                this.ForeColor = data.forecolor;
            }
            if (data.format != null)
            {
                this.Format = data.format;
            }
            if (data.formattype != null)
            {
                this.FormatType = data.formattype;
            }
            if (data.horizontalalignment != null)
            {
                this.HorizontalAlignment = data.horizontalalignment;
            }
            if (data.id != null)
            {
                this.ID = data.id;
            }
            if (data.leftlinestyle != null)
            {
                this.LeftLineStyle = data.leftlinestyle;
            }
            if (data.readonly != null)
            {
                this.ReadOnly = data.readonly;
            }
            if (data.rightlinestyle != null)
            {
                this.RightLineStyle = data.rightlinestyle;
            }
            if (data.showfocusedselectborder != null)
            {
                this.ShowFocusedSelectBorder = data.showfocusedselectborder;
            }
            if (data.style != null)
            {
                this.Style = data.style;
            }
            if (data.toplinestyle != null)
            {
                this.TopLineStyle = data.toplinestyle;
            }
            if (data.verticalalignment != null)
            {
                this.VerticalAlignment = data.verticalalignment;
            }
            if (data.visible != null)
            {
                this.Visible = data.visible;
            }
            this.OwnEditControl = DefaultEdit.GetDefauleEdit(this);

        } catch (e)
        {
            DataExcelConsole.log("dataexcelcell SetData", e);
        }
    }

    constructor()
    {
        this._Style = {};
    }

    private ondrawtimes2: number = 0;
    OnDraw(sender:any, g: Graphics)
    {
        if (this.ondrawtimes2 >= g.drawTimes)
        {
            return;
        }
        if (!this.Visible)
            return;
        this.ondrawtimes2 = g.drawTimes;
        if (this.Grid == null)
            console.log("this.Grid == null");
        if (this.OwnEditControl != null)
        {
            try
            {
                let res = this.OwnEditControl.OnDraw(sender, g);
                if (res)
                    return;
            } catch (e)
            {
                DataExcelConsole.log("OwnEditControl", e);
            }
        }
        if (this.OwnMergeCell != null)
        {
            try
            {
                this.OwnMergeCell.OnDraw(sender, g);
            } catch (e)
            {
                DataExcelConsole.log("OwnMergeCell", e);
            }
            return;
        }
        this.DrawText(sender, g);
    }
    DrawText(sender:any, g: Graphics)
    {
        //g.FillRect(this.ForeColor, this.Left, this.Top, this.Column.Width, this.Row.Height);
        var text = "";// this.Row.Index + "" + this.Column.Index;
        if (this.Text != null)
        {
            text = this.Text;
        }
        if (!ConvertHelper.StringIsNullOrEmpty(this.Format))
        {
            text = ConvertHelper.GetFromatString(this.Value, this.Format, this.FormatType);
        }
        let style = {} as any;

        style = Object.assign({}, this.Style);;

        style.text = text;
        style.font = this.Font;
        style.fill = this.ForeColor;
        style.overflow = '';
        if (this.AutoMultiline)
        {
            style.overflow = 'break';
        }
        if (style.align)
        {
        }
        if (this.AutoMultiline)
        {
            style.overflow = "break";
        }
        else 
        {
            style.overflow = "";
        }
        if (!ConvertHelper.StringIsNullOrEmpty(text))
        {
            g.DrawTextRectStyle2(text, this.Column.Left, this.Top, this.Width, this.Height, style)
        }
    }
    OnDrawBack(sender:any, g: Graphics)
    {
        if (!this.Visible)
            return;
        if (this.Grid == null)
            console.log("this.Grid == null");
        if (this.OwnBackCell != null)
        {
            this.OwnBackCell.OnDrawBack(sender, g);
        }
        if (this.OwnMergeCell != null)
        {
            this.OwnMergeCell.OnDrawBack(sender, g);
            return;
        }
        if (this.OwnEditControl != null)
        {
            let res = this.OwnEditControl.OnDrawBack(sender, g);
            if (res)
                return;
        }
        if (this.BackColor != null)
        {
            g.FillRect(this.BackColor, this.Left, this.Top, this.Column.Width, this.Row.Height, 1, this.BackColor, 1);
        }
        if (!ConvertHelper.StringIsNullOrEmpty(this.BackImage))
        {
            g.FillRectangleImage(this.BackImage, this.Rect, this.BackImageImageLayout, null, 1);
        }
    }
    Debug(e:any)
    {
        //if (this.Row.Index == 5 && this.Column.Index == 5)
        //{
        //    console.log(e);
        //}
    }
    OnDrawBorder(sender:any, g: Graphics)
    {
        if (this.OwnMergeCell != null)
        {
            this.OwnMergeCell.OnDrawBorder(sender, g);
            return;
        }
        this.Debug(this);
        var left = this.Column.Left;
        var right = this.Column.Left + this.Column.Width;
        var top = this.Row.Top;
        var bottom = this.Row.Top + this.Row.Height;
        if (this.LeftLineStyle != null)
        {
            g.DrawLineStyle(this.LeftLineStyle, left, top, left, bottom);
        }

        if (this.TopLineStyle != null)
        {
            g.DrawLineStyle(this.TopLineStyle, left, top, right, top);
        }

        if (this.RightLineStyle != null)
        {
            g.DrawLineStyle(this.RightLineStyle, right, top, right, bottom);
        }

        if (this.BottomLineStyle != null)
        {
            g.DrawLineStyle(this.BottomLineStyle, left, bottom, right, bottom);
        }

    }
    OnDrawGridLine(sender:any, g: Graphics)
    {
        if (this.OwnMergeCell != null)
        {
            this.OwnMergeCell.OnDrawGridLine(sender, g);
            return;
        }
        this.Debug(this);
        var left = this.Column.Left;
        var right = this.Column.Left + this.Column.Width;
        var top = this.Row.Top;
        var bottom = this.Row.Top + this.Row.Height;


        if (this.RightLineStyle == null)
        {
            g.DrawLine(GridLineStyle.stroke, right, top, right, bottom);
        }

        if (this.BottomLineStyle == null)
        {
            g.DrawLine(GridLineStyle.stroke, left, bottom, right, bottom);
        }

    }


    ///over write
    private downtime: Date;
    private mousedownpoint: Point;
    OnMouseDown(sender:any, e: MouseEvent, ve:EventView): boolean
    {
        this.downtime = new Date();
        this.mousedownpoint = new Point();
        this.mousedownpoint.X = e.offsetX;
        this.mousedownpoint.Y = e.offsetY;
        if (this.OwnMergeCell != null)
        {
            return this.OwnMergeCell.OnMouseDown(sender, e, ve);
        }
        if (this.OwnEditControl != null)
        {
            let res = this.OwnEditControl.OnMouseDown(sender, e, ve);
            if (res)
            {
                return res;
            }
        }
        return false;
    }
    OnMouseUp(sender:any, e: MouseEvent, ve:EventView): boolean
    {
        if (this.OwnMergeCell != null)
        {
            return this.OwnMergeCell.OnMouseUp(sender, e, ve);
        }
        if (this.OwnEditControl != null)
        {
            let res = this.OwnEditControl.OnMouseUp(sender, e, ve);
            if (res)
                return true;
        }
        let datetnow = new Date();
        let szie = 0;
        szie = Math.abs(e.offsetX - this.mousedownpoint.X);
        if (szie < 5)
        {
            szie = Math.abs(e.offsetY - this.mousedownpoint.Y);
            if (szie < 5)
            {
                let d = (datetnow.valueOf() - this.downtime.valueOf()) / 1000;
                if (d > 0.15 && d < 0.8)
                {
                    this.InitEdit();
                }
            }
        }
        return false;
    }
    OnMouseMove(sender:any, e:MouseEvent, ve: EventView): boolean
    {
        if (this.OwnMergeCell != null)
        {
            return this.OwnMergeCell.OnMouseMove(sender, e, ve);
        }
        if (this.OwnEditControl != null)
        {
            let res = this.OwnEditControl.OnMouseMove(sender, e, ve);
            if (res)
                return true;
        }
        if (this.downtime != null)
        {
            let datetnow = new Date();
            let d = (datetnow.valueOf() - this.downtime.valueOf()) / 1000;
            if (d > 0.05 && d < 0.8)
            {
                ve.CurrentEvent = this;
            }
        }
        return false;
    }
    OnMouseDoubleClick(sender:any, e:MouseEvent, ve:EventView): boolean
    {
        if (this.OwnMergeCell != null)
        {
            return this.OwnMergeCell.OnMouseDoubleClick(sender, e, ve);
        }
        if (this.OwnEditControl != null)
        {
            let res = this.OwnEditControl.OnMouseDoubleClick(sender, e, ve);
            if (res)
                return true;
        }
        this.InitEdit();
        return false;
    }
    OnKeyPress(sender :any, e:KeyboardEvent, ve:EventView): boolean
    {
        //if (this.OwnMergeCell != null)
        //{
        //    return this.OwnMergeCell.OnKeyPress(sender, e, ve);
        //}
        //if (this.OwnEditControl != null)
        //{
        //    let res = this.OwnEditControl.OnKeyPress(sender, e, ve);
        //    if (res)
        //        return;
        //}
        //this.InitEdit();
        return false;
    }
    OnKeyDown(sender:any, e: KeyboardEvent, ve:EventView): boolean
    {
        if (this.OwnMergeCell != null)
        {
            return this.OwnMergeCell.OnKeyPress(sender, e, ve);
        }
        if (this.OwnEditControl != null)
        {
            let res = this.OwnEditControl.OnKeyPress(sender, e, ve);
            if (res)
                return true;
        }
        DataExcelConsole.log("OnKeyDownInitEdit", e);
        if (e.srcElement == document.body)
        {
            let res = false;
            if (e.keyCode >= 48 && e.keyCode <= 57)
            {
                res = true;
            }
            else if (e.keyCode >= 65 && e.keyCode <= 90)
            {
                res = true;
            }
            else if (e.keyCode >= 96 && e.keyCode <= 107)
            {
                res = true;
            }
            else if (e.keyCode >= 186 && e.keyCode <= 192)
            {
                res = true;
            }
            else if (e.keyCode >= 219 && e.keyCode <= 222)
            {
                res = true;
            }
            else if (e.keyCode == 13)
            {
                res = true;
            }
            else if (e.keyCode == 109)
            {
                res = true;
            }
            else if (e.keyCode == 111)
            {
                res = true;
            }
            else if (e.keyCode == 110)
            {
                if (this.ReadOnly != CheckState.Check)
                {
                    this.Value = null;
                    this.Text = "";
                }
            }
            else if (e.keyCode == 46)
            {
                if (this.ReadOnly != CheckState.Check)
                {
                    this.Value = null;
                    this.Text = "";
                }
            }
            if (e.altKey)
            {
                res = false;
            }
            if (e.shiftKey)
            {
                res = false;
            }
            if (e.ctrlKey)
            {
                res = false;
            }
            if (res)
            {
                this.InitEdit();
            }
        }
        DataExcelConsole.log("OnKeyDownInitEdit", e);
        return false;
    }

    OnTouchStart(sender:any, e: TouchEvent, ve:EventView): boolean
    {
        if (this.OwnMergeCell != null)
        {
            return this.OwnMergeCell.OnTouchStart(sender, e, ve);
        }
        if (this.OwnEditControl != null)
        {
            let res = this.OwnEditControl.OnTouchStart(sender, e, ve);
            if (res)
            {
                return res;
            }
        }
        return false;
    }
    OnTouchMove(sender:any, e: TouchEvent, ve:EventView): boolean
    {
        if (this.OwnMergeCell != null)
        {
            return this.OwnMergeCell.OnTouchMove(sender, e, ve);
        }
        if (this.OwnEditControl != null)
        {
            let res = this.OwnEditControl.OnTouchMove(sender, e, ve);
            if (res)
            {
                return res;
            }
        }
        return false;
    }
    OnTouchEnd(sender:any, e: TouchEvent, ve:EventView): boolean
    {
        if (this.OwnMergeCell != null)
        {
            return this.OwnMergeCell.OnTouchEnd(sender, e, ve);
        }
        if (this.OwnEditControl != null)
        {
            let res = this.OwnEditControl.OnTouchEnd(sender, e, ve);
            if (res)
            {
                return res;
            }
        }
        return false;
    }

    ///init
    InitEdit(obj?:any)
    {
        if (this.ReadOnly == CheckState.Check)
        {
            return false;
        }
        if (this.Grid.EditCell == this)
        {
            return false;
        }
        this.Grid.ClearSelect();
        this.Grid.SetSelectCells(this);
        this.Grid.SetFocusedCell(this);

        this.Grid.BeginReFresh();
        let editcontrol:any = null;
        this.Grid.RaiseCellInitEditEvent(this);
        editcontrol = this.OwnEditControl;
        if (this.OwnEditControl == null)
        {
            if (this.Row.DefaultCellEdit != null)
            {
                editcontrol = this.Row.DefaultCellEdit;
            }
            else if (this.Column.DefaultCellEdit != null)
            {
                editcontrol = this.Column.DefaultCellEdit;
            }
            else
            {
                editcontrol = this.Grid.DefaultEdit;
            }
            this.OwnEditControl = editcontrol;
        }

        if (editcontrol != null)
        {
            this.Grid.AddEdit(editcontrol);
            editcontrol.Cell = this;
            editcontrol.InitEdit();
            this.Grid.EditCell = this;
        }

        this.Grid.EndReFresh();
        return true;

    }
    EndEdit()
    {
        this.Grid.EditCell = null;
    }
    FormatDecimalsAdd()
    {
        let format = this.Format;
        let index = format.indexOf("0");
        if (index >= 0)
        {
            format = ConvertHelper.InsertString(format, index, "0");
        }
        else
        {
            if (format.startsWith("¥"))
            {
                format = format + "0";
            }
            else if (format.endsWith("%"))
            {
                format = "0" + format;
            } else
            {
                format = "0";
            }
        }
        this.Format = format;
    }
    FormatDecimalsIndent()
    {
        let format = this.Format;
        let index = format.indexOf("0");
        if (index >= 0)
        {
            format = ConvertHelper.DeleteString(format, index, 1);
        }
        this.Format = format;
    }

    private _zoom: Zoom|null = null;
    SetZoom(zoom: Zoom): boolean
    {
        try
        { 
            this._zoom = zoom; 
        } catch (e)
        {
            DataExcelConsole.log("DataExcelRow SetZoom", e);
        }
        return false;
    }
    GetZoom(): any
    {
        return this._zoom;
    }
}
