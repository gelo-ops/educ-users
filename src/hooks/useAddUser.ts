import {useState} from "react";
import {User} from "../app/(pages)/users/component/types";

export interface FormData {
    name: string;
    email: string;
}

interface UseAddUserResult {
    open: boolean;
    setOpen: (v: boolean) => void;
    formData: Omit<User, "id" | "createdAt" | "updatedAt">;
    setFormData: (data: Omit<User, "id" | "createdAt" | "updatedAt">) => void;
    loading: boolean;
    error: string | null;
    handleSubmit: () => Promise<void>;
    updateField: (field: keyof FormData) => (value: string) => void;

}

export function useAddUser(refetchUsers: () => void): UseAddUserResult {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message);
            }
            refetchUsers();
            setOpen(false);
            setFormData({name: "", email: ""});
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };
    const updateField = (field: keyof typeof formData) => (value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return {
        open,
        setOpen,
        formData,
        setFormData,
        loading,
        error,
        handleSubmit,
        updateField,
    };
}
