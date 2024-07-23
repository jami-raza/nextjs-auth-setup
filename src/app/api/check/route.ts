import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import cheerio, { load } from "cheerio";
import axios from "axios";

export async function GET(req: NextRequest, res: NextResponse) {
  async function downloadFacebookVideo(url: string) {
    try {
      // Fetching the Facebook page content
      const response = await axios.get(url);
      const html = response.data;
      // Parsing the HTML with Cheerio
      const $ = load(html);
      // Extracting video URL
      const videoUrl = $('meta[property="og:video"]').attr("content");
      if (!videoUrl) {
        console.log("Video not found on the page");
        return;
      }
      // Downloading the video
      const videoResponse = await axios({
        method: "GET",
        url: videoUrl,
        responseType: "stream",
      });

      console.log(videoResponse, "Video Response");
    } catch (error) {}
  }

  const video = await downloadFacebookVideo('https://fb.watch/tb2S8Zr1vI/')
  // Writing video content…

  return new Response("Hello world", {
    status: 200,
  });
  // res.status(200).json({ message: 'Hello from Next.js!' })
}
