import React ,{useEffect,useState} from 'react'
import Sidenav from './templates/sidenav'
import Topnav from './templates/topnav'
import axios from '../utils/axios'
import Header from './templates/header'
import HorizontalCards from './templates/horizontalcards'
import Dropdown from './templates/Dropdown'
import Loading from './Loading'

const home = () => {
    document.title="MOVIE DB | Homepage"
    const [wallpaper, setwallpaper] = useState(null);
    const [trending, settrending] = useState(null);
    const [category, setcategory] = useState("all")

    const GetHeaderWallpaper =  async () => {
        try {

          const {data} = await axios.get(`/trending/all/day`);
          // console.log(data);
          let randomdata = data.results[(Math.random() * data.results.length).toFixed()]
          setwallpaper(randomdata)

        } catch (error) {
          console.log("Error:", error);
        }
      };


      const GetTrending =  async () => {
        try {

          const {data} = await axios.get(`/trending/${category}/day`);
          // console.log(data);
         
          settrending(data.results)

        } catch (error) {
          console.log("Error:", error);
        }
      };
      
        // console.log(trending);
        
      useEffect (()=>{
        GetTrending()
        !wallpaper && GetHeaderWallpaper()

      },[category])




  return wallpaper && trending ? (
   <>
   <Sidenav/>
   <div className='w-[80%] h-full overflow-auto overflow-x-hidden'>
    <Topnav/>
    <Header data={wallpaper}/>

    <div className=' flex justify-between p-5'>
       <h1 className='text-3xl font-semibold text-zinc-400'>Trending</h1>

       <Dropdown title="Filter" options={["tv" , "movie" , "all"]} func={(e) => setcategory(e.target.value)} />

       </div>

    <HorizontalCards data={trending} />
   </div>
   </>
  ) :<Loading/>
}

export default home
