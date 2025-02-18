import { useEffect, useState } from "react";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useUserStore } from "@/shared/utils/userStore";
import { db } from "@/shared/utils/firebase";

export interface User {
    id: string;
    avatar: string;
    username: string;
    blocked: string[];
}

interface Chat {
    chatId: string;
    receiverId: string;
    updatedAt: number;
    lastMessage: string;
    isSeen: boolean;
    user: User;
}

export const useChats = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [input, setInput] = useState("");
    const { currentUser } = useUserStore() as { currentUser: User | null };

    useEffect(() => {
        if (!currentUser || !currentUser.id) return;

        const unSub = onSnapshot(
            doc(db, "userchats", currentUser!.id),
            async (res) => {
                const items = res.data()?.chats || [];

                const promises = items.map(async (item: any) => {
                    const userDocRef = doc(db, "users", item.receiverId);
                    const userDocSnap = await getDoc(userDocRef);
                    const user = userDocSnap.data() as User;

                    return { ...item, user };
                });

                const chatData = await Promise.all(promises);

                setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
            }
        );

        return () => {
            unSub();
        };
    }, [currentUser?.id]);

    const handleSelect = async (chat: Chat, changeChat: (chatId: string, user: User) => void) => {
        const updatedChats = chats.map((item) => {
            const { user, ...rest } = item;
            return rest;
        });

        const chatIndex = updatedChats.findIndex((item) => item.chatId === chat.chatId);

        if (chatIndex !== -1) updatedChats[chatIndex].isSeen = true;

        const userChatsRef = doc(db, "userchats", currentUser!.id);

        try {
            await updateDoc(userChatsRef, {
                chats: updatedChats,
            });
            changeChat(chat.chatId, chat.user);
        } catch (err) {
            console.error(err);
        }
    };

    const filteredChats = chats.filter((c) =>
        c.user.username.toLowerCase().includes(input.toLowerCase())
    );

    return {
        chats: filteredChats,
        input,
        setInput,
        handleSelect
    };
};
