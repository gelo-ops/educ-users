import React from "react";
import {Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle,} from "@mui/material";

interface ModalFormProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    onSubmit: () => void;
    loading?: boolean;
    submitLabel?: string;
}

const DefaultModal: React.FC<ModalFormProps> = ({
                                                    open,
                                                    onClose,
                                                    title,
                                                    children,
                                                    onSubmit,
                                                    loading = false,
                                                    submitLabel = "Save",
                                                }) => (<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>{children}</DialogContent>
    <DialogActions>
        <Button onClick={onClose} disabled={loading}>
            Cancel
        </Button>
        <Button onClick={onSubmit} disabled={loading} variant="contained">
            {loading ? <CircularProgress size={24}/> : submitLabel}
        </Button>
    </DialogActions>
</Dialog>);
export default DefaultModal