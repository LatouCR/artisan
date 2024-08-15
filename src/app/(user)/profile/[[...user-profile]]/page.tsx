/* eslint-disable @next/next/no-img-element */
"use client";
import { UserProfile } from '@clerk/nextjs'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'

const DotIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  )
};


const ViewProfile = () => {
  const { isLoaded, isSignedIn, user } = useUser()
  if (!isLoaded || !isSignedIn) {
    return null
  }

  console.log(user)

  return (
    <div className="container mx-auto">
      <div className="flex">
        <div className="mx-4">
          <img
            src={user.imageUrl}
            width={'250px'}
            height={'250px'}
            alt="User Profile"
            className="rounded-lg"
          />
        </div>
        <div className="ml-4">
          <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
            <div className="inline-block w-full overflow-hidden rounded-lg shadow-md">
              <table className="w-full leading-normal">
                <tbody>
                  {/* Firstname */}
                  <tr>
                    <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                      First Name
                    </td>
                    <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                      {user.firstName}
                    </td>
                  </tr>
                  {/* Last Name */}
                  <tr>
                    <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                      Last Name
                    </td>
                    <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                      {user.lastName}
                    </td>
                  </tr>
                  {/* Emails */}
                  <tr>
                    <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                      Emails
                    </td>
                    <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                      {user.emailAddresses.map((email) => (
                        <div key={email.emailAddress}>{email.emailAddress}</div>
                      ))}
                    </td>
                  </tr>
                  {/* Unsafe Metadata Example */}
                  <tr>
                    <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                      Custom Name
                    </td>
                    <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                      {(user?.unsafeMetadata as { customName?: string })?.customName ?? ''}
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                      Custom Bio
                    </td>
                    <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                      {(user?.unsafeMetadata as { customBio?: string })?.customBio ?? ''}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-center">
            <Link href={'/additional'}>
              <button className="mt-4 bg-purple-600 px-4 py-2 font-bold text-white transition-all hover:bg-purple-800">
                Update Additional Information
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}



export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-200 text-black">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <UserProfile path="/profile" routing="path">
          {/* You can pass the content as a component */}
          <UserProfile.Page label="Custom Page" labelIcon={<DotIcon />} url="custom-page">
            <ViewProfile />
          </UserProfile.Page>

          {/* You can also pass the content as direct children */}
          <UserProfile.Page label="Terms" labelIcon={<DotIcon />} url="terms">
            <div>
              <h1>Custom Terms Page</h1>
              <p>This is the custom terms page</p>
            </div>
          </UserProfile.Page>
        </UserProfile>
      </div>
    </main>
  );
}
