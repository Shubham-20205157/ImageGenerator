import React, { useState } from 'react'
import { Cards,FormFiled,Loader } from '../components';
import RenderPosts from './RenderPosts';
const Home = () => {
  const [loading,setLoading] = useState(false);
  const [allPosts,setAllPosts] = useState(null);
  const [searchText,setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);
  const fetchPosts = async ()=>{
    setLoading(true);
    try{
      // we will fetch all the post by making a request to the posts get.
      const res = await fetch('http://localhost:8000/api/v1/posts',{
        method:'GET',
        headers:{
          'Content-Type': 'application/json',
        }
      });
      if(res.ok){
        const result = await res.json();
        setAllPosts(result.data.reverse());
      }
    }
    catch(error){
      alert(error);
    }
    finally{
      setLoading(false);
    }
  }
  useEffect(()=>{
   fetchPosts();
  },[]);
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
      }, 500),
    );
  };
  return (
    <section className='max-w-7x1 mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>The Community Showcase</h1>
        <p className = "max-w-[500px] mt-2 text-[16px] text-[#666e75]">Browse Through a collection of imaginative and visually stunning images generated by AI ImageGenerator</p>
      </div>
      <div className='mt-16'>
        <FormFiled 
        labelName= "Search Posts"
        type = "text"
        name = "text"
        placeholder= "Search Posts"
        value = {searchText}
        changeHandler={handleSearchChange}
        />
      </div>
      <div className='mt-10'>
        {
          loading?(<div className='flext justify-center items-center'>
              <Loader />
          </div>):(<>
            {
              searchText && (<h2 className='font-medium text-[#666e75] text-lg mb-3'>
                Showing Result form <span className='text-[#222328]'>{searchText}</span>
              </h2>)
            }
            {/**This part will show the images. so we will be using the css grid */}
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols2 grid-cols-1 gap-3'>
            {searchText ? (<RenderPosts data = {searchedResults} title = "No Search Found"/>
            )
            :(
            <RenderPosts data = {allPosts} title = "No Post Found"/>)}
            </div>
          </>)
        }
      </div>
    </section>
  )
}

export default Home;