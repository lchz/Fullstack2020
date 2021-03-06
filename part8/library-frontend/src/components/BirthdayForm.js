import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { EDIT_BORN, ALL_AUTHORS } from '../queries'


const BirthdayForm = ({ setMessage }) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const [authors, setAuthors] = useState([])

    const result = useQuery(ALL_AUTHORS)

    useEffect(() => {
        if (result.data) {
            setAuthors(result.data.allAuthors)
        }
    }, [result.data])


    const [changeBorn] = useMutation(
        EDIT_BORN,
        {
            refetchQueries: [{ query: ALL_AUTHORS }],
            onError: (error) => {
                setMessage({ type: 'red', content: error.graphQLErrors[0].message })
            }
        }
    )

    const handleSelect = (event) => {
        setName(event.target.value)
    }

    const submit = async (event) => {
        event.preventDefault()

        if (name) {
            changeBorn({ variables: { name, setBornTo: Number(born) } })
            setMessage({ type: 'green', content: `${name}'s birthday has been changed` })
        }

        setName('')
        setBorn('')
    }
    
    return (
        <div>
            <h2>Set birthday</h2>

            <form onSubmit={submit}>
                <div>
                    name
                    <select onChange={handleSelect}>
                        <option value='select'>select</option>

                        {authors.map(a =>
                            <option key={a.id} value={a.name}>
                                {a.name}
                            </option>
                        )}
                    </select>
                </div>

                <div>
                    birthday
                    <input type='number' value={born} onChange={({ target }) => setBorn(target.value)} />
                </div>

                <button type='submit'>update author</button>
            </form>
        </div>
    )
}


export default BirthdayForm