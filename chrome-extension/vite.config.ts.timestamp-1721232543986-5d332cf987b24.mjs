// vite.config.ts
import { defineConfig } from "file:///D:/Users/muham/OneDrive/Dokumen/Coding/Side%20Project/bisabilitas/node_modules/.pnpm/vite@5.3.1_@types+node@20.14.2_sass@1.77.5_terser@5.28.1/node_modules/vite/dist/node/index.js";
import { resolve as resolve2 } from "path";
import libAssetsPlugin from "file:///D:/Users/muham/OneDrive/Dokumen/Coding/Side%20Project/bisabilitas/node_modules/.pnpm/@laynezh+vite-plugin-lib-assets@0.5.21/node_modules/@laynezh/vite-plugin-lib-assets/dist/index.js";

// utils/plugins/make-manifest-plugin.ts
import * as fs from "fs";
import * as path from "path";
import { ManifestParser, colorLog } from "file:///D:/Users/muham/OneDrive/Dokumen/Coding/Side%20Project/bisabilitas/packages/dev-utils/dist/index.js";
import { pathToFileURL } from "url";
import * as process2 from "process";
var __vite_injected_original_dirname = "D:\\Users\\muham\\OneDrive\\Dokumen\\Coding\\Side Project\\bisabilitas\\chrome-extension\\utils\\plugins";
var { resolve } = path;
var rootDir = resolve(__vite_injected_original_dirname, "..", "..");
var manifestFile = resolve(rootDir, "manifest.js");
var getManifestWithCacheBurst = () => {
  const withCacheBurst = (path2) => `${path2}?${Date.now().toString()}`;
  if (process2.platform === "win32") {
    return import(withCacheBurst(pathToFileURL(manifestFile).href));
  }
  return import(withCacheBurst(manifestFile));
};
function makeManifestPlugin(config) {
  function makeManifest(manifest, to) {
    if (!fs.existsSync(to)) {
      fs.mkdirSync(to);
    }
    const manifestPath = resolve(to, "manifest.json");
    const isFirefox = process2.env.__FIREFOX__;
    fs.writeFileSync(manifestPath, ManifestParser.convertManifestToString(manifest, isFirefox ? "firefox" : "chrome"));
    colorLog(`Manifest file copy complete: ${manifestPath}`, "success");
  }
  return {
    name: "make-manifest",
    buildStart() {
      this.addWatchFile(manifestFile);
    },
    async writeBundle() {
      const outDir2 = config.outDir;
      const manifest = await getManifestWithCacheBurst();
      makeManifest(manifest.default, outDir2);
    }
  };
}

// vite.config.ts
import { watchRebuildPlugin } from "file:///D:/Users/muham/OneDrive/Dokumen/Coding/Side%20Project/bisabilitas/packages/hmr/dist/index.js";
var __vite_injected_original_dirname2 = "D:\\Users\\muham\\OneDrive\\Dokumen\\Coding\\Side Project\\bisabilitas\\chrome-extension";
var rootDir2 = resolve2(__vite_injected_original_dirname2);
var libDir = resolve2(rootDir2, "lib");
var isDev = process.env.__DEV__ === "true";
var isProduction = !isDev;
var outDir = resolve2(rootDir2, "..", "dist");
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@root": rootDir2,
      "@lib": libDir,
      "@assets": resolve2(libDir, "assets")
    }
  },
  plugins: [
    libAssetsPlugin({
      outputPath: outDir
    }),
    makeManifestPlugin({ outDir }),
    isDev && watchRebuildPlugin({ reload: true })
  ],
  publicDir: resolve2(rootDir2, "public"),
  build: {
    lib: {
      formats: ["iife"],
      entry: resolve2(__vite_injected_original_dirname2, "lib/background/index.ts"),
      name: "BackgroundScript",
      fileName: "background"
    },
    outDir,
    sourcemap: isDev,
    minify: isProduction,
    reportCompressedSize: isProduction,
    modulePreload: true,
    rollupOptions: {
      external: ["chrome"]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidXRpbHMvcGx1Z2lucy9tYWtlLW1hbmlmZXN0LXBsdWdpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFVzZXJzXFxcXG11aGFtXFxcXE9uZURyaXZlXFxcXERva3VtZW5cXFxcQ29kaW5nXFxcXFNpZGUgUHJvamVjdFxcXFxiaXNhYmlsaXRhc1xcXFxjaHJvbWUtZXh0ZW5zaW9uXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxVc2Vyc1xcXFxtdWhhbVxcXFxPbmVEcml2ZVxcXFxEb2t1bWVuXFxcXENvZGluZ1xcXFxTaWRlIFByb2plY3RcXFxcYmlzYWJpbGl0YXNcXFxcY2hyb21lLWV4dGVuc2lvblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovVXNlcnMvbXVoYW0vT25lRHJpdmUvRG9rdW1lbi9Db2RpbmcvU2lkZSUyMFByb2plY3QvYmlzYWJpbGl0YXMvY2hyb21lLWV4dGVuc2lvbi92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XHJcbmltcG9ydCBsaWJBc3NldHNQbHVnaW4gZnJvbSAnQGxheW5lemgvdml0ZS1wbHVnaW4tbGliLWFzc2V0cyc7XHJcbmltcG9ydCBtYWtlTWFuaWZlc3RQbHVnaW4gZnJvbSAnLi91dGlscy9wbHVnaW5zL21ha2UtbWFuaWZlc3QtcGx1Z2luJztcclxuaW1wb3J0IHsgd2F0Y2hSZWJ1aWxkUGx1Z2luIH0gZnJvbSAnQGNocm9tZS1leHRlbnNpb24tYm9pbGVycGxhdGUvaG1yJztcclxuXHJcbmNvbnN0IHJvb3REaXIgPSByZXNvbHZlKF9fZGlybmFtZSk7XHJcbmNvbnN0IGxpYkRpciA9IHJlc29sdmUocm9vdERpciwgJ2xpYicpO1xyXG5cclxuY29uc3QgaXNEZXYgPSBwcm9jZXNzLmVudi5fX0RFVl9fID09PSAndHJ1ZSc7XHJcbmNvbnN0IGlzUHJvZHVjdGlvbiA9ICFpc0RldjtcclxuXHJcbmNvbnN0IG91dERpciA9IHJlc29sdmUocm9vdERpciwgJy4uJywgJ2Rpc3QnKTtcclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQHJvb3QnOiByb290RGlyLFxyXG4gICAgICAnQGxpYic6IGxpYkRpcixcclxuICAgICAgJ0Bhc3NldHMnOiByZXNvbHZlKGxpYkRpciwgJ2Fzc2V0cycpLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIGxpYkFzc2V0c1BsdWdpbih7XHJcbiAgICAgIG91dHB1dFBhdGg6IG91dERpcixcclxuICAgIH0pLFxyXG4gICAgbWFrZU1hbmlmZXN0UGx1Z2luKHsgb3V0RGlyIH0pLFxyXG4gICAgaXNEZXYgJiYgd2F0Y2hSZWJ1aWxkUGx1Z2luKHsgcmVsb2FkOiB0cnVlIH0pLFxyXG4gIF0sXHJcbiAgcHVibGljRGlyOiByZXNvbHZlKHJvb3REaXIsICdwdWJsaWMnKSxcclxuICBidWlsZDoge1xyXG4gICAgbGliOiB7XHJcbiAgICAgIGZvcm1hdHM6IFsnaWlmZSddLFxyXG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsICdsaWIvYmFja2dyb3VuZC9pbmRleC50cycpLFxyXG4gICAgICBuYW1lOiAnQmFja2dyb3VuZFNjcmlwdCcsXHJcbiAgICAgIGZpbGVOYW1lOiAnYmFja2dyb3VuZCcsXHJcbiAgICB9LFxyXG4gICAgb3V0RGlyLFxyXG4gICAgc291cmNlbWFwOiBpc0RldixcclxuICAgIG1pbmlmeTogaXNQcm9kdWN0aW9uLFxyXG4gICAgcmVwb3J0Q29tcHJlc3NlZFNpemU6IGlzUHJvZHVjdGlvbixcclxuICAgIG1vZHVsZVByZWxvYWQ6IHRydWUsXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIGV4dGVybmFsOiBbJ2Nocm9tZSddLFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxVc2Vyc1xcXFxtdWhhbVxcXFxPbmVEcml2ZVxcXFxEb2t1bWVuXFxcXENvZGluZ1xcXFxTaWRlIFByb2plY3RcXFxcYmlzYWJpbGl0YXNcXFxcY2hyb21lLWV4dGVuc2lvblxcXFx1dGlsc1xcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxVc2Vyc1xcXFxtdWhhbVxcXFxPbmVEcml2ZVxcXFxEb2t1bWVuXFxcXENvZGluZ1xcXFxTaWRlIFByb2plY3RcXFxcYmlzYWJpbGl0YXNcXFxcY2hyb21lLWV4dGVuc2lvblxcXFx1dGlsc1xcXFxwbHVnaW5zXFxcXG1ha2UtbWFuaWZlc3QtcGx1Z2luLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Vc2Vycy9tdWhhbS9PbmVEcml2ZS9Eb2t1bWVuL0NvZGluZy9TaWRlJTIwUHJvamVjdC9iaXNhYmlsaXRhcy9jaHJvbWUtZXh0ZW5zaW9uL3V0aWxzL3BsdWdpbnMvbWFrZS1tYW5pZmVzdC1wbHVnaW4udHNcIjtpbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCB7IE1hbmlmZXN0UGFyc2VyLCBjb2xvckxvZyB9IGZyb20gJ0BjaHJvbWUtZXh0ZW5zaW9uLWJvaWxlcnBsYXRlL2Rldi11dGlscyc7XHJcbmltcG9ydCB0eXBlIHsgUGx1Z2luT3B0aW9uIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCB7IHBhdGhUb0ZpbGVVUkwgfSBmcm9tICd1cmwnO1xyXG5pbXBvcnQgKiBhcyBwcm9jZXNzIGZyb20gJ3Byb2Nlc3MnO1xyXG5cclxuY29uc3QgeyByZXNvbHZlIH0gPSBwYXRoO1xyXG5cclxuY29uc3Qgcm9vdERpciA9IHJlc29sdmUoX19kaXJuYW1lLCAnLi4nLCAnLi4nKTtcclxuY29uc3QgbWFuaWZlc3RGaWxlID0gcmVzb2x2ZShyb290RGlyLCAnbWFuaWZlc3QuanMnKTtcclxuXHJcbmNvbnN0IGdldE1hbmlmZXN0V2l0aENhY2hlQnVyc3QgPSAoKTogUHJvbWlzZTx7IGRlZmF1bHQ6IGNocm9tZS5ydW50aW1lLk1hbmlmZXN0VjMgfT4gPT4ge1xyXG4gIGNvbnN0IHdpdGhDYWNoZUJ1cnN0ID0gKHBhdGg6IHN0cmluZykgPT4gYCR7cGF0aH0/JHtEYXRlLm5vdygpLnRvU3RyaW5nKCl9YDtcclxuICAvKipcclxuICAgKiBJbiBXaW5kb3dzLCBpbXBvcnQoKSBkb2Vzbid0IHdvcmsgd2l0aG91dCBmaWxlOi8vIHByb3RvY29sLlxyXG4gICAqIFNvLCB3ZSBuZWVkIHRvIGNvbnZlcnQgcGF0aCB0byBmaWxlOi8vIHByb3RvY29sLiAodXJsLnBhdGhUb0ZpbGVVUkwpXHJcbiAgICovXHJcbiAgaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMicpIHtcclxuICAgIHJldHVybiBpbXBvcnQod2l0aENhY2hlQnVyc3QocGF0aFRvRmlsZVVSTChtYW5pZmVzdEZpbGUpLmhyZWYpKTtcclxuICB9XHJcbiAgcmV0dXJuIGltcG9ydCh3aXRoQ2FjaGVCdXJzdChtYW5pZmVzdEZpbGUpKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1ha2VNYW5pZmVzdFBsdWdpbihjb25maWc6IHsgb3V0RGlyOiBzdHJpbmcgfSk6IFBsdWdpbk9wdGlvbiB7XHJcbiAgZnVuY3Rpb24gbWFrZU1hbmlmZXN0KG1hbmlmZXN0OiBjaHJvbWUucnVudGltZS5NYW5pZmVzdFYzLCB0bzogc3RyaW5nKSB7XHJcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmModG8pKSB7XHJcbiAgICAgIGZzLm1rZGlyU3luYyh0byk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBtYW5pZmVzdFBhdGggPSByZXNvbHZlKHRvLCAnbWFuaWZlc3QuanNvbicpO1xyXG5cclxuICAgIGNvbnN0IGlzRmlyZWZveCA9IHByb2Nlc3MuZW52Ll9fRklSRUZPWF9fO1xyXG4gICAgZnMud3JpdGVGaWxlU3luYyhtYW5pZmVzdFBhdGgsIE1hbmlmZXN0UGFyc2VyLmNvbnZlcnRNYW5pZmVzdFRvU3RyaW5nKG1hbmlmZXN0LCBpc0ZpcmVmb3ggPyAnZmlyZWZveCcgOiAnY2hyb21lJykpO1xyXG5cclxuICAgIGNvbG9yTG9nKGBNYW5pZmVzdCBmaWxlIGNvcHkgY29tcGxldGU6ICR7bWFuaWZlc3RQYXRofWAsICdzdWNjZXNzJyk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgbmFtZTogJ21ha2UtbWFuaWZlc3QnLFxyXG4gICAgYnVpbGRTdGFydCgpIHtcclxuICAgICAgdGhpcy5hZGRXYXRjaEZpbGUobWFuaWZlc3RGaWxlKTtcclxuICAgIH0sXHJcbiAgICBhc3luYyB3cml0ZUJ1bmRsZSgpIHtcclxuICAgICAgY29uc3Qgb3V0RGlyID0gY29uZmlnLm91dERpcjtcclxuICAgICAgY29uc3QgbWFuaWZlc3QgPSBhd2FpdCBnZXRNYW5pZmVzdFdpdGhDYWNoZUJ1cnN0KCk7XHJcbiAgICAgIG1ha2VNYW5pZmVzdChtYW5pZmVzdC5kZWZhdWx0LCBvdXREaXIpO1xyXG4gICAgfSxcclxuICB9O1xyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc2IsU0FBUyxvQkFBb0I7QUFDbmQsU0FBUyxXQUFBQSxnQkFBZTtBQUN4QixPQUFPLHFCQUFxQjs7O0FDRjBkLFlBQVksUUFBUTtBQUMxZ0IsWUFBWSxVQUFVO0FBQ3RCLFNBQVMsZ0JBQWdCLGdCQUFnQjtBQUV6QyxTQUFTLHFCQUFxQjtBQUM5QixZQUFZQyxjQUFhO0FBTHpCLElBQU0sbUNBQW1DO0FBT3pDLElBQU0sRUFBRSxRQUFRLElBQUk7QUFFcEIsSUFBTSxVQUFVLFFBQVEsa0NBQVcsTUFBTSxJQUFJO0FBQzdDLElBQU0sZUFBZSxRQUFRLFNBQVMsYUFBYTtBQUVuRCxJQUFNLDRCQUE0QixNQUF1RDtBQUN2RixRQUFNLGlCQUFpQixDQUFDQyxVQUFpQixHQUFHQSxLQUFJLElBQUksS0FBSyxJQUFJLEVBQUUsU0FBUyxDQUFDO0FBS3pFLE1BQVksc0JBQWEsU0FBUztBQUNoQyxXQUFPLE9BQU8sZUFBZSxjQUFjLFlBQVksRUFBRSxJQUFJO0FBQUEsRUFDL0Q7QUFDQSxTQUFPLE9BQU8sZUFBZSxZQUFZO0FBQzNDO0FBRWUsU0FBUixtQkFBb0MsUUFBMEM7QUFDbkYsV0FBUyxhQUFhLFVBQXFDLElBQVk7QUFDckUsUUFBSSxDQUFJLGNBQVcsRUFBRSxHQUFHO0FBQ3RCLE1BQUcsYUFBVSxFQUFFO0FBQUEsSUFDakI7QUFDQSxVQUFNLGVBQWUsUUFBUSxJQUFJLGVBQWU7QUFFaEQsVUFBTSxZQUFvQixhQUFJO0FBQzlCLElBQUcsaUJBQWMsY0FBYyxlQUFlLHdCQUF3QixVQUFVLFlBQVksWUFBWSxRQUFRLENBQUM7QUFFakgsYUFBUyxnQ0FBZ0MsWUFBWSxJQUFJLFNBQVM7QUFBQSxFQUNwRTtBQUVBLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLGFBQWE7QUFDWCxXQUFLLGFBQWEsWUFBWTtBQUFBLElBQ2hDO0FBQUEsSUFDQSxNQUFNLGNBQWM7QUFDbEIsWUFBTUMsVUFBUyxPQUFPO0FBQ3RCLFlBQU0sV0FBVyxNQUFNLDBCQUEwQjtBQUNqRCxtQkFBYSxTQUFTLFNBQVNBLE9BQU07QUFBQSxJQUN2QztBQUFBLEVBQ0Y7QUFDRjs7O0FENUNBLFNBQVMsMEJBQTBCO0FBSm5DLElBQU1DLG9DQUFtQztBQU16QyxJQUFNQyxXQUFVQyxTQUFRQyxpQ0FBUztBQUNqQyxJQUFNLFNBQVNELFNBQVFELFVBQVMsS0FBSztBQUVyQyxJQUFNLFFBQVEsUUFBUSxJQUFJLFlBQVk7QUFDdEMsSUFBTSxlQUFlLENBQUM7QUFFdEIsSUFBTSxTQUFTQyxTQUFRRCxVQUFTLE1BQU0sTUFBTTtBQUM1QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxTQUFTQTtBQUFBLE1BQ1QsUUFBUTtBQUFBLE1BQ1IsV0FBV0MsU0FBUSxRQUFRLFFBQVE7QUFBQSxJQUNyQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLGdCQUFnQjtBQUFBLE1BQ2QsWUFBWTtBQUFBLElBQ2QsQ0FBQztBQUFBLElBQ0QsbUJBQW1CLEVBQUUsT0FBTyxDQUFDO0FBQUEsSUFDN0IsU0FBUyxtQkFBbUIsRUFBRSxRQUFRLEtBQUssQ0FBQztBQUFBLEVBQzlDO0FBQUEsRUFDQSxXQUFXQSxTQUFRRCxVQUFTLFFBQVE7QUFBQSxFQUNwQyxPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxTQUFTLENBQUMsTUFBTTtBQUFBLE1BQ2hCLE9BQU9DLFNBQVFDLG1DQUFXLHlCQUF5QjtBQUFBLE1BQ25ELE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxJQUNaO0FBQUEsSUFDQTtBQUFBLElBQ0EsV0FBVztBQUFBLElBQ1gsUUFBUTtBQUFBLElBQ1Isc0JBQXNCO0FBQUEsSUFDdEIsZUFBZTtBQUFBLElBQ2YsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLFFBQVE7QUFBQSxJQUNyQjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJyZXNvbHZlIiwgInByb2Nlc3MiLCAicGF0aCIsICJvdXREaXIiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAicm9vdERpciIsICJyZXNvbHZlIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIl0KfQo=
