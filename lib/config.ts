export let BASE_URL: string;
export let WS_SERVER_URL: string;

if (process.env.ENVIRONMENT === "Devlopment") {
  BASE_URL = "http://localhost:3000";
  WS_SERVER_URL = "wss://onebeatclub-ws-mofdc.ondigitalocean.app/";
} else if (process.env.ENVIRONMENT === "Staging") {
  BASE_URL = "https://1beatclub-staging.netlify.app/";
  WS_SERVER_URL = "wss://seal-app-yn5xl.ondigitalocean.app";
} else {
  BASE_URL = "https://www.1beatclub.com/";
  WS_SERVER_URL = "wss://onebeatclub-ws-mofdc.ondigitalocean.app/";
}

export const YOUTUBE_WATCH_BASE_URL = "https://www.youtube.com/watch";

export const isPremiumEnabled = true;
