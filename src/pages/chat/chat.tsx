import { avatar, camera, emoji, info, mic, phone, video } from "@/shared/assets";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import useSendMessage from "./model/message";

export const Chat = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chat] = useState<any>();
    const [img, setImg] = useState<{ file: File | null; url: string }>({ file: null, url: "" });
    const endRef = useRef<HTMLDivElement>(null);

    // const { currentUser } = useUserStore();
    // const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    //   useChatStore();

    // useEffect(() => {
    //     endRef.current?.scrollIntoView({ behavior: "smooth" });
    //   }, [chat.messages]);

    //   useEffect(() => {
    //     const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
    //       setChat(res.data());
    //     });

    //     return () => {
    //       unSub();
    //     };
    //   }, [chatId]);

    const currentUser = { id: "1", username: "John Doe", avatar: avatar };
    const user = { id: "2", username: "Jane Doe", avatar: avatar };

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    const handleEmoji = (e: any) => {
        setMessage((prev) => prev + e.emoji);
        setOpen(false);
    };

    const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImg({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0]),
            });
        }
    };

    const { sendMessage } = useSendMessage("chatId123", currentUser, message, img); // Пример использования хука

    return (
        <div className="flex flex-col flex-2 border-r border-l border-neutral-600">
            <div className="flex items-center justify-between border-b border-stone-700 !p-[20px]">
                <div className="flex items-center gap-[20px]">
                    <img className="max-sm:hidden w-[60px] h-[60px] rounded-full object-cover" src={user.avatar} />
                    <div>
                        <span className="font-bold text-base">{user.username}</span>
                        <p className="font-bold text-xs text-stone-500">Lorem ipsum dolor, sit amet</p>
                    </div>
                </div>
                <div className="flex gap-[20px]">
                    <img className="w-[20px] h-[20px] cursor-pointer" src={phone} />
                    <img className="w-[20px] h-[20px] cursor-pointer" src={video} />
                    <img className="w-[20px] h-[20px] cursor-pointer" src={info} />
                </div>
            </div>
            <div className="!p-[20px] overflow-scroll flex flex-col gap-[20px] flex-1 max-h-[450px] max-w-[690px] custom-scrollbar overflow-x-hidden">
                {chat?.messages?.map((message: any) => (
                    <div
                        className={message.senderId === currentUser.id ? "max-w-[70%] flex gap-[20px] items-end self-end" : "max-w-[70%] flex items-start gap-[20px]"}
                        key={message.createdAt}
                    >
                        <img className="object-contain w-[30px] h-[30px] rounded-full" src={avatar} />
                        <div className="flex-1 flex flex-col items-start gap-[5px]">
                            {message.img && <img className="rounded-xl object-cover w-[100%] h-[150px]" src={message.img} />}
                            <p className="text-sm font-[Montserrat] bg-stone-500/[.24] !p-[10px] rounded-xl">{message.text}</p>
                            <span className="text-sm">{new Date(message.createdAt.toDate()).toLocaleString()}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div ref={endRef} />
            <div className="!p-[20px] flex items-center justify-between border-t border-stone-700 gap-[20px]">
                <div className="flex gap-[20px]">
                    <label htmlFor="file">
                        <img className="w-[20px] h-[20px] cursor-pointer" src={img.url} />
                    </label>
                    <input
                        type="file"
                        id="file"
                        style={{ display: "none" }}
                        onChange={handleImg}
                    />
                    <img className="w-[20px] h-[20px] cursor-pointer" src={camera} />
                    <img className="w-[20px] h-[20px] cursor-pointer" src={mic} />
                </div>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 bg-neutral-900/[.54] text-sm outline-none text-white !p-[20px] rounded-xl"
                    type="text"
                    placeholder="Type a message..."
                />
                <div className="relative">
                    <img className="w-[20px] h-[20px] cursor-pointer" src={emoji} alt="emoji" onClick={() => setOpen(prev => !prev)} />
                    <div className="absolute bottom-[50px] -left-[10px]">
                        <EmojiPicker open={open} onEmojiClick={handleEmoji} />
                    </div>
                </div>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};
