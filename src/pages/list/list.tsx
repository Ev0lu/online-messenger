import ChatList from "./model/ui/chat-list";
import UserInfo from "./model/ui/user-info";

export const List = () => {
    return (
        <div className="flex-1 flex flex-col">
            <UserInfo />
            <ChatList />
        </div>
    );
};