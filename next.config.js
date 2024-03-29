/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['avatars.githubusercontent.com', 's.gravatar.com', "lh3.googleusercontent.com"],
  },
  // typescript: {
  //   ignoreBuildErrors: true,
  // }
}

module.exports = nextConfig
