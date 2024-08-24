"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from "lucide-react";
import { Input } from './ui/input';

interface Post {
    id: number;
    text: string;
    userName: string;
}

const Searchbar: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <div className="relative h-10 ml-4">
            <form onSubmit={handleSearch} className="search-form">
                <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar posts o hashtags..."
                    className="search-input py-2 w-60 rounded-2xl"
                />
                <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <Search size={18} />
                </button>
            </form>
        </div>
    );
};

export default Searchbar;