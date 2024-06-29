import { useState,useRef,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';
import { zip } from 'lodash';
import './App.css'
import Songs from './components/songs'
import Page from './components/page'
import { Link } from 'react-router-dom';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import close from './assets/close.svg';
import dot from './assets/dot.svg';
import hamburger from './assets/hamburger.svg';
import home from './assets/home.svg';
import logo from './assets/logo.svg';
import music from './assets/music.svg';
import mute from './assets/mute.svg';
import next from './assets/next.svg';
import pause from './assets/pause.svg';
import play from './assets/play.svg';
import playlist from './assets/playlist.svg';
import prev from './assets/prev.svg';
import search from './assets/search.svg';
import volume from './assets/volume.svg';
import c_arrow from './assets/c_arrow.svg';
import shuffle from './assets/shuffle.svg';

import { useNavigate } from 'react-router-dom';

function App() {
    const audioRef = useRef(null)
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSongs, setFilteredSongs] = useState([]);
    const liRef = useRef(null);
    const [musicList,setMusicList]=useState('https://podz-content.spotifycdn.com/audio/clips/5rtP20qwaD6UbBjPrIbjA3/clip_478_60478.mp3')
    const hidden = useRef(null);
    const searchB = useRef(null);
    const focusSearch = useRef(null);
    const [isLoading,setLoading]=useState(true)

    

    const [data, setData] = useState([[],[]]);
    const [inputValue, setInputValue] = useState('');
    const [anotherValue, setAnotherValue] = useState('');
    const buttonRef = useRef(null);
    const hideSidebar=()=>{

    }

    const showSidebar=()=>{
        hidden.current.style.display='block'
    }

    

    const displaySearch=()=>{
        searchB.current.style.display='flex'
        focusSearch.current.focus()
    }

    const handleValue=()=>{
        
    }

    
    const handleSubmit = async (event) => {
        setInputValue(event.target.value)
        setLoading(true)
        hidden.current.style.display='none'
        console.log("I am in submit")
        event.preventDefault();
        
        const sendData = { input: inputValue };
    
        try {
          const response1 = await axios.post('http://127.0.0.1:5500/submit', sendData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
          setData(response1.data)
        } catch (error) {
          console.error('Error:', error);
        }
        
        setLoading(false)
      };

      const handleClick =(event) => {
    
       
        setLoading(true)
        // hidden.current.style.display='none'
        // if (focusSearch.current) {
        setInputValue(event.target.textContent)
        localStorage.setItem('inputValue',event.target.textContent)
        
            // const sendData1 = { input:event.target.textContent};
    
            // try {
            // const response2 = await axios.post('http://127.0.0.1:5500/submit', sendData1, {
            //     headers: {
            //     'Content-Type': 'application/json'
            //     }
            // });
            
            // setData(response2.data)
            // } catch (error) {
            // console.error('Error:', error);
            // }
            

        
        setLoading(false)

      };


    

      // const playMusic=async (songName)=>{
      //       const urlResponse=await fetch('https://v1.nocodeapi.com/a6hishek/spotify/GuCYZbEXROAEoflL/search?q=animal&type=playlist')
      //       const convertedResponse=await urlResponse.json()
      //       console.log(songName)
      //       console.log(convertedResponse.tracks.items[0].album.images[0].url)
      //       console.log(convertedResponse.playlists)
      // }
      

    const displayCards=(e)=>{
        setSearch(e.target.value)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();   
          buttonRef.current.click();
        }
      };

    useEffect(() => {
        const fetchData = async () => {
            localStorage.setItem('inputValue',localStorage.getItem('inputValue') || "Bones")
            try {
              console.log("I am in submit");
            //   const response = await axios.get('http://localhost:5500/api/data');
              const sendData2 = { input:localStorage.getItem('inputValue')};

              const response = await axios.post('http://127.0.0.1:5500/submit', sendData2, {
                headers: {
                  'Content-Type': 'application/json'
                }
              });

              setData(response.data);
            } catch (error) {
              console.error('There was an error fetching the data!', error);
            } finally {
              setLoading(false);
            }
          };
      
          fetchData();
      }, [inputValue]);


    const [names, posters] = data;

    const handleSearch=(event)=>{
        setInputValue(event.target.value)
        localStorage.setItem('inputValue',event.target.value)
        const query = event.target.value;
        setSearchQuery(query);
        if (query) {
        const filtered = names.filter(nam =>
            nam.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredSongs(filtered);
        } else {
        setFilteredSongs([]);
        }
    }

    
   

    return(
        
            
        
        <div className="w-screen h-screen flex bg-black p-2">
          
            <div className='left hidden md:block w-1/4'>

                <div className="home rounded-md h-1/5 m-1 flex flex-col gap-5 p-3">
                    <img onClick={hideSidebar} className="close invert w-4 md:hidden absolute right-2" src={close} alt="" />
                    <div className="logo">
                        <img className="invert" src={logo} alt="spotify"/>
                    </div>
                    <ul className="text-white text-xs font-bold flex flex-col gap-3">
                        <li className='flex gap-2'><img className="invert w-4" src={home} alt="home" />Home</li>
                        <li onClick={displaySearch} className='flex gap-2 cursor-pointer'><img className="invert w-4" src={search} alt="Search"/>Search</li>
                    </ul>
                </div>

                <div className='home rounded-md h-4/5 m-1 p-3'>
                    <div className="sticky top-0 z-10 heading flex gap-2">
                        <img className="invert w-4" src={playlist} alt="playlist" />
                        <h2 className="text-white font-bold">Your Playlist</h2>
                    </div>
                    <div className="songlist h-5/6 overflow-y-scroll text-white m-1">
                          <h2></h2> 
                          <ol className="list">
                              {names.map((nam,index)=>{
                                  return <a href="http://localhost:5173/page"><li onClick={handleClick} className='cursor-pointer header m-1 p-1 px-5 rounded-full' key={index}>{nam}</li></a>
                              })}
                          </ol>
                      </div>
                </div>

            </div>

          <div className='right w-full md:w-3/4 home rounded-md m-1 overflow-y-scroll'>
          
              <div className="header rounded h-12 flex items-center justify-between text-white sticky top-0 z-10 h-15 p-1">
                  
                  <div class="nav flex invert gap-3">
                      <img onClick={showSidebar}  className="hamburger w-5" src={hamburger} alt="hamburger"/>
                      <div className="">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                              <path d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                          <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                  </div>
                

                  

                  <div className="flex flex-col absolute header  left-1/4 top-2">
                      <div ref={searchB} className="border border-gray-500 flex p-2 px-2 gap-2 rounded-full">
                          
                     
                      <a href="http://localhost:5173/page"><img  src={search} className="invert w-4 cursor-pointer" alt="" /></a>

                            
                      
                          

                          <input onKeyDown={handleKeyDown} ref={focusSearch} value={inputValue} onChange={handleSearch}  className='text-xs w-60 bg-transparent border-none outline-none' type="search" placeholder='What do you want to play?'/>
                          
                      </div>
                          
                          {filteredSongs.length > 0 && (
                              <ul ref={hidden} className="suggestions min-h-5 max-h-60 rounded-lg p-1 example">
                                  {filteredSongs.map((song, index) => (
                                      <a href="http://localhost:5173/page"><li className="text-center cursor-pointer w-full border-b-2" key={index} onClick={handleClick}>
                                      {song}
                                      </li>
                                      </a>
                                  ))}
                              </ul>
                          )}
                  </div>

                  
              

                  <div className="buttons1 flex gap-10 text-sm">
                      <button className="signupbtn p-2 px-4 text-gray-600 font-bold rounded-full">Sign Up</button>  
                      <button className="loginbtn border bg-white text-black font-bold p-2 px-4 rounded-full">Log in</button>
                  </div>
              </div>
            

                          
              
                        
                      
            <Router>
          <Routes>
                <Route path="/" element={
                    
                        
                    <Page song={"Bones"}/>
                    
                     
                } />
               <Route path="/page" element={
                    
                        
                    <Page song={inputValue}/>
                    
                     
                } />

                <Route path="/songs" element={
                    
                        
                    <Songs />
                    
                     
                } />

            </Routes>
            </Router>
          </div>
          
      </div>
        

    )
}

export default App
