const APPLE_APP_SITE_ASSOCIATION = `{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "95YWTT5L8K.com.sopt-stamp-iOS.release",
        "paths": ["*"]
      }
    ]
  }
}`;

export const onRequest: PagesFunction = () => {
  return new Response(APPLE_APP_SITE_ASSOCIATION, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
