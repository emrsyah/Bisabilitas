import {  withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';
import { BoltIcon, EyeIcon, ComputerDesktopIcon, SpeakerWaveIcon, NewspaperIcon, DocumentArrowUpIcon, PhotoIcon, ArrowsPointingOutIcon, BeakerIcon } from '@heroicons/react/16/solid'
import { aiAssistantStorage, soundNavigationStorage, focusReadStorage, fontSizeStorage,dyslexicFontStorage, contrastStorage, hideImagesStorage, saturationStorage, textSpacingStorage } from '@chrome-extension-boilerplate/storage';
import React from 'react';
// import {  useStorageSuspense } from '@chrome-extension-boilerplate/shared';
// import { exampleThemeStorage, fontSizeStorage } from '@chrome-extension-boilerplate/storage';
// import { ComponentPropsWithoutRef } from 'react';

type StateProps = {
  label: string
  value: string
}

type AccesibilityCardProps = {
  title: string
  desc: string
  icon: JSX.Element
  onClick?: () => void
  state?: StateProps[]
  currentState?: string
  normalState?: string
};

const changeContrast = async () => {
  // alert("change contrast")
  await contrastStorage.toggle()
  // await exampleThemeStorage.set("dark")
}

const hideImage = async () => {
  await hideImagesStorage.toggle()
}

const toggleSaturation = async () => {
  await saturationStorage.toggle()
  // alert("toggle saturation")
  // await exampleThemeStorage.toggle()
}

const toggleTextSpacing = async () => {
  // alert('hi')
  await textSpacingStorage.toggle()
}

const toggleDyslexicFont = async () => {
  // alert('hi')
  await dyslexicFontStorage.toggle()
}

const toggleFontSize = async () => {
  await fontSizeStorage.toggle()
}

const toggleFocusRead = async () => {
 await focusReadStorage.toggle()
}

const activateSoundNavigation = async () => {
  await soundNavigationStorage.toggle()
}

const SidePanel = () => {
  const [contrast, setContrast] = React.useState(contrastStorage.getSnapshot())
  const [textSpacing, setTextSpacing] = React.useState(textSpacingStorage.getSnapshot())
  const [dyslexic, setDyslexic] = React.useState(dyslexicFontStorage.getSnapshot())
  const [fontSize, setFontSize] = React.useState(fontSizeStorage.getSnapshot())
  const [hideImageState, setHideImageState] = React.useState(hideImagesStorage.getSnapshot())
  const [saturation, setSaturation] = React.useState(saturationStorage.getSnapshot())
  const [soundNavigation, setSoundNavigation] = React.useState(soundNavigationStorage.getSnapshot())
  const [focusRead, setFocusRead] = React.useState(focusReadStorage.getSnapshot())
  const [aiAssistant, setAiAssistant] = React.useState(aiAssistantStorage.getSnapshot())


  React.useEffect(() => {
    contrastStorage.subscribe(() => {
      setContrast(contrastStorage.getSnapshot())
    })
    textSpacingStorage.subscribe(() => {
      setTextSpacing(textSpacingStorage.getSnapshot())
    })
    dyslexicFontStorage.subscribe(() => {
      setDyslexic(dyslexicFontStorage.getSnapshot())
    })
    fontSizeStorage.subscribe(() => {
      setFontSize(fontSizeStorage.getSnapshot())
    })
    hideImagesStorage.subscribe(() => {
      setHideImageState(hideImagesStorage.getSnapshot())
    })
    saturationStorage.subscribe(() => {
      setSaturation(saturationStorage.getSnapshot())
    })
    soundNavigationStorage.subscribe(() => {
      setSoundNavigation(soundNavigationStorage.getSnapshot())
    })
    focusReadStorage.subscribe(() => {
      setFocusRead(focusReadStorage.getSnapshot())
    })
    aiAssistantStorage.subscribe(() => {
      setAiAssistant(aiAssistantStorage.getSnapshot())
    })
    // console.log("testo")
  }, [])

  // const theme = useStorageSuspense(exampleThemeStorage);
  // const fontSize = useStorageSuspense(fontSizeStorage);

  const accesibilityData: AccesibilityCardProps[] = [
    {
      title: 'Pengaturan Kontras',
      desc: 'Bantu penyandang disabilitas penglihatan dengan kontras warna optimal',
      icon: <EyeIcon className='h-6 w-6' />,
      onClick: changeContrast,
      currentState: contrast ? contrast : "normal",
      normalState: "normal",
      state: [{
        label: "Pengaturan Kontras",
        value: "normal"
      }, 
      {
        label: "Kontras Rendah",
        value: "low"
      },
      {
        label: "Kontras Sedang",
        value: "medium"
      },
      {
        label: "Kontras Tinggi",
        value: "high"
      }
    ]
    },
    {
      title: 'Fokus Membaca',
      desc: 'Tingkatkan konsentrasi penyandang disabilitas kognitif saat membaca.',
      icon: <ComputerDesktopIcon className='h-6 w-6' />,
      onClick: toggleFocusRead,
      currentState: focusRead ? focusRead : "disabled",
      normalState: "disabled",
      state: [
        {
          label: "Fokus Membaca",
          value: "disabled"
        },
        {
          label: "Matikan Fokus Membaca",
          value: "enabled"
        }
      ]
    },
    {
      title: 'Navigasi Suara',
      desc: 'Berdayakan penyandang disabilitas motorik menjelajah web dengan suara.',
      icon: <SpeakerWaveIcon className='h-6 w-6' />,
      onClick: activateSoundNavigation,
      currentState: soundNavigation ? soundNavigation : "disabled",
      normalState: "disabled",
      state: [
        {
          label: "Navigasi Suara",
          value: "disabled"
        },
        {
          label: "Matikan Navigasi Suara",
          value: "enabled"
        }
      ]
    },
    {
      title: 'Dyslexia Friendly',
      desc: 'Dukung penyandang disleksia dengan teks yang lebih mudah dibaca.',
      icon: <NewspaperIcon className='h-6 w-6' />,
      onClick: toggleDyslexicFont,
      currentState: dyslexic? dyslexic : "default",
      normalState: "default",
      state : [
        {
          label: "Dyslexia Friendly",
          value: "default"
        },
        {
          label: "Dyslexia Friendly On",
          value: "openDyslexic"
        }
      ]
    },
    {
      title: 'Pembesar Teks',
      desc: 'Perbesar teks bagi penyandang disabilitas penglihatan tanpa merusak layout.',
      icon: <DocumentArrowUpIcon className='h-6 w-6' />,
      onClick: toggleFontSize,
      currentState: fontSize? fontSize : "normal",
      normalState: "normal",
      state: [{
        label: "Pembesar Teks",
        value: "normal"
      },
      {
        label: "Pembesar Teks Medium",
        value: "medium"
      },
      {
        label: "Pembesar Teks Besar",
        value: "large"
      },
      {
        label: "Pembesar Teks Ekstra Besar",
        value: "extra-large"
      }]
    },
    {
      title: 'Sembuyikan Gambar',
      desc: 'Bantu penyandang disabilitas fokus dengan menyederhanakan tampilan.',
      icon: <PhotoIcon className='h-6 w-6' />,
      onClick: hideImage,
      currentState: hideImageState ? hideImageState : "disabled",
      normalState: "disabled",
      state: [
        {
          label: "Sembunyikan Gambar",
          value: "disabled"
        }, 
        {
          label: "Munculkan Gambar",
          value: "enabled",
        }
      ]
    },
    {
      title: 'Jarak Teks',
      desc: 'Sesuaikan spasi teks untuk kenyamanan penyandang disabilitas visual.',
      icon: <ArrowsPointingOutIcon className='h-6 w-6' />,
      onClick: toggleTextSpacing,
      currentState: textSpacing? textSpacing : "normal",
      normalState: "normal",
      state: [{
        label: "Jarak Teks",
        value: "normal"
      },
      {
        label: "Jarak Sangat Lebar",
        value: "extra-wide"
      },
      {
        label: "Jarak Lebar",
        value: "wide"
      },
      {
        label: "Jarak Medium",
        value: "medium"
      }
    ]
    },
    {
      title: 'Pengatur Saturasi',
      desc: 'Atur warna sesuai kebutuhan penyandang disabilitas sensitif cahaya.',
      icon: <BeakerIcon className='h-6 w-6' />,
      onClick: toggleSaturation,
      currentState: saturation ? saturation : "normal",
      normalState: "normal",
      state : [
        {
          label: "Pengatur Saturasi",
          value: "normal"
        },
        {
          label: "Saturasi Rendah",
          value: "low"
        },
        {
          label: "Saturasi Tinggi",
          value: "high"
        }
      ]
    },
  ]

  


  return (
    <div>
      <div className='bg-blue-900 text-white p-2'>
      <nav className='mx-4 sm:mx-auto my-2 max-w-sm flex items-center justify-between'>
        <h1 className='font-semibold text-xl'>Bisabilitas</h1>
        <button className='w-8 text-black hover:bg-blue-100 h-8 rounded-md justify-center items-center flex bg-white '>
          <h1 className=' font-bold '>ID</h1>
        </button>
      </nav>
      {/* <button onClick={changeContrast}>cek</button>
      <h2>{contrast}</h2>
      <h3>cek bagian bawah</h3> */}
      </div>
      <main className='grid grid-cols-2 gap-4 mx-4 sm:mx-auto my-6'>
        <button onClick={() => aiAssistantStorage.toggle()} className={`col-span-2 flex gap-2  items-center hover:border-blue-600 ${aiAssistant == "enabled" ? "bg-blue-600 text-white" : " bg-white text-blue-600"} px-4 py-3 rounded-md border-[2px] border-gray-100`}>
          <BoltIcon className='h-6 w-6' />
          <h1 className='text-lg font-bold '>AI Assistant <span className='text-sm'>(beta)</span></h1>
        </button>
        {accesibilityData.map((d) => (  
        <AccesibilityCard
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
      </main>
    </div>
    // <div
    //   className="App"
    //   style={{
    //     backgroundColor: theme === 'light' ? '#eee' : '#222',
    //   }}>
    //   <header className="App-header" style={{ color: theme === 'light' ? '#222' : '#eee' }}>
    //     <img src={chrome.runtime.getURL('side-panel/logo.svg')} className="App-logo" alt="logo" />
    //     <button onClick={changeFont}>Current Font: {fontSize.current} - Bigger</button>
    //     <p>
    //       Edit <code>pages/side-panel/src/SidePanel.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       style={{ color: theme === 'light' ? '#0281dc' : undefined, marginBottom: '10px' }}>
    //       Learn Reactx
    //     </a>
    //     <h6>The color of this paragraph is defined using SASS.</h6>
    //     <ToggleButton>Toggle themex</ToggleButton>
    //   </header>
    // </div>
  );
};


const AccesibilityCard = ({desc, icon, title, onClick, currentState, normalState, state} : AccesibilityCardProps) => {
  const findLabel = (state: StateProps[]) => {
    let label = ""
    state.forEach(s => {
      if(s.value === currentState) {
        label = s.label
      }
    })
    return label
  }
  return (
    <button onClick={onClick} className='hover:border-[2px] hover:border-blue-600 border-[2px] border-gray-100 text-start cursor-pointer col-span-1  w-full shadow px-4 pt-4 pb-2 rounded-md flex flex-col gap-2'>
      {state ? (
    <div className="flex items-center w-full gap-1">
      {state.map((s) => (
        <>
        <div key={s.value} className={`h-1 w-full rounded-full ${s.value === currentState ? "bg-blue-600" : "bg-gray-500"}`}></div>
        </>
      ))}
    </div>
      ) : (
    <div className='h-1 w-full rounded-full bg-blue-600'></div>
      )}
      <span className='text-blue-700'>
    {icon}
      </span>
      {normalState ? (
        <h2 className='font-medium text-blue-900 text-base'>{findLabel(state!)}</h2>
      ) : (
        <h2 className='font-medium text-blue-900 text-base'>{title}</h2>
      )}
    <p className='text-xs text-blue-950'>{desc}</p>
  </button>
  )
}

// const ToggleButton = (props: ComponentPropsWithoutRef<'button'>) => {
//   const theme = useStorageSuspense(exampleThemeStorage);
//   return (
//     <button
//       className={
//         props.className +
//         ' ' +
//         'font-bold mt-4 py-1 px-4 rounded shadow hover:scale-105 ' +
//         (theme === 'light' ? 'bg-white text-black' : 'bg-black text-white')
//       }
//       onClick={exampleThemeStorage.toggle}>
//       {props.children}
//     </button>
//   );
// };

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
