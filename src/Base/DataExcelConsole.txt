var DataExcelConsole = {
    log: function (title: string, e: any) {
        // eslint-disable-next-line no-console
        console.log(title + new Date().toLocaleTimeString());
        // eslint-disable-next-line no-console
        console.log(e);
    }
}
export { DataExcelConsole }