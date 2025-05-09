'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Expense } from '@/types';

//const url = 'https://expenses-project-4erz.onrender.com/api/expenses'
const url = 'http://localhost:5000/api/expenses';

export default function useFetchExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(url)
      .then(res => setExpenses(res.data))
      .catch(err => console.error('Erro ao buscar despesas:', err))
      .finally(() => setLoading(false));
  }, [expenses]);

  return { expenses, loading };
}