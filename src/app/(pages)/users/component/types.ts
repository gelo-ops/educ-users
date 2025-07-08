import {DataTableColumn, SortDirection} from "@/component/DataTable/types";

export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string; // Added
}

export interface UserUpdate {
    email?: string;
    name?: string;
    age?: number;
}
export interface UseUsersDataResult {
    rows: User[];
    columns: DataTableColumn<User>[];
    total: number;
    loading: boolean;
    page: number;
    setPage: (page: number) => void;
    pageSize: number;
    sortOrder: SortDirection;
    orderByField: keyof User;
    setPageSize: (size: number) => void;
    handleSortChange: (field: keyof User) => void;
    getUserId: (row: User) => string | number;
    refetch: () => void;
    error: string | null;
}
