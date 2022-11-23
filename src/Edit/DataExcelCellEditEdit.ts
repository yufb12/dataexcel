import { Events } from "../Control/Events";
import { DataExcelCell } from "../main/DataExcelCell";
import { DataExcelCellEditBase } from "./DataExcelCellEditBase";

export class DataExcelCellEditEdit extends DataExcelCellEditBase 
{
    public Cell: DataExcelCell;
 
    constructor()
    {
        super();
    }
      
    InitEdit()
    {
        //this.Grid.RePaint();
        let grid = this.Cell.Grid;
        let cell = this.Cell;
        if (cell.OwnMergeCell != null)
        {
            cell = cell.OwnMergeCell;
        }
        var edit = grid.editcontrol;
        edit["cell"] = this;
        grid.editcontrol.value = "";
        if (cell.Text != null)
        {
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

    EndEdit()
    {
        let grid = this.Cell.Grid; 
        grid.editcontrol.style.visibility = "hidden";
        grid.editcontrol.removeEventListener("input", this.OnInput);
        grid.editcontrol.removeEventListener("change", this.OnChange);
        this.Cell.EndEdit()
    }

    OnInput(e:any): void
    {
        let edit = this["cell"] as DataExcelCellEditEdit;
        let cell = edit.Cell;
        cell.Text = this["value"];
        cell.Value = this["value"];
        cell.Grid.emit(Events.CellValueChanged, cell.Grid, cell);
        cell.Grid.graphic.Clear();
        cell.Grid.RePaint(e);
    }
    OnChange(e: Event)
    {
        //var cell = this["cell"];
        //cell.Text = this["value"];
        //cell.Grid.Context.clearRect(0, 0, cell.Grid.Control.width, cell.Grid.Control.height);
        //cell.Grid.RePaint();
        let edit = this["cell"] as DataExcelCellEditEdit;
        let cell = edit.Cell;
        cell.Text = this["value"]; 
        cell.Value = this["value"];
        cell.Grid.RePaint(e);
        edit.EndEdit();

    }

    Clone()
    {
        return new DataExcelCellEditEdit();
    }
} 
