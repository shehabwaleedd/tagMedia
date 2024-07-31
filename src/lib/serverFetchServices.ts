import axios from "axios";
import { toast } from "sonner";

export default async function serverFetchServices() {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/service`);
        const data = res.data.data
        return data
    } catch (error: any) {
        toast.error("Error fetching news:", error);
        throw error;
    }
}