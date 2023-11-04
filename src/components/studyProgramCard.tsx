import Link from 'next/link';
import React from 'react';

type StudyProgramCardProps = {
    title: string;
    description: string;
    university: {
        name: string;
        id: string;
        location: string;
    };
    tuition: number;
    tuitionCycle: string;
    duration: number;
};

const StudyProgramCard: React.FC<StudyProgramCardProps> = ({
    title,
    description,
    university,
    tuition,
    tuitionCycle,
    duration,
}) => {

    const universityPath = `/university/`;

    return (
        <div className='flex flex-col justify-between'>
            <div >
                <h3>{title}</h3>
                <p>{description}</p>
                <Link
                    href={{
                        pathname: `${universityPath}`,
                    }}
                >{university.name}
                </Link>
            </div>
            <div>

            </div>

        </div>
    );
};

export default StudyProgramCard;
