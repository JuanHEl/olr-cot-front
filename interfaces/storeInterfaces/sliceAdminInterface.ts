export interface tipoAdmin {
  isLogged: boolean;
  authorization: roles;
  nombre: string;
}

export type roles =
  | "Administrador"
  | "Promotor"
  | "Validador"
  | "Cliente"
  | null;
