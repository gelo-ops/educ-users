"use client";


import {Box, Typography} from "@mui/material";
import DefaultWrapper from "../../../component/DefaultWrapper";
import UsersTable from "./component/UsersTable";


const UsersPage = () => {
    return (
        <DefaultWrapper>
            <Typography variant="h4" gutterBottom>
                Users
            </Typography>
            <Box sx={{height: 600, width: "100%"}}>
                <UsersTable/>
            </Box>
        </DefaultWrapper>
    );
}
export default UsersPage