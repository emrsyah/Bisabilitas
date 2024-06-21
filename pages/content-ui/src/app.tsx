import { useStorageSuspense } from '@chrome-extension-boilerplate/shared';
import { useEffect } from 'react';
import { exampleThemeStorage } from '../../../packages/storage/dist/esm';

export default function App() {
  const theme = useStorageSuspense(exampleThemeStorage);

  useEffect(() => {
    console.log('content ui loaded');
  }, []);

  return (
    <div className="flex gap-1 text-blue-500"
    style={{
      backgroundColor: theme === 'light' ? '#eee' : '#222',
    }}
    >
      {theme} Edit <strong>pagex/content-ui/src/app.tsx</strong> and save to reload.
    </div>
  );
}
