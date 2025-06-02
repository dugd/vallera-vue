import {createRouter, createWebHistory} from 'vue-router';
import GalleryPage from '@/pages/GalleryPage.vue';
import PhotoDetailPage from '@/pages/PhotoDetailPage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';
import ProfilePage from '@/pages/ProfilePage.vue';
import UploadPage from '@/pages/UploadPage.vue';
import {auth} from '@/services/firebase';

const routes = [
    {path: '/', redirect: '/gallery'},
    {path: '/gallery', name: 'Gallery', component: GalleryPage},
    {path: '/photo/:id', name: 'PhotoDetail', component: PhotoDetailPage, props: true},
    {path: '/login', name: 'Login', component: LoginPage},
    {path: '/register', name: 'Register', component: RegisterPage},
    {path: '/profile', name: 'Profile', component: ProfilePage, meta: {requiresAuth: true}},
    {path: '/upload', name: 'Upload', component: UploadPage, meta: {requiresAuth: true}},
    {path: '/:pathMatch(.*)*', redirect: '/gallery'}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.meta.requiresAuth as boolean;
    const currentUser = auth.currentUser;
    if (requiresAuth && !currentUser) {
        next({name: 'Login'});
    } else {
        next();
    }
});

export default router;
