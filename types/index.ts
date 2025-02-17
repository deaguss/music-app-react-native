  
  export interface TrackResponse {
    id: number;
    title: string;
    image_url: string;
    album_id: number;
    duration: number;
    file_path: string;
    track_number: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    album: Album;
    genres: Genre[];
  }
  
  export interface Album {
    id: number;
    title: string;
    artist_id: number;
    release_date: string;
    cover_image: string;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
    artist: Artist;
  }
  
  export interface Artist {
    id: number;
    name: string;
    biography: string;
    image_url: string;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
  }
  
  export interface Genre {
    id: number;
    name: string;
    description: string;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
    pivot: Pivot;
  }
  
  export interface Pivot {
    track_id: number;
    genre_id: number;
    created_at: string;
    updated_at: string;
  }
  