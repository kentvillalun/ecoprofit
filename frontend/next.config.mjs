/** @type {import('next').NextConfig} */



const nextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.1.30"],
  async rewrites() {
    const backendUrl = process.env.NODE_ENV === "development" ? "http://localhost:5001" : "https://ecoprofit-production.up.railway.app";


    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/:path*`
      }
    ]
  }
};





export default nextConfig;
