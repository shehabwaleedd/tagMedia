import axios from "axios";
import { toast } from "sonner";

export async function serverUseNews() {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/blog`);
        const data = res.data.data.result;
        return data;
        
    } catch (error: any) {
        toast.error("Error fetching tours:", error);
        return null;
    }
}
