import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";
import { oidcSpa } from "oidc-spa/vite-plugin";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        oidcSpa(),
        keycloakify({
            accountThemeImplementation: "Multi-Page"
        })
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
