var FScript;
(function (FScript) {
    class List extends Array {
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
    FScript.List = List;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class Dictionary extends Map {
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
    FScript.Dictionary = Dictionary;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class BaseMethodContainer {
        constructor() {
            this._MethodList = null;
        }
        RunFunction(method2, args) {
            let obj = null;
            let method = method2.toUpperCase();
            for (let i = 0; i < this.MethodList.Count; i++) {
                let model = this.MethodList[i];
                if (model.Name.toUpperCase() == method) {
                    let fun = model.Function;
                    if (fun != null) {
                        obj = fun(this, args);
                        break;
                    }
                }
            }
            return obj;
        }
        get CaseSensitive() {
            return this._CaseSensitive;
        }
        set CaseSensitive(value) {
            this._CaseSensitive = value;
        }
        Contains(method2) {
            let method = method2.toUpperCase();
            for (let i = 0; i < this.MethodList.Count; i++) {
                let model = this.MethodList[i];
                if (model.HasMethod(method)) {
                    return true;
                }
            }
            return false;
        }
        get MethodList() {
            if (this._MethodList == null) {
                this._MethodList = new FScript.List();
            }
            return this._MethodList;
        }
        get Name() {
            return this._Name;
        }
        get Description() {
            return this._Description;
        }
        GetText(index, defaulttext, args) {
            if (args.Length > index) {
                return this.GetTextValue(index, args);
            }
            return defaulttext;
        }
        GetFirstValue(args) {
            if (args.Length > 0)
                return args[0];
            return null;
        }
        GetSecondValue(args) {
            if (args.Length > 1)
                return args[1];
            return null;
        }
        GetThirdValue(args) {
            if (args.Length > 2)
                return args[2];
            return null;
        }
        GetFourthValue(args) {
            if (args.Length > 3)
                return args[3];
            return null;
        }
        GetFifthValue(args) {
            if (args.length > 4)
                return args[4];
            return null;
        }
        GetArgIndex(index, args) {
            if (index < args.length)
                return args[index];
            return null;
        }
        GetValue(index, args) {
            return args[index];
        }
        GetIntValue(index, args, defaultvalue) {
            let value = this.GetValue(index, args);
            if (value == null)
                return defaultvalue;
            return FScript.ConvertHelper.ToInt32(value, defaultvalue);
        }
        GetBooleanValue(index, args, defaultvalue) {
            let value = this.GetValue(index, args);
            if (value == null)
                return defaultvalue;
            return FScript.ConvertHelper.ToBoolean(value);
        }
        GetDecimalValue(index, args, defaultvalue) {
            let value = this.GetValue(index, args);
            if (value == null)
                return defaultvalue;
            return FScript.ConvertHelper.ToDecimal(value);
        }
        GetLongValue(index, args) {
            let value = this.GetValue(index, args);
            return FScript.ConvertHelper.ToInt64(value);
        }
        GetDoubleValue(index, args) {
            let value = this.GetValue(index, args);
            return FScript.ConvertHelper.ToDouble(value);
        }
        GetTextValue(index, args, dafaultvalue) {
            let value = this.GetValue(index, args);
            let text = FScript.ConvertHelper.ToString(value);
            if (FScript.ConvertHelper.IsNullOrWhiteSpace(text)) {
                return dafaultvalue;
            }
            return text;
        }
        GetSingleValue(index, args) {
            let value = this.GetValue(index, args);
            return FScript.ConvertHelper.ToSingle(value);
        }
        HasArgs(index, args) {
            return index < args.length;
        }
        GetDateTimeValue(index, args) {
            let value = this.GetValue(index, args);
            return FScript.ConvertHelper.ToDateTime(value);
        }
        GetFloatValue(index, args, defaultvalue) {
            let value = this.GetValue(index, args);
            if (value == null)
                return defaultvalue;
            return FScript.ConvertHelper.ToSingle(value);
        }
        ToString() {
            return this.Name + "_" + this.Description;
        }
    }
    FScript.BaseMethodContainer = BaseMethodContainer;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class BaseMethod {
        get Function() {
            return this._Function;
        }
        set Function(value) {
            this._Function = value;
        }
        HasMethod(method) {
            if (this.Name.toUpperCase() == method) {
                return true;
            }
            return false;
        }
        ToString() {
            return this.Name + "__" + this.Description;
        }
    }
    FScript.BaseMethod = BaseMethod;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    FScript.Constants = {
        OK: 1,
        TRUE: 1,
        FALSE: 0
    };
    const FormatType = {
        Null: "",
        Date: "Date",
        Num: "Num"
    };
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class ConvertHelper {
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
    }
    FScript.ConvertHelper = ConvertHelper;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class StringBuilder {
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
        clear() {
            this._txt = "";
        }
        Append(txt) {
            this._txt = this._txt + txt;
        }
    }
    FScript.StringBuilder = StringBuilder;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    FScript.char = {
        IsNumber(c) {
            let n = c.charCodeAt(0);
            if (n >= 48 && n < 57) {
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
            if (n >= 65 && n < 90) {
                return true;
            }
            if (n >= 97 && n < 122) {
                return true;
            }
            if (n >= 256) {
                return true;
            }
            return false;
        }
    };
})(FScript || (FScript = {}));
////namespace FScript
////{
////    export
//class CBMethod
//{
//    private _Methods = null;
//    public get Methods(): MethodCollection
//    {
//        if (this._Methods == null)
//        {
//            this._Methods = new MethodCollection();
//        }
//        return this._Methods;
//    }
//    public set Methods(value)
//    {
//        this._Methods = value;
//    }
//    public RunMethod(item, method, args)
//    {
//        let hasMethod = false;
//        let value = this.Methods.RunMethod(method, hasMethod, args);
//        return value;
//    }
//}
//}
//class CBMethodContainer extends BaseMethodContainer
//{
//    public constructor()
//    {
//        super();
//    }
//    //public   Name { get { return "CBMethod"; }   }
//    //public   Description
//    //{
//    //    get { return string.Empty; }
//    //}
//    //public override object GetValue(int index, params object[] args)
//    //{
//    //    object value = GetArgIndex(index, args);
//    //    return value;
//    //}
//}
var FScript;
(function (FScript) {
    class MethodCollection extends FScript.List {
        RunMethod(sender, methodname, args) {
            for (var i = 0; i < this.Count; i++) {
                let method = this[i];
                if (method.Contains(methodname)) {
                    return method.RunFunction(methodname, args);
                }
            }
            throw new FScript.CBExpressException("函数[" + methodname + "]不存在", null, null);
        }
    }
    FScript.MethodCollection = MethodCollection;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class ArrayFunction extends FScript.BaseMethodContainer {
        constructor() {
            super();
            this.Function_Category = "ArrayFunction";
            this.Function_Description = "数组";
            let model = null;
            model = new FScript.BaseMethod();
            model.Name = "ArrayInit";
            model.Description = "创建一个集合 VAR Array =ArrayInit(1,2,3,4,5,6)";
            model.Eg = "VAR Array =ArrayInit(1,2,3,4,5,6)";
            model.Function = this.ArrayInit;
            this.MethodList.Add(model);
            model = new FScript.BaseMethod();
            model.Name = "ArrayNew";
            model.Description = "创建一个集合 VAR Array =ArrayNew(10)";
            model.Eg = "VAR Array =ArrayNew(10)";
            model.Function = this.ArrayNew;
            this.MethodList.Add(model);
            model = new FScript.BaseMethod();
            model.Name = "ArrayCount";
            model.Description = "返回集合长度";
            model.Eg = "ArrayCount(LIST)";
            model.Function = this.ArrayCount;
            this.MethodList.Add(model);
            model = new FScript.BaseMethod();
            model.Name = "ArrayIndex";
            model.Description = "返回集合的第某个值 ListIndex(ARRAY,3)";
            model.Eg = "ArrayIndex(ARRAY,3)";
            model.Function = this.ArrayIndex;
            this.MethodList.Add(model);
            model = new FScript.BaseMethod();
            model.Name = "ArrayCopy";
            model.Description = "复制一个集合 ArrayCopy(ARRAY)";
            model.Eg = "ArrayCopy(ARRAY)";
            model.Function = this.ArrayCopy;
            this.MethodList.Add(model);
            model = new FScript.BaseMethod();
            model.Name = "Arr";
            model.Description = "返回集合的第某个值 Arr(3)";
            model.Eg = "Arr(ARRAY,3)";
            model.Function = this.ArrayIndex;
            this.MethodList.Add(model);
        }
        get Name() {
            return this.Function_Category;
        }
        get Description() {
            return this.Function_Description;
        }
        ArrayInit(sender, args) {
            let list = new FScript.List();
            for (let i = 1; i < args.length; i++) {
                list[i - 1] = args[i];
            }
            return list;
        }
        ArrayNew(sender, args) {
            return new FScript.List();
        }
        ArrayCount(sender, args) {
            let list = args[1];
            return list.length;
        }
        ArrayIndex(sender, args) {
            let list = args[1];
            if (list == null)
                return null;
            let index = sender.GetIntValue(2, args, -1);
            if (args.length > 3) {
                let value = sender.GetArgIndex(3, args);
                list[index] = value;
            }
            else {
                return list[index];
            }
            return null;
        }
        ArrayCopy(sender, args) {
            let list = args[1];
            let listt = new FScript.List();
            for (var i = 0; i < list.length; i++) {
                listt.add(list[i]);
            }
            return listt;
        }
    }
    FScript.ArrayFunction = ArrayFunction;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class ConsoleFunctionContainer extends FScript.BaseMethodContainer {
        constructor() {
            super();
            this.Function_Category = "ConsoleMethod";
            this.Function_Description = "控制台方法";
            let model = new FScript.BaseMethod();
            model.Name = "ConsoleWrite";
            model.Description = "ConsoleWrite";
            model.Function = this.ConsoleWrite;
            this.MethodList.Add(model);
        }
        get Name() {
            return this.Function_Category;
        }
        get Description() {
            return this.Function_Description;
        }
        ConsoleWrite(sender, args) {
            let value1 = this.GetTextValue(1, args);
            console.log(value1);
            return FScript.Constants.TRUE;
        }
    }
    FScript.ConsoleFunctionContainer = ConsoleFunctionContainer;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class ConvertFunctionContainer extends FScript.BaseMethodContainer {
        constructor() {
            super();
            this.Function_Category = "ConvertFunction";
            this.Function_Description = "数值转换";
            //let model = new BaseMethod();
            //model.Name = "ConvertToString";
            //model.Description = "转换为字符串";
            //model.Eg = "ConvertToString(value)";
            //model.Function = this.ConvertToString;
            //this.MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "ConvertToBoolean";
            //model.Description = "转换为Boolean类型";
            //model.Eg =  "ConvertToBoolean(value)";
            //model.Function = this.ConvertToBoolean;
            //this.MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "ConvertToDecimal";
            //model.Description = "转换为Decimal类型";
            //model.Eg =  "ConvertToDecimal(value)";
            //model.Function = this.ConvertToDecimal;
            //this.MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "ConvertToDateTime";
            //model.Description = "转换为DateTime类型";
            //model.Eg =  "ConvertToDateTime(value)";
            //model.Function = this.ConvertToDateTime;
            //this.MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "ConvertToInt";
            //model.Description = "转换为Int类型";
            //model.Eg = "ConvertToInt(value)";
            //model.Function = this.ConvertToInt;
            //this.MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "IsEmpty";
            //model.Description = "是否为空字符";
            //model.Eg =  "IsEmpty(value)";
            //model.Function = this.IsEmpty;
            //this.MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "IsNull";
            //model.Description = "是否为空或者NULL";
            //model.Eg =  "IsNull(value)";
            //model.Function = this.IsNull;
            //this.MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "ISNULLOREMPTY";
            //model.Description = "是否为空或者NULL ISNULLOREMPTY(value)";
            //model.Eg = "ISNULLOREMPTY(value)";
            //model.Function = this.ISNULLOREMPTY;
            //this.MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "IsNumber";
            //model.Description = "是否为数字类型";
            //model.Eg =  "IsNumber(value)";
            //model.Function = this.IsNumber;
            //this.MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "IsDateTime";
            //model.Description = "是否为日期类型";
            //model.Eg =  "IsDateTime(value)";
            //model.Function = this.IsDateTime;
            //this.MethodList.Add(model);
        }
        get Name() {
            {
                return this.Function_Category;
            }
        }
        get Description() {
            {
                return this.Function_Description;
            }
        }
    }
    FScript.ConvertFunctionContainer = ConvertFunctionContainer;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class StringFunctionContainer extends FScript.BaseMethodContainer {
        constructor() {
            super();
            this.Function_Category = "CharacterFunction";
            this.Function_Description = "字符函数";
            let model = new FScript.BaseMethod();
            //model.Name = "StrMerge";
            //model.Description = "StrMerge";
            //model.Eg = "StrMerge(""Cell(""A5"")"")";
            //model.Function = StrMerge;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "StrIsEmpty";
            //model.Description = "判断字符串是否为空";
            //model.Eg = @"StrIsEmpty(""Cell(""A5"")"")";
            //model.Function = StrIsEmpty;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "StrHas";
            //model.Description = "判断第一个字符串是否包含后续字符串";
            //model.Eg = @"StrHas(""Cell(""A5"")"",""第二个字符"")";
            //model.Function = StrHas;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "StrRemove";
            //model.Description = "StrRemove";
            //model.Function = StrRemove;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "StrSub";
            //model.Description = "StrSub";
            //model.Function = StrSub;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "StrStartsWith";
            //model.Description = "StrStartsWith";
            //model.Function = StrStartsWith;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "StrSplit";
            //model.Description = "StrSplit";
            //model.Function = StrSplit;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "StrReplace";
            //model.Description = "StrReplace";
            //model.Function = StrReplace;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "StrReplaceSpace";
            //model.Description = "StrReplaceSpace";
            //model.Function = StrReplaceSpace;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "StrToLower";
            //model.Description = "转为小写";
            //model.Eg = @"StrToLower(CELL(""A5""))";
            //model.Function = this.StrToLower;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "StrToUpper";
            //model.Description = "转为大写";
            //model.Eg = @"StrToUpper(CELL(""A5""))";
            //model.Function = this.StrToUpper;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "StrTrim";
            //model.Description = "去除前缀，后缀字符";
            //model.Eg = @"StrTrim(CELL(""A5""),""AAA"")";
            //model.Function = this.StrTrim;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "StrTrimStart";
            //model.Description = "去除前缀";
            //model.Eg = @"StrTrimStart(CELL(""A5""),""AAA"")";
            //model.Function = this.StrTrimStart;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "StrTrimEnd";
            //model.Description = "去除后缀字符";
            //model.Eg = @"StrTrimEnd(CELL(""A5""),""AAA"")";
            //model.Function = this.StrTrimEnd;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "StrFormat";
            //model.Description = "格式化字显示";
            //model.Eg = @"StrFormat(""{0:N1}"",CELL(""A5""))";
            //model.Function = this.StrTrimEnd;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "SplitByRegex";
            //model.Description = "SplitByRegex";
            //model.Function = StrSplitByRegex;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "StrTrans";
            //model.Description = "转义为脚本字符";
            //model.Function = StrTrans;
            //model.Eg = "StrTrans()";
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "StrDEncrypt";
            //model.Description = "解密文本 StrDEncrypt(text,pwd)";
            //model.Function = StrDEncrypt;
            //model.Eg = "StrDEncrypt(text,pwd)";
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "StrEncrypt";
            //model.Description = "加密文本 StrEncrypt(text,pwd)";
            //model.Function = StrEncrypt;
            //model.Eg = "StrEncrypt(text,pwd)";
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "StrEmpty";
            //model.Description = "返回空字符串 占位使用";
            //model.Function = StrEmpty;
            //model.Eg = @"StrEmpty(""名称"")";
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "T";
            //model.Description = "提示当前参数 并返回传入值";
            //model.Function = T;
            //model.Eg = @"T(""名称"",""张三"")";
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "NULL";
            //model.Description = "返回null 占位使用";
            //model.Function = NULL;
            //model.Eg = @"NULL(""名称"")";
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "ZERO";
            //model.Description = "返回数字0 占位使用";
            //model.Function = ZERO;
            //model.Eg = @"ZERO(""名称"")";
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "Match";
            //model.Description = "Match";
            //model.Function = Match;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "MatchText";
            //model.Description = "MatchText";
            //model.Eg = @"MatchText("""","""")";
            //model.Function = MatchText;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "MatchCapturesCount";
            //model.Description = "捕获的集合数量 MatchCapturesCount";
            //model.Eg = @"MatchCapturesCount(match)";
            //model.Function = MatchCapturesCount;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "MatchCapture";
            //model.Description = "捕获的集合索引值 MatchCapture";
            //model.Eg = @"MatchCapture(match,1)";
            //model.Function = MatchCapture;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "MatchGroupsCount";
            //model.Description = "组的集合数量 MatchGroupsCount";
            //model.Eg = @"MatchGroupsCount(match)";
            //model.Function = MatchGroupsCount;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "MatchGroup";
            //model.Description = "组的集合索引值 MatchGroup";
            //model.Eg = @"MatchGroup(match,1)";
            //model.Function = MatchGroup;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "MatchInsert";
            //model.Description = "MatchInsert";
            //model.Function = MatchInsert;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "MatchReplace";
            //model.Description = "MatchReplace";
            //model.Function = MatchReplace;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "MatchAZaz";
            //model.Description = "英文字符";
            //model.Function = MatchAZaz;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "MatchCnText";
            //model.Description = "中文字符";
            //model.Function = MatchCnText;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "MatchEmail";
            //model.Description = "邮箱";
            //model.Function = MatchEmail;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "MatchNRIC";
            //model.Description = "身份证号码";
            //model.Function = MatchNRIC;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "MatchNumber";
            //model.Description = "数字";
            //model.Function = MatchNumber;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "MatchPhoneNumber";
            //model.Description = "电话号码";
            //model.Function = MatchPhoneNumber;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "MatchUrl";
            //model.Description = "Url";
            //model.Function = MatchUrl;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "MatchDate";
            //model.Description = "匹配日期";
            //model.Function = MatchDate;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "MatchTime";
            //model.Description = "匹配时间";
            //model.Function = MatchTime;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "MatchReplaceAZaz";
            //model.Description = "英文字符";
            //model.Function = MatchReplaceAZaz;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "MatchReplaceCnText";
            //model.Description = "中文字符";
            //model.Function = MatchReplaceCnText;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "MatchReplaceEmail";
            //model.Description = "邮箱";
            //model.Function = MatchReplaceEmail;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "MatchReplaceNRIC";
            //model.Description = "身份证号码";
            //model.Function = MatchReplaceNRIC;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "MatchReplaceNumber";
            //model.Description = "数字";
            //model.Function = MatchReplaceNumber;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "MatchReplacePhoneNumber";
            //model.Description = "电话号码";
            //model.Function = MatchReplacePhoneNumber;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "MatchReplaceUrl";
            //model.Description = "Url";
            //model.Function = MatchReplaceUrl;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "MatchReplaceDate";
            //model.Description = "匹配日期";
            //model.Function = MatchReplaceDate;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "MatchReplaceTime";
            //model.Description = "匹配时间";
            //model.Function = MatchReplaceTime;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "StrPadLeft";
            //model.Description = "向左填充指定数字的符号";
            //model.Function = StrPadLeft;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "StrPadRight";
            //model.Description = "向右填充指定数字的符号";
            //model.Function = StrPadRight;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "StrStartsWith";
            //model.Description = "是否以指定字符开始";
            //model.Function = StrStartsWith;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "StrEndsWith";
            //model.Description = "是否以指定字符结束";
            //model.Function = StrEndsWith;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "StrIndexOf";
            //model.Description = "从开始查找指定字符，返回所在位置";
            //model.Function = StrIndexOf;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "StrLastIndexOf";
            //model.Description = "从结束查找指定字符，返回所在位置";
            //model.Function = StrLastIndexOf;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "StrInsert";
            //model.Description = "在指定位置插入字符";
            //model.Function = StrInsert;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "StrLength";
            //model.Description = "返回字符长度";
            //model.Function = StrLength;
            //MethodList.Add(model);
            //model = new BaseMethod();
            //model.Name = "StrToArray";
            //model.Description = "字符转为数组";
            //model.Function = StrToArray;
            //MethodList.Add(model);
        }
        get Name() {
            {
                return this.Function_Category;
            }
        }
        get Description() {
            {
                return this.Function_Description;
            }
        }
    }
    FScript.StringFunctionContainer = StringFunctionContainer;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class Eexpress {
        constructor() {
            this.parse = null;
            this.execproxy = null;
        }
        get Parse() {
            if (this.parse == null) {
                this.parse = new FScript.Parse();
            }
            return this.parse;
        }
        set Parse(value) {
            this.parse = value;
        }
        Exec(table) {
            let value = null;
            value = this.Parse.Exec(this.ExecProxy, table);
            return value;
        }
        Write(sender, table, varname, value) {
            try {
                if (this.OutWatch != null) {
                    this.OutWatch.Write(varname);
                }
            }
            catch (e) {
            }
        }
        get ExecProxy() {
            if (this.execproxy == null) {
                this.execproxy = new FScript.ExcuteProxy();
            }
            return this.execproxy;
        }
        set ExecProxy(value) {
            this.execproxy = value;
        }
    }
    FScript.Eexpress = Eexpress;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class FunctionBody {
        constructor() {
            this.statementfactory = null;
            this.script = null;
        }
        get StateMentFactory() {
            if (this.statementfactory == null) {
                this.statementfactory = new FScript.StateMentFactory();
            }
            return this.statementfactory;
        }
        set StateMentFactory(value) {
            this.statementfactory = value;
        }
        get Script() {
            if (this.script == null) {
                this.script = new FScript.Eexpress();
            }
            return this.script;
        }
        set Script(value) {
            this.script = value;
        }
        Exec(text) {
            try {
                let statements = this.Parse(text);
                this.Statements = this.BuildStateMentsTree(statements);
                this.Script.Finished = false;
                this.Script.FinishObj = null;
                this.Script.OutWatch = this.OutWatch;
                let dt = new Date();
                if (this.OutWatch != null) {
                    this.OutWatch.Write("开始执行:" + dt.toLocaleTimeString());
                }
                let value = this.Exec2(this.Script);
                if (this.OutWatch != null) {
                    this.OutWatch.Write("结束执行:" + new Date().toLocaleTimeString());
                    let ts = new Date().getTime() - dt.getTime();
                    this.OutWatch.Write("耗时:" + ts.toFixed());
                }
                return value;
            }
            catch (ex) {
                if (this.OutWatch != null) {
                    this.OutWatch.Write(ex.Message);
                }
                throw ex;
            }
        }
        Exec2(script) {
            if (this.Statements == null)
                return null;
            let value = null;
            while (this.Statements.Current() != null) {
                let item = this.Statements.Current();
                value = item.Exec(null, script);
                if (script.Finished) {
                    return script.FinishObj;
                }
                this.Statements.Pop();
            }
            if (script.Finished) {
                return script.FinishObj;
            }
            return value;
        }
        Parse(text) {
            let statements = new FScript.StatementCollection();
            let lexer = new FScript.StatementLexer();
            lexer.Parse(text);
            if (lexer.List.Count > 0) {
                for (let i = 0; i < lexer.List.Count; i++) {
                    let table = lexer.List[i];
                    let statement = null;
                    let token = table.Peek();
                    switch (token.Value.toUpperCase()) {
                        case "IF":
                            statement = this.StateMentFactory.CreateStatementIF();
                            break;
                        case "ELSE":
                            statement = this.StateMentFactory.CreateStatementElse();
                            break;
                        case "ENDIF":
                            statement = this.StateMentFactory.CreateStatementEndIF();
                            break;
                        case "WHILE":
                            statement = this.StateMentFactory.CreateStatementWhile();
                            break;
                        case "ENDWHILE":
                            statement = this.StateMentFactory.CreateStatementEndWhile();
                            break;
                        case "FOR":
                            statement = this.StateMentFactory.CreateStatementFor();
                            break;
                        case "ENDFOR":
                            statement = this.StateMentFactory.CreateStatementEndFor();
                            break;
                        case "RETURN":
                            statement = this.StateMentFactory.CreateStatementReturn();
                            break;
                        case "VAR":
                            statement = this.StateMentFactory.CreateStatementVar();
                            break;
                        case "BREAK":
                            statement = this.StateMentFactory.CreateStatementBreak();
                            break;
                        case "FOREACH":
                            token = table.Pop();
                            token = table.Pop();
                            if (token.Type != FScript.TokenType.ID) {
                                let ex = new FScript.CBExpressException("Foreach Error Row:" + token.Line + " Column:" + token.Column, token);
                                ex.RowIndex = token.Line;
                                ex.ColumnIndex = token.Column;
                                throw ex;
                            }
                            let itemkey = token.Value;
                            token = table.Pop();
                            if (token.Type != FScript.TokenType.ID) {
                                let ex = new FScript.CBExpressException("Foreach Error Row:" + token.Line + " Column:" + token.Column, token);
                                ex.RowIndex = token.Line;
                                ex.ColumnIndex = token.Column;
                                throw ex;
                            }
                            let intext = token.Value.toUpperCase();
                            if (intext != "IN") {
                                let ex = new FScript.CBExpressException("Foreach In Error No In Key  Row:" + token.Line + " Column:" + token.Column, token);
                                ex.RowIndex = token.Line;
                                ex.ColumnIndex = token.Column;
                                throw ex;
                            }
                            token = table.Pop();
                            if (token.Type != FScript.TokenType.ID) {
                                let ex = new FScript.CBExpressException("Foreach In List Error  Row:" + token.Line + " Column:" + token.Column, token);
                                ex.RowIndex = token.Line;
                                ex.ColumnIndex = token.Column;
                                throw ex;
                            }
                            statement = this.StateMentFactory.CreateStatementForeach();
                            break;
                        case "ENDFOREACH":
                            statement = this.StateMentFactory.CreateStatementEndForeach();
                            break;
                        case "TRY":
                            statement = this.StateMentFactory.CreateStatementTry();
                            break;
                        case "CATCH":
                            statement = this.StateMentFactory.CreateStatementCatch();
                            break;
                        case "PROC":
                            statement = this.StateMentFactory.CreateStatementProc();
                            break;
                        case "ENDPROC":
                            statement = this.StateMentFactory.CreateStatementEndProc();
                            break;
                        case "CALL":
                            statement = this.StateMentFactory.CreateStatementCall();
                            break;
                        default:
                            token = table.Pop();
                            statement = this.StateMentFactory.CreateStatementExpress();
                            token = table.Peek();
                            if (token != FScript.Token.End) {
                                if (token.Value == "=") {
                                    statement = this.StateMentFactory.CreateStatementEquality();
                                }
                            }
                            break;
                    }
                    statement.SymbolTable = table;
                    statement.Index = i;
                    statements.Add(statement);
                }
            }
            return statements;
        }
        BuildStateMentsTree(statements) {
            let statement = new FScript.StatementCollection();
            while (statements.Current() != null) {
                let item = statements.Current();
                item.Build(statements);
                statement.Add(item);
            }
            return statement;
        }
    }
    FScript.FunctionBody = FunctionBody;
    class CBScript {
        static Exec(script) {
            let functionBody = new FunctionBody();
            let excuteProxy = new FScript.ExcuteProxy();
            let cbmethod = new FScript.MethodCollection();
            excuteProxy.RunMethod = cbmethod;
            functionBody.Script.ExecProxy = excuteProxy;
            this.InitDefaultFunction(cbmethod);
            return functionBody.Exec(script);
        }
        static InitDefaultFunction(cbmethod) {
            cbmethod.Add(new FScript.StringFunctionContainer());
            //this.CBMethod.Add(new DateTimeFunctionContainer());
            //this.CBMethod.Add(new FileFunctionContainer());
            cbmethod.Add(new FScript.ConvertFunctionContainer());
            //this.CBMethod.Add(new MathematicsFunctionContainer());
            //this.CBMethod.Add(new TrigonometricFunctionContainer());
            cbmethod.Add(new FScript.ArrayFunction());
            //this.CBMethod.Add(new ListFunctionContainer());
            //this.CBMethod.Add(new DataTableFunctionContainer());
            //this.CBMethod.Add(new SqlServerFunctionContainer());
            //this.CBMethod.Add(new WebServiceFunctionContainer());
            //this.CBMethod.Add(new FormFunctionContainer());
            cbmethod.Add(new FScript.ConsoleFunctionContainer());
            //this.CBMethod.Add(new StyleFunctionContainer());
            //this.CBMethod.Add(new XMLFunctionContainer());
            //this.CBMethod.Add(new JsonFunctionContainer());
            //this.CBMethod.Add(new ReflectionContainer());
            //this.CBMethod.Add(new DebugFunctionContainer());
        }
    }
    FScript.CBScript = CBScript;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class OperatorBase {
        Exec(parse, operatorexec, value1, value2, token) {
            return null;
        }
    }
    FScript.OperatorBase = OperatorBase;
    class ConvertBase {
        ToObject(value) {
            return value;
        }
        ToNumber(value) {
            return Number(value);
        }
        ToString(value) {
            return value.toString();
        }
    }
    FScript.ConvertBase = ConvertBase;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class OperatorExecBase {
        constructor() {
            this.staticvalues = null;
            this.keyvalues = null;
            this.keyvalues = null;
        }
        get STATICVALUES() {
            if (this.staticvalues == null) {
                this.staticvalues = new FScript.Dictionary();
            }
            return this.staticvalues;
        }
        get KeyValues() {
            if (this.keyvalues == null) {
                this.keyvalues = new FScript.Dictionary();
            }
            return this.keyvalues;
        }
        HasKey(key1) {
            let key = key1.toLowerCase();
            return this.KeyValues.ContainsKey(key);
        }
        GetKeyValue(key1) {
            let key = key1.toLowerCase();
            if (this.KeyValues.ContainsKey(key))
                return this.KeyValues.get(key);
            return null;
        }
        SetKeyValue(key1, value) {
            let key = key1.toLowerCase();
            if (this.KeyValues.ContainsKey(key)) {
                this.KeyValues.set(key, value);
            }
            else {
                this.KeyValues.Add(key, value);
            }
            return FScript.Constants.OK;
            ;
        }
        /// <summary>
        /// &&
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        LogicalAND(value1, value2) {
            return null;
        }
        /// <summary>
        /// ||
        /// </summary>
        /// <param name="value1"></param>
        /// <param name="value2"></param>
        /// <returns></returns>
        LogicalOR(value1, value2) {
            return null;
        }
        /// <summary>
        /// <<
        /// </summary>
        /// <param name="value1"></param>
        /// <param name="value2"></param>
        /// <returns></returns>
        BitwiseShiftLeft(value1, value2) {
            return null;
        }
        /// <summary>
        /// >>
        /// </summary>
        /// <param name="value1"></param>
        /// <param name="value2"></param>
        /// <returns></returns>
        BitwiseShiftRight(value1, value2) {
            return null;
        }
        /// <summary>
        /// |
        /// </summary>
        /// <param name="value1"></param>
        /// <param name="value2"></param>
        /// <returns></returns>
        BitwiseOR(value1, value2) {
            return null;
        }
        /// <summary>
        /// &
        /// </summary>
        /// <param name="value1"></param>
        /// <param name="value2"></param>
        /// <returns></returns>
        BitwiseAnd(value1, value2) {
            return null;
        }
        /// <summary>
        /// ^ A^B
        /// </summary>
        /// <param name="value1"></param>
        /// <param name="value2"></param>
        /// <returns></returns>
        BitwiseXOR(value1, value2) {
            return null;
        }
        /// <summary>
        /// a+b
        /// </summary>
        /// <param name="value1"></param>
        /// <param name="value2"></param>
        /// <returns></returns>
        Add(value1, value2) {
            return null;
        }
        /// <summary>
        /// a-b
        /// </summary>
        /// <param name="value1"></param>
        /// <param name="value2"></param>
        /// <returns></returns>
        Minus(value1, value2) {
            return null;
        }
        /// <summary>
        /// "a"+"b"
        /// </summary>
        /// <param name="value1"></param>
        /// <param name="value2"></param>
        /// <returns></returns>
        Combine(value1, value2) {
            return null;
        }
        /// <summary>
        /// a*b
        /// </summary>
        /// <param name="value1"></param>
        /// <param name="value2"></param>
        /// <returns></returns>
        Multiply(value1, value2) {
            return null;
        }
        /// <summary>
        /// / a/b
        /// </summary>
        /// <param name="value1"></param>
        /// <param name="value2"></param>
        /// <returns></returns>
        Divide(value1, value2) {
            return null;
        }
        /// <summary>
        /// []
        /// </summary>
        /// <param name="value1"></param>
        /// <param name="value2"></param>
        /// <returns></returns>
        Index(value1, value2) {
            return null;
        }
        /// <summary>
        /// a.b
        /// </summary>
        /// <param name="value1"></param>
        /// <param name="value2"></param>
        /// <returns></returns>
        Property(value1, value2) {
            return null;
        }
        /// <summary>
        /// a.b()
        /// </summary>
        /// <param name="value1"></param>
        /// <param name="value2"></param>
        /// <returns></returns>
        PropertyFunction(value, value1, values) {
            return null;
        }
        /// <summary>
        /// max(a,b,c)
        /// </summary>
        /// <param name="value1">max</param>
        /// <param name="values">a,b,c</param>
        /// <returns></returns>
        Function(value1, values) {
            return null;
        }
        /// <summary>
        /// ()
        /// </summary>
        /// <param name="value1"></param>
        /// <returns></returns>
        Parenthesis(value1) {
            return null;
        }
        /// <summary>
        /// a==b
        /// </summary>
        /// <param name="value1"></param>
        /// <param name="value2"></param>
        /// <returns></returns>
        Equal(value1, value2) {
            return null;
        }
        /// <summary>
        /// !=
        /// </summary>
        /// <param name="value1"></param>
        /// <param name="value2"></param>
        /// <returns></returns>
        NotEqual(value1, value2) {
            return null;
        }
        /// <summary>
        /// <
        /// </summary>
        /// <param name="value1"></param>
        /// <param name="value2"></param>
        /// <returns></returns>
        LessThan(value1, value2) {
            return null;
        }
        /// <summary>
        /// >
        /// </summary>
        /// <param name="value1"></param>
        /// <param name="value2"></param>
        /// <returns></returns>
        MoreThan(value1, value2) {
            return null;
        }
        /// <summary>
        /// <=
        /// </summary>
        /// <param name="value1"></param>
        /// <param name="value2"></param>
        /// <returns></returns>
        LessThanEqual(value1, value2) {
            return null;
        }
        /// <summary>
        /// >=
        /// </summary>
        /// <param name="value1"></param>
        /// <param name="value2"></param>
        /// <returns></returns>
        MoreThanEqual(value1, value2) {
            return null;
        }
        /// <summary>
        /// 负数-
        /// </summary>
        /// <param name="value1"></param>
        /// <param name="value2"></param>
        /// <returns></returns>
        Negative(value1) {
            return null;
        }
        /// <summary>
        /// 按位取反 ~
        /// </summary>
        /// <param name="value1"></param>
        /// <param name="value2"></param>
        /// <returns></returns>
        BitwiseNOT(value1) {
            return null;
        }
        /// <summary>
        /// % 3%4=1
        /// </summary>
        /// <param name="value1"></param>
        /// <param name="value2"></param>
        /// <returns></returns>
        Mod(value1, value2) {
            return null;
        }
        /// <summary>
        /// 取反!
        /// </summary>
        /// <param name="value1"></param>
        /// <param name="value2"></param>
        /// <returns></returns>
        Not(value1) {
            return null;
        }
        /// <summary>
        /// A1:B12
        /// </summary>
        /// <param name="value1"></param>
        /// <param name="value2"></param>
        /// <returns></returns>
        Range(value1, value2) {
            return null;
        }
        /// <summary>
        /// 123
        /// </summary>
        /// <param name="value1"></param>
        /// <param name="value2"></param>
        /// <returns></returns>
        ToNumber(value1) {
            return null;
        }
        /// <summary>
        /// 123
        /// </summary>
        /// <param name="value1"></param>
        /// <param name="value2"></param>
        /// <returns></returns>
        ToString(value1) {
            return null;
        }
        /// <summary>
        /// ++
        /// </summary>
        /// <param name="value1"></param>
        /// <param name="value2"></param>
        /// <returns></returns>
        Increment(value1) {
            return null;
        }
        /// <summary>
        /// --
        /// </summary>
        /// <param name="value1"></param>
        /// <param name="value2"></param>
        /// <returns></returns>
        Decrement(value1) {
            return null;
        }
    }
    FScript.OperatorExecBase = OperatorExecBase;
    class ExcuteProxy extends OperatorExecBase {
        constructor() {
            super(...arguments);
            this.runMethod = null;
        }
        get RunMethod() {
            {
                if (this.runMethod == null) {
                    this.runMethod = new FScript.MethodCollection();
                }
                return this.runMethod;
            }
        }
        set RunMethod(value) {
            this.runMethod = value;
        }
        GetKeyValue(key) {
            key = key.toLowerCase();
            switch (key) {
                case ExcuteProxy.Default_KeyWords_THIS:
                    return this.RunMethod;
                case ExcuteProxy.Default_KeyWords_ME:
                    return this.ME;
                case ExcuteProxy.Default_KeyWords_Yes:
                    return true;
                case ExcuteProxy.Default_KeyWords_No:
                    return false;
                case ExcuteProxy.Default_KeyWords_Current:
                    return this.Current;
                default:
                    if (this.HasKey(key)) {
                        let value = this.KeyValues.get(key);
                        console.log(value);
                        return value;
                    }
                    break;
            }
            throw new FScript.SyntacticException(key + " 未定义");
        }
        Combine(value1, value2) {
            return FScript.ConvertHelper.ToString(value1) + FScript.ConvertHelper.ToString(value2);
        }
        Add(value1, value2) {
            let value = null;
            if (FScript.ConvertHelper.IsNumber(value1) && FScript.ConvertHelper.IsNumber(value2)) {
                let v1 = FScript.ConvertHelper.ToDecimal(value1);
                let v2 = FScript.ConvertHelper.ToDecimal(value2);
                value = v1 + v2;
                return value;
            }
            return FScript.ConvertHelper.ToString(value1) + FScript.ConvertHelper.ToString(value2);
        }
        LogicalAND(value1, value2) {
            let value = false;
            let bvalue1 = FScript.ConvertHelper.ToBoolean(value1);
            let bvalue2 = FScript.ConvertHelper.ToBoolean(value2);
            value = bvalue1 && bvalue2;
            return value;
        }
        Range(value1, value2) {
            let value = null;
            return value;
        }
        Divide(value1, value2) {
            let value = null;
            value = value1 / value2;
            return value;
        }
        Equal(value1, value2) {
            let value = null;
            value = value1.ToString() == value2.ToString();
            return value;
        }
        Function(value1, values) {
            let value = null;
            let vs = values;
            let list = new FScript.List();
            list.add(this);
            if (vs != null) {
                vs.forEach((value) => {
                    list.add(value);
                });
            }
            let method = FScript.ConvertHelper.ToString(value1);
            value = this.RunMethod.RunMethod(this.ME, method, list);
            return value;
        }
        Index(value1, value2) {
            let value = value1[value2];
            return value;
        }
        LessThan(value1, value2) {
            let value = false;
            let dvalue1 = FScript.ConvertHelper.ToDecimal(value1);
            let dvalue2 = FScript.ConvertHelper.ToDecimal(value2);
            value = dvalue1 < dvalue2;
            return value;
        }
        LessThanEqual(value1, value2) {
            let value = false;
            let dvalue1 = FScript.ConvertHelper.ToDecimal(value1);
            let dvalue2 = FScript.ConvertHelper.ToDecimal(value2);
            value = dvalue1 <= dvalue2;
            return value;
        }
        Minus(value1, value2) {
            let value = null;
            value = value1 - value2;
            return value;
        }
        Mod(value1, value2) {
            let value = null;
            let ivalue1 = FScript.ConvertHelper.ToInt32(value1);
            let ivalue2 = FScript.ConvertHelper.ToInt32(value2);
            value = ivalue1 % ivalue2;
            return value;
        }
        MoreThan(value1, value2) {
            let value = false;
            let dvalue1 = FScript.ConvertHelper.ToDecimal(value1);
            let dvalue2 = FScript.ConvertHelper.ToDecimal(value2);
            value = dvalue1 > dvalue2;
            return value;
        }
        MoreThanEqual(value1, value2) {
            let value = false;
            let dvalue1 = FScript.ConvertHelper.ToDecimal(value1);
            let dvalue2 = FScript.ConvertHelper.ToDecimal(value2);
            value = dvalue1 >= dvalue2;
            return value;
        }
        Multiply(value1, value2) {
            let value = null;
            value = value1 * value2;
            return value;
        }
        Negative(value1) {
            let value = null;
            if (FScript.ConvertHelper.IsNumber(value1)) {
                return FScript.ConvertHelper.ToDecimal(value1) * -1;
            }
            return value;
        }
        Not(value1) {
            let value = false;
            let bvalue1 = FScript.ConvertHelper.ToBoolean(value1);
            value = !bvalue1;
            return value;
        }
        NotEqual(value1, value2) {
            let value = false;
            value = value1.ToString() != value2.ToString();
            return value;
        }
        LogicalOR(value1, value2) {
            let value = false;
            let bvalue1 = FScript.ConvertHelper.ToBoolean(value1);
            let bvalue2 = FScript.ConvertHelper.ToBoolean(value2);
            value = bvalue1 || bvalue2;
            return value;
        }
        Parenthesis(value1) {
            return value1;
        }
        Property(value1, value2) {
            let value = value1[value2];
            return value;
        }
        PropertyFunction(value1, value2, values) {
            let value = null;
            if (value1 != null && value2 != null) {
            }
            return value;
        }
        BitwiseShiftLeft(value1, value2) {
            let res1 = FScript.ConvertHelper.ToInt32(value1);
            let res2 = FScript.ConvertHelper.ToInt32(value2);
            return res1 << res2;
        }
        BitwiseShiftRight(value1, value2) {
            let res1 = FScript.ConvertHelper.ToInt32(value1);
            let res2 = FScript.ConvertHelper.ToInt32(value2);
            return res1 >> res2;
        }
        BitwiseOR(value1, value2) {
            let res1 = FScript.ConvertHelper.ToInt32(value1);
            let res2 = FScript.ConvertHelper.ToInt32(value2);
            return res1 | res2;
        }
        BitwiseAnd(value1, value2) {
            let res1 = FScript.ConvertHelper.ToInt32(value1);
            let res2 = FScript.ConvertHelper.ToInt32(value2);
            return res1 & res2;
        }
        BitwiseXOR(value1, value2) {
            let res1 = FScript.ConvertHelper.ToInt32(value1);
            let res2 = FScript.ConvertHelper.ToInt32(value2);
            return res1 ^ res2;
        }
        BitwiseNOT(value1) {
            let res1 = FScript.ConvertHelper.ToInt32(value1);
            return ~res1;
        }
        ToNumber(value1) {
            let res1 = FScript.ConvertHelper.ToInt32(value1);
            return res1;
        }
        Increment(value1) {
            let res1 = FScript.ConvertHelper.ToInt32(value1);
            res1++;
            return res1;
        }
        Decrement(value1) {
            let res1 = FScript.ConvertHelper.ToInt32(value1);
            res1--;
            return res1;
        }
        ToString(value1) {
            let res1 = FScript.ConvertHelper.ToString(value1);
            return res1;
        }
    }
    ExcuteProxy.Default_KeyWords_THIS = "this";
    ExcuteProxy.Default_KeyWords_Current = "Current";
    ExcuteProxy.Default_KeyWords_ME = "me";
    ExcuteProxy.Default_KeyWords_Yes = "是";
    ExcuteProxy.Default_KeyWords_No = "否";
    FScript.ExcuteProxy = ExcuteProxy;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class Parse {
        Exec(operatorexec, table) {
            try {
                let obj = this.exp(operatorexec, table);
                let token = table.Peek();
                if (token != FScript.Token.End) {
                    throw new FScript.CBExpressException("" + this.GetErrorText() + "语法不正确，未正确结束" + " Row:" + token.Line + " Column:" + token.Column, token);
                }
                return obj;
            }
            catch (ex) {
                let exc = new FScript.CBExpressException("" + this.GetErrorText() + " 程序遇到异常" + ex.Message, table.Peek(), ex);
                throw exc;
            }
        }
        PopupToken(table) {
            let token = table.Pop();
            this.Token10 = this.Token9;
            this.Token9 = this.Token8;
            this.Token8 = this.Token7;
            this.Token7 = this.Token6;
            this.Token6 = this.Token5;
            this.Token5 = this.Token4;
            this.Token4 = this.Token3;
            this.Token3 = this.Token2;
            this.Token2 = this.Token1;
            this.Token1 = token;
            return token;
        }
        GetErrorText() {
            let text = this.TokenValue(this.Token10)
                + " "
                + this.TokenValue(this.Token9)
                + " "
                + this.TokenValue(this.Token8)
                + " "
                + this.TokenValue(this.Token7)
                + " "
                + this.TokenValue(this.Token6)
                + " "
                + this.TokenValue(this.Token5)
                + " "
                + this.TokenValue(this.Token4)
                + " "
                + this.TokenValue(this.Token3)
                + " "
                + this.TokenValue(this.Token2)
                + " "
                + this.TokenValue(this.Token1);
            return " 语法错误:" + text.trim();
        }
        TokenValue(token) {
            if (token == null)
                return "";
            return token.Value;
        }
        exp(operatorexec, table) {
            let obj = this.logical_or_exp(operatorexec, table);
            return obj;
        }
        /// <summary>
        /// ||
        /// </summary> 
        logical_or_exp(operatorexec, table) {
            let value1 = this.logical_and_exp(operatorexec, table);
            let token = table.Peek();
            while (token.Type == FScript.TokenType.logical_or_exp) {
                token = this.PopupToken(table);
                let value2 = this.logical_and_exp(operatorexec, table);
                value1 = FScript.OperatorLogical_or.Instance.Exec(this, operatorexec, value1, value2, token);
                token = table.Peek();
            }
            return value1;
        }
        logical_and_exp(operatorexec, table) {
            let value1 = this.inclusive_or_exp(operatorexec, table);
            let token = table.Peek();
            while (token.Type == FScript.TokenType.logical_and_exp) {
                token = this.PopupToken(table);
                let value2 = this.inclusive_or_exp(operatorexec, table);
                value1 = FScript.OperatorLogical_and.Instance.Exec(this, operatorexec, value1, value2, token);
                token = table.Peek();
            }
            return value1;
        }
        inclusive_or_exp(operatorexec, table) {
            let value1 = this.exclusive_or_exp(operatorexec, table);
            let token = table.Peek();
            while (token.Type == FScript.TokenType.inclusive_or_exp) {
                token = this.PopupToken(table);
                let value2 = this.exclusive_or_exp(operatorexec, table);
                value1 = FScript.OperatorInclusive_or.Instance.Exec(this, operatorexec, value1, value2, token);
                token = table.Peek();
            }
            return value1;
        }
        exclusive_or_exp(operatorexec, table) {
            let value1 = this.and_exp(operatorexec, table);
            let token = table.Peek();
            while (token.Type == FScript.TokenType.exclusive_or_exp) {
                token = this.PopupToken(table);
                let value2 = this.and_exp(operatorexec, table);
                value1 = FScript.OperatorExclusive_or.Instance.Exec(this, operatorexec, value1, value2, token);
                token = table.Peek();
            }
            return value1;
        }
        and_exp(operatorexec, table) {
            let value1 = this.equality_exp(operatorexec, table);
            let token = table.Peek();
            while (token.Type == FScript.TokenType.and_exp) {
                token = this.PopupToken(table);
                let value2 = this.equality_exp(operatorexec, table);
                value1 = FScript.OperatorAnd.Instance.Exec(this, operatorexec, value1, value2, token);
                token = table.Peek();
            }
            return value1;
        }
        equality_exp(operatorexec, table) {
            let value1 = this.relational_exp(operatorexec, table);
            let token = table.Peek();
            while (token.Type == FScript.TokenType.equality_exp) {
                token = this.PopupToken(table);
                let value2 = this.relational_exp(operatorexec, table);
                value1 = FScript.OperatorEquality.Instance.Exec(this, operatorexec, value1, value2, token);
                token = table.Peek();
            }
            return value1;
        }
        relational_exp(operatorexec, table) {
            let value1 = this.shift_expression(operatorexec, table);
            let token = table.Peek();
            while (token.Type == FScript.TokenType.relational_exp) {
                token = this.PopupToken(table);
                let value2 = this.shift_expression(operatorexec, table);
                value1 = FScript.OperatorRelational.Instance.Exec(this, operatorexec, value1, value2, token);
                token = table.Peek();
            }
            return value1;
        }
        shift_expression(operatorexec, table) {
            let value1 = this.additive_exp(operatorexec, table);
            let token = table.Peek();
            while (token.Type == FScript.TokenType.shift_expression) {
                token = this.PopupToken(table);
                let value2 = this.additive_exp(operatorexec, table);
                value1 = FScript.OperatorShift.Instance.Exec(this, operatorexec, value1, value2, token);
                token = table.Peek();
            }
            return value1;
        }
        additive_exp(operatorexec, table) {
            let value1 = this.mult_exp(operatorexec, table);
            let token = table.Peek();
            while (token.Type == FScript.TokenType.additive_exp) {
                token = this.PopupToken(table);
                let value2 = this.mult_exp(operatorexec, table);
                value1 = FScript.OperatorAdditive.Instance.Exec(this, operatorexec, value1, value2, token);
                token = table.Peek();
            }
            return value1;
        }
        mult_exp(operatorexec, table) {
            let value1 = this.unary_exp(operatorexec, table);
            let token = table.Peek();
            while (token.Type == FScript.TokenType.mult_exp) {
                token = this.PopupToken(table);
                let value2 = this.unary_exp(operatorexec, table);
                value1 = FScript.OperatorMult.Instance.Exec(this, operatorexec, value1, value2, token);
                token = table.Peek();
            }
            return value1;
        }
        unary_exp(operatorexec, table) {
            let value1 = null;
            let token = table.Peek();
            if (token.Type == FScript.TokenType.unary_exp || token.Value == "-") {
                token = this.PopupToken(table);
                value1 = this.unary_exp(operatorexec, table);
                value1 = FScript.OperatorUnary.Instance.Exec(this, operatorexec, value1, null, token);
                return value1;
            }
            value1 = this.postfix_exp(operatorexec, table);
            return value1;
        }
        postfix_exp(operatorexec, table) {
            let token = table.Peek();
            let value1 = null;
            switch (token.Type) {
                case FScript.TokenType.ID:
                    value1 = this.id_exp(operatorexec, table);
                    break;
                default:
                    value1 = this.primary_exp(operatorexec, table);
                    break;
            }
            return FScript.OperatorPostfix.Instance.Exec(this, operatorexec, value1, null, token);
        }
        id_exp(operatorexec, table) {
            let token = this.PopupToken(table);
            let id = token.Value;
            let tokennext = table.Peek();
            if (tokennext.Type == FScript.TokenType.function_exp_begin) {
                return this.function_exp(operatorexec, table, id);
            }
            let value1 = FScript.OperatorID.Instance.Exec(this, operatorexec, id, null, token);
            return value1;
        }
        primary_exp(operatorexec, table) {
            let token = table.Peek();
            switch (token.Type) {
                case FScript.TokenType.function_exp_begin:
                    token = this.PopupToken(table);
                    let value = this.exp(operatorexec, table);
                    token = table.Peek();
                    if (token.Type == FScript.TokenType.function_exp_end) {
                        token = this.PopupToken(table);
                        return value;
                    }
                    break;
                case FScript.TokenType.NULL:
                    token = this.PopupToken(table);
                    return FScript.OperatorConst_Null.Instance.Exec(this, operatorexec, null, null, token);
                case FScript.TokenType.CONST_NUMBER:
                    token = this.PopupToken(table);
                    return FScript.OperatorConst_Number.Instance.Exec(this, operatorexec, null, null, token);
                case FScript.TokenType.CONST_STRING:
                    token = this.PopupToken(table);
                    return FScript.OperatorConst_String.Instance.Exec(this, operatorexec, null, null, token);
                case FScript.TokenType.THIS:
                    token = this.PopupToken(table);
                    return FScript.OperatorConst_This.Instance.Exec(this, operatorexec, null, null, token);
                case FScript.TokenType.TRUE:
                    token = this.PopupToken(table);
                    return FScript.OperatorConst_True.Instance.Exec(this, operatorexec, null, null, token);
                case FScript.TokenType.FALSE:
                    token = this.PopupToken(table);
                    return FScript.OperatorConst_False.Instance.Exec(this, operatorexec, null, null, token);
                default:
                    break;
            }
            let ex = new FScript.CBExpressException("" + this.GetErrorText() + "语法不正确未结束" + " Row:" + token.Line + " Column:" + token.Column, token);
            ex.RowIndex = token.Line;
            ex.ColumnIndex = token.Column;
            throw ex;
        }
        function_exp(operatorexec, table, functionname) {
            let token = table.Peek();
            switch (token.Type) {
                case FScript.TokenType.function_exp_begin:
                    token = this.PopupToken(table);
                    token = table.Peek();
                    if (token.Type == FScript.TokenType.function_exp_end) {
                        token = this.PopupToken(table);
                        return FScript.OperatorFunction.Instance.Exec(this, operatorexec, functionname, null, token);
                    }
                    let value1 = this.argument_exp_list(operatorexec, table);
                    token = table.Peek();
                    if (token.Type == FScript.TokenType.function_exp_end) {
                        token = this.PopupToken(table);
                        return FScript.OperatorFunction.Instance.Exec(this, operatorexec, functionname, value1, token);
                    }
                    break;
                default:
                    break;
            }
            let ex = new FScript.CBExpressException("" + this.GetErrorText() + "函数" + functionname + "不正确" + " Row:" + token.Line + " Column:" + token.Column, token);
            ex.RowIndex = token.Line;
            ex.ColumnIndex = token.Column;
            throw ex;
        }
        argument_exp_list(operatorexec, table) {
            let list = new FScript.List();
            let token = table.Peek();
            let value = null;
            value = this.exp(operatorexec, table);
            list.Add(value);
            token = table.Peek();
            switch (token.Type) {
                case FScript.TokenType.argument_exp_list:
                    token = this.PopupToken(table);
                    this.argument_exp_list2(operatorexec, table, list);
                    break;
                case FScript.TokenType.function_exp_end:
                    break;
                default:
                    let ex = new FScript.CBExpressException("" + this.GetErrorText() + "函数参数不正确，是否少右括号" + " Row:" + token.Line + " Column:" + token.Column, token);
                    ex.RowIndex = token.Line;
                    ex.ColumnIndex = token.Column;
                    throw ex;
            }
            return FScript.OperatorArgument_list.Instance.Exec(this, operatorexec, list, null, token);
        }
        argument_exp_list2(operatorexec, table, list) {
            let token = table.Peek();
            let value = null;
            value = this.exp(operatorexec, table);
            list.Add(value);
            token = table.Peek();
            switch (token.Type) {
                case FScript.TokenType.argument_exp_list:
                    token = this.PopupToken(table);
                    this.argument_exp_list2(operatorexec, table, list);
                    break;
                case FScript.TokenType.function_exp_end:
                    break;
                default:
                    let ex = new FScript.CBExpressException("" + this.GetErrorText() + "函数未正确结束" + " Row:" + token.Line + " Column:" + token.Column, token);
                    ex.RowIndex = token.Line;
                    ex.ColumnIndex = token.Column;
                    throw ex;
            }
        }
    }
    FScript.Parse = Parse;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    /// <summary>
    /// | additive_exp '+' mult_exp
    ///	| additive_exp '-' mult_exp
    /// </summary>
    class OperatorAdditive extends FScript.OperatorBase {
        static get Instance() {
            {
                if (OperatorAdditive.instance == null) {
                    OperatorAdditive.instance = new OperatorAdditive();
                }
                return OperatorAdditive.instance;
            }
        }
        Exec(parse, operatorexec, value1, value2, token) {
            switch (token.Value) {
                case "+":
                    return operatorexec.Add(value1, value2);
                case "-":
                    return operatorexec.Minus(value1, value2);
                default:
                    break;
            }
            let ex = new FScript.CBExpressException("���������ȷ" + " Row:" + token.Line + " Column:" + token.Column, token);
            ex.RowIndex = token.Line;
            ex.ColumnIndex = token.Column;
            throw ex;
        }
    }
    OperatorAdditive.instance = null;
    FScript.OperatorAdditive = OperatorAdditive;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    /// <summary>
    /// and_exp '&' equality_exp  &	��λ��	���ͱ���ʽ&���ͱ���ʽ	����	˫Ŀ�����
    /// </summary>
    class OperatorAnd extends FScript.OperatorBase {
        static get Instance() {
            {
                if (OperatorAnd.instance == null) {
                    OperatorAnd.instance = new OperatorAnd();
                }
                return OperatorAnd.instance;
            }
        }
        Exec(parse, operatorexec, value1, value2, token) {
            switch (token.Value) {
                case "&":
                    return operatorexec.BitwiseAnd(value1, value2);
                default:
                    break;
            }
            let ex = new FScript.CBExpressException("���������ȷ" + " Row:" + token.Line + " Column:" + token.Column, token);
            ex.RowIndex = token.Line;
            ex.ColumnIndex = token.Column;
            throw ex;
        }
    }
    OperatorAnd.instance = null;
    FScript.OperatorAnd = OperatorAnd;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    /// <summary>
    /// list<object> 
    /// </summary>
    class OperatorArgument_list extends FScript.OperatorBase {
        static get Instance() {
            {
                if (OperatorArgument_list.instance == null) {
                    OperatorArgument_list.instance = new OperatorArgument_list();
                }
                return OperatorArgument_list.instance;
            }
        }
        Exec(parse, operatorexec, value1, value2, token) {
            return value1;
        }
    }
    OperatorArgument_list.instance = null;
    FScript.OperatorArgument_list = OperatorArgument_list;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    /// <summary>
    /// null
    /// </summary>
    class OperatorConst_False extends FScript.OperatorBase {
        static get Instance() {
            {
                if (OperatorConst_False.instance == null) {
                    OperatorConst_False.instance = new OperatorConst_False();
                }
                return OperatorConst_False.instance;
            }
        }
        Exec(parse, operatorexec, value1, value2, token) {
            return false;
        }
    }
    OperatorConst_False.instance = null;
    FScript.OperatorConst_False = OperatorConst_False;
})(FScript || (FScript = {}));
//namespace Feng.Script.CBEexpress
//{
//    /// <summary>
//    /// null
//    /// </summary>
//    public class OperatorConst_Item : OperatorBase
//    {
//        private static OperatorConst_Item instance = null;
//        public static OperatorConst_Item Instance
//        {
//            get
//            {
//                if (instance == null)
//                {
//                    instance = new OperatorConst_Item();
//                }
//                return instance;
//            }
//        }
//        public override object Exec(Parse parse, OperatorExecBase operatorexec, object value1, object value2, Token token)
//        {
//            return operatorexec.GetKeyValue(ConvertHelper.ToString(value1));
//        }
//    }
//}
var FScript;
(function (FScript) {
    /// <summary>
    /// null
    /// </summary>
    class OperatorConst_Null extends FScript.OperatorBase {
        static get Instance() {
            {
                if (OperatorConst_Null.instance == null) {
                    OperatorConst_Null.instance = new OperatorConst_Null();
                }
                return OperatorConst_Null.instance;
            }
        }
        Exec(parse, operatorexec, value1, value2, token) {
            return null;
        }
    }
    OperatorConst_Null.instance = null;
    FScript.OperatorConst_Null = OperatorConst_Null;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    /// <summary>
    /// 1234
    /// </summary>
    class OperatorConst_Number extends FScript.OperatorBase {
        static get Instance() {
            {
                if (OperatorConst_Number.instance == null) {
                    OperatorConst_Number.instance = new OperatorConst_Number();
                }
                return OperatorConst_Number.instance;
            }
        }
        Exec(parse, operatorexec, value1, value2, token) {
            return operatorexec.ToNumber(token.Value);
        }
    }
    OperatorConst_Number.instance = null;
    FScript.OperatorConst_Number = OperatorConst_Number;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    /// <summary>
    /// "abc"
    /// </summary>
    class OperatorConst_String extends FScript.OperatorBase {
        static get Instance() {
            {
                if (OperatorConst_String.instance == null) {
                    OperatorConst_String.instance = new OperatorConst_String();
                }
                return OperatorConst_String.instance;
            }
        }
        Exec(parse, operatorexec, value1, value2, token) {
            return token.Value;
        }
    }
    OperatorConst_String.instance = null;
    FScript.OperatorConst_String = OperatorConst_String;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    /// <summary>
    /// this
    /// </summary>
    class OperatorConst_This extends FScript.OperatorBase {
        static get Instance() {
            {
                if (OperatorConst_This.instance == null) {
                    OperatorConst_This.instance = new OperatorConst_This();
                }
                return OperatorConst_This.instance;
            }
        }
        Exec(parse, operatorexec, value1, value2, token) {
            return operatorexec.GetKeyValue(value1);
        }
    }
    OperatorConst_This.instance = null;
    FScript.OperatorConst_This = OperatorConst_This;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    /// <summary>
    /// null
    /// </summary>
    class OperatorConst_True extends FScript.OperatorBase {
        static get Instance() {
            {
                if (OperatorConst_True.instance == null) {
                    OperatorConst_True.instance = new OperatorConst_True();
                }
                return OperatorConst_True.instance;
            }
        }
        Exec(parse, operatorexec, value1, value2, token) {
            return true;
        }
    }
    OperatorConst_True.instance = null;
    FScript.OperatorConst_True = OperatorConst_True;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    /// <summary>
    /// equality_exp '==' relational_exp
    ///	equality_exp '!=' relational_exp
    /// </summary>
    class OperatorEquality extends FScript.OperatorBase {
        static get Instance() {
            {
                if (OperatorEquality.instance == null) {
                    OperatorEquality.instance = new OperatorEquality();
                }
                return OperatorEquality.instance;
            }
        }
        Exec(parse, operatorexec, value1, value2, token) {
            switch (token.Value) {
                case "==":
                    return operatorexec.Equal(value1, value2);
                case "!=":
                    return operatorexec.NotEqual(value1, value2);
                default:
                    break;
            }
            let ex = new FScript.CBExpressException("���������ȷ" + " Row:" + token.Line + " Column:" + token.Column, token);
            ex.RowIndex = token.Line;
            ex.ColumnIndex = token.Column;
            throw ex;
        }
    }
    OperatorEquality.instance = null;
    FScript.OperatorEquality = OperatorEquality;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    /// <summary>
    /// inclusive_or_exp '^' exclusive_or_exp ��λ��	���ͱ���ʽ|���ͱ���ʽ	����	˫Ŀ�����
    /// </summary>
    class OperatorExclusive_or extends FScript.OperatorBase {
        static get Instance() {
            {
                if (OperatorExclusive_or.instance == null) {
                    OperatorExclusive_or.instance = new OperatorExclusive_or();
                }
                return OperatorExclusive_or.instance;
            }
        }
        Exec(parse, operatorexec, value1, value2, token) {
            switch (token.Value) {
                case "^":
                    return operatorexec.BitwiseXOR(value1, value2);
                default:
                    break;
            }
            let ex = new FScript.CBExpressException("���������ȷ" + " Row:" + token.Line + " Column:" + token.Column, token);
            ex.RowIndex = token.Line;
            ex.ColumnIndex = token.Column;
            throw ex;
        }
    }
    OperatorExclusive_or.instance = null;
    FScript.OperatorExclusive_or = OperatorExclusive_or;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    /// <summary>
    /// !
    /// </summary>
    class OperatorFunction extends FScript.OperatorBase {
        static get Instance() {
            {
                if (OperatorFunction.instance == null) {
                    OperatorFunction.instance = new OperatorFunction();
                }
                return OperatorFunction.instance;
            }
        }
        Exec(parse, operatorexec, value1, value2, token) {
            try {
                return operatorexec.Function(value1, value2);
            }
            catch (e) {
                let ex = new FScript.CBExpressException(e + " Row:" + token.Line + " Column:" + token.Column, token);
                ex.RowIndex = token.Line;
                ex.ColumnIndex = token.Column;
                throw ex;
            }
        }
    }
    OperatorFunction.instance = null;
    FScript.OperatorFunction = OperatorFunction;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    /// <summary>
    /// �ؼ���
    /// </summary>
    class OperatorID extends FScript.OperatorBase {
        static get Instance() {
            {
                if (OperatorID.instance == null) {
                    OperatorID.instance = new OperatorID();
                }
                return OperatorID.instance;
            }
        }
        Exec(parse, operatorexec, value1, value2, token) {
            let key = value1;
            let value = operatorexec.GetKeyValue(key);
            if (value == null) {
                if (!operatorexec.HasKey(key)) {
                    let ex = new FScript.CBExpressException(" ������" + key + "��δ���� Row:" + token.Line + " Column:" + token.Column, token);
                    ex.RowIndex = token.Line;
                    ex.ColumnIndex = token.Column;
                    throw ex;
                }
            }
            return value;
        }
    }
    OperatorID.instance = null;
    FScript.OperatorID = OperatorID;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    /// <summary>
    /// |  |	��λ��	���ͱ���ʽ|���ͱ���ʽ	����	˫Ŀ�����
    /// </summary>
    class OperatorInclusive_or extends FScript.OperatorBase {
        static get Instance() {
            {
                if (OperatorInclusive_or.instance == null) {
                    OperatorInclusive_or.instance = new OperatorInclusive_or();
                }
                return OperatorInclusive_or.instance;
            }
        }
        Exec(parse, operatorexec, value1, value2, token) {
            switch (token.Value) {
                case "|":
                    return operatorexec.BitwiseOR(value1, value2);
                default:
                    break;
            }
            let ex = new FScript.CBExpressException("���������ȷ" + " Row:" + token.Line + " Column:" + token.Column, token);
            ex.RowIndex = token.Line;
            ex.ColumnIndex = token.Column;
            throw ex;
        }
    }
    OperatorInclusive_or.instance = null;
    FScript.OperatorInclusive_or = OperatorInclusive_or;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    /// <summary>
    /// &&	�߼���	����ʽ&&����ʽ	����	˫Ŀ�����
    /// </summary>
    class OperatorLogical_and extends FScript.OperatorBase {
        static get Instance() {
            {
                if (OperatorLogical_and.instance == null) {
                    OperatorLogical_and.instance = new OperatorLogical_and();
                }
                return OperatorLogical_and.instance;
            }
        }
        Exec(parse, operatorexec, value1, value2, token) {
            switch (token.Value) {
                case "&&":
                    return operatorexec.LogicalAND(value1, value2);
                default:
                    break;
            }
            let ex = new FScript.CBExpressException("���������ȷ" + " Row:" + token.Line + " Column:" + token.Column, token);
            ex.RowIndex = token.Line;
            ex.ColumnIndex = token.Column;
            throw ex;
        }
    }
    OperatorLogical_and.instance = null;
    FScript.OperatorLogical_and = OperatorLogical_and;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    /// <summary>
    /// ||	�߼���	����ʽ||����ʽ	����	˫Ŀ�����
    /// </summary>
    class OperatorLogical_or extends FScript.OperatorBase {
        static get Instance() {
            {
                if (OperatorLogical_or.instance == null) {
                    OperatorLogical_or.instance = new OperatorLogical_or();
                }
                return OperatorLogical_or.instance;
            }
        }
        Exec(parse, operatorexec, value1, value2, token) {
            switch (token.Value) {
                case "||":
                    return operatorexec.LogicalOR(value1, value2);
                default:
                    break;
            }
            let ex = new FScript.CBExpressException("���������ȷ" + " Row:" + token.Line + " Column:" + token.Column, token);
            ex.RowIndex = token.Line;
            ex.ColumnIndex = token.Column;
            throw ex;
        }
    }
    OperatorLogical_or.instance = null;
    FScript.OperatorLogical_or = OperatorLogical_or;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    /// <summary>
    ///		| mult_exp '*' unary_exp
    ///		| mult_exp '/' unary_exp
    ///		| mult_exp '%' unary_exp
    /// </summary>
    class OperatorMult extends FScript.OperatorBase {
        static get Instance() {
            {
                if (OperatorMult.instance == null) {
                    OperatorMult.instance = new OperatorMult();
                }
                return OperatorMult.instance;
            }
        }
        Exec(parse, operatorexec, value1, value2, token) {
            switch (token.Value) {
                case "*":
                    return operatorexec.Multiply(value1, value2);
                case "/":
                    return operatorexec.Divide(value1, value2);
                case "%":
                    return operatorexec.Mod(value1, value2);
                default:
                    break;
            }
            let ex = new FScript.CBExpressException("���������ȷ" + " Row:" + token.Line + " Column:" + token.Column, token);
            ex.RowIndex = token.Line;
            ex.ColumnIndex = token.Column;
            throw ex;
        }
    }
    OperatorMult.instance = null;
    FScript.OperatorMult = OperatorMult;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    /// <summary> 
    /// 
    /// </summary>
    class OperatorPostfix extends FScript.OperatorBase {
        static get Instance() {
            {
                if (OperatorPostfix.instance == null) {
                    OperatorPostfix.instance = new OperatorPostfix();
                }
                return OperatorPostfix.instance;
            }
        }
        Exec(parse, operatorexec, value1, value2, token) {
            return value1;
        }
    }
    OperatorPostfix.instance = null;
    FScript.OperatorPostfix = OperatorPostfix;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    /// <summary>
    /// !
    /// </summary>
    class OperatorPrimary extends FScript.OperatorBase {
        static get Instance() {
            {
                if (OperatorPrimary.instance == null) {
                    OperatorPrimary.instance = new OperatorPrimary();
                }
                return OperatorPrimary.instance;
            }
        }
        Exec(parse, operatorexec, value1, value2, token) {
            return value1;
        }
    }
    OperatorPrimary.instance = null;
    FScript.OperatorPrimary = OperatorPrimary;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    /// <summary>
    /// | relational_exp '<' shift_expression
    ///	| relational_exp '>' shift_expression
    ///	| relational_exp '<=' shift_expression
    ///	| relational_exp '>=' shift_expression
    /// </summary>
    class OperatorRelational extends FScript.OperatorBase {
        static get Instance() {
            {
                if (OperatorRelational.instance == null) {
                    OperatorRelational.instance = new OperatorRelational();
                }
                return OperatorRelational.instance;
            }
        }
        Exec(parse, operatorexec, value1, value2, token) {
            switch (token.Value) {
                case "<":
                    return operatorexec.LessThan(value1, value2);
                case ">":
                    return operatorexec.MoreThan(value1, value2);
                case ">=":
                    return operatorexec.MoreThanEqual(value1, value2);
                case "<=":
                    return operatorexec.LessThanEqual(value1, value2);
                default:
                    break;
            }
            let ex = new FScript.CBExpressException("���������ȷ" + " Row:" + token.Line + " Column:" + token.Column, token);
            ex.RowIndex = token.Line;
            ex.ColumnIndex = token.Column;
            throw ex;
        }
    }
    OperatorRelational.instance = null;
    FScript.OperatorRelational = OperatorRelational;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    /// <summary>
    /// | shift_expression '<<' additive_exp
    ///	| shift_expression '>>' additive_exp
    /// </summary>
    class OperatorShift extends FScript.OperatorBase {
        static get Instance() {
            {
                if (OperatorShift.instance == null) {
                    OperatorShift.instance = new OperatorShift();
                }
                return OperatorShift.instance;
            }
        }
        Exec(parse, operatorexec, value1, value2, token) {
            switch (token.Value) {
                case "<<":
                    return operatorexec.BitwiseShiftLeft(value1, value2);
                case ">>":
                    return operatorexec.BitwiseShiftRight(value1, value2);
                default:
                    break;
            }
            let ex = new FScript.CBExpressException("���������ȷ" + " Row:" + token.Line + " Column:" + token.Column, token);
            ex.RowIndex = token.Line;
            ex.ColumnIndex = token.Column;
            throw ex;
        }
    }
    OperatorShift.instance = null;
    FScript.OperatorShift = OperatorShift;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    /// <summary>
    /// 	| '++' postfix_exp
    ///		| '--' postfix_exp
    ///		| '-' postfix_exp 
    ///		| '~' postfix_exp 
    ///		| '!' postfix_exp
    /// </summary>
    class OperatorUnary extends FScript.OperatorBase {
        static get Instance() {
            {
                if (OperatorUnary.instance == null) {
                    OperatorUnary.instance = new OperatorUnary();
                }
                return OperatorUnary.instance;
            }
        }
        Exec(parse, operatorexec, value1, value2, token) {
            switch (token.Value) {
                case "++":
                    return operatorexec.Increment(value1);
                case "--":
                    return operatorexec.Decrement(value1);
                case "-":
                    return operatorexec.Negative(value1);
                case "~":
                    return operatorexec.BitwiseNOT(value1);
                case "!":
                    return operatorexec.Not(value1);
                default:
                    break;
            }
            let ex = new FScript.CBExpressException("���������ȷ" + " Row:" + token.Line + " Column:" + token.Column, token);
            ex.RowIndex = token.Line;
            ex.ColumnIndex = token.Column;
            throw ex;
        }
    }
    OperatorUnary.instance = null;
    FScript.OperatorUnary = OperatorUnary;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class StatementBase {
        Exec(parent, script) {
        }
        Build(statements) {
            statements.Pop();
        }
    }
    FScript.StatementBase = StatementBase;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class StatementBreak extends FScript.StatementBase {
        Exec(parent, script) {
            if (parent == null) {
                let ex = new FScript.CBExpressException("Break Error Row:" + this.Index, null);
                ex.RowIndex = this.Index;
                throw ex;
            }
            parent.Break = true;
            let value = null;
            script.Write(script, this.SymbolTable, "#Res", value);
            return true;
        }
        ToString() {
            return "Break ";
        }
    }
    FScript.StatementBreak = StatementBreak;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class StatementCall extends FScript.StatementBase {
        Exec(parent, script) {
            this.SymbolTable.ReSetPosition();
            this.SymbolTable.Pop();
            let name = this.SymbolTable.Pop().Value;
            let isstatic = false;
            if (name.toUpperCase() == "STATIC") {
                isstatic = true;
                name = this.SymbolTable.Pop().Value;
            }
            let value = null;
            this.Break = false;
            let obj = null;
            if (isstatic) {
                obj = script.ExecProxy.STATICVALUES[name.toUpperCase()];
            }
            else {
                obj = script.ExecProxy.GetKeyValue(name);
            }
            let Statementslist = obj;
            script.Write(script, this.SymbolTable, "Call", "");
            for (let i = 0; i < Statementslist.Count; i++) {
                let statement = Statementslist.get(i);
                if (this.Break) {
                    return value;
                }
                value = statement.Exec(this, script);
                if (script.Finished) {
                    return script.FinishObj;
                }
            }
            script.Write(script, this.SymbolTable, "Call", value);
            return value;
        }
        ToString() {
            return "Call ";
        }
    }
    FScript.StatementCall = StatementCall;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class StatementCollection extends FScript.List {
        constructor() {
            super();
            this.Index = 0;
        }
        IndexOf(item) {
            return this.IndexOf(item);
        }
        Insert(index, item) {
            if (this.Contains(item))
                return;
            this.Insert(index, item);
        }
        RemoveAt(index) {
            this.RemoveAt(index);
        }
        //public StatementBase this[int index]
        //{
        //    get
        //    {
        //        return list[index];
        //    }
        //    set
        //    {
        //        list[index] = value;
        //    }
        //}
        //public Add(item: StatementBase)
        //{
        //    if (this.Contains(item))
        //        return;
        //    this.Add(item);
        //}
        Remove(item) {
            return this.Remove(item);
        }
        Next(item) {
            if (item.Index < this.Count - 1) {
                return this[item.Index + 1];
            }
            return null;
        }
        Peek() {
            if (this.Index < this.Count - 1) {
                return this[this.Index + 1];
            }
            return null;
        }
        Current() {
            if (this.Index < this.Count) {
                return this[this.Index];
            }
            return null;
        }
        Pop() {
            this.Index = this.Index + 1;
            if (this.Index < this.Count) {
                let statement = this[this.Index];
                return statement;
            }
            return null;
        }
    }
    FScript.StatementCollection = StatementCollection;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class StatementEquality extends FScript.StatementBase {
        Exec(parent, script) {
            this.SymbolTable.ReSetPosition();
            let token = this.SymbolTable.Pop();
            if (token.Type != FScript.TokenType.ID) {
                let ex = new FScript.CBExpressException("Var Error:" + this.Index, null);
                ex.RowIndex = token.Line;
                ex.ColumnIndex = token.Column;
                throw ex;
            }
            let vara = token.Value;
            token = this.SymbolTable.Pop();
            let value = null;
            if (token == FScript.Token.End) {
                let ex = new FScript.CBExpressException("Var TokenEnd Error:" + this.Index, null);
                ex.RowIndex = token.Line;
                ex.ColumnIndex = token.Column;
                throw ex;
            }
            if (token.Type != FScript.TokenType.equality) {
                let ex = new FScript.CBExpressException("Var Equality Error:" + this.Index, null);
                ex.RowIndex = token.Line;
                ex.ColumnIndex = token.Column;
                throw ex;
            }
            value = script.Exec(this.SymbolTable);
            script.ExecProxy.SetKeyValue(vara, value);
            script.Write(script, this.SymbolTable, vara, value);
            return value;
        }
        ToString() {
            return "Equality ";
        }
    }
    FScript.StatementEquality = StatementEquality;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class StatementExpress extends FScript.StatementBase {
        Exec(parent, script) {
            this.SymbolTable.ReSetPosition();
            let value = script.Exec(this.SymbolTable);
            script.Write(script, this.SymbolTable, "#Res", value);
            return value;
        }
    }
    FScript.StatementExpress = StatementExpress;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class StatementFor extends FScript.StatementBase {
        constructor() {
            super(...arguments);
            this.statementslist = null;
        }
        ExecFor(symbolTable, script) {
            symbolTable.ReSetPosition();
            let token = symbolTable.Pop();
            token = symbolTable.Pop();
            if (token.Type != FScript.TokenType.ID) {
                let ex = new FScript.CBExpressException("For Error:" + this.Index, null);
                ex.RowIndex = token.Line;
                ex.ColumnIndex = token.Column;
                throw ex;
            }
            if (token.Value.toLowerCase() == "var") {
                token = symbolTable.Pop();
                if (token.Type != FScript.TokenType.ID) {
                    let ex = new FScript.CBExpressException("For Token Type Error:" + this.Index, null);
                    ex.RowIndex = token.Line;
                    ex.ColumnIndex = token.Column;
                    throw ex;
                }
            }
            let var2 = token.Value;
            token = symbolTable.Pop();
            let value = null;
            if (token == FScript.Token.End) {
                let ex = new FScript.CBExpressException("For TokenEnd Error:" + this.Index, null);
                ex.RowIndex = this.Index;
                ex.ColumnIndex = token.Column;
                throw ex;
            }
            if (token.Type != FScript.TokenType.equality) {
                let ex = new FScript.CBExpressException("For TokenEnd Error:" + this.Index, null);
                ex.RowIndex = this.Index;
                ex.ColumnIndex = token.Column;
                throw ex;
            }
            value = script.Exec(symbolTable);
            script.ExecProxy.SetKeyValue(var2, value);
            script.Write(script, symbolTable, var2, value);
            return value;
        }
        Exec(parent, script) {
            let value = this.ExecFor(this.SymbolTable, script);
            script.Write(script, this.SymbolTable, "For Begin #Res", value);
            let res = true;
            let result = null;
            this.Break = false;
            while (res) {
                let itemif = this.Statementslist[0];
                itemif.SymbolTable.ReSetPosition();
                value = script.Exec(itemif.SymbolTable);
                res = FScript.ConvertHelper.ToBoolean(value);
                script.Write(script, itemif.SymbolTable, "#Res", value);
                if (res) {
                    for (let i = 2; i < this.Statementslist.Count; i++) {
                        let item = this.Statementslist[i];
                        if (script.Finished) {
                            return script.FinishObj;
                        }
                        if (this.Break) {
                            return result;
                        }
                        result = item.Exec(this, script);
                    }
                    let itemautoadd = this.Statementslist[1];
                    itemautoadd.SymbolTable.ReSetPosition();
                    value = itemautoadd.Exec(parent, script);
                    script.Write(script, itemautoadd.SymbolTable, "For Next #Res", value);
                }
            }
            script.Write(script, this.SymbolTable, "For End", value);
            return result;
        }
        ToString() {
            return "While ";
        }
        get Statementslist() {
            if (this.statementslist == null) {
                this.statementslist = new FScript.List();
            }
            return this.statementslist;
        }
        Build(statements) {
            let statement = statements.Current();
            statements.Pop();
            while (true) {
                statement = statements.Current();
                if (statement == null) {
                    let ex = new FScript.CBExpressException("EndFor Exec:" + this.Index, null);
                    ex.RowIndex = this.Index;
                    throw ex;
                }
                if (this.Break) {
                    return;
                }
                if (statement instanceof StatementEndFor) {
                    this.End = statement;
                    statement.Build(statements);
                    return;
                }
                statement.Build(statements);
                this.Statementslist.Add(statement);
            }
        }
    }
    FScript.StatementFor = StatementFor;
    class StatementEndFor extends FScript.StatementBase {
        ToString() {
            return "EndFor ";
        }
        Exec(parent, script) {
            let ex = new FScript.CBExpressException("EndFor Exec:" + this.Index, null);
            ex.RowIndex = this.Index;
            throw ex;
        }
    }
    FScript.StatementEndFor = StatementEndFor;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class StatementForeach extends FScript.StatementBase {
        constructor() {
            super(...arguments);
            this.statementslist = null;
        }
        Exec(parent, script) {
            this.SymbolTable.ReSetPosition();
            this.SymbolTable.Pop();
            let itemkey = this.SymbolTable.Pop().Value;
            let intext = this.SymbolTable.Pop().Value;
            let listkey = this.SymbolTable.Pop().Value;
            this.ItemKey = itemkey;
            this.ListKey = listkey;
            let value = null;
            let objlist = script.ExecProxy.GetKeyValue(listkey);
            //System.Collections.IEnumerable list = objlist as System.Collections.IEnumerable;
            //System.Collections.IEnumerator enumerator = list.GetEnumerator();
            this.Break = false;
            script.Write(script, this.SymbolTable, "Begin", "");
            for (let i = 0; i < objlist.Count; i++) {
                let item = objlist[i];
                script.Write(script, this.SymbolTable, itemkey, item);
                script.ExecProxy.SetKeyValue(itemkey, item);
                for (let j = 0; j < this.Statementslist.Count; j++) {
                    let statement = this.Statementslist[j];
                    if (this.Break) {
                        return value;
                    }
                    value = statement.Exec(this, script);
                    if (script.Finished) {
                        return script.FinishObj;
                    }
                }
            }
            script.Write(script, this.SymbolTable, "End", value);
            return value;
        }
        ToString() {
            return "Foreach ";
        }
        get Statementslist() {
            if (this.statementslist == null) {
                this.statementslist = new FScript.List();
            }
            return this.statementslist;
        }
        Build(statements) {
            let statement = statements.Current();
            statements.Pop();
            while (true) {
                statement = statements.Current();
                if (statement == null) {
                    return;
                }
                if (statement instanceof StatementEndForeach) {
                    this.End = statement;
                    statement.Build(statements);
                    return;
                }
                statement.Build(statements);
                this.Statementslist.Add(statement);
            }
        }
    }
    FScript.StatementForeach = StatementForeach;
    class StatementEndForeach extends FScript.StatementBase {
        ToString() {
            return "EndForeach ";
        }
        Exec(parent, script) {
            let ex = new FScript.CBExpressException("EndForeach Exec:" + this.Index, null);
            ex.RowIndex = this.Index;
            throw ex;
        }
    }
    FScript.StatementEndForeach = StatementEndForeach;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class StatementIF extends FScript.StatementBase {
        constructor() {
            super(...arguments);
            this.statementslist = null;
            this.elselist = null;
        }
        Exec(parent, script) {
            this.SymbolTable.ReSetPosition();
            this.SymbolTable.Pop();
            let value = script.Exec(this.SymbolTable);
            let res = FScript.ConvertHelper.ToBoolean(value);
            script.Write(script, this.SymbolTable, "#Res", value);
            if (res) {
                script.Write(script, this.SymbolTable, "Begin", "");
                for (let i = 0; i < this.Statementslist.Count; i++) {
                    let statement = this.Statementslist[i];
                    if (statement instanceof FScript.StatementIFElse) {
                        break;
                    }
                    value = statement.Exec(parent, script);
                    if (script.Finished) {
                        return script.FinishObj;
                    }
                }
                script.Write(script, this.SymbolTable, "End", value);
            }
            else {
                for (let i = 0; i < this.ElseList.Count; i++) {
                    let statement = this.ElseList[i];
                    let statementels = statement;
                    if (!statementels.CanExec(script)) {
                        continue;
                    }
                    value = statement.Exec(parent, script);
                    if (script.Finished) {
                        return script.FinishObj;
                    }
                    return value;
                }
            }
            return value;
        }
        ToString() {
            return "IF ";
        }
        get Statementslist() {
            if (this.statementslist == null) {
                this.statementslist = new FScript.List();
            }
            return this.statementslist;
        }
        get ElseList() {
            if (this.elselist == null) {
                this.elselist = new FScript.List();
            }
            return this.elselist;
        }
        Build(statements) {
            let statement = statements.Current();
            statements.Pop();
            while (true) {
                statement = statements.Current();
                if (statement == null) {
                    return;
                }
                if (statement instanceof StatementEndIF) {
                    this.End = statement;
                    statement.Build(statements);
                    return;
                }
                if (statement instanceof FScript.StatementIFElse) {
                    let stateMentElse = statement;
                    stateMentElse.Build(statements);
                    this.ElseList.Add(stateMentElse);
                    continue;
                }
                statement.Build(statements);
                this.Statementslist.Add(statement);
            }
        }
    }
    FScript.StatementIF = StatementIF;
    class StatementEndIF extends FScript.StatementBase {
        ToString() {
            return "EndIF ";
        }
        Exec(parent, script) {
            let ex = new FScript.CBExpressException("EndIF Exec:" + this.Index, null);
            ex.RowIndex = this.Index;
            throw ex;
        }
    }
    FScript.StatementEndIF = StatementEndIF;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class StatementIFElse extends FScript.StatementBase {
        constructor() {
            super(...arguments);
            this.statementslist = null;
        }
        Build(statements) {
            let statement = statements.Current();
            statements.Pop();
            while (true) {
                statement = statements.Current();
                if (statement == null) {
                    return;
                }
                if (statement instanceof FScript.StatementEndIF) {
                    return;
                }
                if (statement instanceof StatementIFElse) {
                    return;
                }
                statement.Build(statements);
                this.Statementslist.Add(statement);
            }
        }
        CanExec(script) {
            if (this.SymbolTable.Count < 2) {
                return true;
            }
            this.SymbolTable.ReSetPosition();
            this.SymbolTable.Pop();
            let value = script.Exec(this.SymbolTable);
            let res = FScript.ConvertHelper.ToBoolean(value);
            script.Write(script, this.SymbolTable, "#Res", value);
            return res;
        }
        Exec(parent, script) {
            this.SymbolTable.ReSetPosition();
            this.SymbolTable.Pop();
            let value = null;
            script.Write(script, this.SymbolTable, "Begin", "");
            for (let i = 0; i < this.Statementslist.Count; i++) {
                let statement = this.Statementslist[i];
                if (statement instanceof StatementIFElse) {
                    break;
                }
                value = statement.Exec(parent, script);
            }
            script.Write(script, this.SymbolTable, "End", value);
            return value;
        }
        ToString() {
            return "Else ";
        }
        get Statementslist() {
            if (this.statementslist == null) {
                this.statementslist = new FScript.List();
            }
            return this.statementslist;
        }
    }
    FScript.StatementIFElse = StatementIFElse;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class StatementProc extends FScript.StatementBase {
        constructor() {
            super(...arguments);
            this.End = null;
            this.statementslist = null;
        }
        Exec(parent, script) {
            this.SymbolTable.ReSetPosition();
            this.SymbolTable.Pop();
            let name = this.SymbolTable.Pop().Value;
            let isstatic = false;
            if (name.toUpperCase() == "STATIC") {
                isstatic = true;
                name = this.SymbolTable.Pop().Value;
            }
            this.Break = false;
            script.Write(script, this.SymbolTable, "Proc", "");
            if (isstatic) {
                script.ExecProxy.STATICVALUES[name.toUpperCase()] = this.Statementslist;
            }
            else {
                script.ExecProxy.SetKeyValue(name, this.Statementslist);
            }
            script.Write(script, this.SymbolTable, "EndProc", name);
            return name;
        }
        ToString() {
            return "Foreach ";
        }
        get Statementslist() {
            {
                if (this.statementslist == null) {
                    this.statementslist = new FScript.List();
                }
                return this.statementslist;
            }
        }
        Build(statements) {
            let statement = statements.Current();
            statements.Pop();
            while (true) {
                statement = statements.Current();
                if (statement == null) {
                    return;
                }
                if (statement instanceof StatementEndProc) {
                    this.End = statement;
                    statement.Build(statements);
                    return;
                }
                statement.Build(statements);
                this.Statementslist.Add(statement);
            }
        }
    }
    FScript.StatementProc = StatementProc;
    class StatementEndProc extends FScript.StatementBase {
        ToString() {
            return "EndProc ";
        }
        Exec(parent, script) {
            let ex = new FScript.CBExpressException("EndProc:" + this.Index, null);
            ex.RowIndex = this.Index;
            throw ex;
        }
    }
    FScript.StatementEndProc = StatementEndProc;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class StatementReturn extends FScript.StatementBase {
        Exec(parent, script) {
            this.SymbolTable.ReSetPosition();
            this.SymbolTable.Pop();
            let value = null;
            if (this.SymbolTable.Peek() != FScript.Token.End) {
                value = script.Exec(this.SymbolTable);
            }
            script.FinishObj = value;
            script.Finished = true;
            script.Write(script, this.SymbolTable, "#Res", value);
            return value;
        }
        ToString() {
            return "Return ";
        }
    }
    FScript.StatementReturn = StatementReturn;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class StatementTry extends FScript.StatementBase {
        constructor() {
            super(...arguments);
            this.statementslist = null;
        }
        Exec(parent, script) {
            this.SymbolTable.ReSetPosition();
            this.SymbolTable.Pop();
            let value = null;
            this.Break = false;
            script.Write(script, this.SymbolTable, "Try", "");
            try {
                for (let i = 0; i < this.Statementslist.Count; i++) {
                    let statement = this.Statementslist[i];
                    if (this.Break) {
                        return value;
                    }
                    value = statement.Exec(this, script);
                    if (script.Finished) {
                        return script.FinishObj;
                    }
                }
            }
            catch (ex) {
                script.ExecProxy.SetKeyValue("LastError", ex.Message);
            }
            script.Write(script, this.SymbolTable, "Catch", value);
            return value;
        }
        ToString() {
            return "Foreach ";
        }
        get Statementslist() {
            {
                if (this.statementslist == null) {
                    this.statementslist = new FScript.List();
                }
                return this.statementslist;
            }
        }
        Build(statements) {
            let statement = statements.Current();
            statements.Pop();
            while (true) {
                statement = statements.Current();
                if (statement == null) {
                    return;
                }
                if (statement instanceof StatementCatch) {
                    this.End = statement;
                    statement.Build(statements);
                    return;
                }
                statement.Build(statements);
                this.Statementslist.Add(statement);
            }
        }
    }
    FScript.StatementTry = StatementTry;
    class StatementCatch extends FScript.StatementBase {
        ToString() {
            return "EndForeach ";
        }
        Exec(parent, script) {
            let ex = new FScript.CBExpressException("EndForeach Exec:" + this.Index, null);
            ex.RowIndex = this.Index;
            throw ex;
        }
    }
    FScript.StatementCatch = StatementCatch;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class StatementVar extends FScript.StatementBase {
        Exec(parent, script) {
            this.SymbolTable.ReSetPosition();
            this.SymbolTable.Pop();
            let token = this.SymbolTable.Pop();
            if (token.Type != FScript.TokenType.ID) {
                let ex = new FScript.CBExpressException("Var Error:" + this.Index, null);
                ex.RowIndex = token.Line;
                ex.ColumnIndex = token.Column;
                throw ex;
            }
            let var2 = token.Value;
            token = this.SymbolTable.Pop();
            let value = null;
            if (token != FScript.Token.End) {
                if (token.Type == FScript.TokenType.equality) {
                    value = script.Exec(this.SymbolTable);
                }
            }
            script.ExecProxy.SetKeyValue(var2, value);
            script.Write(script, this.SymbolTable, var2, value);
            return value;
        }
        ToString() {
            return "Var ";
        }
    }
    FScript.StatementVar = StatementVar;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class StatementWhile extends FScript.StatementBase {
        constructor() {
            super(...arguments);
            this.statementslist = null;
        }
        Exec(parent, script) {
            this.SymbolTable.ReSetPosition();
            this.SymbolTable.Pop();
            let value = script.Exec(this.SymbolTable);
            script.Write(script, this.SymbolTable, "#Res", value);
            let res = FScript.ConvertHelper.ToBoolean(value);
            let result = null;
            this.Break = false;
            //let starttime = DateTime.Now;
            //let whiletimes = 1;
            while (res) {
                //let ts = DateTime.Now - starttime;
                //whiletimes = whiletimes + 1;
                //if (ts.TotalSeconds > 1 && whiletimes > 2000)
                //{
                //    string tooltip = string.Format ("While循环已经执行超过3分钟，且已经循环执行超过200次,是否取消执行?");
                //    System.Windows.Forms.DialogResult dialogResult = WaitingTimeDialog.ShowInputTextDialog("继续执行提示", tooltip,10, System.Windows.Forms.DialogResult.Cancel);
                //    if (dialogResult == System.Windows.Forms.DialogResult.OK)
                //    {
                //        throw new Exception("用户终止执行");
                //    }
                //    starttime = DateTime.Now;
                //    whiletimes = 1;
                //}
                script.Write(script, this.SymbolTable, "Begin", value);
                for (let i = 0; i < this.Statementslist.Count; i++) {
                    let item = this.Statementslist[i];
                    if (script.Finished) {
                        return script.FinishObj;
                    }
                    if (this.Break) {
                        return result;
                    }
                    result = item.Exec(this, script);
                }
                this.SymbolTable.ReSetPosition();
                this.SymbolTable.Pop();
                value = script.Exec(this.SymbolTable);
                res = FScript.ConvertHelper.ToBoolean(value);
                script.Write(script, this.SymbolTable, "End", value);
            }
            return result;
        }
        ToString() {
            return "While ";
        }
        get Statementslist() {
            {
                if (this.statementslist == null) {
                    this.statementslist = new FScript.List();
                }
                return this.statementslist;
            }
        }
        Build(statements) {
            let statement = statements.Current();
            statements.Pop();
            while (true) {
                statement = statements.Current();
                if (statement == null) {
                    let ex = new FScript.CBExpressException("While Error Row:" + this.Index, null);
                    ex.RowIndex = this.Index;
                    throw ex;
                }
                if (this.Break) {
                    return;
                }
                if (statement instanceof StatementEndWhile) {
                    this.End = statement;
                    statement.Build(statements);
                    return;
                }
                statement.Build(statements);
                this.Statementslist.Add(statement);
            }
        }
    }
    FScript.StatementWhile = StatementWhile;
    class StatementEndWhile extends FScript.StatementBase {
        ToString() {
            return "EndWhile ";
        }
        Exec(parent, script) {
            let ex = new FScript.CBExpressException("EndWhile Exec:" + this.Index, null);
            ex.RowIndex = this.Index;
            throw ex;
        }
    }
    FScript.StatementEndWhile = StatementEndWhile;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class StatementLexer {
        constructor(txt) {
            this.List = new FScript.List();
            this.text = "";
            this.position = 0;
            this.table = null;
            this.empty = ' ';
            this.rowindex = 0;
            this.columnindex = 0;
            this.symboltableindex = 0;
            this.lexer = null;
            this.ID = 0;
            this.sb = new FScript.StringBuilder();
            this.text = txt;
        }
        GetSymbolTable2(text) {
            if (this.lexer == null) {
                this.lexer = new StatementLexer();
            }
            return this.lexer.Parse(text);
        }
        Parse(input) {
            if (this.table == null) {
                this.table = new FScript.SymbolTable();
            }
            this.table.Tokens.Clear();
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
                if (c == '\n') {
                    this.rowindex++;
                }
                let token = this.GetToken(c);
                if (token.Type == FScript.TokenType.Comments)
                    continue;
                if (token.Type == FScript.TokenType.SameLine)
                    continue;
                if (token.Type == FScript.TokenType.NewLine || token.Type == FScript.TokenType.NewLineEnter) {
                    if (this.table.Count > 0) {
                        this.table.Line = this.symboltableindex;
                        this.symboltableindex++;
                        this.List.Add(this.table);
                    }
                    this.table = this.GetSymbolTable(this.table);
                    this.table.TextLine = token.Line;
                    continue;
                }
                this.table.Push(token);
            }
            if (this.table.Count > 0) {
                this.List.Add(this.table);
            }
            return this.table;
        }
        Format(text) {
            let table = this.Parse(text);
            return table.ToString();
        }
        GetToken2() {
            this.position = -1;
            this.rowindex = 0;
            this.columnindex = 0;
            if (!this.IsEnd()) {
                this.ClearEmpty();
                if (!this.HasNext()) {
                    return FScript.Token.End;
                }
                let c = this.NextChar();
                let token = this.GetToken(c);
                return token;
            }
            return FScript.Token.End;
        }
        Forword() {
            this.columnindex++;
            this.position++;
        }
        GetSymbolTable(prevtable) {
            return new FScript.SymbolTable();
        }
        Back() {
            this.columnindex--;
            this.position--;
        }
        IsEnd() {
            if (FScript.ConvertHelper.IsNullOrWhiteSpace(this.text))
                return true;
            return !(this.position < this.text.length - 1);
        }
        GetToken(c) {
            switch (c) {
                case '\"':
                    this.Forword();
                    let value = this.ReadString();
                    return this.NewToken(this.ID++, FScript.TokenType.CONST_STRING, value, this.rowindex, this.columnindex, this.position);
                case '{':
                    this.Forword();
                    return this.NewToken(this.ID++, FScript.TokenType.LBRACE, "{", this.rowindex, this.columnindex, this.position);
                case '}':
                    this.Forword();
                    return this.NewToken(this.ID++, FScript.TokenType.RBRACE, "}", this.rowindex, this.columnindex, this.position);
                case '(':
                    this.Forword();
                    return this.NewToken(this.ID++, FScript.TokenType.function_exp_begin, "(", this.rowindex, this.columnindex, this.position);
                case ')':
                    this.Forword();
                    return this.NewToken(this.ID++, FScript.TokenType.function_exp_end, ")", this.rowindex, this.columnindex, this.position);
                case ',':
                    this.Forword();
                    return this.NewToken(this.ID++, FScript.TokenType.argument_exp_list, ",", this.rowindex, this.columnindex, this.position);
                case ';':
                    this.Forword();
                    return this.NewToken(this.ID++, FScript.TokenType.NewLine, ";", this.rowindex, this.columnindex, this.position);
                case '；':
                    this.Forword();
                    return this.NewToken(this.ID++, FScript.TokenType.NewLine, ";", this.rowindex, this.columnindex, this.position);
                case '\n':
                    this.Forword();
                    return this.NewToken(this.ID++, FScript.TokenType.NewLineEnter, ";", this.rowindex, this.columnindex, this.position);
                case '*':
                    this.Forword();
                    return this.NewToken(this.ID++, FScript.TokenType.mult_exp, "*", this.rowindex, this.columnindex, this.position);
                case '/':
                    this.Forword();
                    if (this.NextChar() == '/') {
                        this.Forword();
                        let valueComments = this.ReadComments();
                        return this.NewToken(this.ID++, FScript.TokenType.Comments, valueComments, this.rowindex, this.columnindex, this.position);
                    }
                    return this.NewToken(this.ID++, FScript.TokenType.mult_exp, "/", this.rowindex, this.columnindex, this.position);
                case '%':
                    this.Forword();
                    return this.NewToken(this.ID++, FScript.TokenType.mult_exp, "%", this.rowindex, this.columnindex, this.position);
                case '^':
                    this.Forword();
                    return this.NewToken(this.ID++, FScript.TokenType.exclusive_or_exp, "^", this.rowindex, this.columnindex, this.position);
                case '~':
                    this.Forword();
                    return this.NewToken(this.ID++, FScript.TokenType.unary_exp, "~", this.rowindex, this.columnindex, this.position);
                case '|':
                    this.Forword();
                    if (this.NextChar() == '|') {
                        this.Forword();
                        return this.NewToken(this.ID++, FScript.TokenType.logical_or_exp, "||", this.rowindex, this.columnindex, this.position);
                    }
                    return this.NewToken(this.ID++, FScript.TokenType.inclusive_or_exp, "|", this.rowindex, this.columnindex, this.position);
                case '&':
                    this.Forword();
                    if (this.NextChar() == '&') {
                        this.Forword();
                        return this.NewToken(this.ID++, FScript.TokenType.logical_and_exp, "&&", this.rowindex, this.columnindex, this.position);
                    }
                    return this.NewToken(this.ID++, FScript.TokenType.and_exp, "&", this.rowindex, this.columnindex, this.position);
                case '+':
                    this.Forword();
                    return this.NewToken(this.ID++, FScript.TokenType.additive_exp, "+", this.rowindex, this.columnindex, this.position);
                case '-':
                    this.Forword();
                    return this.NewToken(this.ID++, FScript.TokenType.additive_exp, "-", this.rowindex, this.columnindex, this.position);
                case '!':
                    this.Forword();
                    if (this.NextChar() == '=') {
                        this.Forword();
                        return this.NewToken(this.ID++, FScript.TokenType.equality_exp, "!=", this.rowindex, this.columnindex, this.position);
                    }
                    return this.NewToken(this.ID++, FScript.TokenType.unary_exp, "!", this.rowindex, this.columnindex, this.position);
                case '=':
                    this.Forword();
                    if (this.NextChar() == '=') {
                        this.Forword();
                        return this.NewToken(this.ID++, FScript.TokenType.equality_exp, "==", this.rowindex, this.columnindex, this.position);
                    }
                    return this.NewToken(this.ID++, FScript.TokenType.equality, "=", this.rowindex, this.columnindex, this.position);
                case '>':
                    this.Forword();
                    if (this.NextChar() == '=') {
                        this.Forword();
                        return this.NewToken(this.ID++, FScript.TokenType.relational_exp, ">=", this.rowindex, this.columnindex, this.position);
                    }
                    if (this.NextChar() == '>') {
                        this.Forword();
                        return this.NewToken(this.ID++, FScript.TokenType.shift_expression, ">>", this.rowindex, this.columnindex, this.position);
                    }
                    return this.NewToken(this.ID++, FScript.TokenType.relational_exp, ">", this.rowindex, this.columnindex, this.position);
                case '<':
                    this.Forword();
                    if (this.NextChar() == '=') {
                        this.Forword();
                        return this.NewToken(this.ID++, FScript.TokenType.relational_exp, "<=", this.rowindex, this.columnindex, this.position);
                    }
                    if (this.NextChar() == '<') {
                        this.Forword();
                        return this.NewToken(this.ID++, FScript.TokenType.shift_expression, "<<", this.rowindex, this.columnindex, this.position);
                    }
                    return this.NewToken(this.ID++, FScript.TokenType.relational_exp, "<", this.rowindex, this.columnindex, this.position);
                case 'F':
                case 'f':
                    this.Forword();
                    if (this.HasLenChar("false".length)) {
                        let strTrue = this.NextString("false".length).toLowerCase();
                        if (strTrue == "false") {
                            this.Forword2(("false").length - 1);
                            return this.NewToken(this.ID++, FScript.TokenType.FALSE, strTrue, this.rowindex, this.columnindex, this.position);
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
                            return this.NewToken(this.ID++, FScript.TokenType.TRUE, strTrue, this.rowindex, this.columnindex, this.position);
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
                            return this.NewToken(this.ID++, FScript.TokenType.NULL, strTrue, this.rowindex, this.columnindex, this.position);
                        }
                    }
                    this.Back();
                    return this.ReadVar(c);
                case '\\':
                    this.Forword();
                    this.ClearEmpty();
                    if (this.NextChar() == '\n') {
                        this.Forword();
                        while ((this.NextChar() == '\n')) {
                            this.Forword();
                        }
                        return this.NewToken(this.ID++, FScript.TokenType.SameLine, "\\", this.rowindex, this.columnindex, this.position);
                    }
                    throw new FScript.CBExpressException("" + this.GetErrorText() + " Has error Row=" + this.rowindex + " Column=" + this.columnindex, this.NewToken(-1, FScript.TokenType.ERROR, c.ToString(), this.rowindex, this.columnindex, this.position));
                    {
                        this.rowindex = this.rowindex, this.columnindex = this.columnindex;
                    }
                    ;
                default:
                    if (FScript.char.IsNumber(c)) {
                        this.Forword();
                        let dvalue = this.ReadDecimal();
                        return this.NewToken(this.ID++, FScript.TokenType.CONST_NUMBER, dvalue, this.rowindex, this.columnindex, this.position);
                    }
                    return this.ReadVar(c);
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
                    let str = this.ReadVarText(c).toUpperCase();
                    let token = this.IDToken(str);
                    if (token != null) {
                        return token;
                    }
                    return this.NewToken(this.ID++, FScript.TokenType.ID, str, this.rowindex, this.columnindex, this.position);
                default:
                    throw new FScript.CBExpressException("语法错误:【" + this.GetErrorText() + "】 后输入字符【" + c.ToString() + "】不正确行=" + this.rowindex + " 列=" + this.columnindex, this.NewToken(-1, FScript.TokenType.ERROR, c.ToString(), this.rowindex, this.columnindex, this.position));
                    {
                        this.rowindex = this.rowindex, this.columnindex = this.columnindex;
                    }
                    ;
            }
        }
        IDToken(str) {
            switch (str) {
                case "TRUE":
                    return this.NewToken(this.ID++, FScript.TokenType.TRUE, str, this.rowindex, this.columnindex, this.position);
                case "FALSE":
                    return this.NewToken(this.ID++, FScript.TokenType.FALSE, str, this.rowindex, this.columnindex, this.position);
                case "THIS":
                    return this.NewToken(this.ID++, FScript.TokenType.THIS, str, this.rowindex, this.columnindex, this.position);
                case "NULL":
                    return this.NewToken(this.ID++, FScript.TokenType.NULL, str, this.rowindex, this.columnindex, this.position);
                default:
                    break;
            }
            return null;
        }
        NewToken(id, type, value, line, column, postion) {
            let token = new FScript.Token(this.ID, type, value, line, column, postion);
            this.Token10 = this.Token9;
            this.Token9 = this.Token8;
            this.Token8 = this.Token7;
            this.Token7 = this.Token6;
            this.Token6 = this.Token5;
            this.Token5 = this.Token4;
            this.Token4 = this.Token3;
            this.Token3 = this.Token2;
            this.Token2 = this.Token1;
            this.Token1 = token;
            return token;
        }
        GetTokenValue(token) {
            if (token == null)
                return "";
            if (token.Value == null)
                return "";
            if (token.Type == FScript.TokenType.CONST_STRING) {
                return "\"" + token.Value + "\"";
            }
            return token.Value;
        }
        GetErrorText() {
            let text = this.GetTokenValue(this.Token10)
                + this.GetTokenValue(this.Token9)
                + this.GetTokenValue(this.Token8)
                + this.GetTokenValue(this.Token7)
                + this.GetTokenValue(this.Token6)
                + this.GetTokenValue(this.Token5)
                + this.GetTokenValue(this.Token4)
                + this.GetTokenValue(this.Token3)
                + this.GetTokenValue(this.Token2)
                + this.GetTokenValue(this.Token1);
            return text.trim();
        }
        ReadVarText(c) {
            let sb = new FScript.StringBuilder();
            sb.Append(c);
            while (this.HasNext()) {
                c = this.NextChar();
                if (FScript.char.IsLetter(c)) {
                    sb.Append(c);
                }
                else if (FScript.char.IsNumber(c)) {
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
        ReadNextChar() {
            this.Forword();
            if (this.IsEnd()) {
                let ex = new FScript.CBExpressException("" + this.GetErrorText() + " Has error Row=" + this.rowindex + " Column=" + this.columnindex, this.NewToken(-1, FScript.TokenType.ERROR, "", this.rowindex, this.columnindex, this.position));
                ex.RowIndex = this.rowindex;
                ex.ColumnIndex = this.columnindex;
                throw ex;
            }
            return this.currentChar;
        }
        HasNext() {
            return this.position < this.text.length - 1;
        }
        NextChar() {
            if (this.position >= this.text.length) {
                return ' ';
            }
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
                    if (FScript.char.IsNumber(c)) {
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
                    if (!FScript.char.IsNumber(c)) {
                        throw new FScript.CBExpressException("" + this.GetErrorText() + " Has error Row=" + this.rowindex + " Column=" + this.columnindex, this.NewToken(-1, FScript.TokenType.ERROR, "", this.rowindex, this.columnindex, this.position));
                        {
                            this.rowindex = this.rowindex, this.columnindex = this.columnindex;
                        }
                        ;
                    }
                    this.sb.Append(c);
                }
                while (!this.IsEnd()) {
                    if (this.HasNext()) {
                        c = this.NextChar();
                        if (FScript.char.IsNumber(c)) {
                            this.Forword();
                            c = this.currentChar;
                            this.sb.Append(c);
                            continue;
                        }
                        break;
                    }
                }
            }
            d = Number(this.sb.ToString());
            return this.sb.ToString();
        }
        ReadString() {
            this.sb.clear();
            this.Forword();
            while (!this.IsEnd()) {
                let c = this.currentChar;
                if (c == '\\') {
                    let c2 = this.ReadNextChar();
                    switch (c2) {
                        case '\b':
                            this.sb.Append('\b');
                            this.Forword();
                            break;
                        case '\n':
                            this.sb.Append('\n');
                            this.Forword();
                            break;
                        case '\r':
                            this.sb.Append('\r');
                            this.Forword();
                            break;
                        case '\t':
                            this.sb.Append('\t');
                            this.Forword();
                            break;
                        case '\f':
                            this.sb.Append('\f');
                            this.Forword();
                            break;
                        case '\\':
                            this.sb.Append('\\');
                            this.Forword();
                            break;
                        case '\"':
                            this.sb.Append('\"');
                            this.Forword();
                            break;
                        case '/':
                            this.sb.Append(c2);
                            this.Forword();
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
                            this.Forword();
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
        ReadComments() {
            this.sb.clear();
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
        ClearEmpty() {
            let c = ' ';
            while (this.HasNext()) {
                c = this.NextChar();
                if (!FScript.char.IsWhiteSpace(c)) {
                    break;
                }
                if (c == '\n') {
                    this.rowindex++;
                    break;
                }
                this.Forword();
            }
        }
    }
    FScript.StatementLexer = StatementLexer;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class SymbolTable {
        constructor() {
            this.position = 0;
            this.Tokens = new FScript.List();
        }
        //[System.Diagnostics.DebuggerStepThrough]
        Pop() {
            if (this.position < this.Tokens.Count) {
                let token = this.Tokens[this.position];
                this.position++;
                return token;
            }
            return FScript.Token.End;
        }
        //[System.Diagnostics.DebuggerStepThrough]
        Peek() {
            if (this.position < this.Tokens.Count) {
                let token = this.Tokens[this.position];
                return token;
            }
            return FScript.Token.End;
        }
        //[System.Diagnostics.DebuggerStepThrough]
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
            let sb = new FScript.StringBuilder();
            sb.Append("Line:" + this.Line + " ");
            for (let i = 0; i < this.Tokens.Count; i++) {
                let item = this.Tokens[i];
                let itemnext = null;
                if (i < (this.Tokens.Count - 1)) {
                    itemnext = this.Tokens[i + 1];
                }
                if (itemnext != null) {
                    if (item.Type == FScript.TokenType.CONST_STRING) {
                        sb.Append("\"" + item.Value + "\"");
                    }
                    else if (item.Type == FScript.TokenType.function_exp_begin) {
                        sb.Append(item.Value);
                    }
                    else if (item.Type == FScript.TokenType.function_exp_end) {
                        sb.Append(item.Value);
                    }
                    else if (item.Type == FScript.TokenType.ID && itemnext.Type == FScript.TokenType.ID) {
                        sb.Append(item.Value + " ");
                    }
                    else {
                        sb.Append(item.Value);
                    }
                }
                else {
                    sb.Append(item.Value);
                }
            }
            return sb.ToString();
        }
        GetText() {
            let sb = new FScript.StringBuilder();
            for (let i = 0; i < this.Tokens.Count; i++) {
                let item = this.Tokens[i];
                let itemnext = null;
                if (i < (this.Tokens.Count - 1)) {
                    itemnext = this.Tokens[i + 1];
                }
                if (itemnext != null) {
                    if (item.Type == FScript.TokenType.CONST_STRING) {
                        sb.Append("\"" + item.Value + "\"");
                    }
                    else if (item.Type == FScript.TokenType.function_exp_begin) {
                        sb.Append(item.Value);
                    }
                    else if (item.Type == FScript.TokenType.function_exp_end) {
                        sb.Append(item.Value);
                    }
                    else if (item.Type == FScript.TokenType.ID && itemnext.Type == FScript.TokenType.ID) {
                        sb.Append(item.Value + " ");
                    }
                    else {
                        sb.Append(item.Value);
                    }
                }
                else {
                    if (item.Type == FScript.TokenType.CONST_STRING) {
                        sb.Append("\"" + item.Value + "\"");
                    }
                    else if (item.Type == FScript.TokenType.function_exp_begin) {
                        sb.Append(item.Value);
                    }
                    else if (item.Type == FScript.TokenType.function_exp_end) {
                        sb.Append(item.Value);
                    }
                    else {
                        sb.Append(item.Value);
                    }
                }
            }
            return sb.ToString();
        }
    }
    FScript.SymbolTable = SymbolTable;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class Token {
        constructor(id, type, value, line, column, postion) {
            this.Index = id;
            this.Type = type;
            this.Value = value;
            this.Line = line;
            this.Column = column;
            this.Position = postion;
        }
        ToString() {
            return ""; // string.Format("Index={0},Type={1},Value=【{2}】,Line={3},Column={4},Position={5}", Index, Type, Value, Line, Column, Position);
        }
    }
    Token.End = new Token(-1, -1, "", -1, -1, -1);
    FScript.Token = Token;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class TokenText extends FScript.Token {
        constructor(id, type, value, line, column, position) {
            super(id, type, value, line, column, position);
        }
        ToString() {
            return ""; // string.Format("Index={0},Type={1},Value=【{2}】,Line={3},Column={4}", Index, Type, Value, Line, Column);
        }
    }
    FScript.TokenText = TokenText;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class TokenType {
    }
    TokenType.ERROR = -1;
    /// <summary>
    /// var name
    /// </summary>
    TokenType.ID = 1;
    /// <summary>
    /// "字符串"
    /// </summary>
    TokenType.CONST_STRING = 2;
    /// <summary>
    /// 124.34,0x124
    /// </summary>
    TokenType.CONST_NUMBER = 3;
    /// <summary>
    /// null
    /// </summary>
    TokenType.TRUE = 6; //true
    TokenType.FALSE = 7; //false
    TokenType.NULL = 8; //null         
    TokenType.THIS = 9; //null 
    //public static readonly int ME = 11;         //null 
    //public static int NULL = 12;         //null 
    /// <summary>
    /// | logical_or_exp '||' logical_and_exp
    /// </summary>
    TokenType.logical_or_exp = 61;
    /// <summary>
    /// | logical_and_exp '&&' inclusive_or_exp
    /// </summary>
    TokenType.logical_and_exp = 62;
    /// <summary>
    /// | inclusive_or_exp '|' exclusive_or_exp
    /// </summary>
    TokenType.inclusive_or_exp = 63;
    /// <summary>
    /// | exclusive_or_exp '^' and_exp
    /// </summary>
    TokenType.exclusive_or_exp = 64;
    /// <summary>
    /// | and_exp '&' equality_exp
    /// </summary>
    TokenType.and_exp = 65;
    /// <summary>
    /// | equality_exp '==' relational_exp
    ///	| equality_exp '!=' relational_exp
    /// </summary>
    TokenType.equality_exp = 66;
    /// <summary>
    /// | relational_exp '<' shift_expression
    ///	| relational_exp '>' shift_expression
    ///	| relational_exp '<=' shift_expression
    ///	| relational_exp '>=' shift_expression
    /// </summary>
    TokenType.relational_exp = 67;
    /// <summary>
    /// | shift_expression '<<' additive_exp
    ///	| shift_expression '>>' additive_exp
    /// </summary>
    TokenType.shift_expression = 68;
    /// <summary>
    /// | additive_exp '+' mult_exp
    ///	| additive_exp '-' mult_exp
    /// </summary>
    TokenType.additive_exp = 69;
    /// <summary>
    /// | mult_exp '*' unary_exp
    ///	| mult_exp '/' unary_exp
    ///	| mult_exp '%' unary_exp
    /// </summary>
    TokenType.mult_exp = 70;
    /// <summary>
    /// '++' postfix_exp
    ///	| '--' postfix_exp
    ///	| '-' postfix_exp 
    ///	| '~' postfix_exp 
    ///	| '!' postfix_exp
    /// </summary>
    TokenType.unary_exp = 71;
    TokenType.postfix_exp = 72;
    /// <summary>
    /// , function(arg1,arg2,arg3)
    /// </summary>
    TokenType.argument_exp_list = 99;
    /// <summary>
    /// ( function()
    /// </summary>
    TokenType.function_exp_begin = 76;
    /// <summary>
    /// ) function()
    /// </summary>
    TokenType.function_exp_end = 77;
    //public static readonly int inclusive_or_exp = 3;
    /// <summary>
    /// equality '='   
    /// </summary>
    TokenType.equality = 78;
    /// <summary>
    /// equality '='   
    /// </summary>
    TokenType.LBRACE = 79;
    /// <summary>
    /// equality '='   
    /// </summary>
    TokenType.RBRACE = 80;
    /// <summary>
    /// ;
    /// </summary>
    TokenType.NewLine = 91;
    /// <summary>
    /// \n
    /// </summary>
    TokenType.NewLineEnter = 92;
    /// <summary>
    /// \
    /// </summary>
    TokenType.SameLine = 93;
    /// <summary>
    /// //
    /// </summary>
    TokenType.Comments = 199;
    FScript.TokenType = TokenType;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class CBExpressException {
        constructor(msg, token, ex) {
            this.Msg = msg;
            this.Token = token;
            this.Ex = ex;
        }
    }
    FScript.CBExpressException = CBExpressException;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class StateMentFactory {
        StateMentFactory() {
        }
        CreateStatementWhile() {
            return new FScript.StatementWhile();
        }
        CreateStatementEndWhile() {
            return new FScript.StatementEndWhile();
        }
        CreateStatementElse() {
            return new FScript.StatementIFElse();
        }
        CreateStatementEndIF() {
            return new FScript.StatementEndIF();
        }
        CreateStatementExpress() {
            return new FScript.StatementExpress();
        }
        CreateStatementIF() {
            return new FScript.StatementIF();
        }
        CreateStatementReturn() {
            return new FScript.StatementReturn();
        }
        CreateStatementVar() {
            return new FScript.StatementVar();
        }
        CreateStatementEquality() {
            return new FScript.StatementEquality();
        }
        CreateStatementForeach() {
            return new FScript.StatementForeach();
        }
        CreateStatementEndForeach() {
            return new FScript.StatementEndForeach();
        }
        CreateStatementBreak() {
            return new FScript.StatementBreak();
        }
        CreateStatementFor() {
            return new FScript.StatementFor();
        }
        CreateStatementEndFor() {
            return new FScript.StatementEndFor();
        }
        CreateStatementTry() {
            return new FScript.StatementTry();
        }
        CreateStatementCatch() {
            return new FScript.StatementCatch();
        }
        CreateStatementProc() {
            return new FScript.StatementProc();
        }
        CreateStatementEndProc() {
            return new FScript.StatementEndProc();
        }
        CreateStatementCall() {
            return new FScript.StatementCall();
        }
    }
    FScript.StateMentFactory = StateMentFactory;
})(FScript || (FScript = {}));
var FScript;
(function (FScript) {
    class SyntacticException {
        constructor(msg) {
            this._msg = msg;
        }
        get Message() {
            return this._msg + " Row:" + this.Row + " Column:" + this.Column;
        }
    }
    FScript.SyntacticException = SyntacticException;
})(FScript || (FScript = {}));
//# sourceMappingURL=cbscript.js.map