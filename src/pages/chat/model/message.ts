import { useState } from "react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "@/shared/utils/firebase";

export interface Message {
    senderId: string;
    text: string;
    createdAt: Date;
    img?: string;
  }
  
const useSendMessage = (chatId: string, currentUser: any, message: string, img: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const sendMessage = async () => {
    if (!message) return;
    setIsLoading(true);
    let imgUrl = null;
    try {
      if (img.file) {
        imgUrl = URL.createObjectURL(img.file);
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text: message,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        } as Message), 
      });

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return { sendMessage, isLoading };
};

export default useSendMessage;
