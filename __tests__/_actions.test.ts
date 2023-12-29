import { AddComment, getAllPosts } from '../src/utils/_actions';

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

describe('AddComment', () => {
    it('should add a comment to a post', async () => {
        // Arrange
        const formData = new FormData();
        formData.append('comment', 'This is a test comment');
        const postId = '123';

        // Act
        const result = await AddComment(formData, postId);

        // Assert
        expect(result.success).toBe(true);
        expect(result.data.content).toBe('This is a test comment');
        expect(result.data.postId).toBe(postId);
    });

    it('should return an error if not logged in', async () => {
        // Arrange
        const formData = new FormData();
        formData.append('comment', 'This is a test comment');
        const postId = '123';

        // Act
        const result = await AddComment(formData, postId);

        // Assert
        expect(result.success).toBe(false);
        expect(result.error).toBe('not logged in');
    });

    it('should return an error for inactive user', async () => {
        // Arrange
        const formData = new FormData();
        formData.append('comment', 'This is a test comment');
        const postId = '123';

        // Act
        const result = await AddComment(formData, postId);

        // Assert
        expect(result.success).toBe(false);
        expect(result.error).toBe('inactive user');
    });
});