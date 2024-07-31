import axios from "axios";
import { toast } from "sonner";
export async function serverDynamicFetch(query: string) {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/${query}`);
        const data = res.data.data

        return data
    } catch (error: any) {
        toast.error("Error fetching news:", error);
        return null;
    }
}
