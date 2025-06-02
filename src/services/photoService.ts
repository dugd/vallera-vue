import {auth, db, storage} from './firebase';
import {
    collection,
    addDoc,
    doc,
    getDocs,
    getDoc,
    query,
    where,
    orderBy,
    updateDoc,
    deleteDoc,
    serverTimestamp
} from 'firebase/firestore';
import {
    ref as storageRef,
    uploadBytes,
    getDownloadURL,
    deleteObject
} from 'firebase/storage';
import type {Photo} from '@/types';


export async function createPhoto(file: File, title: string): Promise<string> {
    const user = auth.currentUser;
    if (!user) throw new Error('Неавторизований користувач');

    const uid = user.uid;
    const path = `photos/${uid}_${Date.now()}`;
    const stRef = storageRef(storage, path);

    await uploadBytes(stRef, file);
    const url = await getDownloadURL(stRef);

    const docRef = await addDoc(collection(db, 'photos'), {
        url,
        path,
        authorUid: uid,
        authorName: user.displayName || user.email,
        date: serverTimestamp(),
        title
    });

    return docRef.id;
}


export async function fetchAllPhotos(): Promise<Photo[]> {
    const q = query(collection(db, 'photos'), orderBy('date', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => {
        const data = d.data() as any;
        return {
            id: d.id,
            url: data.url,
            path: data.path,
            authorUid: data.authorUid,
            authorName: data.authorName,
            date: data.date?.toDate().toISOString() || new Date().toISOString(),
            title: data.title || ''
        };
    });
}


export async function fetchPhotoById(id: string): Promise<Photo | null> {
    const snap = await getDoc(doc(db, 'photos', id));
    if (!snap.exists()) return null;
    const data = snap.data() as any;
    return {
        id: snap.id,
        url: data.url,
        path: data.path,
        authorUid: data.authorUid,
        authorName: data.authorName,
        date: data.date?.toDate().toISOString() || new Date().toISOString(),
        title: data.title || ''
    };
}


export async function updatePhoto(
    id: string,
    newData: Partial<{ title: string }>
): Promise<void> {
    await updateDoc(doc(db, 'photos', id), newData);
}


export async function deletePhoto(id: string, path: string): Promise<void> {
    const fileRef = storageRef(storage, path);
    await deleteObject(fileRef);
    await deleteDoc(doc(db, 'photos', id));
}


export async function fetchMyPhotos(): Promise<Photo[]> {
    const user = auth.currentUser;
    if (!user) return [];
    const uid = user.uid;
    const q = query(
        collection(db, 'photos'),
        where('authorUid', '==', uid),
        orderBy('date', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => {
        const data = d.data() as any;
        return {
            id: d.id,
            url: data.url,
            path: data.path,
            authorUid: data.authorUid,
            authorName: data.authorName,
            date: data.date?.toDate().toISOString() || new Date().toISOString(),
            title: data.title || ''
        };
    });
}
