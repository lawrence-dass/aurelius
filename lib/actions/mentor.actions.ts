'use server';

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import sql from "@/lib/db";
import { CreateMentor, GetMentors, Mentor } from "@/types";

export type SessionRecord = {
    id: string;
    created_at: string;
    mentor_id: string;
    user_call_usage: number;
    name: string;
    practices: string[];
    specialties: string[];
};


export const createMentor = async (formData: CreateMentor) => {
    const { userId: author } = await auth();

    const rows = await sql`
        INSERT INTO mentors
            (name, title, famous_quote, introduction, primary_virtue, secondary_virtues,
             practices, specialties, voice, style, duration, mentor_type, author)
        VALUES
            (${formData.name}, ${formData.title}, ${formData.famousQuote},
             ${formData.introduction}, ${formData.primaryVirtue}, ${formData.secondaryVirtues},
             ${formData.practices}, ${formData.specialties}, ${formData.voice},
             ${formData.style}, ${formData.duration}, ${formData.mentorType}, ${author})
        RETURNING *
    `;

    if (!rows[0]) throw new Error('Failed to create a mentor');
    return rows[0] as Mentor;
}

export const getMentors = async ({ limit = 10, page = 1, practices, name }: GetMentors) => {
    const offset = (page - 1) * limit;
    const practiceValue = practices && practices !== "" && practices !== "all" && practices !== "undefined" ? practices as string : null;
    const nameValue = name ? `%${name}%` : null;

    let rows;

    if (practiceValue && nameValue) {
        rows = await sql`
            SELECT * FROM mentors
            WHERE mentor_type = 'default'
              AND practices @> ARRAY[${practiceValue}]
              AND name ILIKE ${nameValue}
            LIMIT ${limit} OFFSET ${offset}
        `;
    } else if (practiceValue) {
        rows = await sql`
            SELECT * FROM mentors
            WHERE mentor_type = 'default'
              AND practices @> ARRAY[${practiceValue}]
            LIMIT ${limit} OFFSET ${offset}
        `;
    } else if (nameValue) {
        rows = await sql`
            SELECT * FROM mentors
            WHERE mentor_type = 'default'
              AND name ILIKE ${nameValue}
            LIMIT ${limit} OFFSET ${offset}
        `;
    } else {
        rows = await sql`
            SELECT * FROM mentors
            WHERE mentor_type = 'default'
            LIMIT ${limit} OFFSET ${offset}
        `;
    }

    return rows as Mentor[];
}

export const getMentor = async (id: string) => {
    const rows = await sql`SELECT * FROM mentors WHERE id = ${id}`;
    return (rows[0] ?? null) as Mentor | null;
}

export const addToSessionHistory = async (mentorId: string, lapsedTime: number) => {
    const { userId } = await auth();

    await sql`
        INSERT INTO session_history (mentor_id, user_id, user_call_usage)
        VALUES (${mentorId}, ${userId}, ${lapsedTime})
    `;
}

export const getRecentSessions = async (userId: string, limit = 10) => {
    const rows = await sql`
        SELECT
            sh.id,
            sh.created_at,
            sh.mentor_id,
            sh.user_call_usage,
            m.name,
            m.practices,
            m.specialties
        FROM session_history sh
        JOIN mentors m ON sh.mentor_id = m.id
        WHERE sh.user_id = ${userId}
        ORDER BY sh.created_at DESC
        LIMIT ${limit}
    `;
    return rows as SessionRecord[];
}

export const getUserMentors = async (userId: string) => {
    const rows = await sql`SELECT * FROM mentors WHERE author = ${userId}`;
    return rows as Mentor[];
}

export const newMentorPermissions = async () => {
    const { has } = await auth();
    if (has({ plan: 'pro' })) {
        return true;
    }
    return false;
}

export const incrementGuestSession = async () => {
    const cookieStore = await cookies()
    const current = parseInt(cookieStore.get('guest_sessions')?.value ?? '0')
    const next = current + 1
    cookieStore.set('guest_sessions', String(next), {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
    })
    return next
}

// Bookmarks
export const addBookmark = async (mentorId: string, path: string) => {
    const { userId } = await auth();
    if (!userId) return;

    await sql`
        INSERT INTO bookmarks (mentor_id, user_id)
        VALUES (${mentorId}, ${userId})
        ON CONFLICT (mentor_id, user_id) DO NOTHING
    `;

    revalidatePath(path);
};

export const removeBookmark = async (mentorId: string, path: string) => {
    const { userId } = await auth();
    if (!userId) return;

    await sql`
        DELETE FROM bookmarks
        WHERE mentor_id = ${mentorId} AND user_id = ${userId}
    `;

    revalidatePath(path);
};

export const getBookmarkedMentors = async (userId: string) => {
    const rows = await sql`
        SELECT m.*
        FROM bookmarks b
        JOIN mentors m ON b.mentor_id = m.id
        WHERE b.user_id = ${userId}
    `;
    return rows as Mentor[];
};
