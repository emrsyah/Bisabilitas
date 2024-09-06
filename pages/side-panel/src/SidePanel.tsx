import { withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';
import {
  aiAssistantStorage,
  soundNavigationStorage,
  focusReadStorage,
  dyslexicFontStorage,
  contrastStorage,
  hideImagesStorage,
  saturationStorage,
  // textSpacingStorage,
  linkHighlightStorage,
  cursorBiggerStorage,
  textAlignmentStorage,
  tokenAuthStorage,
  fontSizeStoragePercentage,
  textSpacingStoragePercentage,
  lineHeightStorage,
  monochromeModeStorage,
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
import Account from './page/Account';
import {
  IconAlignCenter,
  IconAlignJustified,
  IconAlignLeft,
  IconAlignRight,
  IconBook,
  IconChevronLeft,
  IconContrast,
  IconContrastFilled,
  IconDropletFilled,
  IconDropletHalf2,
  IconDropletHalfFilled,
  IconLayout2Filled,
  IconLetterSpacing,
  IconLineHeight,
  IconMessageChatbotFilled,
  IconMicrophone,
  IconMoon,
  IconPhotoOff,
  IconPointer,
  IconRefresh,
  IconStack2Filled,
  IconSun,
  IconTextIncrease,
  IconTextSpellcheck,
  IconUnlink,
  IconUser,
} from '@tabler/icons-react';

import dfLogo from '../public/df-logo.svg';

import { ControlAccesibilityCard } from './components/ControlAccesibilityCard';
// import {  useStorageSuspense } from '@chrome-extension-boilerplate/shared';
// import { exampleThemeStorage, fontSizeStorage } from '@chrome-extension-boilerplate/storage';
// import { ComponentPropsWithoutRef } from 'react';

export type StateProps = {
  label: string;
  value: string;
};

const FONT_SIZE_GUIDE = {
  NORMAL: 100,
  MEDIUM: 110,
  LARGE: 130,
  EXTRA_LARGE: 150,
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
  await textSpacingStoragePercentage.toggle();
};

const toggleDyslexicFont = async () => {
  // alert('hi')
  await dyslexicFontStorage.toggle();
};

const toggleFontSize = async () => {
  await fontSizeStoragePercentage.toggle();
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

const toggleMonochromeMode = async () => {
  await monochromeModeStorage.toggle();
};

type ProfileState = null | 'cognitife' | 'visual-impaired' | 'dyslexic' | 'seizure' | 'adhd';

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
      await fontSizeStoragePercentage.set(FONT_SIZE_GUIDE.EXTRA_LARGE);
      await lineHeightStorage.set(FONT_SIZE_GUIDE.MEDIUM);
      await saturationStorage.set('high');
      await textSpacingStoragePercentage.set(FONT_SIZE_GUIDE.MEDIUM);
    },
    onTurnOff: async () => {
      await fontSizeStoragePercentage.set(FONT_SIZE_GUIDE.NORMAL);
      await lineHeightStorage.set(FONT_SIZE_GUIDE.NORMAL);
      await saturationStorage.set('normal');
      await textSpacingStoragePercentage.set(FONT_SIZE_GUIDE.NORMAL);
    },
  },
  {
    name: 'Kognitif',
    state: 'cognitife',
    onTurnOn: async () => {
      await focusReadStorage.set('enabled');
      await fontSizeStoragePercentage.set(FONT_SIZE_GUIDE.MEDIUM);
      await lineHeightStorage.set(FONT_SIZE_GUIDE.MEDIUM);

      await hideImagesStorage.set('enabled');
    },
    onTurnOff: async () => {
      await focusReadStorage.set('disabled');
      await fontSizeStoragePercentage.set(FONT_SIZE_GUIDE.NORMAL);
      await lineHeightStorage.set(FONT_SIZE_GUIDE.NORMAL);
      await hideImagesStorage.set('disabled');
    },
  },
  {
    name: 'Dysleksia',
    state: 'dyslexic',
    onTurnOn: async () => {
      await dyslexicFontStorage.set('openDyslexic');
      await textSpacingStoragePercentage.set(FONT_SIZE_GUIDE.MEDIUM);
      await lineHeightStorage.set(FONT_SIZE_GUIDE.MEDIUM);
      await fontSizeStoragePercentage.set(FONT_SIZE_GUIDE.LARGE);
    },
    onTurnOff: async () => {
      await dyslexicFontStorage.set('default');
      await textSpacingStoragePercentage.set(FONT_SIZE_GUIDE.NORMAL);
      await lineHeightStorage.set(FONT_SIZE_GUIDE.NORMAL);
      await fontSizeStoragePercentage.set(FONT_SIZE_GUIDE.NORMAL);
    },
  },
  {
    name: 'Epilepsi dan Seizure',
    state: 'seizure',
    onTurnOn: async () => {
      await saturationStorage.set('low');
    },
    onTurnOff: async () => {
      await saturationStorage.set('normal');
    },
  },
  {
    name: 'ADHD',
    state: 'adhd',
    onTurnOn: async () => {
      await saturationStorage.set('high');
      await focusReadStorage.set('enabled');
      await fontSizeStoragePercentage.set(FONT_SIZE_GUIDE.MEDIUM);
      await lineHeightStorage.set(FONT_SIZE_GUIDE.MEDIUM);
    },
    onTurnOff: async () => {
      await saturationStorage.set('normal');
      await focusReadStorage.set('disabled');
      await fontSizeStoragePercentage.set(FONT_SIZE_GUIDE.NORMAL);
      await lineHeightStorage.set(FONT_SIZE_GUIDE.NORMAL);
    },
  },
];

export type UserDataType = {
  email: string;
  name: string;
  id: number;
};

const displayTypeData = ['minimalis', 'penuh'];

const SidePanel = () => {
  const [contrast, setContrast] = React.useState(contrastStorage.getSnapshot());
  const [textSpacing, setTextSpacing] = React.useState(textSpacingStoragePercentage.getSnapshot());
  const [dyslexic, setDyslexic] = React.useState(dyslexicFontStorage.getSnapshot());
  const [fontSize, setFontSize] = React.useState(fontSizeStoragePercentage.getSnapshot());
  const [hideImageState, setHideImageState] = React.useState(hideImagesStorage.getSnapshot());
  const [saturation, setSaturation] = React.useState(saturationStorage.getSnapshot());
  const [soundNavigation, setSoundNavigation] = React.useState(soundNavigationStorage.getSnapshot());
  const [focusRead, setFocusRead] = React.useState(focusReadStorage.getSnapshot());
  const [aiAssistant, setAiAssistant] = React.useState(aiAssistantStorage.getSnapshot());
  const [highlightLink, setHighlightLink] = React.useState(linkHighlightStorage.getSnapshot());
  const [biggerCursor, setBiggerCursor] = React.useState(cursorBiggerStorage.getSnapshot());
  const [textAlignment, setTextAlignment] = React.useState(textAlignmentStorage.getSnapshot());
  const [lineHeight, setLineHeight] = React.useState(lineHeightStorage.getSnapshot());
  const [monochrome, setMonochrome] = React.useState(monochromeModeStorage.getSnapshot());

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

  const [displayType, setDisplayType] = React.useState<'minimalis' | 'penuh'>('penuh');
  const [smallDisplay, setSmallDisplay] = React.useState(false);
  const [accesibilityProfile, setAccesibilityProfile] = React.useState<ProfileState>(null);

  const [userData, setUserData] = React.useState<UserDataType | null>(null);

  React.useEffect(() => {
    monochromeModeStorage.subscribe(() => {
      setMonochrome(monochromeModeStorage.getSnapshot());
    });
    lineHeightStorage.subscribe(() => {
      setLineHeight(lineHeightStorage.getSnapshot());
    });
    textAlignmentStorage.subscribe(() => {
      setTextAlignment(textAlignmentStorage.getSnapshot());
    });
    contrastStorage.subscribe(() => {
      setContrast(contrastStorage.getSnapshot());
    });
    textSpacingStoragePercentage.subscribe(() => {
      setTextSpacing(textSpacingStoragePercentage.getSnapshot());
    });
    dyslexicFontStorage.subscribe(() => {
      setDyslexic(dyslexicFontStorage.getSnapshot());
    });
    fontSizeStoragePercentage.subscribe(() => {
      setFontSize(fontSizeStoragePercentage.getSnapshot());
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
      icon: <IconContrast className="h-6 w-6" />,
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
      // icon: <ComputerDesktopIcon className="h-6 w-6" />,
      icon: <IconBook className="h-6 w-6" />,
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
      icon: <IconMicrophone className="h-6 w-6" />,
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
      title: 'Font Ramah Disleksia',
      desc: 'Dukung penyandang disleksia dengan teks yang lebih mudah dibaca.',
      icon: <IconTextSpellcheck className="h-6 w-6" />,
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
      icon: <IconTextIncrease className="h-6 w-6" />,
      onClick: toggleFontSize,
      currentState: fontSize?.toString() ?? '100',
      normalState: '100',
      state: [
        {
          label: 'Pembesar Teks',
          value: FONT_SIZE_GUIDE.NORMAL.toString(),
        },
        {
          label: 'Pembesar Teks Medium',
          value: FONT_SIZE_GUIDE.MEDIUM.toString(),
        },
        {
          label: 'Pembesar Teks Besar',
          value: FONT_SIZE_GUIDE.LARGE.toString(),
        },
        {
          label: 'Pembesar Teks Ekstra Besar',
          value: FONT_SIZE_GUIDE.EXTRA_LARGE.toString(),
        },
      ],
    },
    {
      title: 'Sembunyikan Gambar',
      desc: 'Bantu penyandang disabilitas fokus dengan menyederhanakan tampilan.',
      icon: <IconPhotoOff className="h-6 w-6" />,
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
      icon: <IconLetterSpacing className="h-6 w-6" />,
      onClick: toggleTextSpacing,
      currentState: textSpacing ? textSpacing.toString() : FONT_SIZE_GUIDE.NORMAL.toString(),
      normalState: FONT_SIZE_GUIDE.NORMAL.toString(),
      state: [
        {
          label: 'Jarak Teks',
          value: FONT_SIZE_GUIDE.NORMAL.toString(),
        },
        {
          label: 'Jarak Medium',
          value: FONT_SIZE_GUIDE.MEDIUM.toString(),
        },
        {
          label: 'Jarak Lebar',
          value: FONT_SIZE_GUIDE.LARGE.toString(),
        },
        {
          label: 'Jarak Sangat Lebar',
          value: FONT_SIZE_GUIDE.EXTRA_LARGE.toString(),
        },
      ],
    },
    {
      title: 'Pengatur Saturasi',
      desc: 'Atur warna sesuai kebutuhan penyandang disabilitas sensitif cahaya.',
      icon: <IconDropletHalf2 className="h-6 w-6" />,
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
      icon: <IconUnlink className="h-6 w-6" />,
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
      icon: <IconPointer className="h-6 w-6" />,
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
      icon: <IconAlignLeft className="h-6 w-6" />,
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
    await textSpacingStoragePercentage.set(FONT_SIZE_GUIDE.NORMAL);
    await dyslexicFontStorage.set('default');
    await fontSizeStoragePercentage.set(FONT_SIZE_GUIDE.NORMAL);
    await hideImagesStorage.set('disabled');
    await saturationStorage.set('normal');
    await soundNavigationStorage.set('disabled');
    await focusReadStorage.set('disabled');
    await aiAssistantStorage.set('disabled');
    await textAlignmentStorage.set('normal');
    await monochromeModeStorage.set('disabled');
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
      <Account handleLogout={handleLogout} userData={userData}>
        <ButtonKembali />
      </Account>
    );

  return (
    <div>
      {mode === 'ai' ? (
        <main className="mx-4 sm:mx-auto py-6 min-h-screen flex gap-2 flex-col">
          <nav className="flex items-center gap-2">
            <button
              onClick={() => setMode('default')}
              className="rounded-md border-[2px] border-gray-100 p-2 flex items-center gap-1">
              <IconChevronLeft className="h-6 w-6" />
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
                <IconUser className="w-8 h-8" />
                {/* <h1 className=" font-bold ">ID</h1> */}
              </button>
            </nav>
          </div>
          <main className="grid grid-cols-2 gap-4 mx-4 max-w-2xl sm:mx-auto sm:px-3 my-6">
            {/* Hilangin AI dulu */}
            <button
              onClick={() => setMode('ai')}
              className={`col-span-2 flex gap-2  items-center hover:border-blue-600 ${aiAssistant == 'enabled' ? 'bg-blue-600 text-white' : ' bg-white '} px-4 py-3 rounded-md border-[2px] border-gray-100`}>
              <IconMessageChatbotFilled className="h-6 w-6" />
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
                    <IconStack2Filled className="h-6 w-6" />
                  ) : (
                    <IconLayout2Filled className="h-6 w-6" />
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
                <IconRefresh className="h-4 w-4" />
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
                  <ControlAccesibilityCard
                    increaseHandler={async () => {
                      await fontSizeStoragePercentage.increase();
                    }}
                    decreaseHandler={async () => {
                      await fontSizeStoragePercentage.decrease();
                    }}
                    desc=""
                    // onClick={toggleFocusRead}
                    normalState={100}
                    wider
                    currentState={fontSize ?? 100}>
                    <div className="flex gap-2 items-center text-base justify-center">
                      <IconTextIncrease className="w-5 h-5" />
                      <p>Atur Besar Teks</p>
                    </div>
                  </ControlAccesibilityCard>
                  <FullDisplayAccesibilityCard
                    desc=""
                    onClick={toggleDyslexicFont}
                    currentState={dyslexic ?? 'default'}
                    turnOnState={'openDyslexic'}>
                    <img src={dfLogo} alt="dyslexic font logo" className="w-8 h8" />
                    {/* <IconTextSpellcheck className="w-8 h-8" /> */}
                    <p>Font Ramah Disleksia</p>
                  </FullDisplayAccesibilityCard>
                  <FullDisplayAccesibilityCard
                    desc=""
                    onClick={async () => {
                      if (dyslexic == 'arial') {
                        await dyslexicFontStorage.set('default');
                      } else {
                        await dyslexicFontStorage.set('arial');
                      }
                    }}
                    currentState={dyslexic ?? 'default'}
                    turnOnState={'arial'}>
                    <IconTextSpellcheck className="w-8 h-8" />
                    <p>Font Mudah Dibaca</p>
                  </FullDisplayAccesibilityCard>
                  <ControlAccesibilityCard
                    increaseHandler={async () => {
                      await textSpacingStoragePercentage.increase();
                    }}
                    decreaseHandler={async () => {
                      await textSpacingStoragePercentage.decrease();
                    }}
                    desc=""
                    // onClick={toggleTextSpacing}
                    normalState={100}
                    wider
                    currentState={textSpacing ?? 100}>
                    <div className="flex gap-2 items-center text-base justify-center">
                      <IconLetterSpacing className="w-5 h-5" />
                      <p>Atur Jarak Teks</p>
                    </div>
                  </ControlAccesibilityCard>
                  <ControlAccesibilityCard
                    increaseHandler={async () => {
                      await lineHeightStorage.increase();
                    }}
                    decreaseHandler={async () => {
                      await lineHeightStorage.decrease();
                    }}
                    desc=""
                    // onClick={toggleTextSpacing}
                    normalState={100}
                    wider
                    currentState={lineHeight ?? 100}>
                    <div className="flex gap-2 items-center text-base justify-center">
                      <IconLineHeight className="w-5 h-5" />
                      <p>Atur Tinggi Baris</p>
                    </div>
                  </ControlAccesibilityCard>
                  {/* <FullDisplayAccesibilityCard
                    desc=""
                    onClick={toggleFocusRead}
                    currentState={accesibilityData.find(d => d.title === 'Font Ramah Disleksia')?.currentState ?? ''}
                    wider
                    turnOnState={'openDyslexic'}>
                    <IconLineHeight className="w-8 h-8" />
                    <p>Atur Tinggi Baris</p>
                  </FullDisplayAccesibilityCard> */}
                  <FullDisplayAccesibilityCard
                    desc=""
                    onClick={async () => {
                      await textAlignmentStorage.set(textAlignment == 'left' ? 'normal' : 'left');
                    }}
                    currentState={textAlignment ?? 'normal'}
                    turnOnState={'left'}>
                    <IconAlignLeft className="w-8 h-8" />
                    <p>Teks Rata Kiri</p>
                  </FullDisplayAccesibilityCard>
                  <FullDisplayAccesibilityCard
                    desc=""
                    onClick={async () => {
                      await textAlignmentStorage.set(textAlignment == 'right' ? 'normal' : 'right');
                    }}
                    currentState={textAlignment ?? 'normal'}
                    turnOnState={'right'}>
                    <IconAlignRight className="w-8 h-8" />
                    <p>Teks Rata Kanan</p>
                  </FullDisplayAccesibilityCard>
                  <FullDisplayAccesibilityCard
                    desc=""
                    onClick={async () => {
                      await textAlignmentStorage.set(textAlignment == 'center' ? 'normal' : 'center');
                    }}
                    currentState={textAlignment ?? 'normal'}
                    turnOnState={'center'}>
                    <IconAlignCenter className="w-8 h-8" />
                    <p>Teks Rata Tengah</p>
                  </FullDisplayAccesibilityCard>
                  <FullDisplayAccesibilityCard
                    desc=""
                    onClick={async () => {
                      await textAlignmentStorage.set(textAlignment == 'justify' ? 'normal' : 'justify');
                    }}
                    currentState={textAlignment ?? 'normal'}
                    turnOnState={'justify'}>
                    <IconAlignJustified className="w-8 h-8" />
                    <p>Teks Rata Selaras</p>
                  </FullDisplayAccesibilityCard>
                </div>

                {/* 2. PENGATURAN WARNA */}
                <div className=" grid grid-cols-2 gap-2">
                  <h2 className="font-semibold text-lg col-span-2">Pengaturan Warna</h2>
                  <FullDisplayAccesibilityCard
                    desc=""
                    onClick={async () => {
                      if (contrast == 'dark-contrast') {
                        await contrastStorage.set('normal');
                      } else {
                        await contrastStorage.set('dark-contrast');
                      }
                    }}
                    currentState={contrast ?? 'normal'}
                    turnOnState={'dark-contrast'}>
                    <IconMoon className="w-8 h-8" />
                    <p>Kontras Gelap</p>
                  </FullDisplayAccesibilityCard>
                  <FullDisplayAccesibilityCard
                    desc=""
                    onClick={async () => {
                      if (contrast == 'light-contrast') {
                        await contrastStorage.set('normal');
                      } else {
                        await contrastStorage.set('light-contrast');
                      }
                    }}
                    currentState={contrast ?? 'normal'}
                    turnOnState={'light-contrast'}>
                    <IconSun className="w-8 h-8" />
                    <p>Kontras Terang</p>
                  </FullDisplayAccesibilityCard>
                  <FullDisplayAccesibilityCard
                    desc=""
                    onClick={async () => {
                      if (contrast == 'high') {
                        await contrastStorage.set('normal');
                      } else {
                        await contrastStorage.set('high');
                      }
                    }}
                    currentState={contrast ?? 'normal'}
                    turnOnState={'high'}>
                    <IconContrast className="w-8 h-8" />
                    <p>Kontras Tinggi</p>
                  </FullDisplayAccesibilityCard>
                  <FullDisplayAccesibilityCard
                    desc=""
                    onClick={toggleMonochromeMode}
                    currentState={monochrome ?? 'disabled'}
                    turnOnState={'enabled'}>
                    <IconContrastFilled className="w-8 h-8" />
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
                    currentState={saturation ?? 'normal'}
                    turnOnState={'high'}>
                    <IconDropletFilled className="w-8 h-8" />
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
                    currentState={saturation ?? 'normal'}
                    turnOnState={'low'}>
                    <IconDropletHalfFilled className="w-8 h-8" />
                    <p>Saturasi Rendah</p>
                  </FullDisplayAccesibilityCard>
                </div>

                {/* 3. PENGATURAN LAINNYA */}
                <div className=" grid grid-cols-2 gap-2">
                  <h2 className="font-semibold text-lg col-span-2">Lainnya</h2>
                  <FullDisplayAccesibilityCard
                    desc=""
                    onClick={toggleFocusRead}
                    currentState={focusRead ?? 'disabled'}
                    turnOnState={'enabled'}>
                    <IconBook className="w-8 h-8" />
                    <p>Fokus Membaca</p>
                  </FullDisplayAccesibilityCard>
                  <FullDisplayAccesibilityCard
                    desc=""
                    onClick={hideImage}
                    currentState={hideImageState ?? 'disabled'}
                    turnOnState={'enabled'}>
                    <IconPhotoOff className="w-8 h-8" />
                    <p>Sembunyikan Gambar</p>
                  </FullDisplayAccesibilityCard>
                  <FullDisplayAccesibilityCard
                    desc=""
                    onClick={activateSoundNavigation}
                    currentState={soundNavigation ?? 'disabled'}
                    turnOnState={'enabled'}>
                    <IconMicrophone className="w-8 h-8" />
                    <p>Navigasi Suara</p>
                  </FullDisplayAccesibilityCard>
                  <FullDisplayAccesibilityCard
                    desc=""
                    onClick={toggleBiggerCursor}
                    currentState={biggerCursor ?? 'disabled'}
                    turnOnState={'enabled'}>
                    <IconPointer className="w-8 h-8" />
                    <p>Perbesar Cursor</p>
                  </FullDisplayAccesibilityCard>
                  <FullDisplayAccesibilityCard
                    desc=""
                    onClick={toggleHighlightLink}
                    currentState={highlightLink ?? 'disabled'}
                    turnOnState={'enabled'}>
                    <IconUnlink className="w-8 h-8" />
                    <p>Sorot Link</p>
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
