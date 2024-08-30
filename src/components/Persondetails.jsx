import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../store/actions/personActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "../components/templates/horizontalcards";
import Dropdown from "../components/templates/Dropdown"

const Persondetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  const [category, setcategory] = useState("movie")

  console.log(info);

  useEffect(() => {
    dispatch(asyncloadperson(id));

    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  return info ? (
    <div className="px-[10%] w-screen h-[155vh] bg-[#1F1E24] ">
      {/* Part 1 navigation */}
      <nav className="h-[10vh] w-full text-zinc-200 flex items-center gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>{" "}
        {/*  */}
      </nav>

      <div className="w-full flex ">
        {/* Part 2 Left poster and details */}
        <div className="w-[30%]">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[35vh]  object-cover"
            src={`https://image.tmdb.org/t/p/original/${info.details.profile_path}`}
            alt=""
          />
          <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
          {/* Social media links */}
          <div className="text-2xl text-white flex gap-x-5">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="ri-earth-fill"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i className="ri-instagram-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://x.com/${info.externalid.twitter_id}`}
            >
              <i className="ri-twitter-x-fill"></i>
            </a>
          </div>
          {/* Personal info */}
          <h1 className="text-2xl text-zinc-500 font-semibold my-5">
            Person Info
          </h1>
          <h1 className="text-lg text-zinc-500 font-semibold ">Known For</h1>
          <h1 className=" text-zinc-500 ">
            {info.details.known_for_department}
          </h1>

          <h1 className="text-lg text-zinc-500 font-semibold mt-3">Gender</h1>
          <h1 className=" text-zinc-500 ">
            {info.details.gender === 1 ? "Female" : "Male"}
          </h1>

          <h1 className="text-lg text-zinc-500 font-semibold mt-3">Birthday</h1>
          <h1 className=" text-zinc-500 ">{info.details.birthday}</h1>

          <h1 className="text-lg text-zinc-500 font-semibold mt-3">Deathday</h1>
          <h1 className=" text-zinc-500 ">
            {info.details.deathday ? info.details.deathday : "Alive"}
          </h1>

          <h1 className="text-lg text-zinc-500 font-semibold mt-3">
            Place Of Birth
          </h1>
          <h1 className=" text-zinc-500 ">{info.details.place_of_birth}</h1>

          <h1 className="text-lg text-zinc-500 font-semibold mt-3">
            Also Known As
          </h1>
          <h1 className=" text-zinc-500 ">
            {info.details.also_known_as.join("; ")}
          </h1>
        </div>
        {/* Part 3 right details & info */}
        <div className="w-[70%] ml-[5%]">
          <h1 className="text-6xl font-black my-5 text-zinc-500 ">
            {info.details.name}
          </h1>
          <h1 className="text-xl text-zinc-500 font-semibold ">Biography</h1>
          <p className=" text-zinc-500 mt-3 ">{info.details.biography}</p>

          <h1 className="text-lg text-zinc-500 font-semibold mt-5">
            Known For
          </h1>
          <HorizontalCards data={info.combinedCredits.cast} />

          <div className="w-full flex justify-between">
          <h1 className="text-xl mt-5 text-zinc-500 font-semibold ">Acting</h1>

          <Dropdown title="Category" options={["tv","movie"]} func = {(e) => setcategory(e.target.value)} />

          </div>
          <div className="list-disc mt-[2%] text-zinc-400 w-full h-[50vh] overflow-x-hidden overflow-y-auto shadow-xl  shadow-[rgba(255,255,255,0.3)] border-2 border-zinc-800 p-5 ">

            {info[category + "Credits"].cast.map((c,i) => (
               <li key={i} className="hover:text-white p-5 rounded hover:bg-[rgba(0,0,0,.3)] duration-300 cursor-pointer">
               <Link to={`/${category}/details/${c.id}`} className="">
               <span >
                {" "}
              {c.original_title ||
              c.original_name ||
              c.name ||
              c.title}</span>
               <span className="block ml-s mt-2">
               {c.character && `Character Name : ${c.character}` }
                
                
                </span>
               </Link>
              
             </li>
            ))}

           


          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Persondetails;
