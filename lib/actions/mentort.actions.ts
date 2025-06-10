"use server";

import { CreateMentor } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";

export const createMentor = async(formData: CreateMentor) => {
    const { userId: author } = await auth();
    if (!author) {
        throw new Error("Unauthorized");
    }
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.from('mentors').insert({
        ...formData,
        author,
    }).select();
    console.log('data', data);
    console.log('error', error);
    console.log('formData', formData, author);
    if (error) {
        throw new Error(error.message);
    }
    return data;
}