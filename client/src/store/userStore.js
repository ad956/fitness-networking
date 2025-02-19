import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null /*  
       user: {
          id, 
          name,
          mobile,
          email,
          profile,
          role, 
          accessToken
      }  */,

      setUser: (userData) => {
        set({ user: userData });
      },

      logoutUser: () => {
        set({ user: null });
      },
    }),
    {
      name: "user-storage",
    }
  )
);

export default useUserStore;
