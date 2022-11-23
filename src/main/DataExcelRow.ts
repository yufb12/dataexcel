import { CheckState } from "../Base/ConstantValue";
import { DataExcelConsole } from "../Base/DataExcelConsole";
import { DataExcelDefaultValue } from "../Base/MouseButtons";
import { Rect, Zoom } from "../Base/Point";
import { IZoom } from "../Control/IViewEvent";
import { Graphics } from "../Drawing/Graphics";
import { DataExcelCellEditBase } from "../Edit/DataExcelCellEditBase";
import { DataExcel } from "./DataExcel";
import { DataExcelCell } from "./DataExcelCell";
import { DataExcelCellCollection } from "./DataExcelCellCollection";
import { DataExcelColumn } from "./DataExcelColumn";

export class DataExcelRow implements IZoom
{
    public Visible: boolean;
    public Left: number;
    public Top: number;
    public Width: number;
    public Height = 20;
    public Grid: DataExcel;
    public ForeColor = "#00887733";
    public SelectBackColor = "#00337733";

    public Index: number;
    public Cells: DataExcelCellCollection;
    public Selected: boolean;

    private _font:any;
    public get Font()
    {
        if (this._font == null)
        {
            return this.Grid.Font;
        }
        return this._font;
    }
    public set Font(value)
    {
        this._font = value;
    }

    public FullRowSelectedColor: any;
    public BackColor: any = null;

    public DefaultCellEdit: DataExcelCellEditBase;
    public get CellSelect()
    {
        if (this.Grid == null)
            return false;
        if (this.Grid.SelectCells == null)
            return false;
        let max = this.Grid.SelectCells.MaxRow();
        let min = this.Grid.SelectCells.MinRow();
        return (this.Index >= min && this.Index <= max);

    }
    private _ID: string;
    public get ID(): string
    {
        return this._ID;
    }
    public set ID(value: string)
    {
        this._ID = value;
    }
    private _ReadOnly: number = CheckState.Unkown;
    public get ReadOnly(): number
    {
        if (this._ReadOnly == CheckState.Unkown)
        {
            return this.Grid.ReadOnly;
        }
        return this._ReadOnly;
    }
    public set ReadOnly(value: number)
    {
        this._ReadOnly = value;
    }
    public GetData()
    {
        let data = {
            index: this.Index,
            height: this.Height,
            visible: this.Visible,
            id: this.ID,
            cells: [] as any[]
        };
        this.Cells.forEach((cell: DataExcelCell) =>
        {
            if (cell.Column != null)
            {
                data.cells.push(cell.GetData());
            }
        });

        return data;
    }
    public SetData(grid: DataExcel, data:any)
    {
        this.Index = data.index;
        this.Height = data.height;
        this.Visible = data.visible;
        this.ID = data.id;
        let len = data.cells.length;
        for (let i = 0; i < len; i++)
        {
            let celldata = data.cells[i];
            let cell = new DataExcelCell();
            cell.Grid = grid;
            cell.Row = this;
            cell.SetData(grid, celldata);
            this.Cells.Add(cell);
        }
    }
    constructor()
    {
        this.Visible = true;
        this.Left = 0;
        this.Top = 0;
        this.Width = 0;
        this.Height = DataExcelDefaultValue.dafaultRowHeight;
        this.Cells = new DataExcelCellCollection();
    }


    public get Name()
    {
        return this.Index + "";
    }

    OnDraw(sender:any, g: Graphics)
    {
        try
        {
            if (this.Grid == null)
                console.log("this.Grid == null");
            if (!this.Visible)
                return;
            if (this.Selected)
            {
                g.FillRectangle(this.FullRowSelectedColor, this.Left, this.Top, this.Grid.Width, this.Height);
            }
            else
            {
                if (this.BackColor != null)
                {
                    g.FillRectangle(this.BackColor, this.Left, this.Top, this.Grid.Width, this.Height);
                }
            }
            var length = this.Grid.AllVisibleColumns.Count;
            for (var i = 0; i < length; i++)
            {
                var column = this.Grid.AllVisibleColumns.Get(i);
                var cell = this.Cells.Get(column);
                if (cell == null)
                {
                    cell = this.Grid.NewCell(this, column);
                }
                if (cell != null)
                {
                    cell.OnDraw(sender, g);
                }
            }

        } catch (e)
        {
            console.log(e);
        }
    }

    OnDrawBack(sender:any, g: Graphics)
    {
        if (this.Grid == null)
            console.log("this.Grid == null");
        var length = this.Grid.AllVisibleColumns.Count;
        for (var i = 0; i < length; i++)
        {
            try
            {
                var column = this.Grid.AllVisibleColumns.Get(i);
                var cell = this.Cells.Get(column);
                if (cell == null)
                {
                    cell = this.Grid.NewCell(this, column);
                }
                if (cell != null)
                {
                    cell.OnDrawBack(sender, g);
                }
            } catch (e)
            {
                console.log(e);
            }

        }
    }
    get Rect(): Rect
    {
        let rect = new Rect(0, 0, 0, 0);
        rect.X = this.Left;
        rect.Y = this.Top;
        rect.Width = this.Grid.Width;
        rect.Height = this.Height;
        return rect;
    }

    private _zoom: Zoom;
    SetZoom(zoom: Zoom): boolean
    {
        try
        {
            this.Height = this.Height * zoom.Height;
            this._zoom = zoom;
            this.Cells.forEach((value: DataExcelCell, key: DataExcelColumn) =>
            {
                value.SetZoom(zoom);
            });
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
