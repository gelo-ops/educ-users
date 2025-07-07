// components/DataTable/Pagination.tsx

import React from "react";
import {TablePagination} from "@mui/material";

interface Props {
    total: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (newPage: number) => void;
    onRowsPerPageChange: (newSize: number) => void;
}

export const DataTablePagination: React.FC<Props> = ({
                                                         total, page, rowsPerPage, onPageChange, onRowsPerPageChange,
                                                     }) => {
    return (<TablePagination
        component="div"
        count={total}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        onRowsPerPageChange={(e) => {
            onRowsPerPageChange(parseInt(e.target.value, 10));
        }}
    />);
}
