import axios from "axios";
import { saveAs } from "file-saver";

export const downloadFile = async (
  url: string,
  filename: string,
  params?: Record<string, string>,
): Promise<void> => {
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "blob",
      params,
    });

    saveAs(new Blob([response.data]), filename);
  } catch (error) {
    console.error("Download failed:", error);
    throw error;
  }
};
