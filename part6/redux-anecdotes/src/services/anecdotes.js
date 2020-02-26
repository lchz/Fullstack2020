import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const createNew = async (content) => {
    const newAnec = { content, votes: 0 }
    const res = await axios.post(baseUrl, newAnec)
    return res.data
}

const newVote = async (anec) => {
    const changedAnecdote = { ...anec, votes: anec.votes + 1 }
    const res = await axios.put(`${baseUrl}/${anec.id}`, changedAnecdote)
    return res.data
}


export default { getAll, createNew, newVote }