import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import GalleryPage from "@/pages/GalleryPage.vue";
import PhotoDetailPage from "@/pages/PhotoDetailPage.vue";

const routes: readonly RouteRecordRaw[] = [
    { path: "/", redirect: "/gallery", },
    { path: "/gallery", name: "Gallery", component: GalleryPage },
    { path: '/photo/:id', name: 'PhotoDetail', component: PhotoDetailPage, props: true },
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