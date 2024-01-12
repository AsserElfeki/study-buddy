"use client"
import PostCardComponent from '@components/postCard';
import { getAllPosts } from '@src/utils/_actions';
import AddPostComponent from '@src/components/addPostComponent';
import PaginationContainer from '@src/components/paginationContainer';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';


//here fetching data from the database and passing it to the postcard component

export default  function ForumPage() {

    const { data: session } = useSession()
    const searchParams = useSearchParams();
    const [posts, setPosts] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [filteredPosts, setFIlteredPosts] = useState([])
    useEffect(() => {
        const fetchPosts = async () => {
            const posts = await getAllPosts();
            setPosts(posts.data)
        }
        fetchPosts();
    }, [])

    useEffect(() => {
        const userId = searchParams.get("userId");
        const _filteredPosts = posts.filter(post => post.authorId === userId)
        setFIlteredPosts(_filteredPosts);
    }, [posts, searchParams])

    return (
        <div className='flex flex-col gap-6 w-full max-w-3xl'>
            {/* <AddPostComponent /> */}
            <PaginationContainer totalItems={posts.length} itemsPerPage={10} >
                {Array.isArray(filteredPosts) ? filteredPosts.map((post) => (
                    <PostCardComponent key={post.id} post={post} />
                )) : <p>loading...</p>}

            </PaginationContainer>
        </div>
    )
}
