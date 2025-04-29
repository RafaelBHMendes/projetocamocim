import { createClient } from '@/app/lib/server'
import { NextResponse } from 'next/server'

interface BiddingDocument {
    fileName: string
    fileUrl: string
    fileType?: string
}

export async function GET() {
    try {
        const supabase = createClient()
        const { data, error } = await supabase.from('bidding').select('*')

        if (error) throw error

        return NextResponse.json(data)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const supabase = createClient()
        const bid = await request.json()

        // Separa os documentos do objeto bid
        const { documents, ...biddingData } = bid

        // Primeiro, insere a licitação
        const { data: insertedBidding, error: biddingError } = await supabase
            .from('bidding')
            .insert([
                {
                    ...biddingData,
                    publicationDate: new Date(bid.publicationDate).toISOString(),
                    dispenseDate: new Date(bid.dispenseDate).toISOString()
                }
            ])
            .select()

        if (biddingError) throw biddingError

        // Se houver documentos e a licitação foi inserida com sucesso
        if (documents && documents.length > 0 && insertedBidding && insertedBidding.length > 0) {
            const biddingId = insertedBidding[0].id

            // Prepara os documentos para inserção
            const documentsToInsert = documents.map((doc: BiddingDocument) => ({
                bidding_id: biddingId,
                file_name: doc.fileName,
                file_url: doc.fileUrl,
                file_type: doc.fileType || 'edital',
                uploaded_at: new Date().toISOString()
            }))

            // Tenta inserir os documentos
            const { error: documentsError } = await supabase
                .from('bidding_document')
                .insert(documentsToInsert)

            if (documentsError) {
                // Se falhar ao inserir documentos, remove a licitação para manter consistência
                await supabase.from('bidding').delete().match({ id: biddingId })
                throw documentsError
            }
        }

        return NextResponse.json(insertedBidding?.[0])
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
} 