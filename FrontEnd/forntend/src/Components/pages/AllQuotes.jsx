import React, { Fragment, useEffect, useState } from 'react'
import Quote from '../Quote/Quote';
import API_ENDPOINTS from '../../config/api';

function AllQuotes() {
    // api call -> sideeffect
    let [quotes, setQuotes] = useState([])
    let [error, setError] = useState(null)
    let [loading, setLoading] = useState(true)

    async function getQuotes() {
        try {
            setLoading(true)
            setError(null)
            let resp = await fetch(API_ENDPOINTS.ALL_QUOTES);
            if (!resp.ok) {
                throw new Error(`Failed to fetch quotes: ${resp.statusText}`);
            }
            let data = await resp.json();
            setQuotes(data);
        } catch (err) {
            console.error('Error fetching quotes:', err);
            setError(err.message || 'Failed to load quotes');
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getQuotes()
    }, [])

    if (loading) {
        return <div style={{ padding: '20px', textAlign: 'center' }}>Loading quotes...</div>
    }

    if (error) {
        return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>
    }

    return (
        <Fragment>
            <div style={{ padding: '20px' }}>
                <h1>All Quotes</h1>
                {quotes.length === 0 ? (
                    <p>No quotes available. Start by adding one!</p>
                ) : (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {
                            quotes.map((quote) => {
                                return (<Quote key={quote._id} author={quote.author} text={quote.text} id={quote._id} />)
                            })
                        }
                    </ul>
                )}
            </div>
        </Fragment>
    )
}

export default AllQuotes