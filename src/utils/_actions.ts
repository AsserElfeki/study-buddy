// "use server";

import { authOptions } from '@lib/auth';
import prisma from '@lib/prisma';
import { Session, getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { getSignature, validateSignature } from './_cloudinary';
import { $Enums, Application, highestQualification } from '@prisma/client';


/**
 * Retrieves all posts from the database.
 *
 * @param {number} skip - The number of posts to skip.
 * @param {number} take - The number of posts to take.
 * @return {Promise<Post[]>} An array of posts.
 */
export async function getAllPosts(skip?: number, take?: number) {

    const session = await getServerSession({ ...authOptions });

    if (!session) {
        return null;
    }

    const user = session.user;
    // console.log("🚀 ~ file: actions.ts:16 ~ getAllPosts ~ user:", user)
    //check if user isActive
    if (!user.isActive) {
        return "inactive user";
    }

    const posts = await prisma.post.findMany(
        {
            skip,
            take,
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                author: {
                    select: {
                        firstName: true,
                        lastName: true,
                        image: true
                    }
                },
                comments: {
                    include: {
                        author: {
                            select: {
                                firstName: true,
                                lastName: true,
                                image: true
                            }
                        },
                    }
                },
                // count likes
                _count: {
                    select: {
                        likes: true
                    }
                }
            }
        }
    );

    return posts;

}


/**
 * Add a comment to a post.
 *
 * @param {FormData} formData - The form data containing the comment content.
 * @param {string} postId - The ID of the post to add the comment to.
 * @return {Promise<Comment>} The newly created comment.
 */
export async function AddComment(formData: FormData, postId: string) {
    const content = formData.get('comment');
    // console.log("🚀 ~ file: actions.ts:60 ~ AddComment ~ content:", content)
    const session = await getServerSession({ ...authOptions });
    if (!session) {
        return null;
    }
    const user = session.user;
    // console.log("🚀 ~ file: actions.ts:66 ~ AddComment ~ user:", user)
    if (!user.isActive) {
        return "inactive user";
    }
    const comment = await prisma.comment.create({
        data: {
            content: content as string,
            postId: postId,
            authorId: user.id
        }
    });
    revalidatePath('./forum')
    return comment;
}

/**
 * Adds a new post to the forum.
 *
 * @param {FormData} formData - The form data containing the content and title of the post.
 * @return {Promise<null | "inactive user" | Post>} - A promise that resolves to either null, "inactive user", or the newly created post.
 */
export async function AddPost(formData: FormData, path: string) {
    const content = formData.get('content');
    const title = formData.get('title');
    // console.log("🚀 ~ file: actions.ts:60 ~ AddComment ~ content:", content)
    const session = await getServerSession({ ...authOptions });
    if (!session) {
        return null;
    }
    const user = session.user;
    // console.log("🚀 ~ file: actions.ts:66 ~ AddComment ~ user:", user)
    if (!user.isActive) {
        return "inactive user";
    }
    const post = await prisma.post.create({
        data: {
            content: content as string,
            authorId: user.id,
            title: title as string
        }
    });
    revalidatePath(`.${path}`)
    // console.log("🚀 ~ file: _actions.ts:132 ~ AddPost ~ path:", `.${path}`)
    return post;
}

//function that takes post id and checks if it belongs to the user

export async function checkPostOwnership(postId: string): Promise<boolean> {
    const session : Session = await getServerSession({ ...authOptions });
    if (!session) {
        return false;
    }
    const user = session.user;
   
    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    })
    if (post?.authorId === session.user.id) {
        return true;
    }
    return false
}

/**
 * Likes a post.
 *
 * @param {string} postId - The ID of the post to like.
 * @return {Promise<void>} - A Promise that resolves when the post has been liked.
 */
export async function likePost(postId: string) {
    // console.log("🚀 ~ file: actions.ts:60 ~ AddComment ~ content:", content)
    const session = await getServerSession({ ...authOptions });
    if (!session) {
        return {
            success: false,
            error: "not logged in"
        };
    }
    const user = session.user;
    if (!user.isActive) {
        return {
            success: false,
            error: "inactive user"
        }
    }
    //check if it exists
    const exists = await prisma.like.findFirst({
        where: {
            postId: postId,
            authorId: user.id
        }
    })
    if (exists) {
        return {
            success: false,
            error: "already liked"
        }
    }
    //create a like from this user to this post
    const like = await prisma.like.create({
        data: {
            postId: postId,
            authorId: user.id
        }
    })
    console.log("🚀 ~ file: actions.ts:108 ~ likePost ~ post:", like)

    revalidatePath('./forum')
    return {
        success: true,
        data: like
    };

}


type PersonalInfoFormType = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    nationality: { label: string, value: string };
    nativeLanguage: { label: string, value: string };
    englishProficiency: { label: string, value: string };
    userConsent: boolean;
};

type EducationalBackgroundFormType = {
    highestQualification: { label: string, value: string };
    institutionName: string;
    graduationYear: { label: string, value: string };
};

type FilesType = {
    documents: any[];
    numFiles: number;
};


/**
 * Starts the application process for a study program.
 *
 * @param {string} studyProgramId - The ID of the study program.
 * @param {PersonalInfoFormType} PersonalInfoForm - The personal information form data.
 * @param {EducationalBackgroundFormType} EducationalBackgroundForm - The educational background form data.
 * @param {any} files - The files to be uploaded.
 * @return {Promise<any>} - The application object or an error message.
 */
export async function startApplication(
    studyProgramId: string,
    personalInfoForm: PersonalInfoFormType,
    educationalBackgroundForm: EducationalBackgroundFormType, files) {
    const session = await getServerSession({ ...authOptions });
    if (!session) {
        return null;
    }
    const user = session.user;
    if (!user.isActive) {
        return "inactive user";
    }
    let updatedApplication: Application;
    const application = await prisma.application.findFirst({
        where: {
            userId: session.user.id,
            studyProgramId: studyProgramId
        }
    });
    if (application) {
        updatedApplication = await prisma.application.update({
            where: {
                id: application.id
            },
            data: {
                userConsent: personalInfoForm.userConsent
            }
        });
    }
    else {
        updatedApplication = await prisma.application.create({
            data: {
                userId: session.user.id,
                studyProgramId: studyProgramId,
                userConsent: personalInfoForm.userConsent
            }
        });
    }
    delete personalInfoForm.userConsent;

    console.log(updatedApplication.id)
    const personalInfoResponse = await createPersonalInfo(personalInfoForm, updatedApplication.id);
    if (!personalInfoResponse.success)
        return personalInfoResponse;
    const educationalBackgroundResponse = await createEducationalBackground(educationalBackgroundForm, updatedApplication.id);
    if (!educationalBackgroundResponse.success)
        return educationalBackgroundResponse;
    const uploadDocsResponse = await uploadDocs(files, updatedApplication.id);
    if (!uploadDocsResponse.success)
        return uploadDocsResponse;
    return updatedApplication;
}

/**
 * Creates a personal information entry in the database.
 *
 * @param {PersonalInfoFormType} form - The form data for creating the personal information entry.
 * @param {any} id - The ID of the related application.
 * @return {Promise<{success: boolean, data?: any, error?: any}>} - A Promise that resolves to an object indicating the success status, and optionally containing the created personal information entry or an error.
 */
export async function createPersonalInfo(form: PersonalInfoFormType, id: any) {
    let formattedForm = JSON.parse(JSON.stringify(form));
    formattedForm.nationality = form.nationality.label;
    formattedForm.languageProficiency = form.englishProficiency.label;
    formattedForm.nativeLanguage = form.nativeLanguage.label;
    formattedForm.dateOfBirth = new Date(form.dateOfBirth).toISOString();
    delete formattedForm.englishProficiency
    console.log(formattedForm);
    let newpersonalInfo;
    try {
        //find existing personal info that relates to this application, if exists, edit it
        const exists = await prisma.personalInfo.findFirst({
            where: {
                application: {
                    id: id
                }
            }
        })
        if (exists) {
            newpersonalInfo = await prisma.personalInfo.update({
                where: {
                    id: exists.id
                },
                data: {
                    ...formattedForm
                }
            })
        }
        else {
            newpersonalInfo = await prisma.personalInfo.create({
                data: {
                    ...formattedForm,
                    application: {
                        connect: {
                            id: id
                        }
                    }
                }
            })
        }
    }
    catch (error) {
        console.log("🚀 ~ file: actions.ts:140 ~ createPersonalInfo ~ error", error)
        return {
            success: false,
            error: error
        }
    }
    return {
        success: true,
        data: newpersonalInfo
    }
}


/**
 * Creates an educational background record for a given form and application ID.
 *
 * @param {Object} form - The form object containing the educational background data.
 * @param {string} id - The ID of the application.
 * @return {Promise<void>} A promise that resolves when the educational background record is created.
 */
export async function createEducationalBackground(form: EducationalBackgroundFormType, id: string) {
    let formattedForm = JSON.parse(JSON.stringify(form));
    formattedForm.highestQualification = form.highestQualification.label
    formattedForm.graduationYear = parseInt(form.graduationYear.label);
    switch (formattedForm.highestQualification) {
        case "High School":
            formattedForm.highestQualification = highestQualification.HighSchool;
            break;
        case "Bachelor":
            formattedForm.highestQualification = highestQualification.Bachelor;
            break;
        case "Master":
            formattedForm.highestQualification = highestQualification.Master;
            break;
        case "PhD":
            formattedForm.highestQualification = highestQualification.PhD;
            break;
        default:
            break;
    }
    let newEducationalBackground;
    try {
        const exists = await prisma.educationalBackground.findFirst({
            where: {
                application: {
                    id: id
                }
            }
        })
        if (exists) {
            newEducationalBackground = await prisma.educationalBackground.update({
                where: {
                    id: exists.id
                },
                data: {
                    ...formattedForm
                }
            })
        }
        else {
            newEducationalBackground = await prisma.educationalBackground.create({
                data: {
                    ...formattedForm,
                    institutionName: form.institutionName || '', // Add the 'institutionName' property with a default value of an empty string
                    application: {
                        connect: {
                            id: id
                        }
                    }
                }
            })
        }
    }
    catch (error) {
        console.log("🚀 ~ file: actions.ts:140 ~ createEducationalBackground ~ error", error)
        return {
            success: false,
            error: error
        }
    }
    return {
        success: true,
        data: newEducationalBackground
    }
}



/**
 * Uploads documents to the server.
 *
 * @param {Array} documents - the list of documents to upload
 * @param {any} applicationId - the ID of the application
 * @return {Promise<Object>} - a Promise that resolves to an object with the following properties:
 *   - success: a boolean indicating whether the upload was successful
 *   - data: an array of file links
 */
export async function uploadDocs(documents: any, applicationId: any) {
    let fileLinks = [];
    for (const doc of documents) {
        if (!doc)
            continue;

        let url: any;
        const { timestamp, signature } = await getSignature('supporting-documents');
        const formData = new FormData();
        formData.append('file', doc[1]);
        formData.append('resource_type', 'auto')
        formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
        formData.append('signature', signature);
        formData.append('timestamp', timestamp.toString());
        formData.append('folder', 'supporting-documents');

        const endPoint = `${process.env.CLOUDINARY_UPLOAD_API}raw/upload`;

        let res: { error: { message: any; }; secure_url: any; version: any; public_id: any; signature: any; };
        try {
            res = await fetch(endPoint, {
                method: 'POST',
                body: formData,
            }).then(res => res.json());

            if (res.error) {
                return {
                    success: false,
                    error: res.error.message
                }
            } else {
                url = res.secure_url;
            }
        } catch (error) {
            console.error("Fetch error: ", error);
            return {
                success: false,
                error: error
            }
        }
        //save the url to the database
        const safe = await validateSignature({
            version: res?.version,
            public_id: res?.public_id,
            signature: res?.signature,
        });
        if (safe) {
            const fileLink = await prisma.document.create({
                data: {
                    link: res?.secure_url,
                    application: {
                        connect: {
                            id: applicationId
                        }
                    }
                }
            })
            fileLinks.push(fileLink);
        } else {
            return {
                success: false,
                error: "Invalid signature"
            }
        }
    }
    return {
        success: true,
        data: fileLinks
    }
}

export async function addToFavorites(programId: string): Promise<any> {
    const session = await getServerSession({ ...authOptions });
    if (!session) {
        return null;
    }
    const currentUser = session.user;
    if (!currentUser.isActive) {
        return "inactive user";
    }

    let user: { favorites: any; id?: string; email?: string; password?: string; emailVerified?: Date; image?: string; firstName?: string; isActive?: boolean; lastName?: string; role?: $Enums.Role; sex?: string; friendList?: string[]; createdAt?: Date; };
    try {
        user = await prisma.user.findUnique({
            where: {
                id: currentUser.id
            }
        });

        //check if the program is in the favorites list
        const isFavorite = user.favorites.includes(programId);
        if (!isFavorite) {
            user = await prisma.user.update({
                where: {
                    id: currentUser.id
                },
                data: {
                    favorites: {
                        push: programId
                    }
                }
            });
        }
    }
    catch (e) {
        // console.log("🚀 ~ file: actions.ts:66 ~ AddComment ~ user:", e)
    }
    // console.log("🏳️‍🌈 ~ file: actions.ts:66 ~ add fav ~ user:", user)
    return user;
}
export async function removeFromFavorites(programId: string): Promise<any> {
    const session = await getServerSession({ ...authOptions });
    if (!session) {
        return null;
    }
    const currentUser = session.user;
    if (!currentUser.isActive) {
        return "inactive user";
    }
    let user: { favorites: any; id?: string; email?: string; password?: string; emailVerified?: Date; image?: string; firstName?: string; isActive?: boolean; lastName?: string; role?: $Enums.Role; sex?: string; friendList?: string[]; createdAt?: Date; };
    try {
        user = await prisma.user.findUnique({
            where: {
                id: currentUser.id
            }
        });

        const isFavorite = user.favorites.includes(programId);
        if (isFavorite) {
            user = await prisma.user.update({
                where: {
                    id: currentUser.id
                },
                data: {
                    favorites: {
                        set: user.favorites.filter((fav: string) => fav !== programId)
                    }
                }
            });
        }
    } catch (e) {
        // console.log("🚀 ~ file: actions.ts:66 ~ AddComment ~ user:", e)
    }

    // console.log("🚀 ~ file: actions.ts:66 ~ remove fav ~ user:", user)
    return user;
}

//function to get all favorites of a user
export async function getFavorites(): Promise<any> {
    const session = await getServerSession({ ...authOptions });
    if (!session) {
        return null;
    }
    const currentUser = session.user;
    if (!currentUser.isActive) {
        return "inactive user";
    }
    let user: { favorites: string[]; };
    try {
        user = await prisma.user.findUnique({
            where: {
                id: currentUser.id
            },
            select: {
                favorites: true
            }
        });
    } catch (e) {
        // console.log("🚀 ~ file: actions.ts:66 ~ AddComment ~ user:", e)
    }
    //return list of favorites
    return user?.favorites ?? [];
}


module.exports = {
    checkPostOwnership,
    addToFavorites,
    removeFromFavorites,
    getFavorites

}