import React, { useCallback, useState } from "react";
import {dbUpload} from '../api/frontendAPI'

import {Recorder} from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'

class RecorderComponent extends React.Component {

  currentdate = new Date();

 

    state = {
        audioDetails: {
            url: null,
            blob: null,
            chunks: null,
            duration: {
              h: 0,
              m: 0,
              s: 0
            }
          }
    }
    handleAudioStop(data){
        console.log(data)
        this.setState({ audioDetails: data });
    }
    formData = new FormData();
    handleAudioUpload = async (file) => {
        // dbUpload(this.state.audioDetails.blob)
        console.log(file)
        let init = {
          method: "PUT",
            headers: {
                'Content-Type': 'audio/mpeg',
                'Authorization': `Bearer ${window.localStorage.odToken}`
            },
            body: file
          }
        let dateTime = `${this.currentdate.getDate()}-${this.currentdate.getMonth()}-${this.currentdate.getFullYear()}`
        let msProfileRequest = await fetch(`https://graph.microsoft.com/v1.0/me/drive/special/music:/test${dateTime}.mp3:/content`, init)
        let msProfile = await msProfileRequest.json()
        console.log(msProfile)

    }
    handleReset() {
        const reset = {
          url: null,
          blob: null,
          chunks: null,
          duration: {
            h: 0,
            m: 0,
            s: 0
          }
        };
        this.setState({ audioDetails: reset });
      }
    
      render() {
          return(<div className="recorderContainer">
            <div className="recorderSpacer"></div>
            <Recorder
            record={true}
            title={"Record a Hit!"}
            audioURL={this.state.audioDetails.url}
            showUIAudio
            handleAudioStop={data => this.handleAudioStop(data)}
            handleAudioUpload={data => this.handleAudioUpload(data)}
            handleReset={() => this.handleReset()} 
            />
            <div className="recorderSpacer"></div>
            </div>
          )
      }
    
    
 
} 

export default RecorderComponent