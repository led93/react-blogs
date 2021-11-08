import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        fetch(url, { signal: abortController.signal })
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch the data for that resource')
                }
                return res.json();
            })
            .then((data) => {
                setError(null);
                setIsPending(false);
                setData(data);
            })
            .catch((err) => {
                if (!err.name === 'AbortError') {
                    setIsPending(false);
                    setError(err.message);
                }
            })
        return () => abortController.abort();
    }, [url]);

    return { data, isPending, error };
}

export default useFetch;