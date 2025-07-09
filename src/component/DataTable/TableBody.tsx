import React from "react";
import {CircularProgress, TableBody, TableCell, TableRow,} from "@mui/material";
import {DataTableColumn} from "./types";

interface Props<T extends object> {
    columns: DataTableColumn<T>[];
    rows: T[];
    getRowId: (row: T) => string | number;
    loading?: boolean;
}

export const DataTableBody = <T extends object>({
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
            {columns.map((col) => {
                const rawValue = row[col.field as keyof T];
                const displayValue = typeof rawValue === "string" || typeof rawValue === "number" ? rawValue : "";

                return (<TableCell key={String(col.field)}>
                    {col.render ? col.render(displayValue, row) : String(displayValue)}
                </TableCell>);
            })}
        </TableRow>))}
    </TableBody>);
};
