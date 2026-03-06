
interface locationData {
    name: string,
    url: string,
}

export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: locationData;
    location: locationData;
    image: string;
    episode: string[];
    url: string;
    created: string;
}