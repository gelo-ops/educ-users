import React from "react";
import {Alert, Button, Stack} from "@mui/material";
import {useUsersData} from "@/hooks/useUsersTable";
import {useAddUser} from "@/hooks/useAddUser";
import {DataTable} from "@/component/DataTable";
import {User} from "./types";
import DefaultModal from "@/component/DefaultModal";
import FormField from "@/component/FormField";
import {AppButton} from "@/component/ui";
import {useEditUser} from "@/hooks/useEditUser";
import {useDeleteUser} from "@/hooks/useDeleteUser";
import {DataTableColumn} from "@/component/DataTable/types";

const UsersPage: React.FC = () => {
    const {
        rows,
        columns: baseColumns,
        total,
        loading,
        page,
        pageSize,
        sortOrder,
        orderByField,
        handleSortChange,
        setPage,
        setPageSize,
        getUserId,
        refetch,
    } = useUsersData();

    const addUser = useAddUser(refetch);
    const editUser = useEditUser(refetch);
    const deleteUser = useDeleteUser(refetch);

    const columns: DataTableColumn<User>[] = [...baseColumns, {
        field: "actions", headerName: "Actions", render: (_, row: User) => (<>
            <AppButton
                size="small"
                variant="contained"
                color="primary"
                onClick={() => editUser.startEdit(row)}
            >
                Edit
            </AppButton>
            <AppButton
                variant="outlined"
                color="error"
                size="small"
                onClick={() => deleteUser.handleOpen(row.id)}
                style={{marginLeft: 8}}
            >
                Delete
            </AppButton>
        </>),
    },];
    return (<>
        <Button
            variant="contained"
            color="primary"
            onClick={() => addUser.setOpen(true)}
        >
            Add User
        </Button>

        <DataTable<User>
            rows={rows}
            columns={columns}
            total={total}
            loading={loading || addUser.loading || editUser.loading}
            page={page}
            pageSize={pageSize}
            rowsPerPage={pageSize}
            order={sortOrder}
            orderBy={orderByField}
            onSortChange={handleSortChange}
            onPageChange={setPage}
            onRowsPerPageChange={setPageSize}
            getRowId={getUserId}
        />

        <DefaultModal
            open={addUser.open}
            onClose={() => addUser.setOpen(false)}
            title="Add User"
            onSubmit={addUser.handleSubmit}
            loading={addUser.loading}
            submitLabel="Add"
        >
            <Stack spacing={2}>
                {addUser.error && <Alert severity="error">{addUser.error}</Alert>}
                <FormField
                    label="Name"
                    value={addUser.formData.name}
                    onChange={addUser.updateField("name")}
                    loading={addUser.loading}
                />
                <FormField
                    label="Email"
                    value={addUser.formData.email}
                    onChange={addUser.updateField("email")}
                    loading={addUser.loading}
                />
            </Stack>

        </DefaultModal>

        <DefaultModal
            open={editUser.open}
            onClose={editUser.handleClose}
            title="Edit User"
            onSubmit={editUser.handleSave}
            submitLabel="Update"
        >
            {editUser.user && (<>
                {editUser.error && <Alert severity="error">{editUser.error}</Alert>}
                <FormField
                    label="Name"
                    value={editUser.user.name}
                    onChange={(v) => editUser.updateField("name", v)}
                    loading={editUser.loading}
                />
                <FormField
                    label="Email"
                    value={editUser.user.email}
                    onChange={(v) => editUser.updateField("email", v)}
                    loading={editUser.loading}
                />
            </>)}
        </DefaultModal>

        <DefaultModal
            open={deleteUser.open}
            onClose={deleteUser.handleClose}
            title="Confirm Delete"
            onSubmit={deleteUser.handleDelete}
            submitLabel="Delete"
            loading={deleteUser.loading}
        >
            {deleteUser.error && (<Alert severity="error">{deleteUser.error}</Alert>)}
            <p>Are you sure you want to delete this user? This action cannot be undone.</p>
        </DefaultModal>


    </>);
};

export default UsersPage;
