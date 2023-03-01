import React, { FC, PropsWithChildren, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { RootState, AppDispatch } from '../store/index';
import { getAuth } from '../store/slices/authSlice';

type Props = {} & PropsWithChildren

export const AuthHoc: FC<Props> = ({ children }) => {
    const router = useRouter()
    const { pathname } = router
    const dispatch = useDispatch<AppDispatch>()
    const token = getCookie('TOKEN')

    const { isLogged, authorization } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        const token_ = getCookie('TOKEN')
        if (!token_) return
        dispatch(getAuth())
    }, [])

    useEffect(() => {
        console.log({ pathname, isLogged, authorization })
        if (pathname != '/' && pathname != '/login' && !isLogged) {
            router.replace('/login')
        }
        if ((pathname == '/login' || pathname == '/' || pathname=='administrador') && isLogged && authorization==='Promotor') {
            router.push('/cotizador')
            // authorization === 'Administrador' ? router.replace('/administrador') : authorization === 'Promotor' ? router.replace('/cotizador') : authorization === 'Super_Administrador' && router.replace('/test')
        }
        if ((pathname == '/login' || pathname == '/' || pathname=='cotizador') && isLogged && authorization==='Administrador') {
            router.push('/administrador')
            // authorization === 'Administrador' ? router.replace('/administrador') : authorization === 'Promotor' ? router.replace('/cotizador') : authorization === 'Super_Administrador' && router.replace('/test')
        }
    }, [
        pathname,
        isLogged
    ])

    return (
        <>
            {children}
        </>
    )
}
