import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    implementation: require.resolve("sass"),
    includePaths: [path.join(__dirname, "src")],
    additionalData: `
      @use "@/shared/styles/mixins" as *;
      @use "@/shared/styles/utils" as *;
    `,
  },
};

export default nextConfig;
