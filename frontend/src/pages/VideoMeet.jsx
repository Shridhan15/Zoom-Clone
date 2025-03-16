import React, { useEffect, useState } from 'react'
import "../styles/videoComponent.css";
import { useRef } from "react";
import TextField from "@mui/material/TextField";
import { Button } from '@mui/material';

const server_url="http://localhost:8000";
var connections={};

const peerConfigConnections={
    //stun serves are lightweight serves running on public internet which retun the IP add of requester's device
    "iceServers":[
        {"urls":"stun:stun.l.google.com:19302"}
    ]
}

export default function VideoMeetComponent() {

    var socketRef=useRef();

    let socketIdRef=useRef();

    let localVideoRef=useRef();

    let[videoAvailable, setVideoAvailable]=useState(true);

    let[audioAvailable, setAudioAvailable]=useState(true);

    let[video,setVideo]=useState();

    let [audio,setAudio]=useState();

    let [screen,setScreen]=useState();

    let [showModal,setModal]=useState();

    let [screenAvailable,setScreenAvailable]=useState();

    let [messages,setMessages]=useState([])

    let [message,setMessage]=useState("");

    let [newMessages,setNewMessages]=useState(0);

    let [askForUsername,setAskForUsername]=useState(true);

    let [username,setUsername]=useState("");

    const videoRef=useRef([])

    let [vieos,setVideos]=useState([]);

    //todo
    // if(isChrome()===false){

    // }

    const getPermissions= async ()=>{
        try{
            const videoPermission= await navigator.mediaDevices.getUserMedia({video: true})
            if(videoPermission){
                setVideoAvailable(true);
            }else{
                setVideoAvailable(false);
            }

            const audioPermission= await navigator.mediaDevices.getUserMedia({audio: true})
            if(audioPermission){
                setAudioAvailable(true);
            }else{
                setAudioAvailable(false);
            }

            if(navigator.mediaDevices.getDisplayMedia){//for screen sharing
                setScreenAvailable(true);
            }else{
                setScreenAvailable(false);
            }

            if(videoAvailable || audioAvailable){
                const userMediaStream= await navigator.mediaDevices.getUserMedia({video:videoAvailable,audio:audioAvailable})

                if(userMediaStream){
                    window.localStream=userMediaStream;
                    if(localVideoRef.current){//sent to video tag
                        localVideoRef.current.srcObject = userMediaStream;
                    }
                }
            }

        } catch(err){
            
            console.log(err);

        }
    }

    useEffect(()=>{
        getPermissions();
    },[])

    let getUserMediaSuccess=(stream)=>{//this is responsible to handle the audio video of a device on other's devices,(if device A mute itself, this function mutes the audio for all devices)

    }

    let getUserMedia=()=>{
        if((video && videoAvailable)||(audio &&audioAvailable)){
            navigator.mediaDevices.getUserMedia({video:video, audio:audio})
            .then((getUserMediaSuccess)=>{})// todo: get usermediasuccess
            .then((stream)=>{})
            .catch((e)=>console.log(e))
        }else{
            try{
                let tracks=localVideoRef.current.srcObject.getTracks();
                tracks.forEach(track=>track.stop())

            }catch(e){

            }
        }

    }

    useEffect(()=>{
        if(video!== undefined && audio !== undefined){
            getUserMedia();
        }
    },[audio,video])// this is dependency array, means when the attributes in array changes it run the code defined in useeffect

    let getMedia=()=>{
        setVideo(videoAvailable)
        setAudio(audioAvailable);

        // connectToSocketServer();
    }

    let connect=()=>{
        setAskForUsername(false);
        getMedia();
    }

  return (
    <div>

        {askForUsername === true ?

            <div>
                <h2>Enter into Lobby</h2>
                <TextField id="outlined-basic" label="Username" value={username} onChange={e => setUsername(e.target.value)} variant="outlined" />
                <Button variant="contained" onClick={connect}>Connect</Button>
<div>
    <video ref={localVideoRef} autoPlay muted></video>
</div>

            </div>:<></>}

    </div>
  )
}
