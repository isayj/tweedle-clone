import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import useEditModal from "@/hooks/useEditModal";

import Modal from "../Modal";
import Input from "../Input";
import ImageUpload from "../ImageUpload";

const EditModal = () => {
    const { data: currentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
    const editModal = useEditModal();

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [coverImage, setCoverImage] = useState('');

    useEffect(() => {
        setName(currentUser?.name);
        setUsername(currentUser?.username);
        setBio(currentUser?.bio);
        setProfileImage(currentUser?.profileImage);
        setCoverImage(currentUser?.coverImage);
    }, [
        currentUser?.name,
        currentUser?.username,
        currentUser?.bio,
        currentUser?.profileImage,
        currentUser?.coverImage
    ]);
    // Objects are actually not the recommended thing
    // to be added in the dependency array
    // Individual fields are prefer for less errors

    const [isLoading, setIsLoading] = useState(false);
    
    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
          const res=  await axios.patch('/api/edit',JSON.stringify({
                name,
                username,
                bio,
                profileImage,
                coverImage
            }))
            mutateFetchedUser();

            toast.success('Updated');

            editModal.onClose();
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    },[bio, name, username, profileImage, coverImage, editModal, mutateFetchedUser]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <ImageUpload 
                value={profileImage}
                disabled={isLoading}
                onChange={(image) => setProfileImage(image)}
                label="Upload profile image"
            />            
            <ImageUpload 
                value={coverImage}
                disabled={isLoading}
                onChange={(image) => setCoverImage(image)}
                label="Upload cover image"
            />
            <Input
                placeholder='Name'
                value={name}
                disabled={isLoading}
                onChange={(e) => setName(e.target.value)}
            />
            <Input
                placeholder='Username'
                value={username}
                disabled={isLoading}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input
                placeholder='Bio'
                value={bio}
                disabled={isLoading}
                onChange={(e) => setBio(e.target.value)}
            />
        </div>
    )
    return ( 
        <Modal 
            disabled={isLoading}
            isOpen={editModal.isOpen}
            title="Edit your profile"
            actionLabel="Save"
            onClose={editModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    );
};

export default EditModal;