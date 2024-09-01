import Separator from '@src/components/Separator';
import { UserDataType } from '@src/SidePanel';

type Props = {
  handleLogout: () => void;
  children: JSX.Element;
  userData: UserDataType | null
};

const Account = (props: Props) => {
  return (
    <div className="mx-4 sm:mx-auto py-6 min-h-screen flex gap-2 flex-col text-base">
      {props.children}
      <h1 className="font-semibold text-xl mt-3">Pengaturan Akun Anda</h1>
      <div className="mt-2"></div>
      <Separator />
      <div className="flex flex-col gap-3 font-medium mt-2">
        <h5>Nama: {props.userData?.name ?? '-'}</h5>
        <h5>Email: {props.userData?.email ?? '-'}</h5>
      </div>
      <div className="mt-3"></div>
      <Separator />
      <div className="mt-2"></div>
      <button onClick={props.handleLogout} className="bg-red-500 text-white font-medium p-2 rounded w-full hover:bg-red-600">
        Logout dari Bisabilitas
      </button>
    </div>
  );
};

export default Account;
