// components/DataTable/types.ts

export interface DataTableColumn<T> {
    field: keyof T | string;
    headerName: string;
    sortable?: boolean;
    render?: (value: string | number, row: T) => React.ReactNode;
}

export type SortDirection = "asc" | "desc";

export interface DataTableProps<T> {
    columns: DataTableColumn<T>[];
    rows: T[];
    total: number;
    loading: boolean;
    page: number;
    pageSize: number;
    rowsPerPage: number;
    onPageChange: (newPage: number) => void;
    onRowsPerPageChange: (newSize: number) => void;
    order: SortDirection;
    orderBy: keyof T;
    onSortChange: (field: keyof T) => void;
    getRowId: (row: T) => string | number; // ✅ IMPORTANT

}
