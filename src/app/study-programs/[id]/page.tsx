

import { getProgram } from '@src/lib/searchFilters';
import { get } from 'http'
import React from 'react'

async function StudyProgramPage({ params }: { params: { id: string } | null }) {

    const program = await getProgram(params.id);

  return (
      <div>
          {program}
    </div>
  )
}

export default StudyProgramPage