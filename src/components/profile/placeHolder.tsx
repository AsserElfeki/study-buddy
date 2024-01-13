"use client"
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import CustomButton from '../customButton';

interface PlaceholderProps {
    text: string;
    link: string;
    buttonText: string;
}

function Placeholder({ text, link, buttonText }: PlaceholderProps) {
    const router = useRouter();

    return (
        <Box className="flex flex-col items-center justify-start space-y-4 mt-8">
            <Image
                className=' mt-8'
                src="/images/palceholder.webp" // Replace with your placeholder image
                alt="No applications"
                width={200}
                height={200}
            />
            {text &&<Typography variant="h4" className="text-center">
                {text}
            </Typography>}
            {link && <CustomButton link={link} text={buttonText}/>}
        </Box>
    );
}

export default Placeholder;