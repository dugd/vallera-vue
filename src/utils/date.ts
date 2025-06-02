export function formatDateUA(iso: string): string {
    if (!iso) return '';
    try {
        return new Date(iso).toLocaleDateString("uk-UA", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    } catch {
        return iso;
    }
}
