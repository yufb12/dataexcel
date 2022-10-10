class FJsonParse {
    constructor() {
        this.symbolTable = null;
        this.JsonCreate = null;
        this.JsonObj = null;
    }
    static Parese(text) {
        let value = FJsonParse.Parese2(text, null, null);
        return value;
    }
    static Parese2(text, JsonObjCreate, obj) {
        if (FJsonParse.instance == null) {
            FJsonParse.instance = new FJsonParse();
        }
        let symbol = FJsonLexer.GetSymbolTable(text);
        FJsonParse.instance.Init(JsonObjCreate, obj);
        return FJsonParse.instance.ParseTable(symbol);
    }
    Init(jsonobjcreate, obj) {
        this.JsonCreate = jsonobjcreate;
        this.JsonObj = obj;
    }
    OnJsonObjCreate(json) {
        if (this.JsonCreate != null) {
            this.JsonCreate(json, this.JsonObj);
        }
    }
    ParseTable(table) {
        this.symbolTable = table;
        let jsonobj = this.Parse_E_Rule();
        return jsonobj;
    }
    Parse_E_Rule() {
        let token = this.symbolTable.Peek();
        if (token == FJsonToken.End)
            return null;
        if (token.Type == FJsonTokenType.LBRACKET) {
            token = this.symbolTable.Pop();
            let objres = [];
            token = this.symbolTable.Peek();
            if (token.Type != FJsonTokenType.RBRACKET) {
                let obj = this.Parse_T_Rule();
                objres.push(obj);
                token = this.symbolTable.Peek();
                if (token == FJsonToken.End) {
                    this.Error(token, 1001, "Not Finish");
                }
                while (token.Type == FJsonTokenType.COMMA) {
                    token = this.symbolTable.Pop();
                    obj = this.Parse_T_Rule();
                    objres.push(obj);
                    token = this.symbolTable.Peek();
                }
            }
            if (token.Type != FJsonTokenType.RBRACKET) {
                this.Error(token, 1002, "Not Finish Symbol Invalid");
            }
            token = this.symbolTable.Pop();
            this.OnJsonObjCreate(objres);
            return objres;
        }
        else {
            return this.Parse_T_Rule();
        }
    }
    Parse_T_Rule() {
        let token = this.symbolTable.Peek();
        if (token == FJsonToken.End)
            return null;
        if (token.Type == FJsonTokenType.LBRACE) {
            token = this.symbolTable.Pop();
            let objres = {};
            token = this.symbolTable.Peek();
            if (token.Type != FJsonTokenType.RBRACE) {
                let obj = this.Parse_F_Rule(objres);
                token = this.symbolTable.Peek();
                if (token == FJsonToken.End) {
                    this.Error(token, 3001, "Not Finish");
                }
                while (token.Type == FJsonTokenType.COMMA) {
                    token = this.symbolTable.Pop();
                    obj = this.Parse_F_Rule(objres);
                    token = this.symbolTable.Peek();
                }
            }
            if (token.Type != FJsonTokenType.RBRACE) {
                this.Error(token, 3002, "Not Finish");
            }
            token = this.symbolTable.Pop();
            this.OnJsonObjCreate(objres);
            return objres;
        }
        else {
            token = this.symbolTable.Peek();
            if (token.Type > 9) {
                return this.Parse_E_Rule();
            }
            token = this.symbolTable.Pop();
            let value = token.ToValue();
            return value;
        }
    }
    Parse_F_Rule(pobj) {
        if (this.symbolTable.Peek() == FJsonToken.End) {
            return null;
        }
        let token = this.symbolTable.Peek();
        if (token.Type != FJsonTokenType.STRING) {
            this.Error(token, 5004, "Symbol Invalid");
        }
        token = this.symbolTable.Pop();
        let key = token.OrgValue;
        if (this.symbolTable.Peek() == FJsonToken.End) {
            this.Error(token, 5005, "Accident  Finish");
        }
        token = this.symbolTable.Peek();
        if (token.Type != FJsonTokenType.COLON) {
            this.Error(token, 5006, "Symbol Invalid");
        }
        token = this.symbolTable.Pop();
        let value = this.Parse_E_Rule();
        pobj[key] = value;
    }
    Error(token, errorcode, error) {
        throw new FJsonException("Key:【" + token.OrgValue + "】 Row:" + token.Index + " Column:" + token.Column + " ErrorCode:" + errorcode + "." + error);
    }
}
FJsonParse.instance = null;
class FJsonLexer {
    constructor() {
        this.text = "";
        this.position = 0;
        this.table = null;
        this.empty = ' ';
        this.rowindex = 0;
        this.columnindex = 0;
        this.ID = 0;
        this.sb = new FJsonStringBuilder();
    }
    static GetSymbolTable(text) {
        if (FJsonLexer.lexer == null) {
            FJsonLexer.lexer = new FJsonLexer();
        }
        return FJsonLexer.lexer.Parse(text);
    }
    Parse(input) {
        if (this.table == null) {
            this.table = new FJsonSymbolTable();
        }
        this.table.Tokens.Clear();
        this.table.ReSetPosition();
        this.text = input;
        this.position = -1;
        this.rowindex = 0;
        this.columnindex = 0;
        while (!this.IsEnd()) {
            this.ClearEmpty();
            if (!this.HasNext()) {
                break;
            }
            let c = this.NextChar();
            let token = this.GetToken(c);
            if (token.Type != FJsonTokenType.Comments) {
                this.table.Tokens.Add(token);
            }
        }
        return this.table;
    }
    Forword() {
        this.columnindex++;
        this.position++;
        if (!this.IsEnd()) {
            let c = this.text[this.position];
            if (c == '\n') {
                this.rowindex++;
            }
        }
    }
    Back() {
        this.columnindex--;
        this.position--;
    }
    IsEnd() {
        return this.position >= this.text.length - 1;
    }
    GetToken(c) {
        switch (c) {
            case '\"':
                this.Forword();
                let value = this.ReadString();
                return new FJsonToken(this.ID++, FJsonTokenType.STRING, value, this.rowindex, this.columnindex);
            case '\'':
                this.Forword();
                let value2 = this.ReadString2();
                return new FJsonToken(this.ID++, FJsonTokenType.STRING, value2, this.rowindex, this.columnindex);
            case '{':
                this.Forword();
                return new FJsonToken(this.ID++, FJsonTokenType.LBRACE, '{', this.rowindex, this.columnindex);
            case '}':
                this.Forword();
                return new FJsonToken(this.ID++, FJsonTokenType.RBRACE, '}', this.rowindex, this.columnindex);
            case '[':
                this.Forword();
                return new FJsonToken(this.ID++, FJsonTokenType.LBRACKET, '[', this.rowindex, this.columnindex);
            case ']':
                this.Forword();
                return new FJsonToken(this.ID++, FJsonTokenType.RBRACKET, ']', this.rowindex, this.columnindex);
            case ',':
                this.Forword();
                return new FJsonToken(this.ID++, FJsonTokenType.COMMA, ',', this.rowindex, this.columnindex);
            case ':':
                this.Forword();
                return new FJsonToken(this.ID++, FJsonTokenType.COLON, ':', this.rowindex, this.columnindex);
            case 'F':
            case 'f':
                this.Forword();
                if (this.HasLenChar("false".length)) {
                    let strTrue = this.NextString("false".length).toLowerCase();
                    if (strTrue == "false") {
                        this.Forword2("false".length - 1);
                        return new FJsonToken(this.ID++, FJsonTokenType.FALSE, strTrue, this.rowindex, this.columnindex);
                    }
                }
                this.Back();
                return this.ReadVar(c);
            case 'T':
            case 't':
                this.Forword();
                if (this.HasLenChar("true".length)) {
                    let strTrue = this.NextString("true".length).toLowerCase();
                    if (strTrue == "true") {
                        this.Forword2("true".length - 1);
                        return new FJsonToken(this.ID++, FJsonTokenType.TRUE, strTrue, this.rowindex, this.columnindex);
                    }
                }
                this.Back();
                return this.ReadVar(c);
            case 'N':
            case 'n':
                this.Forword();
                if (this.HasLenChar("null".length)) {
                    let strTrue = this.NextString("null".length).toLowerCase();
                    if (strTrue == "null") {
                        this.Forword2("null".length - 1);
                        return new FJsonToken(this.ID++, FJsonTokenType.NULL, strTrue, this.rowindex, this.columnindex);
                    }
                }
                this.Back();
                return this.ReadVar(c);
            case '/':
                this.Forword();
                if (this.NextChar() == '/') {
                    this.Forword();
                    let valueComments = this.ReadComments();
                    return new FJsonToken(this.ID++, FJsonTokenType.Comments, valueComments, this.rowindex, this.columnindex);
                }
                throw new FJsonException("Comments error " + "c=" + c + " position:" + this.text.substr(this.position - 15, this.position) + "Row=" + this.rowindex + " Column=" + this.columnindex);
            case '-':
                this.Forword();
                let dvalue2 = this.ReadDecimal();
                return new FJsonToken(this.ID++, FJsonTokenType.NUMBER, dvalue2, this.rowindex, this.columnindex);
            default:
                if (FJsonChar.IsNumber(c)) {
                    this.Forword();
                    let dvalue = this.ReadDecimal();
                    return new FJsonToken(this.ID++, FJsonTokenType.NUMBER, dvalue, this.rowindex, this.columnindex);
                }
                else if (FJsonChar.IsLetter(c)) {
                    return this.ReadVar(c);
                }
                let t = this.text.substr(this.position - 15, 15);
                throw new FJsonException("error " + "c=" + c + " position:" + t + "Row=" + this.rowindex + " Column=" + this.columnindex);
        }
    }
    ReadVar(c) {
        switch (c) {
            case '_':
            case 'a':
            case 'b':
            case 'c':
            case 'd':
            case 'e':
            case 'f':
            case 'g':
            case 'h':
            case 'i':
            case 'j':
            case 'k':
            case 'l':
            case 'm':
            case 'n':
            case 'o':
            case 'p':
            case 'q':
            case 'r':
            case 's':
            case 't':
            case 'u':
            case 'v':
            case 'w':
            case 'x':
            case 'y':
            case 'z':
            case 'A':
            case 'B':
            case 'C':
            case 'D':
            case 'E':
            case 'F':
            case 'G':
            case 'H':
            case 'I':
            case 'J':
            case 'K':
            case 'L':
            case 'M':
            case 'N':
            case 'O':
            case 'P':
            case 'Q':
            case 'R':
            case 'S':
            case 'T':
            case 'U':
            case 'V':
            case 'W':
            case 'X':
            case 'Y':
            case 'Z':
                this.Forword();
                let str = this.ReadVarText(c);
                return new FJsonToken(this.ID++, FJsonTokenType.STRING, str, this.rowindex, this.columnindex);
            default:
                throw new FJsonException("error Row=" + this.rowindex + " Column=" + this.columnindex);
        }
    }
    ReadVarText(c) {
        let sb = new FJsonStringBuilder();
        sb.Append(c);
        while (this.HasNext()) {
            c = this.NextChar();
            if (FJsonChar.IsLetter(c)) {
                sb.Append(c);
            }
            else if (FJsonChar.IsNumber(c)) {
                sb.Append(c);
            }
            else if (c == '_') {
                sb.Append(c);
            }
            else {
                break;
            }
            this.Forword();
        }
        return sb.ToString();
    }
    Forword2(count) {
        this.columnindex = this.columnindex + count;
        this.position = this.position + count;
    }
    HasLenChar(count) {
        return this.position + count < this.text.length;
    }
    NextString(count) {
        this.sb.clear();
        for (let i = 0; i < count; i++) {
            this.sb.Append(this.text[this.position + i]);
        }
        return this.sb.ToString();
    }
    ReadComments() {
        this.sb.Length = 0;
        this.Forword();
        while (!this.IsEnd()) {
            let c = this.currentChar;
            if (c == '\\') {
                let c2 = this.ReadNextChar();
                switch (c2) {
                    case '\b':
                        this.sb.Append('\b');
                        break;
                    case '\n':
                        this.sb.Append('\n');
                        break;
                    case '\r':
                        this.sb.Append('\r');
                        break;
                    case '\t':
                        this.sb.Append('\t');
                        break;
                    case '\f':
                        this.sb.Append('\f');
                        break;
                    case '\\':
                        this.sb.Append('\\');
                        break;
                    case '\"':
                        this.sb.Append('\"');
                        break;
                    case '/':
                        this.sb.Append(c2);
                        break;
                    case 'u':
                        let s = "" + this.ReadNextChar();
                        s = s + this.ReadNextChar();
                        s = s + this.ReadNextChar();
                        s = s + this.ReadNextChar();
                        let uchar = unescape(s);
                        this.sb.Append(uchar);
                        this.Forword();
                        break;
                    default:
                        this.sb.Append(c);
                        this.sb.Append(c2);
                        break;
                }
                continue;
            }
            if (c == '\n') {
                this.rowindex++;
                break;
            }
            this.Forword();
            this.sb.Append(c);
        }
        let value = this.sb.ToString();
        return value;
    }
    ReadNextChar() {
        this.Forword();
        if (this.IsEnd()) {
            throw new FJsonException("error Row=" + this.rowindex + " Column=" + this.columnindex);
        }
        return this.text[this.position];
    }
    HasNext() {
        return (this.position + 1) < this.text.length;
    }
    NextChar() {
        return this.text[this.position + 1];
    }
    get currentChar() {
        return this.text[this.position];
    }
    ReadDecimal() {
        let d = 0;
        this.sb.clear();
        let c = this.currentChar;
        this.sb.Append(c);
        while (!this.IsEnd()) {
            if (this.HasNext()) {
                c = this.NextChar();
                if (FJsonChar.IsNumber(c)) {
                    this.Forword();
                    c = this.currentChar;
                    this.sb.Append(c);
                    continue;
                }
                break;
            }
        }
        if (this.HasNext()) {
            c = this.NextChar();
            if (c == '.') {
                this.Forword();
                c = this.currentChar;
                this.sb.Append(c);
                c = this.ReadNextChar();
                if (!FJsonChar.IsNumber(c)) {
                    throw new FJsonException("number error row:" + this.rowindex + " column:" + this.columnindex);
                }
                this.sb.Append(c);
            }
            while (!this.IsEnd()) {
                if (this.HasNext()) {
                    c = this.NextChar();
                    if (FJsonChar.IsNumber(c)) {
                        this.Forword();
                        c = this.currentChar;
                        this.sb.Append(c);
                        continue;
                    }
                    break;
                }
            }
        }
        d = FJsonConvertHelper.ToDecimal(this.sb.ToString());
        return d;
    }
    ReadString() {
        this.sb.clear();
        this.Forword();
        while (!this.IsEnd()) {
            let c = this.text[this.position];
            if (c == '\\') {
                let c2 = this.ReadNextChar();
                switch (c2) {
                    case '\b':
                    case '\n':
                    case '\r':
                    case '\t':
                    case '\f':
                    case '\\':
                    case '\"':
                    case '/':
                        this.sb.Append(c2);
                        break;
                    case 'u':
                        let s = "" + this.ReadNextChar();
                        s = s + this.ReadNextChar();
                        s = s + this.ReadNextChar();
                        s = s + this.ReadNextChar();
                        let uchar = unescape(s);
                        this.sb.Append(uchar);
                        this.Forword();
                        break;
                    default:
                        this.sb.Append(c);
                        this.sb.Append(c2);
                        break;
                }
                continue;
            }
            if (c == '\"') {
                break;
            }
            this.Forword();
            this.sb.Append(c);
        }
        let value = this.sb.ToString();
        return value;
    }
    ReadString2() {
        this.sb.clear();
        this.Forword();
        while (!this.IsEnd()) {
            let c = this.text[this.position];
            if (c == '\\') {
                let c2 = this.ReadNextChar();
                switch (c2) {
                    case '\b':
                    case '\n':
                    case '\r':
                    case '\t':
                    case '\f':
                    case '\\':
                    case '\"':
                    case '/':
                        this.sb.Append(c2);
                        break;
                    case 'u':
                        let s = "" + this.ReadNextChar();
                        s = s + this.ReadNextChar();
                        s = s + this.ReadNextChar();
                        s = s + this.ReadNextChar();
                        let uchar = unescape(s);
                        this.sb.Append(uchar);
                        this.Forword();
                        break;
                    default:
                        this.sb.Append(c);
                        this.sb.Append(c2);
                        break;
                }
                continue;
            }
            if (c == '\'') {
                break;
            }
            this.Forword();
            this.sb.Append(c);
        }
        let value = this.sb.ToString();
        return value;
    }
    ClearEmpty() {
        let c = ' ';
        while (this.HasNext()) {
            c = this.NextChar();
            if (!FJsonChar.IsWhiteSpace(c)) {
                break;
            }
            if (c == '\n') {
                this.rowindex++;
                this.columnindex = 0;
            }
            this.Forword();
        }
    }
}
FJsonLexer.lexer = null;
class FJsonSymbolTable {
    constructor() {
        this.position = 0;
        this.Tokens = new FJsonList();
    }
    Pop() {
        if (this.position < this.Tokens.Count) {
            let token = this.Tokens[this.position];
            this.position++;
            return token;
        }
        return FJsonToken.End;
    }
    Peek() {
        if (this.position < this.Tokens.Count) {
            let token = this.Tokens[this.position];
            return token;
        }
        return FJsonToken.End;
    }
    Push(token) {
        this.Tokens.Add(token);
    }
    ReSetPosition() {
        this.position = 0;
    }
    get Count() {
        return this.Tokens.Count;
    }
    ToString() {
        let sb = new FJsonStringBuilder();
        sb.Append("Line:" + this.Line + " ");
        for (var i = 0; i < this.Tokens.Count; i++) {
            let item = this.Tokens.get(i);
            sb.Append(item.OrgValue);
        }
        return sb.ToString();
    }
}
class FJsonToken {
    constructor(index, type, value, line, column) {
        this.Index = index;
        this.Type = type;
        this.OrgValue = value;
        this.Line = line;
        this.Column = column;
    }
    ToString() {
        return this.Index + "," + this.Type + "," + this.OrgValue + "," + this.Line + "," + this.Column;
    }
    ToValue() {
        if (this.Type == FJsonTokenType.FALSE) {
            return false;
        }
        if (this.Type == FJsonTokenType.TRUE) {
            return true;
        }
        if (this.Type == FJsonTokenType.NULL) {
            return null;
        }
        if (this.Type == FJsonTokenType.NUMBER) {
            return this.OrgValue;
        }
        if (this.Type == FJsonTokenType.STRING) {
            return this.OrgValue + "";
        }
        return null;
    }
}
FJsonToken.End = new FJsonToken(-1, -1, "", -1, -1);
class FJsonTokenType {
}
FJsonTokenType.STRING = 1;
FJsonTokenType.NUMBER = 2;
FJsonTokenType.TRUE = 6;
FJsonTokenType.FALSE = 7;
FJsonTokenType.NULL = 8;
FJsonTokenType.LBRACE = 21;
FJsonTokenType.RBRACE = 22;
FJsonTokenType.LBRACKET = 23;
FJsonTokenType.RBRACKET = 24;
FJsonTokenType.COMMA = 25;
FJsonTokenType.COLON = 26;
FJsonTokenType.Comments = 199;
class FJsonList extends Array {
    constructor() {
        super();
    }
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
    Remove(obj) {
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
class FJsonConvertHelper {
    static IsNumber(value) {
        if (typeof (value) == 'string') {
            return false;
        }
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
    static IsNullOrWhiteSpace(text) {
        if (text == null)
            return true;
        if (text == "")
            return true;
        return false;
    }
    static ToInt(txt) {
        return parseInt(txt);
    }
    static ToInt32(txt, defaultvalue) {
        return parseInt(txt);
    }
    static ToInt64(txt, defaultvalue) {
        return parseInt(txt);
    }
    static ToDecimal(txt) {
        return parseFloat(txt);
    }
    static ToSingle(txt) {
        return parseFloat(txt);
    }
    static ToDouble(txt) {
        return parseFloat(txt);
    }
    static ToBoolean(txt) {
        return (txt);
    }
    static ToString(txt) {
        return (txt);
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
        date = FJsonConvertHelper.ToDateTime(value);
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
}
class FJsonDictionary extends Map {
    constructor() {
        super();
    }
    Add(k, v) {
        this.set(k, v);
    }
    Remove(k) {
        this.delete(k);
    }
    Clear() {
        this.clear();
    }
    ContainsKey(key) {
        return this.has(key);
    }
}
class FJsonException {
    constructor(msg) {
        this.Msg = msg;
    }
}
class FJsonStringBuilder {
    constructor(msg) {
        if (msg != null) {
            this._txt = msg;
        }
        else {
            this._txt = "";
        }
    }
    ToString() {
        return this._txt;
    }
    get length() {
        return this._txt.length;
    }
    get Length() {
        return this._txt.length;
    }
    set Length(value) {
        this._txt = this._txt.substr(0, value);
    }
    clear() {
        this._txt = "";
    }
    Append(txt) {
        this._txt = this._txt + txt;
    }
}
const FJsonChar = {
    IsNumber(c) {
        let n = c.charCodeAt(0);
        if (n >= 48 && n <= 57) {
            return true;
        }
        return false;
    },
    IsWhiteSpace(c) {
        let n = c.charCodeAt(0);
        if (n == 32 || n == 10 || n == 9 || n == 13) {
            return true;
        }
        return false;
    },
    IsLetter(c) {
        let n = c.codePointAt(0);
        if (n >= 65 && n <= 90) {
            return true;
        }
        if (n >= 97 && n <= 122) {
            return true;
        }
        if (n >= 256) {
            return true;
        }
        return false;
    }
};
//# sourceMappingURL=fjson.js.map