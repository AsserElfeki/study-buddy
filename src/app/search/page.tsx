import Sidebar from '@src/components/side-bar/sidebar';
import { getPrograms } from '@lib/searchFilters';
import React from "react";
import SearchResults from '@src/components/searchResults';


// this should be server page 
// SideBar should be a client component (so fetching data here !?)
// Side Bar should change the URL 
// here fetching the URL, and fetching data accordingly ?

async function Search({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  //get the search params from the URL 
  const query = searchParams;
  // console.log("🚀 ~ file: page.tsx:18 ~ query:", query)
  
  
  return (
    <div className='flex flex-row w-full gap-2 '>
      <Sidebar />
      <SearchResults />
    </div>
  )
}

export default Search;
