export async function serverDynamicFetch(query: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${query}`, { next: { revalidate: 3600 } });
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        return data.data;
    } catch (error: any) {
        console.error("Error fetching data:", error.message);
        return null;
    }
}