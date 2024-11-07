export type SongType = {
  id:string,
    thumbnail: string;
    highResThumbnail:string | null;
    songTitle: string;
    votes: {songId:string,userId:string}[];
    videoId:string;
    link:string;
  }

  export type InvitesType = {
    adminId: string;
    clubId: string;
    toUserId: string;
    Club: {
        name: string;
    };
    admin: {
        name: string;
    };
}[]