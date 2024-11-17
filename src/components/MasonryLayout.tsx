// src/components/MasonryLayout.tsx
import React from "react";

interface MasonryLayoutProps {
  items: { id: string; image: string; title: string }[];
}

const MasonryLayout: React.FC<MasonryLayoutProps> = ({ items }) => {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
      {items.map((item) => (
        <div key={item.id} className="break-inside-avoid mb-4">
          <img
            src={item.image}
            alt={item.title}
            className="w-full rounded-lg"
          />
          <h3 className="mt-2 text-center text-gray-700">{item.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default MasonryLayout;
