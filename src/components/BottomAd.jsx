import { useEffect, useRef } from 'react';

export default function BottomAd() {
  const adRef = useRef(null);

  useEffect(() => {
    try {
      if (window.adsbygoogle && adRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-2268924820751234"
      data-ad-slot="6876141711"
      data-ad-format="auto"
      data-full-width-responsive="true"
      ref={adRef}
    />
  );
}
