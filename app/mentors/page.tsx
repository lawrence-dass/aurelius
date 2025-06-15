import {getMentors} from "@/lib/actions/mentor.actions";
import MentorCard from "@/components/MentorCard";
import { SearchParams } from "@/types";
import PracticeFilter from "@/components/PracticeFilter";
import SearchInput from "@/components/SearchInput";

const MentorsLibrary = async ({ searchParams }: SearchParams) => {
    const filters = await searchParams;
    const practices = filters.practice ? filters.practice : '';
    const name = filters.name ? filters.name : '';
    const mentors = await getMentors({ practices, name });

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