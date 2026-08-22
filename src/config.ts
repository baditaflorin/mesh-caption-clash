import { createMeshConfig } from "@baditaflorin/mesh-common";

export const config = createMeshConfig({
  appName: "mesh-caption-clash",
  description: "A shared caption contest with one entry and independent votes per peer.",
  accentHex: "#db2777",
  version: __APP_VERSION__,
  commit: __GIT_COMMIT__,
});
