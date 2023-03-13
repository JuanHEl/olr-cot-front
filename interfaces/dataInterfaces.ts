import { roles } from "./storeInterfaces/sliceAdminInterface";

export interface dataInfo {
  nombre: string;
  tipo_administrador: roles;
  token: string;
}

export type ProtectedPageTypes<T = any> = {
  restricted?: boolean;
  userAllowed?: roles[];
} & T;
