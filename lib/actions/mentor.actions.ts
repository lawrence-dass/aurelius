"use server";

import { CreateMentor, GetAllMentors } from "@/types";
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
    }).select().single();
    console.log('data1111', data);
    if (error) {
        console.log('error1111', error);
        throw new Error(error.message);
    }
    return data;
}

export const getMentors = async ({ limit = 10, page = 1, practice, focus }: GetAllMentors) => {
    const supabase = createSupabaseClient();
    let query = supabase.from('mentors').select();

    if (practice && focus) {
        query = query.ilike('practice', `%${practice}%`).ilike('focus', `%${focus}%`);  
    } else if (practice) {
        query = query.ilike('practice', `%${practice}%`);
    } else if (focus) {
        query = query.ilike('focus', `%${focus}%`);
    }
    query = query.range((page - 1) * limit, page * limit); 
    const { data: mentors, error } = await query;

    if (error) {
        throw new Error(error.message);
    } else {
        return mentors;
    }
}