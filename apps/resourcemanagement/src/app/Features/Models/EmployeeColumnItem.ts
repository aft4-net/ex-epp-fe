import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';

import { IEmployeeViewModel } from '../Models/Employee/EmployeeViewModel';

export interface ColumnItem {
    name: string;
    sortOrder: NzTableSortOrder | null;
    sortFn: NzTableSortFn<IEmployeeViewModel> | null;
    listOfFilter?: NzTableFilterList;
    filterFn?: NzTableFilterFn<IEmployeeViewModel> | true;
    filterMultiple?: boolean;
    sortDirections: NzTableSortOrder[];
  }
