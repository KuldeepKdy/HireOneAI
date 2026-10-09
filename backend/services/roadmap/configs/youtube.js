import dotenv from "dotenv";
dotenv.config();

import axios from "axios";

const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

const searchVideo = async (topic) => {
try {
const search = async (query) => {
const { data } = await axios.get(BASE_URL, {
params: {
key: process.env.YOUTUBE_API_KEY,
part: "snippet",
q: query,
maxResults: 5,
type: "video",
},
});

  return data.items || [];
};

// First, search for the topic
let videos = await search(`${topic} tutorial`);

// Prefer videos from Virtual Code
let video = videos.find((item) =>
  item.snippet.channelTitle
    .toLowerCase()
    .includes("virtual code")
);

// Fallback to the first result
if (!video && videos.length > 0) {
  video = videos[0];
}

// Try a broader search if no video was found
if (!video) {
  videos = await search(topic);
  video = videos[0] || null;
}

if (!video) {
  console.log("No video found for:", topic);
  return null;
}

return {
  title: video.snippet.title,
  channel: video.snippet.channelTitle,
  url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
};

} catch (error) {
console.error(
`YouTube search failed for "${topic}":`,
error.response?.data || error.message
);


return null;

}
};

export default searchVideo;
