// components/DataTable/index.tsx

import React from "react";
import {Paper, Table} from "@mui/material";
import {DataTableProps} from "./types";
import {DataTableHead} from "./TableHead";
import {DataTableBody} from "./TableBody";
import {DataTablePagination} from "./Pagination";

export const DataTable = <T extends object>({
                                   columns,
                                   rows,
                                   total,
                                   loading,
                                   page,
                                   rowsPerPage,
                                   onPageChange,
                                   onRowsPerPageChange,
                                   order,
                                   orderBy,
                                   onSortChange,
                                   getRowId,
                               }: DataTableProps<T>) => {

    return (<Paper>

        <Table>
            <DataTableHead
                columns={columns}
                order={order}
                orderBy={orderBy}
                onSortChange={onSortChange}
            />

            <DataTableBody<T> columns={columns} rows={rows} getRowId={getRowId} loading={loading}
            />
        </Table>
        <DataTablePagination
            total={total}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
        />
    </Paper>);
}
