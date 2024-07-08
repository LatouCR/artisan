"use client"
import { useState } from 'react';
import Image from 'next/image';

interface ImageModalProps {
    imageUrl: string;
    altText: string;
}

export default function ImageModal({ imageUrl, altText }: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <Image
        src={imageUrl}
        alt={altText}
        fill
        className="rounded-md object-cover cursor-pointer"
        onClick={openModal}
      />
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <Image
              src={imageUrl}
              alt={altText}
              width={1000}
              height={1000}
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}