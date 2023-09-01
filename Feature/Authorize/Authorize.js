import { useQuery } from "react-query";

import { useRouter } from "next/router";
import { authorizeDomain } from "./AuthorizeDomain";
import { getUserToken } from "GetuserToken";

export const useAuth = (isenabled, redirect = false) => {
    const router = useRouter();
    const token = getUserToken();

    const { data, isLoading, isFetching, isError } = useQuery(
        ["user", token],
        () => authorizeDomain(token),
        {
            refetchOnWindowFocus: false,
            retry: 2,
            onSettled: (data, err) => {
                if (err) {
                    return;
                }

                if (redirect) return router.replace("/");
            },
            enabled: !!isenabled,
            cacheTime: 0,
        }
    );

    return [data, isLoading, isFetching, isError];
};
