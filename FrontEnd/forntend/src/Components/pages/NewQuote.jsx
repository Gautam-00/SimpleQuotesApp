import React, { Fragment, useRef, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import styles from './NewQuote.module.css'
import API_ENDPOINTS from '../../config/api';

function NewQuote() {

    const usernameInpRef = useRef();
    const quoteInpRef = useRef();
    let navigate = useNavigate()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const addQuoteHandler = async (e) => {
        e.preventDefault();
        let author = usernameInpRef.current.value;
        let text = quoteInpRef.current.value;
        
        try {
            setLoading(true)
            setError(null)
            let resp = await axios.post(API_ENDPOINTS.ADD_QUOTE, { author, text });
            usernameInpRef.current.value = '';
            quoteInpRef.current.value = '';
            navigate('/')
        }
        catch (e) {
            console.error("Error posting quote:", e)
            const errorMessage = e.response?.data?.error || "Failed to add quote";
            setError(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Fragment>
            <form onSubmit={addQuoteHandler} className={styles.form}>
                <h1>New Quote Form</h1>
                {error && <div style={{ color: 'red', marginBottom: '10px' }}>Error: {error}</div>}
                <div>
                    <label htmlFor="author">Author:</label>
                    <input 
                        type="text" 
                        id="author" 
                        ref={usernameInpRef} 
                        placeholder='Add author name'
                        required
                    />
                </div>
                <div>
                    <label htmlFor="quote">Quote:</label>
                    <textarea 
                        rows={4} 
                        cols={10} 
                        id="quote" 
                        ref={quoteInpRef} 
                        placeholder='Add author quote'
                        required
                    ></textarea>
                </div>
                <button disabled={loading}>{loading ? 'Adding...' : 'Add Quote'}</button>
            </form>
        </Fragment>
    )
}

export default NewQuote