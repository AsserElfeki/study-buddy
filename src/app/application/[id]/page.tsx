import { Application, StudyProgram } from '@prisma/client'; // Assuming similar types for application
import { getProgram, getUniversity } from '@src/lib/searchFilters'; // Mock functions to fetch data
import Divider from '@mui/material/Divider';
import CustomButton from '@src/components/customButton';
import { getApplication } from '@src/lib/_profile';
import HorizontalLinearAlternativeLabelStepper from '@src/components/stepper';
import ReviewDocuments from '@src/components/apply/review';
import ProfileReviewDocuments from '@src/components/profile/profileDocView';


export default async function ApplicationDetails({ params }: { params: { id: string } | null }) {
    const applicationResponse = await getApplication(params.id);
    const application = applicationResponse.data;
    const program: StudyProgram = await getProgram(application.studyProgramId); // Assuming this fetches the related program details
    const university = await getUniversity(program.universityId); // Fetch related university

    const {personalInfo, educationalBackground} = application;

    console.log("application: ", application)
    // Additional logic to process application details

    return (
        <div className='flex flex-col justify-center bg-transparent w-full bg-gradient-to-br from-red-100 to-blue-300 rounded-xl'>
            {/* Use the HeaderBanner for visual consistency, adjust props as needed */}
            {/* <HeaderBanner duration={program.duration + ' years'} paymentCycle={program.paymentCycle} tuitionFee={program.tuitionFee} applyDate={program.applyDate} startDate={program.startDate} /> */}

            <div className="mx-auto p-6  rounded-lg shadow-md w-full flex flex-col items-center justify-center bg-transparent">
                {/* Include more application-specific details here */}
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center capitalize">Application for {program.degreeType} of {program.name}</h2>

                <Divider className='mt-2 mb-6'>Application Information</Divider>
                {/* Display application and program details */}
                <div className="grid grid-cols-2 gap-8 mb-8 w-4/5  mx-auto font-bold ">
                    {/* Include key information such as application status, date of application, etc. */}
                    {/* Add more details as needed */}
                    <div className='flex flex-col items-center'>
                        <h3 className="text-lg md:text-xl font-bold mb-2">Study Program</h3>
                        <p className="text-gray-700 capitalize">{program.name}</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <h3 className="text-lg md:text-xl font-bold mb-2">University</h3>
                        <p className="text-gray-700 capitalize">{university.name}</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <h3 className="text-lg md:text-xl font-bold mb-2">Application Status</h3>
                        <p className="text-gray-700">{application.status}</p>
                    </div>

                    <div className='flex flex-col items-center'>
                        <h3 className="text-lg md:text-xl font-bold mb-2">User Consent</h3>
                        <p className="text-gray-700">{application.userConsent ? "Consented" : "Awaiting consent"}</p>
                    </div>

                    {/* a div that spans the whole width */}

                    <div className='flex flex-col items-center'>
                        <h3 className="text-lg md:text-xl font-bold mb-2">Date of Application</h3>
                        <p className="text-gray-700">{new Date(application.createdAt).toLocaleString()}</p>
                    </div>


                    <div className='flex flex-col items-center'>
                        <h3 className="text-lg md:text-xl font-bold mb-2">Last Updated</h3>
                        <p className="text-gray-700">{new Date(application.updatedAt).toLocaleString()}</p>
                    </div>

                    <div className='w-full col-span-full my-6'>
                        <HorizontalLinearAlternativeLabelStepper status={application.status} docsUploaded={application.documents.length == 0 ? false : true} />
                    </div>


                </div>

                <div className='w-full '>
                    <ProfileReviewDocuments files={application.documents} />
                </div>

                <Divider className='mt-2 mb-6'>Personal Information</Divider>

                <div className="grid grid-cols-2 gap-2 mb-8 mx-auto font-bold w-5/12 ">
                    <span className="text-left font-lg">Official First Name(s):</span>
                    <span className="text-right">{application.personalInfo.firstName}</span>

                    <span className="text-left font-lg">Official Last Name:</span>
                    <span className="text-right">{personalInfo.lastName}</span>

                    <span className="text-left font-lg">Email:</span>
                    <span className="text-right flex justify-end items-center">{personalInfo.email}</span>

                    <span className="text-left font-lg">Phone Number:</span>
                    <span className="text-right">{personalInfo.phoneNumber}</span>

                    <span className="text-left font-lg">Nationality</span>
                    <span className="text-right">{personalInfo.nationality}</span>

                    <span className="text-left font-lg">Date of Birth:</span>
                    <span className="text-right">{personalInfo.dateOfBirth.toISOString().slice(0, 10)}</span>

                    <span className="text-left font-lg">Native Language:</span>
                    <span className="text-right">{personalInfo.nativeLanguage}</span>

                    <span className="text-left font-lg">English Proficiency:</span>
                    <span className="text-right">{personalInfo.languageProficiency}</span>
                </div>


                <Divider className='mt-2 mb-6'>Educational Background</Divider>
                <div className="grid grid-cols-2 gap-2 mb-8  mx-auto font-bold w-5/12 ">
                    <span className="text-left font-lg">Highest Qualification:</span>
                    <span className="text-right">{educationalBackground.highestQualification}</span>

                    <span className="text-left font-lg">Institution Name:</span>
                    <span className="text-right">{educationalBackground.institutionName}</span>

                    <span className="text-left font-lg">Graduation Year:</span>
                    <span className="text-right">{educationalBackground.graduationYear}</span>
                </div>
                <div className='flex flex-row justify-between gap-12'>
                    <CustomButton text="View Program Details" link={`/study-programs/${program.id}`} />
                    <CustomButton text="Edit Application" link={`/apply/${application.studyProgramId}`} />
                </div>
            </div>

          
        </div>
    );
};
