import { useEffect, useRef } from "react";

declare global {
  interface Window {
    twttr?: any;
  }
}

function loadTwitterScript(): Promise<void> {
  return new Promise((resolve) => {
    if (window.twttr?.widgets) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
}

export default function TwitterEmbed({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;

    loadTwitterScript().then(() => {
      if (!mounted || !ref.current) return;

      let constructUrl = url;
      if (url.split('/').find(v => v === "x.com")) {
        constructUrl = url.replace("x.com", "twitter.com");
      }


      ref.current.innerHTML = `
        <blockquote class="twitter-tweet">
          <a href="${constructUrl}"></a>
        </blockquote>
      `;

      window.twttr.widgets.load(ref.current);
    });

    return () => {
      mounted = false;
    };
  }, [url]);

  return <div ref={ref} />;
}
