function UniversityCard({ university }) {
  return (
    <>
      <header className='flex flex-col gap-2 items-center bg-gradient-to-tr rounded-xl'>
        <h1 className='text-4xl font-bold text-center '>{university.name}</h1> 
        <span className='text-xl font-bold text-center '>{university.location}</span>
        <h2>Total of {university.studyPrograms.length} programs</h2>
      </header>
    </>
  );
}

export default UniversityCard;
