import {useCallback, useEffect, useState} from "react";
import {UseUsersDataResult} from "@/app/(pages)/users/component/types";
import {DataTableColumn, SortDirection} from "@/component/DataTable/types";
import {type User} from "@prisma/client";


export function useUsersData(): UseUsersDataResult {
    const [rows, setRows] = useState<User[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [sortModel, setSortModel] = useState<{ field: keyof User; sort: SortDirection }[]>([
        {field: "createdAt", sort: "desc"},
    ]);
    const [error, setError] = useState<string | null>(null);
    const columns: DataTableColumn<User>[] = [
        {field: "id", headerName: "ID", sortable: true},
        {field: "name", headerName: "Name", sortable: true},
        {field: "email", headerName: "Email"},
        {
            field: "createdAt",
            headerName: "Created At",
            sortable: true,
            render: (value) => new Date(value).toLocaleDateString(),
        },

    ];
    const fetchUsers = useCallback(() => {
        let ignore = false;

        setLoading(true);
        setError(null);
        (async () => {

            try {
                const sortField = sortModel[0].field || "createdAt";
                const sortOrder = sortModel[0].sort || "desc";

                const res = await fetch(
                    `/api/users?page=${page}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`
                );
                const data = await res.json();

                if (!ignore) {
                    if (!Array.isArray(data.users)) {
                        setRows([]);
                        setTotal(0);
                    } else {
                        setRows(data.users);
                        setTotal(data.total);
                    }
                }
            } catch (err) {
                if (!ignore) {
                    setError(err instanceof Error ? err.message : "An error occurred");
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        })();


        return () => {
            ignore = true;
        };
    }, [page, pageSize, sortModel]);

    const runLoadUsers = () => {
        const trigger = fetchUsers();
        return trigger;
    }

    useEffect(runLoadUsers, [fetchUsers]);

    const order: SortDirection = sortModel[0].sort;
    const orderBy: keyof User = sortModel[0].field;

    const handleSortChange = (field: keyof User) => {
        const existing = sortModel[0];
        const isSameField = existing.field === field;
        const direction: SortDirection =
            isSameField && existing.sort === "asc" ? "desc" : "asc";
        setSortModel([{field, sort: direction}]);
    };
    const getUserId = (row: User) => row.id;
    return {
        rows,
        columns,
        total,
        loading,
        page,
        pageSize,
        setPage,
        setPageSize,
        sortOrder: order,
        orderByField: orderBy,
        handleSortChange,
        getUserId,
        refetch: runLoadUsers,
        error,
    };
}
