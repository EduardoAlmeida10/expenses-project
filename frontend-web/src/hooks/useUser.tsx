'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';

const url = 'http://localhost:3000/api/users'

export default function useUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(url)
            .then(res => setUsers(res.data))
            .catch(err => console.error('Erro ao buscar usuários:', err))
            .finally(() => setLoading(false));
    }, []);

    return { users, loading };
}