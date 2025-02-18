import { useEffect, useState } from "react";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useUserStore } from "@/shared/utils/userStore";
import { useChatStore } from "@/shared/utils/chatStore";
import { db } from "@/shared/utils/firebase";

interface User {
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

export const useChatList = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [addMode, setAddMode] = useState(false);
  const [input, setInput] = useState("");

  const { currentUser } = useUserStore() as unknown as { currentUser: User };
  const { changeChat } = useChatStore();

  useEffect(() => {
    if (!currentUser || !currentUser.id) return;

    const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
      const items = res.data()?.chats || [];

      const chatData = await Promise.all(
        items.map(async (item: Omit<Chat, "user">) => {
          const userDocSnap = await getDoc(doc(db, "users", item.receiverId));
          return { ...item, user: userDocSnap.data() as User };
        })
      );

      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
    });

    return () => unSub();
  }, [currentUser.id]);

  const handleSelect = async (chat: Chat) => {
    if (!currentUser || !currentUser.id) return;

    const updatedChats = chats.map(({ user, ...rest }) => rest);
    const chatIndex = updatedChats.findIndex((item) => item.chatId === chat.chatId);
    if (chatIndex !== -1) updatedChats[chatIndex].isSeen = true;

    try {
      await updateDoc(doc(db, "userchats", currentUser.id), { chats: updatedChats });
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
    addMode,
    setAddMode,
    setInput,
    handleSelect,
  };
};
