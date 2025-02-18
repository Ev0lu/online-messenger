import { useState, FormEvent, ChangeEvent } from "react";
import { toast } from "react-toastify";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db, auth } from "@/shared/utils/firebase";
import upload from "@/shared/utils/upload";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

interface Avatar {
    file: File | null;
    url: string;
}

export const useAuth = () => {
    const [avatar, setAvatar] = useState<Avatar>({ file: null, url: "" });
    const [loading, setLoading] = useState<boolean>(false);

    const handleAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0]),
            });
        }
    };

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target as HTMLFormElement);
        const { username, email, password } = Object.fromEntries(formData) as {
            username: string;
            email: string;
            password: string;
        };

        if (!username || !email || !password)
            return toast.warn("Please enter inputs!");
        if (!avatar.file) return toast.warn("Please upload an avatar!");

        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return toast.warn("Select another username");
        }

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const imgUrl = await upload(avatar.file);

            await setDoc(doc(db, "users", res.user.uid), {
                username,
                email,
                avatar: imgUrl,
                id: res.user.uid,
                blocked: [],
            });

            await setDoc(doc(db, "userchats", res.user.uid), {
                chats: [],
            });

            toast.success("Account created! You can login now!");
        } catch (err: any) {
            console.log(err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target as HTMLFormElement);
        const { email, password } = Object.fromEntries(formData) as {
            email: string;
            password: string;
        };

        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err: any) {
            console.log(err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        avatar,
        loading,
        handleAvatar,
        handleRegister,
        handleLogin,
    };
};
