import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const userCurrentUser = () => {
    // It will not re-fetch every time we use it.
    // Instead, it will check whether the data exist
    // and decide whether the data needs to be revalidated and fetched again
    const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    }
};

export default userCurrentUser;