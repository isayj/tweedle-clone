import { format } from 'date-fns';
import { useMemo } from 'react';

import userCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import Button from '../Button';

interface UserBioProps {
    userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
    const { data: currentUser } = userCurrentUser();
    const { data: fetchedUser } = useUser(userId);

    const createdAt = useMemo(() => {
        if (!fetchedUser?.createdAt) {
            return null;
        }

        return format(new Date(fetchedUser.createdAt), 'MMMM yyyy')
    },[fetchedUser?.createdAt]);

    return (
        <div className="border-b-[1px] border-neutral-800 pb-4">
            <div className="flex justify-end p-2">
                {currentUser?.id == userId ? (
                    <Button 
                        secondary
                        label="Edit" 
                        onClick={() => {}} 
                    />
                ) : (
                    <Button 
                        secondary
                        label="Follow"
                        onClick={() => {}}
                    />
                )}
            </div>
        </div>
    );
};

export default UserBio;