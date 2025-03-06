export interface Bidding {
    id: number
    processNumber: string
    object: string
    publicationDate: string
    dispenseDate: string
    opening: string
    file: string | undefined
    Url: string
    modality: string
    postponement?: string
    canceled?: boolean
}

export interface BiddingDocument {
    id?: number
    fileName: string
    fileUrl: string
    fileType: string
    uploadedAt?: string
}

export interface FilterOptions {
    searchTerm: string
    dateRange: 'all' | '7days' | '30days' | '90days' | 'custom'
    startDate?: string
    endDate?: string
    status: 'all' | 'Aberta' | 'Fechada' | 'Adiado' | 'Anulado'
    modality: 'all' | 'Pregão' | 'Concurso' | 'Credenciamento' | 'Dispensa' | 'Concorrência'
    sortBy: 'date' | 'status' | 'modality'
    sortOrder: 'asc' | 'desc'
} 