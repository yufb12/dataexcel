import { FormatType } from "./ConstantValue";

export class ConvertHelper {
    public static IsNumber(value: any): boolean {
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
    public static StringIsNullOrEmpty(text: string): boolean {
        if (text == null)
            return true;
        if (text == "")
            return true;
        return false;
    }
    public static ToInt(txt: string): number {
        return parseInt(txt);
    }
    public static ToDateTime(value: any): Date {
        let date: Date;
        if (value instanceof Date) {
            date = value;
            return date;
        }
        else {
            let datevalue = Date.parse(value);
            date = new Date(datevalue);
        }
        return date;
    }
    public static InsertString(txt: string, index: number, str: string) {
        return txt.slice(0, index) + str + txt.slice(index);
    }
    public static DeleteString(txt: string, index: number, len: number) {
        return txt.slice(0, index) + txt.slice(index + len);
    }
    public static NumberToString(value: number, format: string): string {
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
    public static DateTimeToString(value: any, format: string): string {
        let date: Date;
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
    public static GetFromatString(value: any, format: any, formattype: any) {
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