process.env.NEXT_PRIVATE_SUPPRESS_NO_NATIVE_ADDON_REQUIRE = '1';

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;