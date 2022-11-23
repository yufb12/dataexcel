var ConstantValue =
{

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

}

var Border =
{
    all: "all",
    left: "left",
    right: "right",
    top: "top",
    bottom: "bottom",
}

var TextAlgin = {
    left: 'left',
    right: 'right',
    top: 'top',
    bottom: 'bottom',
    topleft: 'topleft',
    topright: 'topright',
    bottomleft: 'bottomleft',
    bottomright: 'bottomright'
}

var FormatType =
{
    Null: "",
    Date: "Date",
    Num: "Num"
}

var CheckState = {
    Check: 1,
    Unkown: 2,
    UnCheck: 0
}

export {ConstantValue,Border,TextAlgin,FormatType,CheckState}