export let BASE_URL: string;
export let WS_SERVER_URL: string;


if(process.env.ENVIRONMENT==="Devlopment"){
 BASE_URL = "http://localhost:3000"
 WS_SERVER_URL= "ws://localhost:8080"
}else{
 BASE_URL = "https://www.1beatclub.com/"
 WS_SERVER_URL= "wss://seal-app-yn5xl.ondigitalocean.app"
}

export  const YOUTUBE_WATCH_BASE_URL="https://www.youtube.com/watch"


export const CLUB_INVITATION_TOKEN_EXPIRATION = 30;




