import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { avatar, arrowDown, download } from "@/shared/assets";
import { useUserStore } from "@/shared/utils/userStore";
import { useChatStore } from "@/shared/utils/chatStore";
import { auth, db } from "@/shared/utils/firebase";

export const Detail= () => {
  const { user, isCurrentUserBlocked, isReceiverBlocked, changeBlock, resetChat } = useChatStore();
  const { currentUser } = useUserStore() as { currentUser: { id: string } | null };

  const handleBlock = async () => {
    if (!user) return;
    if (!currentUser) return;
    const userDocRef = doc(db, "users", currentUser.id);
    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    resetChat();
  };

  return (
    <div className="flex-1 max-w-[450px] max-sm:hidden">
      <div className="!pt-[30px] !pb-[30px] !pr-[20px] !pl-[20px] flex flex-col items-center gap-[20px] border-b border-stone-700">
        <img className="w-[100px] h-[100px] object-cover rounded-full" src={user?.avatar || avatar} alt="avatar" />
        <h2>{user?.username || "Jane Doe"}</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="!p-[20px] flex flex-col gap-[30px]">
        <div>
          <div className="flex items-center justify-between !mb-3">
            <span>Shared photos</span>
            <img className="rounded-full w-[30px] h-[30px] bg-stone-900/[.54] !p-[10px] cursor-pointer" src={arrowDown} alt="photos" />
          </div>
          <div className="flex flex-col gap-[20px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[20px]">
                <img className="w-[40px] h-[40px] rounded-xs object-cover" src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" />
                <span className="text-sm !font-[Manrope] font-bold text-gray-300">photo</span>
              </div>
              <img className="rounded-full w-[30px] h-[30px] bg-stone-900/[.54] !p-[10px] cursor-pointer" src={download} alt="download" />
            </div>
          </div>
        </div>
        <button className="bg-red-500/[.84] hover:bg-red-700/[.60] !p-[10px]" onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are Blocked!"
            : isReceiverBlocked
            ? "User blocked"
            : "Block User"}
        </button>
        <button className="bg-blue-500/[.84] hover:bg-blue-500/[.60] !p-[10px]" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};