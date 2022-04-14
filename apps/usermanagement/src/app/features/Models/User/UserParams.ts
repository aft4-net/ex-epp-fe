export class UserParams
{
  pageIndex = 1;
  pageSize = 8;
  searchKey= "";
  sortBy!: string;
  sortOrder!: string;
  departmentFilter: [] = [];
  jobTitleFilter: [] = [];
  statusFilter: [] = [];
}
