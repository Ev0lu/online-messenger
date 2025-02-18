import { AddUser } from "@/shared/ui/add-user";
import { useChatList } from "./model";
import { useUserStore } from "@/shared/utils/userStore";
import { User } from "../chat-list/model";

const ChatList = () => {
  const { chats, input, addMode, setAddMode, setInput, handleSelect } = useChatList();
  const { currentUser } = useUserStore() as { currentUser: User | null };

  return (
    <div className="p-4 bg-neutral-900 rounded-xl flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search"
          className="p-2 rounded bg-stone-700 text-white w-full"
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={() => setAddMode(!addMode)} className="p-2 bg-blue-500 rounded text-white">
          {addMode ? "-" : "+"}
        </button>
      </div>
      {chats
        .filter((c) => c.user.username.toLowerCase().includes(input.toLowerCase()))
        .map((chat) => (
          <div
            key={chat.chatId}
            className={`p-3 flex items-center gap-4 rounded cursor-pointer ${chat.isSeen ? "bg-transparent" : "bg-blue-500"}`}
            onClick={() => handleSelect(chat)}
          >
            <img
              src={currentUser && chat.user.blocked.includes(currentUser.id) ? "/avatar.png" : chat.user.avatar || "/avatar.png"}
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="text-white">
              <span className="block font-semibold">
                {currentUser && chat.user.blocked.includes(currentUser.id) ? "User" : chat.user.username}
              </span>
              <p className="text-sm text-gray-300">{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
