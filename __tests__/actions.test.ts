import { getAllPosts } from '../src/utils/_actions';

describe('getAllPosts', () => {
    it('should retrieve all posts from the database', async () => {
        const posts = await getAllPosts();
        expect(posts).toBeDefined();
        expect(Array.isArray(posts)).toBe(true);
    });

    it('should retrieve a specific number of posts when skip and take parameters are provided', async () => {
        const skip = 10;
        const take = 5;
        const posts = await getAllPosts(skip, take);
        expect(posts).toBeDefined();
        expect(Array.isArray(posts)).toBe(true);
        expect(posts.length).toBe(take);
    });

    it('should return null if session is not available', async () => {
        jest.spyOn(global, 'getServerSession').mockReturnValueOnce(null);
        const posts = await getAllPosts();
        expect(posts).toBeNull();
    });

    it('should return "inactive user" if user isActive is false', async () => {
        jest.spyOn(global, 'getServerSession').mockReturnValueOnce({ user: { isActive: false } });
        const posts = await getAllPosts();
        expect(posts).toBe('inactive user');
    });
});


