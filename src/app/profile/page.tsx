
import { Divider } from '@mui/material';
import AddPostComponent from '@src/components/addPostComponent';
import ProfileHeader from '@src/components/profile/profileHeader';
import ProfileTabs from '@src/components/profile/profileTabs';
import { getMyprofile } from '@src/lib/_profile';
import { myProfilePath } from '@src/lib/apiPaths';
import { AddPost } from '@src/utils/_actions';

export default async function Profile() {

    const res = await getMyprofile();

    const data = await res.json();
    // console.log("🚀 ~ file: page.tsx:14 ~ Profile ~ data:", data)
    

    return (
        <div className='flex flex-col w-full gap-4'>
            <ProfileHeader />
            <AddPostComponent />
            <ProfileTabs /> 
        </div>
    );
}
