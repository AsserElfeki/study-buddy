import { StudyProgram } from '@prisma/client';
import { getProgram } from '@src/lib/searchFilters';
import EuroIcon from '@mui/icons-material/Euro';
import { Button } from '@mui/material'; // Only import what is necessary
import HeaderBanner from '@src/components/study-programHeader';
import Divider from '@mui/material/Divider';


function capitalizeSentences(str) {
  return str.split('. ').map(sentence => sentence.charAt(0).toUpperCase() + sentence.slice(1)).join('. ');
}

export default async function ProgramCard({ params }: { params: { id: string } | null }) {

  const program: StudyProgram = await getProgram(params.id);
  const title = `${program.degreeType.toUpperCase()} of ${program.name.charAt(0).toUpperCase() + program.name.slice(1)}`;
  const duration = program.duration;
  let durationText;
  if (duration > 1)
    durationText = `${duration} years`;
  else
    durationText = `${duration * 10} months`;
  return (
    <div className='flex flex-col justify-center bg-transparent w-full'>
      <HeaderBanner duration={durationText} paymentCycle={program.paymentCycle} tuitionFee={program.tuitionFee} applyDate={program.applyDate} startDate={program.startDate} />

      <div className="mx-auto p-6 bg-white rounded-lg shadow-md w-full flex flex-col ">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{title}</h2>

        <Divider className='mt-2 mb-6'>Key Information</Divider>
        <div className="grid grid-cols-2 gap-6 mb-8 w-3/5 mx-auto font-bold ">
          <span className="text-left font-medium">Duration</span>
          <span className="text-right">{durationText}</span>

          <span className="text-left font-medium">Language of Study</span>
          <span className="text-right">{program.studyProgramLanguage}</span>

          <span className="text-left font-medium">Tuition Fee</span>
          <span className="text-right flex justify-end items-center">
            <EuroIcon fontSize='small' />
            {program.tuitionFee} / {program.paymentCycle}
          </span>

          <span className="text-left font-medium">Degree</span>
          <span className="text-right">{program.degreeType}</span>
        </div>

        <Divider className='mt-2 mb-6'>Language Requirements</Divider>
        <div className="grid grid-cols-2 gap-6 mb-8 w-3/5 mx-auto font-bold ">
          <span className="text-left font-medium">IELTS score</span>
          <span className="text-right">{program.IELTSScore ? program.IELTSScore : "Not specified"}</span>

          <span className="text-left font-medium">TOEFL score</span>
          <span className="text-right">{program.TOEFLScore ? program.TOEFLScore : "Not specified"}</span>
        </div>

        <Divider className='mt-2 mb-6'>additional Info</Divider>
        <div className="grid grid-cols-2 gap-6 mb-8 w-3/5 mx-auto font-bold ">
          <span className="text-left font-medium">Attendance</span>
          <span className="text-right">{program.attendance}</span>

          <span className="text-left font-medium">Format</span>
          <span className="text-right">{program.format}</span>

        </div>

        <Divider className='mt-2 mb-6'>Description</Divider>
        <div className="flex gap-6 mb-8  w-3/5 mx-auto font-bold ">
          <p className="mb-5 block">
            {capitalizeSentences(program.description)}
          </p>
        </div>
        <Button
          variant="outlined"
          className="mt-4 text-center max-w-fit self-center"
          href={`/apply/${program.id}`}
        >
          Apply Now
        </Button>
      </div>
    </div>
  );
};



