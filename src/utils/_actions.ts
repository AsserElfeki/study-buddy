"use server";

import { authOptions } from '@lib/auth';
import prisma from '@src/lib/prisma';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { getSignature, validateSignature } from './_cloudinary';
import { $Enums, $Enums, highestQualification } from '@prisma/client';


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
    console.log("🚀 ~ file: actions.ts:66 ~ AddComment ~ user:", user)
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
export async function AddPost(formData: FormData) {
    const content = formData.get('content');
    const title = formData.get('title');
    // console.log("🚀 ~ file: actions.ts:60 ~ AddComment ~ content:", content)
    const session = await getServerSession({ ...authOptions });
    if (!session) {
        return null;
    }
    const user = session.user;
    console.log("🚀 ~ file: actions.ts:66 ~ AddComment ~ user:", user)
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
    revalidatePath('./forum')
    return post;
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
        return null;
    }
    const user = session.user;
    if (!user.isActive) {
        return "inactive user";
    }
    const post = await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            likes: {
                increment: 1
            }
        }
    });
    console.log("🚀 ~ file: actions.ts:108 ~ likePost ~ post:", post)

    revalidatePath('./forum')
    // return comment;

}


type PersonalInfoFormType = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    nationality: string;
    nativeLanguage: string;
    englishProficiency: string;
};

type EducationalBackgroundFormType = {
    highestQualification: string;
    institutionName: string;
    graduationYear: string;
};

type FilesType = {
    documents: any[];
    numFiles: number;
};

/**
 * Starts the application process for a study program.
 *
 * @param {string} studyProgramId - The ID of the study program.
 * @param {PersonalInfoFormType} PersonalInfoForm - The personal information form.
 * @param {EducationalBackgroundFormType} EducationalBackgroundForm - The educational background form.
 * @param {FilesType} files - The files to be uploaded.
 * @return {Promise<void>} A Promise that resolves once the application is started.
 */
export async function startApplication(
    studyProgramId: string,
    PersonalInfoForm: PersonalInfoFormType,
    EducationalBackgroundForm: EducationalBackgroundFormType,
    files: FilesType)  {
    const session = await getServerSession({ ...authOptions });
    if (!session) {
        return null;
    }
    const user = session.user;
    if (!user.isActive) {
        return "inactive user";
    }
    const application = await prisma.application.create({
        data: {
            userId: session.user.id,
            studyProgramId: studyProgramId,
        }
    });
    // createPersonalInfo(PersonalInfoForm, application.id);
    createEducationalBackground(EducationalBackgroundForm, application.id);
    // uploadDocs(files, application.id);
    // return application;
}

export async function createPersonalInfo(form: { nationality: { label: any; }; languageProficiency: any; englishProficiency: { label: any; }; nativeLanguage: { label: any; }; dateOfBirth: string | number | Date; }, id: any) {
    form.nationality = form.nationality.label;
    form.languageProficiency = form.englishProficiency.label;
    form.nativeLanguage = form.nativeLanguage.label;
    //convert date of birth to iso-8601
    form.dateOfBirth = new Date(form.dateOfBirth).toISOString();
    // delete nativeLanguage from form
    delete form.englishProficiency
    try {
        const info = await prisma.personalInfo.create({
            data: {
                ...form,
                application: {
                    connect: {
                        id: id
                    }
                }
            }
        })
        console.log(info);
    }
    catch (error) {
        console.log("🚀 ~ file: actions.ts:140 ~ createPersonalInfo ~ error", error)
    }
}


/**
 * Creates an educational background record for a given form and application ID.
 *
 * @param {Object} form - The form object containing the educational background data.
 * @param {string} id - The ID of the application.
 * @return {Promise<void>} A promise that resolves when the educational background record is created.
 */
export async function createEducationalBackground(form: { highestQualification: any; institutionName?: string; graduationYear: any; }, id: string) {
    form.highestQualification = form.highestQualification.label
    //get year from label and make it Int
    form.graduationYear = parseInt(form.graduationYear.label);
    // match highest qualification to enum from prisma
    switch (form.highestQualification) {
        case "High School":
            form.highestQualification = highestQualification.HighSchool;
            break;
        case "Bachelor":
            form.highestQualification = highestQualification.Bachelor;
            break;
        case "Master":
            form.highestQualification = highestQualification.Master;
            break;
        case "PhD":
            form.highestQualification = highestQualification.PhD;
            break;
        default:
            break;
    }

    try {
        const info = await prisma.educationalBackground.create({
            data: {
                ...form,
                application: {
                    connect: {
                        id: id
                    }
                }
            }
        })
    }
    catch (error) {
        console.log("🚀 ~ file: actions.ts:140 ~ createPersonalInfo ~ error", error)
    }
}

/**
 * Uploads multiple documents to the server.
 *
 * @param {Array} documents - An array of string or Blob objects representing the documents to be uploaded.
 * @param {any} applicationId - The ID of the application the documents belong to.
 * @return {Promise<void>} A Promise that resolves with no value upon successful upload.
 */
export async function uploadDocs(documents: (string | Blob)[], applicationId: any) {
    for (const doc of documents) {
        if (!doc)
            //skip if the document is not selected
            continue;

        let url: any;
        const { timestamp, signature } = await getSignature('supporting-documents');
        const formData = new FormData();
        formData.append('file', documents[0]);
        formData.append('resource_type', 'auto')
        formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
        formData.append('signature', signature);
        formData.append('timestamp', timestamp.toString());
        formData.append('folder', 'supporting-documents');

        const endPoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL;
        let res: { error: { message: any; }; secure_url: any; version: any; public_id: any; signature: any; };
        try {
            res = await fetch(endPoint, {

                method: 'POST',
                body: formData,
            }).then(res => res.json());

            if (res.error) {
                console.error("Upload error: ", res.error.message);
            } else {
                console.log("Upload successful: ", res);
                url = res.secure_url;
                // Handle successful upload, e.g., save URL to database
            }
        } catch (error) {
            console.error("Fetch error: ", error);
        }
        //save the url to the database
        const safe = await validateSignature({
            version: res?.version,
            public_id: res?.public_id,
            signature: res?.signature,
        });
        if (safe) {
            const url = await prisma.document.create({
                data: {
                    link: res?.secure_url,
                    application: {
                        connect: {
                            id: applicationId
                        }
                    }
                }
            })
        } else {
            return {
                error: "Invalid signature"
            }
        }
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
        console.log("🚀 ~ file: actions.ts:66 ~ AddComment ~ user:", e)
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
        console.log("🚀 ~ file: actions.ts:66 ~ AddComment ~ user:", e)
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
        console.log("🚀 ~ file: actions.ts:66 ~ AddComment ~ user:", e)
    }
    //return list of favorites
    return user?.favorites ?? [];
    }
    

