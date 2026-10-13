import type { NextConfig } from 'next';

/**
 * No remote image patterns.
 *
 * Every photograph on this site ships in /public — the site has no CMS and
 * no storage bucket, because the owner asked for nothing to log into. A
 * photo changes by replacing a file and redeploying, which is a 30-second
 * job and keeps the whole site static.
 */
const nextConfig: NextConfig = {};

export default nextConfig;
