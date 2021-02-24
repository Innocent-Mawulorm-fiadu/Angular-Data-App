import { Component ,OnInit, ViewChild} from '@angular/core';
import { ApiService } from './api.service';
import { AgGridAngular } from 'ag-grid-angular';
import 'ag-grid-enterprise'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent    {
  @ViewChild('agGrid') agGrid : AgGridAngular;
  private gridApi: any;
  private gridColumnApi: any;
  columnDefs: any;
  defaultColDef:any;
  rowData: any[] = [];
  sideBar:any;
  columnTypes:any;
  defaultColGroupDef:any;
  statusBar:any;
  rowSelection:any;



  constructor(private _apiService: ApiService) {
    this.columnDefs = [
      { field: 'id',
        checkboxSelection: true,
        width:60,
        filter:false
       },

      { field: 'name'
       },

      { field: 'account',
      type: 'numberColumn'
    },

      { field: 'date',
      type: ['dateColumn', 'nonEditableColumn'],
      width: 200
     },
      { field: 'price',
      type: 'numberColumn'},
      { field: 'amount',
      type: 'numberColumn' },
      { field: 'type'},
      { field: 'branch' }
  ];


  this.defaultColDef = {
    flex: 1,
     minWidth: 50,
    maxWidth:350,
    enableValue: true,
    enableRowGroup: true,
    enablePivot: true,
    sortable: true,
    filter: true,
    floatingFilter: true,
    // make columns resizable
    resizable: true,
    editable: true,
    pinned: 'left'
  };


  this.defaultColGroupDef = { marryChildren: true };
  this.columnTypes = {
    numberColumn: {
      width: 130,
      filter: 'agNumberColumnFilter',
    },
    medalColumn: {
      width: 100,
      columnGroupShow: 'open',
      filter: false,
    },
    nonEditableColumn: { editable: false },
    dateColumn: {
      filter: 'agDateColumnFilter',
      filterParams: {
        comparator: function (filterLocalDateAtMidnight:any, cellValue:any) {
          var dateParts = cellValue.split('/');
          var day = Number(dateParts[0]);
          var month = Number(dateParts[1]) - 1;
          var year = Number(dateParts[2]);
          var cellDate = new Date(year, month, day);
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          } else if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          } else {
            return 0;
          }
        },
      },
    },
  };

  this.sideBar = {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
      },
      {
        id: 'filters',
        labelDefault: 'Filters',
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel',
      },
    ],
    position: 'right',
    defaultToolPanel: 'filters',
  };
  this.rowSelection = 'multiple';
  this.statusBar = {
    statusPanels: [
      {
        statusPanel: 'agTotalAndFilteredRowCountComponent',
        align: 'left',
      },
      {
        statusPanel: 'agTotalRowCountComponent',
        align: 'center',
      },
      { statusPanel: 'agFilteredRowCountComponent' },
      { statusPanel: 'agSelectedRowCountComponent' },
      { statusPanel: 'agAggregationComponent' },
    ]
};
  }



onGridReady(params: any) {
  this.gridApi = params.api;
  this.gridColumnApi = params.columnApi;

  this._apiService.getData()
  .subscribe(data=>this.rowData =data);
}

getSelectedRows() {
  const selectedRow = this.gridApi.getSelectedRows();
  console.log(selectedRow);

}
}

