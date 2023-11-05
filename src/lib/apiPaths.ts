const mainPath = process.env.NEXT_API_URL || process.env.NEXT_PUBLIC_API_URL;

export const disciplinePath = `${mainPath}disciplines`;
export const studyProgramPath = `${mainPath}study-programs`;
export const universityPath = `${mainPath}universities`;