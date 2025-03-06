export interface BiddingDocument {
  id?: number;
  fileName: string;
  fileUrl: string;
  fileType: string;
  uploadedAt?: string;
}

export interface Bid {
  id?: number;  // opcional porque não é necessário ao criar um novo bid
  processNumber: string;
  object: string;
  publicationDate: string;
  dispenseDate: string;
  opening: 'Aberta' | 'Fechada' | 'Adiado' | 'Anulado';
  file?: string;
  Url?: string;
  modality: "Pregão" | "Concurso" | "Credenciamento" | "Dispensa" | "Concorrência";
  postponement?: string;
  canceled?: boolean;
  documents?: BiddingDocument[];
}
