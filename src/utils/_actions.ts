"use server";


import { authOptions } from '@lib/auth';
import prisma from '@src/lib/prisma';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { getSignature, validateSignature } from './_cloudinary';
import { highestQualification } from '@prisma/client';


export async function getAllPosts(skip?: number, take?: number) {

    const session = await getServerSession({...authOptions});

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


export async function AddComment(formData : FormData, postId: string) {
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
    const post =await prisma.post.update({
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


export async function startApplication(studyProgramId: string, PersonalInfoForm, EducationalBackgroundForm, files ) {
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
    // return application;

    // createPersonalInfo(PersonalInfoForm, application.id);
    createEducationalBackground(EducationalBackgroundForm, application.id);
    // uploadDocs(files, application.id);
}

export async function createPersonalInfo(form, id) {
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

//create educational background
export async function createEducationalBackground(form, id) {
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

export async function uploadDocs(documents, applicationId) {
    for (const doc of documents) {
        if (!doc)
            //skip if the document is not selected
            continue;

        let url;
        const { timestamp, signature } = await getSignature('supporting-documents');
        const formData = new FormData();
        formData.append('file', documents[0]);
        formData.append('resource_type', 'auto')
        formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
        formData.append('signature', signature);
        formData.append('timestamp', timestamp.toString());
        formData.append('folder', 'supporting-documents');

        const endPoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL;
        let res;
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
            console.log("not saved to database");
        }
    }
}



export async function addToFavorites(programId: string) : Promise<any> {
    const session = await getServerSession({ ...authOptions });
    if (!session) {
        return null;
    }
    const user = session.user;
    if (!user.isActive) {
        return "inactive user";
    }
    
    //add the program to the user favorites list, the user model has a field favorites, it's an array

    // Save the updated user object to the database
    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            favorites: programId
        }
    });

    // Return the updated user object
    return user;
    }

    
