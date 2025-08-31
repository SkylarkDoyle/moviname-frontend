
export const extractVideoFrames = async (
    videoFile: File,
    frameCount: number = 4
  ): Promise<File[]> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.src = URL.createObjectURL(videoFile);
      video.crossOrigin = "anonymous";
      video.muted = true;

      video.onloadedmetadata = async () => {
        const duration = video.duration;
        const interval = duration / frameCount;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        const frames: File[] = [];

        let currentFrame = 0;

        const captureFrame = () => {
          video.currentTime = currentFrame * interval;
        };

        video.onseeked = () => {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          canvas.toBlob((blob) => {
            if (blob) {
              frames.push(new File([blob], `frame_${currentFrame + 1}.jpg`, { type: "image/jpeg" }));
            }
            currentFrame++;
            if (currentFrame < frameCount) {
              captureFrame();
            } else {
              resolve(frames);
            }
          }, "image/jpeg");
        };

        captureFrame();
      };

      video.onerror = (err) => reject(err);
    });
  };

 // ✅ Extract frames from GIF (take first N frames)
export const extractGifFrames = async (
    gifFile: File,
    frameCount: number = 4
  ): Promise<File[]> => {
    return new Promise((resolve) => {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(gifFile);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        canvas.width = img.width;
        canvas.height = img.height;

        const frames: File[] = [];

        // Simplified: capture same frame multiple times (basic fallback)
        for (let i = 0; i < frameCount; i++) {
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            if (blob) {
              frames.push(new File([blob], `gif_frame_${i + 1}.jpg`, { type: "image/jpeg" }));
              if (frames.length === frameCount) resolve(frames);
            }
          }, "image/jpeg");
        }
      };
    });
  };