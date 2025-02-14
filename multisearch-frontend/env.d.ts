/// <reference types="vite/client" />

// Path: multisearch-frontend/shims-vue.d.ts (Copilot)
declare module "*.vue" {
    import { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
}