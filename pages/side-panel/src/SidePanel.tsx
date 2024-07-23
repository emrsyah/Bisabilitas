import { withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';
import {
  RectangleGroupIcon,
  BoltIcon,
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
  PaperAirplaneIcon,
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
} from '@chrome-extension-boilerplate/storage';
import React from 'react';
import Separator from './components/Separator';
import Accordion from './components/Accordion';
import Toggle from './components/Toggle';
import AccesibilityCard from './components/AccesibilityCard';
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

  const [aiMode, setAimode] = React.useState<boolean>(false);

  const [smallDisplay, setSmallDisplay] = React.useState(false);
  const [accesibilityProfile, setAccesibilityProfile] = React.useState<ProfileState>(null);

  React.useEffect(() => {
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
      title: 'Sembuyikan Gambar',
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

  return (
    <div>
      {aiMode ? (
        <main className="mx-4 sm:mx-auto py-6 min-h-screen flex gap-2 flex-col">
          <nav className="flex items-center gap-2">
            <button
              onClick={() => setAimode(false)}
              className="rounded-md border-[2px] border-gray-100 p-2 flex items-center gap-1">
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <h1 className="font-medium text-base">Tanyakan AI Tentang Website Ini</h1>
          </nav>
          <Separator />
          <div className='flex-grow flex-1 flex flex-col gap-2'>
            <div className='flex-grow bg-gray-100 rounded'>
            </div>
            <div className='flex items-center gap-2'>
              <input type="text" className='w-full focus:border-blue-600 outline-none p-2 border-[1.5px] border-gray-300 rounded' placeholder='Tanyakan Sesuatu' />
              <button className='h-9 w-9 bg-blue-600 text-white p-1 rounded'>
                <PaperAirplaneIcon />
              </button>
            </div>
          </div>
        </main>
      ) : (
        <>
          <div className="bg-blue-900 text-white p-2">
            <nav className="mx-4 sm:mx-auto my-2 max-w-sm flex items-center justify-between">
              <h1 className="font-semibold text-xl">Bisabilitasx</h1>
              <button className="w-8 text-black hover:bg-blue-100 h-8 rounded-md justify-center items-center flex bg-white ">
                <h1 className=" font-bold ">ID</h1>
              </button>
            </nav>
          </div>
          <main className="grid grid-cols-2 gap-4 mx-4 sm:mx-auto my-6">
            <button
              // onClick={() => aiAssistantStorage.toggle()}
              onClick={() => setAimode(true)}
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
            <div className="col-span-2 grid grid-cols-5 justify-between">
              <div className="flex items-center justify-between gap-1 w-full col-span-4">
                <div className="flex items-center gap-2">
                  <RectangleGroupIcon className="h-6 w-6 p-1" />
                  <p className="font-semibold text-base">{smallDisplay ? 'Display Kecil' : 'Display Lebar'}</p>
                </div>
                <Toggle initialState={smallDisplay} onToggle={setSmallDisplay} />
              </div>
              <button
                className="p-1 flex items-center justify-center rounded border h-10 w-10 ml-auto"
                onClick={resetState}>
                <ArrowPathIcon className="h-6 w-6" />
              </button>
            </div>
            <Separator />
            <div className={`grid gap-4 ${smallDisplay ? 'grid-cols-3' : 'grid-cols-2'} col-span-2`}>
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
          </main>
        </>
      )}
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
