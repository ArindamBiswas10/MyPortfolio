interface LastFmTrack {
  name: string;
  artist: {
    "#text": string;
  };
  album: {
    "#text": string;
  };
  image: {
    "#text": string;
    size: string;
  }[];
  url: string;
  "@attr"?: {
    nowplaying: string;
  };
}

interface LastFmResponse {
  recenttracks: {
    track: LastFmTrack | LastFmTrack[];
  };
}

export async function getLastPlayedTrack() {
  const { LASTFM_API_KEY, LASTFM_USERNAME } = process.env;

  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=1`;

  const res = await fetch(url);
  const data = await res.json() as LastFmResponse;

  // Last.fm returns an array when multiple tracks, single object when one
  const raw = data.recenttracks.track;
  const track = Array.isArray(raw) ? raw[0] : raw;

  if (!track) {
    return {
      isPlaying: false,
      title: "Nothing playing",
      artist: "",
      album: "",
      albumArt: null,
      url: "https://last.fm",
    };
  }

  const isPlaying = track["@attr"]?.nowplaying === "true";
  const images = track.image.filter((img: { "#text": string; size: string }) => img["#text"] !== "");
  const albumArt = images.length > 0 ? images[images.length - 1]["#text"] : null;

  return {
    isPlaying,
    title: track.name,
    artist: track.artist["#text"],
    album: track.album["#text"],
    albumArt,
    url: track.url,
  };
}