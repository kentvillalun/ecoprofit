

export const Empty = ({text, subtext}) => {

    return (
        <div className="flex flex-col items-center justify-center min-h-full p-20 gap-1 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#74C857]">
            EcoProfit
          </p>
          <h1 className="text-3xl font-semibold text-[#1F2937]">
            {text}
          </h1>
          <p className="text-sm text-[#6B7280]">
            {subtext}
          </p>
        </div>
    )

}