
export interface MovieModel {
  id: string;
  movie_id: number;
  original_title: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  adult: number;
  created_at?: any;
  updated_at?: any;
  casts: Cast[];
  actors?: string;
  genre?:string;
  price?: "10" | "15" | "20"
  screentime?: string
  director?: string
}

interface Cast {
  id: string;
  movie_id: number;
  name: string;
  original_name: string;
  popularity: string;
  profile_path: string;
  character: string;
  created_at?: any;
  updated_at?: any;
}
