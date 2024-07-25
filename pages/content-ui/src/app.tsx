import { useStorageSuspense } from '@chrome-extension-boilerplate/shared';
import {
  contrastStorage,
  cursorBiggerStorage,
  dyslexicFontStorage,
  focusReadStorage,
  fontSizeStorage,
  hideImagesStorage,
  linkHighlightStorage,
  saturationStorage,
  soundNavigationStorage,
  textSpacingStorage,
} from '../../../packages/storage/dist/esm';
import Popover from './components/PopOver';
import {
  ArrowsPointingOutIcon,
  BeakerIcon,
  ComputerDesktopIcon,
  CursorArrowRaysIcon,
  DocumentArrowUpIcon,
  EyeIcon,
  LightBulbIcon,
  NewspaperIcon,
  PhotoIcon,
  SpeakerWaveIcon,
} from '@heroicons/react/16/solid';
import React from 'react';

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

export default function App() {
  const contrastStore = useStorageSuspense(contrastStorage);
  const textSpaceStore = useStorageSuspense(textSpacingStorage);
  const dyslexicStore = useStorageSuspense(dyslexicFontStorage);
  const fontSizeStore = useStorageSuspense(fontSizeStorage);
  const hideImageStore = useStorageSuspense(hideImagesStorage);
  const saturationStore = useStorageSuspense(saturationStorage);
  const soundNavigationStore = useStorageSuspense(soundNavigationStorage);
  const focusReadStore = useStorageSuspense(focusReadStorage);
  const linkHighlightStore = useStorageSuspense(linkHighlightStorage);
  const bigCursorStore = useStorageSuspense(cursorBiggerStorage);

  const [contrast, setContrast] = React.useState(contrastStore);
  const [textSpacing, setTextSpacing] = React.useState(textSpaceStore);
  const [dyslexic, setDyslexic] = React.useState(dyslexicStore);
  const [fontSize, setFontSize] = React.useState(fontSizeStore);
  const [hideImageState, setHideImageState] = React.useState(hideImageStore);
  const [saturation, setSaturation] = React.useState(saturationStore);
  const [soundNavigation, setSoundNavigation] = React.useState(soundNavigationStore);
  const [focusRead, setFocusRead] = React.useState(focusReadStore);
  const [highlightLink, setHighlightLink] = React.useState(linkHighlightStore);
  const [biggerCursor, setBiggerCursor] = React.useState(bigCursorStore);

  React.useEffect(() => {
    if (contrast !== contrastStore) {
      setContrast(contrastStore);
    }
    if (textSpacing !== textSpaceStore) {
      setTextSpacing(textSpaceStore);
    }
    if (dyslexic !== dyslexicStore) {
      setDyslexic(dyslexicStore);
    }
    if (fontSize !== fontSizeStore) {
      setFontSize(fontSizeStore);
    }
    if (hideImageState !== hideImageStore) {
      setHideImageState(hideImageStore);
    }
    if (saturation !== saturationStore) {
      setSaturation(saturationStore);
    }
    if (soundNavigation !== soundNavigationStore) {
      setSoundNavigation(soundNavigationStore);
    }
    if (focusRead !== focusReadStore) {
      setFocusRead(focusReadStore);
    }
    if (highlightLink !== linkHighlightStore) {
      setHighlightLink(linkHighlightStore);
    }
    if (biggerCursor !== bigCursorStore) {
      setBiggerCursor(bigCursorStore);
    }
  }, [
    contrastStore,
    textSpaceStore,
    dyslexicStore,
    fontSizeStore,
    hideImageStore,
    saturationStore,
    soundNavigationStore,
    focusReadStore,
    linkHighlightStore,
    bigCursorStore,
  ]);

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

  return (
    true && (
      <div className="gap-4 fixed bottom-7 right-0">
        <div className="flex flex-col items-center gap-3">
          <Popover>
            <div className="h-72">
              <div
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#202124 transparent',
                  scrollBehavior: 'smooth',
                  scrollbarGutter: 'stable',
                }}
                className="h-full shadow-md border-[1px] border-gray-300 items-center overflow-y-auto px-2 py-3 bg-white rounded-full gap-2 flex flex-col">
                {accesibilityData.map(item => (
                  <button
                    onClick={item.onClick}
                    key={item.title}
                    className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-600 relative">
                    <CircularProgress currentState={item.state!.findIndex((c) => c.value == item.currentState) + 1} totalStates={item.state!.length} />
                    <div className="z-10 text-white">{item.icon}</div>
                  </button> // <div
                  //   key={c.title}
                  //   className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-600">
                  //   {c.icon}
                  // </div>
                ))}
              </div>
            </div>
          </Popover>
          <button
            onClick={() => {
              console.log(chrome.runtime.sendMessage({}));
              chrome.runtime.sendMessage({ action: 'open_side_panel' });
              // chrome.windows.getCurrent({ populate: true }, window => {
              //   (chrome as any).sidePanel.open({ windowId: window.id });
              // });
            }}
            className="!w-16 !h-14 flex items-center justify-center rounded-l-full  bg-blue-100 text-lg font-bold text-blue-800 border-2 border-blue-500">
            BI
          </button>
        </div>
      </div>
    )
  );
}

const CircularProgress = ({ currentState, totalStates }: { currentState: number; totalStates: number }) => {
  const radius = 18; // Half of w-9/h-9 (36px)
  const strokeWidth = 2;
  const normalizedRadius = radius - strokeWidth;
  // const circumference = normalizedRadius * 2 * Math.PI;

  const getPath = (index: number) => {
    const startAngle = -Math.PI / 2 + index * ((2 * Math.PI) / totalStates);
    const endAngle = startAngle + (2 * Math.PI) / totalStates;
    const x1 = radius + normalizedRadius * Math.cos(startAngle);
    const y1 = radius + normalizedRadius * Math.sin(startAngle);
    const x2 = radius + normalizedRadius * Math.cos(endAngle);
    const y2 = radius + normalizedRadius * Math.sin(endAngle);

    const largeArcFlag = (2 * Math.PI) / totalStates > Math.PI ? 1 : 0;

    return `M ${x1} ${y1} A ${normalizedRadius} ${normalizedRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
  };

  return (
    <svg className="absolute inset-0" width="100%" height="100%" viewBox="0 0 36 36">
      {[...Array(totalStates)].map((_, index) => (
        <path
          key={index}
          d={getPath(index)}
          fill="none"
          stroke={index < currentState ? '#3B82F6' : '#E5E7EB'}
          strokeWidth={strokeWidth}
        />
      ))}
    </svg>
  );
};
