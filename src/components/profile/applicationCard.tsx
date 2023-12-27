import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

const ApplicationCard = ({ application }) => {
    // Destructure the necessary data from application
    const {
        createdAt,
        status,
        userConsent,
        studyProgram: {
            name,
            description,
            startDate,
            degreeType,
            attendance,
            paymentCycle,
            studyProgramLink,
            tuitionFee,
            duration,
            applyDate,
            studyProgramLanguage,
        },
        // personalInfo,
        // educationalBackground
    } = application;

    return (
        <Link href={`./application/${application.id}`} rel="noopener" className=" shadow-lg max-w-md p-2 rounded-xl w-3/12 bg-gradient-to-tr from-red-100 to-blue-300 decoration-transparent hover:decoration-transparent  hover:scale-95" >
            <Card className=" bg-transparent shadow-lg rounded-xl">
                
            <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        <HistoryEduIcon
                            fontSize="large"
                            className='text-gradient-to-tr from-red-100 to-blue-300' />
                    Application Date: {new Date(createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="h5" component="h2" className='capitalize'>
                    {name} - {degreeType}
                </Typography>
                <Typography color="textSecondary">
                    Status: {status} {userConsent ? "(Consented)" : "(Awaiting consent)"}
                </Typography>
            
                <Typography variant="body2" component="p">
                    Start Date: {startDate}
                </Typography>
                <Typography variant="body2" component="p">
                    Attendance: {attendance}
                </Typography>
                
                <Typography variant="body2" component="p">
                    Tuition Fee: ${tuitionFee} per {paymentCycle}
                </Typography>
                <Typography variant="body2" component="p">
                    Duration: {duration} years
                </Typography>
                <Typography variant="body2" component="p">
                    Apply By (deadline): {applyDate}
                </Typography>
                <Typography variant="body2" component="p">
                    Language of Study: {studyProgramLanguage}
                </Typography>
            </CardContent>
            </Card>
        </Link>
    );
};

export default ApplicationCard;
