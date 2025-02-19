import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null, //  user details (id, name, role, profile, accessToken)

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
