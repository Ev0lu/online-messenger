import { Chat } from "@/pages/chat/chat"
import { Detail } from "@/pages/detail/detail"
import { List } from "@/pages/list/list"
import Login from "@/pages/login"
import { useChatStore } from "@/shared/utils/chatStore"
import { auth } from "@/shared/utils/firebase"
import { useUserStore } from "@/shared/utils/userStore"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { ToastContainer } from "react-toastify"

function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading) return <div className="loading">Loading...</div>;
  return (
    <div className="app">
      <div className="min-w-[80vw] min-h-[90vh] flex z-2 bg-neutral-800/[.95] backdrop-saturate-180 backdrop-blur-sm rounded-xl border border-solid border-white/[0.15] overflow-hidden">
        {currentUser ? (
          <>
            <List />
            {chatId && <Chat />}
            {chatId && <Detail />}
          </>
        ) : (
          <Login />
        )}
        <ToastContainer position="bottom-right" />
      </div>
    </div>
  )
}

export default App
