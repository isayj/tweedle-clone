import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useUser = (userId : string) => {
    // It will not re-fetch every time we use it.
    // Instead, it will check whether the data exist
    // and decide whether the data needs to be revalidated and fetched again
    const { 
        data,
        error, 
        isLoading, 
        mutate 
    } = useSWR(userId ? `/api/users/${userId}` : null, fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    }
};

export default useUser;