/* Interface para estrutura básica de perfil do usuário */
export interface UserProfile {
  name: string;
  surname: string;
  age: number;
  institution: string;
  course: string;
  fileUri?: string;
}