import { useEffect, useState } from "react";
import "./App.css";
import { ROLE, useSongs } from "./state";

function App() {
  const { songs, filterSongs, role } = useSongs();
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    filterSongs(filterText);
  }, [filterText]);

  return (
    <div>
      <button>Sort</button>
      <input
        type="text"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <ul>
        {songs.map((song) => {
          return (
            <li key={song.id}>
              Title: {song.title} | Album: {song.album} | Artist: {song.artist}
            </li>
          );
        })}
      </ul>
      {role === ROLE.ADMIN ? <button>Add a song</button> : null}
    </div>
  );
}

export default App;
