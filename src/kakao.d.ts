interface Kakao {
  init(appKey?: string): void;
  isInitialized(): boolean;
  Channel: {
    chat(params: { channelPublicId: string }): void;
  };
}

interface Window {
  Kakao: Kakao;
}
