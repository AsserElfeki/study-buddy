// import prisma from '../lib/prisma';
// import { checkPostOwnership } from '../utils/_actions';
// const checkPostOwnership = require('/utils/_actions').checkPostOwnership;

import { checkPostOwnership } from '@utils/_actions';

describe('checkPostOwnership', () => {
    it('should return false if there is no active session', async () => {
        const result = await checkPostOwnership('post-id');
        expect(result).toBe(false);
    });
});
    // it('should return false if the post does not exist', async () => {
    //     jest.spyOn(prisma.post, 'findUnique').mockResolvedValueOnce(null);

    //     const result = await checkPostOwnership('post-id');
    //     expect(result).toBe(false);
    // });

    // it('should return false if the user is not the author of the post', async () => {
    //     jest.spyOn(prisma.post, 'findUnique').mockResolvedValueOnce({
    //         id: 'post-id',
    //         title: 'Sample Post Title',
    //         content: 'This is a sample post content.',
    //         createdAt: new Date(),
    //         authorId: 'another-user-id',
    //     });

    //     const result = await checkPostOwnership('post-id');
    //     expect(result).toBe(false);
    // });

    // it('should return true if the user is the author of the post', async () => {
    //     jest.spyOn(prisma.post, 'findUnique').mockResolvedValueOnce({
    //         id: 'post-id',
    //         title: 'Sample Post Title',
    //         content: 'This is a sample post content.',
    //         createdAt: new Date(),
    //         authorId: 'another-user-id',
    //     });

    //     const result = await checkPostOwnership('post-id');
    //     expect(result).toBe(true);
    // });
// });