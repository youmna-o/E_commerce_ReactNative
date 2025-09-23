export type User = {
  email: String;
  name: String;
  phone: String;
  password: String;
  isLogIn: Boolean;
} | null;

export type UserContextType =
  | {
      user: User;
      setUser: React.Dispatch<React.SetStateAction<User>>;
      loading: boolean;
    }
  | undefined;


