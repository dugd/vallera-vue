export interface Photo {
    id: string;
    url: string;
    author: string;
    date: string;   // ISO
    title?: string;
    tags?: string[];
}

export interface UserProfile {
    uid:         string;
    email:       string;
    displayName: string;
    avatarUrl?:  string;
}