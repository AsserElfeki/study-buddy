"use client"

import { Card, CardContent, Avatar, Typography, Button, Link, Chip } from '@mui/material';
import { green, red } from '@mui/material/colors';
function UserCard({user}) {
        return (
        <Card sx={{ display: 'flex', alignItems: 'between', mb: 2 }}>
            <Link href={user.profileLink} sx={{ m: 2 }}>
                <Avatar
                    alt={user.name}
                    src={user.image}
                    sx={{ width: 56, height: 56 }}
                />
            </Link>
            <CardContent sx={{ flex: '1 0 auto', display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ mr: 2 }}>
                    {user.name}
                </Typography>
                <Typography variant="body1" sx={{ mr: 2, color: 'text.secondary' }}>
                    {user.role}
                </Typography>
                <Chip
                    label={user.isActive ? 'Active' : 'Inactive'}
                    color={user.isActive ? 'success' : 'default'}
                    sx={{ bgcolor: user.isActive ? green[100] : red[100], mr: 2 }}
                />
                <Typography variant="body1" sx={{ mr: 2 }}>
                    {user.email}
                </Typography>
                <Link href={user.applicationsLink} sx={{ mr: 2 }}>
                    Applications
                </Link>
                <Link href={user.postsLink} sx={{ mr: 2 }}>
                    Posts
                </Link>
                <Button variant="outlined" color="error" onClick={() => {/* ban user logic */ }}>
                    Ban User
                </Button>
            </CardContent>
        </Card>
    );
}

export default UserCard