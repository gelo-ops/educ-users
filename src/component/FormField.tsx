import React from "react";
import {CircularProgress, InputAdornment, TextField, TextFieldProps,} from "@mui/material";

interface FormFieldProps extends Omit<TextFieldProps, "value" | "onChange"> {
    value: string;
    onChange: (value: string) => void;
    loading?: boolean;
    errorText?: string | null;
}

const FormField: React.FC<FormFieldProps> = ({
                                                 label, value, onChange, loading = false, errorText = null, ...rest
                                             }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };
    return (<TextField
        label={label}
        value={value}
        onChange={handleChange}
        fullWidth
        error={Boolean(errorText)}
        helperText={errorText || " "}
        InputProps={{
            endAdornment: loading ? (<InputAdornment position="end">
                <CircularProgress size={20}/>
            </InputAdornment>) : null,
        }}
        {...rest}
    />)
};

export default FormField
