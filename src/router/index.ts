import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import GalleryPage from "@/pages/GalleryPage.vue";

const routes: readonly RouteRecordRaw[] = [
    { path: "/", redirect: "/gallery", },
    { path: "/gallery", name: "Gallery", component: GalleryPage },
    { path: '/:pathMatch(.*)*', redirect: '/gallery' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    next();
});

export default router;