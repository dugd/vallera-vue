export interface Photo {
    id:         string;
    url:        string;
    path:       string;
    authorUid:  string;
    authorName: string;
    date:       string;  // ISO
    title?:     string;
}



export interface UserProfile {
    uid:         string;
    email:       string;
    displayName: string;
    avatarUrl?:  string;
}