import supabase from "@/app/lib/supabase";

export async function uploadPdf(file: File): Promise<string | null> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `pdfs/${fileName}`;

  let { error, data } = await supabase.storage
    .from('PDFs')
    .upload(filePath, file);

  if (error) {
    console.error('Upload error:', error.message);
    return null;
  }

  return filePath;
}
