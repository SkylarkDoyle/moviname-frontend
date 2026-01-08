import { useEffect, useRef } from "react";

const AdBanner = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear previous content to prevent duplicates
    container.innerHTML = "";

    // Create iframe to isolate the ad script
    const iframe = document.createElement("iframe");
    iframe.style.width = "728px";
    iframe.style.height = "90px";
    iframe.style.border = "none";
    iframe.style.overflow = "hidden";
    iframe.title = "Advertisement";

    // Construct the ad content
    const adContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>body { margin: 0; padding: 0; background: transparent; display: flex; justify-content: center; }</style>
      </head>
      <body>
        <script type="text/javascript">
          atOptions = {
            'key' : 'ea0f3c310ee5465d3dd692ac9b8918b4',
            'format' : 'iframe',
            'height' : 90,
            'width' : 728,
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="https://www.highperformanceformat.com/ea0f3c310ee5465d3dd692ac9b8918b4/invoke.js"></script>
      </body>
      </html>
    `;

    container.appendChild(iframe);

    try {
      const doc = iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(adContent);
        doc.close();
      }
    } catch (e) {
      console.error("Error loading ad banner:", e);
    }
  }, []);

  return (
    <div className="w-full flex justify-center mb-8">
      {/* 
         Scaling strategy for responsiveness:
         - Mobile (<640px): Scale to 0.42 (approx 300px width)
         - Tablet (>640px): Scale to 0.75 (approx 546px width)
         - Desktop (>768px): No scale (728px width)
      */}
      <div className="relative h-[90px] w-[728px] origin-center transform scale-[0.42] sm:scale-75 md:scale-100 transition-transform duration-300">
        <div ref={containerRef} className="w-[728px] h-[90px]" />
      </div>
    </div>
  );
};

export default AdBanner;
