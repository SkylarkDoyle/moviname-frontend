import type { MovieData } from "../types";
import LZString from "lz-string";
import axios from "axios";

/**
 * Encodes movie data into a shortened, compressed string using LZString.
 * Reduced overhead compared to JWT.
 */
export const encodeMovieData = async (data: MovieData): Promise<string> => {
  // Compress the data object directly to a URL-safe string
  return LZString.compressToEncodedURIComponent(JSON.stringify(data));
};

/**
 * Decodes movie data from a compressed string.
 */
export const decodeMovieData = async (
  token: string
): Promise<MovieData | null> => {
  try {
    if (!token) return null;

    // Decompress the string directly
    const jsonString = LZString.decompressFromEncodedURIComponent(token);
    return jsonString ? JSON.parse(jsonString) : null;
  } catch (error) {
    console.error("Failed to decode movie data:", error);
    return null;
  }
};

/**
 * Shortens a URL using public APIs with failover logic.
 * 1. TinyURL
 * 2. is.gd
 * 3. Fallback to original
 */
const shortenUrl = async (longUrl: string): Promise<string> => {
  // 1. Try TinyURL
  try {
    const response = await axios.get(
      `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`
    );
    if (response.data) return response.data;
  } catch (e) {
    console.warn("TinyURL failed, trying fallback...", e);
  }

  // 2. Try is.gd (Note: may have CORS issues on some clients)
  try {
    const response = await axios.get(
      `https://is.gd/create.php?format=simple&url=${encodeURIComponent(
        longUrl
      )}`
    );
    if (response.data) return response.data;
  } catch (e) {
    console.warn("is.gd failed, returning original length...", e);
  }

  // 3. Fallback
  return longUrl;
};

export const generateShareUrl = async (data: MovieData): Promise<string> => {
  const token = await encodeMovieData(data);
  const url = new URL(window.location.origin);
  url.searchParams.set("share", token);

  // Attempt to shorten the full URL
  return await shortenUrl(url.toString());
};
