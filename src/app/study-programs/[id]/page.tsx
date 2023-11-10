import { StudyProgram } from '@prisma/client';
import { getProgram } from '@src/lib/searchFilters';
import EuroIcon from '@mui/icons-material/Euro';
import { Button } from '@mui/material'; // Only import what is necessary
import HeaderBanner from '@src/components/study-programHeader';

export default async function ProgramCard({ params }: { params: { id: string } | null }) {

  const program: StudyProgram = await getProgram(params.id);
  const title = `${program.degreeType.toLocaleUpperCase()} of ${program.name}`;

  return (
    <div className='flex flex-col justify-center bg-transparent'>
    <HeaderBanner />
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">{title}</h2>

      <div className="grid grid-cols-2 gap-6 mb-8 max-w-xl mx-auto mt-16 font-bold">
        <span className="text-left font-medium">Duration</span>
        <span className="text-right">{program.duration} years</span>

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

      <p className="mb-5">
        This program provides a comprehensive foundation in computer science, along with the opportunity to pursue focused areas of study as you progress. Topics covered include software development, algorithms, computer architecture, databases, and much more. Graduates will be well-equipped to pursue a wide range of career opportunities in both industry and academia.
      </p>

      <Button variant="contained" color="primary" className="mt-4">
        Apply Now
      </Button>
      </div>
    </div>
  );
};



