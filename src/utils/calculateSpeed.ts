export const calculateSpeed = (loaded: any, total: any, startTime: any) => {
  const currentTime = Date.now();
  const timeElapsed = (currentTime - startTime) / 1000; // Convert to seconds
  const uploadedBytes = loaded;
  const speedBps = uploadedBytes / timeElapsed;
  return speedBps / 1024; // Convert to KB/s
};
