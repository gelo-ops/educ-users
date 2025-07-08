import {useState} from "react";
import {type User} from "@prisma/client";

export function useEditUser(onSuccess?: () => void) {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<User>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const startEdit = (userToEdit: User) => {
        setUser(userToEdit);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUser(null);
        setError(null);
    };

    const handleSave = async () => {
        if (!user) return;
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/users`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    id: user.id,
                }),
            });

            if (!res.ok) {
                const data: Error = await res.json();
                throw new Error(data.message);
            }

            onSuccess?.();
            handleClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    const updateField = (field: keyof User, value: string) => {
        if (user) {
            setUser({...user, [field]: value});
        }
    };

    return {
        open,
        user,
        loading,
        error,
        startEdit,
        handleClose,
        handleSave,
        updateField,
    };
}
