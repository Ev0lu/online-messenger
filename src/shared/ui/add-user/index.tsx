import { avatar } from "@/shared/assets";
export const AddUser = ({setIsOpen, isOpen}: any ) => {

    const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setIsOpen(false);
        }
    };

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center bg-black/50" 
            onClick={closeModal}
        >
            <div className="!p-6 rounded-xl bg-stone-700 w-[400px]" onClick={(e) => e.preventDefault()}>
                <form className="flex flex-col gap-4">
                    <input className="!p-2 border rounded" type="text" placeholder="Username" name="username" />
                    <button className="!p-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Search</button>
                </form>
                <div className="!mt-4 flex items-center gap-4">
                    <img className="w-12 h-12 rounded-full" src={avatar} alt="avatar" />
                    <span className="text-white">Jane Doe</span>
                    <button className="!ml-auto !p-2 bg-green-500 hover:bg-green-600 text-white rounded">Add User</button>
                </div>
            </div>
        </div>
    );
};
