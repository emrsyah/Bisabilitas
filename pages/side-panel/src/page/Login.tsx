import Separator from '@src/components/Separator';
import React, { Dispatch, SetStateAction } from 'react';

export type LoginFormType = {
    email: string;
    password: string;
};  

type Props = {
    handleLogin: (ev: React.FormEvent<HTMLFormElement>) => void;
    children : JSX.Element
    loginData: LoginFormType
    setLoginData: React.Dispatch<React.SetStateAction<LoginFormType>>
    setMode: Dispatch<SetStateAction<"default" | "ai" | "account" | "login" | "register">>
};

const Login = (props: Props) => {
  return (
    <form onSubmit={props.handleLogin} className="mx-4 sm:mx-auto py-6 min-h-screen flex gap-2 flex-col">
      {/* <ButtonKembali /> */}
      {props.children}
      <h1 className="text-2xl font-bold text-blue-600">Masuk Bisabilitas</h1>
      <div className="mt-3"></div>
      <div className="flex flex-col items-start gap-1">
        <span className="text-lg font-medium">Email</span>
        <input
          value={props.loginData.email}
          onChange={e => {
            props.setLoginData(prev => ({ ...prev, email: e.target.value }));
          }}
          placeholder="nama@gmail.com"
          className="border-[1px] w-full text-base p-2 rounded border-gray-300"
          type="email"
        />
      </div>
      <div className="flex flex-col items-start gap-1">
        <span className="text-lg font-medium">Kata Sandi</span>
        <input
          value={props.loginData.password}
          onChange={e => {
            props.setLoginData(prev => ({ ...prev, password: e.target.value }));
          }}
          placeholder="masukkan kata sandi anda"
          className="border-[1px] w-full text-base p-2 rounded border-gray-300"
          type="password"
        />
      </div>
      <button type="submit" className="text-base bg-blue-600 text-white rounded p-1 w-full font-medium mt-1">
        Masuk Bisabilitas
      </button>
      <div className="mt-1"></div>
      <Separator />
      <span className="text-base font-medium text-gray-700 mt-1 flex items-center text-center">
        Belum punya akun?{' '}
        <button type="button" onClick={() => props.setMode('register')} className="text-blue-600 underline ml-1">
          Daftar
        </button>
      </span>
    </form>
  );
};

export default Login;
