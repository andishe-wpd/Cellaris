export interface TableProps {
  data: any[];
  columns: Column[];
}

export interface Column {
  accessor: string;
  header: string;
  width?: number;
}
