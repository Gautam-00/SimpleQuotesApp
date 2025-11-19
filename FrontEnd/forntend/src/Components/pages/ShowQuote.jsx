import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import API_ENDPOINTS from '../../config/api';

function ShowQuote() {
    let [quote, setQuote] = useState({ author: "", text: "" })
    let [error, setError] = useState(null)
    let [loading, setLoading] = useState(true)

    const params = useParams();

    // fetch id
    async function fetchQuotes() {
        try {
            setLoading(true)
            setError(null)
            let resp = await axios.get(API_ENDPOINTS.GET_QUOTE(params.id));
            let { text, author } = resp.data;
            setQuote({ text, author });
        } catch (err) {
            console.error('Error fetching quote:', err);
            setError(err.response?.data?.error || 'Failed to load quote');
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchQuotes();
    }, [params.id])

    if (loading) {
        return <div style={{ padding: '20px', textAlign: 'center' }}>Loading quote...</div>
    }

    if (error) {
        return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>{quote.author}</h1>
            <h2>{quote.text}</h2>
        </div>
    )
}

export default ShowQuote