enum EditMode
{
    NULL = 0, 
    IME = 2,
    F2 = 4,
    DoubleClick = 8,
    Edit = 16, 
    Focused = 32,
    KeyDown = 64,
    Click = 128,
    MouseEnter = 256,
    Default = IME | F2 | DoubleClick,
    ALL = IME | F2 | DoubleClick | Focused | KeyDown | Click
}
export {EditMode}