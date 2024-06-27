import { db } from "src/server/db"; 

export default async function Comments() {

    const Comments = await db.query.comments.findMany();
    
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-200 text-black">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1>Comentarios de Usuario</h1>
          <div>
            {Comments.map((comment) => (
              <div
                className="bg-white p-4 rounded-md shadow-md "
                key={comment.id}
              >
                <div className="w-full flex items-center gap-2">
                  <p>{comment.text}</p>
                  <p className="text-slate-400 text-xs">Author id: {comment.userId}</p>
                </div>
                <p className="text-blue-400">{comment.text}</p>
              </div>
            ))}
          </div>


        </div>
      </main>
    );
  }
  