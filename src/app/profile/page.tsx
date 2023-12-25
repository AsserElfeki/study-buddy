
import ProfileHeader from '@src/components/profile/profileHeader';
import { getMyprofile } from '@src/lib/_profile';
import { myProfilePath } from '@src/lib/apiPaths';

export default async function Profile() {

    const userData = await await fetch(`${myProfilePath}`, {
        method: 'GET',
        cache: 'no-cache',
    });

    // const data = await userData.json();
    console.log("🚀 ~ file: page.tsx:14 ~ Profile ~ data:", userData)
    

    return (
        <>
            <ProfileHeader />
        </>
    );
}
