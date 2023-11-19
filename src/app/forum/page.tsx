import PostCardComponent from '@components/postCard';
import { getAllPosts } from '@src/utils/actions';
import AddPostComponent from '@src/components/addPostComponent';
import PaginationContainer from '@src/components/paginationContainer';


//here fetching data from the database and passing it to the postcard component

export default async function ForumPage() {

    const posts = await getAllPosts();

    return (
        <div className='flex flex-col gap-6 w-full max-w-3xl'>
            <AddPostComponent />
            <PaginationContainer  totalItems={posts.length} itemsPerPage={10} >
                {Array.isArray(posts) ? posts.map((post) => (
                    <PostCardComponent key={post.id} post={post} />
                )) : <p>loading...</p>}

            </PaginationContainer>
        </div>
    )
}
