import CurrentUserFriendRequests from "@/components/friends/CurrentUserFriendRequests";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";



export default async function UserPage({ params }: { params: { id: string } }) {
  const { id } = params;

    const CurrentUser = await currentUser();
    const currentId = CurrentUser?.id;

    if (!currentId) {
        return null
    }

    revalidatePath(`/user/${id}/requests`);


    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-200 text-black">
        <div className="max-w-posts w-full flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <CurrentUserFriendRequests currentUserId={currentId}/>
        </div>
      </main>
    );
  }
  