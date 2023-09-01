import { useStore } from "./useStore";


export const useScroll = (callback) => {
  function subscribe(callback) {
    typeof window !== "undefined" &&
      window.addEventListener("scroll", callback);

    return () =>
      typeof window !== "undefined" &&
      window.removeEventListener("scroll", callback);
  }

  return useStore(subscribe, callback);
};
