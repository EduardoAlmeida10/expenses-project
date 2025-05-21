'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '@/types';

//const url = 'https://expenses-project-4erz.onrender.com/api/users'
const url = 'http://localhost:5000/api/users';

export default function useFetchUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(url)
            .then(res => setUsers(res.data))
            .catch(err => console.error('Erro ao buscar usuários:', err))
            .finally(() => setLoading(false));
    }, []);

    return { users, loading };
}