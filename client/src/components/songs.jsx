import React from 'react'
import { useState,useEffect,useRef } from 'react'
import './css/songs.css'
import clock from "../assets/clock.svg"
import plus from '../assets/plus.svg';
import dot from '../assets/dot.svg';
import pause from '../assets/pause.svg';
import play from '../assets/play.svg';
import c_arrow from '../assets/c_arrow.svg';
import shuffle from '../assets/shuffle.svg';
import prev from '../assets/prev.svg';
import next from '../assets/next.svg';

function Songs() {
    const [songs,setSongs]=useState({})
    const [details,setDetails]=useState({})
    const [artist1,setArtistName1]=useState()
    const [playsong,setSong]=useState('')
    const [isPause,setPause]=useState(false)
    const audioRef = useRef(null)
    const [image,setImage]=useState('')
    const [songName,setName]=useState('')
    const [currentSong,setCurrentSong]=useState('')
    useEffect(()=>{
        const playMusic=async ()=>{
            
            localStorage.setItem('details',"")
            const details={nam:'',desc:'',isSet:false}
            
           if(!details.isSet){
                const urlResponse1=await fetch(`https://v1.nocodeapi.com/o6h1/spotify/VSPDkGfpOqOguiqd/search?q=${localStorage.getItem('songName')}&type=playlist`)
                // const urlResponse1=await fetch(`https://v1.nocodeapi.com/a6h15hek/spotify/iWHBDcJPYiofrpmU/search?q=Animal&type=playlist`)
                const convertedResponse1=await urlResponse1.json()
    
                const urlResponse=await fetch(`https://v1.nocodeapi.com/o6h1/spotify/VSPDkGfpOqOguiqd/search?q=${localStorage.getItem('songName')}&type=track`)
                // const urlResponse=await fetch(`https://v1.nocodeapi.com/a6h15hek/spotify/iWHBDcJPYiofrpmU/search?q=Animal&type=track`)
                const convertedResponse=await urlResponse.json()
                console.log(convertedResponse.tracks.items)
                localStorage.setItem('songs',JSON.stringify(convertedResponse.tracks.items))
    
               
                
                details.nam=convertedResponse1.playlists.items[0].name,
                details.desc=convertedResponse1.playlists.items[0].description,
                details.isSet=true
    
                console.log(details)
           }
           
           localStorage.setItem('details',JSON.stringify(details))
           setSongs(JSON.parse(localStorage.getItem('songs')))
           localStorage.setItem('currentSong',localStorage.getItem('currentSong') || songs[0].name)
           localStorage.setItem('artist',localStorage.getItem('artist') || songs[0].artists[0].name)
           localStorage.setItem('image1',localStorage.getItem('image1') || songs[0].album.images[0].url)
           localStorage.setItem('song_url',localStorage.getItem('song_url') || songs[0].preview_url)
           setName(localStorage.getItem('currentSong'))
           setArtistName1(localStorage.getItem('artist'))
           setImage(localStorage.getItem('image1'))
           setSong(localStorage.getItem('song_url'))
        //    setArtistName1(songs[0].artists[0].name)
           if(localStorage.getItem('details'))
            {
                setDetails(JSON.parse(localStorage.getItem('details')))
            }
            
          }
    
          playMusic()
    },[])

    
    
    
    // if(localStorage.getItem('songs'))
    // {
    //     setSongs(JSON.parse(localStorage.getItem('songs')))
    // }
    const playSong=(song,songname,imageLink,artistName1)=>{
        setArtistName1(artistName1)
        
        
        setSong(song)
        setPause(true)
        localStorage.setItem('playsong',song)
        localStorage.setItem('currentSong',songname)
        localStorage.setItem('artist',artistName1)
        localStorage.setItem('image1',imageLink)
        localStorage.setItem('song_url',song)
        setName(songname)
        setImage(imageLink)
        setCurrentSong(song)
        console.log(localStorage.getItem('playsong'))
    }

    useEffect(()=>{
        if (isPause) {
            audioRef.current.play();
        } 
    },[playsong])


    const playmusic=()=>{
        setPause(!isPause)
        audioRef.current.play();
    }
    
    const pauseMusic=()=>{
    setPause(!isPause)
    audioRef.current.pause();
    }

    


    
       
    return (
        <>
        {details.isSet ? (
                <div className="example w-full h-[80%] md:w-full rounded-md overflow-y-scroll">
                <div className=' w-full flex'>
                    <div className='flex items-end h-3/4 p-2 w-full'>
                        <img src={localStorage.getItem('image')} className="img rounded-md w-40 h-40" alt="" />
                        <div className=" text-white h-32 flex flex-col justify-end flex-1 p-2">
                            <p className="text-sm">Playlist</p>
                            {/* <p className="text-2xl font-bold">Animal All Songs 🔥| Animal Park</p> */}
                            <p className="text-2xl overflow-hidden capitalize h-8 w-[300px] whitespace-nowrap overflow-ellipsis font-bold">{details.nam}</p>
                            {/* <p className=" h-8 w-[200] font-bold overflow-hidden text-gray-300 text-xs">Animal movie all songs at one place, Animal Park, Animal park, animal park, Trending Songs, Trending songs hindi, Trending punjabi songs, Trending songs punjabi, Trending hindi songs, romantic romantic songs, Trending songs instagram, Trending love songs, sad songs, romantic songs, love songs</p> */}
                            <p className=" h-8 w-[200] font-bold overflow-hidden text-gray-300 text-xs">{details.desc}</p>
                        </div>
                    </div>
                </div>
        
                <div className=" container_shadow mt-5">
                    <div className="flex  items-center gap-5 pl-10">
                        <div className="play rounded-full w-12 flex justify-center p-3  bg-green-400">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="24" color="#000000" fill="black">
                                <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                            </svg>
                        </div>
        
                        <div>
                            <img src={plus} className="w-7 invert" alt="" />
                        </div>
                        <div>
                            <img src={dot} className="h-8 invert" alt="" />
                        </div>
                    </div>

                    <div className='mt-2 w-full text-xs flex justify-center'>
                        <table className="w-[90%] rounded-lg">
                            <thead className="border-b">
                                <tr>
                                    <th className="py-2 text-left text-white px-4">#</th>
                                    <th className="py-2 text-left text-white px-4">Title</th>
                                    <th className="py-2 text-left text-white px-4">Album</th>
                                    <th className="py-2 text-left text-white px-4">Date added</th>
                                    <th className="py-2 text-left text-white px-4"><img className='w-3.5 invert' src={clock} alt="" /></th>
                                    
                                </tr>
                            </thead> 
                            <tbody className='text-[14px] font-medium text-white'>
                                {songs.map((song,index)=>{
                                    return <tr key={index} className="cursor-pointer" onClick={()=>playSong(song.preview_url,song.name,song.album.images[0].url,song.artists[0].name)}>
                                        <td  key={index} className="py-2 px-4 ">{index+1}</td>
                                        <td  key={index} className="py-2 px-4 flex gap-2"><span><img className='w-10 h-9' src={song.album.images[0].url} alt="" /></span><div><p className="mb-0.5 overflow-hidden h-5 whitespace-nowrap w-[150px] overflow-ellipsis">{song.name}</p><p className="text-[12px] text-gray-300 ">{song.artists[0].name}</p></div></td>
                                        <td  key={index} className="py-2 px-4 text-gray-300">{song.album.name}</td>
                                        <td  key={index} className="py-2 px-4 text-gray-300">{song.album.release_date}</td>
                                        <td  key={index} className="py-2 px-4 text-gray-300">{song.album.release_date_precision}</td>
                                    </tr>
                                })}
                                
                               
                            </tbody>
                        </table>
                    </div>

                    
                </div>
                <div className="h-[13%] bg-neutral-900 absolute bottom-0 flex justify-between right-0 w-full ">
                    <audio ref={audioRef} className="" src={playsong}></audio>
                    
                    <div className="text-white flex gap-2 justify-center items-center w-1/6 ">
                        <span className=""><img className='w-12 h-12' src={image} alt="" /></span>
                        <div className="text-sm w-24 ">
                            <p className='overflow-hidden whitespace-nowrap overflow-ellipsis'>{songName}</p>
                            <p className='overflow-hidden whitespace-nowrap overflow-ellipsis'>{artist1}</p>
                            
                        </div>
                    </div>
                    <div className="w-5/6 flex justify-center items-center gap-5">
                        <img src={shuffle} className="w-4" alt="" />
                        <img src={prev} className="w-4" alt="" />
                        {/* <button className="bg-white rounded-full h-10 p-2"></button> */}
                        {isPause ? <button onClick={pauseMusic} className="bg-white rounded-full h-10 p-2"><img src={play} className="" alt="" /></button>:<button onClick={playmusic} className="bg-white rounded-full h-10 p-2"> <img src={pause} className="" alt="" /> </button>}
                        <img src={next} className="w-4" alt="" />
                        <img src={c_arrow} className="w-4" alt="" />
                    </div>
                    
                </div>
            </div>
            
        ):(<div class="relative mt-5 left-1/2 w-10 h-10">
        <div class="absolute inset-0 border-4 border-gray-300 rounded-full"></div>
        <div class="absolute inset-0 border-4 border-t-4 border-t-blue-500 border-gray-300 rounded-full animate-spin-slow"></div>
    </div>
    )}

            
        </>
    )
}

export default Songs