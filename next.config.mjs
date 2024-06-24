import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "avatar.vercel.sh",
        port: "",
      },
      {
        hostname: "utfs.io",
        port: "",
      },
      {
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
