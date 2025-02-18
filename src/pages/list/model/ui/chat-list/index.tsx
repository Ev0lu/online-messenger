import { useState } from "react";
import { useUserStore } from "@/shared/utils/userStore";
import { useChatStore } from "@/shared/utils/chatStore";
import { AddUser } from "@/shared/ui/add-user";
import { useChats } from "./model";
import { User } from "./model";

const ChatList = () => {
    const { changeChat } = useChatStore();
    const [addMode, setAddMode] = useState(false);
    const { chats, input, setInput, handleSelect } = useChats();
    const { currentUser } = useUserStore() as { currentUser: User | null };

    return (
        <div className="flex flex-col h-full p-4 bg-neutral-900 rounded-xl gap-4">
            <div className="flex items-center gap-2">
                <div className="flex items-center flex-1 p-2 bg-neutral-700 rounded-xl">
                    <img className="w-4 h-4" src="./search.png" alt="search" />
                    <input
                        className="bg-transparent text-white outline-none pl-2"
                        type="text"
                        placeholder="Search"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
                <img
                    className="w-6 h-6 p-2 cursor-pointer bg-neutral-700 rounded-xl"
                    onClick={() => setAddMode((prev) => !prev)}
                    src={addMode ? "./minus.png" : "./plus.png"}
                    alt="add_mode"
                />
            </div>
            <div className="overflow-y-auto max-h-[450px] custom-scrollbar pr-5">
                {chats.map((chat: any) => (
                    <div
                        key={chat.chatId}
                        onClick={() => handleSelect(chat, changeChat)}
                        className={`flex items-center gap-4 p-3 cursor-pointer rounded-xl my-2 ${chat.isSeen ? "bg-transparent" : "bg-blue-500"
                            }`}
                    >
                        <img
                            className="w-12 h-12 rounded-full object-cover"
                            src={
                                chat.user.blocked.includes(currentUser!.id)
                                    ? "./avatar.png"
                                    : chat.user.avatar || "./avatar.png"
                            }
                            alt="user_avatar"
                        />
                        <div className="text-white">
                            <span className="block font-semibold">
                                {chat.user.blocked.includes(currentUser!.id)
                                    ? "User"
                                    : chat.user.username}
                            </span>
                            <p className="text-sm text-gray-300">{chat.lastMessage}</p>
                        </div>
                    </div>
                ))}
            </div>

            {addMode && <AddUser />}
        </div>
    );
};

export default ChatList;
