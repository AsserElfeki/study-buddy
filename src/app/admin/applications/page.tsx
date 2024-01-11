"use client";

import { Autocomplete, Button, Card, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Role } from '@prisma/client';
import ApplicationListCard from '@src/components/adminComponents/applicationListCard';
import ApplicationListHeader from '@src/components/adminComponents/applicationListHeader';
import PaginationContainer from '@src/components/paginationContainer';
import { getAllApplications, getAllUsers } from '@src/utils/_adminFunctions';
import { useSession } from 'next-auth/react';
import { use, useEffect, useState } from 'react';

export default function Applications() {
    const { data: session } = useSession();

    const [selectedUser, setSelectedUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [allApplications, setAllApplications] = useState([]);

    const [sortOption, setSortOption] = useState('');
    const [sortedApplications, setSortedApplications] = useState([]);

    const handleSortChange = (event) => {
        const newSortOption = event.target.value;

        setSortOption(event.target.value);
        const _sortedApplications = [...sortedApplications].sort((a, b) => {
            switch (newSortOption) {
                case 'user name':
                    return a.user.lastName.localeCompare(b.user.lastName);
                case 'status':
                    console.log(a.status, b.status)
                    return a.status.localeCompare(b.status);
                case 'created at':
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                case 'updated at':
                    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
                default:
                    return 0;
            }
        });
        setSortedApplications(_sortedApplications);
    };

    const handleFilterChange = (event, newValue) => {
        const firstName = newValue?.firstName;
        const lastName = newValue?.lastName;
        const _sortedApplications = [...allApplications].filter(app => app.user.firstName === firstName && app.user.lastName === lastName);
        setSortedApplications(_sortedApplications);
    }

    const filteredApplications = selectedUser
        ? allApplications.filter(app => app.userId === selectedUser.id)
        : allApplications;

    useEffect(() => {
        //update allApplications, then filter and sort them according to currenr filter and sort option, then update the sortedApplications

    }, [])

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getAllUsers();
            setAllUsers(users.data);
            console.log("USERSSS: ", users.data)
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchApplications = async () => {
            const applications = await getAllApplications();
            setAllApplications(applications.data);
            setSortedApplications(applications.data);
        };
        fetchApplications();
    }, []);

    const handleUserChange = (event, newValue) => {
        setSelectedUser(newValue);
    };
    const handleResetFilters = () => {
        setSortedApplications(allApplications); // Reset filtered applications to all applications
        setSortOption(''); // Reset sort option to an empty string or your default sort option
    };


    return (
        <>
            {session?.user?.role === Role.ADMIN ?
                (
                    <div className='flex flex-col gap-4 '>
                        <div className='flex mt-4 w-full gap-4 justify-center'>
                            <Autocomplete
                                className='w-1/5'
                                options={allUsers.sort((a, b) => a.firstName.localeCompare(b.firstName))}
                                getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
                                onChange={handleFilterChange}
                                renderInput={(params) => <TextField {...params} label="Filter by user" />}

                            />
                            <FormControl className='w-1/5'>
                                <InputLabel id="sort-label">Sort by</InputLabel>
                                <Select
                                    labelId="sort-label"
                                    value={sortOption}
                                    onChange={handleSortChange}
                                >
                                    <MenuItem value={'user name'}>User Name</MenuItem>
                                    <MenuItem value={'status'}>Status</MenuItem>
                                    <MenuItem value={'created at'}>Created at</MenuItem>
                                    <MenuItem value={'updated at'}>Updated at</MenuItem>

                                </Select>
                            </FormControl>
                            <Button onClick={handleResetFilters}>Reset Filters</Button>

                        </div>
                        <ApplicationListHeader />
                        <PaginationContainer totalItems={filteredApplications.length} itemsPerPage={10} >
                            {sortedApplications.map((app) => (
                                <ApplicationListCard key={app.id} application={app} />
                            ))}
                        </PaginationContainer>
                    </div>
                ) : (
                    <div className='mt-8 font-black text-3xl text-red-500'>
                        Unauthorized
                    </div>
                )
            }

        </>


    )
}
