import React, { useState, useEffect } from 'react'
import axios from 'axios'

export interface DataType {
    name: string;
    image: {
        url: string;
    };
    position?: string;
}

const useDynamicFetchClient = (query: string) => {
    const [data, setData] = useState<DataType[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/${query}`);
                setData(response.data.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch data');
                setLoading(false);
            }
        };
        fetchData();
    }, [query]);


    return { data, error, loading };
}

export default useDynamicFetchClient