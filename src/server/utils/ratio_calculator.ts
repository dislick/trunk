export const getFormattedRatio = (totalUploaded: number, totalDownloaded: number): string => {
  if (totalDownloaded === 0 && totalDownloaded === 0) {
    return '0';
  }
  if (totalDownloaded === 0) {
    return '∞';
  }

  return (Math.round(totalUploaded / totalDownloaded * 100) / 100).toFixed(2);
};
