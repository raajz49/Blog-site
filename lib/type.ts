export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author?: string;
  tags?: string[];
  likes?: number;
  comments?: { id: number; name: string; text: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface LogoutDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export interface ViewToggleProps {
  view: "card" | "table";
  setView: (v: "card" | "table") => void;
}
