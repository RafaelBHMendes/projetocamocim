import supabase from "@/app/lib/supabase";

export async function getPdfUrl(filePath: string): Promise<string> {
  const { data } = supabase.storage
    .from('PDFs')
    .getPublicUrl(filePath);

  if (!data) {
    console.error('Error retrieving public URL');
    return '';
  }

  return data.publicUrl || '';
}