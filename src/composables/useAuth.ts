import { ref, onMounted, onUnmounted } from 'vue';
import { subscribeAuth } from '@/services/authService';
import type { User as FirebaseUser } from 'firebase/auth';

export function useAuth() {
    const user = ref<FirebaseUser | null>(null);
    let unsubscribe: () => void;

    onMounted(() => {
        unsubscribe = subscribeAuth(u => {
            user.value = u;
        });
    });
    onUnmounted(() => {
        if (unsubscribe) unsubscribe();
    });

    return { user };
}
