export interface Bid {
    id?: number;  // opcional porque não é necessário ao criar um novo bid
    processNumber: string;
    object: string;
    date: string;
    opening: 'Aberta' | 'Fechada';  // assegura que o tipo seja um desses dois valores
  }
  