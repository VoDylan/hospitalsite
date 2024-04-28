var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// vite.config.ts
import { defineConfig } from "file:///C:/Users/artma/WebstormProjects/team-F-production/.yarn/__virtual__/vite-virtual-61b2827c36/0/cache/vite-npm-5.2.10-08834d3974-a0c4ac7b95.zip/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/artma/WebstormProjects/team-F-production/.yarn/__virtual__/@vitejs-plugin-react-swc-virtual-34362bd81b/0/cache/@vitejs-plugin-react-swc-npm-3.5.0-750c0d5a74-ca3315e200.zip/node_modules/@vitejs/plugin-react-swc/index.mjs";
import eslint from "file:///C:/Users/artma/WebstormProjects/team-F-production/.yarn/__virtual__/vite-plugin-eslint-virtual-1f4e08d8c3/0/cache/vite-plugin-eslint-npm-1.8.1-844ad445f5-65598893e2.zip/node_modules/vite-plugin-eslint/dist/index.mjs";
import * as process from "process";
console.log(process.env.FRONTEND_PORT);
var vite_config_default = defineConfig({
  resolve: {
    preserveSymlinks: true,
    alias: {
      fs: __require.resolve("rollup-pligin-node-builtins")
    }
  },
  server: {
    host: "0.0.0.0",
    port: parseInt(process.env.FRONTEND_PORT),
    proxy: {
      "/api": process.env.BACKEND_SOURCE + ":" + process.env.BACKEND_PORT
    },
    watch: {
      usePolling: true
    }
  },
  build: {
    outDir: "build"
  },
  plugins: [react(), eslint()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhcnRtYVxcXFxXZWJzdG9ybVByb2plY3RzXFxcXHRlYW0tRi1wcm9kdWN0aW9uXFxcXGFwcHNcXFxcZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFydG1hXFxcXFdlYnN0b3JtUHJvamVjdHNcXFxcdGVhbS1GLXByb2R1Y3Rpb25cXFxcYXBwc1xcXFxmcm9udGVuZFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYXJ0bWEvV2Vic3Rvcm1Qcm9qZWN0cy90ZWFtLUYtcHJvZHVjdGlvbi9hcHBzL2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5pbXBvcnQgZXNsaW50IGZyb20gXCJ2aXRlLXBsdWdpbi1lc2xpbnRcIjtcbmltcG9ydCAqIGFzIHByb2Nlc3MgZnJvbSBcInByb2Nlc3NcIjtcbmNvbnNvbGUubG9nKHByb2Nlc3MuZW52LkZST05URU5EX1BPUlQpO1xuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJlc29sdmU6IHtcbiAgICBwcmVzZXJ2ZVN5bWxpbmtzOiB0cnVlLFxuICAgIGFsaWFzOiB7XG4gICAgICBmczogcmVxdWlyZS5yZXNvbHZlKCdyb2xsdXAtcGxpZ2luLW5vZGUtYnVpbHRpbnMnKSxcbiAgICB9LFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiBcIjAuMC4wLjBcIixcbiAgICBwb3J0OiBwYXJzZUludChwcm9jZXNzLmVudi5GUk9OVEVORF9QT1JUKSxcbiAgICBwcm94eToge1xuICAgICAgXCIvYXBpXCI6IHByb2Nlc3MuZW52LkJBQ0tFTkRfU09VUkNFICsgXCI6XCIgKyBwcm9jZXNzLmVudi5CQUNLRU5EX1BPUlQsXG4gICAgfSxcbiAgICB3YXRjaDoge1xuICAgICAgdXNlUG9sbGluZzogdHJ1ZSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIG91dERpcjogXCJidWlsZFwiLFxuICB9LFxuICBwbHVnaW5zOiBbcmVhY3QoKSwgZXNsaW50KCldLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7QUFBNlgsU0FBUyxvQkFBb0I7QUFDMVosT0FBTyxXQUFXO0FBQ2xCLE9BQU8sWUFBWTtBQUNuQixZQUFZLGFBQWE7QUFDekIsUUFBUSxJQUFZLFlBQUksYUFBYTtBQUVyQyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxrQkFBa0I7QUFBQSxJQUNsQixPQUFPO0FBQUEsTUFDTCxJQUFJLFVBQVEsUUFBUSw2QkFBNkI7QUFBQSxJQUNuRDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU0sU0FBaUIsWUFBSSxhQUFhO0FBQUEsSUFDeEMsT0FBTztBQUFBLE1BQ0wsUUFBZ0IsWUFBSSxpQkFBaUIsTUFBYyxZQUFJO0FBQUEsSUFDekQ7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLFlBQVk7QUFBQSxJQUNkO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFNBQVMsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBQzdCLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
