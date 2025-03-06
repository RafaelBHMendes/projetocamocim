-- Create the bidding_document table
CREATE TABLE IF NOT EXISTS bidding_document (
    id SERIAL PRIMARY KEY,
    bidding_id INTEGER NOT NULL,
    file_name VARCHAR NOT NULL,
    file_url VARCHAR NOT NULL,
    file_type VARCHAR NOT NULL DEFAULT 'edital',
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_bidding
        FOREIGN KEY (bidding_id)
        REFERENCES bidding(id)
        ON DELETE CASCADE
);

-- Create an index on bidding_id for better performance
CREATE INDEX IF NOT EXISTS idx_bidding_document_bidding_id ON bidding_document(bidding_id);

-- Migrate existing files to the new table
INSERT INTO bidding_document (bidding_id, file_name, file_url, file_type)
SELECT 
    id as bidding_id,
    COALESCE(SUBSTRING(file FROM '[^/]+$'), 'documento.pdf') as file_name,
    file as file_url,
    'edital' as file_type
FROM bidding
WHERE file IS NOT NULL AND file != '';

-- Add a comment explaining the migration
COMMENT ON TABLE bidding_document IS 'Tabela para armazenar múltiplos documentos por licitação'; 