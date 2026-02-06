
export const PageContent = ({children, className = ''}) => {
    
    return (
        <div className={`absolute left-0 right-0 top-18 h-[calc(100dvh-72px)] p-3 flex flex-col gap-6 overflow-y-auto pb-[calc(120px+env(safe-area-inset-bottom))] ${className}`}>
            {children}
        </div>
    )
}