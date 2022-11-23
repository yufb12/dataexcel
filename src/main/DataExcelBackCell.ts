import { ConvertHelper } from "../Base/ConvertHelper";
import { ImageLayout } from "../Base/ImageLayout";
import { DataExcelDefaultValue } from "../Base/MouseButtons";
import { Rect } from "../Base/Point";
import { StringAlignment } from "../Base/StringAlignment";
import { Graphics } from "../Drawing/Graphics";
import { DataExcel } from "./DataExcel";
import { DataExcelCell } from "./DataExcelCell";
import { DataExcelColumn } from "./DataExcelColumn";
import { DataExcelRow } from "./DataExcelRow";
export class DataExcelBackCell  
{

    public get Row(): DataExcelRow
    {
        return this._begincell.Row;
    }
    public set Row(cell: DataExcelRow)
    {
        this.Grid = cell.Grid;
        this._begincell.Row = cell;
    }
    public get Column(): DataExcelColumn
    {
        return this._begincell.Column;
    }
    public set Column(cell: DataExcelColumn)
    {
        this._begincell.Column = cell;
    }
     
    private _Released: boolean = false;
    public get Released(): boolean
    {
        return this._Released;
    }
    public set Released(value: boolean)
    {
        this._Released = value;
    }
    public Grid: DataExcel;
    private _begincell: DataExcelCell;
    public get BeginCell(): DataExcelCell
    {
        return this._begincell;
    }
    public set BeginCell(cell: DataExcelCell)
    {
        this.Grid = cell.Grid;
        this._begincell = cell;
    }

    private _endcell: DataExcelCell;
    public get EndCell(): DataExcelCell
    {
        return this._endcell;
    }
    public set EndCell(cell: DataExcelCell)
    {
        this._endcell = cell;
        let firstcell = this._begincell;
        let endcell = this._endcell;
        let rmin = Math.min(firstcell.Row.Index, endcell.Row.Index);
        let cmin = Math.min(firstcell.Column.Index, endcell.Column.Index);
        let rmax = Math.max(firstcell.Row.Index, endcell.Row.Index);
        let cmax = Math.max(firstcell.Column.Index, endcell.Column.Index);
        this._begincell = firstcell.Grid.GetCellByIndex(rmin, cmin);
        this._begincell.VerticalAlignment = StringAlignment.Center;
        this._begincell.HorizontalAlignment = StringAlignment.Center;
        this._endcell = firstcell.Grid.GetCellByIndex(rmax, cmax);
        this.Refresh();
        this.ReSetCellParent();
    }


    public MaxRowIndex(): number
    {
        return this.EndCell.Row.Index;
    }
    public MaxColumnIndex(): number
    {
        return this.EndCell.Column.Index;
    }

    public get Visible(): boolean
    {
        return this._begincell.Visible;
    }
    public set Visible(value: boolean)
    {
        this._begincell.Visible = value;
    }
 
    public GetData()
    {
        let data = {
            begincellrowindex: this.BeginCell.Row.Index,
            begincellcolumnindex: this.BeginCell.Column.Index,
            endcellrowindex: this.EndCell.Row.Index,
            endcellcolumnindex: this.EndCell.Column.Index,
        };
        return data;
    }
    public SetData(grid: DataExcel, data:any)
    {
        let begincell = grid.GetCellByIndex(data.begincellrowindex, data.begincellcolumnindex);
        let endcell = grid.GetCellByIndex(data.endcellrowindex, data.endcellcolumnindex);
        this.BeginCell = begincell;
        this.EndCell = endcell;
    }

    Refresh()
    {
        let begincell = this._begincell;
        let endcell = this._endcell;
        this.Top = begincell.Top;
        this.Left = begincell.Left;
        let width = 0;
        for (let i = begincell.Column.Index; i <= endcell.Column.Index; i++)
        {
            let column = this.Grid.Columns.Get(i);
            if (column != null)
            {
                if (column.Visible)
                {
                    width = column.Width + width;
                }
            }

        }
        this.Width = width;
        let heigth = 0;
        for (let i = begincell.Row.Index; i <= endcell.Row.Index; i++)
        {
            let row = this.Grid.Rows.Get(i);
            if (row != null)
            {
                if (row.Visible)
                {
                    heigth = row.Height + heigth;
                }
            }
        }
        this.Height = heigth;

        let rmin = begincell.Row.Index;
        let cmin = begincell.Column.Index;
        let rmax = endcell.Row.Index;
        let cmax = endcell.Column.Index;

        rmin = Math.max(rmin, this.Grid.FirstDisplayedRowIndex);
        cmin = Math.max(cmin, this.Grid.FirstDisplayedColumnIndex);
        rmax = Math.min(rmax, this.Grid.EndDisplayedRowIndex);
        cmax = Math.min(cmax, this.Grid.EndDisplayedColumnIndex);

        this.VisableTop = this.Top;
        this.VisableLeft = this.Left;
        this.freshVisableSize(rmin, cmin, rmax, cmax);
        this.freshVisablePointTop(begincell.Row.Index, this.Grid.FirstDisplayedRowIndex);
        this.freshVisablePointLeft(begincell.Column.Index, this.Grid.FirstDisplayedColumnIndex);

    }
    private freshVisablePointTop(rindex:any, findex:any)
    {
        if (rindex >= findex)
        {
            let row = this.Grid.Rows.Get(rindex);
            if (row == null)
            {
                this.VisableTop = DataExcelDefaultValue.dafaultRowHeight;
                this.Top = DataExcelDefaultValue.dafaultRowHeight;
            }
            else
            {
                this.VisableTop = row.Top;
                this.Top = row.Top;
            }
        }
        else
        {
            let row = this.Grid.Rows.Get(findex);
            let top = 0;
            if (row == null)
            {
                this.VisableTop = DataExcelDefaultValue.dafaultRowHeight;
                top = DataExcelDefaultValue.dafaultRowHeight;
            }
            else
            {
                this.VisableTop = row.Top;
                top = row.Top;
            }
            for (let i = findex - 1; i >= rindex; i--)
            {
                row = this.Grid.Rows.Get(i);
                if (row != null)
                {
                    if (row.Visible)
                    {
                        top = top - row.Height;
                    }
                }
            }

            this.Top = top;
        }
    }
    private freshVisablePointLeft(cindex:any, findex:any)
    {
        if (cindex >= findex)
        {
            let column = this.Grid.Columns.Get(cindex);
            if (column == null)
            {
                this.VisableLeft = DataExcelDefaultValue.defaultColumnWidth;
                this.Left = DataExcelDefaultValue.defaultColumnWidth;
            }
            else
            {
                this.VisableLeft = column.Left;
                this.Left = column.Left;
            }
        }
        else
        {
            let column = this.Grid.Columns.Get(findex);
            let left = 0;
            if (column == null)
            {
                this.VisableLeft = DataExcelDefaultValue.defaultColumnWidth;
                left = DataExcelDefaultValue.defaultColumnWidth;
            }
            else
            {
                this.VisableLeft = column.Left;
                left = column.Left;
            }
            for (let i = findex - 1; i >= cindex; i--)
            {
                column = this.Grid.Columns.Get(i);
                if (column != null)
                {
                    if (column.Visible)
                    {
                        left = left - column.Width;
                    }
                }
            }

            this.Left = left;
        }
    }
    private freshVisableSize(rmin:number, cmin:number, rmax:number, cmax:number)
    {
        let width = 0;
        for (let i = cmin; i <= cmax; i++)
        {
            let column = this.Grid.Columns.Get(i);
            if (column != null)
            {
                if (column.Visible)
                {
                    width = column.Width + width;
                }
            }

        }
        this.VisableWidth = width;

        let heigth = 0;
        for (let i = rmin; i <= rmax; i++)
        {
            let row = this.Grid.Rows.Get(i);
            if (row != null)
            {
                if (row.Visible)
                {
                    heigth = row.Height + heigth;
                }
            }
        }
        this.VisableHeight = heigth;
    }
 
    private _left: number = 0;
    private _top: number = 0;
    private _width: number = 0;
    private _height: number = 0;
    public get Left()
    {
        return this._left;
    }
    public get Top()
    {
        return this._top;
    }
    public get Width()
    {
        return this._width;
    }
    public get Height()
    {
        return this._height;
    }
    public set Left(value: number)
    {
        this._left = value;
    }
    public set Top(value: number)
    {
        this._top = value;
    }
    public set Width(value: number)
    {
        this._width = value;
    }
    public set Height(value: number)
    {
        this._height = value;
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
    private _VisableWidth: number = 0;
    public get VisableWidth(): number
    {
        return this._VisableWidth;
    }
    public set VisableWidth(value: number)
    {
        this._VisableWidth = value;
    }
    private _VisableHeight: number = 0;
    public get VisableHeight(): number
    {
        return this._VisableHeight;
    }
    public set VisableHeight(value: number)
    {
        this._VisableHeight = value;
    }
    private _VisableLeft: number = 0;
    public get VisableLeft(): number
    {
        return this._VisableLeft;
    }
    public set VisableLeft(value: number)
    {
        this._VisableLeft = value;
    }
    private _VisableTop: number = 0;
    public get VisableTop(): number
    {
        return this._VisableTop;
    }
    public set VisableTop(value: number)
    {
        this._VisableTop = value;
    }
 
 
    private _BackColor: any;
    public get BackColor(): any
    { 
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
    constructor()
    { 
    }

 
    private ondrawbacktimes: number = 0;
    OnDrawBack(sender:any, g: Graphics)
    {
        if (this.ondrawbacktimes >= g.drawTimes)
        {
            return;
        }
        this.ondrawbacktimes = g.drawTimes;
        if (!this.Visible)
            return;
        if (this.Grid == null)
            console.log("this.Grid == null"); 
        if (this.BackColor != null)
        {
            g.FillRect(this.BackColor, this.VisableLeft, this.VisableTop, this.VisableWidth, this.VisableHeight);
        }
        if (!ConvertHelper.StringIsNullOrEmpty(this.BackImage))
        {
            g.FillRectangleImage(this.BackImage, this.Rect, this.BackImageImageLayout, null, 1);
        }
    }
 
    ReSetCellParent()
    {
        let begincell = this._begincell;
        let endcell = this._endcell;
        let rmin = Math.min(begincell.Row.Index, endcell.Row.Index);
        let cmin = Math.min(begincell.Column.Index, endcell.Column.Index);
        let rmax = Math.max(begincell.Row.Index, endcell.Row.Index);
        let cmax = Math.max(begincell.Column.Index, endcell.Column.Index);
        if (this._begincell == null)
        {
            return;
        }
        if (this._endcell == null)
        {
            return;
        }
        for (let i = rmin; i <= rmax; i++)
        {
            for (let j = cmin; j <= cmax; j++)
            {
                let cell = this.Grid.GetCellByIndex(i, j);
                if (cell !== null)
                {
                    cell.OwnBackCell = this;
                }
            }
        }
    }
}
