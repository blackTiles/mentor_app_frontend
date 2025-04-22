import API from "@/lib/axios/instance";
import axios from "axios";

export const uploadFile = async (
  file: File,
  folder: string,
  setUploadingStatus: (status: string | number) => void
): Promise<string> => {
  // if (!AllowedFileTypes[purpose].includes(file.type)) {
  //   throw new Error("Invalid file type. Please upload a valid image file.");
  // }
  if (file.size > 30 * 1024 * 1024) {
    throw new Error("File size exceeds 30MB. Please upload a smaller file.");
  }
  try {
    const {
      data: { fileName, url, success },
    } = await API.post(`/utils/get-file-upload-url`, {
      fileType: file.type,
      folder,
    });
    if (!success) {
      throw new Error("Error getting upload URL.");
    }
    // const startTime = Date.now();
    await axios.put(url, file, {
      onUploadProgress: (progressEvent: any) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadingStatus(percentCompleted);
        // const speed = calculateSpeed(
        //   progressEvent.loaded,
        //   progressEvent.total,
        //   startTime
        // );
        // setUploadSpeed(speed);
      },
    });
    // setUploadingStatus(`Completed`);
    return fileName;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error?.message || "Error uploading file."
    );
  }
};
