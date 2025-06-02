import type { Photo } from '@/types';

export const MOCK_PHOTOS: Photo[] = [
    { id: '1', url: 'https://picsum.photos/400/600?random=1', author: 'Ivan',  date: '2025-05-28T10:00:00Z' },
    { id: '2', url: 'https://picsum.photos/400/300?random=2', author: 'Olena', date: '2025-05-29T14:20:00Z' },
    { id: '3', url: 'https://picsum.photos/400/500?random=3', author: 'Sergey', date: '2025-05-27T18:45:00Z' },
    { id: '4', url: 'https://picsum.photos/600/600?random=4', author: 'Ivan',  date: '2025-05-28T10:00:00Z' },
    { id: '5', url: 'https://picsum.photos/400/300?random=5', author: 'Olena', date: '2025-05-29T14:20:00Z' },
    { id: '6', url: 'https://picsum.photos/600/400?random=6', author: 'Sergey', date: '2025-05-27T18:45:00Z' },
    { id: '7', url: 'https://picsum.photos/400/300?random=7', author: 'Ivan',  date: '2025-05-28T10:00:00Z' },
    { id: '8', url: 'https://picsum.photos/400/300?random=8', author: 'Olena', date: '2025-05-29T14:20:00Z' },
    { id: '9', url: 'https://picsum.photos/600/500?random=9', author: 'Sergey', date: '2025-05-27T18:45:00Z' },
];

export function getMockPhotos(): Photo[] {
    return JSON.parse(JSON.stringify(MOCK_PHOTOS));
}
