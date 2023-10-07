

export interface Program {
    studyProgram: {
        name: string;
        description: string;
        tuition_fee: string;
        duration: string;
        studyProgramLink: string;
        degreeType: string;
        format: string;
        attendance: string;
        applyDate: string;
        startDate: string;
        studyProgramLanguage: string;
        languageRequirments: {
            ieltsScore: string;
            toeflScore: string;
        };
    };
    university: {
        universityName: string;
        location: string;
        studyProgramLink: string;
    };
    discipline: {
        programDisciplines: string[];
    };
}
