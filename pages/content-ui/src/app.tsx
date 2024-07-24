import { useStorageSuspense } from '@chrome-extension-boilerplate/shared';
import { aiAssistantStorage } from '../../../packages/storage/dist/esm';
import Popover from './components/PopOver';
import { EyeIcon } from '@heroicons/react/16/solid';

const check = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function App() {
  const activated = useStorageSuspense(aiAssistantStorage);

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
                className="h-full shadow-md border-[1px] border-gray-300 items-center overflow-y-auto px-2 py-4 bg-white rounded-full flex flex-col gap-3">
                {check.map(c => (
                  <div key={c} className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-400">
                    <EyeIcon />
                  </div>
                ))}
              </div>
            </div>
          </Popover>
          <button
            onClick={() => {
              console.log(chrome.runtime.sendMessage({}))
              chrome.runtime.sendMessage({action: 'open_side_panel'});
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
