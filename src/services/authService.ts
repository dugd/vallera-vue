import { auth, db } from './firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import type { UserProfile } from '@/types';

export async function register(
    email: string,
    password: string,
    displayName: string
): Promise<FirebaseUser> {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const fbUser = cred.user;
    await updateProfile(fbUser, { displayName });
    const profileData: UserProfile = {
        uid: fbUser.uid,
        email: fbUser.email || '',
        displayName,
        avatarUrl: ''
    };
    await setDoc(doc(db, 'users', fbUser.uid), profileData);
    return fbUser;
}

export function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
    return signOut(auth);
}

export function subscribeAuth(
    callback: (user: FirebaseUser | null) => void
) {
    return onAuthStateChanged(auth, callback);
}

export async function fetchUserProfile(uid: string): Promise<UserProfile | null> {
    const snap = await getDoc(doc(db, 'users', uid));
    return snap.exists() ? (snap.data() as UserProfile) : null;
}
