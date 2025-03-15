import { useState, useEffect } from "react";
import { UICardType } from "../types";
const getBookmarksFromLocalStorage = () => {
  const bookmarks = localStorage.getItem("bookmarks");
  return bookmarks ? JSON.parse(bookmarks) : [];
};

const useBookmark = () => {
  const [bookmarks, setBookmarks] = useState(getBookmarksFromLocalStorage());

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (contest: UICardType) => {
    if (!bookmarks.some((b: UICardType) => b.name === contest.name && b.platform === contest.platform)) {
      setBookmarks([...bookmarks, contest]);
    }
  };

  const removeBookmark = (contest: UICardType) => {
    setBookmarks(bookmarks.filter(
      (b: UICardType) => !(b.name === contest.name && b.platform === contest.platform)
    ));
  };

  const isBookmarked = (contest: UICardType) => {
    return bookmarks.some(
      (b: UICardType) => b.name === contest.name && b.platform === contest.platform
    );
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
  };
};

export default useBookmark;