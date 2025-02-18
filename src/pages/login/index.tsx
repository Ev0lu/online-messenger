import avatar_img from "@/shared/assets/images/avatar.png";
import { useAuth } from "./model";

const Login = () => {
    const { avatar, loading, handleAvatar, handleRegister, handleLogin } = useAuth();

    return (
        <div className="w-[100%] h-[100%] flex items-center gap-[100px]">
            <div className="flex-1 flex flex-col">
                <h2 className="text-center !mb-14">Welcome back,</h2>
                <form className="flex flex-col items-center justify-center gap-[20px]" onSubmit={handleLogin}>
                    <input
                        className="!p-[20px] outline-none bg-stone-700/[.54] text-white rounded-sm"
                        type="email"
                        placeholder="Email"
                        name="email"
                        required
                    />
                    <input
                        className="!p-[20px] outline-none bg-stone-700/[.54] text-white rounded-sm"
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? "Loading..." : "Sign In"}
                    </button>
                </form>
            </div>
            <div className="h-[90vh] w-[1px] bg-stone-600"></div>
            <div className="flex-1 flex flex-col">
                <h2 className="text-center !mb-14 !mt-5">Create an Account</h2>
                <form className="flex flex-col items-center justify-center gap-[20px]" onSubmit={handleRegister}>
                    <label className="w-[100%] flex items-center justify-center gap-[20px] cursor-pointer underline" htmlFor="file">
                        <img className="w-[50px] h-[50px] rounded-xl object-cover" src={avatar.url ? avatar.url : avatar_img} alt="avatar" />
                        Upload an image
                    </label>
                    <input
                        onChange={handleAvatar}
                        className="hidden"
                        type="file"
                        id="file"
                        accept="image/*"
                    />
                    <input
                        className="!p-[20px] outline-none bg-stone-700/[.54] text-white rounded-sm"
                        type="text"
                        placeholder="Username"
                        name="username"
                        required
                    />
                    <input
                        className="!p-[20px] outline-none bg-stone-700/[.54] text-white rounded-sm"
                        type="email"
                        placeholder="Email"
                        name="email"
                        required
                    />
                    <input
                        className="!p-[20px] outline-none bg-stone-700/[.54] text-white rounded-sm"
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? "Loading..." : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
