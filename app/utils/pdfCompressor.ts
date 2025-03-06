import { PDFDocument } from 'pdf-lib'

export async function compressPDF(file: File): Promise<Blob> {
    // Ler o arquivo como ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()

    // Carregar o PDF
    const pdfDoc = await PDFDocument.load(arrayBuffer)

    // Comprimir o PDF com configurações otimizadas
    const compressedPdfBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false
    })

    // Converter o PDF comprimido em Blob
    return new Blob([compressedPdfBytes], { type: 'application/pdf' })
} 