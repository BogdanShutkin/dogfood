import { useEffect, useState } from "react"

export const useApi = (handler) => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsLoading(true);
        handler()
            .then ((result) => {
                setData(result)
            })
            .catch((err) => {
                setError(err)
            })
            .finally(() => {
                setIsLoading(false)
            })

    }, [handler])

    return {data, setData, isLoading, error}
}