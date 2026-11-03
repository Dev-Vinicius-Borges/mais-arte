export type ArtistT = { 
    type: "Artista";
    category: { 
        type: string; 
        styles: string[] 
    }; 
    imageUrl: string; 
    name: string; 
    pathUrl: string; 
    resume: string;
    visible: boolean;
};