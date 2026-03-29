// ============================================================
// CREAMY VIBES – Playlist Configuration
// ============================================================
// How to add songs:
// 1. Place your MP3 file in the matching folder under:
//    public/music/<Genre>/yourfile.mp3
// 2. Add the filename (just the name, no path) to the list below.
//
// Song names shown in the player are taken from the filename
// (the .mp3 extension is automatically removed).
//
// You can also provide a full public path (starting with /)
// to reference files stored in other locations.
// ============================================================

export type Genre =
  | "Standart"
  | "Electronic"
  | "Pop"
  | "Rap"
  | "Rock"
  | "EDM"
  | "Oriental/Asian";

export const GENRES: Genre[] = [
  "Standart",
  "Electronic",
  "Pop",
  "Rap",
  "Rock",
  "EDM",
  "Oriental/Asian",
];

// List your MP3 filenames here for each genre.
// Example: "my-track.mp3"
export const PLAYLIST: Record<Genre, string[]> = {
  Standart: [
    "/assets/uploads/cream_the_queen-019d3a28-1d42-739b-baa4-718782f86895-1.mp3",
    "/assets/uploads/never_stop_creaming-019d3a28-5dff-730a-8ebf-911b509aa395-2.mp3",
    "/assets/uploads/dream_of_big_cream-019d3a42-818e-70ca-97e4-ee1a311fe5ff-1.mp3",
  ],
  Electronic: [
    "/assets/uploads/cream_the_queen-019d3a28-1d42-739b-baa4-718782f86895-1.mp3",
    "/assets/uploads/never_stop_creaming-019d3a28-5dff-730a-8ebf-911b509aa395-2.mp3",
  ],
  Pop: [
    // Add Pop genre MP3 filenames here
  ],
  Rap: [
    "/assets/uploads/dream_of_big_cream-019d3a42-818e-70ca-97e4-ee1a311fe5ff-1.mp3",
  ],
  Rock: [
    // Add Rock genre MP3 filenames here
  ],
  EDM: [
    // Add EDM genre MP3 filenames here
  ],
  "Oriental/Asian": [
    // Add Oriental/Asian genre MP3 files to: public/music/Oriental-Asian/
  ],
};

// Returns the public URL for a track
// If filename starts with '/', it's already an absolute public path
export function getTrackUrl(genre: Genre, filename: string): string {
  if (filename.startsWith("/")) {
    return filename;
  }
  const folderName = genre === "Oriental/Asian" ? "Oriental-Asian" : genre;
  return `/music/${folderName}/${filename}`;
}

// Returns display name from filename (strips .mp3 extension, path, and UUID suffixes)
export function getTrackName(filename: string): string {
  const base = filename.split("/").pop() ?? filename;
  return (
    base
      .replace(/\.mp3$/i, "")
      .replace(/[-_]/g, " ")
      // remove UUID-like suffixes (e.g. -019d3a28-1d42-739b-baa4-718782f86895-1)
      .replace(
        /\s[0-9a-f]{8}\s[0-9a-f]{4}\s[0-9a-f]{4}\s[0-9a-f]{4}\s[0-9a-f]{12}\s\d+$/i,
        "",
      )
      .trim()
  );
}
