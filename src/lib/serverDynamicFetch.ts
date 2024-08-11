import axios from "axios";
export async function serverDynamicFetch(query: string) {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/${query}`);
        const data = res.data.data

        return data
    } catch (error: any) {
        console.error("Error fetching data:", error.message);
        return null;
    }
}
