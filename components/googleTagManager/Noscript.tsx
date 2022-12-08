const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function GoogleTagManagerNoscript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height='0'
        width='0'
        style={{ display: 'none', visibility: 'hidden' }}
      ></iframe>
    </noscript>
  );
}
