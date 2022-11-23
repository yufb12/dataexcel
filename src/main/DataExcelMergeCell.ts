import { GridLineStyle } from "../Base/CellHeaderStyle";
import { ConvertHelper } from "../Base/ConvertHelper";
import { DataExcelDefaultValue } from "../Base/MouseButtons";
import { StringAlignment } from "../Base/StringAlignment";
import { Graphics } from "../Drawing/Graphics";
import { DataExcelRow } from "../export";
import { DataExcel } from "./DataExcel";
import { DataExcelCell } from "./DataExcelCell";
import { DataExcelColumn } from "./DataExcelColumn";

export class DataExcelMergeCell extends DataExcelCell {

    public get Row(): DataExcelRow {
        return this._begincell.Row;
    }
    public set Row(cell: DataExcelRow) {
        this.Grid = cell.Grid;
        this._begincell.Row = cell;
    }
    public get Column(): DataExcelColumn {
        return this._begincell.Column;
    }
    public set Column(cell: DataExcelColumn) {
        this._begincell.Column = cell;
    }

    public Selected: boolean;
    private _Released: boolean = false;
    public get Released(): boolean {
        return this._Released;
    }
    public set Released(value: boolean) {
        this._Released = value;
    }
    public Grid: DataExcel;
    private _begincell: DataExcelCell;
    public get BeginCell(): DataExcelCell {
        return this._begincell;
    }
    public set BeginCell(cell: DataExcelCell) {
        this.Grid = cell.Grid;
        this._begincell = cell;
    }

    private _endcell: DataExcelCell;
    public get EndCell(): DataExcelCell {
        return this._endcell;
    }
    public set EndCell(cell: DataExcelCell) {
        this._endcell = cell;
        let firstcell = this._begincell;
        let endcell = this._endcell;
        if (firstcell == null || endcell == null)
            return;
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


    public MaxRowIndex(): number {
        return this.EndCell.Row.Index;
    }
    public MaxColumnIndex(): number {
        return this.EndCell.Column.Index;
    }

    public get Visible(): boolean {
        return this._begincell.Visible;
    }
    public set Visible(value: boolean) {
        this._begincell.Visible = value;
    }

    public get Text(): string {
        return this._begincell.Text;
    }
    public set Text(value: string) {
        this._begincell.Text = value;
    }

    public get Value(): object {
        return this._begincell.Value;
    }
    public set Value(value: object) {
        this._begincell.Value = value;
    }

    public get AutoMultiline(): boolean {
        return this._begincell.AutoMultiline;
    }
    public set AutoMultiline(value: boolean) {
        this._begincell.AutoMultiline = value;
    }

    public get LeftLineStyle(): any {
        return this.BeginCell.LeftLineStyle;
    }
    public set LeftLineStyle(value: any) {
        this.BeginCell.LeftLineStyle = value;
    }
    public get TopLineStyle(): any {
        return this.BeginCell.TopLineStyle;
    }
    public set TopLineStyle(value: any) {
        this.BeginCell.TopLineStyle = value;
    }
    public get RightLineStyle(): any {
        return this.BeginCell.RightLineStyle;
    }
    public set RightLineStyle(value: any) {
        this.BeginCell.RightLineStyle = value;
    }
    public get BottomLineStyle(): any {
        return this.BeginCell.BottomLineStyle;
    }
    public set BottomLineStyle(value: any) {
        this.BeginCell.BottomLineStyle = value;
    }

    public get VerticalAlignment(): StringAlignment {
        return this._begincell.VerticalAlignment;
    }
    public set VerticalAlignment(value: StringAlignment) {
        this._begincell.VerticalAlignment = value;
    }

    public get HorizontalAlignment(): StringAlignment {
        return this._begincell.HorizontalAlignment;
    }
    public set HorizontalAlignment(value: StringAlignment) {
        this._begincell.HorizontalAlignment = value;
    }

    public GetData() {
        let data = {
            begincellrowindex: this.BeginCell.Row.Index,
            begincellcolumnindex: this.BeginCell.Column.Index,
            endcellrowindex: this.EndCell.Row.Index,
            endcellcolumnindex: this.EndCell.Column.Index,
        };
        return data;
    }
    public SetData(grid: DataExcel, data: any) {
        let begincell = grid.GetCellByIndex(data.begincellrowindex, data.begincellcolumnindex);
        let endcell = grid.GetCellByIndex(data.endcellrowindex, data.endcellcolumnindex);
        this.BeginCell = begincell;
        this.EndCell = endcell;
    }

    Refresh() {
        let begincell = this._begincell;
        let endcell = this._endcell;
        this.Top = begincell.Top;
        this.Left = begincell.Left;
        let width = 0;
        for (let i = begincell.Column.Index; i <= endcell.Column.Index; i++) {
            let column = this.Grid.Columns.Get(i);
            if (column != null) {
                if (column.Visible) {
                    width = column.Width + width;
                }
            }

        }
        this.Width = width;
        let heigth = 0;
        for (let i = begincell.Row.Index; i <= endcell.Row.Index; i++) {
            let row = this.Grid.Rows.Get(i);
            if (row != null) {
                if (row.Visible) {
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
    private freshVisablePointTop(rindex: any, findex: any) {
        if (rindex >= findex) {
            let row = this.Grid.Rows.Get(rindex);
            if (row == null) {
                this.VisableTop = DataExcelDefaultValue.dafaultRowHeight;
                this.Top = DataExcelDefaultValue.dafaultRowHeight;
            }
            else {
                this.VisableTop = row.Top;
                this.Top = row.Top;
            }
        }
        else {
            let row = this.Grid.Rows.Get(findex);
            let top = 0;
            if (row == null) {
                this.VisableTop = DataExcelDefaultValue.dafaultRowHeight;
                top = DataExcelDefaultValue.dafaultRowHeight;
            }
            else {
                this.VisableTop = row.Top;
                top = row.Top;
            }
            for (let i = findex - 1; i >= rindex; i--) {
                row = this.Grid.Rows.Get(i);
                if (row != null) {
                    if (row.Visible) {
                        top = top - row.Height;
                    }
                }
            }

            this.Top = top;
        }
    }
    private freshVisablePointLeft(cindex: any, findex: any) {
        if (cindex >= findex) {
            let column = this.Grid.Columns.Get(cindex);
            if (column == null) {
                this.VisableLeft = DataExcelDefaultValue.defaultColumnWidth;
                this.Left = DataExcelDefaultValue.defaultColumnWidth;
            }
            else {
                this.VisableLeft = column.Left;
                this.Left = column.Left;
            }
        }
        else {
            let column = this.Grid.Columns.Get(findex);
            let left = 0;
            if (column == null) {
                this.VisableLeft = DataExcelDefaultValue.defaultColumnWidth;
                left = DataExcelDefaultValue.defaultColumnWidth;
            }
            else {
                this.VisableLeft = column.Left;
                left = column.Left;
            }
            for (let i = findex - 1; i >= cindex; i--) {
                column = this.Grid.Columns.Get(i);
                if (column != null) {
                    if (column.Visible) {
                        left = left - column.Width;
                    }
                }
            }

            this.Left = left;
        }
    }
    private freshVisableSize(rmin: any, cmin: any, rmax: any, cmax: any) {
        let width = 0;
        for (let i = cmin; i <= cmax; i++) {
            let column = this.Grid.Columns.Get(i);
            if (column != null) {
                if (column.Visible) {
                    width = column.Width + width;
                }
            }

        }
        this.VisableWidth = width;

        let heigth = 0;
        for (let i = rmin; i <= rmax; i++) {
            let row = this.Grid.Rows.Get(i);
            if (row != null) {
                if (row.Visible) {
                    heigth = row.Height + heigth;
                }
            }
        }
        this.VisableHeight = heigth;
    }
    public get OwnEditControl() {
        return this.BeginCell.OwnEditControl;
    }
    public set OwnEditControl(value) {
        this.BeginCell.OwnEditControl = value;
    }
    private _left: number = 0;
    private _top: number = 0;
    private _width: number = 0;
    private _height: number = 0;
    public get Left() {
        return this._left;
    }
    public get Top() {
        return this._top;
    }
    public get Width() {
        return this._width;
    }
    public get Height() {
        return this._height;
    }
    public set Left(value: number) {
        this._left = value;
    }
    public set Top(value: number) {
        this._top = value;
    }
    public set Width(value: number) {
        this._width = value;
    }
    public set Height(value: number) {
        this._height = value;
    }

    private _VisableWidth: number = 0;
    public get VisableWidth(): number {
        return this._VisableWidth;
    }
    public set VisableWidth(value: number) {
        this._VisableWidth = value;
    }
    private _VisableHeight: number = 0;
    public get VisableHeight(): number {
        return this._VisableHeight;
    }
    public set VisableHeight(value: number) {
        this._VisableHeight = value;
    }
    private _VisableLeft: number = 0;
    public get VisableLeft(): number {
        return this._VisableLeft;
    }
    public set VisableLeft(value: number) {
        this._VisableLeft = value;
    }
    private _VisableTop: number = 0;
    public get VisableTop(): number {
        return this._VisableTop;
    }
    public set VisableTop(value: number) {
        this._VisableTop = value;
    }

    public get Style(): any {
        return this.BeginCell.Style;
    }

    public set Style(value: any) {
        this.BeginCell.Style = value;
    }
    public get Font(): FontFace {
        return this.BeginCell.Font;
    }
    public set Font(value: FontFace) {
        this.BeginCell.Font = value;
    }
    public get ForeColor(): any {
        return this.BeginCell.ForeColor;

    }
    public set ForeColor(value: any) {
        this.BeginCell.ForeColor = value;
    }
    public get BackColor(): any {
        return this.BeginCell.BackColor;
    }
    public set BackColor(value: any) {
        this.BeginCell.BackColor = value;
    }

    public get Format(): string {
        return this.BeginCell.Format;
    }
    public set Format(value: string) {
        this.BeginCell.Format = value;
    }

    public get FormatType(): string {
        return this.BeginCell.FormatType;
    }
    public set FormatType(value: string) {
        this.BeginCell.FormatType = value;
    }

    public get BackImage(): string {
        return this.BeginCell.BackImage;
    }
    public set BackImage(value: string) {
        this.BeginCell.BackImage = value;
    }
    public get BackImageImageLayout(): number {
        return this.BeginCell.BackImageImageLayout;
    }
    public set BackImageImageLayout(value: number) {
        this.BeginCell.BackImageImageLayout = value;
    }
    constructor() {
        super();
    }

    private ondrawtimes: number = 0;
    OnDraw(sender: any, g: Graphics) {
        if (this.ondrawtimes >= g.drawTimes) {
            return;
        }
        this.ondrawtimes = g.drawTimes;
        if (!this.Visible)
            return;
        if (this.Grid == null)
            console.log("this.Grid == null");
        if (this.OwnEditControl != null) {
            let res = this.OwnEditControl.OnDraw(sender, g);
            if (res)
                return;
        }
        //g.FillRect(this.ForeColor, this.Left, this.Top, this.Column.Width, this.Row.Height);
        var text = "";// this.Row.Index + "" + this.Column.Index;
        if (this.Text != null) {
            text = this.Text;
        }
        if (!ConvertHelper.StringIsNullOrEmpty(this.Format)) {
            text = ConvertHelper.GetFromatString(this.Value, this.Format, this.FormatType);
        }
        let style = {} as any;

        style = this.Style;
        //text = this.ondrawtimes + ":" + text;
        style.text = text;
        style.font = this.Font;
        style.fill = this.ForeColor;
        style.overflow = '';
        if (this.AutoMultiline) {
            style.overflow = 'break';
        }

        if (this.AutoMultiline) {
            style.overflow = "break";
        }
        else {
            style.overflow = "";
        }
        g.DrawTextClipRectStyle2(text, this.Left, this.Top, this.Width, this.Height, this.VisableLeft, this.VisableTop, this.VisableWidth, this.VisableHeight, style);
    }

    private ondrawbacktimes: number = 0;
    OnDrawBack(sender: any, g: Graphics) {
        if (this.ondrawbacktimes >= g.drawTimes) {
            return;
        }
        this.ondrawbacktimes = g.drawTimes;
        if (!this.Visible)
            return;
        if (this.Grid == null)
            console.log("this.Grid == null");
        if (this.OwnEditControl != null) {
            let res = this.OwnEditControl.OnDrawBack(sender, g);
            if (res)
                return;
        }
        if (this.BackColor != null) {
            g.FillRect(this.BackColor, this.VisableLeft, this.VisableTop, this.VisableWidth, this.VisableHeight);
        }
        if (!ConvertHelper.StringIsNullOrEmpty(this.BackImage)) {
            g.FillRectangleImage(this.BackImage, this.Rect, this.BackImageImageLayout, null, 1);
        }
    }
    private ondrawbordertimes: number = 0;
    OnDrawBorder(sender: any, g: Graphics) {
        if (this.ondrawbordertimes >= g.drawTimes) {
            return;
        }
        this.Debug(this);
        this.ondrawbordertimes = g.drawTimes;
        let left = this.VisableLeft;
        let right = this.VisableLeft + this.VisableWidth;
        let top = this.VisableTop;
        let bottom = this.VisableTop + this.VisableHeight;
        if (this.LeftLineStyle != null) {
            g.DrawLineStyle(this.LeftLineStyle, left, top, left, bottom);
        }

        if (this.TopLineStyle != null) {
            g.DrawLineStyle(this.TopLineStyle, left, top, right, top);
        }

        if (this.RightLineStyle != null) {
            g.DrawLineStyle(this.RightLineStyle, right, top, right, bottom);
        }

        if (this.BottomLineStyle != null) {
            g.DrawLineStyle(this.BottomLineStyle, left, bottom, right, bottom);
        }

    }
    private ondrawgridlinetimes: number = 0;
    OnDrawGridLine(sender: any, g: Graphics) {
        if (this.ondrawgridlinetimes >= g.drawTimes) {
            return;
        }
        this.Debug(this);
        this.ondrawgridlinetimes = g.drawTimes;
        let left = this.VisableLeft;
        let right = this.VisableLeft + this.VisableWidth;
        let top = this.VisableTop;
        let bottom = this.VisableTop + this.VisableHeight;

        if (this.RightLineStyle == null) {
            g.DrawLine(GridLineStyle.stroke, right, top, right, bottom);
        }

        if (this.BottomLineStyle == null) {
            g.DrawLine(GridLineStyle.stroke, left, bottom, right, bottom);
        }

    }

    OnInput(e: any): void {
        let cell = this["cell"] as DataExcelCell;
        cell.Text = this["value"];
        cell.Grid.graphic.Clear();
        cell.Grid.RePaint(e);
    }
    OnChange(e: Event) {
        //var cell = this["cell"];
        //cell.Text = this["value"];
        //cell.Grid.Context.clearRect(0, 0, cell.Grid.Control.width, cell.Grid.Control.height);
        //cell.Grid.RePaint();
    }

    ReSetCellParent() {
        let begincell = this._begincell;
        let endcell = this._endcell;
        let rmin = Math.min(begincell.Row.Index, endcell.Row.Index);
        let cmin = Math.min(begincell.Column.Index, endcell.Column.Index);
        let rmax = Math.max(begincell.Row.Index, endcell.Row.Index);
        let cmax = Math.max(begincell.Column.Index, endcell.Column.Index);
        if (this._begincell == null) {
            return;
        }
        if (this._endcell == null) {
            return;
        }
        for (let i = rmin; i <= rmax; i++) {
            for (let j = cmin; j <= cmax; j++) {
                let cell = this.Grid.GetCellByIndex(i, j);
                if (cell !== null) {
                    cell.OwnMergeCell = this;
                }
            }
        }
    }
}
