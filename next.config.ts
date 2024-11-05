import type { NextConfig } from "next";
import BundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {};

const withBundleAnalyzer = BundleAnalyzer({
  enabled: process.env.ANALYZER === "true",
});

export default withBundleAnalyzer(nextConfig);
