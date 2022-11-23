import { CellHeaderStyle } from "../Base/CellHeaderStyle";
import { ConvertHelper } from "../Base/ConvertHelper";
import { Cursors } from "../Base/Cursors";
import { EventView } from "../Base/EventView";
import { Point, Rect, Size } from "../Base/Point";
import { SelectMode } from "../Base/SelectMode";
import { HeaderSplit } from "../Base/Tool";
import { SizeChangRect } from "../Control/SizeChangRect";
import { Graphics } from "../Drawing/Graphics";
import { DataExcelCell } from "../main/DataExcelCell";
import { DataExcelCellEditBase } from "./DataExcelCellEditBase";

 

export class DataExcelCellColumnHeader extends DataExcelCellEditBase
{
    public Cell: DataExcelCell;
    public get Name(): string
    {
        return "ColumnHeader";
    }
    public set Name(value: string)
    { 
    }
    constructor()
    {
        super();
    }

    OnDraw(sender:any, g: Graphics)
    {

        let cell = this.Cell;
        let backcolor = CellHeaderStyle.BackColor;
        if (cell.Column.CellSelect)
        {
            backcolor = CellHeaderStyle.SelectBackColor;
        }
        let isprint = false;
        if (!isprint)
        {
            if (cell.Row.Index == 0 && cell.Column.Index == 0)
            {
                var ForwardDiagonal = null;
                g.FillRectangle(backcolor,
                    cell.Left, cell.Top, cell.Width, cell.Height);
            }
            else
            {
                g.FillRectangle(backcolor,
                    cell.Left, cell.Top, cell.Width, cell.Height);
            }
        }
        this.OnDrawText(g);

        let rect = new Rect(
            this.Cell.Right - HeaderSplit.ColumnHeaderSplit,
            this.Cell.Top, HeaderSplit.ColumnHeaderSplit, this.Cell.Height);
        g.FillRectangleColor(backcolor, rect, Cursors.col_resize, 0.01);
        cell.OnDrawGridLine(this, g);
        return true;
    }
    OnDrawText(g: Graphics)
    {
        let cell = this.Cell;
        let text = cell.Column.Name;
        if (!ConvertHelper.StringIsNullOrEmpty(cell.Column.Caption))
        {
            text = cell.Column.Caption;
        }
        if (text != "")
        {
            //if (cell.Grid.ShowCheckBox)
            //{
            //    bool check = cell.Row.Checked;
            //    GraphicsHelper.DrawCheckBox(g.Graphics, bounds, check ? 1 : 0, text, sf, cell.ForeColor, cell.Font);
            //}
            let left = cell.Left + cell.Width / 2;
            let top = cell.Top + cell.Height / 2 - 4;
            //g.DrawText(CellHeaderStyle.Font, CellHeaderStyle.Color, text, left, top, "center");
            g.DrawTextRect(CellHeaderStyle.Font, CellHeaderStyle.Color, text,
                cell.Left, cell.Top, cell.Width, cell.Height, CellHeaderStyle.textPos);
        }
    }
    InitEdit()
    {

    }
    SelectMode: number = SelectMode.Null;
    private sizechangrect: SizeChangRect;
    private donwtime: Date;
    OnMouseDown(sender:any, e:MouseEvent, ve: EventView): boolean
    {
        let pt = new Point(e.offsetX, e.offsetY);
        let hasin = this.ContainsSplit(this.Cell, pt);
        let result = false;
        if (hasin)
        {
            this.SelectMode = SelectMode.ColumnHeaderSplitSelected;
            this.sizechangrect = new SizeChangRect();
            this.sizechangrect.MouseDownPoint = pt;
            this.sizechangrect.Size = new Size(this.Cell.Width, this.Cell.Height);
            result = true; 
        }
        else
        {
            let fullselect = this.Cell.Rect.Contains(pt);
            if (fullselect)
            {
                this.SelectMode = SelectMode.FullColumnSelected;
                result = true;
            }
        }
        if (result)
        {
            ve.CurrentEvent = this;
        }
        return result; 
    }
    OnMouseUp(sender:any, e:MouseEvent, ve: EventView): boolean
    {
        this.SelectMode = SelectMode.Null;
        ve.CurrentEvent = null;
        return false;
    }
    OnMouseMove(sender:any, e: MouseEvent, ve:EventView): boolean
    {
        let result = false;

        let pt = new Point(e.offsetX, e.offsetY);
        if (this.SelectMode == SelectMode.ColumnHeaderSplitSelected)
        {
            let w = this.sizechangrect.GetChangedWidth(pt);
            this.Cell.Column.Width = w;
            this.Cell.Grid.Refresh();
            this.Cell.Grid.RePaint();
            result = true;
        }
        else
        {
            let hasin = this.ContainsSplit(this.Cell, pt);
            if (hasin)
            {
                this.Cell.Grid.BeginSetCursor(Cursors.col_resize);
                result = true
            }
        }
        if (result)
        {
            ve.CurrentEvent = this;
        }
        return result;
    }
    ContainsSplit(cell: DataExcelCell, pt: Point): boolean
    {
        let bolIn = false; 
        let rect = new Rect(
            cell.Right - HeaderSplit.ColumnHeaderSplit,
            cell.Top, HeaderSplit.ColumnHeaderSplit, cell.Height);
        bolIn = rect.Contains(pt);
        return bolIn;
    }

    OnTouchStart(sender:any, e: TouchEvent, ve: EventView): boolean
    {
        let result = false;

        if (e.touches.length == 1)
        { 
            this.donwtime = new Date();
            let point = new Point(ve.offsetPoint.X, ve.offsetPoint.Y);
            this.SelectMode = SelectMode.ColumnHeaderSplitSelected;
            this.sizechangrect = new SizeChangRect();
            this.sizechangrect.MouseDownPoint = point;
            this.sizechangrect.Size = new Size(this.Cell.Width, this.Cell.Height);
            result = true;
            ve.CurrentEvent = this; 
        }

        return result;
    }
    OnTouchMove(sender:any, e: TouchEvent, ve: EventView): boolean
    {
        let result = false;
         
        if (this.SelectMode == SelectMode.ColumnHeaderSplitSelected)
        {
            let touche = e.touches[0];
            let time = new Date();
            let sec = (time.getTime() - this.donwtime.getTime()) / 1000;
            let point = new Point(ve.offsetPoint.X, ve.offsetPoint.Y);
            let d = Math.abs(this.sizechangrect.MouseDownPoint.X - point.X);
            let w = this.sizechangrect.GetChangedWidth(point);
            if ((d / sec) < 60)
            {
                this.Cell.Column.Width = w;
                this.Cell.Grid.Refresh();
                this.Cell.Grid.RePaint();
                result = true;
                ve.NeedRePaint = true; 
                e.preventDefault();
                e.stopImmediatePropagation();
                e.stopPropagation();
            }
        }
        return result;
    }
    OnTouchEnd(sender:any, e: TouchEvent, ve:EventView): boolean
    {
        this.SelectMode = SelectMode.Null; 
        return false;
    }

    Clone()
    {
        return new DataExcelCellColumnHeader();
    }
}