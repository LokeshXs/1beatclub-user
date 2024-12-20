/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:"i.ytimg.com"
            },
            {
                protocol:'https',
                hostname:"ph-avatars.imgix.net"
            },
            {
                protocol:'https',
                hostname:"lh3.googleusercontent.com"
            },
            {
                protocol:'https',
                hostname:"dqy38fnwh4fqs.cloudfront.net"
            },
        ]
    }
};

export default nextConfig;
