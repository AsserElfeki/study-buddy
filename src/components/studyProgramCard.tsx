import { FavoriteBorder } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import FavoriteButton from './favoriteButton';

type StudyProgramCardProps = {
    id: string;
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

function StudyProgramCard(props: StudyProgramCardProps) {
    let { id, title, description, university, tuition, tuitionCycle, duration } = props;


    description = description.charAt(0).toUpperCase() + description.slice(1);
    title = title.charAt(0).toUpperCase() + title.slice(1);
    university.name = university.name.charAt(0).toUpperCase() + university.name.slice(1);

    return (
        <article className="border bg-white p-4 rounded-lg shadow-md  w-full relative">
            <FavoriteButton id={id}  />
            <header className="mb-4">
                <Link
                    href = {`/study-programs/${id}`}
                    className="text-primary hover:underline hover:bg-slate-100 hover:shadow-sm rounded-lg"
                >
                    <h2 className="text-3xl font-bold mb-2">{title}</h2>
                </Link>
                <Link
                    href = {`/university/${university.id}`}
                    className="text-secondary hover:underline hover:bg-slate-100 hover:shadow-sm rounded-lg">#{university.name}</Link>
            </header>
            <section className="mb-4">
                <p className=" text-gray-800">{description}</p>
            </section>
            <footer>
                <div className="mb-2">
                    <strong className="text-gray-900">Tuition Fee:</strong>
                    <span className="text-gray-700 ml-2">{tuition} EUR /</span>
                    <span className=" text-sm text-gray-500 ml-1">{tuitionCycle}</span>
                </div>
                <div className="">
                    <strong className="text-gray-900">Duration:</strong>
                    <span className="text-gray-700 ml-2">{duration} Years</span>
                </div>
            </footer>
        </article>
    );
};

export default StudyProgramCard;
