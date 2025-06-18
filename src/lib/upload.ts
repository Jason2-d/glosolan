type UploadResponse = {
  success: boolean;
  imageUrl: string;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
  error?: string;
};

export async function uploadCoverImage(
  file: File,
  userId: string
): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append('coverImage', file);
  formData.append('userId', userId);

  try {
    const response = await fetch('/api/users/upload-cover', {
      method: 'POST',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Upload failed');
    }

    return data;
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      imageUrl: '',
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
}