const ASSETLINKS_JSON = `[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "org.sopt.official",
      "sha256_cert_fingerprints": [
      "29:23:1F:E3:7A:FD:76:9C:58:CA:F3:E2:D9:7C:A1:69:CF:04:A8:6E:5B:8A:C6:56:6A:6F:E8:FD:D8:FF:47:43",
      "30:8A:35:1F:E1:88:94:6F:BC:E9:B2:D5:FC:2F:9B:F2:10:35:2A:43:B8:36:03:8B:C4:1B:EA:51:23:76:1C:00"
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
