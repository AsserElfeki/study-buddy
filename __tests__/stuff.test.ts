import { Request } from 'express';
import { NextResponse } from 'next/server';
import { prisma } from '@lib/prisma'; // assuming this is the file where prisma is imported
import { comparePassword } from '@src/lib/hashPasswords';
import { POST } from '@src/app/api/auth/[...nextauth]/route';

describe('POST', () => {
    const req: Request = {
        json: async () => ({ email: 'test@example.com', password: 'testpassword' }),
    } as Request;

    it('should return success response if user exists and password matches', async () => {
        const user = {
            email: 'test@example.com',
            password: await comparePassword('testpassword', 'hashedpassword'),
        };
        jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(user);

        const response = await POST(req);

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.body).toEqual(
            JSON.stringify({ status: 'success', message: 'Welcome back', data: user })
        );
        expect(response.headers.status).toEqual(201);
    });

    it('should return fail response if user does not exist or password does not match', async () => {
        jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
        jest.spyOn(comparePassword, 'comparePassword').mockResolvedValue(false);

        const response = await POST(req);

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.body).toEqual(
            JSON.stringify({ status: 'fail', message: 'You are not logged in', data: null })
        );
        expect(response.headers.status).toEqual(401);
    });
});