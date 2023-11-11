import React from 'react';
import { Card, CardContent, Button } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EuroIcon from '@mui/icons-material/Euro';
import EventIcon from '@mui/icons-material/Event';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

type BannerProps = {
    duration: string;
    paymentCycle: string;
    tuitionFee: number;
    applyDate: string;
    startDate: string;
}

const HeaderBanner = ({ duration, paymentCycle, tuitionFee, applyDate, startDate }: BannerProps) => {
    
    return (
        <div className="bg-white p-4 mb-4 shadow-sm rounded-lg">
            
            <div className=" flex flex-row justify-center items-center content-center mx-auto ">
                <section className='flex flex-col md:flex-row justify-evenly items-center gap-6 flex-grow self-start '>
                    <div className="flex items-center space-x-2">
                        <AccessTimeIcon fontSize='large' />
                        <article>
                            <div className="text-lg">Duration</div>
                            <div className="text-xl font-black">{duration} </div>
                        </article>
                    </div>

                    <div className="flex items-center space-x-2">
                        <EuroIcon fontSize='large' />
                        <article>
                            <p className="text-lg">
                                Tuition Fee</p>
                            <p className="text-xl font-black">{tuitionFee} EUR/{paymentCycle}</p>
                        </article>
                    </div>
                </section>

                <section className='flex flex-col md:flex-row justify-evenly items-center gap-6 flex-grow self-end '>
                    <div className="flex items-center space-x-2">
                        <ArticleOutlinedIcon fontSize='large' />
                        <article className='flex flex-col'>
                            <p className="text-lg ">
                                Apply Date</p>
                            <p className="text-xl font-black">{applyDate}</p>
                        </article>
                    </div>

                    <div className="flex items-center space-x-2">
                        <EventIcon fontSize='large'/>
                        <article className='flex flex-col'>
                            <p className="text-lg">Start Date</p>
                            <p className="text-xl font-black">{startDate}</p>
                        </article>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HeaderBanner;
