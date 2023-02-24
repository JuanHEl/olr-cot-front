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
        if (!token) return
        dispatch(getAuth())
    }, [])

    useEffect(() => {
        console.log({ pathname, isLogged })
        if (pathname != '/' && pathname != '/login' && !isLogged) {
            router.replace('/')
        }
        if ((pathname == '/login' || pathname == '/') && isLogged) {
            router.push('/cotizador')
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
