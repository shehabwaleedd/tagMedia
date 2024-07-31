import axios from "axios";
import { toast } from "sonner";
export async function serverFetchVariables() {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/variable`);
        const data = res.data
        return data
    } catch (error: any) {
        toast.error("Error fetching news:", error);
        throw error;
    }
}