// components/DataTable/TableHead.tsx

import React from "react";
import {TableCell, TableHead, TableRow, TableSortLabel} from "@mui/material";
import {DataTableColumn} from "./types";

interface Props<T> {
    columns: DataTableColumn<T>[];
    order: "asc" | "desc";
    orderBy: keyof T;
    onSortChange: (field: keyof T | string) => void;
}

export const DataTableHead = <T, >({
                                       columns, order, orderBy, onSortChange,
                                   }: Props<T>) => {
    return (<TableHead>
        <TableRow>
            {columns.map((col) => (<TableCell key={String(col.field)}>
                {col.sortable ? (<TableSortLabel
                    active={orderBy === col.field}
                    direction={orderBy === col.field ? order : "asc"}
                    onClick={() => onSortChange(col.field)}
                >
                    {col.headerName}
                </TableSortLabel>) : (col.headerName)}
            </TableCell>))}
        </TableRow>
    </TableHead>);
}
