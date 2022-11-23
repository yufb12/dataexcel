var DataExcelConsole = {
    log: function (title: string, e: any)
    {
        console.log(title + new Date().toLocaleTimeString());
        console.log(e);
    }
};
export{DataExcelConsole}