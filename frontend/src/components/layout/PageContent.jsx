
export const PageContent = ({children, className = ''}) => {
    
    

    return (
        <div className={`absolute left-0 right-0 top-18 md:top-0 h-[calc(100dvh-72px)] p-3 flex flex-col gap-6 md:h-screen overflow-y-auto ${className}`}>
            {children}
        </div>
    )
}