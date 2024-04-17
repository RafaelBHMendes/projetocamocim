import supabase from "@/app/lib/supabase";

export const getPdfUrl = async (filePath: string): Promise<string> => {
  const { data } = supabase.storage
    .from('PDFs')
    .getPublicUrl(filePath);

  if (!data) {
    throw data;
  }

  return data.publicUrl || '';
};
