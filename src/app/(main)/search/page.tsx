/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface Post {
    id: number;
    userId: string;
    imageUrl: string;
    text: string;
    userName: string;
}

const SearchResults: React.FC = () => {
    const searchParams = useSearchParams();
    const q = searchParams.get('q');
    const [results, setResults] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);



    const fetchResults = useCallback(async () => {
        if (!q) return;
        setIsLoading(true);
        setError(null);
        try {
            const isHashtag = q.startsWith('#');
            const query = isHashtag ? q.slice(1) : q;
            const response = await fetch('/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query, isHashtag }),
            });
            if (!response.ok) {
                throw new Error('Búsqueda fallida');
            }
            const data = await response.json();
            setResults(data);
        } catch (err) {
            setError('Error al realizar la búsqueda');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [q]);

    useEffect(() => {
        fetchResults().catch(console.error);
    }, [fetchResults]);

    return (

        <main className="flex min-h-screen flex-col items-center justify-center bg-slate-200 text-black">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">

                <div className="search-results-page">
                    <h1 className='text-black text-2xl flex gap-2'>Resultados de búsqueda para: <p className='text-ataccent'>{q}</p> </h1>
                    <Link href="/" className='text-2xl text-atprimary'>
                        Volver a la búsqueda
                    </Link>
                    {isLoading && <p className='text-2xl text-atprimary'>Cargando resultados...</p>}
                    {error && <p className="error-message">{error}</p>}
                    <div className="search-results">
                        {results.map((posts) => (
                            <div key={posts.id}
                                className="max-w-post w-full h-auto overflow-hidden bg-white rounded-sm my-1 border-neutral-400/70 border">
                                <div className="flex items-center px-3 py-2">
                                    <div className="flex items-center w-full justify-between">
                                        <Link
                                            href={`/user/${posts.userId}`}
                                            className="flex items-center gap-2"
                                        >
                                            <div className="max-w-12 max-h-12 border-slate-400 border flex items-center justify-center rounded-full cursor-pointer">
                                                <img src="/avatardefault.png" alt="" className="rounded-full" />
                                            </div>           
                                             <div>
                                                <h2 className="font-semibold hover:text-blue-700">{posts.userName}</h2>
                                                <p className="text-sm text-slate-400">Job Position</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>

                                <div className="w-full mb-2">
                                    <div className="flex items-center px-3 text-justify mb-2">
                                        <p className="text-base">{posts.text}</p>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                    {results.length === 0 && !isLoading && (
                        <p>No se encontraron resultados.</p>
                    )}
                </div>

            </div>
        </main>

    );
};

export default SearchResults;