import { AccesibilityCardProps, StateProps } from "@src/SidePanel";

const AccesibilityCard = ({
    desc,
    icon,
    title,
    onClick,
    currentState,
    normalState,
    state,
    smallDisplay,
  }: AccesibilityCardProps) => {
    const findLabel = (state: StateProps[]) => {
      let label = '';
      state.forEach(s => {
        if (s.value === currentState) {
          label = s.label;
        }
      });
      return label;
    };
    return (
      <button
      key={title}
        onClick={onClick}
        className={`hover:border-[2px] hover:border-blue-600 border-[2px] border-gray-100 text-start cursor-pointer col-span-1  w-full shadow px-4 pt-4 pb-2 rounded-md flex flex-col gap-2 ${smallDisplay ? 'items-center' : ''}`}>
        {state ? (
          <div className="flex items-center w-full gap-1">
            {state.map(s => (
              <>
                <div
                  key={s.value}
                  className={`h-1 w-full rounded-full ${s.value === currentState ? 'bg-blue-600' : 'bg-gray-500'}`}></div>
              </>
            ))}
          </div>
        ) : (
          <div className="h-1 w-full rounded-full bg-blue-600"></div>
        )}
        <span className={`text-blue-700 ${smallDisplay ? 'mt-1' : ''}`}>{icon}</span>
        <div className={`${smallDisplay ? 'text-center !text-sm' : 'text-start'}`}>
          {normalState ? (
            <h2 className={`font-medium text-blue-900 ${smallDisplay ? 'text-sm' : 'text-base'}`}>{findLabel(state!)}</h2>
          ) : (
            <h2 className={`font-medium text-blue-900 ${smallDisplay ? 'text-sm' : 'text-base'}`}>{title}</h2>
          )}
        </div>
        {smallDisplay ? null : <p className="text-xs text-blue-950">{desc}</p>}
      </button>
    );
  };

  export default AccesibilityCard