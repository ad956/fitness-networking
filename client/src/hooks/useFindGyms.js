import axios from "@api";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@store";

const useFindGyms = () => {
  const { user } = useUserStore();

  return useQuery({
    queryKey: ["nearby-gyms"],
    queryFn: async () => {
      try {
        const response = await axios.get("user/nearby-gyms", {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        if (response.data.message) {
          throw new Error(response.data.message);
        }

        console.log(response.data);

        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch gyms"
        );
      }
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 2,
  });
};

export default useFindGyms;
