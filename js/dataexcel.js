const about = {
    Url: "http://www.dataexcel.cn/"
};
class List extends Array {
    constructor() {
        super();
    }
    ;
    size() {
        return this.length;
    }
    add(value) {
        this.push(value);
        return this;
    }
    get(index) {
        return this[index];
    }
    removeIndex(index) {
        this.splice(index, 1);
    }
    remove(obj) {
        this.removeIndex(this.indexOf(obj));
    }
    indexOf(obj) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] === obj) {
                return i;
            }
            ;
        }
        return -1;
    }
    isEmpty() {
        return this.length == 0;
    }
    clear() {
        this.length = 0;
    }
    contains(obj) {
        return this.indexOf(obj) != -1;
    }
    Add(value) {
        this.push(value);
        return this;
    }
    Remove(obj) {
        this.removeIndex(this.indexOf(obj));
    }
    get Count() {
        return this.length;
    }
    Clear() {
        this.clear();
    }
    Contains(obj) {
        return this.indexOf(obj) != -1;
    }
}
const CellHeaderStyle = { Font: "13px ����", Color: "black", textPos: "inside", BackColor: "#DCDCDC", SelectBackColor: "#DAA520" };
const SelectStyle = {
    FouscedCellSelectBorderColor: "gray",
};
const SelectCellsStyle = {
    fill: "MediumAquaMarine",
    lineWidth: 2,
    stroke: "black",
    opacity: 0.3
};
const SelectCellsStyleAdd = {
    fill: "MediumAquaMarine",
    lineWidth: 1,
    stroke: "MediumAquaMarine",
};
const SelectCellsAddStyle = {
    fill: "LightSteelBlue",
    lineWidth: 2,
    stroke: "white",
    opacity: 0.3
};
const FocusedCellStyle = {
    fill: "gray",
    opacity: 0.3
};
const GridLineStyle = {
    stroke: "#C0C0C0"
};
const Palette = {
    AliceBlue: "AliceBlue",
    A3399FF80: "#3399FF80",
};
const ConstantValue = {
    MinRowIndex: 1,
    MinColumnIndex: 1,
    DATAEXCEL: 0x1301,
    DATAEXCEL_VSERION: 0x2101,
    DATAEXCEL_UPGRADE: 7,
    CopySplitSymbolRow: "\n",
    CopySplitSymbolColumn: "\t",
    NullValueIndex: -1,
    NullSize: -1,
    RowHeaderSplit: 5,
    ColumnHeaderSplit: 5,
    ErrorValue: "#Error",
    DateTimeDeafultFormat: "yyyy-MM-dd",
    ZeroLen: 0,
};
const Border = {
    all: "all",
    left: "left",
    right: "right",
    top: "top",
    bottom: "bottom",
};
const TextAlgin = {
    left: 'left',
    right: 'right',
    top: 'top',
    bottom: 'bottom',
    topleft: 'topleft',
    topright: 'topright',
    bottomleft: 'bottomleft',
    bottomright: 'bottomright'
};
const FormatType = {
    Null: "",
    Date: "Date",
    Num: "Num"
};
const CheckState = {
    Check: 1,
    Unkown: 2,
    UnCheck: 0
};
class ConvertHelper {
    static IsNumber(value) {
        if (typeof (value) == 'number') {
            return true;
        }
        if (!isNaN(value)) {
            return true;
        }
        let num = parseInt(value);
        if (!isNaN(num)) {
            return true;
        }
        return false;
    }
    static StringIsNullOrEmpty(text) {
        if (text == null)
            return true;
        if (text == "")
            return true;
        return false;
    }
    static ToInt(txt) {
        return parseInt(txt);
    }
    static ToDateTime(value) {
        let date = null;
        if (value instanceof Date) {
            date = value;
            return date;
        }
        else {
            let datevalue = Date.parse(value);
            if (!isNaN(date)) {
                date = new Date(datevalue);
                return date;
            }
            date = null;
        }
        return date;
    }
    static InsertString(txt, index, str) {
        return txt.slice(0, index) + str + txt.slice(index);
    }
    static DeleteString(txt, index, len) {
        return txt.slice(0, index) + txt.slice(index + len);
    }
    static NumberToString(value, format) {
        if (format == null)
            return value.toString();
        //let type = typeof (value);
        let num = Number(value);
        let txt = "";
        if (format.startsWith("¥")) {
            txt = num.toFixed(2);
            let index = txt.lastIndexOf(".");
            let str = txt.substring(index);
            for (var i = 1; i < index; i++) {
                if (i % 3 == 0) {
                    str = "," + txt[index - i] + str;
                }
                else {
                    str = txt[index - i] + str;
                }
            }
            return "¥" + txt;
        }
        let len = format.length;
        if (format.endsWith("%")) {
            len = (format.length - 1);
            txt = (num * 100).toFixed(len) + "%";
            return txt;
        }
        txt = num.toFixed(len);
        return txt;
    }
    static DateTimeToString(value, format) {
        let date = null;
        date = ConvertHelper.ToDateTime(value);
        if (date == null)
            return "";
        if (format == null)
            return date.toString();
        let txt = date.toString();
        switch (format) {
            case "yyyyMMdd":
                txt = date.getFullYear() + "" + date.getMonth() + "" + date.getDay();
                break;
            case "MM-dd":
                txt = date.getMonth() + "-" + date.getDay();
                break;
            case "yyyy-MM-dd":
                txt = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();
                break;
            case "HH:mm:ss":
                txt = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                break;
            case "HH:mm":
                txt = date.getHours() + ":" + date.getMinutes();
                break;
            case "yyyy-MM-dd HH:mm:ss":
                txt = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();
                txt = txt + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                break;
            default:
                break;
        }
        return txt;
    }
    static GetFromatString(value, format, formattype) {
        switch (formattype) {
            case FormatType.Date:
                return ConvertHelper.DateTimeToString(value, format);
            case FormatType.Num:
                return ConvertHelper.NumberToString(value, format);
            default:
                return value + "";
        }
    }
}
//
// ժҪ:
//     �ṩ�� Windows ����Ӧ�ó���ʹ�õ� System.Windows.Forms.Cursor ����ļ��ϡ�
const Cursors = {
    auto: "auto",
    no_drop: "no-drop",
    col_resize: "col-resize",
    row_resize: "row-resize",
    _default: "default",
    not_allowed: "not-allowed",
    crosshair: "crosshair",
    pointer: "pointer",
    move: "move",
    e_resize: "e-resize",
    ne_resize: "ne-resize",
    nw_resize: "nw-resize",
    n_resize: "n-resize",
    se_resize: "se-resize",
    sw_resize: "sw-resize",
    s_resize: "s-resize",
    w_resize: "w-resize",
    text: "text",
    wait: "wait",
    help: "help" //	
};
const DataExcelConsole = {
    log: function (title, e) {
        console.log(title + new Date().toLocaleTimeString());
        console.log(e);
    }
};
class Dictionary extends Map {
    constructor() {
        super();
    }
    add(k, v) {
        this.set(k, v);
    }
    Remove(k) {
        this.delete(k);
    }
    Clear() {
        this.clear();
    }
    Sort() {
    }
}
class EventView {
    constructor() {
        this.NeedRePaint = false;
    }
}
const ImageLayout = {
    None: 0,
    Tile: 1,
    Center: 2,
    Stretch: 3,
    Zoom: 4,
    Clip: 5,
    ZoomClip: 6,
};
////const License=
////{ 
////    AuthCode: "xxxxxxx",
////    LicenseKey: "TEST"
////}
const MouseButtons = { Left: 0, Right: 2, None: -1 };
const DataExcelDefaultValue = { dafaultRowHeight: 20, defaultColumnWidth: 72 };
var NextType;
(function (NextType) {
    NextType[NextType["Left"] = 0] = "Left";
    NextType[NextType["Up"] = 1] = "Up";
    NextType[NextType["Right"] = 2] = "Right";
    NextType[NextType["Down"] = 3] = "Down";
})(NextType || (NextType = {}));
class Point {
    constructor(x, y) {
        this.X = 0;
        this.Y = 0;
        this.X = x;
        this.Y = y;
    }
}
class Size {
    constructor(width, height) {
        this.Width = 0;
        this.Height = 0;
        this.Width = width;
        this.Height = height;
    }
}
class Rect {
    constructor(x, y, w, h) {
        this.X = 0;
        this.Y = 0;
        this.Width = 0;
        this.Height = 0;
        this.X = x;
        this.Y = y;
        this.Width = w;
        this.Height = h;
    }
    get Location() {
        let pt = new Point();
        pt.X = this.X;
        pt.Y = this.Y;
        return pt;
    }
    Init(x, y, w, h) {
        this.X = x;
        this.Y = y;
        this.Width = w;
        this.Height = h;
    }
    Contains(point) {
        if (point == null) {
            return false;
        }
        if (point.X >= this.X && point.X <= (this.X + this.Width)) {
            if (point.Y >= this.Y && point.Y <= (this.Y + this.Height)) {
                return true;
            }
        }
        return false;
    }
    get Bottom() {
        return this.Y + this.Height;
    }
    get Right() {
        return this.X + this.Width;
    }
    get Left() {
        return this.X;
    }
    get Top() {
        return this.Y;
    }
}
const SelectMode = {
    Null: 0,
    RowHeaderSelected: 1,
    RowHeaderSplitSelected: 2,
    FullRowSelected: 3,
    ColumnHeaderSelected: 4,
    ColumnHeaderSplitSelected: 5,
    FullColumnSelected: 6,
    CellAddSelected: 7,
    CellSelected: 8,
    MergeCellSelected: 9,
    ImageCellSelected: 10,
    TextCellSelected: 11,
    MergeCellAddSelected: 12,
    ImageCellSizeRectSelected: 13,
    ExtendCellSizeRectSelected: 14,
    VScrollMoveSelected: 15,
    HScrollMoveSelected: 16,
    VDataTableScrollerMoveSelected: 17,
    ChangedSize: 18,
    Drag: 19,
    CellRangeFunctionCellSelected: 20,
    TouchMove: 21,
};
var StringAlignment;
(function (StringAlignment) {
    StringAlignment[StringAlignment["Near"] = 0] = "Near";
    StringAlignment[StringAlignment["Center"] = 1] = "Center";
    StringAlignment[StringAlignment["Far"] = 2] = "Far";
})(StringAlignment || (StringAlignment = {}));
;
const Tool = {
    GetColumnHeaderByColumnIndex: (index) => {
        let columnheader = "";
        while (index > 0) {
            let m = index % 26;
            if (m == 0) {
                m = 26;
            }
            columnheader = String.fromCharCode(m + 64) + columnheader;
            index = (index - m) / 26;
        }
        return columnheader;
    }
};
const DefaultEdit = {
    GetDefauleEdit: function (cell) {
        if (cell.Row.Index == 0 && cell.Column.Index > 0) {
            let edit = new DataExcelCellColumnHeader();
            edit.Cell = cell;
            return edit;
        }
        if (cell.Column.Index == 0 && cell.Row.Index > 0) {
            let edit = new DataExcelCellRowHeader();
            edit.Cell = cell;
            return edit;
        }
        if (cell.Row.Index == 0 && cell.Column.Index == 0) {
            let edit = new DataExcelCellColumnHeader();
            edit.Cell = cell;
            return edit;
        }
        return null;
    }
};
const HeaderSplit = { ColumnHeaderSplit: 5, RowHeaderSplit: 5 };
////class EventMap2
////{
////    constructor()
////    { 
////    }
////    input: string[];
////    change: [][];
////}
////class Observer2
////{
////    private eventMap: EventMap2;
////    constructor()
////    {
////        this.eventMap = new EventMap2();
////    }
////    /**
////     * 注册事件
////     * @param {String} event 事件名称 
////     * @param {Function}  fn 回调函数 
////     */
////    on(event: string, fn)
////    {
////        const map = this.eventMap
////        if (!map[event])
////        {
////            map[event] = []
////        }
////        map[event].push(fn)
////    }
////    /**
////     * 触发事件
////     */
////    emit(event: string, ...args)
////    {
////        const map = this.eventMap
////        let arr = map[event];
////        if (arr == null)
////            return;
////        if (arr.length)
////        {
////            map[event].forEach(fn =>
////            {
////                try
////                {
////                    fn.apply(null, args)
////                } catch (e)
////                {
////                }
////            });
////        } else
////        {
////            console.error('无待执行函数')
////        }
////    }
////    /**
////     * 移除事件
////     */
////    off(event: string, fn)
////    {
////        const map = this.eventMap
////        const index = map[event]?.indexOf(fn)
////        if (index > -1)
////        {
////            map[event].splice(index, 1)
////        } else
////        {
////            console.error('目标函数不存在')
////        }
////    }
////    onOnce(event: string, fn)
////    {
////        const self = this
////        function on()
////        {
////            fn.apply(null, arguments) 
////            self.off(event, on) 
////        }
////        this.on(event, on) 
////    }
////}
class EventMap {
    constructor() {
        this.Dics = new Dictionary();
    }
}
class Observer {
    constructor() {
        this.eventMap = new EventMap();
    }
    on(event, fn) {
        let funs = this.eventMap.Dics.get(event);
        if (funs == null) {
            funs = new List();
            this.eventMap.Dics.add(event, funs);
        }
        funs.Add(fn);
    }
    emit(event, ...args) {
        let funs = this.eventMap.Dics.get(event);
        if (funs == null)
            return;
        funs.forEach(fn => {
            try {
                fn.apply(null, args);
            }
            catch (e) {
            }
        });
    }
    off(event, fn) {
        let funs = this.eventMap.Dics.get(event);
        if (funs == null)
            return;
        funs.Remove(fn);
    }
}
const Events = {
    FirstDisplayRowChanged: "FirstDisplayRowChanged",
    FirstDisplayColumnChanged: "FirstDisplayCclumnChanged",
    CellInitEdit: "CellInitEdit",
    FocusedCellChanged: "FocusedCellChanged",
    EndEdit: "EndEdit",
    CellValueChanged: "CellValueChanged",
};
class ScrollerView {
    constructor() {
        this._min = 1;
        this._max = 100;
        this._thickness = 10;
        this._height = 0;
        this._left = 0;
        this._top = 0;
        this._width = 0;
        this._scrolltop = 0;
        this._value = 1;
        this._smallchange = 1;
        this._largechange = 3;
        this._visible = true;
        this._MoveSelected = false;
    }
    get Height() {
        return this._height;
    }
    set Height(value) {
        this._height = value;
    }
    get Right() {
        return this._left + this.Width;
    }
    get Bottom() {
        return this.Top + this.Height;
    }
    get Left() {
        return this._left;
    }
    set Left(value) {
        this._left = value;
    }
    get Top() {
        return this._top;
    }
    set Top(value) {
        this._top = value;
    }
    get Width() {
        return this._width;
    }
    set Width(value) {
        this._width = value;
    }
    get Thickness() {
        return this._thickness;
    }
    set Thickness(value) {
        this._thickness = value;
    }
    get ScrollTop() {
        return this._scrolltop;
    }
    set ScrollTop(value) {
        this._scrolltop = value;
    }
    get Header() {
        return this._Header;
    }
    set Header(value) {
        this._Header = value;
    }
    get Max() {
        return this._max;
    }
    set Max(value) {
        this._max = value;
        if (this._max < 1) {
            this._max = 0;
        }
        this.RefreshScrollThumd();
    }
    get Min() {
        return this._min;
    }
    set Min(value) {
        this._min = value;
    }
    get Value() {
        return this._value;
    }
    set Value(value) {
        if (value == this.Value) {
            return;
        }
        if (value < this.Min) {
            value = this.Min;
        }
        this._value = value;
        this.OnValueChanged(this._value);
        this.RefreshScrollThumd();
    }
    get SmallChange() {
        return this._smallchange;
    }
    set SmallChange(value) {
        this._smallchange = value;
    }
    get LargeChange() {
        return this._largechange;
    }
    set LargeChange(value) {
        this._largechange = value;
        this.RefreshScrollThumd();
    }
    get Rect() {
        let left = this.Left;
        let top = this.Top;
        let width = this.Width;
        let height = this.Height;
        return new Rect(left, top, width, height);
    }
    get Visible() {
        return this._visible;
    }
    set Visible(value) {
        this._visible = value;
    }
    get MoveSelected() {
        return this._MoveSelected;
    }
    set MoveSelected(value) {
        this._MoveSelected = value;
    }
    get Count() {
        return this.Max - this.Min;
    }
    ProvPage() {
        let value = this._value - this.LargeChange;
        this.Value = value < this._min ? this._min : value;
    }
    Prov() {
        let value = this._value - this._smallchange;
        this.Value = value < this._min ? this._min : value;
    }
    NextPage() {
        let value = this._value + this.LargeChange;
        this.Value = value > this._max ? this._max : value;
    }
    Next() {
        let value = this._value + this._smallchange;
        this.Value = value > this._max ? this._max : value;
    }
    Home() {
        this.Value = this._min;
    }
    End() {
        this.Value = this._max;
    }
    Clear() {
        this._min = 0;
        this._max = 0;
        this._smallchange = 1;
        this._value = 0;
        this._thickness = 10;
        this._scrolltop = 0;
    }
    OnDraw(g) {
        return false;
    }
    RefreshScrollThumd() {
        let count = this.Count;
        if (count < 1) {
            count = 1;
        }
        let height = this.BodyArea.Height;
        let large = this.LargeChange;
        let thickness = 1 * height * (1 / (count + 1) * 1);
        if (thickness < 36) {
            thickness = 36;
        }
        this.Thickness = thickness;
        let smallwidth = 1 * (height - thickness) / count;
        let top = ((this.Value - this.Min) * smallwidth);
        if ((top + thickness) > height) {
            top = height - thickness;
        }
        this.ScrollTop = top;
    }
    DoOnMouseMove(pt) {
        if (this.MoveSelected) {
            let pd = this.GetMovePoint(pt, this.downsize);
            this.PointToIndex(pd);
            this.RefreshScrollThumd();
            return true;
        }
        return false;
    }
    DoOnMouseClick(pt) {
        if (this.MoveSelected)
            return false;
        if (this.UpArrowArea.Contains(pt)) {
            this.Prov();
            //if (this.UpArrowAreaClick != null)
            //{
            //    this.UpArrowAreaClick(this, pt);
            //}
            return true;
        }
        if (this.DownArrowArea.Contains(pt)) {
            this.Next();
            //if (this.DownArrowAreaClick != null)
            //{
            //    this.DownArrowAreaClick(this, pt);
            //}
            return true;
        }
        return false;
    }
    DoOnMouseDown(pt) {
        if (this.Rect.Contains(pt)) {
            if (this.ThumdArea.Contains(pt)) {
                this.downpoint = pt;
                let pth = this.ThumdArea.Location;
                this.downsize = new Size(pt.X - pth.X, pt.Y - pth.Y);
                this.MoveSelected = true;
                //if (this.ThumdAreaClick != null)
                //{
                //    this.ThumdAreaClick(this, pt);
                //}
                return true;
            }
            if (this.BodyArea.Contains(pt)) {
                this.PointToIndex(pt);
            }
            if (this.DownArrowArea.Contains(pt)) {
                this.Next();
            }
            if (this.UpArrowArea.Contains(pt)) {
                this.Prov();
            }
            return true;
        }
        return false;
    }
    DoOnMouseUp() {
        this.MoveSelected = false;
        return false;
    }
    OnValueChanged(value) {
        //if (ValueChanged != null)
        //{
        //    ValueChanged(this, value);
        //}
    }
    PointToIndex(pt) {
        let count = this.Count;
        let height = this.BodyArea.Height;
        let large = this.LargeChange;
        let thickness = (1 * height * large / count);
        let smallwidth = 1 * (height - thickness) / count;
        let pheight = pt.Y - this.Top - this.Header;
        let topcount = pheight / smallwidth;
        let i = topcount;
        this.Value = this.Min + i;
    }
    GetMovePoint(pt, sf) {
        let pd = new Point(pt.X, pt.Y - sf.Height);
        return pd;
    }
    get BodyArea() {
        return new Rect(this.Left, this.Top + this.Header, this.Width, this.Height - this.Header - this.Header);
    }
    get UpArrowArea() {
        let rects = this.Rect;
        return new Rect(rects.X, rects.Y, rects.Width, this.Header);
    }
    get DownArrowArea() {
        let rects = this.Rect;
        return new Rect(rects.X, rects.Bottom - this.Header, rects.Width, this.Header);
    }
    get ThumdArea() {
        let rects = this.Rect;
        return new Rect(rects.X, rects.Y + this.Header + this.ScrollTop, this.Rect.Width - 2, this.Thickness);
    }
}
class VScrollerView extends ScrollerView {
    constructor() {
        super();
    }
    get Width() {
        if (this._width < 18) {
            return 18;
        }
        return this._width;
    }
    set Width(value) {
        this._width = value;
    }
    DrawArrow(g) {
        this.DrawUpArrow(g);
        this.DrawDownArrow(g);
    }
    DrawArea(g) {
        let rect = this.Rect;
        VScrollerSkin.DrawArea(g, rect);
    }
    DrawBorder(g) {
        return;
    }
    DrawThumdBack(g) {
        if (this.Thickness <= 0)
            return;
        VScrollerSkin.DrawThumdBack(g, this.ThumdArea, this.MoveSelected);
    }
    DrawThumd(g) {
        VScrollerSkin.DrawThumd(g, this.ThumdArea, this.Thickness);
    }
    DrawUpArrow(g) {
        let rects = this.Rect;
        let rectt = new Rect(rects.X, rects.Y, rects.Width, this.Header);
        VScrollerSkin.DrawUpArrow(g, rectt);
    }
    DrawDownArrow(g) {
        let rects = this.Rect;
        let rectt = new Rect(rects.X, rects.Height - this.Header, rects.Width, this.Header);
        VScrollerSkin.DrawDownArrow(g, rectt);
    }
    OnDraw(g) {
        if (this.Visible) {
            this.DrawArea(g);
            this.DrawThumdBack(g);
            this.DrawArrow(g);
            this.DrawThumd(g);
            this.DrawBorder(g);
        }
        return false;
    }
}
class DataExcelViewVScroll extends VScrollerView {
    constructor(grid) {
        super();
        this._Grid = null;
        this.lck = false;
        this._Grid = grid;
        grid.On(Events.FirstDisplayRowChanged, this.Grid_FirstDisplayRowChanged);
    }
    Grid_FirstDisplayRowChanged(args) {
        try {
            let sender = args[0];
            let target = args[1];
            let index = args[2];
            if (index > target.Max) {
                target.Max = index;
            }
            target.Value = index;
            target.RefreshScrollThumd();
        }
        catch (ex) {
            DataExcelConsole.log("Grid_FirstDisplayRowChanged", ex);
        }
    }
    get Grid() {
        return this._Grid;
    }
    get Header() {
        return this.Grid.ContentTop;
    }
    get Height() {
        return this.Grid.Height - this.Width - this.Top;
    }
    get Left() {
        return this.Grid.Width - this.Width;
    }
    get Rect() {
        return new Rect(this.Left, this.Top, this.Width, this.Height);
    }
    get Top() {
        return 0;
    }
    //public OnValueChanged(value: number)
    //{
    //    if (!this.Visible)
    //        return;
    //    try
    //    {
    //        if (this.lck)
    //            return;
    //        this.lck = true;
    //        let position = value;
    //        this.Grid.FirstDisplayedRowIndex = (position);
    //    }
    //    catch (ex)
    //    {
    //        DataExcelConsole.log("OnValueChanged", ex);
    //    }
    //    finally
    //    {
    //        this.lck = false;
    //    }
    //}
    OnMouseDown(sender, e, ve) {
        if (!this.Visible)
            return false;
        let pt = new Point(e.offsetX, e.offsetY);
        //let pt = point;// this.Grid.PointControlToView(e.Location);
        if (this.Rect.Contains(pt)) {
            return this.DoOnMouseDown(pt);
        }
        return false;
    }
    OnMouseUp(sender, e, ve) {
        if (!this.Visible)
            return false;
        this.MoveSelected = false;
        return this.DoOnMouseUp();
    }
    OnMouseMove(sender, e, ve) {
        if (!this.Visible)
            return false;
        //let pt = this.Grid.PointControlToView(e.Location);
        let pt = new Point(e.offsetX, e.offsetY);
        //if (this.Rect.Contains(pt) && this.MoveSelected)
        if (this.MoveSelected) {
            let res = this.DoOnMouseMove(pt);
            if (res) {
                this.Grid.FirstDisplayedRowIndex = Math.round(this.Value);
                this.Grid.Refresh();
                this.Grid.RePaint();
            }
            return res;
        }
        return false;
    }
    OnMouseClick(sender, e, ve) {
        if (!this.Visible)
            return false;
        let pt = this.Grid.PointControlToView(e.Location);
        if (this.Rect.Contains(pt)) {
            return this.DoOnMouseClick(pt);
        }
        return false;
    }
    OnTouchStart(sender, e, ve) {
        return false;
    }
    OnTouchMove(sender, e, ve) {
        return false;
    }
    OnTouchEnd(sender, e, ve) {
        return false;
    }
    //OnMouseDown(sender, e, ve): boolean
    //OnMouseUp(sender, e, ve): boolean
    //OnMouseMove(sender, e, ve): boolean
    OnMouseDoubleClick(sender, e, ve) {
        if (!this.Visible)
            return false;
        let pt = new Point(e.offsetX, e.offsetY);
        if (this.Rect.Contains(pt)) {
            return true;
        }
        return false;
    }
    OnKeyPress(sender, e, ve) {
        return false;
    }
    OnKeyDown(sender, e, ve) {
        return false;
    }
    Next() {
        let value = this.Value + this.SmallChange;
        this.Value = value; // value > this.Max ? this.Max : value;
    }
}
class HScrollerView extends ScrollerView {
    constructor() {
        super();
    }
    get Height() {
        if (this._height < 18) {
            return 18;
        }
        return this._height;
    }
    set Height(value) {
        this._height = value;
    }
    DrawArrow(g) {
        this.DrawUpArrow(g);
        this.DrawDownArrow(g);
    }
    DrawArea(g) {
        let rect = this.Rect;
        HScrollerSkin.DrawArea(g, rect);
    }
    DrawBorder(g) {
        return;
    }
    DrawThumdBack(g) {
        if (this.Thickness <= 0)
            return;
        HScrollerSkin.DrawThumdBack(g, this.ThumdArea, this.MoveSelected);
    }
    DrawThumd(g) {
        HScrollerSkin.DrawThumd(g, this.ThumdArea, this.Thickness);
    }
    DrawUpArrow(g) {
        let rect = this.UpArrowArea;
        HScrollerSkin.DrawUpArrow(g, rect);
    }
    DrawDownArrow(g) {
        let rect = this.DownArrowArea;
        HScrollerSkin.DrawDownArrow(g, rect);
    }
    OnDraw(g) {
        if (this.Visible) {
            this.DrawArea(g);
            this.DrawThumdBack(g);
            this.DrawArrow(g);
            this.DrawThumd(g);
            this.DrawBorder(g);
        }
        return false;
    }
    RefreshScrollThumd() {
        let count = this.Count;
        if (count < 1) {
            count = 1;
        }
        let width = this.BodyArea.Width;
        let large = this.LargeChange;
        let thickness = 1 * width * (1 / (count + 1) * 1);
        if (thickness < 36) {
            thickness = 36;
        }
        this.Thickness = thickness;
        let smallwidth = 1 * (width - thickness) / count;
        let top = ((this.Value - this.Min) * smallwidth);
        if ((top + thickness) > width) {
            top = width - thickness;
        }
        this.ScrollTop = top;
    }
    PointToIndex(pt) {
        let count = this.Count;
        let width = this.BodyArea.Width;
        let large = this.LargeChange;
        let thickness = (1 * width * large / count);
        let smallwidth = 1 * (width - thickness) / count;
        let pheight = pt.X - this.Left - this.Header;
        let topcount = pheight / smallwidth;
        let i = topcount;
        this.Value = this.Min + i;
    }
    GetMovePoint(pt, sf) {
        let pd = new Point(pt.X - sf.Width, pt.Y);
        return pd;
    }
    get BodyArea() {
        return new Rect(this.Left + this.Header, this.Top, this.Width - this.Header - this.Header, this.Height);
    }
    get UpArrowArea() {
        let rects = this.Rect;
        return new Rect(rects.X, rects.Y, this.Header, rects.Height);
    }
    get DownArrowArea() {
        let rects = this.Rect;
        return new Rect(rects.Right - this.Header, rects.Y, this.Header, rects.Height);
    }
    get ThumdArea() {
        let rects = this.Rect;
        return new Rect(rects.X + this.Header + this.ScrollTop, rects.Y, this.Thickness, this.Rect.Height - 2);
    }
}
class DataExcelViewHScroll extends HScrollerView {
    constructor(grid) {
        super();
        this._Grid = null;
        this.lck = false;
        this._Grid = grid;
        grid.On(Events.FirstDisplayColumnChanged, this.Grid_FirstDisplayRowChanged);
    }
    Grid_FirstDisplayRowChanged(args) {
        try {
            let sender = args[0];
            let target = args[1];
            let index = args[2];
            if (index > target.Max) {
                target.Max = index;
            }
            target.Value = index;
            target.RefreshScrollThumd();
        }
        catch (ex) {
            DataExcelConsole.log("Grid_FirstDisplayRowChanged", ex);
        }
    }
    get Grid() {
        return this._Grid;
    }
    get Header() {
        return this.Grid.ContentLeft;
    }
    get Width() {
        return this.Grid.Width - this.Height - this.Left;
    }
    get Left() {
        return 0;
    }
    get Rect() {
        return new Rect(this.Left, this.Top, this.Width, this.Height);
    }
    get Top() {
        return this.Grid.Height - this.Height;
    }
    OnValueChanged(value) {
        //if (!this.Visible)
        //    return;
        //try
        //{
        //    if (this.lck)
        //        return;
        //    this.lck = true;
        //    let position = value;
        //    this.Grid.FirstDisplayedRowIndex = (position);
        //}
        //catch (ex)
        //{
        //    DataExcelConsole.log("OnValueChanged", ex);
        //}
        //finally
        //{
        //    this.lck = false;
        //}
    }
    OnMouseDown(sender, e, ve) {
        if (!this.Visible)
            return false;
        let pt = new Point(e.offsetX, e.offsetY);
        //let pt = point;// this.Grid.PointControlToView(e.Location);
        if (this.Rect.Contains(pt)) {
            return this.DoOnMouseDown(pt);
        }
        return false;
    }
    OnMouseUp(sender, e, ve) {
        if (!this.Visible)
            return false;
        this.MoveSelected = false;
        return this.DoOnMouseUp();
    }
    OnMouseMove(sender, e, ve) {
        if (!this.Visible)
            return false;
        //let pt = this.Grid.PointControlToView(e.Location);
        let pt = new Point(e.offsetX, e.offsetY);
        //if (this.Rect.Contains(pt) && this.MoveSelected)
        if (this.MoveSelected) {
            let res = this.DoOnMouseMove(pt);
            if (res) {
                this.Grid.FirstDisplayedColumnIndex = Math.round(this.Value);
                this.Grid.Refresh();
                this.Grid.RePaint();
            }
            return res;
        }
        return false;
    }
    OnMouseClick(sender, e, ve) {
        if (!this.Visible)
            return false;
        let pt = this.Grid.PointControlToView(e.Location);
        if (this.Rect.Contains(pt)) {
            return this.DoOnMouseClick(pt);
        }
        return false;
    }
    OnTouchStart(sender, e, ve) {
        return false;
    }
    OnTouchMove(sender, e, ve) {
        return false;
    }
    OnTouchEnd(sender, e, ve) {
        return false;
    }
    //OnMouseDown(sender, e, ve): boolean
    //OnMouseUp(sender, e, ve): boolean
    //OnMouseMove(sender, e, ve): boolean
    OnMouseDoubleClick(sender, e, ve) {
        if (!this.Visible)
            return false;
        let pt = new Point(e.offsetX, e.offsetY);
        if (this.Rect.Contains(pt)) {
            return true;
        }
        return false;
    }
    OnKeyPress(sender, e, ve) {
        return false;
    }
    OnKeyDown(sender, e, ve) {
        return false;
    }
    Next() {
        let value = this.Value + this.SmallChange;
        this.Value = value; // value > this.Max ? this.Max : value;
    }
}
class SizeChangRect {
    constructor() {
    }
    GetChangedWidth(newpoint) {
        let w = newpoint.X - this.MouseDownPoint.X;
        w = w + this.Size.Width;
        return w;
    }
    GetChangedHeight(newpoint) {
        let h = newpoint.Y - this.MouseDownPoint.Y;
        h = h + this.Size.Height;
        return h;
    }
}
class Graphics {
    constructor(zren) {
        this.drawTimes = 0;
        this.zr = zren;
    }
    get ZR() {
        return this.zr;
    }
    ;
    AddDrawTimes() {
        this.drawTimes = this.drawTimes + 1;
        if (this.drawTimes > 65526) {
            this.drawTimes = 1;
        }
    }
    DrawLineStyle(style1, x1, y1, x2, y2) {
        var shape = new zrender.Line({
            //position: [0, 0],
            scale: [1, 1],
            shape: {
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2
            },
            style: style1
        });
        shape.cursor = null;
        this.zr.add(shape);
    }
    DrawLine(color, x1, y1, x2, y2) {
        //this.Ctx.strokeStyle = color;
        //this.Ctx.beginPath();
        //this.Ctx.moveTo(x1, y1);
        //this.Ctx.lineTo(x2, y2);
        //this.Ctx.stroke();
        var curve = new zrender.Line({
            //position: [0, 0],
            scale: [1, 1],
            shape: {
                x1: x1,
                y1: y1,
                cpx1: 0,
                cpy1: 0,
                cpx2: 0,
                cpy2: 0,
                x2: x2,
                y2: y2
            },
            style: {
                stroke: color
            }
        });
        curve.cursor = null;
        this.zr.add(curve);
    }
    DrawTextColor(font, color, text, x1, y1) {
        var curve = new zrender.Text({
            //position: [0, 0],
            scale: [1, 1],
            draggable: true,
            style: {
                x: x1,
                y: y1,
                text: text,
                font: font,
                textAlign: "left",
                fill: color,
            }
        });
        this.zr.add(curve);
    }
    DrawText(font, color, text, x1, y1, width1, height1, align, opacity1) {
        //if (align == null)
        //{
        //}
        //this.Ctx.font = font;
        //this.Ctx.textAlign = align;
        //this.Ctx.fillStyle = color;
        //this.Ctx.fillText(text, x, y);
        var curve = new zrender.Text({
            //position: [0, 0],
            scale: [1, 1],
            draggable: true,
            style: {
                x: x1,
                y: y1,
                text: text,
                font: font,
                textAlign: align,
                fill: color,
            },
            opacity: opacity1,
        });
        var clip = new zrender.Rect({
            scale: [1, 1],
            shape: {
                x: x1,
                y: y1,
                width: width1,
                height: height1
            }
        });
        //this.zr.add(curve);
        var g1 = new zrender.Group();
        g1.add(curve);
        g1.setClipPath(clip);
        this.zr.add(g1);
    }
    DrawTextRect(font, color, text, x1, y1, width1, height1, textPos) {
        //if (align == null)
        //{
        //}
        //this.Ctx.font = font;
        //this.Ctx.textAlign = align;
        //this.Ctx.fillStyle = color;
        //this.Ctx.fillText(text, x, y, width);
        var shape = new zrender.Rect({
            scale: [1, 1],
            style: {
                fill: null,
            },
            textContent: new zrender.Text({
                scale: [1, 1],
                style: {
                    text: text,
                    fill: color,
                    font: font
                }
            }),
            textConfig: {
                position: textPos
            },
            shape: {
                x: x1,
                y: y1,
                width: width1,
                height: height1
            }
        });
        var g1 = new zrender.Group();
        g1.add(shape);
        g1.setClipPath(shape);
        this.zr.add(g1);
    }
    DrawTextRectStyle(text, x1, y1, width1, height1, style) {
        var enText = new zrender.Text({
            scale: [1, 1],
            position: [x1, y1],
            draggable: true,
        });
        enText.style = style;
        enText.style.overflow = 'break';
        var shape = new zrender.Rect({
            scale: [1, 1],
            style: {
                fill: null,
            },
            shape: {
                x: x1,
                y: y1,
                width: width1,
                height: height1
            },
            textConfig: {
                position: TextAlgin.bottomleft
            },
        });
        var g1 = new zrender.Group();
        g1.add(enText);
        g1.setClipPath(shape);
        this.zr.add(g1);
    }
    DrawTextRectStyle2(text, x1, y1, width1, height1, style) {
        var g = new zrender.Group();
        //let s = {
        //    text: 'position[100, 200],rotation: -1scarotation: -1scale: 0.5align: middleverticalAlign: bottomorle: 0.5align: middleverticalAlign: bottomorigin:[0, 50]',
        //    width: width,
        //    height: height,
        //    fill: '#c0f',
        //    font: '18px Microsoft Yahei',
        //    align: 'right',
        //    verticalAlign: 'bottom',
        //    overflow: 'break'
        //}
        let width = 0;
        let height = 0;
        style.width = width1;
        style.height = height1;
        style.text = text;
        let align = style.align;
        if (align == 'right') {
            width = width1;
        }
        if (align == 'center') {
            width = width1 / 2;
        }
        let verticalAlign = style.verticalAlign;
        if (verticalAlign == 'bottom') {
            height = height1;
        }
        if (verticalAlign == 'middle') {
            height = height1 / 2;
        }
        g.add(new zrender.Text({
            scale: [1, 1],
            position: [x1 + width, y1 + height],
            style: style,
            draggable: true
        }));
        let clip = new zrender.Rect({
            shape: {
                x: x1,
                y: y1,
                width: width1,
                height: height1
            },
            draggable: true
        });
        g.setClipPath(clip);
        this.zr.add(g);
    }
    DrawTextClipRectStyle2(text, x1, y1, width1, height1, clipx1, clipy1, clipwidth1, clipheight1, style) {
        var g = new zrender.Group();
        //let s = {
        //    text: 'position[100, 200],rotation: -1scarotation: -1scale: 0.5align: middleverticalAlign: bottomorle: 0.5align: middleverticalAlign: bottomorigin:[0, 50]',
        //    width: width,
        //    height: height,
        //    fill: '#c0f',
        //    font: '18px Microsoft Yahei',
        //    align: 'right',
        //    verticalAlign: 'bottom',
        //    overflow: 'break'
        //}
        let width = 0;
        let height = 0;
        style.width = width1;
        style.height = height1;
        style.text = text;
        let align = style.align;
        if (align == 'right') {
            width = width1;
        }
        if (align == 'center') {
            width = width1 / 2;
        }
        let verticalAlign = style.verticalAlign;
        if (verticalAlign == 'bottom') {
            height = height1;
        }
        if (verticalAlign == 'middle') {
            height = height1 / 2;
        }
        g.add(new zrender.Text({
            scale: [1, 1],
            position: [x1 + width, y1 + height],
            style: style,
            draggable: true
        }));
        let clip = new zrender.Rect({
            shape: {
                x: clipx1,
                y: clipy1,
                width: clipwidth1,
                height: clipheight1
            },
            draggable: true
        });
        g.setClipPath(clip);
        this.zr.add(g);
    }
    DrawTextClipRect(font, color, text, x1, y1, clipx1, clipy1, clipwidth1, clipheight1, align) {
        var curve = new zrender.Text({
            //position: [0, 0],
            scale: [1, 1],
            draggable: true,
            style: {
                x: x1,
                y: y1,
                text: text,
                font: font,
                textAlign: align,
                textFill: color,
            }
        });
        var clip = new zrender.Rect({
            scale: [1, 1],
            shape: {
                x: clipx1,
                y: clipy1,
                width: clipwidth1,
                height: clipheight1
            }
        });
        //this.zr.add(curve);
        var g1 = new zrender.Group();
        g1.add(curve);
        g1.setClipPath(clip);
        this.zr.add(g1);
    }
    DrawRectangle(color, x1, y1, width1, height1) {
        //this.Ctx.strokeStyle = color;
        //this.Ctx.strokeRect(x, y, width, height);
        var curve = new zrender.Rect({
            scale: [1, 1],
            style: {
                stroke: color,
                fill: null
            },
            shape: {
                x: x1,
                y: y1,
                width: width1,
                height: height1
            }
        });
        curve.cursor = null;
        this.zr.add(curve);
    }
    DrawRect(color, rect) {
        //this.Ctx.strokeStyle = color;
        //this.Ctx.strokeRect(x, y, width, height);
        var curve = new zrender.Rect({
            scale: [1, 1],
            shape: {
                x: rect.X,
                y: rect.Y,
                width: rect.Width,
                height: rect.Height
            },
            style: {
                stroke: color
            }
        });
        this.zr.add(curve);
    }
    FillRectangleLinearGradient(color, x1, y1, width1, height1, forwarddiagonal) {
        var curve = new zrender.Rect({
            draggable: true,
            style: {
                x: x1,
                y: y1,
                width: width1,
                height: height1
            }
        });
        this.zr.add(curve);
    }
    FillRectangle(color, x1, y1, width1, height1) {
        var shape = new zrender.Rect({
            scale: [1, 1],
            style: {
                fill: color,
            },
            shape: {
                x: x1,
                y: y1,
                width: width1,
                height: height1
            },
            cursor: ""
        });
        this.zr.add(shape);
    }
    FillRect(fillcolor, x1, y1, width1, height1, opacity1, stroke1, lineWidth1) {
        //this.Ctx.fillStyle = color;
        //this.Ctx.fillRect(x, y, width, height);
        //if (align == null)
        //{
        //}
        //this.Ctx.font = font;
        //this.Ctx.textAlign = align;
        //this.Ctx.fillStyle = color;
        //this.Ctx.fillText(text, x, y, width);
        var shape = new zrender.Rect({
            scale: [1, 1],
            style: {
                lineWidth: lineWidth1,
                opacity: opacity1,
                stroke: stroke1,
                fill: fillcolor,
            },
            shape: {
                x: x1,
                y: y1,
                width: width1,
                height: height1
            }
        });
        this.zr.add(shape);
    }
    FillRectStyle(style1, x1, y1, width1, height1, cursor1, zlevel1) {
        var shape = new zrender.Rect({
            position: [x1, y1],
            scale: [1, 1],
            shape: {
                x: 0,
                y: 0,
                width: width1,
                height: height1
            },
            zlevel: zlevel1
        });
        //if (cursor1 != null)
        //{
        shape.cursor = cursor1;
        //}
        shape.style = style1;
        this.zr.add(shape);
    }
    FillRectangleStyle(style1, rect) {
        var shape = new zrender.Rect({
            scale: [1, 1],
            shape: {
                x: rect.X,
                y: rect.Y,
                width: rect.Width,
                height: rect.Height
            }
        });
        shape.style = style1;
        shape.cursor = null;
        this.zr.add(shape);
    }
    FillRectangleColor(color, rect, cursor, opacity1) {
        var shape = new zrender.Rect({
            scale: [1, 1],
            style: {
                fill: color,
            },
            shape: {
                x: rect.X,
                y: rect.Y,
                width: rect.Width,
                height: rect.Height
            },
            opacity: opacity1,
            cursor: cursor
        });
        this.zr.add(shape);
    }
    FillRectangleImage(image1, rect, imagelayout, cursor1, opacity1) {
        var image = new zrender.Image({
            position: [rect.X, rect.Y],
            scale: [1, 1],
            style: {
                //x: 0,
                //y: 0,
                //width: rect.Width,
                //height: rect.Height,
                image: image1,
                opacity: opacity1,
                cursor: cursor1
            },
        });
        if (imagelayout == ImageLayout.Clip) {
            let clip = new zrender.Rect({
                shape: {
                    x: rect.X,
                    y: rect.Y,
                    width: rect.Width,
                    height: rect.Height
                },
            });
            var g = new zrender.Group();
            g.add(image);
            g.setClipPath(clip);
            this.zr.add(g);
        }
        else if (imagelayout == ImageLayout.ZoomClip) {
            let clip = new zrender.Rect({
                shape: {
                    x: rect.X,
                    y: rect.Y,
                    width: rect.Width,
                    height: rect.Height
                },
            });
            image.style.width = rect.Width;
            var g = new zrender.Group();
            g.add(image);
            g.setClipPath(clip);
            this.zr.add(g);
        }
        else if (imagelayout == ImageLayout.Zoom) {
            image.style.width = rect.Width;
            this.zr.add(image);
        }
        else if (imagelayout == ImageLayout.Stretch) {
            image.style.width = rect.Width;
            image.style.height = rect.Height;
            this.zr.add(image);
        }
        else {
            this.zr.add(image);
        }
    }
    FillRectangleImageClip(image1, x1, y1, width1, height1, clipx1, clipy1, clipwidth1, clipheight1, cursor1, opacity1) {
        var g = new zrender.Group();
        var image = new zrender.Image({
            position: [x1, y1],
            scale: [1, 1],
            style: {
                image: image1,
                //x: 0,
                //y: 0,
                width: width1,
                height: height1,
                opacity: opacity1,
                cursor: cursor1
            },
        });
        g.add(image);
        let clip = new zrender.Rect({
            shape: {
                x: clipx1,
                y: clipy1,
                width: clipwidth1,
                height: clipheight1
            },
        });
        g.setClipPath(clip);
        this.zr.add(g);
    }
    DrawGroup(group) {
        this.zr.add(group);
    }
    DrawPolyline(style, showanimate) {
        let display = new zrender.Polyline({
            style: style.option.style,
            shape: style.option.shape,
        });
        if (showanimate) {
            if (style.animate != null) {
                this.AppendAnimate(display, style.animate);
            }
        }
        this.zr.add(display);
    }
    DrawPrimitiveRect(style, showanimate) {
        let display = new zrender.Rect({
            style: style.option.style,
            shape: style.option.shape,
        });
        if (showanimate) {
            if (style.animate != null) {
                this.AppendAnimate(display, style.animate);
            }
        }
        this.zr.add(display);
    }
    DrawPrimitiveCircle(style, showanimate) {
        let display = new zrender.Circle({
            style: style.option.style,
            shape: style.option.shape
        });
        if (showanimate) {
            if (style.animate != null) {
                this.AppendAnimate(display, style.animate);
            }
        }
        this.zr.add(display);
    }
    DrawPrimitiveText(style, showanimate) {
        let display = new zrender.Text({
            style: style.option.style,
            rotation: style.option.rotation,
            position: style.option.position
        });
        if (showanimate) {
            if (style.animate != null) {
                this.AppendAnimate(display, style.animate);
            }
        }
        this.zr.add(display);
    }
    AppendAnimate(display, animatees) {
        if (animatees != null) {
            for (var i = 0; i < animatees.length; i++) {
                let animate = animatees[i];
                let ani = display.animate(animate.type, true);
                let wh = ani.when(animate.interval, animate.value);
                wh = this.AppendWhen(wh, animate.animate);
                wh.start();
            }
        }
    }
    AppendWhen(wh, animate) {
        wh = wh.when(animate.interval, animate.value);
        if (animate.animate != null) {
            wh = this.AppendWhen(wh, animate.animate);
        }
        return wh;
    }
    Clip(x, y, width, height) {
        //this.Ctx.rect(x, y, width, height);
        //this.Ctx.clip();
    }
    MeasureText(text, font) {
        //this.Ctx.font = font;
        //return this.Ctx.measureText(text);
    }
    Translate(x, y) {
        //this.Ctx.translate(x, y);
    }
    Save() {
    }
    Restore() {
    }
    Clear() {
        this.zr.clear();
    }
}
class DataExcelCellEditBase {
    constructor() {
    }
    get Name() {
        return this._Name;
    }
    set Name(value) {
        this._Name = value;
    }
    OnDraw(sender, g) {
        return false;
    }
    OnDrawBack(sender, g) {
        return false;
    }
    InitEdit() {
    }
    EndEdit() {
    }
    OnMouseDown(sender, e, ve) {
        return false;
    }
    OnMouseUp(sender, e, ve) {
        return false;
    }
    OnMouseMove(sender, e, ve) {
        return false;
    }
    OnMouseDoubleClick(sender, e, ve) {
        return false;
    }
    OnKeyPress(sender, e, ve) {
        return false;
    }
    OnKeyDown(sender, e, ve) {
        return false;
    }
    OnTouchStart(sender, e, ve) {
        return false;
    }
    OnTouchMove(sender, e, ve) {
        return false;
    }
    OnTouchEnd(sender, e, ve) {
        return false;
    }
    Clone() {
    }
}
class DataExcelCellEditCharts extends DataExcelCellEditBase {
    constructor() {
        super();
    }
    InitEdit() {
        //this.Grid.RePaint();
        let grid = this.Cell.Grid;
        let cell = this.Cell;
        if (cell.OwnMergeCell != null) {
            cell = cell.OwnMergeCell;
        }
        var edit = grid.editcontrol;
        edit["cell"] = this;
        grid.editcontrol.value = "";
        if (cell.Text != null) {
            grid.editcontrol.value = cell.Text;
        }
        //this.Grid.editcontrol.removeEventListener("input", this.OnInput);
        //this.Grid.editcontrol.removeEventListener("change", this.OnChange);
        grid.editcontrol.addEventListener("input", this.OnInput);
        grid.editcontrol.addEventListener("change", this.OnChange);
        grid.editcontrol.style.width = cell.Width + "px";
        grid.editcontrol.style.height = cell.Height + "px";
        grid.editcontrol.style.left = (cell.Left) + "px";
        grid.editcontrol.style.top = (cell.Top) + "px";
        grid.editcontrol.style.visibility = "visible";
        grid.editcontrol.focus();
    }
    EndEdit() {
        let grid = this.Cell.Grid;
        grid.editcontrol.style.visibility = "hidden";
        grid.editcontrol.removeEventListener("input", this.OnInput);
        grid.editcontrol.removeEventListener("change", this.OnChange);
        this.Cell.EndEdit();
    }
    OnInput(e) {
        let edit = this["cell"];
        let cell = edit.Cell;
        cell.Text = this["value"];
        cell.Value = this["value"];
        cell.Grid.graphic.Clear();
        cell.Grid.RePaint(e);
    }
    OnChange(e) {
        //var cell = this["cell"];
        //cell.Text = this["value"];
        //cell.Grid.Context.clearRect(0, 0, cell.Grid.Control.width, cell.Grid.Control.height);
        //cell.Grid.RePaint();
        let edit = this["cell"];
        let cell = edit.Cell;
        cell.Text = this["value"];
        cell.Value = this["value"];
        cell.Grid.RePaint(e);
        edit.EndEdit();
    }
    Clone() {
        return new DataExcelCellEditEdit();
    }
}
class DataExcelCellColumnHeader extends DataExcelCellEditBase {
    constructor() {
        super();
        this.SelectMode = SelectMode.Null;
        this.sizechangrect = null;
    }
    get Name() {
        return "ColumnHeader";
    }
    set Name(value) {
    }
    OnDraw(sender, g) {
        let cell = this.Cell;
        let backcolor = CellHeaderStyle.BackColor;
        if (cell.Column.CellSelect) {
            backcolor = CellHeaderStyle.SelectBackColor;
        }
        let isprint = false;
        if (!isprint) {
            if (cell.Row.Index == 0 && cell.Column.Index == 0) {
                var ForwardDiagonal = null;
                g.FillRectangle(backcolor, cell.Left, cell.Top, cell.Width, cell.Height);
            }
            else {
                g.FillRectangle(backcolor, cell.Left, cell.Top, cell.Width, cell.Height);
            }
        }
        this.OnDrawText(g);
        let rect = new Rect(this.Cell.Right - HeaderSplit.ColumnHeaderSplit, this.Cell.Top, HeaderSplit.ColumnHeaderSplit, this.Cell.Height);
        g.FillRectangleColor(backcolor, rect, Cursors.col_resize, 0.01);
        cell.OnDrawGridLine(this, g);
        return true;
    }
    OnDrawText(g) {
        let cell = this.Cell;
        let text = cell.Column.Name;
        if (!ConvertHelper.StringIsNullOrEmpty(cell.Column.Caption)) {
            text = cell.Column.Caption;
        }
        if (text != "") {
            //if (cell.Grid.ShowCheckBox)
            //{
            //    bool check = cell.Row.Checked;
            //    GraphicsHelper.DrawCheckBox(g.Graphics, bounds, check ? 1 : 0, text, sf, cell.ForeColor, cell.Font);
            //}
            let left = cell.Left + cell.Width / 2;
            let top = cell.Top + cell.Height / 2 - 4;
            //g.DrawText(CellHeaderStyle.Font, CellHeaderStyle.Color, text, left, top, "center");
            g.DrawTextRect(CellHeaderStyle.Font, CellHeaderStyle.Color, text, cell.Left, cell.Top, cell.Width, cell.Height, CellHeaderStyle.textPos);
        }
    }
    InitEdit() {
    }
    OnMouseDown(sender, e, ve) {
        let pt = new Point(e.offsetX, e.offsetY);
        let hasin = this.ContainsSplit(this.Cell, pt);
        let result = false;
        if (hasin) {
            this.SelectMode = SelectMode.ColumnHeaderSplitSelected;
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
    OnMouseUp(sender, e, ve) {
        this.SelectMode = SelectMode.Null;
        ve.CurrentEvent = null;
        return false;
    }
    OnMouseMove(sender, e, ve) {
        let result = false;
        let pt = new Point(e.offsetX, e.offsetY);
        if (this.SelectMode == SelectMode.ColumnHeaderSplitSelected) {
            let w = this.sizechangrect.GetChangedWidth(pt);
            this.Cell.Column.Width = w;
            this.Cell.Grid.Refresh();
            this.Cell.Grid.RePaint();
            result = true;
        }
        else {
            let hasin = this.ContainsSplit(this.Cell, pt);
            if (hasin) {
                this.Cell.Grid.BeginSetCursor(Cursors.col_resize);
                result = true;
            }
        }
        if (result) {
            ve.CellEvent = this;
        }
        return result;
    }
    ContainsSplit(cell, pt) {
        let bolIn = false;
        let rect = new Rect(cell.Right - HeaderSplit.ColumnHeaderSplit, cell.Top, HeaderSplit.ColumnHeaderSplit, cell.Height);
        bolIn = rect.Contains(pt);
        return bolIn;
    }
    OnTouchStart(sender, e, ve) {
        let result = false;
        if (e.touches.length == 1) {
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
    OnTouchMove(sender, e, ve) {
        let result = false;
        if (this.SelectMode == SelectMode.ColumnHeaderSplitSelected) {
            let touche = e.touches[0];
            let time = new Date();
            let sec = (time.getTime() - this.donwtime.getTime()) / 1000;
            let point = new Point(ve.offsetPoint.X, ve.offsetPoint.Y);
            let d = Math.abs(this.sizechangrect.MouseDownPoint.X - point.X);
            let w = this.sizechangrect.GetChangedWidth(point);
            if ((d / sec) < 60) {
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
    OnTouchEnd(sender, e, ve) {
        this.SelectMode = SelectMode.Null;
        return false;
    }
    Clone() {
        return new DataExcelCellColumnHeader();
    }
}
class DataExcelCellEditEdit extends DataExcelCellEditBase {
    constructor() {
        super();
    }
    InitEdit() {
        //this.Grid.RePaint();
        let grid = this.Cell.Grid;
        let cell = this.Cell;
        if (cell.OwnMergeCell != null) {
            cell = cell.OwnMergeCell;
        }
        var edit = grid.editcontrol;
        edit["cell"] = this;
        grid.editcontrol.value = "";
        if (cell.Text != null) {
            grid.editcontrol.value = cell.Text;
        }
        //this.Grid.editcontrol.removeEventListener("input", this.OnInput);
        //this.Grid.editcontrol.removeEventListener("change", this.OnChange);
        grid.editcontrol.addEventListener("input", this.OnInput);
        grid.editcontrol.addEventListener("change", this.OnChange);
        grid.editcontrol.style.width = cell.Width + "px";
        grid.editcontrol.style.height = cell.Height + "px";
        grid.editcontrol.style.left = (cell.Left) + "px";
        grid.editcontrol.style.top = (cell.Top) + "px";
        grid.editcontrol.style.visibility = "visible";
        grid.editcontrol.focus();
    }
    EndEdit() {
        let grid = this.Cell.Grid;
        grid.editcontrol.style.visibility = "hidden";
        grid.editcontrol.removeEventListener("input", this.OnInput);
        grid.editcontrol.removeEventListener("change", this.OnChange);
        this.Cell.EndEdit();
    }
    OnInput(e) {
        let edit = this["cell"];
        let cell = edit.Cell;
        cell.Text = this["value"];
        cell.Value = this["value"];
        cell.Grid.emit(Events.CellValueChanged, cell.Grid, cell);
        cell.Grid.graphic.Clear();
        cell.Grid.RePaint(e);
    }
    OnChange(e) {
        //var cell = this["cell"];
        //cell.Text = this["value"];
        //cell.Grid.Context.clearRect(0, 0, cell.Grid.Control.width, cell.Grid.Control.height);
        //cell.Grid.RePaint();
        let edit = this["cell"];
        let cell = edit.Cell;
        cell.Text = this["value"];
        cell.Value = this["value"];
        cell.Grid.RePaint(e);
        edit.EndEdit();
    }
    Clone() {
        return new DataExcelCellEditEdit();
    }
}
class DataExcelCellRowHeader extends DataExcelCellEditBase {
    constructor() {
        super();
        this.SelectMode = SelectMode.Null;
        this.sizechangrect = null;
    }
    get Name() {
        return "RowHeader";
    }
    set Name(value) {
    }
    OnDraw(sender, g) {
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
                g.FillRectangle(backcolor, cell.Left, cell.Top, cell.Width, cell.Height);
            }
            else {
                g.FillRectangle(backcolor, cell.Left, cell.Top, cell.Width, cell.Height);
                //g.FillRectangleLinearGradient(backcolor,
                //    cell.Left, cell.Top, cell.Width, cell.Height, ForwardDiagonal);
            }
        }
        this.OnDrawText(g);
        let rect = new Rect(cell.Left, cell.Bottom - HeaderSplit.RowHeaderSplit, cell.Width, HeaderSplit.RowHeaderSplit);
        g.FillRectangleColor(backcolor, rect, Cursors.row_resize, 0.01);
        cell.OnDrawGridLine(this, g);
        return true;
    }
    OnDrawText(g) {
        var cell = this.Cell;
        var text = cell.Row.Name;
        if (text != "") {
            g.DrawTextRect(CellHeaderStyle.Font, CellHeaderStyle.Color, text, cell.Left, cell.Top, cell.Width, cell.Height, CellHeaderStyle.textPos);
        }
    }
    InitEdit() {
    }
    OnMouseDown(sender, e, ve) {
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
    OnMouseUp(sender, e, ve) {
        this.SelectMode = SelectMode.Null;
        ve.CurrentEvent = null;
        return false;
    }
    OnMouseMove(sender, e, ve) {
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
                result = true;
            }
        }
        if (result) {
            ve.CurrentEvent = this;
        }
        return result;
    }
    ContainsSplit(cell, pt) {
        let bolIn = false;
        let rect = new Rect(cell.Left, cell.Bottom - HeaderSplit.RowHeaderSplit, cell.Width, HeaderSplit.RowHeaderSplit);
        bolIn = rect.Contains(pt);
        return bolIn;
    }
    OnTouchStart(sender, e, ve) {
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
    OnTouchMove(sender, e, ve) {
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
    OnTouchEnd(sender, e, ve) {
        this.SelectMode = SelectMode.Null;
        return false;
    }
    Clone() {
        return new DataExcelCellRowHeader();
    }
}
class DataExcel {
    //构告函数
    constructor() {
        this.IDCells = new Dictionary();
        //值属性
        this.Width = 1200;
        this.Height = 600;
        this.ShowBorder = false;
        this.ShowColumnHeader = true;
        this.ShowRowHeader = true;
        this.ShowGridLine = true;
        this._FirstDisplayedRowIndex = 1;
        this.EndDisplayedRowIndex = 1;
        this._FirstDisplayedColumnIndex = 1;
        this.EndDisplayedColumnIndex = 1;
        this._ReadOnly = CheckState.Unkown;
        this.TopSideHeight = 0;
        this.LeftSideWidth = 0;
        this.Font = "14px 宋体";
        this.AutoGenerateRows = true;
        this.AutoGenerateColumns = true;
        this.DefaultColumnWidth = 72;
        this.MaxRow = 1000000;
        this.MaxColumn = 512;
        this.FrozenRow = 0;
        this.FrozenColumn = 0;
        this.ContentTop = 20;
        this.ContentLeft = 20;
        this.ContentRight = 20;
        this.ContentBottom = 0;
        this.Zoom = 1;
        this._EndReFresh = 0;
        this._BeginReFresh = 0;
        this._CurrentEdit = null;
        this._ForeColor = "black";
        this._BackColor = null;
        this.BackImage = "";
        this.BackImageImageLayout = ImageLayout.ZoomClip;
        //style
        this._BorderColor = "Silver";
        //显示
        this.ShowFocusedCellBorder = true;
        this.ShowSelectBorder = true;
        this.Selectmode = SelectMode.Null;
        this.ShowSelectAddRect = true;
        this.MultiSelect = true;
        this.AllowChangedFirstDisplayRow = true;
        this.AllowChangedFirstDisplayColumn = true;
        this.zrendermain = null;
        //EVENT OVERRIDE
        this.debugmode = false;
        this.RegisteredCode = "";
        this.PasteValue = true;
        this.ADDVALUE = 1;
        this.DateType = 4;
        this.DateLen = 1;
        this.Rows = new DataExcelRowCollection();
        this.Columns = new DataExcelColumnCollection();
        this.AllVisibleColumns = new DataExcelColumnList();
        this.VisibleColumns = new DataExcelColumnList();
        this.AllVisibleRows = new DataExcelRowList();
        this.VisibleRows = new DataExcelRowList();
        this.SelectRange = new DataExcelCellList();
        this.SelectRows = new DataExcelRowList();
        this.SelectColumns = new DataExcelColumnList();
        this.MergeCells = new DataExcelMergeCellList();
        this.BackCells = new DataExcelBackCellList();
        this.DefaultEdit = new DataExcelCellEditEdit();
        this.Charts = new ChartList();
        this.Primitives = new PrimitiveList();
        this.EventHandlers = new Observer();
        this.VScroll = new DataExcelViewVScroll(this);
        this.HScroll = new DataExcelViewHScroll(this);
        this.Width = 1200;
        this.Height = 600;
        this.ShowBorder = true;
        this.ShowColumnHeader = true;
        this.ShowRowHeader = true;
        this.ShowGridLine = true;
        this.FirstDisplayedRowIndex = 1;
        this.EndDisplayedRowIndex = 1;
        this.FirstDisplayedColumnIndex = 1;
        this.EndDisplayedColumnIndex = 1;
        this.ReadOnly = CheckState.Unkown;
        this.TopSideHeight = 0;
        this.Font = "14px 宋体";
        //this.BackColor = "red";
        this.AutoGenerateRows = true;
        this.MaxRow = 1000000;
        this.FrozenRow = 0;
        this.ContentTop = 0;
        this.ContentBottom = 0;
        this._StartTime = new Date();
    }
    get FirstDisplayedRowIndex() {
        return this._FirstDisplayedRowIndex;
    }
    set FirstDisplayedRowIndex(value) {
        this._FirstDisplayedRowIndex = value;
    }
    get FirstDisplayedColumnIndex() {
        return this._FirstDisplayedColumnIndex;
    }
    set FirstDisplayedColumnIndex(value) {
        this._FirstDisplayedColumnIndex = value;
    }
    get ReadOnly() {
        return this._ReadOnly;
    }
    set ReadOnly(value) {
        this._ReadOnly = value;
    }
    get CurrentEdit() {
        return this._CurrentEdit;
    }
    set CurrentEdit(value) {
        this._CurrentEdit = value;
    }
    get ForeColor() {
        return this._ForeColor;
    }
    set ForeColor(value) {
        this._ForeColor = value;
    }
    get BackColor() {
        return this._BackColor;
    }
    set BackColor(value) {
        this._BackColor = value;
    }
    get BorderColor() {
        return this._BorderColor;
    }
    set BorderColor(value) {
        this._BorderColor = value;
    }
    get CurrentEvent() {
        return this._CellEvent;
    }
    set CurrentEvent(value) {
        //if (value == null)
        //{
        //    console.log(" set CellEvent " + new Date().toLocaleTimeString());
        //    console.trace(value);
        //}
        this._CellEvent = value;
    }
    get StartTime() {
        return this._StartTime;
    }
    get FocusedCell() {
        return this._focusedcell;
    }
    set FocusedCell(cell) {
        this._focusedcell = cell;
    }
    get InEdit() {
        if (this.FocusedCell == null) {
            return false;
        }
        let res = (this.FocusedCell == this.EditCell);
        if (res) {
            if (this.CurrentEdit == null) {
                res = false;
            }
        }
        return res;
    }
    get ClientBounds() {
        let left = this.ContentLeft;
        let top = this.ContentTop;
        let width = this.Width - this.ContentRight - left;
        let height = this.Height - this.ContentBottom - top;
        let rect = new Rect(left, top, width, height);
        return rect;
    }
    //FIle
    GetData() {
        let data = {
            height: this.Height,
            rows: [],
            columns: [],
            mergecells: [],
            backcells: [],
            charts: [],
            primitives: []
        };
        data.allowchangedfirstdisplaycolumn = this.AllowChangedFirstDisplayColumn;
        data.allowchangedfirstdisplayrow = this.AllowChangedFirstDisplayRow;
        data.backcolor = this.BackColor;
        data.backimage = this.BackImage;
        data.backimageimagelayout = this.BackImageImageLayout;
        data.bordercolor = this.BorderColor;
        data.firstdisplayedcolumnindex = this.FirstDisplayedColumnIndex;
        data.firstdisplayedrowindex = this.FirstDisplayedRowIndex;
        data.forecolor = this.ForeColor;
        data.frozencolumn = this.FrozenColumn;
        data.frozenrow = this.FrozenRow;
        data.font = this.Font;
        data.multiselect = this.MultiSelect;
        data.readonly = this.ReadOnly;
        data.showborder = this.ShowBorder;
        data.showcolumnheader = this.ShowColumnHeader;
        data.showfocusedcellborder = this.ShowFocusedCellBorder;
        data.showgridline = this.ShowGridLine;
        data.showrowheader = this.ShowRowHeader;
        data.showselectaddrect = this.ShowSelectAddRect;
        data.showselectborder = this.ShowSelectBorder;
        data.zoom = this.Zoom;
        data.vscrollvisible = this.VScroll.Visible;
        data.hscrollvisible = this.HScroll.Visible;
        data.width = this.Width;
        data.height = this.Height;
        this.Columns.forEach((column) => {
            data.columns.push(column.GetData());
        });
        this.Rows.forEach((row) => {
            data.rows.push(row.GetData());
        });
        this.MergeCells.forEach((mergecell) => {
            data.mergecells.push(mergecell.GetData());
        });
        this.BackCells.forEach((mergecell) => {
            data.backcells.push(mergecell.GetData());
        });
        this.Charts.forEach((chart) => {
            data.charts.push(chart.GetData());
        });
        this.Primitives.forEach((chart) => {
            data.primitives.push(chart.GetData());
        });
        return data;
    }
    SetData(data) {
        try {
            this.Clear();
            this.AllowChangedFirstDisplayColumn = data.allowchangedfirstdisplaycolumn;
            this.AllowChangedFirstDisplayRow = data.allowchangedfirstdisplayrow;
            this.BackColor = data.backcolor;
            this.BackImage = data.backimage;
            this.BackImageImageLayout = data.backimageimagelayout;
            this.BorderColor = data.bordercolor;
            this.FirstDisplayedColumnIndex = data.firstdisplayedcolumnindex;
            this.FirstDisplayedRowIndex = data.firstdisplayedrowindex;
            this.ForeColor = data.forecolor;
            this.FrozenColumn = data.frozencolumn;
            this.FrozenRow = data.frozenrow;
            this.Font = data.font;
            this.MultiSelect = data.multiselect;
            this.ReadOnly = data.readonly;
            this.ShowBorder = data.showborder;
            this.ShowColumnHeader = data.showcolumnheader;
            this.ShowFocusedCellBorder = data.showfocusedcellborder;
            this.ShowGridLine = data.showgridline;
            this.ShowRowHeader = data.showrowheader;
            this.ShowSelectAddRect = data.showselectaddrect;
            this.ShowSelectBorder = data.showselectborder;
            this.Zoom = data.zoom;
            this.VScroll.Visible = data.vscrollvisible;
            this.HScroll.Visible = data.hscrollvisible;
            this.Width = data.width;
            this.Height = data.height;
            let len = data.columns.length;
            for (let i = 0; i < len; i++) {
                let columndata = data.columns[i];
                let column = new DataExcelColumn();
                column.Grid = this;
                column.SetData(this, columndata);
                this.Columns.Add(column.Index, column);
            }
            len = data.rows.length;
            for (let i = 0; i < len; i++) {
                let rowdata = data.rows[i];
                let row = new DataExcelRow();
                row.Grid = this;
                row.SetData(this, rowdata);
                this.Rows.Add(row.Index, row);
            }
            len = data.mergecells.length;
            for (let i = 0; i < len; i++) {
                let itemdata = data.mergecells[i];
                let item = new DataExcelMergeCell();
                item.Grid = this;
                item.SetData(this, itemdata);
                this.MergeCells.Add(item);
            }
            len = data.backcells.length;
            for (let i = 0; i < len; i++) {
                let itemdata = data.backcells[i];
                let item = new DataExcelBackCell();
                item.Grid = this;
                item.SetData(this, itemdata);
                this.BackCells.Add(item);
            }
            len = data.backcells.length;
            for (let i = 0; i < len; i++) {
                let itemdata = data.backcells[i];
                let item = new DataExcelBackCell();
                item.Grid = this;
                item.SetData(this, itemdata);
                this.BackCells.Add(item);
            }
            len = data.charts.length;
            for (let i = 0; i < len; i++) {
                let itemdata = data.charts[i];
                let item = new Chart();
                item.Grid = this;
                item.SetData(this, itemdata);
                this.Charts.Add(item);
            }
            len = data.primitives.length;
            for (let i = 0; i < len; i++) {
                let itemdata = data.primitives[i];
                let item = new Primitive();
                item.Grid = this;
                item.SetData(this, itemdata);
                this.Primitives.Add(item);
            }
        }
        catch (e) {
            DataExcelConsole.log("SetData", e);
        }
    }
    ;
    InitDom(dom) {
        this.maindom = dom;
        this.maindom.style.width = this.Width + "px";
        this.maindom.style.height = this.Height + "px";
        dom.onwheel = (e) => { e.stopPropagation(); return false; };
        let zr = zrender.init(dom);
        this.zrendermain = zr;
        this.graphic = new Graphics(zr);
        zr["Grid"] = this;
        dom["Grid"] = this;
        window["Grid"] = this;
        document["Grid"] = this;
        dom.addEventListener("wheel", this.OnWheel);
        dom.addEventListener("resize", this.OnResize);
        dom.addEventListener("mousedown", this.OnMouseDown);
        dom.addEventListener("mouseup", this.OnMouseUp);
        dom.addEventListener("mousemove", this.OnMouseMove);
        dom.addEventListener("dblclick", this.OnMouseDoubleClick);
        dom.addEventListener("touchstart", this.OnTouchStart);
        dom.addEventListener("touchmove", this.OnTouchMove, { passive: false });
        dom.addEventListener("touchend", this.OnTouchEnd);
        dom.addEventListener("touchcancel", this.OnTouchCancel);
        //window.addEventListener("mousedown", this.OnMouseDown);
        //window.addEventListener("mouseup", this.OnMouseUp);
        //window.addEventListener("mousemove", this.OnMouseMove);
        //window.addEventListener("dblclick", this.OnMouseDoubleClick);
        //window.addEventListener("touchstart", this.OnTouchStart);
        //window.addEventListener("touchmove", this.OnTouchMove, { passive: false });
        //window.addEventListener("touchend", this.OnTouchEnd);
        //window.addEventListener("touchcancel", this.OnTouchCancel);
        window.addEventListener("keypress", this.OnKeyPress);
        window.addEventListener("keydown", this.OnKeyDown);
        window.addEventListener("paste", this.OnPaste);
        window.addEventListener("cut", this.OnCut);
        window.addEventListener("copy", this.OnCopy);
        //window.addEventListener("mousemove", this.OnMouseMove, true);
        //window.addEventListener("mousemove", this.OnWindowMouseMove, true);
        this.Height = zr.getHeight();
        this.Width = zr.getWidth();
        this.VScroll.RefreshScrollThumd();
        this.HScroll.RefreshScrollThumd();
    }
    //test
    //OnWindowMouseMove(evt: MouseEvent): void
    //{
    //    DataExcelConsole.log("OnWindowMouseMove __", evt);     
    //}
    //endtest
    RePaint(e) {
        this.graphic.Clear();
        var g = this.graphic;
        g.tag = e;
        this.OnDraw(this.graphic);
    }
    InitEdit(edit) {
        this.editcontrol = edit;
        let d = this.maindom;
        d.appendChild(edit);
    }
    SetSize(width, height) {
        this.Width = width;
        this.Height = height;
        DataExcelConsole.log("SetSize", width + " " + height);
        this.maindom.style.width = width + "px";
        this.maindom.style.height = height + "px";
        this.zrendermain.resize();
        //this.Height = this.zrendermain.getHeight();
        //this.Width = this.zrendermain.getWidth();
    }
    InitChart() {
        this.Charts.forEach((chart) => {
            chart.Init();
            chart.Refresh();
            chart.RefreshData();
        });
    }
    RefreshChart() {
        this.Charts.forEach((chart) => {
            chart.Refresh();
            chart.RefreshData();
        });
    }
    RefreshZrender() {
        this.maindom.style.width = this.Width + "px";
        this.maindom.style.height = this.Height + "px";
        this.zrendermain.resize();
    }
    Refresh() {
        this.SetFirstDisplayRow(this.FirstDisplayedRowIndex);
        this.SetFirstDisplayColumn(this.FirstDisplayedColumnIndex);
        if (this.SelectCells != null) {
            this.SelectCells.Refresh();
        }
        if (this.MergeCells != null) {
            this.MergeCells.Refresh();
        }
        if (this.BackCells != null) {
            this.BackCells.Refresh();
        }
        if (this.VScroll.Value != this.FirstDisplayedRowIndex) {
            this.VScroll.Value = this.FirstDisplayedRowIndex;
            this.VScroll.RefreshScrollThumd();
        }
        if (this.HScroll.Value != this.FirstDisplayedColumnIndex) {
            this.HScroll.Value = this.FirstDisplayedColumnIndex;
            this.HScroll.RefreshScrollThumd();
        }
        this.EndEdit();
    }
    OnPaste(evt) {
        try {
            var obj = this["Grid"];
            //DataExcelConsole.log("OnPaste", this);
            evt.stopPropagation();
            obj.DoPaste(evt);
        }
        catch (ex) {
            DataExcelConsole.log("OnPaste", ex);
        }
        finally {
        }
        obj.RePaint();
    }
    OnCopy(evt) {
        try {
            var obj = this["Grid"];
            //DataExcelConsole.log("OnPaste", this);
            evt.stopPropagation();
            obj.DoCopy(evt);
        }
        catch (ex) {
            DataExcelConsole.log("OnPaste", ex);
        }
        finally {
        }
    }
    OnCut(evt) {
        try {
            var obj = this["Grid"];
            //DataExcelConsole.log("OnPaste", this);
            evt.stopPropagation();
            obj.DoCut(evt);
        }
        catch (ex) {
            DataExcelConsole.log("OnPaste", ex);
        }
        finally {
        }
        obj.RePaint();
    }
    OnMouseDoubleClick(evt) {
        let ev = new EventView();
        try {
            var obj = this["Grid"];
            this.debugmode = true;
            ev.Canvas = evt.target;
            let dom = evt.target;
            ev.Dom = dom;
            let x = evt.offsetX;
            let y = evt.offsetY;
            let evtpath = evt;
            let path = evtpath.path;
            let len = path.length;
            let offsetleft = 0;
            let offsettop = 0;
            for (var i = 0; i < len; i++) {
                let domt = path[i];
                if (domt == obj.maindom) {
                    break;
                }
                offsetleft = offsetleft + domt.offsetLeft;
                offsettop = offsettop + domt.offsetTop;
            }
            ev.offsetPoint = new Point(x + offsetleft, y + offsettop);
            obj.DoOnMouseDoubleClick(this, evt, null);
        }
        catch (ex) {
            DataExcelConsole.log("dom.OnMouseDoubleClick", ex);
        }
        finally {
        }
        if (ev.NeedRePaint) {
            obj.RePaint();
        }
    }
    OnWheel(evt) {
        try {
            evt.stopPropagation();
            let step = -3;
            let obj = this["Grid"];
            let target = evt.target;
            if (evt.wheelDelta < 0) {
                step = 3;
            }
            if (evt.ctrlKey) {
                obj.FirstDisplayedColumnIndex = obj.FirstDisplayedColumnIndex + step;
            }
            else {
                obj.FirstDisplayedRowIndex = obj.FirstDisplayedRowIndex + step;
            }
            if (obj.FirstDisplayedColumnIndex < 1) {
                obj.FirstDisplayedColumnIndex = 1;
            }
            if (obj.FirstDisplayedRowIndex < 1) {
                obj.FirstDisplayedRowIndex = 1;
            }
            obj.emit(Events.FirstDisplayRowChanged, obj, obj.VScroll, obj.FirstDisplayedRowIndex);
            obj.emit(Events.FirstDisplayColumnChanged, obj, obj.VScroll, obj.FirstDisplayedColumnIndex);
            obj.Refresh();
            obj.RePaint(evt);
        }
        catch (ex) {
            DataExcelConsole.log("dom.addEventListener OnWheel", ex);
        }
        return true;
    }
    OnMouseDown(evt) {
        var obj = this["Grid"];
        let ev = new EventView();
        try {
            this.debugmode = true;
            ev.Canvas = evt.target;
            let dom = evt.target;
            ev.Dom = dom;
            let x = evt.offsetX;
            let y = evt.offsetY;
            let evtpath = evt;
            let path = evtpath.path;
            let len = path.length;
            let offsetleft = 0;
            let offsettop = 0;
            for (var i = 0; i < len; i++) {
                let domt = path[i];
                if (domt == obj.maindom) {
                    break;
                }
                offsetleft = offsetleft + domt.offsetLeft;
                offsettop = offsettop + domt.offsetTop;
            }
            ev.offsetPoint = new Point(x + offsetleft, y + offsettop);
            obj.DoOnMouseDown(this, evt, ev);
        }
        catch (ex) {
            DataExcelConsole.log("dom.OnMouseDown", ex);
        }
        finally {
        }
        if (ev.NeedRePaint) {
            obj.RePaint();
        }
        obj.CurrentEvent = ev.CurrentEvent;
    }
    OnMouseUp(evt) {
        this.debugmode = false;
        var obj = this["Grid"];
        let ev = new EventView();
        try {
            this.debugmode = true;
            ev.Canvas = evt.target;
            let dom = evt.target;
            ev.Dom = dom;
            let x = evt.offsetX;
            let y = evt.offsetY;
            let evtpath = evt;
            let path = evtpath.path;
            let len = path.length;
            let offsetleft = 0;
            let offsettop = 0;
            for (var i = 0; i < len; i++) {
                let domt = path[i];
                if (domt == obj.maindom) {
                    break;
                }
                offsetleft = offsetleft + domt.offsetLeft;
                offsettop = offsettop + domt.offsetTop;
            }
            ev.offsetPoint = new Point(x + offsetleft, y + offsettop);
            obj.DoOnMouseUp(this, evt, ev);
            obj.Selectmode = SelectMode.Null;
        }
        catch (ex) {
            DataExcelConsole.log("dom.OnMouseUp", ex);
        }
        finally {
        }
        if (ev.NeedRePaint) {
            obj.RePaint();
        }
    }
    OnMouseMove(evt) {
        if (this.debugmode) {
            this.debugmode = false;
        }
        let obj = this["Grid"];
        let ev = new EventView();
        try {
            let dom = evt.target;
            ev.Canvas = evt.target;
            ev.Dom = dom;
            let x = evt.offsetX;
            let y = evt.offsetY;
            let evtpath = evt;
            let path = evtpath.path;
            let len = path.length;
            let offsetleft = 0;
            let offsettop = 0;
            for (var i = 0; i < len; i++) {
                let domt = path[i];
                if (domt == obj.maindom) {
                    break;
                }
                offsetleft = offsetleft + domt.offsetLeft;
                offsettop = offsettop + domt.offsetTop;
            }
            ev.offsetPoint = new Point(x + offsetleft, y + offsettop);
            obj.DoOnMouseMove(this, evt, ev);
        }
        catch (ex) {
            DataExcelConsole.log("dom.click", ex);
        }
        finally {
        }
        if (ev.NeedRePaint) {
            obj.RePaint();
        }
    }
    OnKeyPress(evt) {
        var obj = this["Grid"];
        let ev = new EventView();
        try {
            ev.Canvas = evt.target;
            let dom = evt.target;
            ev.Dom = dom;
            //this.debugmode = true;
            obj.DoOnKeyPress(this, evt, ev);
        }
        catch (ex) {
            DataExcelConsole.log("dom.OnMouseDown", ex);
        }
        finally {
        }
    }
    OnKeyDown(evt) {
        var obj = this["Grid"];
        let ev = new EventView();
        try {
            ev.Canvas = evt.target;
            let dom = evt.target;
            ev.Dom = dom;
            obj.DoOnKeyDown(this, evt, ev);
        }
        catch (ex) {
            DataExcelConsole.log("dom.OnMouseDown", ex);
        }
        finally {
        }
    }
    OnTouchStart(evt) {
        let obj = this["Grid"];
        let ev = new EventView();
        try {
            let dom = evt.target;
            ev.Canvas = evt.target;
            ev.Dom = dom;
            let x = evt.touches[0].clientX;
            let y = evt.touches[0].clientY;
            let evtpath = evt;
            let path = evtpath.path;
            let len = path.length;
            let offsetleft = 0;
            let offsettop = 0;
            for (var i = 0; i < len; i++) {
                let domt = path[i];
                if (domt == obj.maindom) {
                    break;
                }
                offsetleft = offsetleft + domt.offsetLeft;
                offsettop = offsettop + domt.offsetTop;
            }
            ev.offsetPoint = new Point(x + offsetleft, y + offsettop);
            obj.DoOnTouchStart(this, evt, ev);
        }
        catch (ex) {
            DataExcelConsole.log("OnTouchStart", ex);
        }
        finally {
        }
        if (ev.NeedRePaint) {
            obj.RePaint();
        }
        obj.CurrentEvent = ev.CurrentEvent;
    }
    OnTouchMove(evt) {
        let obj = this["Grid"];
        let ev = new EventView();
        try {
            let dom = evt.target;
            ev.Canvas = evt.target;
            ev.Dom = dom;
            let x = evt.touches[0].clientX;
            let y = evt.touches[0].clientY;
            let evtpath = evt;
            let path = evtpath.path;
            let len = path.length;
            let offsetleft = 0;
            let offsettop = 0;
            for (var i = 0; i < len; i++) {
                let domt = path[i];
                if (domt == obj.maindom) {
                    break;
                }
                offsetleft = offsetleft + domt.offsetLeft;
                offsettop = offsettop + domt.offsetTop;
            }
            ev.offsetPoint = new Point(x + offsetleft, y + offsettop);
            obj.DoOnTouchMove(this, evt, ev);
        }
        catch (ex) {
            DataExcelConsole.log("dom.click", ex);
        }
        finally {
        }
        if (ev.NeedRePaint) {
            obj.Refresh();
            obj.RePaint();
            return true;
        }
    }
    OnTouchEnd(evt) {
        let obj = this["Grid"];
        let ev = new EventView();
        try {
            let dom = evt.target;
            ev.Canvas = evt.target;
            ev.Dom = dom;
            let x = evt.touches[0].clientX;
            let y = evt.touches[0].clientY;
            let evtpath = evt;
            let path = evtpath.path;
            let len = path.length;
            let offsetleft = 0;
            let offsettop = 0;
            for (var i = 0; i < len; i++) {
                let domt = path[i];
                if (domt == obj.maindom) {
                    break;
                }
                offsetleft = offsetleft + domt.offsetLeft;
                offsettop = offsettop + domt.offsetTop;
            }
            ev.offsetPoint = new Point(x + offsetleft, y + offsettop);
            obj.DoOnTouchEnd(this, evt, ev);
        }
        catch (ex) {
            DataExcelConsole.log("dom.click", ex);
        }
        finally {
        }
        if (ev.NeedRePaint) {
            obj.RePaint();
        }
    }
    OnTouchCancel(evt) {
        let obj = this["Grid"];
        let ev = new EventView();
        try {
            obj.DoOnTouchCancel(this, evt, ev);
        }
        catch (ex) {
            DataExcelConsole.log("dom.click", ex);
        }
        finally {
        }
        if (ev.NeedRePaint) {
            obj.RePaint();
        }
    }
    OnResize(evt) {
        try {
            let obj = this["Grid"];
            obj.zrendermain.resize();
        }
        catch (ex) {
            DataExcelConsole.log("dom.OnResize", ex);
        }
    }
    //PAINT
    Paint() {
        this.OnDraw(this.graphic);
    }
    OnDraw(g) {
        g.AddDrawTimes();
        this._EndReFresh = 0;
        this._BeginReFresh = 0;
        this.OnDrawGridLine(g);
        this.OnDrawBack(g);
        this.OnDrawColumn(g);
        this.OnDrawBackCell(g);
        this.OnDrawCellBack(g);
        this.OnDrawMergeCellBack(g);
        this.OnDrawRow(g);
        this.OnDrawMergeCell(g);
        this.OnDrawPrimitives(g);
        this.OnDrawRowHeader(g);
        this.OnDrawColumnHeader(g);
        this.OnDrawBorder(g);
        this.OnDrawListExtendCells(g);
        this.OnDrawSelectCells(g);
        this.OnDrawFunctionSelect(g);
        this.OnDrawMoveBorder(g);
        this.OnDrawCopyCellRect(g);
        this.OnShowMultSelectCells(g);
        this.OnDrawShowFocusedCellBorder(g);
        this.OnDrawFunctionBorder(g);
        this.OnDrawHScroll(g);
        this.OnDrawDebug(g);
        this.OnDrawGridBorder(g);
        this.OnDrawCharts(g);
    }
    OnDrawBack(g) {
        if (this.BackColor != null) {
            g.FillRect(this.BackColor, 0, 0, this.Width, this.Height);
        }
        if (!ConvertHelper.StringIsNullOrEmpty(this.BackImage)) {
            let rect = new Rect(this.ContentLeft, this.ContentTop, this.Width, this.Height);
            g.FillRectangleImage(this.BackImage, rect, this.BackImageImageLayout, null, 1);
        }
    }
    OnDrawColumn(g) {
        var i;
        var count;
        count = this.AllVisibleColumns.Count;
        for (i = 0; i < count; i++) {
            var column = this.AllVisibleColumns.Get(i);
            column.OnDraw(this, g);
        }
    }
    OnDrawBackCell(g) {
    }
    OnDrawCellBack(g) {
        var i;
        var count;
        count = this.AllVisibleRows.Count;
        for (i = 0; i < count; i++) {
            var row = this.AllVisibleRows.Get(i);
            row.OnDrawBack(this, g);
        }
    }
    OnDrawMergeCellBack(g) {
    }
    OnDrawRow(g) {
        var i;
        var count;
        count = this.AllVisibleRows.Count;
        for (i = 0; i < count; i++) {
            var row = this.AllVisibleRows.Get(i);
            row.OnDraw(this, g);
        }
    }
    OnDrawMergeCell(g) {
    }
    OnDrawRowHeader(g) {
    }
    OnDrawColumnHeader(g) {
    }
    OnDrawGridLine(g) {
        if (this.ShowGridLine) {
            g.DrawLine(GridLineStyle.stroke, 0, 0, this.Width, 0);
            g.DrawLine(GridLineStyle.stroke, 0, 0, 0, this.Height);
            var rhcount = this.AllVisibleRows.Count;
            var chcount = this.AllVisibleColumns.Count;
            for (var i = 0; i < rhcount; i++) {
                var row = this.AllVisibleRows.Get(i);
                for (var j = 0; j < chcount; j++) {
                    var column = this.AllVisibleColumns.Get(j);
                    var cell = row.Cells.Get(column);
                    if (cell == null) {
                        cell = this.NewCell(row, column);
                    }
                    cell.OnDrawGridLine(this, g);
                }
            }
        }
    }
    OnDrawBorder(g) {
        var rhcount = this.AllVisibleRows.Count;
        var chcount = this.AllVisibleColumns.Count;
        for (var i = 0; i < rhcount; i++) {
            var rh = this.AllVisibleRows.Get(i);
            for (var j = 0; j < chcount; j++) {
                var ch = this.AllVisibleColumns.Get(j);
                var cell = rh.Cells.Get(ch);
                if (cell != null) {
                    cell.OnDrawBorder(this, g);
                }
            }
        }
    }
    OnDrawListExtendCells(g) {
    }
    OnDrawSelectCells(g) {
        if (this.ShowSelectBorder) {
            if (this.FocusedCell != null) {
                if (this.InVisible(this.FocusedCell)) {
                    if (this.FocusedCell.ShowFocusedSelectBorder) {
                        g.FillRectangleStyle(FocusedCellStyle, this.FocusedCell.Rect);
                    }
                }
            }
            if (!this.InEdit) {
                if (this.SelectCells != null) {
                    //let drawselectcells = true;
                    if (this.SelectCells.BeginCell != this.SelectCells.EndCell) {
                        g.FillRectStyle(SelectCellsStyle, this.SelectCells.Left, this.SelectCells.Top, this.SelectCells.Width, this.SelectCells.Height);
                        //g.FillRectangle("red", this.SelectCells.Left, this.SelectCells.Top, this.SelectCells.Width, this.SelectCells.Height);
                    }
                    g.FillRectStyle(SelectCellsStyleAdd, this.SelectCells.Right - 2, this.SelectCells.Bottom - 2, 4, 4, Cursors.crosshair, 99);
                }
                if (this.SelectAddRectCollection != null) {
                    //this.SelectAddRectCollection.OnDraw(this, g);
                    g.FillRectStyle(SelectCellsAddStyle, this.SelectAddRectCollection.Left, this.SelectAddRectCollection.Top, this.SelectAddRectCollection.Width, this.SelectAddRectCollection.Height);
                }
                //if (this.MergeCellCollectionRect != null)
                //{
                //    this.MergeCellCollectionRect.OnDraw(g);
                //}
                //if (this.MergeCellCollectionAddRect != null)
                //{
                //    this._MergeCellCollectionAddRect.OnDraw(g);
                //}
            }
        }
    }
    OnDrawMoveBorder(g) {
    }
    OnDrawCopyCellRect(g) {
    }
    OnShowMultSelectCells(g) {
    }
    OnDrawShowFocusedCellBorder(g) {
        //if (this.FocusedCell != null)
        //{
        //    if (this.InVisible(this.FocusedCell))
        //    {
        //        if (this.ShowFocusedCellBorder)
        //        {
        //            g.DrawRectangle(SelectStyle.FouscedCellSelectBorderColor,
        //                this.FocusedCell.Left, this.FocusedCell.Top,
        //                this.FocusedCell.Width, this.FocusedCell.Height);
        //        }
        //    }
        //}
    }
    OnDrawFunctionBorder(g) {
    }
    OnDrawFunctionSelect(g) {
        //if (this.FunctionSelectCells != null)
        //{
        //    this.FunctionSelectCells.OnDraw(this, g);
        //}
    }
    OnDrawGridBorder(g) {
        if (this.ShowBorder) {
            g.DrawRectangle(this.BorderColor, 0, 0, this.Width - 1, this.Height - 1);
        }
        else {
            //this.DrawGridLine(g, 0, 0, 0, this.Height);
        }
    }
    OnDrawHScroll(g) {
        this.VScroll.OnDraw(g);
        this.HScroll.OnDraw(g);
    }
    OnDrawDebug(g) {
        try {
            if (this.DebugRect != null) {
                g.FillRectangleColor("red", this.DebugRect);
                g.DrawTextColor(this.Font, "red", this.DebugText, this.ContentLeft, this.ContentTop);
                g.DrawTextColor(this.Font, "red", this.DebugText2, this.ContentLeft, this.ContentTop + 30);
            }
            let now = new Date();
            let timespan = now.getTime() - this.StartTime.getTime();
            if ((timespan / 1000 / 60 / 60) > 2) {
                if (!this.isRegistered(this.RegisteredCode)) {
                    let NotRegistered = "Not Registered";
                    g.DrawText(this.Font, "red", NotRegistered, this.Width - 150, 36, 100, 100, "left", 0.5);
                }
            }
        }
        catch (e) {
            DataExcelConsole.log("OnDrawDebug rowindex", e);
        }
    }
    OnDrawCharts(g) {
        try {
            this.Charts.forEach((chart) => {
                chart.OnDrawBack(this, g);
            });
        }
        catch (e) {
            DataExcelConsole.log("OnDrawDebug rowindex", e);
        }
    }
    OnDrawPrimitives(g) {
        try {
            this.Primitives.forEach((chart) => {
                chart.OnDrawBack(this, g);
            });
        }
        catch (e) {
            DataExcelConsole.log("OnDrawDebug rowindex", e);
        }
    }
    Invalidate() {
    }
    BeginReFresh() {
    }
    EndReFresh() {
    }
    GetGraphics() {
        return this.graphic;
    }
    MeasureString(text, font) {
        var graphics = this.GetGraphics();
        var metrics = graphics.MeasureText(text, font);
        return metrics.width;
    }
    //NEW
    NewRow(grid, index) {
        let row = new DataExcelRow();
        row.Index = index;
        row.Grid = grid;
        return row;
    }
    NewColumn(grid, index) {
        let row = new DataExcelColumn();
        row.Index = index;
        row.Grid = grid;
        row.Width = this.DefaultColumnWidth;
        return row;
    }
    NewCell(row, column) {
        let cell = new DataExcelCell();
        cell.Grid = this;
        cell.Row = row;
        cell.Column = column;
        row.Cells.Add(cell);
        cell.OwnEditControl = DefaultEdit.GetDefauleEdit(cell);
        return cell;
    }
    NewMergeCell(grid, selectcells) {
        let model = new DataExcelMergeCell();
        model.Grid = grid;
        model.BeginCell = selectcells.BeginCell;
        model.EndCell = selectcells.EndCell;
        this.MergeCells.Add(model);
        return model;
    }
    NewBackCell(grid, selectcells) {
        let model = new DataExcelBackCell();
        model.Grid = grid;
        model.BeginCell = selectcells.BeginCell;
        model.EndCell = selectcells.EndCell;
        this.BackCells.Add(model);
        return model;
    }
    NewChart() {
        let sel = this.SelectCells;
        let chart = new Chart();
        chart.Grid = this;
        chart.Left = sel.Left;
        chart.Top = sel.Top;
        chart.Width = sel.Width;
        chart.Height = sel.Height;
        chart.Init();
        this.Charts.Add(chart);
        return chart;
    }
    NewPrimitive() {
        let sel = this.SelectCells;
        let chart = new Primitive();
        chart.Grid = this;
        chart.Left = sel.Left;
        chart.Top = sel.Top;
        chart.Width = sel.Width;
        chart.Height = sel.Height;
        this.Primitives.Add(chart);
        return chart;
    }
    //RowColumn
    DeleteRow(index) {
        this.Rows.Delete(index);
        let list = new List();
        this.Rows.forEach((value, key) => {
            list.add(value);
            if (value.Index > index) {
                value.Index = value.Index - 1;
            }
        });
        this.Rows.Clear();
        list.forEach((value) => {
            this.Rows.Add(value.Index, value);
        });
    }
    DeleteColumn(index) {
        this.Columns.Delete(index);
        let list = new List();
        this.Columns.forEach((value, key) => {
            list.add(value);
            if (value.Index > index) {
                value.Index = value.Index - 1;
            }
        });
        this.Columns.Clear();
        list.forEach((value) => {
            this.Columns.Add(value.Index, value);
        });
    }
    InsertRow(index) {
        let list = new List();
        this.Rows.forEach((value, key) => {
            list.add(value);
            if (value.Index >= index) {
                value.Index = value.Index + 1;
            }
        });
        this.Rows.Clear();
        list.forEach((value) => {
            this.Rows.Add(value.Index, value);
        });
    }
    InsertColumn(index) {
        let list = new List();
        this.Columns.forEach((value, key) => {
            list.add(value);
            if (value.Index >= index) {
                value.Index = value.Index + 1;
            }
        });
        this.Columns.Clear();
        list.forEach((value) => {
            this.Columns.Add(value.Index, value);
        });
    }
    DeleteCellRow(cells) {
        if (cells == null) {
            return;
        }
        let maxcolumn = cells.MaxColumn();
        let mincolumn = cells.MinColumn();
        let minrow = cells.MinRow();
        let maxrow = cells.MaxRow();
        for (let rowindex = minrow; rowindex <= maxrow; rowindex++) {
            let row = this.Rows.Get(rowindex);
            if (row == null) {
                continue;
            }
            for (let columnindex = mincolumn; columnindex <= maxcolumn; columnindex++) {
                let column = this.Columns.Get(columnindex);
                if (column == null) {
                    continue;
                }
                let cell = row.Cells.Get(column);
                row.Cells.Remove(column);
            }
        }
        let count = maxrow - minrow + 1;
        this.Rows.forEach((row, key) => {
            if (row.Index > maxrow) {
                let targetrow = this.Rows.Get(row.Index - count);
                if (targetrow != null) {
                    for (let columnindex = mincolumn; columnindex <= maxcolumn; columnindex++) {
                        let column = this.Columns.Get(columnindex);
                        let cell = row.Cells.Get(column);
                        if (cell != null) {
                            cell.Row = targetrow;
                            targetrow.Cells.Add(cell);
                            row.Cells.Remove(column);
                        }
                    }
                }
            }
        });
    }
    InsertCellRow(cells) {
        if (cells == null) {
            return;
        }
        let maxcolumn = cells.MaxColumn();
        let mincolumn = cells.MinColumn();
        let minrow = cells.MinRow();
        let maxrow = cells.MaxRow();
        let count = maxrow - minrow + 1;
        let list = new List();
        this.Rows.forEach((row, key) => {
            if (row.Index >= minrow) {
                list.Add(row);
            }
        });
        list.sort((a, b) => {
            return a.Index - b.Index;
        });
        let rowcount = list.Count;
        for (var i = rowcount - 1; i >= 0; i--) {
            let row = list[i];
            let targetrow = this.Rows.Get(row.Index + count);
            if (targetrow != null) {
                for (let columnindex = mincolumn; columnindex <= maxcolumn; columnindex++) {
                    let column = this.Columns.Get(columnindex);
                    let cell = row.Cells.Get(column);
                    if (cell != null) {
                        cell.Row = targetrow;
                        targetrow.Cells.Add(cell);
                        row.Cells.Remove(column);
                    }
                }
            }
        }
    }
    DeleteCellColumn(cells) {
        if (cells == null) {
            return;
        }
        let maxcolumn = cells.MaxColumn();
        let mincolumn = cells.MinColumn();
        let minrow = cells.MinRow();
        let maxrow = cells.MaxRow();
        let listrow = new List();
        for (let rowindex = minrow; rowindex <= maxrow; rowindex++) {
            let row = this.Rows.Get(rowindex);
            if (row == null) {
                continue;
            }
            if (!listrow.contains(row)) {
                listrow.Add(row);
            }
            for (let columnindex = mincolumn; columnindex <= maxcolumn; columnindex++) {
                let column = this.Columns.Get(columnindex);
                if (column == null) {
                    continue;
                }
                let cell = row.Cells.Get(column);
                row.Cells.Remove(column);
            }
        }
        let count = maxcolumn - mincolumn + 1;
        listrow.forEach((row) => {
            this.Columns.forEach((column, key) => {
                if (column.Index > maxcolumn) {
                    let targetcolumn = this.Columns.Get(column.Index - count);
                    if (targetcolumn != null) {
                        let cell = row.Cells.Get(column);
                        if (cell != null) {
                            row.Cells.Remove(column);
                            cell.Column = targetcolumn;
                            row.Cells.Add(cell);
                        }
                    }
                }
            });
        });
    }
    InsertCellColumn(cells) {
        if (cells == null) {
            return;
        }
        let maxcolumn = cells.MaxColumn();
        let mincolumn = cells.MinColumn();
        let minrow = cells.MinRow();
        let maxrow = cells.MaxRow();
        let listrow = new List();
        for (let rowindex = minrow; rowindex <= maxrow; rowindex++) {
            let row = this.Rows.Get(rowindex);
            if (row == null) {
                continue;
            }
            if (!listrow.contains(row)) {
                listrow.Add(row);
            }
        }
        let count = maxcolumn - mincolumn + 1;
        let list = new List();
        this.Columns.forEach((row, key) => {
            if (row.Index >= mincolumn) {
                list.Add(row);
            }
        });
        list.sort((a, b) => {
            return a.Index - b.Index;
        });
        listrow.forEach((row) => {
            let countcolumn = list.Count;
            for (var i = countcolumn - 1; i >= 0; i--) {
                let column = list.get(i);
                if (column.Index >= mincolumn) {
                    let targetcolumn = this.Columns.Get(column.Index + count);
                    if (targetcolumn != null) {
                        let cell = row.Cells.Get(column);
                        if (cell != null) {
                            row.Cells.Remove(column);
                            cell.Column = targetcolumn;
                            row.Cells.Add(cell);
                        }
                    }
                }
            }
            ;
        });
    }
    // FIRST DISPLAY
    InitRowHeader(top) {
        let rowindex = 0;
        let row = this.HeaderRow;
        let value = top;
        if (row == null) {
            row = this.Rows.Get(rowindex);
            if (row == null) {
                if (this.AutoGenerateRows) {
                    row = this.NewRow(this, rowindex);
                    row.Height = 26;
                    this.Rows.Add(rowindex, row);
                }
            }
            if (row != null) {
                row.Visible = this.ShowColumnHeader;
                if (row.Visible) {
                    this.AllVisibleRows.Add(row);
                    row.Top = top;
                    value = top + row.Height;
                }
            }
        }
        return value;
    }
    InitColumnHeader(left) {
        let columnindex = 0;
        let column = this.HeaderColumn;
        let value = left;
        if (column == null) {
            column = this.Columns.Get(columnindex);
            if (column == null) {
                if (this.AutoGenerateColumns) {
                    column = this.NewColumn(this, columnindex);
                    column.Width = 30;
                    this.Columns.Add(columnindex, column);
                }
            }
            if (column != null) {
                column.Visible = this.ShowRowHeader;
                if (column.Visible) {
                    this.AllVisibleColumns.Add(column);
                    column.Left = left;
                    if (this.FirstDisplayedRowIndex + 50 > 1000) {
                        let w = 30 + (30 / 4) * (Math.round(this.FirstDisplayedRowIndex / 1000).toString()).length;
                        column.Width = w;
                    }
                    else {
                        column.Width = 30;
                    }
                    value = left + column.Width;
                }
            }
        }
        return value;
    }
    SetFirstDisplayRow(index) {
        try {
            this.BeginReFresh();
            if (index > this.MaxRow) {
                index = this.MaxRow;
            }
            if (index < 1) {
                index = 1;
            }
            var top = this.TopSideHeight;
            this.AllVisibleRows.Clear();
            this.VisibleRows.Clear();
            var row = null;
            top = this.InitRowHeader(top);
            this.ContentTop = top;
            var height = 0;
            var listtemp = new DataExcelRowList();
            this.ContentBottom = height;
            var i = 0;
            var res = this.SetFirstDisplayFrozenFooterIndex(top, i);
            top = res.h;
            i = res.index;
            var rowindex = i + this.FirstDisplayedRowIndex;
            var h = top;
            while (top <= (this.Height - height)) {
                rowindex = i + this.FirstDisplayedRowIndex;
                if (this.MaxRow > 0) {
                    if (rowindex > this.MaxRow) {
                        break;
                    }
                }
                row = this.Rows.Get(rowindex);
                if (row == null) {
                    if (this.AutoGenerateRows) {
                        row = this.NewRow(this, rowindex);
                        this.Rows.Add(rowindex, row);
                    }
                }
                if (row != null) {
                    if (row.Visible) {
                        this.AllVisibleRows.Add(row);
                        this.VisibleRows.Add(row);
                        row.Top = top;
                        var rindex = i + index;
                        this.EndDisplayedRowIndex = rowindex;
                        top += row.Height;
                    }
                }
                i++;
            }
            var len = listtemp.Count;
            for (var i = 0; i < len; i++) {
                this.AllVisibleRows.Add(listtemp.Get(i));
            }
        }
        finally {
            this.AutoShowScroll();
            this.EndReFresh();
        }
    }
    SetFirstDisplayColumn(index) {
        if (index < 1) {
            index = 1;
        }
        if (index > this.MaxColumn) {
            index = this.MaxColumn;
        }
        var tempcolindex = index;
        index = tempcolindex;
        this.FirstDisplayedColumnIndex = index;
        var i = 0;
        var width = this.LeftSideWidth;
        this.AllVisibleColumns.Clear();
        this.VisibleColumns.Clear();
        width = this.InitColumnHeader(width);
        this.ContentLeft = width;
        var height2 = 0;
        this.ContentRight = height2;
        var res = this.SetFrozenColumn(i, width);
        width = res.w;
        i = res.index;
        this.SetColumnWidthByFirstIndex(i, width, index);
        this.AutoShowScroll();
    }
    SetColumnWidthByFirstIndex(i, width, index) {
        var column = null;
        var columnindex = i + this.FirstDisplayedColumnIndex;
        var ci = columnindex;
        for (ci = columnindex; ci <= this.MaxColumn; ci++) {
            if (width < this.Width) {
                columnindex = i + this.FirstDisplayedColumnIndex;
                if (columnindex > this.MaxColumn) {
                    break;
                }
                column = this.Columns.Get(columnindex);
                if (column == null) {
                    if (this.AutoGenerateColumns) {
                        column = this.NewColumn(this, columnindex);
                        this.Columns.Add(columnindex, column);
                    }
                }
                if (column != null) {
                    if (column.Visible) {
                        this.AllVisibleColumns.Add(column);
                        this.VisibleColumns.Add(column);
                        column.Left = width;
                        //int colindex = i + index;
                        width = width + column.Width;
                        this.EndDisplayedColumnIndex = columnindex;
                    }
                }
                i++;
            }
            else {
                break;
            }
        }
    }
    SetFrozenColumn(i, width) {
        var column = null;
        if (this.FrozenColumn > 0) {
            var colindex = 0;
            var ci = colindex;
            for (ci = colindex; ci < this.FrozenColumn; ci++) {
                colindex = colindex + 1;
                column = this.Columns.Get(colindex);
                if (column != null) {
                    if (column.Visible) {
                        this.AllVisibleColumns.Add(column);
                        this.VisibleColumns.Add(column);
                        column.Left = width;
                        width = width + column.Width;
                    }
                }
                i++;
            }
        }
        var obj = { w: width, index: i };
        return obj;
    }
    SizeRowHeader() {
        var count;
        count = this.VisibleRows.Count;
        for (var i = 0; i < count; i++) {
            var row = this.VisibleRows.Get(i);
            var col = this.Columns.Get(0);
            if (col != null) {
                var g = this.GetGraphics();
                if (g == null)
                    return;
                var sf = g.MeasureText("" + row.Index + "", this.Font);
                if (sf.width > col.Width) {
                    col.Width = sf.width;
                }
                else {
                    if (col.Width > 40 && sf.width < 40) {
                        col.Width = 40;
                    }
                }
            }
        }
    }
    AutoShowScroll() {
    }
    SetFirstDisplayFrozenFooterIndex(height, i) {
        var row = null;
        if (this.FrozenRow > 0) {
            var colindex = 0;
            while (height < this.Height) {
                colindex = colindex + 1;
                if (this.FrozenRow < colindex) {
                    break;
                }
                row = this.Rows.Get(colindex);
                if (row.Visible) {
                    this.AllVisibleRows.Add(row);
                    this.VisibleRows.Add(row);
                    row.Top = height;
                    height = height + row.Height;
                }
                i++;
            }
        }
        var obj = { h: height, index: i };
        return obj;
    }
    PointControlToView(point) {
        return point;
    }
    AddEdit(edit) {
        this.CurrentEdit = edit;
        this.CopyCells = null;
    }
    EndEdit() {
        if (this.CurrentEdit == null) {
            this.emit(Events.EndEdit, this, this.FocusedCell, this.CurrentEdit);
        }
        if (this.FocusedCell != null) {
            this.FocusedCell.EndEdit();
        }
        this.EditCell = null;
        if (this.CurrentEdit != null) {
            this.CurrentEdit.EndEdit();
            this.CurrentEdit = null;
        }
    }
    GetCellByPoint(pt) {
        let rowcount = this.AllVisibleRows.Count;
        let row;
        for (var i = 0; i < rowcount; i++) {
            let row1 = this.AllVisibleRows.Get(i);
            if (pt.Y > row1.Top && pt.Y <= (row1.Top + row1.Height)) {
                row = row1;
                break;
            }
        }
        if (row == null) {
            return null;
        }
        let columncount = this.AllVisibleColumns.Count;
        let column;
        for (var i = 0; i < columncount; i++) {
            let column1 = this.AllVisibleColumns.Get(i);
            if (pt.X > column1.Left && pt.X <= (column1.Left + column1.Width)) {
                column = column1;
                break;
            }
        }
        if (row == null) {
            return null;
        }
        var cell = row.Cells.Get(column);
        if (cell == null) {
            cell = this.NewCell(row, column);
        }
        return cell;
    }
    GetFocusedCell() {
        return this._focusedcell;
    }
    SetFocusedCell(cell) {
        this.BeginReFresh();
        this.EndEdit();
        let cel = cell;
        //if (cell != null)
        //{
        //    if (cell.OwnMergeCell != null)
        //    {
        //        cel = cell.OwnMergeCell;
        //    }
        //}
        if (cel.OwnMergeCell != null) {
            this.FocusedCell = cel.OwnMergeCell;
        }
        else {
            this.FocusedCell = cel;
        }
        this.emit(Events.FocusedCellChanged, this, this.FocusedCell);
        //this._ICellEvents = this._focusedcell;
        //if (FocusedCellChanged != null)
        //{
        //    FocusedCellChanged(this, this._focusedcell);
        //}
        this.EndReFresh();
    }
    SetSelectCells(begin, end) {
        if (this.SelectCells == null) {
            this.SelectCells = new SelectCellCollection();
            this.SelectCells.Grid = this;
        }
        let cellbegin = begin;
        if (cellbegin.OwnMergeCell != null) {
            this.SelectCells.BeginCell = cellbegin.OwnMergeCell.BeginCell;
        }
        else {
            this.SelectCells.BeginCell = cellbegin;
        }
        if (end == null) {
            if (cellbegin.OwnMergeCell != null) {
                this.SelectCells.EndCell = cellbegin.OwnMergeCell.EndCell;
                this.SelectCells.Refresh();
            }
            else {
                this.SelectCells.EndCell = cellbegin;
                this.SelectCells.Refresh();
            }
        }
        else {
            let cellend = end;
            if (cellend.OwnMergeCell != null) {
                this.SelectCells.EndCell = cellbegin.OwnMergeCell.EndCell;
                this.SelectCells.Refresh();
            }
            else {
                this.SelectCells.EndCell = cellend;
                this.SelectCells.Refresh();
            }
        }
    }
    GetSelectCells() {
        let list = new List();
        if (this.SelectRange.Count < 1) {
            if (this.SelectCells != null) {
                list = this.SelectCells.GetAllCells();
            }
            else if (this.FocusedCell != null) {
                if (this.FocusedCell.OwnMergeCell != null) {
                    list.Add(this.FocusedCell.OwnMergeCell);
                }
                else {
                    list.Add(this.FocusedCell);
                }
            }
        }
        else {
            list = (this.SelectRange);
        }
        return list;
    }
    GetSelectChart() {
        for (var i = 0; i < this.Charts.length; i++) {
            let chart = this.Charts[i];
            if (chart.Selected) {
                return chart;
            }
        }
        return null;
    }
    GetSelectPrimitive() {
        for (var i = 0; i < this.Primitives.length; i++) {
            let chart = this.Primitives[i];
            if (chart.Selected) {
                return chart;
            }
        }
        return null;
    }
    //Custom Event
    On(eventname, functioncallback) {
        this.EventHandlers.on(eventname, functioncallback);
    }
    Off(eventname, functioncallback) {
        this.EventHandlers.off(eventname, functioncallback);
    }
    emit(eventname, ...args) {
        this.EventHandlers.emit(eventname, args);
    }
    RaiseCellInitEditEvent(cell) {
        this.emit(Events.CellInitEdit, cell, this);
    }
    isRegistered(txt) {
        this.RegisteredCode = txt;
        let host = window.location.host;
        let txt2 = host + " are registered from dataexcel";
        if (txt == txt2) {
            return true;
        }
        return false;
    }
    //ONEVENT
    ClearSelect() {
        this.Charts.forEach((chart) => { chart.Selected = false; });
        this.Primitives.forEach((chart) => {
            chart.Selected = false;
            chart.Displayables.forEach((disp) => {
                disp.Selected = false;
            });
        });
        //  var cs = this.GetSelectCells();
        //foreach(ICell cell in cs)
        //{
        //    cell.Selected = false;
        //}
        //this.FunctionSelectCells = null;
        this.SelectCells = null;
        //this.MergeCellCollectionRect = null;
        //this.SelectAddRectCollection = null;
        //this.TempSelectRect = null;
        //  var count = this.Selecteds.Count;
        //for ( var index = count - 1; index >= 0; index--)
        //{
        //    var row = this.Selecteds[index];
        //    row.Selected = false;
        //}
        //this.SelectRows.Clear();
        //this.SelectColumns.Clear();
        //this.Selecteds.Clear();
        //if (this.MergeCells != null)
        //{
        //    count = this.MergeCells.Count;
        //    for (int index = count - 1; index >= 0; index--)
        //    {
        //        IMergeCell imc = this.MergeCells[index];
        //        imc.Selected = false;
        //    }
        //}
        //if (this.ListExtendCells != null)
        //{
        //    count = this.ListExtendCells.Count;
        //    for (int index = count - 1; index >= 0; index--)
        //    {
        //        IExtendCell imc = this.ListExtendCells[index];
        //        imc.Selected = false;
        //    }
        //}
    }
    OnMouseDownScroll(e, ve) {
        if (this.VScroll.Visible) {
            let res = this.VScroll.OnMouseDown(this, e, ve);
            if (res) {
                this.FirstDisplayedRowIndex = Math.round(this.VScroll.Value);
                this.Refresh();
                this.RePaint();
                ve.NeedRePaint = true;
                ve.CurrentEvent = this.VScroll;
                return res;
            }
        }
        if (this.HScroll.Visible) {
            let res = this.HScroll.OnMouseDown(this, e, ve);
            if (res) {
                this.FirstDisplayedColumnIndex = Math.round(this.HScroll.Value);
                this.Refresh();
                this.RePaint();
                ve.NeedRePaint = true;
                ve.CurrentEvent = this.HScroll;
                return res;
            }
        }
        return false;
    }
    SetDataExcelMouseDown(e) {
        return false;
    }
    SetScrollerMouseDown(e) {
        return false;
    }
    SetExtendCellMouseDown(e) {
        return false;
    }
    SetMergeCellCollectionRectMouseDown(e) {
        return false;
    }
    SetSelectCellCollectionMouseDown(e) {
        let viewloaction = this.PointControlToView(new Point(e.offsetX, e.offsetY));
        let pt = viewloaction;
        if (this.ShowSelectAddRect) {
            if (this.SelectCells != null) {
                if (this.SelectCells.AddRectContains(pt)) {
                    this.BeginReFresh();
                    this.BeginSetCursor(Cursors.crosshair);
                    if (this.SelectAddRectCollection == null) {
                        this.SelectAddRectCollection = new SelectAddRectCollection(this);
                    }
                    this.SelectAddRectCollection.SelectCellCollection = this.SelectCells;
                    this.Selectmode = SelectMode.CellAddSelected;
                    this.EndReFresh();
                    return true;
                }
            }
        }
        return false;
    }
    SetCellMouseDown(sender, e, ve) {
        let point = new Point(e.offsetX, e.offsetY);
        let viewloaction = this.PointControlToView(point);
        let pt = viewloaction;
        pt.X = pt.X / this.Zoom;
        pt.Y = pt.Y / this.Zoom;
        let cell = this.GetCellByPoint(pt);
        if (cell != null) {
            if (e.button == MouseButtons.Right) {
                //if (this.SelectCells != null)
                //{
                //    if (this.SelectCells.Rect.Contains(pt))
                //    {
                //        return true;
                //    }
                //}
            }
            if (this.Selectmode != SelectMode.Null) {
                //if (this.Selectmode == SelectMode.CellRangeFunctionCellSelected)
                //{
                //    this.BeginReFresh();
                //    if (e.ctrlKey)
                //    {
                //        if (FunctionSelectCells == null)
                //        {
                //            FunctionSelectCells = new CellRangeCollection();
                //            FunctionSelectCells.BeginCell = cell;
                //            OnFunctionSelectCellChanged(FunctionSelectCells);
                //            this.Invalidate();
                //        }
                //    }
                //    else
                //    {
                //        this.OnFunctionSelectedFinish();
                //    }
                //    this.EndReFresh();
                //}
                //return true;
            }
            if (cell.OnMouseDown(sender, e, ve)) {
                return true;
            }
            if (e.button == MouseButtons.Left) {
                this.Selectmode = SelectMode.CellSelected;
            }
            this.BeginReFresh();
            this.ClearSelect();
            this.SetSelectCells(cell);
            cell.Selected = true;
            if (e.ctrlKey) {
                this.SelectRange.Add(this.GetFocusedCell());
                this.SelectRange.Add(cell);
            }
            else {
                this.SelectRange.Clear();
            }
            if (e.shiftKey) {
                //this.SelectCell(this.FocusedCell, cell);
            }
            this.SetFocusedCell(cell);
            e.stopPropagation();
            ve.NeedRePaint = true;
            ve.CurrentEvent = cell;
            //this.MouseDownCell = cell;
            //this.AddFocsedCellMark(cell);
            //if (this.FocusedCell != null)
            //{
            //    this.FocusedCell.OnMouseDown(this, e, ve);
            //}
            //if (this.SelectRange.Count > 0)
            //{
            //    OnSelectRangeChanged(this.SelectRange);
            //}  
            this.EndReFresh();
            return true;
        }
        return false;
    }
    OnException(ex) {
    }
    //DO event
    DoOnMouseUp(sender, e, ve) {
        if (this.CurrentEvent != null) {
            if (this.CurrentEvent.OnMouseUp(this, e, ve)) {
                return;
            }
        }
        let result = false;
        result = this.DoOnMouseUpChart(sender, e, ve);
        if (result)
            return true;
        result = this.DoOnMouseUpPrimitive(sender, e, ve);
        if (result)
            return true;
        if (e.button == MouseButtons.Right) {
            return;
        }
        switch (this.Selectmode) {
            case SelectMode.CellAddSelected:
                //this.BeginReFresh();
                this.UpdateSelectAddRect();
                ve.NeedRePaint = true;
                this.SelectAddRectCollection = null;
                //this.EndReFresh();
                break;
            case SelectMode.MergeCellAddSelected:
                //this.BeginReFresh();
                //DoMergeCellCollectionAddRectDown(this.MergeCellCollectionAddRect);
                //this.EndReFresh();
                break;
            default:
                this.SelectAddRectCollection = null;
                //this._MergeCellCollectionAddRect = null;
                break;
        }
        this.Selectmode = SelectMode.Null;
    }
    DoOnMouseDown(sender, e, ve) {
        try {
            if (this.CurrentEvent != null) {
                if (this.CurrentEvent.OnMouseDown(this, e, ve)) {
                    return true;
                }
            }
            var point = { x: e.offsetX, y: e.offsetY };
            var viewloaction = this.PointControlToView(point);
            this.MouseDownPoint = viewloaction;
            let result = false;
            result = this.DoOnMouseDownChart(sender, e, ve);
            if (result)
                return true;
            result = this.DoOnMouseDownPrimitive(sender, e, ve);
            if (result)
                return true;
            //if (this.CellEvent != null)
            //{
            //    if (this.CellEvent.OnMouseDown(this, e, ve))
            //    {
            //        return true;
            //    }
            //}
            if (this.FocusedCell != null) {
                let point = viewloaction;
                if (this.maindom == e.target) {
                    if (!this.FocusedCell.Rect.Contains(point)) {
                        if (this.CurrentEdit != null) {
                            this.EndEdit();
                        }
                    }
                }
            }
            if (e.button == MouseButtons.Right) {
                if (this.SetCellMouseDown(sender, e, ve)) {
                }
                return false;
            }
            else if (e.button == MouseButtons.Left) {
                if (this.OnMouseDownScroll(e, ve)) {
                    return true;
                }
                if (this.SetDataExcelMouseDown(e)) {
                    return true;
                }
                if (this.SetScrollerMouseDown(e)) {
                    return true;
                }
                if (this.SetExtendCellMouseDown(e)) {
                    return true;
                }
                if (this.SetMergeCellCollectionRectMouseDown(e)) {
                    return true;
                }
                if (this.SetSelectCellCollectionMouseDown(e)) {
                    return true;
                }
            }
            if (this.SetCellMouseDown(sender, e, ve)) {
                return true;
            }
        }
        catch (ex) {
            DataExcelConsole.log("DoOnMouseDown", ex);
            this.OnException(ex);
        }
        finally {
        }
        return false;
    }
    DoOnMouseMove(sender, e, ve) {
        this.DebugRect = new Rect(ve.offsetPoint.X, ve.offsetPoint.Y, 4, 4);
        if (this.CurrentEvent != null) {
            if (this.CurrentEvent.OnMouseMove(this, e, ve)) {
                return true;
            }
        }
        let result = false;
        result = this.DoOnMouseMoveChart(sender, e, ve);
        if (result)
            return true;
        result = this.DoOnMouseMovePrimitive(sender, e, ve);
        if (result)
            return true;
        let res = false;
        switch (this.Selectmode) {
            case SelectMode.Null:
                res = this.SelectModeNullMouseMove(e, ve);
                break;
            //case SelectMode.RowHeaderSelected:
            //    break;
            //case SelectMode.RowHeaderSplitSelected:
            //    break;
            //case SelectMode.FullRowSelected:
            //    this.BeginReFresh();
            //    //SelectModeRowHeaderSelectedMouseMove(e);
            //    this.EndReFresh();
            //    break;
            //case SelectMode.ColumnHeaderSelected:
            //    break;
            //case SelectMode.ColumnHeaderSplitSelected:
            //    this.BeginReFresh();
            //    this.EndReFresh();
            //    break;
            //case SelectMode.FullColumnSelected:
            //    this.BeginReFresh();
            //    //SelectModeColumnHeaderSelectedMouseMove(e);
            //    this.EndReFresh();
            //    break;
            case SelectMode.CellSelected:
                if (this.MultiSelect) {
                    this.BeginReFresh();
                    res = this.SelectModeCellSeletedMouseMove(ve);
                    this.SetSelectCellRowSelect();
                    this.EndReFresh();
                }
                break;
            //case SelectMode.CellRangeFunctionCellSelected:
            //    this.BeginReFresh();
            //    //SCellRangeFunctionCellSelectedMouseMove(e);
            //    this.EndReFresh();
            //    break;
            //case SelectMode.MergeCellSelected:
            //    this.BeginReFresh();
            //    //SelectModeMergeCellSelectedMouseMove(e);
            //    this.EndReFresh();
            //    break;
            //case SelectMode.MergeCellAddSelected:
            //    this.BeginReFresh();
            //    //SelectModeMergeCellAddSelectedMouseMove(e);
            //    this.EndReFresh();
            //    break;
            //case SelectMode.ImageCellSelected:
            //    this.BeginReFresh();
            //    //SelectModeImageMouseMove(e);
            //    this.EndReFresh();
            //    break;
            case SelectMode.CellAddSelected:
                this.BeginReFresh();
                res = this.SelectModeCellAddSelectedMouseMove(e);
                this.EndReFresh();
                break;
            //case SelectMode.TextCellSelected:
            //    this.BeginReFresh();
            //    //SelectModeTextMouseMove(e);
            //    this.EndReFresh();
            //    break;
            //case SelectMode.ExtendCellSizeRectSelected:
            //    this.BeginReFresh();
            //    //TextCellSizeRectSelected(e);
            //    this.EndReFresh();
            //    break;
            //case SelectMode.ChangedSize:
            //    this.BeginReFresh();
            //    //ChangedSize(e);
            //    this.EndReFresh();
            //    break;
            //case SelectMode.Drag:
            //    this.BeginReFresh();
            //    //this.Cursor = Cursors.Hand;
            //    this.EndReFresh();
            //    break;
            default:
                break;
        }
        if (res) {
            ve.NeedRePaint = true;
        }
    }
    DoOnWheel(evt) {
    }
    DoOnMouseDoubleClick(sender, e, ve) {
        if (this.CurrentEvent != null) {
            if (this.CurrentEvent.OnMouseDoubleClick(this, e, ve)) {
                return;
            }
        }
    }
    DoOnKeyPress(sender, e, ve) {
        if (this.CurrentEvent != null) {
            if (this.CurrentEvent.OnKeyPress(this, e, ve)) {
                return;
            }
        }
    }
    DoOnKeyDown(sender, e, ve) {
        if (this.CurrentEvent != null) {
            if (this.CurrentEvent.OnKeyDown(this, e, ve)) {
                return;
            }
        }
        if (e.srcElement == document.body) {
            switch (e.code) {
                case "ArrowRight":
                    if (e.shiftKey) {
                        this.CellMoveRight(this.SelectCells, 1);
                    }
                    else {
                        this.MoveFocusedCellToRightCell();
                    }
                    ve.CurrentEvent = this.FocusedCell;
                    this.Refresh();
                    this.RePaint();
                    break;
                case "ArrowLeft":
                    if (e.shiftKey) {
                        this.CellMoveLeft(this.SelectCells, 1);
                    }
                    else {
                        this.MoveFocusedCellToLeftCell();
                    }
                    ve.CurrentEvent = this.FocusedCell;
                    this.Refresh();
                    this.RePaint();
                    break;
                case "ArrowUp":
                    if (e.shiftKey) {
                        this.CellMoveUp(this.SelectCells, 1);
                    }
                    else {
                        this.MoveFocusedCellToUpCell();
                    }
                    ve.CurrentEvent = this.FocusedCell;
                    this.Refresh();
                    this.RePaint();
                    break;
                case "ArrowDown":
                    if (e.shiftKey) {
                        this.CellMoveDown(this.SelectCells, 1);
                    }
                    else {
                        this.MoveFocusedCellToDownCell();
                    }
                    ve.CurrentEvent = this.FocusedCell;
                    this.Refresh();
                    this.RePaint();
                    break;
                default:
            }
        }
    }
    DoOnTouchStart(sender, e, ve) {
        this.SetCellTouchStart(sender, e, ve);
    }
    DoOnTouchMove(sender, e, ve) {
        this.DebugRect = new Rect(ve.offsetPoint.X, ve.offsetPoint.Y, 4, 4);
        if (this.CurrentEvent != null) {
            if (this.CurrentEvent.OnTouchMove(this, e, ve)) {
                return true;
            }
        }
        let res = false;
        switch (this.Selectmode) {
            //case SelectMode.Null:
            //    res = this.SelectModeNullTouchMove(e, ve);
            //    break;
            case SelectMode.TouchMove:
                res = this.FirstShowTouchMove(e, ve);
                break;
            case SelectMode.CellSelected:
                if (e.targetTouches.length == 1) {
                    if (this.MultiSelect) {
                        this.BeginReFresh();
                        res = this.SelectModeCellSeletedMouseMove(ve);
                        this.SetSelectCellRowSelect();
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        this.EndReFresh();
                    }
                }
                break;
            case SelectMode.CellAddSelected:
                this.BeginReFresh();
                //res = this.SelectModeCellAddSelectedMouseMove(e,ve);
                this.EndReFresh();
                break;
            default:
                break;
        }
        if (res) {
            ve.NeedRePaint = true;
        }
    }
    DoOnTouchEnd(sender, e, ve) {
        if (this.CurrentEvent != null) {
            if (this.CurrentEvent.OnTouchEnd(this, e, ve)) {
                return true;
            }
        }
    }
    DoOnTouchCancel(sender, e, ve) {
        DataExcelConsole.log("DoOnTouchCancel", e);
    }
    DoPaste(e) {
        if (e.srcElement == document.body) {
            return this.Paste(e);
        }
    }
    DoCopy(e) {
        return this.Copy(e);
    }
    DoCut(e) {
        return this.Cut(e);
    }
    ///plus event
    DoOnMouseDownChart(sender, e, ve) {
        try {
            for (var i = 0; i < this.Charts.length; i++) {
                let chart = this.Charts[i];
                let res = chart.OnMouseDown(sender, e, ve);
                if (res) {
                    return true;
                }
            }
        }
        catch (e) {
            DataExcelConsole.log("DoOnMouseDownChart", e);
        }
        return false;
    }
    DoOnMouseUpChart(sender, e, ve) {
        try {
            for (var i = 0; i < this.Charts.length; i++) {
                let chart = this.Charts[i];
                let res = chart.OnMouseUp(sender, e, ve);
                if (res) {
                    return true;
                }
            }
        }
        catch (e) {
            DataExcelConsole.log("DoOnMouseUpChart", e);
        }
        return false;
    }
    DoOnMouseMoveChart(sender, e, ve) {
        try {
            for (var i = 0; i < this.Charts.length; i++) {
                let chart = this.Charts[i];
                let res = chart.OnMouseMove(sender, e, ve);
                if (res) {
                    return true;
                }
            }
        }
        catch (e) {
            DataExcelConsole.log("DoOnMouseMoveChart", e);
        }
        return false;
    }
    DoOnMouseDownPrimitive(sender, e, ve) {
        try {
            for (var i = 0; i < this.Primitives.length; i++) {
                let chart = this.Primitives[i];
                let res = chart.OnMouseDown(sender, e, ve);
                if (res) {
                    return true;
                }
            }
        }
        catch (e) {
            DataExcelConsole.log("DoOnMouseDownChart", e);
        }
        return false;
    }
    DoOnMouseUpPrimitive(sender, e, ve) {
        try {
            for (var i = 0; i < this.Primitives.length; i++) {
                let chart = this.Primitives[i];
                let res = chart.OnMouseUp(sender, e, ve);
                if (res) {
                    return true;
                }
            }
        }
        catch (e) {
            DataExcelConsole.log("DoOnMouseUpPrimitive", e);
        }
        return false;
    }
    DoOnMouseMovePrimitive(sender, e, ve) {
        try {
            for (var i = 0; i < this.Primitives.length; i++) {
                let chart = this.Primitives[i];
                let res = chart.OnMouseMove(sender, e, ve);
                if (res) {
                    return true;
                }
            }
        }
        catch (e) {
            DataExcelConsole.log("DoOnMouseMovePrimitive", e);
        }
        return false;
    }
    SetCellTouchStart(sender, e, ve) {
        this.touchdowntime = new Date();
        let touch = e.touches[0];
        let point = new Point(ve.offsetPoint.X, ve.offsetPoint.Y);
        this.DebugRect = new Rect(point.X, point.Y, 4, 4);
        let viewloaction = this.PointControlToView(point);
        let pt = viewloaction;
        pt.X = pt.X / this.Zoom;
        pt.Y = pt.Y / this.Zoom;
        let cell = this.GetCellByPoint(pt);
        if (cell == null) {
            return false;
        }
        if (cell.OnTouchStart(sender, e, ve)) {
            return true;
        }
        if (this.FocusedCell == cell && this.Selectmode != SelectMode.TouchMove) {
            this.touchdownpoint = point;
            this.touchdownfirstrow = this.FirstDisplayedRowIndex;
            this.touchdownfirstcolumn = this.FirstDisplayedColumnIndex;
            this.Selectmode = SelectMode.TouchMove;
            return;
        }
        this.Selectmode = SelectMode.CellSelected;
        this.BeginReFresh();
        this.ClearSelect();
        this.SetSelectCells(cell);
        cell.Selected = true;
        if (e.ctrlKey) {
            this.SelectRange.Add(this.GetFocusedCell());
            this.SelectRange.Add(cell);
        }
        else {
            this.SelectRange.Clear();
        }
        if (e.shiftKey) {
            //this.SelectCell(this.FocusedCell, cell);
        }
        this.SetFocusedCell(cell);
        e.stopPropagation();
        ve.NeedRePaint = true;
        ve.CurrentEvent = cell;
        ve.NeedRePaint = true;
        this.EndReFresh();
        return true;
    }
    FirstShowTouchMove(e, ve) {
        let pt = new Point(ve.offsetPoint.X, ve.offsetPoint.Y);
        let w = this.touchdownpoint.X - pt.X;
        let h = this.touchdownpoint.Y - pt.Y;
        DataExcelConsole.log("touchdownpoint", this.touchdownpoint);
        if (Math.abs(w) < Math.abs(h)) {
            let index = 0;
            let len = 0;
            if (!this.AllowChangedFirstDisplayRow)
                return false;
            len = Math.round(h / 10);
            index = this.touchdownfirstrow + len;
            DataExcelConsole.log("touchdownpoint rowindex", index);
            if (index > 0) {
                this.FirstDisplayedRowIndex = index;
                this.FirstDisplayedColumnIndex = this.touchdownfirstcolumn;
                ve.NeedRePaint = true;
            }
            try {
                e.preventDefault();
            }
            catch (ex) {
                DataExcelConsole.log("touchdownpoint rowindex", ex);
            }
            return true;
        }
        else {
            let index = 0;
            let len = 0;
            if (!this.AllowChangedFirstDisplayColumn)
                return false;
            len = Math.round(w / 20);
            index = this.touchdownfirstcolumn + len;
            DataExcelConsole.log("touchdownpoint columnindex", index);
            if (index > 0) {
                this.FirstDisplayedRowIndex = this.touchdownfirstrow;
                this.FirstDisplayedColumnIndex = index;
                ve.NeedRePaint = true;
            }
            try {
                e.preventDefault();
            }
            catch (ex) {
                DataExcelConsole.log("touchdownpoint columnindex", ex);
            }
            return true;
        }
        return false;
    }
    SelectModeNullTouchMove(e, ve) {
        let pt = new Point(ve.offsetPoint.X, ve.offsetPoint.Y);
        let viewlocation = this.PointControlToView(pt);
        let cell = this.GetCellByPoint(pt);
        if (cell != null) {
            if (cell.OwnMergeCell != null) {
                cell = cell.OwnMergeCell;
            }
            if (cell.OnTouchMove(this, e, ve)) {
                return true;
            }
            return false;
        }
    }
    //PASTE COPY CUT
    Cut(e) {
        try {
            if (this.FocusedCell == null) {
                return;
            }
            if (this.InEdit) {
                return;
            }
            this.CopyCells = null;
            if (this.InEdit)
                return;
            let list = this.GetSelectCells();
            let row = null;
            let count = list.Count;
            let sb = "";
            for (let i = 0; i < count; i++) {
                let cell = list.get(i);
                if (row == null) {
                    row = cell.Row;
                }
                else if (row != cell.Row) {
                    row = cell.Row;
                    sb = sb + (ConstantValue.CopySplitSymbolRow);
                }
                let celltext = "";
                celltext = cell.Text;
                sb = sb + (celltext);
                if (cell != list[list.Count - 1]) {
                    sb = sb + (ConstantValue.CopySplitSymbolColumn);
                }
            }
            let text = sb;
            if (this.SelectCells != null) {
                this.CopyCells = new SelectCellCollection();
                this.CopyCells.Grid = this;
                this.CopyCells.BeginCell = this.SelectCells.BeginCell;
                this.CopyCells.EndCell = this.SelectCells.EndCell;
                this.CopyCells.Refresh();
            }
            //let clipboardData = e.clipboardData || window.Clipboard;
            //clipboardData.setData('text/plain', text)
            list = this.GetSelectCells();
            for (let i = 0; i < count; i++) {
                let cell = list.get(i);
                cell.Text = "";
                cell.Value = null;
            }
            this.emit(Events.CellValueChanged, this, list);
            this.SetClipData(text, e);
            return text;
        }
        catch (ex) {
            DataExcelConsole.log("copy", ex);
        }
    }
    Copy(e) {
        try {
            if (this.FocusedCell == null) {
                return;
            }
            if (this.InEdit) {
                return;
            }
            this.CopyCells = null;
            let list = this.GetSelectCells();
            let row = null;
            let count = list.Count;
            let sb = "";
            let arr = [];
            for (let i = 0; i < count; i++) {
                let cell = list.get(i);
                if (row == null) {
                    row = cell.Row;
                }
                else if (row != cell.Row) {
                    row = cell.Row;
                    sb = sb + (ConstantValue.CopySplitSymbolRow);
                }
                let celltext = "";
                celltext = cell.Text;
                sb = sb + (celltext);
                if (cell != list[list.Count - 1]) {
                    sb = sb + (ConstantValue.CopySplitSymbolColumn);
                }
            }
            let text = sb;
            if (this.SelectCells != null) {
                this.CopyCells = new SelectCellCollection();
                this.CopyCells.Grid = this;
                this.CopyCells.BeginCell = this.SelectCells.BeginCell;
                this.CopyCells.EndCell = this.SelectCells.EndCell;
                this.CopyCells.Refresh();
            }
            this.SetClipData(text, e);
            return text;
        }
        catch (ex) {
            DataExcelConsole.log("copy", ex);
        }
    }
    Paste(e, txt) {
        try {
            if (this.FocusedCell == null) {
                return;
            }
            if (this.CopyCells != null) {
                this.PasteCopyCells();
                return;
            }
            if (this.InEdit) {
                return;
            }
            let text = txt;
            if (e != null) {
                let clipboardData = e.clipboardData || window.Clipboard;
                text = clipboardData.getData('text/plain');
                //let texthtml = clipboardData.getData('text/html');
                //console.log(texthtml);
            }
            let str = text;
            let strs = str.split(ConstantValue.CopySplitSymbolRow);
            if (strs.length > 1) {
                let minrow = this.FocusedCell.Row.Index;
                let mincolumn = this.FocusedCell.Column.Index;
                let maxrow = this.FocusedCell.Row.Index + strs.length;
                let rowindex = 0;
                let maxcolumn = 0;
                for (let i = minrow; i < maxrow; i++) {
                    let s = strs[rowindex];
                    rowindex++;
                    let ss = s.split(ConstantValue.CopySplitSymbolColumn);
                    maxcolumn = this.FocusedCell.MaxColumnIndex() + ss.length;
                    let columnindex = 0;
                    for (let j = mincolumn; j < maxcolumn; j++) {
                        let cell = this.GetCellByIndex(i, j);
                        if (cell.OwnMergeCell != null) {
                            if (cell == cell.OwnMergeCell.BeginCell) {
                                cell = cell.OwnMergeCell;
                            }
                            else {
                                continue;
                            }
                        }
                        let texti = ss[columnindex];
                        columnindex++;
                        cell.Value = texti;
                        cell.Text = texti;
                    }
                }
            }
            else if (this.SelectCells != null) {
                let list = this.SelectCells.GetCellList();
                for (let obj in list) {
                    let cell = list[obj];
                    cell.Value = text;
                    cell.Text = text;
                }
                this.emit(Events.CellValueChanged, this, list);
            }
        }
        catch (ex) {
            DataExcelConsole.log("dom DoPaste", ex);
        }
    }
    PasteStyle() {
        try {
            this.PasteValue = false;
            this.PasteCopyCells();
        }
        finally {
            this.PasteValue = true;
        }
    }
    SetClipData(text, e) {
        if (e != null) {
            let clipboardData = e.clipboardData || window.Clipboard;
            clipboardData.setData('text/plain', text);
        }
        const textarea = document.createElement('textarea');
        document.body.appendChild(textarea);
        // 隐藏此输入框
        textarea.style.display = 'none';
        // 赋值
        textarea.value = text;
        // 选中
        textarea.select();
        // 复制
        document.execCommand('copy', true);
        // 移除输入框
        document.body.removeChild(textarea);
    }
    PasteCopyCells() {
        if (this.CopyCells != null) {
            let focusedcell = this.FocusedCell;
            if (focusedcell == null)
                return;
            let cells = this.CopyCells;
            let minrow = cells.MinRow();
            let maxrow = cells.MaxRow();
            let mincolumn = cells.MinColumn();
            let maxcolumn = cells.MaxColumn();
            let rowcount = maxrow - minrow + 1;
            let columncount = maxcolumn - mincolumn + 1;
            let pased = new List();
            if (this.SelectRange.Count > 0) {
                let selectcells = this.GetSelectCells();
                for (let r = 0; r < selectcells.Count; r++) {
                    let cell = selectcells.get(r);
                    for (let i = 0; i < rowcount; i++) {
                        for (let j = 0; j < columncount; j++) {
                            let targetcell = this.GetCellByIndex(cell.MaxRowIndex() + i, cell.MaxColumnIndex() + j);
                            if (pased.contains(targetcell)) {
                                continue;
                            }
                            pased.Add(targetcell);
                            let sourcecell = this.GetCellByIndex(minrow + i, mincolumn + j);
                            let row = targetcell.Row;
                            let column = targetcell.Column;
                            this.PasteCell(sourcecell, targetcell);
                            targetcell.Row = row;
                            targetcell.Column = column;
                        }
                    }
                }
            }
            if (this.SelectCells != null) {
                let minselrow = this.SelectCells.MinRow();
                let minselcolumn = this.SelectCells.MinColumn();
                let maxselrow = this.SelectCells.MaxRow();
                let maxselcolumn = this.SelectCells.MaxColumn();
                if (minselrow == maxselrow) {
                    maxselrow = minselrow + rowcount - 1;
                }
                if (minselcolumn == maxselcolumn) {
                    maxselcolumn = minselcolumn + columncount - 1;
                }
                for (let m = minselrow; m <= maxselrow; m = m + rowcount) {
                    for (let n = minselcolumn; n <= maxselcolumn; n = n + columncount) {
                        let cell = this.GetCellByIndex(m, n);
                        for (let i = 0; i < rowcount; i++) {
                            for (let j = 0; j < columncount; j++) {
                                let targetcell = this.GetCellByIndex(cell.MaxRowIndex() + i, cell.MaxColumnIndex() + j);
                                if (pased.Contains(targetcell)) {
                                    continue;
                                }
                                if (targetcell.Row.Index > maxselrow) {
                                    continue;
                                }
                                if (targetcell.Column.Index > maxselcolumn) {
                                    continue;
                                }
                                pased.Add(targetcell);
                                let sourcecell = this.GetCellByIndex(minrow + i, mincolumn + j);
                                let row = targetcell.Row;
                                let column = targetcell.Column;
                                this.PasteCell(sourcecell, targetcell);
                                targetcell.Row = row;
                                targetcell.Column = column;
                            }
                        }
                    }
                }
            }
        }
    }
    PasteCell(sourcecell, targetcell) {
        if (targetcell.ReadOnly == CheckState.Check)
            return;
        this.PasteCellMerger(sourcecell, targetcell);
        this.PasteAction(sourcecell, targetcell);
        this.PasteProperty(sourcecell, targetcell);
        this.PasteBorder(sourcecell, targetcell);
        this.PasteCellEdit(sourcecell, targetcell);
        this.PasteCellStyle(sourcecell, targetcell);
        if (this.PasteValue) {
            this.PasteCellValue(sourcecell, targetcell);
            this.PasteExpression(sourcecell, targetcell);
        }
    }
    PasteCellEdit(sourcecell, targetcell) {
        if (targetcell.ReadOnly == CheckState.Check)
            return;
        targetcell.OwnEditControl = sourcecell.OwnEditControl;
    }
    PasteExpression(sourcecell, targetcell) {
        //if (targetcell.ReadOnly)
        //    return;
        //if (string.IsNullOrWhiteSpace(targetcell.Expression) && string.IsNullOrWhiteSpace(sourcecell.Expression))
        //    return;
        //targetcell.Expression = sourcecell.Expression;
    }
    PasteCellValue(sourcecell, targetcell) {
        if (targetcell.ReadOnly == CheckState.Check)
            return;
        targetcell.Value = sourcecell.Value;
        targetcell.Text = sourcecell.Text;
    }
    PasteCellStyle(sourcecell, targetcell) {
        if (targetcell.ReadOnly == CheckState.Check)
            return;
        targetcell.BackColor = sourcecell.BackColor;
        targetcell.ForeColor = sourcecell.ForeColor;
        targetcell.BackImage = sourcecell.BackImage;
        //targetcell.BackImgeSizeMode = sourcecell.BackImgeSizeMode;
        //targetcell.DisableImage = sourcecell.DisableImage;
        //targetcell.DisableImageSizeMode = sourcecell.DisableImageSizeMode;
        //targetcell.FocusBackColor = sourcecell.FocusBackColor;
        //targetcell.FocusForeColor = sourcecell.FocusForeColor;
        //targetcell.FocusImage = sourcecell.FocusImage;
        //targetcell.FocusImageSizeMode = sourcecell.FocusImageSizeMode;
        //targetcell.MouseDownBackColor = sourcecell.MouseDownBackColor;
        //targetcell.MouseDownForeColor = sourcecell.MouseDownForeColor;
        //targetcell.MouseDownImage = sourcecell.MouseDownImage;
        //targetcell.MouseDownImageSizeMode = sourcecell.MouseDownImageSizeMode;
        //targetcell.MouseOverBackColor = sourcecell.MouseOverBackColor;
        //targetcell.MouseOverForeColor = sourcecell.MouseOverForeColor;
        //targetcell.MouseOverImage = sourcecell.MouseOverImage;
        //targetcell.MouseOverImageSizeMode = sourcecell.MouseOverImageSizeMode;
        //targetcell.ReadOnlyImage = sourcecell.ReadOnlyImage;
        //targetcell.ReadOnlyImageSizeMode = sourcecell.ReadOnlyImageSizeMode;
        //targetcell.SelectBackColor = sourcecell.SelectBackColor;
        //targetcell.SelectBorderColor = sourcecell.SelectBorderColor;
        //targetcell.SelectForceColor = sourcecell.SelectForceColor;
        targetcell.ShowFocusedSelectBorder = sourcecell.ShowFocusedSelectBorder;
        targetcell.Style = JSON.parse(JSON.stringify(sourcecell.Style));
    }
    PasteAction(sourcecell, targetcell) {
        if (targetcell.ReadOnly == CheckState.Check)
            return;
        //targetcell.PropertyOnCellEndEdit = sourcecell.PropertyOnCellEndEdit;
        //targetcell.PropertyOnCellInitEdit = sourcecell.PropertyOnCellInitEdit;
        //targetcell.PropertyOnCellValueChanged = sourcecell.PropertyOnCellValueChanged;
        //targetcell.PropertyOnClick = sourcecell.PropertyOnClick;
        //targetcell.PropertyOnDoubleClick = sourcecell.PropertyOnDoubleClick;
        //targetcell.PropertyOnDrawBack = sourcecell.PropertyOnDrawBack;
        //targetcell.PropertyOnDrawCell = sourcecell.PropertyOnDrawCell;
        //targetcell.PropertyOnKeyDown = sourcecell.PropertyOnKeyDown;
        //targetcell.PropertyOnKeyPress = sourcecell.PropertyOnKeyPress;
        //targetcell.PropertyOnKeyUp = sourcecell.PropertyOnKeyUp;
        //targetcell.PropertyOnMouseCaptureChanged = sourcecell.PropertyOnMouseCaptureChanged;
        //targetcell.PropertyOnMouseClick = sourcecell.PropertyOnMouseClick;
        //targetcell.PropertyOnMouseDoubleClick = sourcecell.PropertyOnMouseDoubleClick;
        //targetcell.PropertyOnMouseDown = sourcecell.PropertyOnMouseDown;
        //targetcell.PropertyOnMouseEnter = sourcecell.PropertyOnMouseEnter;
        //targetcell.PropertyOnMouseHover = sourcecell.PropertyOnMouseHover;
        //targetcell.PropertyOnMouseLeave = sourcecell.PropertyOnMouseMove;
        //targetcell.PropertyOnMouseUp = sourcecell.PropertyOnMouseUp;
        //targetcell.PropertyOnMouseWheel = sourcecell.PropertyOnMouseWheel;
        //targetcell.PropertyOnPreviewKeyDown = sourcecell.PropertyOnPreviewKeyDown;
    }
    PasteProperty(sourcecell, targetcell) {
        if (targetcell.ReadOnly)
            return;
        targetcell.BackColor = sourcecell.BackColor;
        targetcell.ForeColor = sourcecell.ForeColor;
        targetcell.FormatType = sourcecell.FormatType;
        targetcell.Format = sourcecell.Format;
        //targetcell.FieldName = sourcecell.FieldName;
        targetcell.Font = sourcecell.Font;
        targetcell.BackImage = sourcecell.BackImage;
        //targetcell.BackImgeSizeMode = sourcecell.BackImgeSizeMode;
        //targetcell.DirectionVertical = sourcecell.DirectionVertical;
        //targetcell.DisableImage = sourcecell.DisableImage;
        //targetcell.DisableImageSizeMode = sourcecell.DisableImageSizeMode;
        //targetcell.DisplayMember = sourcecell.DisplayMember;
        //targetcell.FocusBackColor = sourcecell.FocusBackColor;
        //targetcell.FocusForeColor = sourcecell.FocusForeColor;
        //targetcell.FocusImage = sourcecell.FocusImage;
        //targetcell.FocusImageSizeMode = sourcecell.FocusImageSizeMode;
        //targetcell.FunctionBorder = sourcecell.FunctionBorder;
        targetcell.HorizontalAlignment = sourcecell.HorizontalAlignment;
        //targetcell.InhertReadOnly = sourcecell.InhertReadOnly;
        //targetcell.MouseDownBackColor = sourcecell.MouseDownBackColor;
        //targetcell.MouseDownForeColor = sourcecell.MouseDownForeColor;
        //targetcell.MouseDownImage = sourcecell.MouseDownImage;
        //targetcell.MouseDownImageSizeMode = sourcecell.MouseDownImageSizeMode;
        //targetcell.MouseOverBackColor = sourcecell.MouseOverBackColor;
        //targetcell.MouseOverForeColor = sourcecell.MouseOverForeColor;
        //targetcell.MouseOverImage = sourcecell.MouseOverImage;
        //targetcell.MouseOverImageSizeMode = sourcecell.MouseOverImageSizeMode;
        targetcell.ReadOnly = sourcecell.ReadOnly;
        //targetcell.ReadOnlyImage = sourcecell.ReadOnlyImage;
        //targetcell.ReadOnlyImageSizeMode = sourcecell.ReadOnlyImageSizeMode;
        //targetcell.SelectBackColor = sourcecell.SelectBackColor;
        //targetcell.SelectBorderColor = sourcecell.SelectBorderColor;
        //targetcell.SelectForceColor = sourcecell.SelectForceColor;
        targetcell.ShowFocusedSelectBorder = sourcecell.ShowFocusedSelectBorder;
        //targetcell.Value = sourcecell.Value;
        //targetcell.ValueMember = sourcecell.ValueMember;
        targetcell.VerticalAlignment = sourcecell.VerticalAlignment;
        targetcell.Visible = sourcecell.Visible;
    }
    PasteBorder(sourcecell, targetcell) {
        if (targetcell.ReadOnly == CheckState.Check)
            return;
        targetcell.TopLineStyle = sourcecell.TopLineStyle;
        targetcell.BottomLineStyle = sourcecell.BottomLineStyle;
        targetcell.LeftLineStyle = sourcecell.LeftLineStyle;
        targetcell.RightLineStyle = sourcecell.RightLineStyle;
    }
    PasteCellMerger(sourcecell, targetcell) {
        if (targetcell.ReadOnly == CheckState.Check)
            return;
        if (sourcecell.OwnMergeCell != null) {
            let mcell = sourcecell.OwnMergeCell;
            if (mcell.BeginCell == sourcecell) {
                let minrow = mcell.Row.Index;
                let maxrow = mcell.MaxRowIndex();
                let mincolumn = mcell.Column.Index;
                let maxcolumn = mcell.MaxColumnIndex();
                let rowcount = maxrow - minrow;
                let columncount = maxcolumn - mincolumn;
                let endcell = this.GetCellByIndex(targetcell.MaxRowIndex() + rowcount, targetcell.MaxColumnIndex() + columncount);
                this.MergeCell(targetcell, endcell);
            }
        }
    }
    SelectModeNullMouseMove(e, ve) {
        let pt = new Point(e.offsetX, e.offsetY);
        let viewlocation = this.PointControlToView(pt);
        let cell = this.GetCellByPoint(pt);
        if (cell != null) {
            if (cell.OwnMergeCell != null) {
                cell = cell.OwnMergeCell;
            }
            if (cell.OnMouseMove(this, e, ve)) {
                return true;
            }
            return false;
        }
    }
    SelectModeCellSeletedMouseMove(ve) {
        let pt = new Point();
        pt.X = ve.offsetPoint.X;
        pt.Y = ve.offsetPoint.Y;
        let viewloaction = this.PointControlToView(pt);
        let location = viewloaction;
        if (this.SelectCells != null) {
            if (this.SelectCells.BeginCell.Row.Index > 0 && this.SelectCells.BeginCell.Column.Index > 0) {
                if (!this.ClientBounds.Contains(location)) {
                    if (this.AllowChangedFirstDisplayRow) {
                        location = this.SetFirstShowIndex(location);
                    }
                }
            }
        }
        let cell = this.GetCellByPoint(pt);
        if (cell != null) {
            if (cell.OwnMergeCell != null) {
                cell = cell.OwnMergeCell;
            }
            if (this.SelectCells.EndCell != cell) {
                this.SelectCells.EndCell = cell;
                this.SelectCells.Refresh();
            }
            return true;
        }
        return false;
    }
    SelectModeCellAddSelectedMouseMove(e) {
        let viewloaction = this.PointControlToView(new Point(e.offsetX, e.offsetY));
        let pt = viewloaction;
        let location = this.SetFirstShowIndex(pt);
        let cell = this.GetCellByPoint(location);
        this.SelectAddRectCollection.EndCell = cell;
        return true;
    }
    SetSelectCellRowSelect() {
        this.SelectRows.Clear();
        this.SelectColumns.Clear();
        if (this.SelectCells != null) {
            let minrow = this.SelectCells.MinRow();
            let maxrow = this.SelectCells.MaxRow();
            let mincolumn = this.SelectCells.MinColumn();
            let maxcolumn = this.SelectCells.MaxColumn();
            if (minrow == 0 && maxrow == 0) {
                for (let i = mincolumn; i <= maxcolumn; i++) {
                    let column = this.Columns.Get(i);
                    column.Selected = true;
                }
            }
            if (mincolumn == 0 && maxcolumn == 0) {
                for (let i = minrow; i <= maxrow; i++) {
                    let row = this.Rows.Get(i);
                    row.Selected = true;
                }
            }
        }
    }
    //merge
    Merge(selectcells) {
        return this.NewMergeCell(this, selectcells);
    }
    MergeCell(cellbegin, cellend) {
        let model = new DataExcelMergeCell();
        model.Grid = this;
        model.BeginCell = cellbegin;
        model.EndCell = cellend;
        this.MergeCells.Add(model);
        return model;
    }
    UnMerge(selectcells) {
        let list = selectcells.GetAllCells();
        list.forEach((cell) => {
            if (cell.OwnMergeCell != null) {
                let mergecell = cell.OwnMergeCell;
                mergecell.Released = true;
                this.MergeCells.Remove(mergecell);
            }
            cell.OwnMergeCell = null;
        });
    }
    BackCell(selectcells) {
        return this.NewBackCell(this, selectcells);
    }
    BackCell2(cellbegin, cellend) {
        let model = new DataExcelBackCell();
        model.Grid = this;
        model.BeginCell = cellbegin;
        model.EndCell = cellend;
        this.BackCells.Add(model);
        return model;
    }
    UnBackCell(selectcells) {
        let list = selectcells.GetAllCells();
        list.forEach((cell) => {
            if (cell.OwnBackCell != null) {
                let mergecell = cell.OwnBackCell;
                mergecell.Released = true;
                this.BackCells.Remove(mergecell);
            }
            cell.OwnBackCell = null;
        });
    }
    //TOOL
    BeginSetCursor(cursor) {
        this.maindom.style.cursor = cursor;
        this.zrendermain.dom.style.cursor = cursor;
    }
    InVisible(cell) {
        if (cell == null)
            return false;
        if (cell.Row.Index >= this.FirstDisplayedRowIndex && cell.Row.Index <= this.EndDisplayedRowIndex) {
            if (cell.Column.Index >= this.FirstDisplayedColumnIndex && cell.Column.Index <= this.EndDisplayedColumnIndex) {
                return true;
            }
        }
        return false;
    }
    GetRow(rowindex) {
        let row = this.Rows.Get(rowindex);
        if (row == null) {
            row = this.NewRow(this, rowindex);
            this.Rows.Add(rowindex, row);
        }
        return row;
    }
    GetColumn(columnindex) {
        let column = this.Columns.Get(columnindex);
        if (column == null) {
            column = this.NewColumn(this, columnindex);
            this.Columns.Add(columnindex, column);
        }
        return column;
    }
    GetCellByIndex(rowindex, columnindex) {
        let row = this.Rows.Get(rowindex);
        if (row == null) {
            row = this.NewRow(this, rowindex);
            this.Rows.Add(rowindex, row);
        }
        let column = this.Columns.Get(columnindex);
        if (column == null) {
            column = this.NewColumn(this, columnindex);
            this.Columns.Add(columnindex, column);
        }
        let cell = row.Cells.Get(column);
        if (cell == null) {
            cell = this.NewCell(row, column);
        }
        return cell;
    }
    SetFirstShowIndex(point) {
        let location = point;
        let movestep = 1;
        if (point.X <= this.ContentLeft) {
            location.X = this.ContentLeft + 1;
        }
        if (point.X >= (this.Width - this.ContentRight)) {
            location.X = this.Width - this.ContentRight - 1;
        }
        if (point.Y <= this.ContentTop) {
            location.Y = this.ContentTop + 1;
        }
        if (point.Y >= (this.Height - this.ContentBottom)) {
            location.Y = this.Height - this.ContentBottom - 1;
        }
        let firstcolumnindex = 0;
        if (point.X <= this.ContentLeft) {
            firstcolumnindex = (this.FirstDisplayedColumnIndex - movestep);
            if (firstcolumnindex <= 0) {
                firstcolumnindex = 0;
            }
            if (this.AllowChangedFirstDisplayColumn) {
                this.SetFirstDisplayColumn(firstcolumnindex);
            }
            return location;
        }
        else if (point.X >= (this.Width - this.ContentRight)) {
            firstcolumnindex = (this.FirstDisplayedColumnIndex + movestep);
            if (firstcolumnindex <= 0) {
                firstcolumnindex = 0;
            }
            if (this.AllowChangedFirstDisplayColumn) {
                this.SetFirstDisplayColumn(firstcolumnindex);
            }
            return location;
        }
        if (point.Y <= this.ContentTop) {
            firstcolumnindex = (this.FirstDisplayedRowIndex - movestep);
            if (firstcolumnindex <= 0) {
                firstcolumnindex = 0;
            }
            if (this.AllowChangedFirstDisplayRow) {
                this.SetFirstDisplayRow(firstcolumnindex);
            }
            return location;
        }
        else if (point.Y >= (this.Height - this.ContentBottom)) {
            firstcolumnindex = (this.FirstDisplayedRowIndex + movestep);
            if (firstcolumnindex <= 0) {
                firstcolumnindex = 0;
            }
            if (this.AllowChangedFirstDisplayRow) {
                this.SetFirstDisplayRow(firstcolumnindex);
            }
            return location;
        }
        return location;
    }
    GetOwnCell(cell) {
        if (cell == null)
            return null;
        if (cell.OwnMergeCell != null)
            return cell.OwnMergeCell;
        return cell;
    }
    GetLeftCell(cell) {
        if (cell == null)
            return null;
        let rowindex = cell.Row.Index;
        let columnindex = cell.Column.Index - 1;
        if (columnindex < 1) {
            return null;
        }
        let rescell = this.GetCellByIndex(rowindex, columnindex);
        return rescell;
    }
    GetRightCell(cell) {
        if (cell == null)
            return null;
        let rowindex = cell.Row.Index;
        let columnindex = cell.Column.Index + 1;
        if (columnindex < 1) {
            return null;
        }
        let rescell = this.GetCellByIndex(rowindex, columnindex);
        return rescell;
    }
    GetTopCell(cell) {
        if (cell == null)
            return null;
        let rowindex = cell.Row.Index - 1;
        let columnindex = cell.Column.Index;
        if (rowindex < 1) {
            return null;
        }
        let rescell = this.GetCellByIndex(rowindex, columnindex);
        return rescell;
    }
    GetBottomCell(cell) {
        if (cell == null)
            return null;
        let rowindex = cell.Row.Index + 1;
        let columnindex = cell.Column.Index;
        if (rowindex < 1) {
            return null;
        }
        let rescell = this.GetCellByIndex(rowindex, columnindex);
        return rescell;
    }
    //CommandMethod
    Clear() {
        //this.BookMarkList.Clear();
        //this.FocsedCellList.Clear();
        this.SelectCells = null;
        this.Selectmode = SelectMode.Null;
        //this._password = string.Empty;
        //this._filename = string.Empty;
        //this.ListFilter = null;
        this.AllowChangedFirstDisplayColumn = true;
        this.AllowChangedFirstDisplayRow = true;
        this.AutoGenerateColumns = true;
        this.AutoGenerateRows = true;
        this.ShowBorder = true;
        this.ShowColumnHeader = true;
        this.ShowRowHeader = true;
        this.ShowGridLine = true;
        this.FirstDisplayedRowIndex = 1;
        this.EndDisplayedRowIndex = 1;
        this.FirstDisplayedColumnIndex = 1;
        this.EndDisplayedColumnIndex = 1;
        this.ReadOnly = CheckState.Unkown;
        this.TopSideHeight = 0;
        this.Font = "14px 宋体";
        //this.BackColor = "red";
        this.AutoGenerateRows = true;
        this.MaxRow = 1000000;
        this.FrozenRow = 0;
        this.ContentTop = 0;
        this.ContentBottom = 0;
        this.BackImage = "";
        this.BackImageImageLayout = ImageLayout.ZoomClip;
        this.CopyCells = null;
        if (this.MergeCells != null) {
            this.MergeCells.Clear();
        }
        if (this.BackCells != null) {
            this.BackCells.Clear();
        }
        if (this.Charts != null) {
            this.Charts.Clear();
        }
        if (this.Primitives != null) {
            this.Primitives.Clear();
        }
        if (this.Rows != null) {
            this.Rows.Clear();
        }
        if (this.Columns != null) {
            this.Columns.Clear();
        }
        //if (this.FunctionCells != null)
        //{
        //    this.FunctionCells.Clear();
        //}
        //if (this.ListExtendCells != null)
        //{
        //    this.ListExtendCells.Clear();
        //}
        //if (this.FieldCells != null)
        //{
        //    this.FieldCells.Clear();
        //}
        this.IDCells.Clear();
        //this.BackgroundImage = null;
        //this._code = string.Empty;
        //    this.ExtensData.Clear();
        this.CurrentEdit = null;
        this._CellEvent = null;
        //this.CellSaveEdits.Clear();
        //this._DataSource = null;
        //this._datamember = null;
        this.FirstDisplayedRowIndex = 1;
        this.FirstDisplayedColumnIndex = 1;
        //this._showgridcolumnline = true;
        //this._showgridrowline = true;
        this.ShowSelectBorder = true;
        //this._showselectaddrect = true;
        //this._password = string.Empty;
        //this._maxRow = int.MaxValue;
        //this._maxColumn = MAXCOLUMNINDEX; 
        this.ShowRowHeader = true;
        this.ShowGridLine = true;
        this.ShowColumnHeader = true;
        this._focusedcell = null;
        this.VisibleColumns.Clear();
        this.VisibleRows.Clear();
    }
    OpenFile(file) {
        try {
            let read = new FileReader();
            let grid = this;
            read.onload = function readf() {
                let txt = read.result;
                let data = JSON.parse(txt);
                grid.SetData(data);
                grid.InitChart();
                grid.RefreshZrender();
                grid.Refresh();
                grid.RePaint();
                grid.Charts.Refresh();
                grid.emit("OpenFile", this, data);
            };
            read.readAsText(file);
        }
        catch (e) {
            DataExcelConsole.log("OpenFile", e);
        }
    }
    //Command
    CommandNew() {
        this.Clear();
        this.Refresh();
    }
    CommandBackGroudColor(color) {
        let list = this.GetSelectCells();
        for (let i in list) {
            let cell = list[i];
            cell.BackColor = color;
        }
    }
    CommandForeColor(color) {
        let list = this.GetSelectCells();
        for (let i in list) {
            let cell = list[i];
            cell.ForeColor = color;
        }
    }
    CommandFontName(fontname) {
        let list = this.GetSelectCells();
        for (let i in list) {
            let cell = list[i];
            cell.Style.fontFamily = fontname;
        }
    }
    CommandFontSize(fontsize) {
        let list = this.GetSelectCells();
        for (let i in list) {
            let cell = list[i];
            cell.Style.fontSize = fontsize;
        }
    }
    CommandFontSizeAdd(num) {
        let list = this.GetSelectCells();
        for (let i in list) {
            let cell = list[i];
            let fontsize = cell.Style.fontSize;
            if (fontsize == null) {
                fontsize = '14px';
            }
            fontsize = fontsize.replace("px", "");
            let size = Number(fontsize);
            cell.Style.fontSize = (size + num) + "px";
        }
    }
    CommandFontWeight(fontweight) {
        let list = this.GetSelectCells();
        for (let i in list) {
            let cell = list[i];
            cell.Style.fontWeight = fontweight;
        }
    }
    CommandFontStyle(fontstyle) {
        let list = this.GetSelectCells();
        for (let i in list) {
            let cell = list[i];
            if (fontstyle == "bold") {
                cell.Style.fontWeight = fontstyle;
            }
            else {
                cell.Style.fontStyle = fontstyle;
            }
            if (fontstyle == "normal") {
                cell.Style.fontWeight = fontstyle;
                cell.Style.fontStyle = fontstyle;
            }
        }
    }
    CommandCellBorder(border) {
        let list = this.GetSelectCells();
        let style = { stroke: "black" };
        for (let i in list) {
            let cell = list[i];
            switch (border) {
                case Border.all:
                    let leftcell = this.GetLeftCell(cell);
                    leftcell = this.GetOwnCell(leftcell);
                    if (leftcell != null) {
                        if (leftcell.RightLineStyle == null) {
                            cell.LeftLineStyle = style;
                        }
                    }
                    let topcell = this.GetTopCell(cell);
                    topcell = this.GetOwnCell(topcell);
                    if (topcell != null) {
                        if (topcell.BottomLineStyle == null) {
                            cell.TopLineStyle = style;
                        }
                    }
                    cell.RightLineStyle = style;
                    cell.BottomLineStyle = style;
                    break;
                case Border.left:
                    cell.LeftLineStyle = style;
                    break;
                case Border.right:
                    cell.RightLineStyle = style;
                    break;
                case Border.top:
                    cell.TopLineStyle = style;
                    break;
                case Border.bottom:
                    cell.BottomLineStyle = style;
                    break;
                default:
            }
        }
    }
    CommandTextAlign(algin) {
        let list = this.GetSelectCells();
        for (let i in list) {
            let cell = list[i];
            cell.Style.align = algin;
        }
    }
    //Script
    ExecScript(txt) {
        eval(txt);
    }
    //Test
    Test() {
        this.FocusedCell.BackImage = "";
    }
    //Add Select
    UpdataSelectAdd() {
        let selectionadd = this.SelectAddRectCollection;
        if (selectionadd == null)
            return;
        if (selectionadd.SelectCellCollection == null)
            return;
        if (selectionadd.EndCell == null)
            return;
        let target = selectionadd.EndCell;
        let selminrowindex = selectionadd.SelectCellCollection.MinRow();
        let selmincolumnindex = selectionadd.SelectCellCollection.MinColumn();
        let selmaxrowindex = selectionadd.SelectCellCollection.MaxRow();
        let selmaxcolumnindex = selectionadd.SelectCellCollection.MaxColumn();
        let targetrowindex = selectionadd.EndCell.Row.Index;
        let targetcolumnindex = selectionadd.EndCell.Column.Index;
        let rowcount = targetrowindex - selmaxrowindex;
        let columncount = targetcolumnindex - selmaxcolumnindex;
        if (rowcount >= 0) {
            if (columncount >= 0) {
                if (rowcount >= columncount) {
                    this.UpdataSelectRowsDown(selectionadd, target);
                }
                else {
                    this.UpdataSelectColumnsRight(selectionadd, target);
                }
            }
            else {
                columncount = selmincolumnindex - targetcolumnindex;
                if (rowcount >= columncount) {
                    this.UpdataSelectRowsDown(selectionadd, target);
                }
                else {
                    this.UpdataSelectColumnsLeft(selectionadd, target);
                }
            }
        }
        else {
            rowcount = selminrowindex - targetrowindex;
            if (columncount >= 0) {
                if (rowcount >= columncount) {
                    this.UpdataSelectRowsUp(selectionadd, target);
                }
                else {
                    this.UpdataSelectColumnsRight(selectionadd, target);
                }
            }
            else {
                columncount = selmincolumnindex - targetcolumnindex;
                if (rowcount >= columncount) {
                    this.UpdataSelectRowsUp(selectionadd, target);
                }
                else {
                    this.UpdataSelectColumnsLeft(selectionadd, target);
                }
            }
        }
        rowcount = targetrowindex - selminrowindex;
        columncount = targetcolumnindex - selmincolumnindex;
        this.EndEdit();
    }
    UpdataSelectRowsUp(selectionadd, target) {
        let selminrowindex = selectionadd.SelectCellCollection.MinRow();
        let selmincolumnindex = selectionadd.SelectCellCollection.MinColumn();
        let selmaxrowindex = selectionadd.SelectCellCollection.MaxRow();
        let selmaxcolumnindex = selectionadd.SelectCellCollection.MaxColumn();
        let targetrowindex = selectionadd.EndCell.Row.Index;
        let targetcolumnindex = selectionadd.EndCell.Column.Index;
        for (let i = selmincolumnindex; i <= selmaxcolumnindex; i++) {
            let cellend = this.GetCellByIndex(selminrowindex, i);
            let cellbegin = this.GetCellByIndex(selmaxrowindex, i);
            let target2 = this.GetCellByIndex(targetrowindex, i);
            this.UpdataSelectRowsUp2(cellbegin, cellend, target2);
        }
    }
    UpdataSelectRowsDown(selectionadd, target) {
        let selminrowindex = selectionadd.SelectCellCollection.MinRow();
        let selmincolumnindex = selectionadd.SelectCellCollection.MinColumn();
        let selmaxrowindex = selectionadd.SelectCellCollection.MaxRow();
        let selmaxcolumnindex = selectionadd.SelectCellCollection.MaxColumn();
        let targetrowindex = selectionadd.EndCell.Row.Index;
        let targetcolumnindex = selectionadd.EndCell.Column.Index;
        for (let i = selmincolumnindex; i <= selmaxcolumnindex; i++) {
            let cellbegin = this.GetCellByIndex(selminrowindex, i);
            let cellend = this.GetCellByIndex(selmaxrowindex, i);
            let target2 = this.GetCellByIndex(targetrowindex, i);
            this.UpdataSelectRowsDown2(cellbegin, cellend, target2);
        }
    }
    UpdataSelectColumnsRight(selectionadd, target) {
        let selminrowindex = selectionadd.SelectCellCollection.MinRow();
        let selmincolumnindex = selectionadd.SelectCellCollection.MinColumn();
        let selmaxrowindex = selectionadd.SelectCellCollection.MaxRow();
        let selmaxcolumnindex = selectionadd.SelectCellCollection.MaxColumn();
        let targetrowindex = selectionadd.EndCell.Row.Index;
        let targetcolumnindex = selectionadd.EndCell.Column.Index;
        for (let i = selminrowindex; i <= selmaxrowindex; i++) {
            let cellbegin = this.GetCellByIndex(i, selmincolumnindex);
            let cellend = this.GetCellByIndex(i, selmaxcolumnindex);
            let target2 = this.GetCellByIndex(i, targetcolumnindex);
            this.UpdataSelectColumnsDown2(cellbegin, cellend, target2);
        }
    }
    UpdataSelectColumnsLeft(selectionadd, target) {
        let selminrowindex = selectionadd.SelectCellCollection.MinRow();
        let selmincolumnindex = selectionadd.SelectCellCollection.MinColumn();
        let selmaxrowindex = selectionadd.SelectCellCollection.MaxRow();
        let selmaxcolumnindex = selectionadd.SelectCellCollection.MaxColumn();
        let targetrowindex = selectionadd.EndCell.Row.Index;
        let targetcolumnindex = selectionadd.EndCell.Column.Index;
        for (let i = selminrowindex; i <= selmaxrowindex; i++) {
            let cellend = this.GetCellByIndex(i, selmincolumnindex);
            let cellbegin = this.GetCellByIndex(i, selmaxcolumnindex);
            let target2 = this.GetCellByIndex(i, targetcolumnindex);
            this.UpdataSelectColumnsLeft2(cellbegin, cellend, target2);
        }
    }
    GetSelectDataTimeAdd(dt, DateType, i, DateLen) {
        let len = i * DateLen;
        switch (DateType) {
            case 1:
                dt = dt.AddSeconds(len);
                break;
            case 2:
                dt = dt.AddMinutes(len);
                break;
            case 3:
                dt = dt.AddHours(len);
                break;
            case 4:
                dt = dt.AddDays(len);
                break;
            case 5:
                dt = dt.AddDays(len * 7);
                break;
            case 6:
                dt = dt.AddMonths(len);
                break;
            case 7:
                dt = dt.AddYears(len);
                break;
            default:
                dt = dt.AddDays(i * 1);
                break;
        }
        return dt;
    }
    UpdataSelectRowsDown2(cellbegin, cellend, target) {
        //if (System.Windows.Forms.Control.ModifierKeys == Keys.Control)
        //{
        this.UpdataSelectRows2DownAdd(cellbegin, cellend, target, false);
        //}
        //else
        //{
        //this.UpdataSelectRows2DownAdd(cellbegin, cellend, target, true);
        //}
    }
    UpdataSelectRows2DownAdd(cellbegin, cellend, target, copy) {
        let minrow = cellbegin.Row.Index;
        let maxrow = cellend.MaxRowIndex();
        let targetrow = target.Row.Index;
        let tcolumn = cellbegin.Column.Index;
        let targetcount = targetrow - maxrow;
        let scount = maxrow - minrow + 1;
        if (scount < 1)
            return;
        let count = targetcount / scount;
        let hasSet = false;
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < scount; j++) {
                let trow = maxrow + i * scount + j + 1;
                let srow = minrow + j;
                if (tcolumn < 1 || trow < 1) {
                    return;
                }
                let tcell = this.GetCellByIndex(trow, tcolumn);
                let scell = this.GetCellByIndex(srow, tcolumn);
                this.PasteCell(scell, tcell);
                let num = (i + 1) * this.ADDVALUE;
                this.setUpdataCellValue(tcell, scell, num);
                //if (!copy)
                //{
                //if (!string.IsNullOrWhiteSpace(scell.Expression))
                //{
                //    tcell.Expression = Function.GetNextRowExpress(scell.Expression, i + 1);
                //    continue;
                //}
                //DateTime ? dt = Feng.Utils.ConvertHelper.ToDateTimeNullable(scell.Value);
                //if (dt.HasValue)
                //{
                //    if (hasSet)
                //    {
                //        if (System.Windows.Forms.Control.ModifierKeys == Keys.Shift)
                //        {
                //            SetSelectDateTimeAddType(ref DateType, ref DateLen);
                //        }
                //    }
                //        DateTime dttime = dt.Value;
                //    tcell.Value = GetSelectDataTimeAdd(dttime, DateType, (i + 1), DateLen);
                //    continue;
                //}
                //decimal ? dvalue = Feng.Utils.ConvertHelper.ToDecimalNullable(scell.Value);
                //if (dvalue.HasValue)
                //{
                //    if (hasSet)
                //    {
                //        if (System.Windows.Forms.Control.ModifierKeys == Keys.Shift)
                //        {
                //            SetSelectDecimalAddType(ref DateType, ref DateLen);
                //        }
                //    }
                //        decimal value = dvalue.Value + (i + 1) * ADDVALUE;
                //    tcell.Value = value;
                //    continue;
                //}
                //tcell.Value = scell.Value;
                //}
            }
        }
    }
    UpdataSelectRowsUp2(cellbegin, cellend, target) {
        //if (System.Windows.Forms.Control.ModifierKeys == Keys.Control)
        //{
        this.UpdataSelectRows2UpAdd(cellbegin, cellend, target);
        //}
        //else
        //{
        //    UpdataSelectRows2UpCopy(cellbegin, cellend, target);
        //}
    }
    UpdataSelectRows2UpAdd(cellbegin, cellend, target) {
        let minrow = cellend.Row.Index;
        let maxrow = cellbegin.MaxRowIndex();
        let targetrow = target.Row.Index;
        let tcolumn = cellbegin.Column.Index;
        let targetcount = maxrow - targetrow;
        let scount = maxrow - minrow + 1;
        if (scount < 1)
            return;
        let count = targetcount / scount;
        let hasSet = false;
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < scount; j++) {
                let trow = maxrow - i * scount - j - 1;
                let srow = minrow - j;
                if (tcolumn < 1 || trow < 1) {
                    return;
                }
                let tcell = this.GetCellByIndex(trow, tcolumn);
                let scell = this.GetCellByIndex(srow, tcolumn);
                this.PasteCell(scell, tcell);
                let num = -1 * (i + 1) * this.ADDVALUE;
                this.setUpdataCellValue(tcell, scell, num);
            }
        }
    }
    UpdataSelectRows2UpCopy(cellbegin, cellend, target) {
        let minrow = cellend.MaxRowIndex();
        let maxrow = cellbegin.Row.Index;
        let targetrow = target.Row.Index;
        let tcolumn = cellbegin.Column.Index;
        let targetcount = maxrow - targetrow;
        let scount = maxrow - minrow + 1;
        if (scount < 1)
            return;
        let count = targetcount / scount;
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < scount; j++) {
                let trow = minrow - i * scount - j - 1;
                let srow = maxrow - j;
                if (tcolumn < 1 || trow < 1) {
                    return;
                }
                let tcell = this.GetCellByIndex(trow, tcolumn);
                let scell = this.GetCellByIndex(srow, tcolumn);
                if (tcolumn < 1 || trow < 1) {
                    return;
                }
                this.PasteCell(scell, tcell);
            }
        }
    }
    UpdataSelectColumnsDown2(cellbegin, cellend, target) {
        //if (System.Windows.Forms.Control.ModifierKeys == Keys.Control)
        //{
        this.UpdataSelectColumns2DownAdd(cellbegin, cellend, target);
        //}
        //else
        //{
        //    UpdataSelectColumns2DownCopy(cellbegin, cellend, target);
        //}
    }
    UpdataSelectColumns2DownAdd(cellbegin, cellend, target) {
        let minrow = cellbegin.Column.Index;
        let maxrow = cellend.MaxColumnIndex();
        let targetrow = target.Column.Index;
        let trow = cellbegin.Row.Index;
        let targetcount = targetrow - maxrow;
        let scount = maxrow - minrow + 1;
        if (scount < 1)
            return;
        let count = targetcount / scount;
        let hasSet = false;
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < scount; j++) {
                let tcolumn = maxrow + i * scount + j + 1;
                let srow = minrow + j;
                if (tcolumn < 1 || trow < 1) {
                    return;
                }
                let tcell = this.GetCellByIndex(trow, tcolumn);
                let scell = this.GetCellByIndex(trow, srow);
                this.PasteCell(scell, tcell);
                let num = (i + 1) * this.ADDVALUE;
                this.setUpdataCellValue(tcell, scell, num);
            }
        }
    }
    UpdataSelectColumns2DownCopy(cellbegin, cellend, target) {
        let mincolumn = cellbegin.Column.Index;
        let maxcolumn = cellend.MaxColumnIndex();
        let targetcolumn = target.Column.Index;
        let trow = cellbegin.Row.Index;
        let targetcount = targetcolumn - maxcolumn;
        let scount = maxcolumn - mincolumn + 1;
        if (scount < 1)
            return;
        let count = targetcount / scount;
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < scount; j++) {
                let tcolumn = maxcolumn + i * scount + j + 1;
                let srow = mincolumn + j;
                if (tcolumn < 1 || trow < 1) {
                    return;
                }
                let tcell = this.GetCellByIndex(trow, tcolumn);
                let scell = this.GetCellByIndex(trow, srow);
                this.PasteCell(scell, tcell);
            }
        }
    }
    UpdataSelectColumnsLeft2(cellbegin, cellend, target) {
        //if (System.Windows.Forms.Control.ModifierKeys == Keys.Control)
        //{
        this.UpdataSelectColumns2UpAdd(cellbegin, cellend, target);
        //}
        //else
        //{
        //    UpdataSelectColumns2UpCopy(cellbegin, cellend, target);
        //}
    }
    UpdataSelectColumns2UpAdd(cellbegin, cellend, target) {
        let minrow = cellend.Column.Index;
        let maxrow = cellbegin.MaxColumnIndex();
        let targetrow = target.Column.Index;
        let trow = cellbegin.Row.Index;
        let targetcount = maxrow - targetrow;
        let scount = maxrow - minrow + 1;
        if (scount < 1)
            return;
        let count = targetcount / scount;
        let hasSet = false;
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < scount; j++) {
                let tcolumn = maxrow - i * scount - j - 1;
                let srow = minrow - j;
                if (tcolumn < 1 || trow < 1) {
                    return;
                }
                let tcell = this.GetCellByIndex(trow, tcolumn);
                let scell = this.GetCellByIndex(trow, srow);
                this.PasteCell(scell, tcell);
                let num = -1 * (i + 1) * this.ADDVALUE;
                this.setUpdataCellValue(tcell, scell, num);
            }
        }
    }
    setUpdataCellValue(tcell, scell, value) {
        let isnum = ConvertHelper.IsNumber(scell.Value);
        if (tcell.ReadOnly == CheckState.Check) {
            return;
        }
        if (isnum) {
            let num = parseInt(scell.Value);
            let tvalue = num + value;
            tcell.Value = tvalue;
            tcell.Text = tvalue.toString();
        }
        else {
            tcell.Value = scell.Value;
            tcell.Text = scell.Text;
        }
    }
    UpdataSelectColumns2UpCopy(cellbegin, cellend, target) {
        let minrow = cellend.MaxColumnIndex;
        let maxrow = cellbegin.Column.Index;
        let targetrow = target.Column.Index;
        let trow = cellbegin.Row.Index;
        let targetcount = maxrow - targetrow;
        let scount = maxrow - minrow + 1;
        if (scount < 1)
            return;
        let count = targetcount / scount;
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < scount; j++) {
                let tcolumn = minrow - i * scount - j - 1;
                let srow = maxrow - j;
                if (tcolumn < 1 || trow < 1) {
                    return;
                }
                let tcell = this.GetCellByIndex(trow, tcolumn);
                let scell = this.GetCellByIndex(trow, srow);
                this.PasteCell(scell, tcell);
            }
        }
    }
    UpdateSelectAddRect() {
        this.UpdataSelectAdd();
    }
    MoveFocusedCellToNextCell(nct, initedit) {
        let cell = this.FocusedCell;
        if (this.FocusedCell == null) {
            cell = this.GetCellByIndex(1, 1);
        }
        let rindex = cell.Row.Index;
        let cindex = cell.Column.Index;
        this.ClearSelect();
        this.EndEdit();
        if (this.FocusedCell != null) {
            switch (nct) {
                case NextType.Left:
                    rindex = cell.Row.Index;
                    cindex = cell.Column.Index;
                    if (cindex > 1) {
                        cindex = cindex - 1;
                        cell = this.GetCellByIndex(rindex, cindex);
                        if (cell.OwnMergeCell != null) {
                            cell = cell.OwnMergeCell;
                        }
                    }
                    break;
                case NextType.Up:
                    rindex = cell.Row.Index;
                    cindex = cell.Column.Index;
                    if (rindex > 1) {
                        rindex = rindex - 1;
                        cell = this.GetCellByIndex(rindex, cindex);
                        if (cell.OwnMergeCell != null) {
                            cell = cell.OwnMergeCell;
                        }
                    }
                    break;
                case NextType.Right:
                    rindex = cell.Row.Index;
                    cindex = cell.MaxColumnIndex();
                    cindex = cindex + 1;
                    cell = this.GetCellByIndex(rindex, cindex);
                    if (cell.OwnMergeCell != null) {
                        cell = cell.OwnMergeCell;
                    }
                    break;
                case NextType.Down:
                    rindex = cell.MaxRowIndex();
                    cindex = cell.Column.Index;
                    rindex = rindex + 1;
                    cell = this.GetCellByIndex(rindex, cindex);
                    if (cell.OwnMergeCell != null) {
                        cell = cell.OwnMergeCell;
                    }
                    break;
                default:
                    break;
            }
            this.ShowAndFocusedCell(cell);
            //this.FocusedCell = cell;
            if (initedit) {
                this.FocusedCell.InitEdit(this);
            }
        }
    }
    MoveFocusedCellToLeftCell() {
        this.MoveFocusedCellToNextCell(NextType.Left, false);
    }
    MoveFocusedCellToUpCell() {
        this.MoveFocusedCellToNextCell(NextType.Up, false);
    }
    MoveFocusedCellToRightCell() {
        this.MoveFocusedCellToNextCell(NextType.Right, false);
    }
    MoveFocusedCellToDownCell() {
        this.MoveFocusedCellToNextCell(NextType.Down, false);
    }
    ShowAndFocusedCell(cell) {
        if (cell == this.FocusedCell)
            return;
        let precell = this.FocusedCell;
        this.CurrentEvent = cell;
        this.FocusedCell = cell;
        this.SetSelectCells(cell);
        this.ShowCell(precell, this.FocusedCell);
        this.emit(Events.FocusedCellChanged, this, this.FocusedCell);
    }
    ShowCell(precell, nextcell) {
        if (precell == null) {
            precell = this.GetCellByIndex(1, 1);
        }
        if (nextcell == null) {
            return;
        }
        if (precell == nextcell) {
            return;
        }
        if (precell.Row.Index == nextcell.Row.Index) {
            if ((precell.Column.Index - nextcell.Column.Index) == 1) {
                if (this.FirstDisplayedColumnIndex > nextcell.Column.Index) {
                    this.SetFirstDisplayColumn(this.FirstDisplayedColumnIndex - 1);
                }
            }
            else if ((precell.Column.Index - nextcell.Column.Index) == -1) {
                if (this.VisibleColumns != null) {
                    if (this.VisibleColumns.Count > 0) {
                        if ((this.VisibleColumns[this.VisibleColumns.Count - 1].Index) < nextcell.Column.Index) {
                            this.SetFirstDisplayColumn(this.FirstDisplayedColumnIndex + 1);
                        }
                    }
                }
            }
        }
        else {
            if ((precell.Row.Index - nextcell.Row.Index) == 1) {
                if (this.FirstDisplayedRowIndex > nextcell.Row.Index) {
                    this.SetFirstDisplayRow(this.FirstDisplayedRowIndex - 1);
                }
            }
            else if ((precell.Row.Index - nextcell.Row.Index) == -1) {
                if (this.VisibleRows != null) {
                    if (this.VisibleRows.Count > 0) {
                        if ((this.VisibleRows[this.VisibleRows.Count - 1].Index) < nextcell.Row.Index) {
                            this.SetFirstDisplayRow(this.FirstDisplayedRowIndex + 1);
                        }
                    }
                }
            }
        }
    }
    CellMoveUp(cells, step) {
        if (cells != null) {
            let minrow = cells.MinRow();
            let maxrow = cells.MaxRow();
            let mincolumn = cells.MinColumn();
            let maxcolumn = cells.MaxColumn();
            for (let i = minrow; i <= maxrow; i++) {
                for (let j = mincolumn; j <= maxcolumn; j++) {
                    if (i < 2) {
                        return;
                    }
                    let scell = this.GetCellByIndex(i - step, j);
                    let tcell = this.GetCellByIndex(i, j);
                    if (tcell.ReadOnly == CheckState.Check) {
                        continue;
                    }
                    this.Swap(scell, tcell);
                }
            }
        }
    }
    CellMoveDown(cells, step) {
        if (cells != null) {
            let minrow = cells.MinRow();
            let maxrow = cells.MaxRow();
            let mincolumn = cells.MinColumn();
            let maxcolumn = cells.MaxColumn();
            for (let i = maxrow; i >= minrow; i--) {
                for (let j = mincolumn; j <= maxcolumn; j++) {
                    let scell = this.GetCellByIndex(i + step, j);
                    let tcell = this.GetCellByIndex(i, j);
                    if (tcell.ReadOnly == CheckState.Check) {
                        continue;
                    }
                    this.Swap(scell, tcell);
                }
            }
        }
    }
    CellMoveLeft(cells, step) {
        if (cells != null) {
            let minrow = cells.MinRow();
            let maxrow = cells.MaxRow();
            let mincolumn = cells.MinColumn();
            let maxcolumn = cells.MaxColumn();
            for (let i = minrow; i <= maxrow; i++) {
                for (let j = mincolumn; j <= maxcolumn; j++) {
                    if (j < 2) {
                        return;
                    }
                    let scell = this.GetCellByIndex(i, j - step);
                    let tcell = this.GetCellByIndex(i, j);
                    if (tcell.ReadOnly == CheckState.Check) {
                        continue;
                    }
                    this.Swap(scell, tcell);
                }
            }
        }
    }
    CellMoveRight(cells, step) {
        if (cells != null) {
            let minrow = cells.MinRow();
            let maxrow = cells.MaxRow();
            let mincolumn = cells.MinColumn();
            let maxcolumn = cells.MaxColumn();
            for (let i = minrow; i <= maxrow; i++) {
                for (let j = maxcolumn; j >= mincolumn; j--) {
                    let scell = this.GetCellByIndex(i, j + step);
                    let tcell = this.GetCellByIndex(i, j);
                    if (tcell.ReadOnly == CheckState.Check) {
                        continue;
                    }
                    this.Swap(scell, tcell);
                }
            }
        }
    }
    Swap(cell1, cell2) {
        let column1 = cell1.Column;
        let column2 = cell2.Column;
        let row1 = cell1.Row;
        let row2 = cell2.Row;
        cell1.Row.Cells.Remove(cell1.Column);
        cell2.Row.Cells.Remove(cell2.Column);
        cell1.Column = column2;
        cell2.Column = column1;
        cell1.Row = row2;
        cell2.Row = row1;
        row1.Cells.Add(cell2);
        row2.Cells.Add(cell1);
    }
}
class DataExcelBackCell {
    constructor() {
        this._Released = false;
        this._begincell = null;
        this._endcell = null;
        this._left = 0;
        this._top = 0;
        this._width = 0;
        this._height = 0;
        this._VisableWidth = 0;
        this._VisableHeight = 0;
        this._VisableLeft = 0;
        this._VisableTop = 0;
        this._BackImage = "";
        this._BackImageImageLayout = ImageLayout.ZoomClip;
        this.ondrawbacktimes = 0;
    }
    get Row() {
        return this._begincell.Row;
    }
    set Row(cell) {
        this.Grid = cell.Grid;
        this._begincell.Row = cell;
    }
    get Column() {
        return this._begincell.Column;
    }
    set Column(cell) {
        this._begincell.Column = cell;
    }
    get Released() {
        return this._Released;
    }
    set Released(value) {
        this._Released = value;
    }
    get BeginCell() {
        return this._begincell;
    }
    set BeginCell(cell) {
        this.Grid = cell.Grid;
        this._begincell = cell;
    }
    get EndCell() {
        return this._endcell;
    }
    set EndCell(cell) {
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
    MaxRowIndex() {
        return this.EndCell.Row.Index;
    }
    MaxColumnIndex() {
        return this.EndCell.Column.Index;
    }
    get Visible() {
        return this._begincell.Visible;
    }
    set Visible(value) {
        this._begincell.Visible = value;
    }
    GetData() {
        let data = {
            begincellrowindex: this.BeginCell.Row.Index,
            begincellcolumnindex: this.BeginCell.Column.Index,
            endcellrowindex: this.EndCell.Row.Index,
            endcellcolumnindex: this.EndCell.Column.Index,
        };
        return data;
    }
    SetData(grid, data) {
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
    freshVisablePointTop(rindex, findex) {
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
    freshVisablePointLeft(cindex, findex) {
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
    freshVisableSize(rmin, cmin, rmax, cmax) {
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
    get Left() {
        return this._left;
    }
    get Top() {
        return this._top;
    }
    get Width() {
        return this._width;
    }
    get Height() {
        return this._height;
    }
    set Left(value) {
        this._left = value;
    }
    set Top(value) {
        this._top = value;
    }
    set Width(value) {
        this._width = value;
    }
    set Height(value) {
        this._height = value;
    }
    get Rect() {
        let rect = new Rect(0, 0, 0, 0);
        rect.X = this.Left;
        rect.Y = this.Top;
        rect.Width = this.Width;
        rect.Height = this.Height;
        return rect;
    }
    get VisableWidth() {
        return this._VisableWidth;
    }
    set VisableWidth(value) {
        this._VisableWidth = value;
    }
    get VisableHeight() {
        return this._VisableHeight;
    }
    set VisableHeight(value) {
        this._VisableHeight = value;
    }
    get VisableLeft() {
        return this._VisableLeft;
    }
    set VisableLeft(value) {
        this._VisableLeft = value;
    }
    get VisableTop() {
        return this._VisableTop;
    }
    set VisableTop(value) {
        this._VisableTop = value;
    }
    get BackColor() {
        return this._BackColor;
    }
    set BackColor(value) {
        this._BackColor = value;
    }
    get BackImage() {
        return this._BackImage;
    }
    set BackImage(value) {
        this._BackImage = value;
    }
    get BackImageImageLayout() {
        return this._BackImageImageLayout;
    }
    set BackImageImageLayout(value) {
        this._BackImageImageLayout = value;
    }
    OnDrawBack(sender, g) {
        if (this.ondrawbacktimes >= g.drawTimes) {
            return;
        }
        this.ondrawbacktimes = g.drawTimes;
        if (!this.Visible)
            return;
        if (this.Grid == null)
            console.log("this.Grid == null");
        if (this.BackColor != null) {
            g.FillRect(this.BackColor, this.VisableLeft, this.VisableTop, this.VisableWidth, this.VisableHeight);
        }
        if (!ConvertHelper.StringIsNullOrEmpty(this.BackImage)) {
            g.FillRectangleImage(this.BackImage, this.Rect, this.BackImageImageLayout, null, 1);
        }
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
                    cell.OwnBackCell = this;
                }
            }
        }
    }
}
class DataExcelBackCellList extends List {
    constructor() {
        super();
    }
    Clear() {
        this.clear();
    }
    Remove(column) {
        this.remove(column);
    }
    Get(index) {
        return this.get(index);
    }
    GetByColumnIndex(index) {
        var count = this.Count;
        for (var i = 0; i < count; i++) {
            var cell = this.Get(i);
            if (cell.Column.Index == index) {
                return cell;
            }
        }
        return null;
    }
    Refresh() {
        for (var i in this) {
            let cell = this[i];
            cell.Refresh();
        }
    }
}
class DataExcelCell {
    constructor() {
        this._OwnMergeCell = null;
        this._OwnBackCell = null;
        this.ShowFocusedSelectBorder = true;
        this.EditMode = 14 /* EditMode.Default */;
        this._ReadOnly = CheckState.Unkown;
        this._BackImage = "";
        this._BackImageImageLayout = ImageLayout.ZoomClip;
        this._Visible = true;
        this._AutoMultiline = true;
        this._VerticalAlignment = StringAlignment.Near;
        this._HorizontalAlignment = StringAlignment.Near;
        this._OwnEditControl = null;
        this.ondrawtimes2 = 0;
        this._Style = {};
    }
    get Row() {
        return this._Row;
    }
    set Row(value) {
        this._Row = value;
    }
    get Column() {
        return this._Column;
    }
    set Column(value) {
        this._Column = value;
    }
    get OwnMergeCell() {
        if (this._OwnMergeCell != null) {
            if (this._OwnMergeCell.Released) {
                this._OwnMergeCell = null;
            }
        }
        return this._OwnMergeCell;
    }
    set OwnMergeCell(value) {
        this._OwnMergeCell = value;
    }
    get OwnBackCell() {
        if (this._OwnBackCell != null) {
            if (this._OwnBackCell.Released) {
                this._OwnBackCell = null;
            }
        }
        return this._OwnBackCell;
    }
    set OwnBackCell(value) {
        this._OwnBackCell = value;
    }
    MaxRowIndex() {
        if (this.OwnMergeCell != null) {
            return this.OwnMergeCell.MaxRowIndex();
        }
        return this.Row.Index;
    }
    MaxColumnIndex() {
        if (this.OwnMergeCell != null) {
            return this.OwnMergeCell.MaxColumnIndex();
        }
        return this.Column.Index;
    }
    get ReadOnly() {
        try {
            if (this.Column == null) {
                DataExcelConsole.log("ReadOnly", this.Column);
            }
            if (this._ReadOnly == CheckState.Unkown) {
                if (this.Column.Index > 1)
                    return this.Column.ReadOnly;
                return this.Row.ReadOnly;
            }
            return this._ReadOnly;
        }
        catch (e) {
            DataExcelConsole.log("ReadOnly", e);
        }
    }
    set ReadOnly(value) {
        this._ReadOnly = value;
    }
    get Style() {
        return this._Style;
    }
    set Style(value) {
        this._Style = value;
    }
    get Font() {
        if (this._font == null) {
            if (this.Column.Index > 1)
                return this.Column.Font;
            return this.Row.Font;
        }
        return this._font;
    }
    set Font(value) {
        this._font = value;
    }
    get ForeColor() {
        if (this._ForeColor == null) {
            return this.Grid.ForeColor;
        }
        return this._ForeColor;
    }
    set ForeColor(value) {
        this._ForeColor = value;
    }
    get BackColor() {
        //if (this._BackColor == null)
        //{
        //    return this.Grid.BackColor;
        //}
        return this._BackColor;
    }
    set BackColor(value) {
        this._BackColor = value;
    }
    get BackImage() {
        return this._BackImage;
    }
    set BackImage(value) {
        this._BackImage = value;
    }
    get BackImageImageLayout() {
        return this._BackImageImageLayout;
    }
    set BackImageImageLayout(value) {
        this._BackImageImageLayout = value;
    }
    get Format() {
        return this._Format;
    }
    set Format(value) {
        this._Format = value;
    }
    get FormatType() {
        return this._FormatType;
    }
    set FormatType(value) {
        this._FormatType = value;
    }
    get ID() {
        return this._id;
    }
    set ID(value) {
        if (ConvertHelper.StringIsNullOrEmpty(value)) {
            this.Grid.IDCells.Remove(this._id);
            this._id = "";
            return;
        }
        if (!ConvertHelper.StringIsNullOrEmpty(this._id)) {
            this.Grid.IDCells.Remove(this._id);
        }
        this._id = value;
        this.Grid.IDCells.set(this._id, this);
    }
    get Visible() {
        return this._Visible;
    }
    set Visible(value) {
        this._Visible = value;
    }
    get Text() {
        return this._Text;
    }
    set Text(value) {
        this._Text = value;
    }
    get Value() {
        return this._Value;
    }
    set Value(value) {
        this._Value = value;
    }
    get AutoMultiline() {
        return this._AutoMultiline;
    }
    set AutoMultiline(value) {
        this._AutoMultiline = value;
    }
    get LeftLineStyle() {
        return this._LeftLineStyle;
    }
    set LeftLineStyle(value) {
        this._LeftLineStyle = value;
    }
    get TopLineStyle() {
        return this._TopLineStyle;
    }
    set TopLineStyle(value) {
        this._TopLineStyle = value;
    }
    get RightLineStyle() {
        return this._RightLineStyle;
    }
    set RightLineStyle(value) {
        this._RightLineStyle = value;
    }
    get BottomLineStyle() {
        return this._BottomLineStyle;
    }
    set BottomLineStyle(value) {
        this._BottomLineStyle = value;
    }
    get VerticalAlignment() {
        return this._VerticalAlignment;
    }
    set VerticalAlignment(value) {
        this._VerticalAlignment = value;
    }
    get HorizontalAlignment() {
        return this._HorizontalAlignment;
    }
    set HorizontalAlignment(value) {
        this._HorizontalAlignment = value;
    }
    get OwnEditControl() {
        if (this._OwnEditControl != null) {
            return this._OwnEditControl;
        }
        if (this.Row != null) {
            if (this.Row.DefaultCellEdit != null) {
                return this.Row.DefaultCellEdit;
            }
        }
        if (this.Column != null) {
            if (this.Column.DefaultCellEdit != null) {
                return this.Column.DefaultCellEdit;
            }
        }
        return this._OwnEditControl;
    }
    set OwnEditControl(value) {
        this._OwnEditControl = value;
    }
    get Left() {
        return this.Column.Left;
    }
    get Top() {
        return this.Row.Top;
    }
    get Width() {
        return this.Column.Width;
    }
    get Height() {
        return this.Row.Height;
    }
    get Right() {
        return this.Left + this.Width;
    }
    get Bottom() {
        return this.Top + this.Height;
    }
    get Rect() {
        let rect = new Rect(0, 0, 0, 0);
        rect.X = this.Left;
        rect.Y = this.Top;
        rect.Width = this.Width;
        rect.Height = this.Height;
        return rect;
    }
    GetData() {
        let data = {};
        try {
            let emptycell = new DataExcelCell();
            data.rowindex = this.Row.Index;
            data.columnindex = this.Column.Index;
            if (emptycell.Text != this.Text) {
                data.text = this.Text;
            }
            if (emptycell.Value != this.Value) {
                data.value = this.Value;
            }
            if (emptycell.AutoMultiline != this.AutoMultiline) {
                data.automultiline = this.AutoMultiline;
            }
            if (emptycell.BackColor != this.BackColor) {
                data.backcolor = this.BackColor;
            }
            if (emptycell.BackImage != this.BackImage) {
                data.backimage = this.BackImage;
            }
            if (emptycell.BackImageImageLayout != this.BackImageImageLayout) {
                data.backimageimagelayout = this.BackImageImageLayout;
            }
            if (emptycell.BottomLineStyle != this.BottomLineStyle) {
                data.bottomlinestyle = this.BottomLineStyle;
            }
            if (emptycell._font != this._font) {
                data.font = this._font;
            }
            if (emptycell._ForeColor != this._ForeColor) {
                data.forecolor = this._ForeColor;
            }
            if (emptycell.Format != this.Format) {
                data.format = this.Format;
            }
            if (emptycell.FormatType != this.FormatType) {
                data.formattype = this.FormatType;
            }
            if (emptycell.HorizontalAlignment != this.HorizontalAlignment) {
                data.horizontalalignment = this.HorizontalAlignment;
            }
            if (emptycell.ID != this.ID) {
                data.id = this.ID;
            }
            if (emptycell.LeftLineStyle != this.LeftLineStyle) {
                data.leftlinestyle = this.LeftLineStyle;
            }
            if (emptycell._ReadOnly != this.ReadOnly) {
                data.readonly = this.ReadOnly;
            }
            if (emptycell.RightLineStyle != this.RightLineStyle) {
                data.rightlinestyle = this.RightLineStyle;
            }
            if (emptycell.ShowFocusedSelectBorder != this.ShowFocusedSelectBorder) {
                data.showfocusedselectborder = this.ShowFocusedSelectBorder;
            }
            if (emptycell.Style != this.Style) {
                data.style = this.Style;
            }
            if (emptycell.TopLineStyle != this.TopLineStyle) {
                data.toplinestyle = this.TopLineStyle;
            }
            if (emptycell.VerticalAlignment != this.VerticalAlignment) {
                data.verticalalignment = this.VerticalAlignment;
            }
            if (emptycell.Visible != this.Visible) {
                data.visible = this.Visible;
            }
        }
        catch (e) {
            DataExcelConsole.log("dataexcelcell GetData", e);
        }
        return data;
    }
    SetData(grid, data) {
        try {
            if (data.text != null) {
                this.Text = data.text;
            }
            if (data.value != null) {
                this.Value = data.value;
            }
            if (data.visible != null) {
                this.Visible = data.visible;
            }
            if (data.id != null) {
                this.ID = data.id;
            }
            if (data.columnindex != null) {
                let columnindex = data.columnindex;
                let column = grid.GetColumn(columnindex);
                this.Column = column;
            }
            if (data.automultiline != null) {
                this.AutoMultiline = data.automultiline;
            }
            if (data.backcolor != null) {
                this.BackColor = data.backcolor;
            }
            if (data.backimage != null) {
                this.BackImage = data.backimage;
            }
            if (data.backimageimagelayout != null) {
                this.BackImageImageLayout = data.backimageimagelayout;
            }
            if (data.bottomlinestyle != null) {
                this.BottomLineStyle = data.bottomlinestyle;
            }
            if (data.font != null) {
                this.Font = data.font;
            }
            if (data.forecolor != null) {
                this.ForeColor = data.forecolor;
            }
            if (data.format != null) {
                this.Format = data.format;
            }
            if (data.formattype != null) {
                this.FormatType = data.formattype;
            }
            if (data.horizontalalignment != null) {
                this.HorizontalAlignment = data.horizontalalignment;
            }
            if (data.id != null) {
                this.ID = data.id;
            }
            if (data.leftlinestyle != null) {
                this.LeftLineStyle = data.leftlinestyle;
            }
            if (data.readonly != null) {
                this.ReadOnly = data.readonly;
            }
            if (data.rightlinestyle != null) {
                this.RightLineStyle = data.rightlinestyle;
            }
            if (data.showfocusedselectborder != null) {
                this.ShowFocusedSelectBorder = data.showfocusedselectborder;
            }
            if (data.style != null) {
                this.Style = data.style;
            }
            if (data.toplinestyle != null) {
                this.TopLineStyle = data.toplinestyle;
            }
            if (data.verticalalignment != null) {
                this.VerticalAlignment = data.verticalalignment;
            }
            if (data.visible != null) {
                this.Visible = data.visible;
            }
            this.OwnEditControl = DefaultEdit.GetDefauleEdit(this);
        }
        catch (e) {
            DataExcelConsole.log("dataexcelcell SetData", e);
        }
    }
    OnDraw(sender, g) {
        if (this.ondrawtimes2 >= g.drawTimes) {
            return;
        }
        if (!this.Visible)
            return;
        this.ondrawtimes2 = g.drawTimes;
        if (this.Grid == null)
            console.log("this.Grid == null");
        if (this.OwnEditControl != null) {
            try {
                let res = this.OwnEditControl.OnDraw(sender, g);
                if (res)
                    return;
            }
            catch (e) {
                DataExcelConsole.log("OwnEditControl", e);
            }
        }
        if (this.OwnMergeCell != null) {
            try {
                this.OwnMergeCell.OnDraw(sender, g);
            }
            catch (e) {
                DataExcelConsole.log("OwnMergeCell", e);
            }
            return;
        }
        this.DrawText(sender, g);
    }
    DrawText(sender, g) {
        //g.FillRect(this.ForeColor, this.Left, this.Top, this.Column.Width, this.Row.Height);
        var text = ""; // this.Row.Index + "" + this.Column.Index;
        if (this.Text != null) {
            text = this.Text;
        }
        if (!ConvertHelper.StringIsNullOrEmpty(this.Format)) {
            text = ConvertHelper.GetFromatString(this.Value, this.Format, this.FormatType);
        }
        let style = {};
        style = Object.assign({}, this.Style);
        ;
        style.text = text;
        style.font = this.Font;
        style.fill = this.ForeColor;
        style.overflow = '';
        if (this.AutoMultiline) {
            style.overflow = 'break';
        }
        if (style.align) {
        }
        if (this.AutoMultiline) {
            style.overflow = "break";
        }
        else {
            style.overflow = "";
        }
        if (!ConvertHelper.StringIsNullOrEmpty(text)) {
            g.DrawTextRectStyle2(text, this.Column.Left, this.Top, this.Width, this.Height, style);
        }
    }
    OnDrawBack(sender, g) {
        if (!this.Visible)
            return;
        if (this.Grid == null)
            console.log("this.Grid == null");
        if (this.OwnBackCell != null) {
            this.OwnBackCell.OnDrawBack(sender, g);
        }
        if (this.OwnMergeCell != null) {
            this.OwnMergeCell.OnDrawBack(sender, g);
            return;
        }
        if (this.OwnEditControl != null) {
            let res = this.OwnEditControl.OnDrawBack(sender, g);
            if (res)
                return;
        }
        if (this.BackColor != null) {
            g.FillRect(this.BackColor, this.Left, this.Top, this.Column.Width, this.Row.Height, 1, this.BackColor, 1);
        }
        if (!ConvertHelper.StringIsNullOrEmpty(this.BackImage)) {
            g.FillRectangleImage(this.BackImage, this.Rect, this.BackImageImageLayout, null, 1);
        }
    }
    Debug(e) {
        //if (this.Row.Index == 5 && this.Column.Index == 5)
        //{
        //    console.log(e);
        //}
    }
    OnDrawBorder(sender, g) {
        if (this.OwnMergeCell != null) {
            this.OwnMergeCell.OnDrawBorder(sender, g);
            return;
        }
        this.Debug(this);
        var left = this.Column.Left;
        var right = this.Column.Left + this.Column.Width;
        var top = this.Row.Top;
        var bottom = this.Row.Top + this.Row.Height;
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
    OnDrawGridLine(sender, g) {
        if (this.OwnMergeCell != null) {
            this.OwnMergeCell.OnDrawGridLine(sender, g);
            return;
        }
        this.Debug(this);
        var left = this.Column.Left;
        var right = this.Column.Left + this.Column.Width;
        var top = this.Row.Top;
        var bottom = this.Row.Top + this.Row.Height;
        if (this.RightLineStyle == null) {
            g.DrawLine(GridLineStyle.stroke, right, top, right, bottom);
        }
        if (this.BottomLineStyle == null) {
            g.DrawLine(GridLineStyle.stroke, left, bottom, right, bottom);
        }
    }
    OnMouseDown(sender, e, ve) {
        this.downtime = new Date();
        this.mousedownpoint = new Point();
        this.mousedownpoint.X = e.offsetX;
        this.mousedownpoint.Y = e.offsetY;
        if (this.OwnMergeCell != null) {
            return this.OwnMergeCell.OnMouseDown(sender, e, ve);
        }
        if (this.OwnEditControl != null) {
            let res = this.OwnEditControl.OnMouseDown(sender, e, ve);
            if (res) {
                return res;
            }
        }
        return false;
    }
    OnMouseUp(sender, e, ve) {
        if (this.OwnMergeCell != null) {
            return this.OwnMergeCell.OnMouseUp(sender, e, ve);
        }
        if (this.OwnEditControl != null) {
            let res = this.OwnEditControl.OnMouseUp(sender, e, ve);
            if (res)
                return;
        }
        let datetnow = new Date();
        let szie = 0;
        szie = Math.abs(e.offsetX - this.mousedownpoint.X);
        if (szie < 5) {
            szie = Math.abs(e.offsetY - this.mousedownpoint.Y);
            if (szie < 5) {
                let d = (datetnow.valueOf() - this.downtime.valueOf()) / 1000;
                if (d > 0.15 && d < 0.8) {
                    this.InitEdit();
                }
            }
        }
        return false;
    }
    OnMouseMove(sender, e, ve) {
        if (this.OwnMergeCell != null) {
            return this.OwnMergeCell.OnMouseMove(sender, e, ve);
        }
        if (this.OwnEditControl != null) {
            let res = this.OwnEditControl.OnMouseMove(sender, e, ve);
            if (res)
                return;
        }
        if (this.downtime != null) {
            let datetnow = new Date();
            let d = (datetnow.valueOf() - this.downtime.valueOf()) / 1000;
            if (d > 0.05 && d < 0.8) {
                ve.CurrentEvent = this;
            }
        }
        return false;
    }
    OnMouseDoubleClick(sender, e, ve) {
        if (this.OwnMergeCell != null) {
            return this.OwnMergeCell.OnMouseDoubleClick(sender, e, ve);
        }
        if (this.OwnEditControl != null) {
            let res = this.OwnEditControl.OnMouseDoubleClick(sender, e, ve);
            if (res)
                return;
        }
        this.InitEdit();
        return false;
    }
    OnKeyPress(sender, e, ve) {
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
    OnKeyDown(sender, e, ve) {
        if (this.OwnMergeCell != null) {
            return this.OwnMergeCell.OnKeyPress(sender, e, ve);
        }
        if (this.OwnEditControl != null) {
            let res = this.OwnEditControl.OnKeyPress(sender, e, ve);
            if (res)
                return;
        }
        DataExcelConsole.log("OnKeyDownInitEdit", e);
        if (e.srcElement == document.body) {
            let res = false;
            if (e.keyCode >= 48 && e.keyCode <= 57) {
                res = true;
            }
            else if (e.keyCode >= 65 && e.keyCode <= 90) {
                res = true;
            }
            else if (e.keyCode >= 96 && e.keyCode <= 107) {
                res = true;
            }
            else if (e.keyCode >= 186 && e.keyCode <= 192) {
                res = true;
            }
            else if (e.keyCode >= 219 && e.keyCode <= 222) {
                res = true;
            }
            else if (e.keyCode == 13) {
                res = true;
            }
            else if (e.keyCode == 109) {
                res = true;
            }
            else if (e.keyCode == 111) {
                res = true;
            }
            else if (e.keyCode == 110) {
                if (this.ReadOnly != CheckState.Check) {
                    this.Value = null;
                    this.Text = null;
                }
            }
            else if (e.keyCode == 46) {
                if (this.ReadOnly != CheckState.Check) {
                    this.Value = null;
                    this.Text = null;
                }
            }
            if (e.altKey) {
                res = false;
            }
            if (e.shiftKey) {
                res = false;
            }
            if (e.ctrlKey) {
                res = false;
            }
            if (res) {
                this.InitEdit();
            }
        }
        DataExcelConsole.log("OnKeyDownInitEdit", e);
        return false;
    }
    OnTouchStart(sender, e, ve) {
        if (this.OwnMergeCell != null) {
            return this.OwnMergeCell.OnTouchStart(sender, e, ve);
        }
        if (this.OwnEditControl != null) {
            let res = this.OwnEditControl.OnTouchStart(sender, e, ve);
            if (res) {
                return res;
            }
        }
        return false;
    }
    OnTouchMove(sender, e, ve) {
        if (this.OwnMergeCell != null) {
            return this.OwnMergeCell.OnTouchMove(sender, e, ve);
        }
        if (this.OwnEditControl != null) {
            let res = this.OwnEditControl.OnTouchMove(sender, e, ve);
            if (res) {
                return res;
            }
        }
        return false;
    }
    OnTouchEnd(sender, e, ve) {
        if (this.OwnMergeCell != null) {
            return this.OwnMergeCell.OnTouchEnd(sender, e, ve);
        }
        if (this.OwnEditControl != null) {
            let res = this.OwnEditControl.OnTouchEnd(sender, e, ve);
            if (res) {
                return res;
            }
        }
        return false;
    }
    ///init
    InitEdit(obj) {
        if (this.ReadOnly == CheckState.Check) {
            return false;
        }
        if (this.Grid.EditCell == this) {
            return false;
        }
        this.Grid.ClearSelect();
        this.Grid.SetSelectCells(this);
        this.Grid.SetFocusedCell(this);
        this.Grid.BeginReFresh();
        let editcontrol = null;
        this.Grid.RaiseCellInitEditEvent(this);
        editcontrol = this.OwnEditControl;
        if (this.OwnEditControl == null) {
            if (this.Row.DefaultCellEdit != null) {
                editcontrol = this.Row.DefaultCellEdit;
            }
            else if (this.Column.DefaultCellEdit != null) {
                editcontrol = this.Column.DefaultCellEdit;
            }
            else {
                editcontrol = this.Grid.DefaultEdit;
            }
            this.OwnEditControl = editcontrol;
        }
        if (editcontrol != null) {
            this.Grid.AddEdit(editcontrol);
            editcontrol.Cell = this;
            editcontrol.InitEdit();
            this.Grid.EditCell = this;
        }
        this.Grid.EndReFresh();
        return true;
    }
    EndEdit() {
        this.Grid.EditCell = null;
    }
    FormatDecimalsAdd() {
        let format = this.Format;
        let index = format.indexOf("0");
        if (index >= 0) {
            format = ConvertHelper.InsertString(format, index, "0");
        }
        else {
            if (format.startsWith("¥")) {
                format = format + "0";
            }
            else if (format.endsWith("%")) {
                format = "0" + format;
            }
            else {
                format = "0";
            }
        }
        this.Format = format;
    }
    FormatDecimalsIndent() {
        let format = this.Format;
        let index = format.indexOf("0");
        if (index >= 0) {
            format = ConvertHelper.DeleteString(format, index, 1);
        }
        this.Format = format;
    }
}
class DataExcelCellCollection extends Dictionary {
    constructor() {
        super();
    }
    Add(cell) {
        this.set(cell.Column, cell);
    }
    Clear() {
        this.clear();
    }
    Remove(column) {
        this.delete(column);
    }
    Count() {
        return this.size;
    }
    Get(column) {
        return this.get(column);
    }
}
class DataExcelCellList extends List {
    constructor() {
        super();
    }
}
class DataExcelColumn {
    constructor() {
        this.Index = 0;
        this.BackColor = null;
        this.DefaultCellEdit = null;
        this._ReadOnly = CheckState.Unkown;
        this.Visible = true;
        this.Left = 0;
        this.Top = 20;
        this.Width = 72;
        this.Index = 0;
    }
    get Height() {
        return this.Grid.Height;
    }
    get Font() {
        if (this._font == null) {
            return this.Grid.Font;
        }
        return this._font;
    }
    set Font(value) {
        this._font = value;
    }
    get Caption() {
        return this._Caption;
    }
    set Caption(value) {
        this._Caption = value;
    }
    get ReadOnly() {
        if (this._ReadOnly == CheckState.Unkown) {
            return this.Grid.ReadOnly;
        }
        return this._ReadOnly;
    }
    set ReadOnly(value) {
        this._ReadOnly = value;
    }
    get ID() {
        return this._ID;
    }
    set ID(value) {
        this._ID = value;
    }
    GetData() {
        let data = {
            index: this.Index,
            width: this.Width,
            caption: this.Caption,
            visible: this.Visible,
            id: this.ID,
        };
        return data;
    }
    SetData(grid, data) {
        this.Index = data.index;
        this.Width = data.width;
        this.Caption = data.caption;
        this.Visible = data.visible;
        this.ID = data.id;
    }
    get Name() {
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
    H() {
        return this.Grid.Height;
    }
    OnDraw(sender, g) {
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
    get Rect() {
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
}
class DataExcelColumnCollection extends Dictionary {
    constructor() {
        super();
    }
    get Max() {
        return this._Max;
    }
    set Max(value) {
        this._Max = value;
    }
    Add(index, row) {
        this.set(index, row);
        if (index > this.Max) {
            this.Max = index;
        }
    }
    Get(index) {
        if (this.has(index)) {
            return this.get(index);
        }
        return null;
    }
    Clear() {
        this.Max = 1;
        this.clear();
    }
    Delete(index) {
        if (this.has(index)) {
            this.Max = this.Max - 1;
            return this.delete(index);
        }
        return false;
    }
}
class DataExcelColumnList extends List {
    constructor() {
        super();
    }
    Clear() {
        this.clear();
    }
    Remove(column) {
        this.remove(column);
    }
    Get(index) {
        return this.get(index);
    }
}
class DataExcelMergeCell extends DataExcelCell {
    constructor() {
        super();
        this._Released = false;
        this._begincell = null;
        this._endcell = null;
        this._left = 0;
        this._top = 0;
        this._width = 0;
        this._height = 0;
        this._VisableWidth = 0;
        this._VisableHeight = 0;
        this._VisableLeft = 0;
        this._VisableTop = 0;
        this.ondrawtimes = 0;
        this.ondrawbacktimes = 0;
        this.ondrawbordertimes = 0;
        this.ondrawgridlinetimes = 0;
    }
    get Row() {
        return this._begincell.Row;
    }
    set Row(cell) {
        this.Grid = cell.Grid;
        this._begincell.Row = cell;
    }
    get Column() {
        return this._begincell.Column;
    }
    set Column(cell) {
        this._begincell.Column = cell;
    }
    get Released() {
        return this._Released;
    }
    set Released(value) {
        this._Released = value;
    }
    get BeginCell() {
        return this._begincell;
    }
    set BeginCell(cell) {
        this.Grid = cell.Grid;
        this._begincell = cell;
    }
    get EndCell() {
        return this._endcell;
    }
    set EndCell(cell) {
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
    MaxRowIndex() {
        return this.EndCell.Row.Index;
    }
    MaxColumnIndex() {
        return this.EndCell.Column.Index;
    }
    get Visible() {
        return this._begincell.Visible;
    }
    set Visible(value) {
        this._begincell.Visible = value;
    }
    get Text() {
        return this._begincell.Text;
    }
    set Text(value) {
        this._begincell.Text = value;
    }
    get Value() {
        return this._begincell.Value;
    }
    set Value(value) {
        this._begincell.Value = value;
    }
    get AutoMultiline() {
        return this._begincell.AutoMultiline;
    }
    set AutoMultiline(value) {
        this._begincell.AutoMultiline = value;
    }
    get LeftLineStyle() {
        return this.BeginCell.LeftLineStyle;
    }
    set LeftLineStyle(value) {
        this.BeginCell.LeftLineStyle = value;
    }
    get TopLineStyle() {
        return this.BeginCell.TopLineStyle;
    }
    set TopLineStyle(value) {
        this.BeginCell.TopLineStyle = value;
    }
    get RightLineStyle() {
        return this.BeginCell.RightLineStyle;
    }
    set RightLineStyle(value) {
        this.BeginCell.RightLineStyle = value;
    }
    get BottomLineStyle() {
        return this.BeginCell.BottomLineStyle;
    }
    set BottomLineStyle(value) {
        this.BeginCell.BottomLineStyle = value;
    }
    get VerticalAlignment() {
        return this._begincell.VerticalAlignment;
    }
    set VerticalAlignment(value) {
        this._begincell.VerticalAlignment = value;
    }
    get HorizontalAlignment() {
        return this._begincell.HorizontalAlignment;
    }
    set HorizontalAlignment(value) {
        this._begincell.HorizontalAlignment = value;
    }
    GetData() {
        let data = {
            begincellrowindex: this.BeginCell.Row.Index,
            begincellcolumnindex: this.BeginCell.Column.Index,
            endcellrowindex: this.EndCell.Row.Index,
            endcellcolumnindex: this.EndCell.Column.Index,
        };
        return data;
    }
    SetData(grid, data) {
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
    freshVisablePointTop(rindex, findex) {
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
    freshVisablePointLeft(cindex, findex) {
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
    freshVisableSize(rmin, cmin, rmax, cmax) {
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
    get OwnEditControl() {
        return this.BeginCell.OwnEditControl;
    }
    set OwnEditControl(value) {
        this.BeginCell.OwnEditControl = value;
    }
    get Left() {
        return this._left;
    }
    get Top() {
        return this._top;
    }
    get Width() {
        return this._width;
    }
    get Height() {
        return this._height;
    }
    set Left(value) {
        this._left = value;
    }
    set Top(value) {
        this._top = value;
    }
    set Width(value) {
        this._width = value;
    }
    set Height(value) {
        this._height = value;
    }
    get VisableWidth() {
        return this._VisableWidth;
    }
    set VisableWidth(value) {
        this._VisableWidth = value;
    }
    get VisableHeight() {
        return this._VisableHeight;
    }
    set VisableHeight(value) {
        this._VisableHeight = value;
    }
    get VisableLeft() {
        return this._VisableLeft;
    }
    set VisableLeft(value) {
        this._VisableLeft = value;
    }
    get VisableTop() {
        return this._VisableTop;
    }
    set VisableTop(value) {
        this._VisableTop = value;
    }
    get Style() {
        return this.BeginCell.Style;
    }
    set Style(value) {
        this.BeginCell.Style = value;
    }
    get Font() {
        return this.BeginCell.Font;
    }
    set Font(value) {
        this.BeginCell.Font = value;
    }
    get ForeColor() {
        return this.BeginCell.ForeColor;
    }
    set ForeColor(value) {
        this.BeginCell.ForeColor = value;
    }
    get BackColor() {
        return this.BeginCell.BackColor;
    }
    set BackColor(value) {
        this.BeginCell.BackColor = value;
    }
    get Format() {
        return this.BeginCell.Format;
    }
    set Format(value) {
        this.BeginCell.Format = value;
    }
    get FormatType() {
        return this.BeginCell.FormatType;
    }
    set FormatType(value) {
        this.BeginCell.FormatType = value;
    }
    get BackImage() {
        return this.BeginCell.BackImage;
    }
    set BackImage(value) {
        this.BeginCell.BackImage = value;
    }
    get BackImageImageLayout() {
        return this.BeginCell.BackImageImageLayout;
    }
    set BackImageImageLayout(value) {
        this.BeginCell.BackImageImageLayout = value;
    }
    OnDraw(sender, g) {
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
        var text = ""; // this.Row.Index + "" + this.Column.Index;
        if (this.Text != null) {
            text = this.Text;
        }
        if (!ConvertHelper.StringIsNullOrEmpty(this.Format)) {
            text = ConvertHelper.GetFromatString(this.Value, this.Format, this.FormatType);
        }
        let style = {};
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
    OnDrawBack(sender, g) {
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
    OnDrawBorder(sender, g) {
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
    OnDrawGridLine(sender, g) {
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
    OnInput(e) {
        let cell = this["cell"];
        cell.Text = this["value"];
        cell.Grid.graphic.Clear();
        cell.Grid.RePaint(e);
    }
    OnChange(e) {
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
class DataExcelMergeCellList extends List {
    constructor() {
        super();
    }
    Clear() {
        this.clear();
    }
    Remove(column) {
        this.remove(column);
    }
    Get(index) {
        return this.get(index);
    }
    GetByColumnIndex(index) {
        var count = this.Count;
        for (var i = 0; i < count; i++) {
            var cell = this.Get(i);
            if (cell.Column.Index == index) {
                return cell;
            }
        }
        return null;
    }
    Refresh() {
        for (var i in this) {
            let cell = this[i];
            cell.Refresh();
        }
    }
}
class DataExcelRow {
    constructor() {
        this.Height = 20;
        this.ForeColor = "#00887733";
        this.SelectBackColor = "#00337733";
        this.BackColor = null;
        this.DefaultCellEdit = null;
        this._ReadOnly = CheckState.Unkown;
        this.Visible = true;
        this.Left = 0;
        this.Top = 0;
        this.Width = 0;
        this.Height = DataExcelDefaultValue.dafaultRowHeight;
        this.Cells = new DataExcelCellCollection();
    }
    get Font() {
        if (this._font == null) {
            return this.Grid.Font;
        }
        return this._font;
    }
    set Font(value) {
        this._font = value;
    }
    get CellSelect() {
        if (this.Grid == null)
            return false;
        if (this.Grid.SelectCells == null)
            return false;
        let max = this.Grid.SelectCells.MaxRow();
        let min = this.Grid.SelectCells.MinRow();
        return (this.Index >= min && this.Index <= max);
    }
    get ID() {
        return this._ID;
    }
    set ID(value) {
        this._ID = value;
    }
    get ReadOnly() {
        if (this._ReadOnly == CheckState.Unkown) {
            return this.Grid.ReadOnly;
        }
        return this._ReadOnly;
    }
    set ReadOnly(value) {
        this._ReadOnly = value;
    }
    GetData() {
        let data = {
            index: this.Index,
            height: this.Height,
            visible: this.Visible,
            id: this.ID,
            cells: []
        };
        this.Cells.forEach((cell) => {
            data.cells.push(cell.GetData());
        });
        return data;
    }
    SetData(grid, data) {
        this.Index = data.index;
        this.Height = data.height;
        this.Visible = data.visible;
        this.ID = data.id;
        let len = data.cells.length;
        for (let i = 0; i < len; i++) {
            let celldata = data.cells[i];
            let cell = new DataExcelCell();
            cell.Grid = grid;
            cell.Row = this;
            cell.SetData(grid, celldata);
            this.Cells.Add(cell);
        }
    }
    get Name() {
        return this.Index + "";
    }
    OnDraw(sender, g) {
        try {
            if (this.Grid == null)
                console.log("this.Grid == null");
            if (!this.Visible)
                return;
            if (this.Selected) {
                g.FillRectangle(this.FullRowSelectedColor, this.Left, this.Top, this.Grid.Width, this.Height);
            }
            else {
                if (this.BackColor != null) {
                    g.FillRectangle(this.BackColor, this.Left, this.Top, this.Grid.Width, this.Height);
                }
            }
            var length = this.Grid.AllVisibleColumns.Count;
            for (var i = 0; i < length; i++) {
                var column = this.Grid.AllVisibleColumns.Get(i);
                var cell = this.Cells.Get(column);
                if (cell == null) {
                    cell = this.Grid.NewCell(this, column);
                }
                if (cell != null) {
                    cell.OnDraw(sender, g);
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    OnDrawBack(sender, g) {
        if (this.Grid == null)
            console.log("this.Grid == null");
        var length = this.Grid.AllVisibleColumns.Count;
        for (var i = 0; i < length; i++) {
            try {
                var column = this.Grid.AllVisibleColumns.Get(i);
                var cell = this.Cells.Get(column);
                if (cell == null) {
                    cell = this.Grid.NewCell(this, column);
                }
                if (cell != null) {
                    cell.OnDrawBack(sender, g);
                }
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    get Rect() {
        let rect = new Rect(0, 0, 0, 0);
        rect.X = this.Left;
        rect.Y = this.Top;
        rect.Width = this.Grid.Width;
        rect.Height = this.Height;
        return rect;
    }
}
class DataExcelRowCollection extends Dictionary {
    constructor() {
        super();
    }
    get Max() {
        return this._Max;
    }
    set Max(value) {
        this._Max = value;
    }
    Add(index, row) {
        this.set(index, row);
        if (index > this.Max) {
            this.Max = index;
        }
    }
    Get(index) {
        if (this.has(index)) {
            return this.get(index);
        }
        return null;
    }
    Clear() {
        this.Max = 1;
        this.clear();
    }
    Delete(index) {
        if (this.has(index)) {
            this.Max = this.Max - 1;
            return this.delete(index);
        }
        return false;
    }
}
class DataExcelRowList extends List {
    constructor() {
        super();
    }
    Clear() {
        this.clear();
    }
    Remove(row) {
        this.remove(row);
    }
    Get(index) {
        return this.get(index);
    }
}
class SelectAddRectCollection {
    constructor(grid) {
        this._SelectCellCollection = null;
        this._left = 0;
        this._top = 0;
        this._width = 0;
        this._height = 0;
        this.Orientation = true;
        this.Grid = grid;
    }
    get SelectCellCollection() {
        return this._SelectCellCollection;
    }
    set SelectCellCollection(value) {
        this._SelectCellCollection = value;
        this._endcell = null;
        this.Left = this._SelectCellCollection.Left;
        this.Top = this._SelectCellCollection.Top;
        this.Width = this._SelectCellCollection.Width;
        this.Height = this._SelectCellCollection.Height;
    }
    get Left() {
        return this._left;
    }
    get Top() {
        return this._top;
    }
    get Width() {
        return this._width;
    }
    get Height() {
        return this._height;
    }
    set Left(value) {
        this._left = value;
    }
    set Top(value) {
        this._top = value;
    }
    set Width(value) {
        this._width = value;
    }
    set Height(value) {
        this._height = value;
    }
    GetAllCells() {
        return this.GetCellList();
    }
    GetCellList() {
        let list = new List();
        let begincell = this._begincell;
        let endcell = this._endcell;
        let rmin = Math.min(begincell.Row.Index, endcell.Row.Index);
        let cmin = Math.min(begincell.Column.Index, endcell.Column.Index);
        let rmax = Math.max(begincell.Row.Index, endcell.Row.Index);
        let cmax = Math.max(begincell.Column.Index, endcell.Column.Index);
        for (var i = rmin; i <= rmax; i++) {
            for (var j = cmin; j <= cmax; j++) {
                let cell = this.Grid.GetCellByIndex(i, j);
                list.add(cell);
            }
        }
        return list;
    }
    get BeginCell() {
        return this._begincell;
    }
    set BeginCell(value) {
        this._begincell = value;
    }
    get EndCell() {
        if (this._endcell == null) {
            return this._begincell;
        }
        return this._endcell;
    }
    set EndCell(value) {
        this._endcell = value;
        this.SetEndCell(value);
    }
    SetEndCell(value) {
        try {
            this.SetEndCell2(value);
            let cell = value;
            this._endcell = cell;
            this.SetSize();
        }
        catch (ex) {
        }
    }
    SetEndCell2(cell) {
        this._endcell = cell;
        let pt = cell.Rect.Location;
        if (this.SelectCellCollection.Left < pt.X && this.SelectCellCollection.Right > pt.X) {
            this.Orientation = true;
        }
        else if (this.SelectCellCollection.Top < pt.Y && this.SelectCellCollection.Bottom > pt.Y) {
            this.Orientation = false;
        }
        else {
            if ((Math.abs(this.SelectCellCollection.Right - pt.X) >
                Math.abs(this.SelectCellCollection.Bottom - pt.Y))) {
                this.Orientation = false;
            }
            else {
                this.Orientation = true;
            }
        }
    }
    SetSize() {
        let bounds = new Rect(0, 0, 0, 0);
        let maxrowindex = 0;
        //Math.Max(this.SelectCellCollection.MaxCell.Row.Index, this.EndCell.Row.Index);
        let maxcolumnindex = 0;
        //Math.Max(this.SelectCellCollection.MaxCell.Column.Index, this.EndCell.Column.Index);
        let minrowindex = 0;
        //Math.Min(this.SelectCellCollection.MinCell.Row.Index,            this.EndCell.Row.Index);
        let mincolumnindex = 0;
        //Math.Min(this.SelectCellCollection.MinCell.Column.Index,            this.EndCell.Column.Index);
        if (this.Orientation) {
            //if (this.EndCell.Row.Index > this.SelectCellCollection.MaxCell.Row.Index)
            if (this.EndCell.Row.Index > this.SelectCellCollection.MaxRow()) {
                mincolumnindex = this.SelectCellCollection.MinColumn();
                maxcolumnindex = this.SelectCellCollection.MaxColumn();
                minrowindex = this.SelectCellCollection.MinRow();
                maxrowindex = this.EndCell.Row.Index;
            }
            else if (this.EndCell.Row.Index < this.SelectCellCollection.MinRow()) {
                mincolumnindex = this.SelectCellCollection.MinColumn();
                maxcolumnindex = this.SelectCellCollection.MaxColumn();
                minrowindex = this.SelectCellCollection.MaxRow();
                maxrowindex = this.EndCell.Row.Index;
            }
        }
        else {
            if (this.EndCell.Column.Index > this.SelectCellCollection.MaxColumn()) {
                minrowindex = this.SelectCellCollection.MinRow();
                maxrowindex = this.SelectCellCollection.MaxRow();
                mincolumnindex = this.SelectCellCollection.MinColumn();
                maxcolumnindex = this.EndCell.Column.Index;
            }
            else if (this.EndCell.Column.Index < this.SelectCellCollection.MinColumn()) {
                minrowindex = this.SelectCellCollection.MinRow();
                maxrowindex = this.SelectCellCollection.MaxRow();
                mincolumnindex = this.SelectCellCollection.MaxColumn();
                maxcolumnindex = this.EndCell.Column.Index;
            }
        }
        let endcell = this.Grid.GetCellByIndex(maxrowindex, maxcolumnindex);
        let begincell = this.Grid.GetCellByIndex(minrowindex, mincolumnindex);
        let rmin = Math.min(begincell.Row.Index, endcell.Row.Index);
        let cmin = Math.min(begincell.Column.Index, endcell.Column.Index);
        let rmax = Math.max(begincell.Row.Index, endcell.Row.Index);
        let cmax = Math.max(begincell.Column.Index, endcell.Column.Index);
        rmin = Math.max(rmin, this.Grid.FirstDisplayedRowIndex);
        cmin = Math.max(cmin, this.Grid.FirstDisplayedColumnIndex);
        rmax = Math.min(rmax, this.Grid.EndDisplayedRowIndex);
        cmax = Math.min(cmax, this.Grid.EndDisplayedColumnIndex);
        begincell = this.Grid.GetCellByIndex(rmin, cmin);
        endcell = this.Grid.GetCellByIndex(rmax, cmax);
        this.Top = begincell.Top;
        this.Left = begincell.Left;
        let width = 0;
        for (let i = begincell.Column.Index; i <= endcell.Column.Index; i++) {
            let column = this.Grid.Columns.Get(i);
            if (column == null) {
                continue;
            }
            if (!column.Visible) {
                continue;
            }
            if (column.Index < this.Grid.FirstDisplayedColumnIndex) {
                continue;
            }
            if (column.Index > this.Grid.EndDisplayedColumnIndex) {
                continue;
            }
            width = column.Width + width;
        }
        this.Width = width;
        let heigth = 0;
        for (let i = begincell.Row.Index; i <= endcell.Row.Index; i++) {
            let row = this.Grid.Rows.Get(i);
            if (row == null) {
                continue;
            }
            if (!row.Visible) {
                continue;
            }
            if (row.Index < this.Grid.FirstDisplayedRowIndex) {
                continue;
            }
            if (row.Index > this.Grid.EndDisplayedRowIndex) {
                continue;
            }
            heigth = row.Height + heigth;
        }
        this.Height = heigth;
    }
}
class SelectCellCollection {
    constructor() {
        this._left = 0;
        this._top = 0;
        this._width = 0;
        this._height = 0;
    }
    get Left() {
        return this._left;
    }
    get Top() {
        return this._top;
    }
    get Width() {
        return this._width;
    }
    get Height() {
        return this._height;
    }
    set Left(value) {
        this._left = value;
    }
    set Top(value) {
        this._top = value;
    }
    set Width(value) {
        this._width = value;
    }
    set Height(value) {
        this._height = value;
    }
    get Right() {
        return this.Left + this.Width;
    }
    get Bottom() {
        return this.Top + this.Height;
    }
    GetAllCells() {
        return this.GetCellList();
    }
    GetCellList() {
        let list = new List();
        let begincell = this._begincell;
        let endcell = this._endcell;
        let rmin = Math.min(begincell.Row.Index, endcell.Row.Index);
        let cmin = Math.min(begincell.Column.Index, endcell.Column.Index);
        let rmax = Math.max(begincell.Row.Index, endcell.Row.Index);
        let cmax = Math.max(begincell.Column.Index, endcell.Column.Index);
        for (var i = rmin; i <= rmax; i++) {
            for (var j = cmin; j <= cmax; j++) {
                let cell = this.Grid.GetCellByIndex(i, j);
                list.add(cell);
            }
        }
        return list;
    }
    get BeginCell() {
        return this._begincell;
    }
    set BeginCell(value) {
        this._begincell = value;
    }
    get EndCell() {
        if (this._endcell == null) {
            return this._begincell;
        }
        return this._endcell;
    }
    set EndCell(value) {
        this._endcell = value;
        /*        this.Refresh();  */
    }
    AddRectContains(pt) {
        let rect = new Rect(0, 0, 0, 0);
        rect.Width = 6;
        rect.Height = 6;
        rect.X = this.Right - 3;
        rect.Y = this.Bottom - 3;
        return rect.Contains(pt);
    }
    Refresh() {
        let begincell = this._begincell;
        let endcell = this._endcell;
        let rmin = Math.min(begincell.Row.Index, endcell.Row.Index);
        let cmin = Math.min(begincell.Column.Index, endcell.Column.Index);
        let rmax = Math.max(begincell.Row.Index, endcell.Row.Index);
        let cmax = Math.max(begincell.Column.Index, endcell.Column.Index);
        rmin = Math.max(rmin, this.Grid.FirstDisplayedRowIndex);
        cmin = Math.max(cmin, this.Grid.FirstDisplayedColumnIndex);
        rmax = Math.min(rmax, this.Grid.EndDisplayedRowIndex);
        cmax = Math.min(cmax, this.Grid.EndDisplayedColumnIndex);
        begincell = this.Grid.GetCellByIndex(rmin, cmin);
        endcell = this.Grid.GetCellByIndex(rmax, cmax);
        this.Top = begincell.Top;
        this.Left = begincell.Left;
        let width = 0;
        for (let i = begincell.Column.Index; i <= endcell.Column.Index; i++) {
            let column = this.Grid.Columns.Get(i);
            if (column == null) {
                continue;
            }
            if (!column.Visible) {
                continue;
            }
            if (column.Index < this.Grid.FirstDisplayedColumnIndex) {
                continue;
            }
            if (column.Index > this.Grid.EndDisplayedColumnIndex) {
                continue;
            }
            width = column.Width + width;
        }
        this.Width = width;
        let heigth = 0;
        for (let i = begincell.Row.Index; i <= endcell.Row.Index; i++) {
            let row = this.Grid.Rows.Get(i);
            if (row == null) {
                continue;
            }
            if (!row.Visible) {
                continue;
            }
            if (row.Index < this.Grid.FirstDisplayedRowIndex) {
                continue;
            }
            if (row.Index > this.Grid.EndDisplayedRowIndex) {
                continue;
            }
            heigth = row.Height + heigth;
        }
        this.Height = heigth;
    }
    MaxRow() {
        var begincell = this.BeginCell;
        var endcell = this.EndCell;
        if (begincell == null) {
            return 0;
        }
        if (endcell == null) {
            return 0;
        }
        var rmax = begincell.Row.Index;
        var rmin = begincell.Row.Index;
        var rmax1 = endcell.Row.Index;
        var rmin1 = endcell.Row.Index;
        //if (begincell.IsMergeCell)
        //{
        //        IMergeCell cell = this.BeginCell as IMergeCell;
        //    if (cell != null)
        //    {
        //        rmax = cell.EndCell.Row.Index;
        //        rmin = cell.BeginCell.Row.Index;
        //    }
        //}
        //if (endcell.IsMergeCell)
        //{
        //        IMergeCell cell2 = this.EndCell as IMergeCell;
        //    if (cell2 != null)
        //    {
        //        rmax1 = cell2.EndCell.Row.Index;
        //        rmin1 = cell2.BeginCell.Row.Index;
        //    }
        //}
        rmax = Math.max(rmax1, rmax);
        rmin = Math.min(rmin1, rmin);
        return rmax;
    }
    MaxColumn() {
        var begincell = this.BeginCell;
        var endcell = this.EndCell;
        if (begincell == null) {
            return 0;
        }
        if (endcell == null) {
            return 0;
        }
        var cmax = begincell.Column.Index;
        var cmin = begincell.Column.Index;
        var cmax1 = endcell.Column.Index;
        var cmin1 = endcell.Column.Index;
        cmax = Math.max(cmax1, cmax);
        cmin = Math.min(cmin1, cmin);
        return cmax;
    }
    MinRow() {
        var begincell = this.BeginCell;
        var endcell = this.EndCell;
        if (begincell == null) {
            return 0;
        }
        if (endcell == null) {
            return 0;
        }
        var rmax = begincell.Row.Index;
        var rmin = begincell.Row.Index;
        var rmax1 = endcell.Row.Index;
        var rmin1 = endcell.Row.Index;
        //if (begincell.IsMergeCell)
        //{
        //        IMergeCell cell = begincell as IMergeCell;
        //    if (cell != null)
        //    {
        //        rmax = cell.EndCell.Row.Index;
        //        rmin = cell.BeginCell.Row.Index;
        //    }
        //}
        //if (endcell.IsMergeCell)
        //{
        //        IMergeCell cell2 = this.EndCell as IMergeCell;
        //    if (cell2 != null)
        //    {
        //        rmax1 = cell2.EndCell.Row.Index;
        //        rmin1 = cell2.BeginCell.Row.Index;
        //    }
        //}
        rmax = Math.max(rmax1, rmax);
        rmin = Math.min(rmin1, rmin);
        return rmin;
    }
    MinColumn() {
        var begincell = this.BeginCell;
        var endcell = this.EndCell;
        if (begincell == null) {
            return 0;
        }
        if (endcell == null) {
            return 0;
        }
        var cmax = begincell.Column.Index;
        var cmin = begincell.Column.Index;
        var cmax1 = endcell.Column.Index;
        var cmin1 = endcell.Column.Index;
        cmax = Math.max(cmax1, cmax);
        cmin = Math.min(cmin1, cmin);
        return cmin;
    }
}
class Chart {
    constructor() {
        this._offsetX = 0;
        this._offsetY = 0;
        this._height = 0;
        this._left = 0;
        this._top = 0;
        this._width = 0;
        this._BackImage = "";
        this._BackImageImageLayout = ImageLayout.ZoomClip;
        this._SelectBorderWidth = 6;
        this._SelectBorderWidth = 6;
        this.ChartData = {
            data: {},
            style: {
                option: {}
            }
        };
    }
    get Name() {
        return this._Name;
    }
    set Name(value) {
        this._Name = value;
    }
    get offsetX() {
        return this._offsetX;
    }
    set offsetX(value) {
        this._offsetX = value;
    }
    get offsetY() {
        return this._offsetY;
    }
    set offsetY(value) {
        this._offsetY = value;
    }
    get Height() {
        return this._height;
    }
    set Height(value) {
        this._height = value;
    }
    get Right() {
        return this.Left + this.Width;
    }
    get Bottom() {
        return this.Top + this.Height;
    }
    get Left() {
        return this._left;
    }
    set Left(value) {
        this._left = value;
    }
    get Top() {
        return this._top;
    }
    set Top(value) {
        this._top = value;
    }
    get Width() {
        return this._width;
    }
    set Width(value) {
        this._width = value;
    }
    get Rect() {
        let rect = new Rect(0, 0, 0, 0);
        rect.X = this.Left + this.offsetX;
        rect.Y = this.Top + this.offsetY;
        rect.Width = this.Width;
        rect.Height = this.Height;
        return rect;
    }
    get Bound() {
        let rect = new Rect(0, 0, 0, 0);
        rect.Width = this.Width;
        rect.Height = this.Height;
        return rect;
    }
    get BackColor() {
        //if (this._BackColor == null)
        //{
        //    return this.Grid.BackColor;
        //}
        return this._BackColor;
    }
    set BackColor(value) {
        this._BackColor = value;
    }
    get BackImage() {
        return this._BackImage;
    }
    set BackImage(value) {
        this._BackImage = value;
    }
    get BackImageImageLayout() {
        return this._BackImageImageLayout;
    }
    set BackImageImageLayout(value) {
        this._BackImageImageLayout = value;
    }
    get MouseDownPoint() {
        return this._MouseDownPoint;
    }
    set MouseDownPoint(value) {
        this._MouseDownPoint = value;
    }
    get MouseDownSize() {
        return this._MouseDownSize;
    }
    set MouseDownSize(value) {
        this._MouseDownSize = value;
    }
    get SizeChangMode() {
        return this._SizeChangMode;
    }
    set SizeChangMode(value) {
        this._SizeChangMode = value;
    }
    get StateMode() {
        return this._StateMode_1;
    }
    set StateMode(value) {
        this._StateMode_1 = value;
    }
    get TopLeft() {
        let rectf = new Rect(this.Left + this.offsetX - this._SelectBorderWidth - this._SelectBorderWidth, this.Top + this.offsetY - this._SelectBorderWidth - this._SelectBorderWidth, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }
    get TopRight() {
        let rectf = new Rect(this.Right + this.offsetX + this._SelectBorderWidth + this._SelectBorderWidth, this.Top + this.offsetY - this._SelectBorderWidth - this._SelectBorderWidth, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }
    get BottomLeft() {
        let rectf = new Rect(this.Left + this.offsetX - this._SelectBorderWidth - this._SelectBorderWidth, this.Bottom + this.offsetY + this._SelectBorderWidth + this._SelectBorderWidth, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }
    get BottomRight() {
        let rectf = new Rect(this.Right + this.offsetX + this._SelectBorderWidth + this._SelectBorderWidth, this.Bottom + this.offsetY + this._SelectBorderWidth + this._SelectBorderWidth, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }
    get MidTop() {
        let rectf = new Rect(this.Left + this.offsetX + this.Width / 2 - this._SelectBorderWidth / 2, this.Top + this.offsetY - this._SelectBorderWidth - this._SelectBorderWidth, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }
    get MidBottom() {
        let rectf = new Rect(this.Left + this.offsetX + this.Width / 2 - this._SelectBorderWidth / 2, this.Bottom + this.offsetY + this._SelectBorderWidth + this._SelectBorderWidth, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }
    get MidLeft() {
        let rectf = new Rect(this.Left + this.offsetX - this._SelectBorderWidth - this._SelectBorderWidth, this.Top + this.offsetY + this.Height / 2 - this._SelectBorderWidth / 2, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }
    get MidRight() {
        let rectf = new Rect(this.Right + this.offsetX + this._SelectBorderWidth + this._SelectBorderWidth, this.Top + this.offsetY + this.Height / 2 - this._SelectBorderWidth / 2, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }
    get ChartData() {
        return this._ChartData;
    }
    set ChartData(value) {
        this._ChartData = value;
    }
    GetData() {
        try {
            let data = {
                name: this.Name,
                backcolor: this.BackColor,
                backimage: this.BackImage,
                backimageimagelayout: this.BackImageImageLayout,
                height: this.Height,
                left: this.Left,
                top: this.Top,
                width: this.Width,
                offsetx: this.offsetX,
                offsety: this.offsetY,
                chartdata: this.ChartData
            };
            return data;
        }
        catch (e) {
            DataExcelConsole.log("dataexcelcell GetData", e);
        }
        return {};
    }
    SetData(grid, data) {
        try {
            this.Name = data.name;
            this.BackColor = data.backcolor;
            this.BackImage = data.backimage;
            this.BackImageImageLayout = data.backimageimagelayout;
            this.Height = data.height;
            this.Left = data.left;
            this.Top = data.top;
            this.Width = data.width;
            this.ChartData = data.chartdata;
            this.offsetX = data.offsetx;
            this.offsetY = data.offsety;
        }
        catch (e) {
            DataExcelConsole.log("dataexcelcell SetData", e);
        }
    }
    Init() {
        if (this.dom == null) {
            this.dom = document.createElement("div");
            this.dom.style.position = "absolute";
            this.dom.style.left = this.Left + "px";
            this.dom.style.top = this.Top + "px";
            this.dom.style.width = this.Width + "px";
            this.dom.style.height = this.Height + "px";
            this.Grid.maindom.appendChild(this.dom);
            this.dom["chart"] = this;
            //this.dom.addEventListener("mousedown", this.DoOnMouseDown);
            //this.dom.addEventListener("mouseup", this.DoOnMouseUp);
            //this.dom.addEventListener("mousemove", this.DoOnMouseMove);
            //window["chart"] = this;
            //window.addEventListener("mousemove", this.DoOnMouseMove);
            this.chart = echarts.init(this.dom);
            let option = this.ChartData.style.option;
            this.chart.setOption(option);
        }
    }
    InitDefaultOption() {
        let option;
        option = {
            backgroundColor: '#1b1b1b',
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '40',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' }
                    ]
                }
            ]
        };
        this.ChartData.style.option = option;
        this.chart.setOption(option);
    }
    Refresh() {
        this.offsetX = this.Grid.ContentLeft;
        this.offsetY = this.Grid.ContentTop;
        this.dom.style.left = this.offsetX + this.Left + "px";
        this.dom.style.top = this.offsetY + this.Top + "px";
        this.dom.style.width = this.Width + "px";
        this.dom.style.height = this.Height + "px";
        let option = this.ChartData.style.option;
        this.chart.setOption(option, true);
        this.chart.resize();
    }
    RefreshData() {
    }
    Clear() {
        try {
            if (this.dom != null) {
                this.Grid.maindom.removeChild(this.dom);
            }
        }
        catch (e) {
            DataExcelConsole.log("Chart Clear", e);
        }
    }
    //DoOnMouseDown(evt: MouseEvent): void
    //{
    //    let obj2 = this["chart"] as any;
    //    let obj = obj2 as Chart;
    //    let ev = new EventView();
    //    try
    //    {
    //        ev.Canvas = evt.target;
    //        let dom = evt.target as HTMLElement;
    //        ev.Dom = dom;
    //        let vertex = dom.getBoundingClientRect();
    //        let x = evt.offsetX;
    //        let y = evt.offsetY;
    //        ev.Point = new Point(x, y);
    //        obj.OnChartMouseDown(this, evt, ev);
    //    }
    //    catch (ex)
    //    {
    //        DataExcelConsole.log("dom.OnMouseDown", ex);
    //    }
    //    finally
    //    {
    //    }
    //}
    //DoOnMouseUp(evt: MouseEvent): void
    //{
    //    let obj2 = this["chart"] as any;
    //    let obj = obj2 as Chart;
    //    let ev = new EventView();
    //    try
    //    {
    //        ev.Canvas = evt.target;
    //        let dom = evt.target as HTMLElement;
    //        ev.Dom = dom;
    //        let x = evt.offsetX;
    //        let y = evt.offsetY;
    //        ev.Point = new Point(x, y);
    //        obj.OnChartMouseUp(this, evt, ev);
    //    }
    //    catch (ex)
    //    {
    //        DataExcelConsole.log("dom.OnMouseUp", ex);
    //    }
    //    finally
    //    {
    //    }
    //}
    //DoOnMouseMove(evt: MouseEvent): void
    //{
    //    let obj2 = this["chart"] as any;
    //    let obj = obj2 as Chart;
    //    let ev = new EventView();
    //    try
    //    {
    //        ev.Canvas = evt.target;
    //        let dom = evt.target as HTMLElement;
    //        ev.Dom = dom;
    //        let x = evt.offsetX;
    //        let y = evt.offsetY;
    //        ev.Point = new Point(x, y);
    //        obj.OnChartMouseMove(this, evt, ev);
    //    }
    //    catch (ex)
    //    {
    //        DataExcelConsole.log("dom.click", ex);
    //    }
    //    finally
    //    {
    //    }
    //}
    //OnChartMouseDown(sender: any, e: any, ve: EventView): boolean
    //{
    //    if (this.Bound.Contains(ve.Point))
    //    {
    //        this.MouseDownPoint = ve.Point; 
    //        this.StateMode = StateMode.MOVE;
    //        this.Grid.ClearSelect();
    //        this.Selected = true;
    //        this.Grid.CellEvent = this;
    //        this.Grid.RePaint();
    //        return true;
    //    }
    //    return false;
    //}
    //OnChartMouseUp(sender: any, e: any, ve: EventView): boolean
    //{
    //    this.StateMode = StateMode.NULL;
    //    return false;
    //}
    //OnChartMouseMove(sender: any, e: any, ve: EventView): boolean
    //{ 
    //    if (this.StateMode == StateMode.MOVE)
    //    {
    //        let x = ve.Point.X - this.MouseDownPoint.X;
    //        let y = ve.Point.Y - this.MouseDownPoint.Y;
    //        this.Left = this.Left + x;
    //        this.Top = this.Top + y;
    //        this.dom.style.left = this.Left + "px";
    //        this.dom.style.top = this.Top + "px";
    //        this.Refresh();
    //        this.Grid.RePaint();
    //        return true;
    //    } 
    //    return false;
    //}
    //Over
    OnMouseDown(sender, e, ve) {
        if (this.Rect.Contains(ve.offsetPoint)) {
            this.MouseDownPoint = ve.offsetPoint;
            this.MouseDownSize = new Size(this.Left, this.Top);
            this.StateMode = StateMode.MOVE;
            this.Grid.ClearSelect();
            this.Selected = true;
            ve.NeedRePaint = true;
            ve.CurrentEvent = this;
            return true;
        }
        if (this.SizeChangedMouseDown(ve)) {
            this.StateMode = StateMode.SIZE;
            ve.NeedRePaint = true;
            ve.CurrentEvent = this;
            return true;
        }
        return false;
    }
    OnMouseUp(sender, e, ve) {
        this.StateMode = StateMode.NULL;
        return false;
    }
    OnMouseMove(sender, e, ve) {
        if (this.StateMode == StateMode.MOVE) {
            let x = ve.offsetPoint.X - this.MouseDownPoint.X;
            let y = ve.offsetPoint.Y - this.MouseDownPoint.Y;
            this.Left = this.MouseDownSize.Width + x;
            this.Top = this.MouseDownSize.Height + y;
            this.dom.style.left = this.Left + "px";
            this.dom.style.top = this.Top + "px";
            ve.NeedRePaint = true;
            ve.CurrentEvent = this;
            return true;
        }
        if (this.StateMode == StateMode.SIZE) {
            this.ChangedSize(ve);
            this.dom.style.left = this.offsetX + this.Left + "px";
            this.dom.style.top = this.offsetY + this.Top + "px";
            this.dom.style.width = this.Width + "px";
            this.dom.style.height = this.Height + "px";
            this.chart.resize();
            ve.NeedRePaint = true;
            ve.CurrentEvent = this;
            return true;
        }
        else if (this.SizeChangedMouseDown(ve)) {
            ve.NeedRePaint = true;
            ve.CurrentEvent = this;
            return true;
        }
        return false;
    }
    SetCursor(cursor) {
        this.Grid.maindom.style.cursor = cursor;
    }
    OnMouseDoubleClick(sender, e, ve) {
        return false;
    }
    OnKeyPress(sender, e, ve) {
        return false;
    }
    OnKeyDown(sender, e, ve) {
        return false;
    }
    OnTouchStart(sender, e, ve) {
        return false;
    }
    OnTouchMove(sender, e, ve) {
        return false;
    }
    OnTouchEnd(sender, e, ve) {
        return false;
    }
    OnDrawBack(sender, g) {
        if (this.Grid == null)
            console.log("this.Grid == null");
        if (this.BackColor != null) {
            g.FillRect(this.BackColor, this.Left + this.offsetX, this.Top, this.Width, this.Height);
        }
        if (!ConvertHelper.StringIsNullOrEmpty(this.BackImage)) {
            g.FillRectangleImage(this.BackImage, this.Rect, this.BackImageImageLayout, null, 1);
        }
        if (this.Selected) {
            g.FillRect(Palette.A3399FF80, this.Left + this.offsetX, this.Top + this.offsetY, this.Width, this.Height);
        }
        if (this.Selected) {
            g.FillRectangleColor("gray", this.TopLeft, Cursors.nw_resize);
            g.FillRectangleColor("gray", this.BottomRight, Cursors.nw_resize);
            g.FillRectangleColor("gray", this.TopRight, Cursors.ne_resize);
            g.FillRectangleColor("gray", this.BottomLeft, Cursors.ne_resize);
            g.FillRectangleColor("gray", this.MidRight, Cursors.e_resize);
            g.FillRectangleColor("gray", this.MidLeft, Cursors.e_resize);
            g.FillRectangleColor("gray", this.MidTop, Cursors.n_resize);
            g.FillRectangleColor("gray", this.MidBottom, Cursors.n_resize);
        }
    }
    SizeChangedMouseDown(ve) {
        let pt = ve.offsetPoint;
        this.MouseDownPoint = ve.offsetPoint;
        this.MouseDownSize = new Size(this.Width, this.Height);
        let result = false;
        if (this.TopLeft.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.TopLeft;
            this.SetCursor(Cursors.nw_resize);
            result = true;
        }
        else if (this.TopRight.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.TopRight;
            this.SetCursor(Cursors.ne_resize);
            result = true;
        }
        else if (this.BottomLeft.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.BoomLeft;
            this.SetCursor(Cursors.ne_resize);
            result = true;
        }
        else if (this.BottomRight.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.BoomRight;
            this.SetCursor(Cursors.nw_resize);
            result = true;
        }
        else if (this.MidTop.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.MidTop;
            this.SetCursor(Cursors.n_resize);
            result = true;
        }
        else if (this.MidBottom.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.MidBoom;
            this.SetCursor(Cursors.n_resize);
            result = true;
        }
        else if (this.MidLeft.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.MidLeft;
            this.SetCursor(Cursors.e_resize);
            result = true;
        }
        else if (this.MidRight.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.MidRight;
            this.SetCursor(Cursors.e_resize);
            result = true;
        }
        return result;
    }
    ChangedSize(ve) {
        let location = ve.offsetPoint; // e.Location;
        let sf = new Size(location.X - this.MouseDownPoint.X, location.Y - this.MouseDownPoint.Y);
        switch (this.SizeChangMode) {
            case SizeChangMode.Null:
                break;
            case SizeChangMode.TopLeft:
                this.Width = this.MouseDownSize.Width - sf.Width;
                this.Height = this.MouseDownSize.Height - sf.Height;
                this.Top = location.Y; // this.MouseDownPoint.Y + sf.Height;
                this.Left = location.X; // this.MouseDownPoint.X + sf.Width;
                break;
            case SizeChangMode.TopRight:
                this.Width = this.MouseDownSize.Width + sf.Width;
                this.Height = this.MouseDownSize.Height - sf.Height;
                this.Top = location.Y; // this.MouseDownPoint.Y + sf.Height;
                break;
            case SizeChangMode.MidLeft:
                this.Width = this.MouseDownSize.Width - sf.Width;
                this.Left = this.MouseDownPoint.X + sf.Width;
                break;
            case SizeChangMode.MidRight:
                this.Width = this.MouseDownSize.Width + sf.Width;
                break;
            case SizeChangMode.BoomLeft:
                this.Width = this.MouseDownSize.Width - sf.Width;
                this.Height = this.MouseDownSize.Height + sf.Height;
                this.Left = this.MouseDownPoint.X + sf.Width;
                break;
            case SizeChangMode.BoomRight:
                this.Width = this.MouseDownSize.Width + sf.Width;
                this.Height = this.MouseDownSize.Height + sf.Height;
                break;
            case SizeChangMode.MidTop:
                this.Height = this.MouseDownSize.Height - sf.Height;
                this.Top = this.MouseDownPoint.Y + sf.Height;
                break;
            case SizeChangMode.MidBoom:
                this.Height = this.MouseDownSize.Height + sf.Height;
                break;
            default:
                break;
        }
    }
}
class ChartList extends List {
    constructor() {
        super();
    }
    Clear() {
        this.forEach((chart) => {
            chart.Clear();
        });
        this.clear();
    }
    Refresh() {
        for (var i in this) {
            let cell = this[i];
            cell.Refresh();
        }
    }
}
const HScrollerSkin = {
    DrawArea(g, rect) {
        g.FillRectangleColor("GhostWhite", rect);
    },
    DrawThumdBack(g, rect, MoveSelected) {
        g.FillRectangleColor("white", rect);
    },
    DrawThumd(g, rect, Thickness) {
        g.FillRectangleColor("Silver", rect);
    },
    DrawUpArrow(g, rect) {
        g.FillRectangleColor("Gainsboro", rect);
        let x1 = rect.X;
        let y1 = rect.Y;
        let shape = new zrender.Polyline({
            scale: [1, 1],
            style: {
                opacity: 1,
                fill: "gray",
                stroke: "gray",
            },
            shape: {
                //points: [[x1 + 4, y1 + 22], [x1 + 8, y1 + 18], [x1 + 12, y1 + 22], [x1 + 4, y1 + 22]]
                points: [[x1 + 22, y1 + 4], [x1 + 18, y1 + 8], [x1 + 22, y1 + 12], [x1 + 22, y1 + 4]]
            },
        });
        g.ZR.add(shape);
    },
    DrawDownArrow(g, rect) {
        g.FillRectangleColor("Gainsboro", rect);
        let x1 = rect.X;
        let y1 = rect.Y;
        let shape = new zrender.Polyline({
            scale: [1, 1],
            style: {
                opacity: 1,
                fill: "gray",
                stroke: "gray",
            },
            shape: {
                //points: [[x1 + 4, y1 + 8], [x1 + 8, y1 + 12], [x1 + 12, y1 + 8], [x1 + 4, y1 + 8]]
                points: [[x1 + 8, y1 + 4], [x1 + 12, y1 + 8], [x1 + 8, y1 + 12], [x1 + 8, y1 + 4]]
            },
        });
        g.ZR.add(shape);
    }
};
class Primitive {
    constructor() {
        this._height = 0;
        this._left = 0;
        this._top = 0;
        this._width = 0;
        this._BackImage = "";
        this._BackImageImageLayout = ImageLayout.ZoomClip;
        this._SelectBorderWidth = 6;
        this.CurrentDiaplay = null;
        this.Displayables = new DisplayableList();
    }
    get Name() {
        return this._Name;
    }
    set Name(value) {
        this._Name = value;
    }
    get Height() {
        return this._height;
    }
    set Height(value) {
        this._height = value;
    }
    get Right() {
        return this._left + this.Width;
    }
    get Bottom() {
        return this.Top + this.Height;
    }
    get Left() {
        return this._left;
    }
    set Left(value) {
        this._left = value;
    }
    get Top() {
        return this._top;
    }
    set Top(value) {
        this._top = value;
    }
    get Width() {
        return this._width;
    }
    set Width(value) {
        this._width = value;
    }
    get Rect() {
        let rect = new Rect(0, 0, 0, 0);
        rect.X = this.Left;
        rect.Y = this.Top;
        rect.Width = this.Width;
        rect.Height = this.Height;
        return rect;
    }
    get Bound() {
        let rect = new Rect(0, 0, 0, 0);
        rect.X = this.Left;
        rect.Y = this.Top;
        rect.Width = this.Width;
        rect.Height = this.Height;
        return rect;
    }
    get BackColor() {
        //if (this._BackColor == null)
        //{
        //    return this.Grid.BackColor;
        //}
        return this._BackColor;
    }
    set BackColor(value) {
        this._BackColor = value;
    }
    get BackImage() {
        return this._BackImage;
    }
    set BackImage(value) {
        this._BackImage = value;
    }
    get BackImageImageLayout() {
        return this._BackImageImageLayout;
    }
    set BackImageImageLayout(value) {
        this._BackImageImageLayout = value;
    }
    get MouseDownPoint() {
        return this._MouseDownPoint;
    }
    set MouseDownPoint(value) {
        this._MouseDownPoint = value;
    }
    get MouseDownSize() {
        return this._MouseDownSize;
    }
    set MouseDownSize(value) {
        this._MouseDownSize = value;
    }
    get SizeChangMode() {
        return this._SizeChangMode;
    }
    set SizeChangMode(value) {
        this._SizeChangMode = value;
    }
    get StateMode() {
        return this._StateMode_1;
    }
    set StateMode(value) {
        this._StateMode_1 = value;
    }
    get TopLeft() {
        let rectf = new Rect(this.Left - this._SelectBorderWidth - this._SelectBorderWidth, this.Top - this._SelectBorderWidth - this._SelectBorderWidth, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }
    get TopRight() {
        let rectf = new Rect(this.Right + this._SelectBorderWidth + this._SelectBorderWidth, this.Top - this._SelectBorderWidth - this._SelectBorderWidth, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }
    get BottomLeft() {
        let rectf = new Rect(this.Left - this._SelectBorderWidth - this._SelectBorderWidth, this.Bottom + this._SelectBorderWidth + this._SelectBorderWidth, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }
    get BottomRight() {
        let rectf = new Rect(this.Right + this._SelectBorderWidth + this._SelectBorderWidth, this.Bottom + this._SelectBorderWidth + this._SelectBorderWidth, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }
    get MidTop() {
        let rectf = new Rect(this.Left + this.Width / 2 - this._SelectBorderWidth / 2, this.Top - this._SelectBorderWidth - this._SelectBorderWidth, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }
    get MidBottom() {
        let rectf = new Rect(this.Left + this.Width / 2 - this._SelectBorderWidth / 2, this.Bottom + this._SelectBorderWidth + this._SelectBorderWidth, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }
    get MidLeft() {
        let rectf = new Rect(this.Left - this._SelectBorderWidth - this._SelectBorderWidth, this.Top + this.Height / 2 - this._SelectBorderWidth / 2, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }
    get MidRight() {
        let rectf = new Rect(this.Right + this._SelectBorderWidth + this._SelectBorderWidth, this.Top + this.Height / 2 - this._SelectBorderWidth / 2, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }
    GetData() {
        let data = {
            name: this.Name,
            height: this.Height,
            left: this.Left,
            top: this.Top,
            width: this.Width,
            backcolor: this.BackColor,
            backimage: this.BackImage,
            backimageimagelayout: this.BackImageImageLayout,
            displayables: [],
        };
        this.Displayables.forEach((chart) => {
            data.displayables.push(chart.GetData());
        });
        return data;
    }
    SetData(grid, data) {
        this.Name = data.name;
        this.Height = data.height;
        this.Left = data.left;
        this.Top = data.top;
        this.Width = data.width;
        this.BackColor = data.backcolor;
        this.BackImage = data.backimage;
        this.BackImageImageLayout = data.backimageimagelayout;
        let len = data.displayables.length;
        for (let i = 0; i < len; i++) {
            let itemdata = data.displayables[i];
            let item = DisplayableBuild.build(itemdata.typename);
            if (item != null) {
                item.Grid = grid;
                item.Primitive = this;
                item.SetData(grid, itemdata);
                this.Displayables.Add(item);
            }
        }
    }
    Mixin(obj) {
    }
    OnDraw(sender, g) {
        return false;
    }
    OnDrawBack(sender, g) {
        if (this.Grid == null)
            console.log("this.Grid == null");
        if (this.BackColor != null) {
            g.FillRect(this.BackColor, this.Left, this.Top, this.Width, this.Height);
        }
        if (this.Selected) {
            g.FillRect(Palette.A3399FF80, this.Left, this.Top, this.Width, this.Height);
        }
        if (!ConvertHelper.StringIsNullOrEmpty(this.BackImage)) {
            g.FillRectangleImage(this.BackImage, this.Rect, this.BackImageImageLayout, null, 1);
        }
        if (this.Selected) {
            g.FillRectangleColor("gray", this.TopLeft, Cursors.nw_resize);
            g.FillRectangleColor("gray", this.BottomRight, Cursors.nw_resize);
            g.FillRectangleColor("gray", this.TopRight, Cursors.ne_resize);
            g.FillRectangleColor("gray", this.BottomLeft, Cursors.ne_resize);
            g.FillRectangleColor("gray", this.MidRight, Cursors.e_resize);
            g.FillRectangleColor("gray", this.MidLeft, Cursors.e_resize);
            g.FillRectangleColor("gray", this.MidTop, Cursors.n_resize);
            g.FillRectangleColor("gray", this.MidBottom, Cursors.n_resize);
        }
        try {
            for (var i = 0; i < this.Displayables.Count; i++) {
                let display = this.Displayables.Get(i);
                display.OnDrawBack(sender, g);
            }
        }
        catch (e) {
            DataExcelConsole.log("OnDrawBack", e);
        }
        return false;
    }
    OnMouseDown(sender, e, ve) {
        if (this.CurrentDiaplay != null) {
            ve.offsetPoint.X = ve.offsetPoint.X - this.Left;
            ve.offsetPoint.Y = ve.offsetPoint.Y - this.Top;
            let res = this.CurrentDiaplay.OnMouseDown(sender, e, ve);
            if (res) {
                return res;
            }
        }
        for (var i = 0; i < this.Displayables.Count; i++) {
            let disp = this.Displayables.Get(i);
            if (disp == null) {
                DataExcelConsole.log("Primitive OnMouseDown error", e);
                continue;
            }
            let res = disp.OnMouseDown(sender, e, ve);
            if (res) {
                return res;
            }
        }
        if (this.SizeChangedMouseDown(ve)) {
            this.StateMode = StateMode.SIZE;
            ve.NeedRePaint = true;
            ve.CurrentEvent = this;
            return true;
        }
        if (this.Bound.Contains(ve.offsetPoint)) {
            this.MouseDownPoint = ve.offsetPoint;
            this.MouseDownSize = new Size(this.Left, this.Top);
            this.StateMode = StateMode.MOVE;
            this.Grid.ClearSelect();
            this.Selected = true;
            ve.NeedRePaint = true;
            ve.CurrentEvent = this;
            return true;
        }
        return false;
    }
    OnMouseUp(sender, e, ve) {
        if (this.CurrentDiaplay != null) {
            ve.offsetPoint.X = ve.offsetPoint.X - this.Left;
            ve.offsetPoint.Y = ve.offsetPoint.Y - this.Top;
            let res = this.CurrentDiaplay.OnMouseUp(sender, e, ve);
            if (res) {
                ve.NeedRePaint = true;
                ve.CurrentEvent = this;
                return res;
            }
        }
        this.CurrentDiaplay = null;
        this.StateMode = StateMode.NULL;
        return false;
    }
    OnMouseMove(sender, e, ve) {
        if (this.CurrentDiaplay != null) {
            ve.offsetPoint.X = ve.offsetPoint.X - this.Left;
            ve.offsetPoint.Y = ve.offsetPoint.Y - this.Top;
            let res = this.CurrentDiaplay.OnMouseMove(sender, e, ve);
            if (res) {
                ve.NeedRePaint = true;
                ve.CurrentEvent = this;
                return res;
            }
        }
        if (this.StateMode == StateMode.SIZE) {
            this.ChangedSize(ve);
            ve.NeedRePaint = true;
            ve.CurrentEvent = this;
            return true;
        }
        if (this.StateMode == StateMode.MOVE) {
            let x = ve.offsetPoint.X - this.MouseDownPoint.X;
            let y = ve.offsetPoint.Y - this.MouseDownPoint.Y;
            this.Left = this.MouseDownSize.Width + x;
            this.Top = this.MouseDownSize.Height + y;
            ve.NeedRePaint = true;
            ve.CurrentEvent = this;
            return true;
        }
        return false;
    }
    OnMouseDoubleClick(sender, e, ve) {
        if (this.CurrentDiaplay != null) {
            ve.offsetPoint.X = ve.offsetPoint.X - this.Left;
            ve.offsetPoint.Y = ve.offsetPoint.Y - this.Top;
            let res = this.CurrentDiaplay.OnMouseDoubleClick(sender, e, ve);
            if (res) {
                return res;
            }
        }
        return false;
    }
    OnKeyPress(sender, e, ve) {
        return false;
    }
    OnKeyDown(sender, e, ve) {
        return false;
    }
    OnTouchStart(sender, e, ve) {
        return false;
    }
    OnTouchMove(sender, e, ve) {
        return false;
    }
    OnTouchEnd(sender, e, ve) {
        return false;
    }
    Clear() {
        try {
            this.CurrentDiaplay = null;
            this.Displayables.Clear();
        }
        catch (e) {
            DataExcelConsole.log("Primitive Clear", e);
        }
    }
    Clone() {
    }
    SizeChangedMouseDown(ve) {
        let pt = ve.offsetPoint;
        this.MouseDownPoint = ve.offsetPoint;
        this.MouseDownSize = new Size(this.Width, this.Height);
        let result = false;
        if (this.TopLeft.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.TopLeft;
            result = true;
        }
        else if (this.TopRight.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.TopRight;
            result = true;
        }
        else if (this.BottomLeft.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.BoomLeft;
            result = true;
        }
        else if (this.BottomRight.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.BoomRight;
            result = true;
        }
        else if (this.MidTop.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.MidTop;
            result = true;
        }
        else if (this.MidBottom.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.MidBoom;
            result = true;
        }
        else if (this.MidLeft.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.MidLeft;
            result = true;
        }
        else if (this.MidRight.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.MidRight;
            result = true;
        }
        return result;
    }
    ChangedSize(ve) {
        let location = ve.offsetPoint; // e.Location;
        let sf = new Size(location.X - this.MouseDownPoint.X, location.Y - this.MouseDownPoint.Y);
        switch (this.SizeChangMode) {
            case SizeChangMode.Null:
                break;
            case SizeChangMode.TopLeft:
                this.Width = this.MouseDownSize.Width - sf.Width;
                this.Height = this.MouseDownSize.Height - sf.Height;
                this.Top = location.Y; // this.MouseDownPoint.Y + sf.Height;
                this.Left = location.X; // this.MouseDownPoint.X + sf.Width;
                break;
            case SizeChangMode.TopRight:
                this.Width = this.MouseDownSize.Width + sf.Width;
                this.Height = this.MouseDownSize.Height - sf.Height;
                this.Top = location.Y; // this.MouseDownPoint.Y + sf.Height;
                break;
            case SizeChangMode.MidLeft:
                this.Width = this.MouseDownSize.Width - sf.Width;
                this.Left = this.MouseDownPoint.X + sf.Width;
                break;
            case SizeChangMode.MidRight:
                this.Width = this.MouseDownSize.Width + sf.Width;
                break;
            case SizeChangMode.BoomLeft:
                this.Width = this.MouseDownSize.Width - sf.Width;
                this.Height = this.MouseDownSize.Height + sf.Height;
                this.Left = this.MouseDownPoint.X + sf.Width;
                break;
            case SizeChangMode.BoomRight:
                this.Width = this.MouseDownSize.Width + sf.Width;
                this.Height = this.MouseDownSize.Height + sf.Height;
                break;
            case SizeChangMode.MidTop:
                this.Height = this.MouseDownSize.Height - sf.Height;
                this.Top = this.MouseDownPoint.Y + sf.Height;
                break;
            case SizeChangMode.MidBoom:
                this.Height = this.MouseDownSize.Height + sf.Height;
                break;
            default:
                break;
        }
    }
    //private timeid: number = -1;
    //timer
    //OpenTime()
    //{
    //    if (this.timeid > -1)
    //    {
    //        return;
    //    }
    //    this.timeid = setInterval(this.OnTimerInterval, 100,this);
    //}
    //CloseTime()
    //{
    //    try
    //    {
    //        if (this.timeid==-1)
    //        {
    //            return;
    //        }
    //        clearInterval(this.timeid);
    //        this.timeid = -1;
    //    } catch (e)
    //    {
    //        DataExcelConsole.log("CloseTime", e);     
    //    }
    //}
    //OnTimerInterval(obj)
    //{
    //    try
    //    {
    //        let pri = obj as Primitive;
    //        if (pri.CurrentDiaplay != null)
    //        {
    //            let res = pri.CurrentDiaplay.OnTimerInterval();
    //            if (res)
    //            {
    //                return res;
    //            }
    //        }
    //        pri.CloseTime();
    //    } catch (e)
    //    {
    //        DataExcelConsole.log("OnTimerInterval", e);
    //    } 
    //}
    //displayable
    NewDiaplayLine() {
        let item = new DisplayableLine();
        item.Grid = this.Grid;
        item.Primitive = this;
        this.Displayables.Add(item);
        this.CurrentDiaplay = item;
        this.Grid.CurrentEvent = this.CurrentDiaplay;
        return item;
    }
    NewDiaplayRect() {
        let item = new DisplayableRect();
        item.Grid = this.Grid;
        item.Primitive = this;
        this.Displayables.Add(item);
        this.CurrentDiaplay = item;
        this.Grid.CurrentEvent = this.CurrentDiaplay;
        return item;
    }
    NewDiaplayText() {
        let item = new DisplayableText();
        item.Grid = this.Grid;
        item.Primitive = this;
        this.Displayables.Add(item);
        this.CurrentDiaplay = item;
        this.Grid.CurrentEvent = this.CurrentDiaplay;
        return item;
    }
    NewDiaplayCircle() {
        let item = new DisplayableCircle();
        item.Grid = this.Grid;
        item.Primitive = this;
        this.Displayables.Add(item);
        this.CurrentDiaplay = item;
        this.Grid.CurrentEvent = this.CurrentDiaplay;
        return item;
    }
}
class PrimitiveList extends List {
    constructor() {
        super();
    }
    Clear() {
        this.clear();
    }
    Remove(row) {
        this.remove(row);
    }
    Get(index) {
        return this.get(index);
    }
}
const primitivetype = {
    line: "line",
};
const displaytype = {
    line: 'line',
    retct: 'rect',
    text: 'text',
};
const VScrollerSkin = {
    DrawArea(g, rect) {
        g.FillRectangleColor("GhostWhite", rect);
    },
    DrawThumdBack(g, rect, MoveSelected) {
        g.FillRectangleColor("white", rect);
    },
    DrawThumd(g, rect, Thickness) {
        g.FillRectangleColor("Silver", rect);
    },
    DrawUpArrow(g, rect) {
        g.FillRectangleColor("Gainsboro", rect);
        let x1 = rect.X;
        let y1 = rect.Y;
        let shape = new zrender.Polyline({
            scale: [1, 1],
            style: {
                opacity: 1,
                fill: "gray",
                stroke: "gray",
            },
            shape: {
                points: [[x1 + 4, y1 + 22], [x1 + 8, y1 + 18], [x1 + 12, y1 + 22], [x1 + 4, y1 + 22]]
            },
        });
        g.ZR.add(shape);
    },
    DrawDownArrow(g, rect) {
        g.FillRectangleColor("Gainsboro", rect);
        let x1 = rect.X;
        let y1 = rect.Y;
        let shape = new zrender.Polyline({
            scale: [1, 1],
            style: {
                opacity: 1,
                fill: "gray",
                stroke: "gray",
            },
            shape: {
                points: [[x1 + 4, y1 + 8], [x1 + 8, y1 + 12], [x1 + 12, y1 + 8], [x1 + 4, y1 + 8]]
            },
        });
        g.ZR.add(shape);
    }
};
class Displayable {
    constructor() {
        this._height = 0;
        this._left = 0;
        this._top = 0;
        this._width = 0;
        this._BackImage = "";
        this._BackImageImageLayout = ImageLayout.ZoomClip;
        this._SelectBorderWidth = 6;
        this._DesignMode = false;
    }
    get Grid() {
        return this._Grid;
    }
    set Grid(value) {
        this._Grid = value;
    }
    get Primitive() {
        return this._Primitive;
    }
    set Primitive(value) {
        this._Primitive = value;
    }
    get TypeName() {
        return "";
    }
    get Name() {
        return this._Name;
    }
    set Name(value) {
        this._Name = value;
    }
    get Height() {
        return this._height;
    }
    set Height(value) {
        this._height = value;
    }
    get Right() {
        return this._left + this.Width;
    }
    get Bottom() {
        return this.Top + this.Height;
    }
    get Left() {
        return this._left;
    }
    set Left(value) {
        this._left = value;
    }
    get Top() {
        return this._top;
    }
    set Top(value) {
        this._top = value;
    }
    get Width() {
        return this._width;
    }
    set Width(value) {
        this._width = value;
    }
    get Rect() {
        let rect = new Rect(0, 0, 0, 0);
        rect.X = this.Left;
        rect.Y = this.Top;
        rect.Width = this.Width;
        rect.Height = this.Height;
        return rect;
    }
    get Bound() {
        let rect = new Rect(0, 0, 0, 0);
        rect.X = this.Left;
        rect.Y = this.Top;
        rect.Width = this.Width;
        rect.Height = this.Height;
        return rect;
    }
    get BackColor() {
        //if (this._BackColor == null)
        //{
        //    return this.Grid.BackColor;
        //}
        return this._BackColor;
    }
    set BackColor(value) {
        this._BackColor = value;
    }
    get BackImage() {
        return this._BackImage;
    }
    set BackImage(value) {
        this._BackImage = value;
    }
    get BackImageImageLayout() {
        return this._BackImageImageLayout;
    }
    set BackImageImageLayout(value) {
        this._BackImageImageLayout = value;
    }
    get MouseDownPoint() {
        return this._MouseDownPoint;
    }
    set MouseDownPoint(value) {
        this._MouseDownPoint = value;
    }
    get MouseDownSize() {
        return this._MouseDownSize;
    }
    set MouseDownSize(value) {
        this._MouseDownSize = value;
    }
    get SizeChangMode() {
        return this._SizeChangMode;
    }
    set SizeChangMode(value) {
        this._SizeChangMode = value;
    }
    get StateMode() {
        return this._StateMode_1;
    }
    set StateMode(value) {
        this._StateMode_1 = value;
    }
    get Selected() {
        return this._Selected;
    }
    set Selected(value) {
        this._Selected = value;
    }
    get DesignMode() {
        return this._DesignMode;
    }
    set DesignMode(value) {
        this._DesignMode = value;
    }
    get TopLeft() {
        let rectf = new Rect(this.Left - this._SelectBorderWidth - this._SelectBorderWidth, this.Top - this._SelectBorderWidth - this._SelectBorderWidth, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }
    get TopRight() {
        let rectf = new Rect(this.Right + this._SelectBorderWidth + this._SelectBorderWidth, this.Top - this._SelectBorderWidth - this._SelectBorderWidth, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }
    get BottomLeft() {
        let rectf = new Rect(this.Left - this._SelectBorderWidth - this._SelectBorderWidth, this.Bottom + this._SelectBorderWidth + this._SelectBorderWidth, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }
    get BottomRight() {
        let rectf = new Rect(this.Right + this._SelectBorderWidth + this._SelectBorderWidth, this.Bottom + this._SelectBorderWidth + this._SelectBorderWidth, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }
    get MidTop() {
        let rectf = new Rect(this.Left + this.Width / 2 - this._SelectBorderWidth / 2, this.Top - this._SelectBorderWidth - this._SelectBorderWidth, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }
    get MidBottom() {
        let rectf = new Rect(this.Left + this.Width / 2 - this._SelectBorderWidth / 2, this.Bottom + this._SelectBorderWidth + this._SelectBorderWidth, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }
    get MidLeft() {
        let rectf = new Rect(this.Left - this._SelectBorderWidth - this._SelectBorderWidth, this.Top + this.Height / 2 - this._SelectBorderWidth / 2, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }
    get MidRight() {
        let rectf = new Rect(this.Right + this._SelectBorderWidth + this._SelectBorderWidth, this.Top + this.Height / 2 - this._SelectBorderWidth / 2, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }
    GetData() {
    }
    SetData(grid, data) {
    }
    OnDraw(sender, g) {
        return false;
    }
    OnDrawBack(sender, g) {
        return false;
    }
    DoDraw(sender, g) {
        return false;
    }
    DoDrawBack(sender, g) {
        if (this.Grid == null)
            console.log("this.Grid == null");
        if (this.BackColor != null) {
            g.FillRect(this.BackColor, this.Left, this.Top, this.Width, this.Height);
        }
        if (!ConvertHelper.StringIsNullOrEmpty(this.BackImage)) {
            g.FillRectangleImage(this.BackImage, this.Rect, this.BackImageImageLayout, null, 1);
        }
        if (this.Selected) {
            g.FillRectangleColor("gray", this.TopLeft, Cursors.nw_resize);
            g.FillRectangleColor("gray", this.BottomRight, Cursors.nw_resize);
            g.FillRectangleColor("gray", this.TopRight, Cursors.ne_resize);
            g.FillRectangleColor("gray", this.BottomLeft, Cursors.ne_resize);
            g.FillRectangleColor("gray", this.MidRight, Cursors.e_resize);
            g.FillRectangleColor("gray", this.MidLeft, Cursors.e_resize);
            g.FillRectangleColor("gray", this.MidTop, Cursors.n_resize);
            g.FillRectangleColor("gray", this.MidBottom, Cursors.n_resize);
        }
        return false;
    }
    OnMouseDown(sender, e, ve) {
        return false;
    }
    OnMouseUp(sender, e, ve) {
        return false;
    }
    OnMouseMove(sender, e, ve) {
        return false;
    }
    OnMouseDoubleClick(sender, e, ve) {
        return false;
    }
    OnKeyPress(sender, e, ve) {
        return false;
    }
    OnKeyDown(sender, e, ve) {
        return false;
    }
    OnTouchStart(sender, e, ve) {
        return false;
    }
    OnTouchMove(sender, e, ve) {
        return false;
    }
    OnTouchEnd(sender, e, ve) {
        return false;
    }
    Clone() {
    }
    DoMouseDown(sender, e, ve) {
        if (this.MouseDownSizeChanged(ve)) {
            this.StateMode = StateMode.SIZE;
            return true;
        }
        if (this.MouseDownMove(ve)) {
            return true;
        }
        return false;
    }
    DoMouseUp(sender, e, ve) {
        this.StateMode = StateMode.NULL;
        return false;
    }
    DoMouseMove(sender, e, ve) {
        if (this.StateMode == StateMode.SIZE) {
            this.ChangedSize(ve);
            this.Grid.RePaint();
        }
        if (this.StateMode == StateMode.MOVE) {
            let x = ve.offsetPoint.X - this.MouseDownPoint.X;
            let y = ve.offsetPoint.Y - this.MouseDownPoint.Y;
            this.Left = this.MouseDownSize.Width + x;
            this.Top = this.MouseDownSize.Height + y;
            this.Grid.RePaint();
            return true;
        }
        return false;
    }
    MouseDownSizeChanged(ve) {
        let pt = new Point(ve.offsetPoint.X, ve.offsetPoint.Y);
        this.MouseDownPoint = pt;
        this.MouseDownSize = new Size(this.Width, this.Height);
        let result = false;
        if (this.TopLeft.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.TopLeft;
            result = true;
        }
        else if (this.TopRight.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.TopRight;
            result = true;
        }
        else if (this.BottomLeft.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.BoomLeft;
            result = true;
        }
        else if (this.BottomRight.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.BoomRight;
            result = true;
        }
        else if (this.MidTop.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.MidTop;
            result = true;
        }
        else if (this.MidBottom.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.MidBoom;
            result = true;
        }
        else if (this.MidLeft.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.MidLeft;
            result = true;
        }
        else if (this.MidRight.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.MidRight;
            result = true;
        }
        return result;
    }
    MouseDownMove(ve) {
        let pt = new Point(ve.offsetPoint.X, ve.offsetPoint.Y);
        if (this.Bound.Contains(pt)) {
            this.MouseDownPoint = pt;
            this.MouseDownSize = new Size(this.Left, this.Top);
            this.StateMode = StateMode.MOVE;
            this.Grid.ClearSelect();
            this.Selected = true;
            this.Grid.RePaint();
            return true;
        }
        return false;
    }
    ChangedSize(ve) {
        let location = new Point(ve.offsetPoint.X, ve.offsetPoint.Y);
        let sf = new Size(location.X - this.MouseDownPoint.X, location.Y - this.MouseDownPoint.Y);
        switch (this.SizeChangMode) {
            case SizeChangMode.Null:
                break;
            case SizeChangMode.TopLeft:
                this.Width = this.MouseDownSize.Width - sf.Width;
                this.Height = this.MouseDownSize.Height - sf.Height;
                this.Top = location.Y; // this.MouseDownPoint.Y + sf.Height;
                this.Left = location.X; // this.MouseDownPoint.X + sf.Width;
                break;
            case SizeChangMode.TopRight:
                this.Width = this.MouseDownSize.Width + sf.Width;
                this.Height = this.MouseDownSize.Height - sf.Height;
                this.Top = location.Y; // this.MouseDownPoint.Y + sf.Height;
                break;
            case SizeChangMode.MidLeft:
                this.Width = this.MouseDownSize.Width - sf.Width;
                this.Left = this.MouseDownPoint.X + sf.Width;
                break;
            case SizeChangMode.MidRight:
                this.Width = this.MouseDownSize.Width + sf.Width;
                break;
            case SizeChangMode.BoomLeft:
                this.Width = this.MouseDownSize.Width - sf.Width;
                this.Height = this.MouseDownSize.Height + sf.Height;
                this.Left = this.MouseDownPoint.X + sf.Width;
                break;
            case SizeChangMode.BoomRight:
                this.Width = this.MouseDownSize.Width + sf.Width;
                this.Height = this.MouseDownSize.Height + sf.Height;
                break;
            case SizeChangMode.MidTop:
                this.Height = this.MouseDownSize.Height - sf.Height;
                this.Top = this.MouseDownPoint.Y + sf.Height;
                break;
            case SizeChangMode.MidBoom:
                this.Height = this.MouseDownSize.Height + sf.Height;
                break;
            default:
                break;
        }
    }
}
const DisplayableBuild = {
    line: "line",
    rect: "rect",
    text: "text",
    circ: "circ",
    build: function (typename) {
        let model = null;
        switch (typename) {
            case DisplayableBuild.line:
                model = new DisplayableLine();
                break;
            case DisplayableBuild.rect:
                model = new DisplayableRect();
                break;
            case DisplayableBuild.text:
                model = new DisplayableText();
                break;
            case DisplayableBuild.circ:
                model = new DisplayableCircle();
                break;
            default:
        }
        return model;
    }
};
class DisplayableCircle extends Displayable {
    constructor() {
        super();
        this._Animation = true;
        this.init = true;
        let style = {
            option: {
                style: { fill: '#87CEFA', lineWidth: 5 },
                shape: { r: 30, cx: 200, cy: 200 },
            },
            animate: [
                {
                    type: "style", interval: 3000, value: { fill: 'white' }, animate: { interval: 6000, value: { fill: '#87CEFA' } }
                },
                {
                    type: "shape", interval: 3000, value: { r: 60 }, animate: { interval: 6000, value: { r: 30 } }
                }
            ]
        };
        this._Style = style;
    }
    get TypeName() {
        return DisplayableBuild.circ;
    }
    get Animation() {
        return this._Animation;
    }
    set Animation(value) {
        this._Animation = value;
    }
    get Style() {
        return this._Style;
    }
    set Style(value) {
        this._Style = value;
    }
    GetData() {
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
            style: this.Style,
            animation: this.Animation,
        };
        return data;
    }
    SetData(grid, data) {
        this.Name = data.name;
        this.Height = data.height;
        this.Left = data.left;
        this.Top = data.top;
        this.Width = data.width;
        this.BackColor = data.backcolor;
        this.BackImage = data.backimage;
        this.BackImageImageLayout = data.backimageimagelayout;
        this.Style = data.style;
        this.Animation = data.animation;
    }
    OnDrawBack(sender, g) {
        try {
            if (this.DoDrawBack(sender, g)) {
                return true;
            }
            if (this.Selected) {
                g.FillRect(Palette.A3399FF80, this.Left, this.Top, this.Width, this.Height);
            }
            this.Style.option.shape.cx = this.Left + this.Width / 2;
            this.Style.option.shape.cy = this.Top + this.Width / 2;
            this.Style.option.shape.r = Math.abs(this.Width / 2);
            g.DrawPrimitiveCircle(this.Style, this.Animation);
        }
        catch (e) {
            DataExcelConsole.log("DisplayableCircle OnDrawBack", e);
        }
        return false;
    }
    OnMouseDown(sender, e, ve) {
        if (this.DoMouseDown(sender, e, ve)) {
            ve.NeedRePaint = true;
            ve.CurrentEvent = this;
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
    OnMouseUp(sender, e, ve) {
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
    OnMouseMove(sender, e, ve) {
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
}
class DisplayableLine extends Displayable {
    constructor() {
        super();
        this.Points = null;
        this.lastpoint = null;
        this._Animation = true;
        this.init = true;
        this.Points = new List();
        let style = {
            option: {
                style: {
                    lineDash: [10, 10],
                    stroke: 'rgba(220, 20, 60, 0.8)',
                    lineWidth: 1,
                    shadowBlur: 8,
                    shadowColor: 'rgba(255, 255, 255, 0.8)',
                },
                shape: {
                    points: [],
                    smooth: 0
                },
            },
            animate: [
                {
                    type: "style", interval: 2500, value: { lineWidth: 7, shadowBlur: 18, stroke: "white" },
                    animate: { interval: 5000, value: { lineWidth: 1, shadowBlur: 8, stroke: "rgba(220, 20, 60, 0.8)" } }
                },
                {
                    type: "shape", interval: 3000, value: { smooth: 1 },
                    animate: { interval: 6000, value: { smooth: 0 } }
                }
            ]
        };
        this._Style = style;
    }
    //private lasttime: Date;
    get TypeName() {
        return DisplayableBuild.line;
    }
    get Animation() {
        return this._Animation;
    }
    set Animation(value) {
        this._Animation = value;
    }
    get Style() {
        return this._Style;
    }
    set Style(value) {
        this._Style = value;
    }
    GetData() {
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
            style: this.Style,
            animation: this.Animation,
            points: [],
        };
        let points = [];
        this.Points.forEach((point) => {
            points.push([point.X, point.Y]);
        });
        data.points = points;
        return data;
    }
    SetData(grid, data) {
        this.init = false;
        this.Name = data.name;
        this.Height = data.height;
        this.Left = data.left;
        this.Top = data.top;
        this.Width = data.width;
        this.BackColor = data.backcolor;
        this.BackImage = data.backimage;
        this.BackImageImageLayout = data.backimageimagelayout;
        this.Style = data.style;
        this.Animation = data.animation;
        let len = data.points.length;
        for (let i = 0; i < len; i++) {
            let itemdata = data.points[i];
            let x = itemdata[0];
            let y = itemdata[1];
            this.Points.add(new Point(x, y));
        }
    }
    OnDrawBack(sender, g) {
        try {
            if (this.DoDrawBack(sender, g)) {
                return true;
            }
            if (this.Selected) {
                g.FillRect(Palette.A3399FF80, this.Left, this.Top, this.Width, this.Height);
            }
            let points = [];
            let zoomx = 1;
            let zoomy = 1;
            this.Points.forEach((point) => {
                points.push([(point.X * zoomx), (point.Y * zoomy)]);
            });
            if (this.DesignMode) {
                if (this.lastpoint != null) {
                    points.push([(this.lastpoint.X * zoomx), (this.lastpoint.Y * zoomy)]);
                }
            }
            this.Style.option.shape.points = points;
            g.DrawPolyline(this.Style, this.Animation);
        }
        catch (e) {
            DataExcelConsole.log("DisplayableLine OnDisplayDrawBack", e);
        }
        return false;
    }
    OnMouseDown(sender, e, ve) {
        if (this.DoMouseDown(sender, e, ve)) {
            return true;
        }
        if (!this.Primitive.Rect.Contains(ve.offsetPoint)) {
            this.DesignMode = false;
            return false;
        }
        if (e.button == MouseButtons.Right) {
            if (this.DesignMode) {
                this.DesignMode = false;
                return true;
            }
        }
        if (this.init) {
            this.init = false;
            let pt = new Point(ve.offsetPoint.X, ve.offsetPoint.Y);
            this.Points.Add(pt);
            this.DesignMode = true;
            //this.lasttime = new Date();
            //this.Primitive.OpenTime();
            this.lastpoint = null;
            ve.NeedRePaint = true;
            ve.CurrentEvent = this;
            return true;
        }
        if (this.DesignMode) {
            let pt = new Point(ve.offsetPoint.X, ve.offsetPoint.Y);
            this.Points.Add(pt);
            this.DesignMode = true;
            //this.lasttime = new Date();
            //this.Primitive.OpenTime();
            this.lastpoint = null;
            ve.NeedRePaint = true;
            ve.CurrentEvent = this;
            return true;
        }
        return false;
    }
    OnMouseUp(sender, e, ve) {
        if (this.DoMouseUp(sender, e, ve)) {
            return true;
        }
        return false;
    }
    OnMouseMove(sender, e, ve) {
        if (this.DoMouseMove(sender, e, ve)) {
            return true;
        }
        if (this.DesignMode) {
            this.lastpoint = new Point(ve.offsetPoint.X, ve.offsetPoint.Y);
            ve.NeedRePaint = true;
            ve.CurrentEvent = this;
            return true;
        }
        return false;
    }
    OnMouseDoubleClick(sender, e, ve) {
        if (this.DesignMode) {
            this.DesignMode = false;
            return true;
        }
        return false;
    }
}
class DisplayableList extends List {
    constructor() {
        super();
    }
    Clear() {
        this.clear();
    }
    Remove(row) {
        this.remove(row);
    }
    Get(index) {
        return this.get(index);
    }
}
class DisplayableRect extends Displayable {
    constructor() {
        super();
        this._Animation = true;
        this.init = true;
        let style = {
            option: {
                style: {
                    lineDash: [10, 10],
                    stroke: 'rgba(220, 20, 60, 0.8)',
                    lineWidth: 1,
                    shadowBlur: 8,
                    shadowColor: 'rgba(255, 255, 255, 0.8)',
                    fill: 'rgba(255, 255, 255, 0)',
                },
                shape: {
                    x: 110,
                    y: 10,
                    width: 101,
                    height: 100,
                    smooth: 1,
                    r: 10
                },
            },
            animate: [
                {
                    type: "style", interval: 3000, value: { lineWidth: 7, shadowBlur: 18, stroke: "white" },
                    animate: {
                        interval: 6000, value: { lineWidth: 1, shadowBlur: 8, stroke: "rgba(220, 20, 60, 0.8)", }
                    }
                },
                {
                    type: "shape", interval: 3000, value: { smooth: 0 },
                    animate: { interval: 6000, value: { smooth: 1 } },
                }
            ]
        };
        this._Style = style;
    }
    get TypeName() {
        return DisplayableBuild.rect;
    }
    get Animation() {
        return this._Animation;
    }
    set Animation(value) {
        this._Animation = value;
    }
    get Style() {
        return this._Style;
    }
    set Style(value) {
        this._Style = value;
    }
    GetData() {
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
            style: this.Style,
            animation: this.Animation,
        };
        return data;
    }
    SetData(grid, data) {
        this.Name = data.name;
        this.Height = data.height;
        this.Left = data.left;
        this.Top = data.top;
        this.Width = data.width;
        this.BackColor = data.backcolor;
        this.BackImage = data.backimage;
        this.BackImageImageLayout = data.backimageimagelayout;
        this.Style = data.style;
        this.Animation = data.animation;
    }
    OnDrawBack(sender, g) {
        try {
            if (this.DoDrawBack(sender, g)) {
                return true;
            }
            if (this.Selected) {
                g.FillRect(Palette.A3399FF80, this.Left, this.Top, this.Width, this.Height);
            }
            this.Style.option.shape.x = this.Left;
            this.Style.option.shape.y = this.Top;
            this.Style.option.shape.width = this.Width;
            this.Style.option.shape.height = this.Height;
            g.DrawPrimitiveRect(this.Style, this.Animation);
        }
        catch (e) {
            DataExcelConsole.log("DisplayableLine OnDisplayDrawBack", e);
        }
        return false;
    }
    OnMouseDown(sender, e, ve) {
        if (this.DoMouseDown(sender, e, ve)) {
            ve.NeedRePaint = true;
            ve.CurrentEvent = this;
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
    OnMouseUp(sender, e, ve) {
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
    OnMouseMove(sender, e, ve) {
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
}
class DisplayableText extends Displayable {
    constructor() {
        super();
        this._Animation = true;
        this._Text = "";
        this.init = true;
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
                }
            ]
        };
        this._Style = style;
        this.Width = 200;
        this.Height = 30;
    }
    get TypeName() {
        return DisplayableBuild.text;
    }
    get Animation() {
        return this._Animation;
    }
    set Animation(value) {
        this._Animation = value;
    }
    get Text() {
        return this._Text;
    }
    set Text(value) {
        this._Text = value;
    }
    get Style() {
        return this._Style;
    }
    set Style(value) {
        this._Style = value;
    }
    GetData() {
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
            style: this.Style,
            animation: this.Animation,
            text: this.Text,
        };
        return data;
    }
    SetData(grid, data) {
        this.Name = data.name;
        this.Height = data.height;
        this.Left = data.left;
        this.Top = data.top;
        this.Width = data.width;
        this.BackColor = data.backcolor;
        this.BackImage = data.backimage;
        this.BackImageImageLayout = data.backimageimagelayout;
        this.Style = data.style;
        this.Animation = data.animation;
        this.Text = data.text;
    }
    OnDrawBack(sender, g) {
        try {
            if (this.DoDrawBack(sender, g)) {
                return true;
            }
            if (this.Selected) {
                g.FillRect(Palette.A3399FF80, this.Left, this.Top, this.Width, this.Height);
            }
            this.Style.option.position = [this.Left, this.Top];
            this.Style.option.style.text = this.Text;
            g.DrawPrimitiveText(this.Style, true); // this.Animation); 
        }
        catch (e) {
            DataExcelConsole.log("DisplayableCircle OnDrawBack", e);
        }
        return false;
    }
    OnMouseDown(sender, e, ve) {
        if (this.DoMouseDown(sender, e, ve)) {
            ve.NeedRePaint = true;
            ve.CurrentEvent = this;
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
    OnMouseUp(sender, e, ve) {
        if (this.DoMouseUp(sender, e, ve)) {
            return true;
        }
        return false;
    }
    OnMouseMove(sender, e, ve) {
        if (this.DoMouseMove(sender, e, ve)) {
            return true;
        }
        return false;
    }
}
////class Test
////{
////    Name(): string
////    {
////        return "这是一个测试";
////    }
////    Test2()
////    {
////        let grid = new DataExcel();
////        grid.FrozenColumn = grid.FocusedCell.Column.Index;
////        grid.FrozenRow = grid.FocusedCell.Row.Index;
////    }
////}
var StateMode;
(function (StateMode) {
    StateMode[StateMode["NULL"] = 0] = "NULL";
    StateMode[StateMode["MOVE"] = 1] = "MOVE";
    StateMode[StateMode["SIZE"] = 2] = "SIZE";
})(StateMode || (StateMode = {}));
class MoveView {
    constructor() {
        this._height = 0;
        this._left = 0;
        this._top = 0;
        this._width = 0;
    }
    get Height() {
        return this._height;
    }
    set Height(value) {
        this._height = value;
    }
    get Right() {
        return this._left + this.Width;
    }
    get Bottom() {
        return this.Top + this.Height;
    }
    get Left() {
        return this._left;
    }
    set Left(value) {
        this._left = value;
    }
    get Top() {
        return this._top;
    }
    set Top(value) {
        this._top = value;
    }
    get Width() {
        return this._width;
    }
    set Width(value) {
        this._width = value;
    }
    get Rect() {
        let rect = new Rect(0, 0, 0, 0);
        rect.X = this.Left;
        rect.Y = this.Top;
        rect.Width = this.Width;
        rect.Height = this.Height;
        return rect;
    }
    get MouseDownPoint() {
        return this._MouseDownPoint;
    }
    set MouseDownPoint(value) {
        this._MouseDownPoint = value;
    }
    get StateMode() {
        return this._StateMode_1;
    }
    set StateMode(value) {
        this._StateMode_1 = value;
    }
    OnMouseDown(sender, e, ve) {
        if (this.Rect.Contains(ve.ViewPoint)) {
            this.MouseDownPoint = ve.Point;
            this.StateMode = StateMode.MOVE;
            return true;
        }
        return false;
    }
    OnMouseUp(sender, e, ve) {
        this.StateMode = StateMode.NULL;
        return false;
    }
    OnMouseMove(sender, e, ve) {
        if (this.StateMode == StateMode.MOVE) {
            let x = ve.offsetPoint.X - this.MouseDownPoint.X;
            let y = ve.offsetPoint.Y - this.MouseDownPoint.Y;
            this.Left = this.Left + x;
            this.Top = this.Top + y;
            return true;
        }
        return false;
    }
    OnMouseDoubleClick(sender, e, ve) {
        return false;
    }
    OnKeyPress(sender, e, ve) {
        return false;
    }
    OnKeyDown(sender, e, ve) {
        return false;
    }
    OnTouchStart(sender, e, ve) {
        return false;
    }
    OnTouchMove(sender, e, ve) {
        return false;
    }
    OnTouchEnd(sender, e, ve) {
        return false;
    }
}
var SizeChangMode;
(function (SizeChangMode) {
    SizeChangMode[SizeChangMode["Null"] = 0] = "Null";
    SizeChangMode[SizeChangMode["TopLeft"] = 1] = "TopLeft";
    SizeChangMode[SizeChangMode["TopRight"] = 2] = "TopRight";
    SizeChangMode[SizeChangMode["MidLeft"] = 3] = "MidLeft";
    SizeChangMode[SizeChangMode["MidRight"] = 4] = "MidRight";
    SizeChangMode[SizeChangMode["BoomLeft"] = 5] = "BoomLeft";
    SizeChangMode[SizeChangMode["BoomRight"] = 6] = "BoomRight";
    SizeChangMode[SizeChangMode["MidTop"] = 7] = "MidTop";
    SizeChangMode[SizeChangMode["MidBoom"] = 8] = "MidBoom";
})(SizeChangMode || (SizeChangMode = {}));
class ReSizeView {
    constructor() {
        this._height = 0;
        this._left = 0;
        this._top = 0;
        this._width = 0;
    }
    get Height() {
        return this._height;
    }
    set Height(value) {
        this._height = value;
    }
    get Right() {
        return this._left + this.Width;
    }
    get Bottom() {
        return this.Top + this.Height;
    }
    get Left() {
        return this._left;
    }
    set Left(value) {
        this._left = value;
    }
    get Top() {
        return this._top;
    }
    set Top(value) {
        this._top = value;
    }
    get Width() {
        return this._width;
    }
    set Width(value) {
        this._width = value;
    }
    get Rect() {
        let rect = new Rect(0, 0, 0, 0);
        rect.X = this.Left;
        rect.Y = this.Top;
        rect.Width = this.Width;
        rect.Height = this.Height;
        return rect;
    }
    get MouseDownPoint() {
        return this._MouseDownPoint;
    }
    set MouseDownPoint(value) {
        this._MouseDownPoint = value;
    }
    get MouseDownsize() {
        return this._MouseDownsize;
    }
    set MouseDownsize(value) {
        this._MouseDownsize = value;
    }
    get StateMode() {
        return this._StateMode_1;
    }
    set StateMode(value) {
        this._StateMode_1 = value;
    }
    OnMouseDown(sender, e, ve) {
        if (this.Rect.Contains(ve.ViewPoint)) {
            this.MouseDownPoint = ve.Point;
            this.StateMode = StateMode.MOVE;
            return true;
        }
        return false;
    }
    OnMouseUp(sender, e, ve) {
        this.StateMode = StateMode.NULL;
        return false;
    }
    OnMouseMove(sender, e, ve) {
        if (this.StateMode == StateMode.MOVE) {
            let x = ve.offsetPoint.X - this.MouseDownPoint.X;
            let y = ve.offsetPoint.Y - this.MouseDownPoint.Y;
            this.Left = this.Left + x;
            this.Top = this.Top + y;
            return true;
        }
        return false;
    }
    OnMouseDoubleClick(sender, e, ve) {
        return false;
    }
    OnKeyPress(sender, e, ve) {
        return false;
    }
    OnKeyDown(sender, e, ve) {
        return false;
    }
    OnTouchStart(sender, e, ve) {
        return false;
    }
    OnTouchMove(sender, e, ve) {
        return false;
    }
    OnTouchEnd(sender, e, ve) {
        return false;
    }
    SetDataExcelMouseDown(ve) {
        let pt = ve.offsetPoint;
        this.MouseDownPoint = ve.offsetPoint;
        this.MouseDownsize = new Size(this.Width, this.Height);
        let result = false;
        if (this.TopLeft.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.TopLeft;
            result = true;
        }
        else if (this.TopRight.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.TopRight;
            result = true;
        }
        else if (this.BottomLeft.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.BoomLeft;
            result = true;
        }
        else if (this.BottomRight.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.BoomRight;
            result = true;
        }
        else if (this.MidTop.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.MidTop;
            result = true;
        }
        else if (this.MidBottom.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.MidBoom;
            result = true;
        }
        else if (this.MidLeft.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.MidLeft;
            result = true;
        }
        else if (this.MidRight.Contains(pt)) {
            this.SizeChangMode = SizeChangMode.MidRight;
            result = true;
        }
        return result;
    }
    ChangedSize(ve) {
        let location = ve.offsetPoint; // e.Location;
        let sf = new Size(location.X - this.MouseDownPoint.X, location.Y - this.MouseDownPoint.Y);
        switch (this.SizeChangMode) {
            case SizeChangMode.Null:
                break;
            case SizeChangMode.TopLeft:
                this.Width = this.MouseDownSize.Width - sf.Width;
                this.Height = this.MouseDownSize.Height - sf.Height;
                this.Top = location.Y; // this.MouseDownPoint.Y + sf.Height;
                this.Left = location.X; // this.MouseDownPoint.X + sf.Width;
                break;
            case SizeChangMode.TopRight:
                this.Width = this.MouseDownSize.Width + sf.Width;
                this.Height = this.MouseDownSize.Height - sf.Height;
                this.Top = location.Y; // this.MouseDownPoint.Y + sf.Height;
                break;
            case SizeChangMode.MidLeft:
                this.Width = this.MouseDownSize.Width - sf.Width;
                this.Left = this.MouseDownPoint.X + sf.Width;
                break;
            case SizeChangMode.MidRight:
                this.Width = this.MouseDownSize.Width + sf.Width;
                break;
            case SizeChangMode.BoomLeft:
                this.Width = this.MouseDownSize.Width - sf.Width;
                this.Height = this.MouseDownSize.Height + sf.Height;
                this.Left = this.MouseDownPoint.X + sf.Width;
                break;
            case SizeChangMode.BoomRight:
                this.Width = this.MouseDownSize.Width + sf.Width;
                this.Height = this.MouseDownSize.Height + sf.Height;
                break;
            case SizeChangMode.MidTop:
                this.Height = this.MouseDownSize.Height - sf.Height;
                this.Top = this.MouseDownPoint.Y + sf.Height;
                break;
            case SizeChangMode.MidBoom:
                this.Height = this.MouseDownSize.Height + sf.Height;
                break;
            default:
                break;
        }
    }
    get MouseDownSize() {
        return this._MouseDownSize;
    }
    set MouseDownSize(value) {
        this._MouseDownSize = value;
    }
    get SizeChangMode() {
        return this._SizeChangMode;
    }
    set SizeChangMode(value) {
        this._SizeChangMode = value;
    }
    get TopLeft() {
        let rectf = this.Rect;
        rectf = new Rect(rectf.Left, rectf.Top, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }
    get TopRight() {
        let rectf = this.Rect;
        rectf = new Rect(rectf.Right - this._SelectBorderWidth, rectf.Top, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }
    get BottomLeft() {
        let rectf = this.Rect;
        rectf = new Rect(rectf.Left, rectf.Bottom - this._SelectBorderWidth, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }
    get BottomRight() {
        let rectf = this.Rect;
        rectf = new Rect(rectf.Right - this._SelectBorderWidth, rectf.Bottom - this._SelectBorderWidth, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }
    get MidTop() {
        let rectf = this.Rect;
        rectf = new Rect(rectf.Left + rectf.Width / 2 - this._SelectBorderWidth / 2, rectf.Top, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }
    get MidBottom() {
        let rectf = this.Rect;
        rectf = new Rect(rectf.Left + rectf.Width / 2 - this._SelectBorderWidth / 2, rectf.Bottom - this._SelectBorderWidth, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }
    get MidLeft() {
        let rectf = this.Rect;
        rectf = new Rect(rectf.Left, rectf.Top + rectf.Height / 2 - this._SelectBorderWidth / 2, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }
    get MidRight() {
        let rectf = this.Rect;
        rectf = new Rect(rectf.Right - this._SelectBorderWidth, rectf.Top + rectf.Height / 2 - this._SelectBorderWidth / 2, this._SelectBorderWidth, this._SelectBorderWidth);
        return rectf;
    }
}
//# sourceMappingURL=dataexcel.js.map