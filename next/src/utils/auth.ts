import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./firebase"; // Firebase を初期化したファイルからインポート
import { toast } from "react-hot-toast";

// Googleでログインする関数
const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        // Googleアカウントを使用してログイン
        const result = await signInWithPopup(auth, provider);
        // Googleユーザー情報を取得
        const user = result.user;
        const response = await fetch("http://localhost:8080/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                uid: user.uid,
                email: user.email,
                name: user.displayName,
            }),
        });
        console.log("Logged in as ", user.displayName, user.email, user.uid);
        toast.success("Logged in as " + user.displayName);
    } catch (error) {
        console.error("Error logging in with Google:", error);
        toast.error("Failed to log in with Google");
    }
};

export default signInWithGoogle;

// サインアウトする関数
export const signOutUser = async () => {
    try {
        await signOut(auth);
        console.log("User signed out");
        toast.success("Signed out successfully");
    } catch (error) {
        console.error("Error signing out:", error);
        toast.error("Failed to sign out");
    }
};