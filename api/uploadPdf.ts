import supabase from "@/app/lib/supabase";

export const uploadPdf = async (file: File): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const { data, error } = await supabase.storage
      .from('PDFs')
      .upload(fileName, file);

    if (error) {
      throw error;
    }

    return fileName;
  } catch (error) {
    console.error('Error uploading the file: ', error);
    return null;
  }
};
