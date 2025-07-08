import {DataTableColumn, SortDirection} from "@/component/DataTable/types";
import {type User} from "@prisma/client";


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
