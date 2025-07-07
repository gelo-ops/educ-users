import {useState} from "react";

export function useDeleteUser(refetch: () => void) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleOpen = (id: string) => {
        setUserId(id);
        setOpen(true);
        setError(null);
    };

    const handleClose = () => {
        if (loading) return;
        setOpen(false);
        setUserId(null);
        setError(null);
    };

    const handleDelete = async () => {
        if (!userId) return;
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/users?id=${userId}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error(`Failed to delete user (status ${res.status})`);
            }

            refetch();
            handleClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return {
        open,
        loading,
        error,
        handleOpen,
        handleClose,
        handleDelete,
    };
}
