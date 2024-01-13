"use client";

import { Autocomplete, Button, Card, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Role } from '@prisma/client';
import ApplicationListCard from '@src/components/adminComponents/applicationListCard';
import ApplicationListHeader from '@src/components/adminComponents/applicationListHeader';
import PaginationContainer from '@src/components/paginationContainer';
import { getAllApplications, getAllUsers } from '@src/utils/_adminFunctions';
import { all } from 'axios';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Applications() {
    const { data: session } = useSession();
    const searchParams = useSearchParams();

    const [isLoading, setLoading] = useState(true);

    const [selectedUser, setSelectedUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [allApplications, setAllApplications] = useState([]);

    const [sortOption, setSortOption] = useState('');
    const [sortedApplications, setSortedApplications] = useState([]);

    const handleSortChange = (event?) => {
        setLoading(true)
        setSelectedUser("")
        console.log("🚀 ~ handleSortChange ~ sortOption:", sortOption)
        let newSortOption = event?.target?.value ? event.target.value : sortOption;
        console.log("😨 ~ handleSortChange ~ newSortOption:", newSortOption)
        if (event?.target?.value) {
            setSortOption(event.target.value);
        }
        const _sortedApplications = [...allApplications].sort((a, b) => {
            switch (newSortOption) {
                case 'user name':
                    return a.user.lastName.localeCompare(b.user.lastName);
                case 'status':
                    // console.log(a.status, b.status)
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
        setLoading(false)
    };

    const handleFilterChange = (event, newValue) => {
        setLoading(true)
        if (searchParams.has("userId")) {
            const params = new URLSearchParams(searchParams);
            params.set('userId', newValue.id);
            router.push(`${pathname}?${params.toString()}`);
        }
        setSelectedUser(newValue)
        const id = newValue?.id;
        // console.log("🚀 ~ handleFilterChange ~ id:", id)
        const _sortedApplications = [...allApplications].filter(app => app.user.id === id);
        setSortedApplications(_sortedApplications);
        setLoading(false)
        // console.log(sortedApplications)
    }

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getAllUsers();
            setAllUsers(users.data);
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        setLoading(true)
        const userId = searchParams.get('userId');
        // console.log("🚀 ~ useEffect ~ userId:", userId)
        if (userId) {
            console.log("all users in params:", allUsers)
            setSelectedUser(allUsers.find(user => user.id === userId));
            console.log("user from params:", selectedUser)
            console.log("all apps:", allApplications)
            const _sortedApplications = [...allApplications].filter(app => app.userId === userId);
            console.log("🚀 ~ useEffect ~ _sortedApplications:", _sortedApplications)
            setSortedApplications(_sortedApplications);
        }
        setLoading(false)
    }, [allApplications, allUsers, searchParams, selectedUser]);

    //logger
    useEffect(() => {
        console.log("selectedUser changed", selectedUser)
    }, [selectedUser])

    const filteredApplications = selectedUser
        ? allApplications.filter(app => app.userId === selectedUser.id)
        : allApplications;

    //fetch apps
    useEffect(() => {
        setLoading(true)
        const fetchApplications = async () => {
            const applications = await getAllApplications();
            setAllApplications(applications.data);
            setSortedApplications(applications.data);
        };
        fetchApplications();
        setLoading(false)
    }, [searchParams]);

    //callBack
    const handleUpdateStatus = async () => {
        const applications = await getAllApplications();
        setAllApplications(applications.data);
        // setSortedApplications(applications.data);
        // handleSortChange();
    }
    const pathname = usePathname();
    const router = useRouter();

    const handleResetFilters = () => {
        setSortedApplications(allApplications); // Reset filtered applications to all applications
        setSortOption(''); // Reset sort option to an empty string or your default sort option
        const params = new URLSearchParams(searchParams);
        params.delete("userId");
        router.push(`${pathname}?${params.toString()}`);

    };

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </div>
        )
    }

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
                            // value={selectedUser.firstName + ' ' + selectedUser.lastName}
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
                                <ApplicationListCard key={app.id} application={app} callBack={handleUpdateStatus} />
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
