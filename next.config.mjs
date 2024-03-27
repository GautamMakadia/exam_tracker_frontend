/** @type {import('next').NextConfig} */
import path from 'path';
const __dirname = path.resolve();


const nextConfig = {

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/:path*"
            : "http://127.0.0.1:8000/:path*",
      },
    ];
  },
};

export default nextConfig;
