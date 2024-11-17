import React from "react";
import { HiBookmark, HiOutlineBookmark, HiShare } from "react-icons/hi";
import { FaEye } from "react-icons/fa";

interface ActionBarProps {
  id: string;
  views: number;
  isAuthenticated: boolean;
  isBookmarked: (id: string) => boolean;
  handleAddBookmark: (recipe: any) => void;
  handleRemoveBookmark: (recipe: any) => void;
  recipe: any;
}

const ActionBar: React.FC<ActionBarProps> = ({
  id,
  views,
  isAuthenticated,
  isBookmarked,
  handleAddBookmark,
  handleRemoveBookmark,
  recipe,
}) => {
  return (
    <div className="flex items-center justify-between mb-4 p-4">
      {/* Bookmark Icon */}
      {isAuthenticated ? (
        isBookmarked(id) ? (
          <HiBookmark
            onClick={() => handleRemoveBookmark(recipe)}
            className="text-green-500 text-2xl cursor-pointer hover:text-green-600"
          />
        ) : (
          <HiOutlineBookmark
            onClick={() => handleAddBookmark(recipe)}
            className="text-gray-500 text-2xl cursor-pointer hover:text-gray-700"
          />
        )
      ) : (
        <HiOutlineBookmark className="text-gray-300 text-2xl" />
      )}

      {/* Share Icon */}
      <HiShare
        className="text-blue-500 text-2xl cursor-pointer hover:text-blue-600"
        onClick={() => alert("Share functionality here")}
      />

      {/* Views Icon and Number of Views */}
      <div className="flex items-center text-gray-600">
        <FaEye className="text-xl mr-1" />
        <span>{views}</span>
      </div>
    </div>
  );
};

export default ActionBar;
