import { useCallback, useReducer } from "react";
// State, perfromance, bottleneck, component design
//  of songs with attributes like title, artist, and album.

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
}

export enum ROLE {
  ADMIN,
  VIEWER,
}

export interface State {
  allSongs: Song[];
  visibleSongs: Song[];
  role: ROLE;
}

const mockSongs: Song[] = [
  {
    id: "1",
    title: "Shape of You",
    artist: "Ed Sheeran",
    album: "÷ (Divide)",
  },
  {
    id: "2",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
  },
  {
    id: "3",
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
  },
  {
    id: "4",
    title: "Bad Guy",
    artist: "Billie Eilish",
    album: "When We All Fall Asleep, Where Do We Go?",
  },
  {
    id: "5",
    title: "Rolling in the Deep",
    artist: "Adele",
    album: "21",
  },
  {
    id: "6",
    title: "Uptown Funk",
    artist: "Mark Ronson ft. Bruno Mars",
    album: "Uptown Special",
  },
  {
    id: "7",
    title: "Someone You Loved",
    artist: "Lewis Capaldi",
    album: "Divinely Uninspired to a Hellish Extent",
  },
  {
    id: "8",
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    album: "Fine Line",
  },
  {
    id: "9",
    title: "Dance Monkey",
    artist: "Tones and I",
    album: "The Kids Are Coming",
  },
  {
    id: "10",
    title: "Stay",
    artist: "The Kid LAROI & Justin Bieber",
    album: "F*CK LOVE 3: OVER YOU",
  },
];

export type ActionTypes = "FILTER" | "SORT" | "LOAD";

// Example state with role
export const initialState: State = {
  allSongs: mockSongs,
  visibleSongs: mockSongs,
  role: ROLE.VIEWER, // or ROLE.ADMIN for admin access
};

// Add sorting by title, and filtering by artist.
const reducer = (state: State, action: { type: ActionTypes; payload: any }) => {
  switch (action.type) {
    case "FILTER": {
      const allSongs = state.allSongs;
      const visibleSongs = !action.payload
        ? allSongs
        : allSongs.filter((song) =>
            song.artist
              .toLocaleUpperCase()
              .includes(action.payload.toLocaleUpperCase())
          );
      return { ...state, visibleSongs };
    }

    default:
      return state;
  }
};

export const useSongs = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { visibleSongs, role } = state;
  const filterSongs = useCallback(
    (text: string) => {
      dispatch({ type: "FILTER", payload: text });
    },
    [dispatch]
  );

  return {
    songs: visibleSongs,
    role,
    filterSongs,
  };
};
