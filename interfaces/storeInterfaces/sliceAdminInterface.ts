
export interface tipoAdmin{
    isLogged:boolean,
    authorization: roles,
    nombre:string
}

export type roles='Administrador' | 'Promotor' | 'Super_Administrador' | null
