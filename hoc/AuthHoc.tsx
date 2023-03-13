import React, { FC, PropsWithChildren, use, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { RootState, AppDispatch } from "../store/index";
import { getAuth } from "../store/slices/authSlice";
import { ProtectedPageTypes } from "../interfaces/dataInterfaces";

type Props = {} & PropsWithChildren;

export const AuthHoc: FC<ProtectedPageTypes<Props>> = ({
  children,
  restricted,
  userAllowed,
}) => {
  const router = useRouter();
  const { pathname } = router;
  const dispatch = useDispatch<AppDispatch>();

  const { isLogged, authorization } = useSelector(
    (state: RootState) => state.auth
  );

  console.log(JSON.stringify({ restricted, userAllowed }, null, 3));

  console.log({ pathname });
  useEffect(() => {
    const token_ = getCookie("TOKEN");
    if (!token_) return;
    dispatch(getAuth());
  }, []);

  useEffect(() => {
    if (!isLogged && pathname != "/login") router.replace("/login");
    if (isLogged && pathname == "/login") router.push("/");
    if (isLogged && restricted && userAllowed && userAllowed.length > 0) {
      if (!userAllowed.includes(authorization)) router.replace("/unauthorized");
    }
    // if (
    //   (pathname == "/login" ||
    //     pathname == "/" ||
    //     pathname == "administrador") &&
    //   isLogged &&
    //   authorization === "Promotor"
    // ) {
    //   router.push("/");
    //   // authorization === 'Administrador' ? router.replace('/administrador') : authorization === 'Promotor' ? router.replace('/cotizador') : authorization === 'Super_Administrador' && router.replace('/test')
    // }
    // if (
    //   (pathname == "/login" || pathname == "/" || pathname == "cotizador") &&
    //   isLogged &&
    //   authorization === "Administrador"
    // ) {
    //   router.push("/");
    //   // authorization === 'Administrador' ? router.replace('/administrador') : authorization === 'Promotor' ? router.replace('/cotizador') : authorization === 'Super_Administrador' && router.replace('/test')
    // }
  }, [pathname, isLogged]);

  return <>{children}</>;
};
