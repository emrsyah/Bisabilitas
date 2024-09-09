import Separator from '@src/components/Separator';
import React, { Dispatch, SetStateAction } from 'react';

export type RegisterFormType = {
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
};

type Props = {
  handleRegister: (ev: React.FormEvent<HTMLFormElement>) => void;
  children: JSX.Element;
  registerData: RegisterFormType;
  setRegisterData: React.Dispatch<React.SetStateAction<RegisterFormType>>;
  setMode: Dispatch<SetStateAction<'default' | 'ai' | 'account' | 'login' | 'register'>>;
};

const Register = (props: Props) => {
  return (
    <form onSubmit={props.handleRegister} className="mx-4 sm:mx-auto py-6 min-h-screen flex gap-2 flex-col">
      {props.children}
      <h1 className="text-2xl font-bold text-yellow-800">Daftar Bisabilitas</h1>
      <div className="mt-3"></div>
      <div className="flex flex-col items-start gap-1">
        <span className="text-lg font-medium">Email</span>
        <input
          value={props.registerData.email}
          onChange={e => {
            props.setRegisterData(prev => ({ ...prev, email: e.target.value }));
          }}
          placeholder="nama@gmail.com"
          className="border-[1px] w-full text-base p-2 rounded border-gray-300"
          type="email"
        />
      </div>
      <div className="flex flex-col items-start gap-1">
        <span className="text-lg font-medium">Nama</span>
        <input
          value={props.registerData.name}
          onChange={e => {
            props.setRegisterData(prev => ({ ...prev, name: e.target.value }));
          }}
          placeholder="masukkan nama kamu"
          className="border-[1px] w-full text-base p-2 rounded border-gray-300"
          type="text"
        />
      </div>
      <div className="flex flex-col items-start gap-1">
        <span className="text-lg font-medium">Kata Sandi</span>
        <input
          value={props.registerData.password}
          onChange={e => {
            props.setRegisterData(prev => ({ ...prev, password: e.target.value }));
          }}
          placeholder="masukkan kata sandi anda"
          className="border-[1px] w-full text-base p-2 rounded border-gray-300"
          type="password"
        />
      </div>
      <div className="flex flex-col items-start gap-1">
        <span className="text-lg font-medium">Konfirmasi Kata Sandi</span>
        <input
          value={props.registerData.password_confirmation}
          onChange={e => {
            props.setRegisterData(prev => ({ ...prev, password_confirmation: e.target.value }));
          }}
          placeholder="konfirmasi kata sandi anda"
          className="border-[1px] w-full text-base p-2 rounded border-gray-300"
          type="password"
        />
      </div>
      <button type="submit" className="text-base bg-yellow-800 text-white rounded p-1 w-full font-medium mt-1">
        Daftar Bisabilitas
      </button>
      <div className="mt-1"></div>
      <Separator />
      <span className="text-base font-medium text-gray-700 mt-1 flex items-center text-center">
        Sudah punya akun?{' '}
        <button type="button" onClick={() => props.setMode('login')} className="text-yellow-800 underline ml-1">
          Masuk
        </button>
      </span>
      {/* <button onClick={googleLogin}>Login Google</button> */}
    </form>
  );
};

export default Register;
