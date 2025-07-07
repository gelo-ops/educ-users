import React from "react";
import {Button as MuiButton, ButtonProps, CircularProgress} from "@mui/material";

interface AppButtonProps extends ButtonProps {
    loading?: boolean;
}

const AppButton: React.FC<AppButtonProps> = ({
                                                 loading, disabled, children, ...props
                                             }) => (<MuiButton
    disabled={disabled || loading}
    {...props}
    startIcon={loading ? (<CircularProgress size={16} color="inherit"/>) : (props.startIcon)}
>
    {children}
</MuiButton>);
export default AppButton