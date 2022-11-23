import { List } from "../Base/ArrayList";
import { Chart } from "./Chart";


export class ChartList extends List<Chart>
{
    constructor()
    {
        super();
    }
    Clear()
    {
        this.forEach((chart: Chart) =>
        {
            chart.Clear();
        });
        this.clear();
    }
    Refresh()
    {
        for (var i in this)
        {
            let cell = this[i] as Chart;
            cell.Refresh();
        }
    }
}
