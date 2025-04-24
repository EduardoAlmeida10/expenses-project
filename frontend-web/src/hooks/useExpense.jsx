'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

const url = 'http://localhost:3000/api/expenses'

export default function useExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(url)
      .then(res => setExpenses(res.data))
      .catch(err => console.error('Erro ao buscar despesas:', err))
      .finally(() => setLoading(false));
  }, []);

  return { expenses, loading };
}