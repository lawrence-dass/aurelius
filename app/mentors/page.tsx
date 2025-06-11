import {getAllMentors} from "@/lib/actions/mentor.actions";
import MentorCard from "@/components/MentorCard";
import { SearchParams } from "@/types";
import PracticeFilter from "@/components/PracticeFilter";
import SearchInput from "@/components/SearchInput";

const MentorsLibrary = async ({ searchParams }: SearchParams) => {
    const filters = await searchParams;
    const practice = filters.practice ? filters.practice : '';
    const focus = filters.focus ? filters.focus : '';
    const mentors = await getAllMentors({ practice, focus });

    return (
        <main>
            <section className="flex justify-between gap-4 max-sm:flex-col">
                <h1>Mentor Library</h1>
                <div className="flex gap-4">
                    <SearchInput />
                    <PracticeFilter />
                </div>
            </section>
            <section className="mentors-grid">
                  {mentors.map((mentor) => (
                    <MentorCard key={mentor.id} {...mentor} />
                ))}
            </section>
        </main>
    )
}

export default MentorsLibrary