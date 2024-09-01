import { withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';
import {
  RectangleGroupIcon,
  EyeIcon,
  ComputerDesktopIcon,
  SpeakerWaveIcon,
  NewspaperIcon,
  DocumentArrowUpIcon,
  PhotoIcon,
  ArrowsPointingOutIcon,
  BeakerIcon,
  ArrowPathIcon,
  LightBulbIcon,
  CursorArrowRaysIcon,
  ChevronLeftIcon,
  BoltIcon,
  Bars3BottomLeftIcon,
  UserIcon,
  RectangleStackIcon,
  Bars3BottomRightIcon,
  Bars3Icon,
  Bars4Icon,
  LifebuoyIcon,
} from '@heroicons/react/16/solid';
import {
  aiAssistantStorage,
  soundNavigationStorage,
  focusReadStorage,
  fontSizeStorage,
  dyslexicFontStorage,
  contrastStorage,
  hideImagesStorage,
  saturationStorage,
  textSpacingStorage,
  linkHighlightStorage,
  cursorBiggerStorage,
  textAlignmentStorage,
  tokenAuthStorage,
} from '@chrome-extension-boilerplate/storage';
import React from 'react';
import Separator from './components/Separator';
import Accordion from './components/Accordion';
// import Toggle from './components/Toggle';
import AccesibilityCard from './components/AccesibilityCard';
import AiChat from './AiChat';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { FullDisplayAccesibilityCard } from './components/FullDisplayAccesibilityCard';
import Login, { LoginFormType } from './page/Login';
import Register, { RegisterFormType } from './page/Register';
// import {  useStorageSuspense } from '@chrome-extension-boilerplate/shared';
// import { exampleThemeStorage, fontSizeStorage } from '@chrome-extension-boilerplate/storage';
// import { ComponentPropsWithoutRef } from 'react';

export type StateProps = {
  label: string;
  value: string;
};

export type AccesibilityCardProps = {
  title: string;
  desc: string;
  icon: JSX.Element;
  onClick?: () => void;
  state?: StateProps[];
  currentState?: string;
  normalState?: string;
  smallDisplay?: boolean;
};

const changeContrast = async () => {
  // alert("change contrast")
  await contrastStorage.toggle();
  // await exampleThemeStorage.set("dark")
};

const hideImage = async () => {
  await hideImagesStorage.toggle();
};

const toggleSaturation = async () => {
  await saturationStorage.toggle();
  // alert("toggle saturation")
  // await exampleThemeStorage.toggle()
};

const toggleTextSpacing = async () => {
  // alert('hi')
  await textSpacingStorage.toggle();
};

const toggleDyslexicFont = async () => {
  // alert('hi')
  await dyslexicFontStorage.toggle();
};

const toggleFontSize = async () => {
  await fontSizeStorage.toggle();
};

const toggleFocusRead = async () => {
  await focusReadStorage.toggle();
};

const activateSoundNavigation = async () => {
  await soundNavigationStorage.toggle();
};

const toggleHighlightLink = async () => {
  await linkHighlightStorage.toggle();
};

const toggleBiggerCursor = async () => {
  await cursorBiggerStorage.toggle();
};

const toggleTextAlignment = async () => {
  await textAlignmentStorage.toggle();
};

type ProfileState = null | 'cognitife' | 'visual-impaired' | 'dyslexic';

type AccesibilityProfileProps = {
  state: ProfileState;
  onTurnOn: () => void;
  onTurnOff: () => void;
  name: string;
};

const accesibilityProfileDatas: AccesibilityProfileProps[] = [
  {
    name: 'Keterbatasan Visual',
    state: 'visual-impaired',
    onTurnOn: async () => {
      await fontSizeStorage.set('large');
      await contrastStorage.set('high');
      await textSpacingStorage.set('wide');
    },
    onTurnOff: async () => {
      await fontSizeStorage.set('normal');
      await contrastStorage.set('normal');
      await textSpacingStorage.set('normal');
    },
  },
  {
    name: 'Kognitif',
    state: 'cognitife',
    onTurnOn: async () => {
      await focusReadStorage.set('enabled');
      await hideImagesStorage.set('enabled');
    },
    onTurnOff: async () => {
      await focusReadStorage.set('disabled');
      await hideImagesStorage.set('disabled');
    },
  },
  {
    name: 'Dysleksia',
    state: 'dyslexic',
    onTurnOn: async () => {
      await dyslexicFontStorage.set('openDyslexic');
      await textSpacingStorage.set('wide');
      await fontSizeStorage.set('large');
    },
    onTurnOff: async () => {
      await dyslexicFontStorage.set('default');
      await textSpacingStorage.set('normal');
      await fontSizeStorage.set('normal');
    },
  },
];

type UserDataType = {
  email: string;
  name: string;
  id: number;
};

const displayTypeData = ['minimalis', 'penuh'];

const SidePanel = () => {
  const [contrast, setContrast] = React.useState(contrastStorage.getSnapshot());
  const [textSpacing, setTextSpacing] = React.useState(textSpacingStorage.getSnapshot());
  const [dyslexic, setDyslexic] = React.useState(dyslexicFontStorage.getSnapshot());
  const [fontSize, setFontSize] = React.useState(fontSizeStorage.getSnapshot());
  const [hideImageState, setHideImageState] = React.useState(hideImagesStorage.getSnapshot());
  const [saturation, setSaturation] = React.useState(saturationStorage.getSnapshot());
  const [soundNavigation, setSoundNavigation] = React.useState(soundNavigationStorage.getSnapshot());
  const [focusRead, setFocusRead] = React.useState(focusReadStorage.getSnapshot());
  const [aiAssistant, setAiAssistant] = React.useState(aiAssistantStorage.getSnapshot());
  const [highlightLink, setHighlightLink] = React.useState(linkHighlightStorage.getSnapshot());
  const [biggerCursor, setBiggerCursor] = React.useState(cursorBiggerStorage.getSnapshot());
  const [textAlignment, setTextAlignment] = React.useState(textAlignmentStorage.getSnapshot());

  const [userToken, setUserToken] = React.useState<string | null>(tokenAuthStorage.getSnapshot());

  const [loginData, setLoginData] = React.useState<LoginFormType>({
    email: '',
    password: '',
  });

  const [registerData, setRegisterData] = React.useState<RegisterFormType>({
    email: '',
    name: '',
    password: '',
    password_confirmation: '',
  });

  const [mode, setMode] = React.useState<'ai' | 'default' | 'account' | 'login' | 'register'>('default');

  const [displayType, setDisplayType] = React.useState<'minimalis' | 'penuh'>('minimalis');
  const [smallDisplay, setSmallDisplay] = React.useState(false);
  const [accesibilityProfile, setAccesibilityProfile] = React.useState<ProfileState>(null);

  const [userData, setUserData] = React.useState<UserDataType | null>(null);

  React.useEffect(() => {
    textAlignmentStorage.subscribe(() => {
      setTextAlignment(textAlignmentStorage.getSnapshot());
    });
    contrastStorage.subscribe(() => {
      setContrast(contrastStorage.getSnapshot());
    });
    textSpacingStorage.subscribe(() => {
      setTextSpacing(textSpacingStorage.getSnapshot());
    });
    dyslexicFontStorage.subscribe(() => {
      setDyslexic(dyslexicFontStorage.getSnapshot());
    });
    fontSizeStorage.subscribe(() => {
      setFontSize(fontSizeStorage.getSnapshot());
    });
    hideImagesStorage.subscribe(() => {
      setHideImageState(hideImagesStorage.getSnapshot());
    });
    saturationStorage.subscribe(() => {
      setSaturation(saturationStorage.getSnapshot());
    });
    soundNavigationStorage.subscribe(() => {
      setSoundNavigation(soundNavigationStorage.getSnapshot());
    });
    focusReadStorage.subscribe(() => {
      setFocusRead(focusReadStorage.getSnapshot());
    });
    aiAssistantStorage.subscribe(() => {
      setAiAssistant(aiAssistantStorage.getSnapshot());
    });
    linkHighlightStorage.subscribe(() => {
      setHighlightLink(linkHighlightStorage.getSnapshot());
    });
    cursorBiggerStorage.subscribe(() => {
      setBiggerCursor(cursorBiggerStorage.getSnapshot());
    });
    tokenAuthStorage.subscribe(() => {
      setUserToken(tokenAuthStorage.getSnapshot());
    });
    // console.log("testo")
  }, []);

  // const theme = useStorageSuspense(exampleThemeStorage);
  // const fontSize = useStorageSuspense(fontSizeStorage);

  const accesibilityData: AccesibilityCardProps[] = [
    {
      title: 'Pengaturan Kontras',
      desc: 'Bantu penyandang disabilitas penglihatan dengan kontras warna optimal',
      icon: <EyeIcon className="h-6 w-6" />,
      onClick: changeContrast,
      currentState: contrast ? contrast : 'normal',
      normalState: 'normal',
      state: [
        {
          label: 'Pengaturan Kontras',
          value: 'normal',
        },
        {
          label: 'Kontras Rendah',
          value: 'low',
        },
        {
          label: 'Kontras Sedang',
          value: 'medium',
        },
        {
          label: 'Kontras Tinggi',
          value: 'high',
        },
      ],
    },
    {
      title: 'Fokus Membaca',
      desc: 'Tingkatkan konsentrasi penyandang disabilitas kognitif saat membaca.',
      icon: <ComputerDesktopIcon className="h-6 w-6" />,
      onClick: toggleFocusRead,
      currentState: focusRead ? focusRead : 'disabled',
      normalState: 'disabled',
      state: [
        {
          label: 'Fokus Membaca',
          value: 'disabled',
        },
        {
          label: 'Matikan Fokus Membaca',
          value: 'enabled',
        },
      ],
    },
    {
      title: 'Navigasi Suara',
      desc: 'Berdayakan penyandang disabilitas motorik menjelajah web dengan suara.',
      icon: <SpeakerWaveIcon className="h-6 w-6" />,
      onClick: activateSoundNavigation,
      currentState: soundNavigation ? soundNavigation : 'disabled',
      normalState: 'disabled',
      state: [
        {
          label: 'Navigasi Suara',
          value: 'disabled',
        },
        {
          label: 'Matikan Navigasi Suara',
          value: 'enabled',
        },
      ],
    },
    {
      title: 'Dyslexia Friendly',
      desc: 'Dukung penyandang disleksia dengan teks yang lebih mudah dibaca.',
      icon: <NewspaperIcon className="h-6 w-6" />,
      onClick: toggleDyslexicFont,
      currentState: dyslexic ? dyslexic : 'default',
      normalState: 'default',
      state: [
        {
          label: 'Dyslexia Friendly',
          value: 'default',
        },
        {
          label: 'Dyslexia Friendly On',
          value: 'openDyslexic',
        },
      ],
    },
    {
      title: 'Pembesar Teks',
      desc: 'Perbesar teks bagi penyandang disabilitas penglihatan tanpa merusak layout.',
      icon: <DocumentArrowUpIcon className="h-6 w-6" />,
      onClick: toggleFontSize,
      currentState: fontSize ? fontSize : 'normal',
      normalState: 'normal',
      state: [
        {
          label: 'Pembesar Teks',
          value: 'normal',
        },
        {
          label: 'Pembesar Teks Medium',
          value: 'medium',
        },
        {
          label: 'Pembesar Teks Besar',
          value: 'large',
        },
        {
          label: 'Pembesar Teks Ekstra Besar',
          value: 'extra-large',
        },
      ],
    },
    {
      title: 'Sembunyikan Gambar',
      desc: 'Bantu penyandang disabilitas fokus dengan menyederhanakan tampilan.',
      icon: <PhotoIcon className="h-6 w-6" />,
      onClick: hideImage,
      currentState: hideImageState ? hideImageState : 'disabled',
      normalState: 'disabled',
      state: [
        {
          label: 'Sembunyikan Gambar',
          value: 'disabled',
        },
        {
          label: 'Munculkan Gambar',
          value: 'enabled',
        },
      ],
    },
    {
      title: 'Jarak Teks',
      desc: 'Sesuaikan spasi teks untuk kenyamanan penyandang disabilitas visual.',
      icon: <ArrowsPointingOutIcon className="h-6 w-6" />,
      onClick: toggleTextSpacing,
      currentState: textSpacing ? textSpacing : 'normal',
      normalState: 'normal',
      state: [
        {
          label: 'Jarak Teks',
          value: 'normal',
        },
        {
          label: 'Jarak Sangat Lebar',
          value: 'extra-wide',
        },
        {
          label: 'Jarak Lebar',
          value: 'wide',
        },
        {
          label: 'Jarak Medium',
          value: 'medium',
        },
      ],
    },
    {
      title: 'Pengatur Saturasi',
      desc: 'Atur warna sesuai kebutuhan penyandang disabilitas sensitif cahaya.',
      icon: <BeakerIcon className="h-6 w-6" />,
      onClick: toggleSaturation,
      currentState: saturation ? saturation : 'normal',
      normalState: 'normal',
      state: [
        {
          label: 'Pengatur Saturasi',
          value: 'normal',
        },
        {
          label: 'Saturasi Rendah',
          value: 'low',
        },
        {
          label: 'Saturasi Tinggi',
          value: 'high',
        },
      ],
    },
    {
      title: 'Sorot Link',
      desc: 'Sorot link yang ada di website agar menjadi lebih jelas',
      icon: <LightBulbIcon className="h-6 w-6" />,
      normalState: 'disabled',
      onClick: toggleHighlightLink,
      state: [
        {
          label: 'Sorot Link',
          value: 'disabled',
        },
        {
          label: 'Matikan Sorot Link',
          value: 'enabled',
        },
      ],
      currentState: highlightLink ?? 'disabled',
    },
    {
      title: 'Cursor Besar',
      desc: 'Perbesar cursor yang kamu gunakan agar lebih mudah dalam melakukan navigasi',
      // icon: < className='h-6 w-6' />,
      icon: <CursorArrowRaysIcon className="h-6 w-6" />,
      normalState: 'disabled',
      onClick: toggleBiggerCursor,
      state: [
        {
          label: 'Perbesar Cursor',
          value: 'disabled',
        },
        {
          label: 'Kembalikan Cursor',
          value: 'enabled',
        },
      ],
      currentState: biggerCursor ?? 'disabled',
    },
    {
      title: 'Rata Teks',
      desc: 'Ubah arah dan kerataan teks sesuai preferensi dan cara baca anda',
      // icon: < className='h-6 w-6' />,
      icon: <Bars3BottomLeftIcon className="h-6 w-6" />,
      normalState: 'normal',
      onClick: toggleTextAlignment,
      state: [
        {
          label: 'Teks Rata Normal',
          value: 'normal',
        },
        {
          label: 'Teks Rata Kiri',
          value: 'left',
        },
        {
          label: 'Teks Rata Kanan',
          value: 'right',
        },
        {
          label: 'Teks Rata Selaras',
          value: 'justify',
        },
        {
          label: 'Teks Rata Tengah',
          value: 'center',
        },
      ],
      currentState: textAlignment ?? 'normal',
    },
  ];

  const resetState = async () => {
    await contrastStorage.set('normal');
    await textSpacingStorage.set('normal');
    await dyslexicFontStorage.set('default');
    await fontSizeStorage.set('normal');
    await hideImagesStorage.set('disabled');
    await saturationStorage.set('normal');
    await soundNavigationStorage.set('disabled');
    await focusReadStorage.set('disabled');
    await aiAssistantStorage.set('disabled');
  };

  React.useEffect(() => {
    if (userToken === null) {
      return;
    }
    const getUserData = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_APP_BACKEND_URL + 'profile', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        if (res.data.code != 200) {
          alert(res.data.message);
          setMode('login');
          return;
        }
        const data = res.data.data;

        setUserData({
          email: data.email,
          name: data.name,
          id: data.id,
        });
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
    // console.log(import.meta.env)
  }, [userToken]);

  const queryClient = new QueryClient();

  const handleLogin = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    try {
      const res = await axios.post(import.meta.env.VITE_APP_BACKEND_URL + 'login', {
        email: loginData.email,
        password: loginData.password,
      });

      if (res.data.code != 200) {
        alert(res.data.message);
        return;
      }

      const token = res.data.data.token;

      setUserToken(token);
      await tokenAuthStorage.set(token);

      setLoginData({
        email: '',
        password: '',
      });

      setMode('default');
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegister = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (registerData.password !== registerData.password_confirmation) {
      alert('Password tidak sama');
      return;
    }
    try {
      const res = await axios.post(import.meta.env.VITE_APP_BACKEND_URL + 'register', {
        email: registerData.email,
        password: registerData.password,
        password_confirmation: registerData.password_confirmation,
        name: registerData.name,
      });

      if (res.data.code != 200) {
        alert(res.data.message);
        return;
      }

      const token = res.data.data.token;

      setUserToken(token);
      await tokenAuthStorage.set(token);

      setRegisterData({
        email: '',
        password: '',
        password_confirmation: '',
        name: '',
      });

      setMode('default');
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {
    if (userToken === null) {
      return;
    }
    setMode('default');
    await tokenAuthStorage.set(null);
    setUserToken(null);
    setUserData(null);
  };

  const ButtonKembali = () => (
    <button
      type="button"
      className="mb-2 text-blue-600 underline text-base font-medium text-start"
      onClick={() => setMode('default')}>
      Kembali
    </button>
  );

  if (mode === 'login')
    return (
      <Login handleLogin={handleLogin} loginData={loginData} setLoginData={setLoginData} setMode={setMode}>
        <ButtonKembali />
      </Login>
    );

  if (mode === 'register')
    return (
      <Register
        handleRegister={handleRegister}
        registerData={registerData}
        setRegisterData={setRegisterData}
        setMode={setMode}>
        <ButtonKembali />
      </Register>
    );

  if (mode === 'account')
    return (
      <div className="mx-4 sm:mx-auto py-6 min-h-screen flex gap-2 flex-col text-base">
        <ButtonKembali />

        <h1 className="font-semibold text-xl mt-3">Pengaturan Akun Anda</h1>
        <div className="mt-2"></div>
        <Separator />
        <div className="flex flex-col gap-3 font-medium mt-2">
          <h5>Nama: {userData?.name ?? '-'}</h5>
          <h5>Email: {userData?.email ?? '-'}</h5>
        </div>
        <div className="mt-3"></div>
        <Separator />
        <div className="mt-2"></div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white font-medium p-2 rounded w-full hover:bg-red-600">
          Logout dari Bisabilitas
        </button>
      </div>
    );

  return (
    <div>
      {mode === 'ai' ? (
        <main className="mx-4 sm:mx-auto py-6 min-h-screen flex gap-2 flex-col">
          <nav className="flex items-center gap-2">
            <button
              onClick={() => setMode('default')}
              className="rounded-md border-[2px] border-gray-100 p-2 flex items-center gap-1">
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <h1 className="font-medium text-base">Tanyakan AI Tentang Website Ini</h1>
          </nav>
          <Separator />
          <QueryClientProvider client={queryClient}>
            <AiChat />
          </QueryClientProvider>
        </main>
      ) : (
        <>
          <div className="bg-blue-900 text-white p-2">
            <nav className="mx-4 sm:mx-auto my-2 max-w-2xl flex items-center justify-between">
              <h1 className="font-semibold text-xl">Bisabilitas - X</h1>
              {/* <h1>{env}</h1> */}
              <button
                onClick={() => {
                  setMode(userToken !== null ? 'account' : 'login');
                }}
                className="w-8 text-black hover:bg-blue-100 h-8 rounded-md justify-center items-center flex bg-white ">
                <UserIcon className="w-8 h-8" />
                {/* <h1 className=" font-bold ">ID</h1> */}
              </button>
            </nav>
          </div>
          <main className="grid grid-cols-2 gap-4 mx-4 max-w-2xl sm:mx-auto sm:px-3 my-6">
            {/* Hilangin AI dulu */}
            <button
              onClick={() => setMode('ai')}
              className={`col-span-2 flex gap-2  items-center hover:border-blue-600 ${aiAssistant == 'enabled' ? 'bg-blue-600 text-white' : ' bg-white text-blue-600'} px-4 py-3 rounded-md border-[2px] border-gray-100`}>
              <BoltIcon className="h-6 w-6" />
              <h1 className="text-lg font-bold ">
                AI Assistant <span className="text-sm">(beta)</span>
              </h1>
            </button>
            <Separator />
            <div className="col-span-2">
              <Accordion title="Profil Aksesibilitas">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  {accesibilityProfileDatas.map(a => (
                    <button
                      key={a.name}
                      onClick={() => {
                        if (a.state == accesibilityProfile) {
                          setAccesibilityProfile(null);
                          a.onTurnOff();
                        } else {
                          setAccesibilityProfile(a.state);
                          if (accesibilityProfile != null) {
                            // Cari Yang Turn On dan kita matiin
                            const currentProfile = accesibilityProfileDatas.find(ac => ac.state == accesibilityProfile);
                            currentProfile?.onTurnOff();
                          }
                          // Nyalain yang sekarang
                          a.onTurnOn();
                        }
                      }}
                      className={`w-full cursor-pointer rounded text-start font-medium px-4 py-2 text-sm text-gray-700   ${a.state == accesibilityProfile ? 'bg-blue-600 text-white' : 'hover:bg-blue-100 hover:text-blue-900'}`}
                      role="menuitem">
                      {a.name}
                    </button>
                  ))}
                </div>
              </Accordion>
            </div>
            <Separator />
            <div className="col-span-2 flex items-center justify-between gap-2 w-full ">
              {displayTypeData.map(d => (
                <button
                  onClick={() => {
                    setDisplayType(d as 'minimalis' | 'penuh');
                  }}
                  key={d}
                  className={`flex items-center gap-2 flex-1 flex-grow border-gray-100 shadow border-[2px] rounded p-2 ${displayType == d ? ' border-blue-600 text-blue-600' : null} `}>
                  {d == 'minimalis' ? (
                    <RectangleGroupIcon className="h-6 w-6 p-1" />
                  ) : (
                    <RectangleStackIcon className="h-6 w-6 p-1" />
                  )}
                  <p className="font-semibold text-base text-start">Tampilan {d}</p>
                </button>
              ))}
            </div>
            <Separator />
            <div className="flex items-center justify-between col-span-2">
              {/* <h2 className="text-lg font-bold">Fitur Aksesibilitas</h2> */}
              <button
                className="p-2 flex items-center justify-center rounded border-[1.3px] text-gray-900 hover:border-blue-600 hover:text-blue-600 text-base gap-2 font-medium ml-auto"
                onClick={resetState}>
                <p>Atur ulang</p>
                <ArrowPathIcon className="h-4 w-4" />
              </button>
            </div>
            {displayType === 'minimalis' ? (
              <div className={`grid gap-4 ${smallDisplay ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-3'} col-span-2`}>
                {accesibilityData.map(d => (
                  <AccesibilityCard
                    smallDisplay={smallDisplay}
                    key={d.title}
                    desc={d.desc}
                    title={d.title}
                    icon={d.icon}
                    onClick={d.onClick}
                    state={d.state}
                    currentState={d.currentState}
                    normalState={d.normalState}
                  />
                ))}
              </div>
            ) : (
              <div className="col-span-2 flex flex-col gap-5">
                {/* 1. PENGATURAN KONTEN */}
                <div className=" grid grid-cols-2 gap-2">
                  <h2 className="font-semibold text-lg col-span-2">Pengaturan Konten</h2>
                  <FullDisplayAccesibilityCard
                    desc=""
                    onClick={toggleFocusRead}
                    currentState={accesibilityData.find(d => d.title === 'Fokus Membaca')?.currentState ?? ''}
                    wider
                    turnOnState={'enabled'}>
                    <ComputerDesktopIcon className="w-8 h-8" />
                    <p>Fokus Membaca</p>
                  </FullDisplayAccesibilityCard>
                  <FullDisplayAccesibilityCard
                    desc=""
                    onClick={toggleHighlightLink}
                    currentState={accesibilityData.find(d => d.title === 'Sorot Link')?.currentState ?? ''}
                    turnOnState={'enabled'}>
                    <LightBulbIcon className="w-8 h-8" />
                    <p>Sorot Link</p>
                  </FullDisplayAccesibilityCard>
                  <FullDisplayAccesibilityCard
                    desc=""
                    onClick={hideImage}
                    currentState={accesibilityData.find(d => d.title === 'Sembunyikan Gambar')?.currentState ?? ''}
                    turnOnState={'enabled'}>
                    <PhotoIcon className="w-8 h-8" />
                    <p>Sembunyikan Gambar</p>
                  </FullDisplayAccesibilityCard>
                  <FullDisplayAccesibilityCard
                    desc=""
                    onClick={async () => {
                      await textAlignmentStorage.set(textAlignment == 'left' ? 'normal' : 'left');
                    }}
                    currentState={accesibilityData.find(d => d.title === '')?.currentState ?? 'Rata Teks'}
                    turnOnState={'left'}>
                    <Bars3BottomLeftIcon className="w-8 h-8" />
                    <p>Teks Rata Kiri</p>
                  </FullDisplayAccesibilityCard>
                  <FullDisplayAccesibilityCard
                    desc=""
                    onClick={hideImage}
                    currentState={accesibilityData.find(d => d.title === '')?.currentState ?? 'Rata Teks'}
                    turnOnState={'right'}>
                    <Bars3BottomRightIcon className="w-8 h-8" />
                    <p>Teks Rata Kanan</p>
                  </FullDisplayAccesibilityCard>
                  <FullDisplayAccesibilityCard
                    desc=""
                    onClick={hideImage}
                    currentState={accesibilityData.find(d => d.title === '')?.currentState ?? 'Rata Teks'}
                    turnOnState={'center'}>
                    <Bars3Icon className="w-8 h-8" />
                    <p>Teks Rata Tengah</p>
                  </FullDisplayAccesibilityCard>
                  <FullDisplayAccesibilityCard
                    desc=""
                    onClick={hideImage}
                    currentState={accesibilityData.find(d => d.title === '')?.currentState ?? 'Rata Teks'}
                    turnOnState={'justify'}>
                    <Bars4Icon className="w-8 h-8" />
                    <p>Teks Rata Selaras</p>
                  </FullDisplayAccesibilityCard>
                </div>

                {/* 2. PENGATURAN WARNA */}
                <div className=" grid grid-cols-2 gap-2">
                  <h2 className="font-semibold text-lg col-span-2">Pengaturan Warna</h2>
                  <FullDisplayAccesibilityCard
                    desc=""
                    onClick={async () => {
                      if (contrast == 'high') {
                        await contrastStorage.set('normal');
                      } else {
                        await contrastStorage.set('high');
                      }
                    }}
                    currentState={accesibilityData.find(d => d.title === 'Pengaturan Kontras')?.currentState ?? ''}
                    turnOnState={'high'}>
                    <EyeIcon className="w-8 h-8" />
                    <p>Kontras Tinggi</p>
                  </FullDisplayAccesibilityCard>
                  <FullDisplayAccesibilityCard
                    desc=""
                    onClick={toggleHighlightLink}
                    currentState={accesibilityData.find(d => d.title === 'Pengaturan Monokrom')?.currentState ?? ''}
                    turnOnState={'enabled'}>
                    <LifebuoyIcon className="w-8 h-8" />
                    <p>Konten Monokrom</p>
                  </FullDisplayAccesibilityCard>
                  <FullDisplayAccesibilityCard
                    desc=""
                    onClick={async () => {
                      if (saturation == 'high') {
                        await saturationStorage.set('normal');
                      } else {
                        await saturationStorage.set('high');
                      }
                    }}
                    currentState={accesibilityData.find(d => d.title === 'Pengatur Saturasi')?.currentState ?? ''}
                    turnOnState={'high'}>
                    <BeakerIcon className="w-8 h-8" />
                    <p>Saturasi Tinggi</p>
                  </FullDisplayAccesibilityCard>
                  <FullDisplayAccesibilityCard
                    desc=""
                    onClick={async () => {
                      if (saturation == 'low') {
                        await saturationStorage.set('normal');
                      } else {
                        await saturationStorage.set('low');
                      }
                    }}
                    currentState={accesibilityData.find(d => d.title === 'Pengatur Saturasi')?.currentState ?? ''}
                    turnOnState={'low'}>
                    <BeakerIcon className="w-8 h-8" />
                    <p>Saturasi Rendah</p>
                  </FullDisplayAccesibilityCard>
                </div>

                {/* 3. PENGATURAN LAINNYA */}
                <div className=" grid grid-cols-2 gap-2">
                  <h2 className="font-semibold text-lg col-span-2">Pengaturan Lanjutan</h2>
                  <FullDisplayAccesibilityCard
                    desc=""
                    onClick={async () => {
                      if (contrast == 'high') {
                        await contrastStorage.set('normal');
                      } else {
                        await contrastStorage.set('high');
                      }
                    }}
                    currentState={accesibilityData.find(d => d.title === 'Pengaturan Kontras')?.currentState ?? ''}
                    turnOnState={'high'}>
                    <EyeIcon className="w-8 h-8" />
                    <p>Kontras Tinggi</p>
                  </FullDisplayAccesibilityCard>
                  <FullDisplayAccesibilityCard
                    desc=""
                    onClick={toggleHighlightLink}
                    currentState={accesibilityData.find(d => d.title === 'Pengaturan Monokrom')?.currentState ?? ''}
                    turnOnState={'enabled'}>
                    <LifebuoyIcon className="w-8 h-8" />
                    <p>Konten Monokrom</p>
                  </FullDisplayAccesibilityCard>
                  <FullDisplayAccesibilityCard
                    desc=""
                    onClick={async () => {
                      if (saturation == 'high') {
                        await saturationStorage.set('normal');
                      } else {
                        await saturationStorage.set('high');
                      }
                    }}
                    currentState={accesibilityData.find(d => d.title === 'Pengatur Saturasi')?.currentState ?? ''}
                    turnOnState={'high'}>
                    <BeakerIcon className="w-8 h-8" />
                    <p>Saturasi Tinggi</p>
                  </FullDisplayAccesibilityCard>
                  <FullDisplayAccesibilityCard
                    desc=""
                    onClick={async () => {
                      if (saturation == 'low') {
                        await saturationStorage.set('normal');
                      } else {
                        await saturationStorage.set('low');
                      }
                    }}
                    currentState={accesibilityData.find(d => d.title === 'Pengatur Saturasi')?.currentState ?? ''}
                    turnOnState={'low'}>
                    <BeakerIcon className="w-8 h-8" />
                    <p>Saturasi Rendah</p>
                  </FullDisplayAccesibilityCard>
                </div>
              </div>
            )}
          </main>
        </>
      )}
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);

{
  /* <Toggle initialState={smallDisplay} onToggle={setSmallDisplay} /> */
}
{
  /* <button
                className="p-1 flex items-center justify-center rounded border h-10 w-10 ml-auto"
                onClick={resetState}>
                <ArrowPathIcon className="h-6 w-6" />
              </button> */
}
