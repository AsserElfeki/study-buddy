import React, { useEffect } from 'react'
import PaginationContainer from '../paginationContainer'
import PostCardComponent from '../postCard'
import { getMyFavourites } from '@src/lib/_profile';
import StudyProgramCard from '../studyProgramCard';
import Link from 'next/link';
import CustomButton from '../customButton';

function MyFavorites() {

    const [favorites, setFavorites] = React.useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const favsData = await getMyFavourites();
            if (favsData.success) {
                console.log(favsData.data)
                setFavorites(favsData.data);
            }
        }
        fetchData();
    }, []);



    return (

        <PaginationContainer totalItems={10} itemsPerPage={10}  >
            {/* map favs into postcards */}
            {favorites.length > 0 && favorites.map((program) => (
                <div key={program.id} className="border rounded-lg p-4 shadow-lg flex justify-between my-2">
                    <div>
                        <h2 className="text-xl font-bold capitalize">{program.name}</h2>
                        <p className="text-lg capitalize">{program.university.name}</p>

                    </div>
                    <CustomButton link={`/study-programs/${program.id}`} text='Go to Program' />

                </div>
            ))}
        </PaginationContainer>

    )
}

export default MyFavorites