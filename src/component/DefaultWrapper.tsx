import {
    AppBar,
    Box,
    CssBaseline,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";

const drawerWidth = 240;

const DefaultWrapper = ({children}) => {
    return (<Box sx={{display: "flex"}}>
        <CssBaseline/>

        {/* Top App Bar */}
        <AppBar
            position="fixed"
            sx={{
                width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`,
            }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Admin Panel
                </Typography>
            </Toolbar>
        </AppBar>

        {/* Sidebar Drawer */}
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: "border-box"},
            }}
        >
            <Toolbar/>
            <Box sx={{overflow: "auto"}}>
                <List>
                    {[{text: "Dashboard", icon: <DashboardIcon/>, href: "/admin/dashboard"}, {
                        text: "Users",
                        icon: <PeopleIcon/>,
                        href: "/admin/users"
                    },].map((item) => (<ListItem key={item.text} component="a" href={item.href}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text}/>
                    </ListItem>))}
                </List>
            </Box>
        </Drawer>

        {/* Main Content */}
        <Box
            component="main"
            sx={{
                flexGrow: 1, bgcolor: "background.default", p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`},
            }}
        >
            <Toolbar/>
            {children}
        </Box>
    </Box>);
}
export default DefaultWrapper