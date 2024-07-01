import {  withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';
import { EyeIcon, ComputerDesktopIcon, SpeakerWaveIcon, NewspaperIcon, DocumentArrowUpIcon, PhotoIcon, ArrowsPointingOutIcon, BeakerIcon } from '@heroicons/react/16/solid'
// import {  useStorageSuspense } from '@chrome-extension-boilerplate/shared';
// import { exampleThemeStorage, fontSizeStorage } from '@chrome-extension-boilerplate/storage';
// import { ComponentPropsWithoutRef } from 'react';

type AccesibilityCardProps = {
  title: string
  desc: string
  icon: JSX.Element
};

const accesibilityData: AccesibilityCardProps[] = [
  {
    title: 'Pengaturan Kontras',
    desc: 'Bantu penyandang disabilitas penglihatan dengan kontras warna optimal',
    icon: <EyeIcon className='h-6 w-6' />
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
    icon: <PhotoIcon className='h-6 w-6' />
  },
  {
    title: 'Jarak Teks',
    desc: 'Sesuaikan spasi teks untuk kenyamanan penyandang disabilitas visual.',
    icon: <ArrowsPointingOutIcon className='h-6 w-6' />
  },
  {
    title: 'Pengatur Saturasi',
    desc: 'Atur warna sesuai kebutuhan penyandang disabilitas sensitif cahaya.',
    icon: <BeakerIcon className='h-6 w-6' />
  },
]

const SidePanel = () => {
  // const theme = useStorageSuspense(exampleThemeStorage);
  // const fontSize = useStorageSuspense(fontSizeStorage);

  // const changeFont = async () => {
  //   if (fontSize.current === 'small') {
  //     await fontSizeStorage.changeFontSize('normal');
  //   } else if (fontSize.current === 'normal') {
  //     await fontSizeStorage.changeFontSize('medium');
  //   } else if (fontSize.current === 'medium') {
  //     await fontSizeStorage.changeFontSize('large');
  //   } else {
  //     await fontSizeStorage.changeFontSize('small');
  //   }
  // };

  


  return (
    <div>
      <div className='bg-blue-900 text-white p-2'>
      <nav className='mx-4 sm:mx-auto my-2 max-w-sm'>
        <h1 className='font-semibold text-xl'>Bisabilitas</h1>
      </nav>
      </div>
      <main className='grid grid-cols-2 gap-4 mx-4 sm:mx-auto my-6'>
        {accesibilityData.map((d) => (  
        <AccesibilityCard
        key={d.title}
        desc={d.desc}
        title={d.title}
        icon={d.icon}
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


const AccesibilityCard = ({desc, icon, title} : AccesibilityCardProps) => {
  return (
    <div className='col-span-1  w-full shadow p-4 rounded-sm flex flex-col gap-2'>
      <span className='text-blue-700'>
    {icon}
      </span>
    <h2 className='font-medium text-blue-900 text-base'>{title}</h2>
    <p className='text-xs text-blue-950'>{desc}</p>
  </div>
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
