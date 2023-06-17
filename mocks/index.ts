async function initMocks() {
  if (typeof window !== 'undefined') {
    const { worker } = await import('./browser');
    worker.start();
  }
}

initMocks();

export {};
