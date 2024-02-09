import {useCallback, useEffect, useState} from "react";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Something went wrong!');

    return data;
}

export default function useHttp(url, config, initialData) {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const clearData = () => setData(initialData);

    const sendRequest = useCallback(
        async (data) => {
            setIsLoading(true);
            try {
                const responseData = await sendHttpRequest(url, {...config, body: data});
                setData(responseData);
            } catch (e) {
                setError(e.message || 'Something went wrong!');
                console.error(e);
            }
            setIsLoading(false);
        }, [url, config]);

    useEffect(() => {
        if (config && (config.method === 'GET' || !config.method) || !config) sendRequest();
    }, [sendRequest, config]);

    return {data, isLoading, error, sendRequest, clearData};
}