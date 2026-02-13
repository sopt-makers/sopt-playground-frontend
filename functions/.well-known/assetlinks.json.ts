const ASSETLINKS_JSON = `[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "org.sopt.official",
      "sha256_cert_fingerprints": [
      "89:D9:B9:FA:59:2D:FE:43:5D:EA:80:E6:BF:88:16:2A:8B:2E:F4:1C:F4:29:B6:76:A3:2C:44:46:1D:12:B1:6E"
      ]
    }
  }
]`;

export const onRequest: PagesFunction = () => {
  return new Response(ASSETLINKS_JSON, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
