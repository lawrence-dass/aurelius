import MentorForm from "@/components/MentorForm";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {newMentorPermissions} from "@/lib/actions/mentor.actions";
import Image from "next/image";
import Link from "next/link";

const NewMentor = async () => {
    const { userId } = await auth();
    if(!userId) redirect('/sign-in');

    const canCreateMentor = await newMentorPermissions();

    return (
        <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
            {canCreateMentor ? (
                <article className="w-full gap-4 flex flex-col">
                    <h1>Companion Builder</h1>

                <MentorForm />
                </article>
                ) : (
                    <article className="mentor-limit">
                        <Image src="/images/limit.svg" alt="Mentor limit reached" width={360} height={230} />
                        <div className="cta-badge">
                            Upgrade your plan
                        </div>
                        <h1>You’ve Reached Your Limit</h1>
                        <p>You’ve reached your mentor limit. Upgrade to create more mentors and premium features.</p>
                        <Link href="/subscription" className="btn-primary w-full justify-center" >
                            Upgrade My Plan
                        </Link>
                    </article>
                )}
        </main>
    )
}

export default NewMentor