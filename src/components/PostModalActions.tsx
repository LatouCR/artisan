/* eslint-disable @next/next/no-img-element */
"use client";
import Link from 'next/link';

const PostModalActions = () => {
  return (
    <div className="flex justify-between mt-4 mb-2 px-4">
    <div className="flex items-center gap-4 max-w-36 h-7 rounded-lg hover:bg-slate-300">
        <img src="/imgicon.svg" alt="" />
        <p>Post Picture</p>
    </div>
    <Link href='/articles' className="flex items-center gap-4 max-w-36 h-7 rounded-lg hover:bg-slate-300">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.0588 28H27.4188C28.0383 28 28.5388 27.4995 28.5388 26.88V7.98H10.0588V28ZM27.4188 0H10.0588V5.74H28.5388V1.12C28.5388 0.5005 28.0383 0 27.4188 0ZM0.538818 1.12V26.88C0.538818 27.4995 1.03932 28 1.65882 28H7.81882V0H1.65882C1.03932 0 0.538818 0.5005 0.538818 1.12Z" fill="#780000" />
        </svg>
        <p>Write Article</p>
    </Link>
</div>
  )
}

export default PostModalActions