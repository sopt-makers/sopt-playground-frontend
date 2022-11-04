const PATH_KEY = 'lastUnauthorizedPath';

const useLastUnauthorized = () => {
  return {
    setPath(path: string) {
      sessionStorage.setItem(PATH_KEY, path);
    },
    popPath() {
      const path = sessionStorage.getItem(PATH_KEY);
      sessionStorage.removeItem(PATH_KEY);
      return path;
    },
  };
};

export default useLastUnauthorized;
