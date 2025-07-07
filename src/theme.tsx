import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#1976d2", // blue
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#9c27b0", // purple
        },
        background: {
            default: "#f5f6f8", // light gray background
            paper: "#ffffff",
        },
        text: {
            primary: "#212121",
            secondary: "#555555",
        },
    },
    typography: {
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        h1: {fontSize: "2rem", fontWeight: 600},
        h2: {fontSize: "1.75rem", fontWeight: 600},
        h3: {fontSize: "1.5rem", fontWeight: 600},
        h4: {fontSize: "1.25rem", fontWeight: 600},
        h5: {fontSize: "1rem", fontWeight: 500},
        h6: {fontSize: "0.875rem", fontWeight: 500},
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: "none",
                    borderBottom: "1px solid #e0e0e0",
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: "#ffffff",
                    borderRight: "1px solid #e0e0e0",
                },
            },
        },
    },
});

export default theme;