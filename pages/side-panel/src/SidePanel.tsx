import {  withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';
import { EyeIcon, ComputerDesktopIcon, SpeakerWaveIcon, NewspaperIcon, DocumentArrowUpIcon, PhotoIcon, ArrowsPointingOutIcon, BeakerIcon } from '@heroicons/react/16/solid'
import { contrastStorage, hideImagesStorage, saturationStorage, textSpacingStorage } from '@chrome-extension-boilerplate/storage';
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

const SidePanel = () => {
  const [contrast, setContrast] = React.useState(contrastStorage.getSnapshot())
  const [textSpacing, setTextSpacing] = React.useState(textSpacingStorage.getSnapshot())


  React.useEffect(() => {
    contrastStorage.subscribe(() => {
      setContrast(contrastStorage.getSnapshot())
    })
    textSpacingStorage.subscribe(() => {
      setTextSpacing(textSpacingStorage.getSnapshot())
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
      icon: <ComputerDesktopIcon className='h-6 w-6' />
    },
    {
      title: 'Navigasi Suara',
      desc: 'Berdayakan penyandang disabilitas motorik menjelajah web dengan suara.',
      icon: <SpeakerWaveIcon className='h-6 w-6' />
    },
    {
      title: 'Dyslexia Friendly',
      desc: 'Dukung penyandang disleksia dengan teks yang lebih mudah dibaca.',
      icon: <NewspaperIcon className='h-6 w-6' />
    },
    {
      title: 'Pembesar Teks',
      desc: 'Perbesar teks bagi penyandang disabilitas penglihatan tanpa merusak layout.',
      icon: <DocumentArrowUpIcon className='h-6 w-6' />
    },
    {
      title: 'Sembuyikan Gambar',
      desc: 'Bantu penyandang disabilitas fokus dengan menyederhanakan tampilan.',
      icon: <PhotoIcon className='h-6 w-6' />,
      onClick: hideImage
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
      onClick: toggleSaturation
    },
  ]

  


  return (
    <div>
      <div className='bg-blue-900 text-white p-2'>
      <nav className='mx-4 sm:mx-auto my-2 max-w-sm'>
        <h1 className='font-semibold text-xl'>Bisabilitasi</h1>
      </nav>
      <button onClick={changeContrast}>cek</button>
      <h2>{contrast}</h2>
      <h3>cek bagian bawah</h3>
      </div>
      <main className='grid grid-cols-2 gap-4 mx-4 sm:mx-auto my-6'>
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
    <button onClick={onClick} className='text-start cursor-pointer col-span-1  w-full shadow px-4 pt-4 pb-2 rounded-sm flex flex-col gap-2'>
      {state ? (
    <div className="flex items-center gap-1">
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
