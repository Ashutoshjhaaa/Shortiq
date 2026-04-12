"use server";

import { auth } from "@/lib/clerk-server";
import { supabaseAdmin } from "@/lib/supabase";

export async function getUserProfile() {
    const { userId } = await auth();
    if (!userId) return null;

    try {
        const { data, error } = await supabaseAdmin
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .single();

        if (error) {
            console.warn("Could not fetch user profile:", error.message);
            return { id: userId, credits: 0 }; // Fallback
        }
        return data;
    } catch (err) {
        return null;
    }
}

export async function deleteUserAccount() {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "Unauthorized" };

    try {
        // 1. Delete user from auth.users (Cascades to series, video_projects, etc. if set up correctly)
        // Note: For full safety, we should delete related data explicitly if not cascading
        const { error: deleteAuthError } = await supabaseAdmin.auth.admin.deleteUser(userId);
        if (deleteAuthError) throw deleteAuthError;

        // Note: Next.js server actions can't easily logout the user *and* redirect in one go cleanly if session is destroyed.
        // We'll return success and let the client handle signOut().
        return { success: true };
    } catch (err: any) {
        console.error("deleteUserAccount failure:", err);
        return { success: false, error: err.message };
    }
}
