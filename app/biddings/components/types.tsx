export interface Bid {
  id?: number; // opcional porque não é necessário ao criar um novo bid
  processNumber: string;
  object: string;
  publicationDate: string;
  dispenseDate: string;
  opening: "Aberta" | "Fechada"; // assegura que o tipo seja um desses dois valores
  file?: string;
  Url: string;
  modality: "Pregão" | "Concurso" | "Credenciamento" | "Dispensa";
}
