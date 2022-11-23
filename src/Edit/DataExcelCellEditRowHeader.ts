import { CellHeaderStyle } from "../Base/CellHeaderStyle";
import { Cursors } from "../Base/Cursors";
import { EventView } from "../Base/EventView";
import { Point, Rect, Size } from "../Base/Point";
import { SelectMode } from "../Base/SelectMode";
import { HeaderSplit } from "../Base/Tool";
import { SizeChangRect } from "../Control/SizeChangRect";
import { Graphics } from "../Drawing/Graphics";
import { DataExcelCell } from "../main/DataExcelCell";
import { DataExcelCellEditBase } from "./DataExcelCellEditBase";

export class DataExcelCellRowHeader extends DataExcelCellEditBase {
    public Cell: DataExcelCell;
    public get Name(): string {
        return "RowHeader";
    }
    public set Name(value: string) {
    }
    constructor() {
        super();
    }

    OnDraw(sender: any, g: Graphics) {
        let cell = this.Cell;
        let backcolor = CellHeaderStyle.BackColor;

        if (cell.Row.CellSelect) {
            backcolor = CellHeaderStyle.SelectBackColor;
        }
        var isprint = false;
        if (!isprint) {
            if (cell.Row.Index == 0 && cell.Column.Index == 0) {
                var ForwardDiagonal = null;
                //g.FillRectangleLinearGradient(g.Graphics, backcolor,
                //    cell.Left, cell.Top, cell.Width, cell.Height, ForwardDiagonal);
                g.FillRectangle(backcolor,
                    cell.Left, cell.Top, cell.Width, cell.Height);
            }
            else {
                g.FillRectangle(backcolor,
                    cell.Left, cell.Top, cell.Width, cell.Height);
                //g.FillRectangleLinearGradient(backcolor,
                //    cell.Left, cell.Top, cell.Width, cell.Height, ForwardDiagonal);
            }
        }
        this.OnDrawText(g);
        let rect = new Rect(
            cell.Left, cell.Bottom - HeaderSplit.RowHeaderSplit,
            cell.Width, HeaderSplit.RowHeaderSplit);
        g.FillRectangleColor(backcolor, rect, Cursors.row_resize, 0.01);
        cell.OnDrawGridLine(this, g);
        return true;
    }
    OnDrawText(g: Graphics) {
        var cell = this.Cell;
        var text = cell.Row.Name;
        if (text != "") {
            g.DrawTextRect(CellHeaderStyle.Font, CellHeaderStyle.Color, text,
                cell.Left, cell.Top, cell.Width, cell.Height, CellHeaderStyle.textPos);
        }
    }
    InitEdit() {

    }
    SelectMode: number = SelectMode.Null;
    private sizechangrect: SizeChangRect;
    OnMouseDown(sender: any, e: MouseEvent, ve: EventView): boolean {
        let pt = new Point(e.offsetX, e.offsetY);
        let hasin = this.ContainsSplit(this.Cell, pt);
        let result = false;
        if (hasin) {
            this.SelectMode = SelectMode.RowHeaderSplitSelected;
            this.sizechangrect = new SizeChangRect();
            this.sizechangrect.MouseDownPoint = pt;
            this.sizechangrect.Size = new Size(this.Cell.Width, this.Cell.Height);
            result = true;
        }
        else {
            let fullselect = this.Cell.Rect.Contains(pt);
            if (fullselect) {
                this.SelectMode = SelectMode.FullColumnSelected;
                result = true;
            }
        }
        if (result) {
            ve.CurrentEvent = this;
        }
        return result;
    }
    OnMouseUp(sender: any, e: MouseEvent, ve: EventView): boolean {
        this.SelectMode = SelectMode.Null;
        ve.CurrentEvent = null;
        return false;
    }
    OnMouseMove(sender: any, e: MouseEvent, ve: EventView): boolean {
        let result = false;

        let pt = new Point(e.offsetX, e.offsetY);
        if (this.SelectMode == SelectMode.RowHeaderSplitSelected) {
            let h = this.sizechangrect.GetChangedHeight(pt);
            this.Cell.Row.Height = h;
            this.Cell.Grid.Refresh();
            this.Cell.Grid.RePaint();
            result = true;
        }
        else {
            let hasin = this.ContainsSplit(this.Cell, pt);
            if (hasin) {
                this.Cell.Grid.BeginSetCursor(Cursors.row_resize);
                result = true
            }
        }
        if (result) {
            ve.CurrentEvent = this;
        }
        return result;
    }
    ContainsSplit(cell: DataExcelCell, pt: Point): boolean {
        let bolIn = false;
        let rect = new Rect(
            cell.Left, cell.Bottom - HeaderSplit.RowHeaderSplit,
            cell.Width, HeaderSplit.RowHeaderSplit);
        bolIn = rect.Contains(pt);

        return bolIn;
    }

    private donwtime: Date;

    OnTouchStart(sender: any, e: TouchEvent, ve: EventView): boolean {
        let result = false;

        if (e.touches.length == 1) {
            this.donwtime = new Date();
            let point = new Point(ve.offsetPoint.X, ve.offsetPoint.Y);
            this.SelectMode = SelectMode.RowHeaderSplitSelected;
            this.sizechangrect = new SizeChangRect();
            this.sizechangrect.MouseDownPoint = point;
            this.sizechangrect.Size = new Size(this.Cell.Width, this.Cell.Height);
            result = true;
            ve.CurrentEvent = this;
        }

        return result;
    }
    OnTouchMove(sender: any, e: TouchEvent, ve: EventView): boolean {
        let result = false;

        if (this.SelectMode == SelectMode.RowHeaderSplitSelected) {
            let touche = e.touches[0];
            let time = new Date();
            let sec = (time.getTime() - this.donwtime.getTime()) / 1000;
            let point = new Point(ve.offsetPoint.X, ve.offsetPoint.Y);
            let d = Math.abs(this.sizechangrect.MouseDownPoint.Y - point.Y);

            if ((d / sec) < 60) {
                let h = this.sizechangrect.GetChangedHeight(point);
                this.Cell.Row.Height = h;
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
    OnTouchEnd(sender: any, e: TouchEvent, ve: EventView): boolean {
        this.SelectMode = SelectMode.Null;
        return false;
    }

    Clone() {
        return new DataExcelCellRowHeader();
    }
}

