import React from "react";
import {CircularProgress, TableBody, TableCell, TableRow} from "@mui/material";
import {DataTableColumn} from "./types";

interface Props<T> {
    columns: DataTableColumn<T>[];
    rows: T[];
    getRowId: (row: T) => string | number;
    loading?: boolean;
}

export const DataTableBody = <T, >({
                                       columns, rows, getRowId, loading,
                                   }: Props<T>) => {
    if (loading) {
        return (<TableBody>
            <TableRow>
                <TableCell colSpan={columns.length} align="center">
                    <CircularProgress/>
                </TableCell>
            </TableRow>
        </TableBody>);
    }

    if (!loading && (!rows || rows.length === 0)) {
        return (<TableBody>
            <TableRow>
                <TableCell colSpan={columns.length} align="center">
                    No data available
                </TableCell>
            </TableRow>
        </TableBody>);
    }

    return (<TableBody>
        {rows.map((row) => (<TableRow key={getRowId(row)}>
            {columns.map((col) => (<TableCell key={String(col.field)}>
                {col.render ? col.render((row as any)[col.field], row) : String((row as any)[col.field])}
            </TableCell>))}
        </TableRow>))}
    </TableBody>);
};
