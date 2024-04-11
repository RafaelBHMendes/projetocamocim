const axios = require('axios');

const SUPABASE_URL = 'https://uklugywieamjgkfcpryu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrbHVneXdpZWFtamdrZmNwcnl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4NDAxMTksImV4cCI6MjAyODQxNjExOX0.diDlKMb5-LZ9EeVbfkuWy1OjufSJjMs3zdf44mNgOAw';

const getDadosDaTabela = async () => {
  try {
    const response = await axios.get(`${SUPABASE_URL}/Bidding`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao obter dados da tabela:', error);
    throw error;
  }
};

getDadosDaTabela().then(data => console.log(data)).catch(error => console.error(error));
