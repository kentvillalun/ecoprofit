"use client";


import { API_BASE_URL } from "@/lib/config";
import { useState, useEffect } from "react";

export const useFetch = ({ url }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [isError, setIsError] = useState(false)
    const [data, setData] = useState(null)
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)

                const response = await fetch(`${API_BASE_URL}/${url}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                })

                const result = await response.json();

                if (!response.ok) {
                    setError("There is an error fetching data")
                    setIsError(true)
                    return;
                }

                setIsLoading(false)
                setData(result)
            } catch (error) {
                setIsError(true)
                setError("Fetching failed")
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [url])


    return {isLoading, isError, data, error}
};
