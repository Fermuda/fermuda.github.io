// I don't know javascript, ignore this.

import { neofetch } from "/resources/fetch.js";
var library = neofetch("library.json")
var song_duration = 0 // Helps loop the song around webpages.
var song_current_time = 0 // Helps loop the song around webpages.

function wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

document.addEventListener("DOMContentLoaded", function() {
    const frame = document.getElementById("frame");
    const closeButton = document.getElementById("close-btn");
    const greyFrame = document.getElementById("grey-frame");

    const home_link = document.getElementById("home-link")
    const about_link = document.getElementById("about-link")
    const project_link = document.getElementById("project-link")
    const experience_link = document.getElementById("experience-link")

    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get("songCurrentTime");

    var old_p_href = null
    var old_a_href = null
    var old_e_href = null
    var old_h_href = null

    if(home_link){
        old_h_href = home_link.href
    }
    if(about_link){
        old_a_href = about_link.href
    }
    if(project_link){
        old_p_href = project_link.href
    }
    if(experience_link){
        old_e_href = experience_link.href
    }

    function audio_load(){
        var audio = new Audio(library["background-audio"]);
    
        audio.play();
            
        if(value){
            audio.currentTime = value;
        }
            
        audio.addEventListener('timeupdate', function() {
            song_current_time = audio.currentTime
            if(old_h_href){
                home_link.href =  old_h_href+"?songCurrentTime="+song_current_time
            }
            if(old_a_href){
                about_link.href =  old_a_href+"?songCurrentTime="+song_current_time
            }
            if(old_p_href){
                project_link.href =  old_p_href+"?songCurrentTime="+song_current_time
            }
            if(old_e_href){
                experience_link.href =  old_e_href+"?songCurrentTime="+song_current_time
            }
                
            if(song_current_time >= audio.duration){
                wait(2)
                audio.play()
            }
        });
    }

    if(greyFrame){
        greyFrame.addEventListener("click", function() {
            greyFrame.style.display = "none"
            audio_load()
        });
    }
    if(frame){
        closeButton.addEventListener("click", function() {
            frame.style.display = "none";
            audio_load()
        });
    }
});