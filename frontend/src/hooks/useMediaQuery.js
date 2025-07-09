import { useState, useEffect } from 'react';

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    try {
      media.addEventListener('change', listener);
    } catch (e) {
      media.addListener(listener);
    }
    
    return () => {
      try {
        media.removeEventListener('change', listener);
      } catch (e) {
        media.removeListener(listener);
      }
    };
  }, [matches, query]);

  return matches;
};

export default useMediaQuery;