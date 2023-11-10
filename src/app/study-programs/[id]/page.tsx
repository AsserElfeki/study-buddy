import { StudyProgram } from '@prisma/client';
import { getProgram } from '@src/lib/searchFilters';

export default async function StudyProgramPage({ params }: { params: { id: string } | null }) {

    const programInPage : StudyProgram = await getProgram(params.id);
    console.log("💥 ~ file: page.tsx:6 ~ StudyProgramPage ~ program:", programInPage)
    
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      
      <div className="text-xl font-medium text-black flex flex-col gap-4">
        <h1>{ programInPage.name }</h1>
        <span>duration: {programInPage.duration}</span>
        <span>tuition: {programInPage.tuitionFee}</span>
        <span>per {programInPage.paymentCycle}</span>
        <span>Language: {programInPage.studyProgramLanguage}</span>
        <span>available study formats: {programInPage.format.toString()}</span>
        <span>attendance: {programInPage.attendance}</span>
        <span>degree: {programInPage.degreeType}</span>
        <span>start date: {programInPage.startDate}</span>
        <span>apply before: {programInPage.applyDate}</span>
        <article>desc: {programInPage.description}</article>
        <h2>TOEFEL score: {programInPage.TOEFLScore}</h2>
        <h2>IELTS score: {programInPage.IELTSScore}</h2>
      </div>
          {/* <p className="text-gray-500">{program.description}</p> */}
    </div>
  )
}

