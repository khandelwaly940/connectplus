export const SESSION_STORAGE_KEY = 'connectplus_session';
export const GUEST_ROADMAP_STORAGE_KEY = 'connectplus_guest_roadmap';

export const readSession = () => {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
};

export const writeSession = (session) => {
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
};

export const clearSession = () => {
  localStorage.removeItem(SESSION_STORAGE_KEY);
};

