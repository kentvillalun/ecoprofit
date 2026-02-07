
export const Card = ({children, className = ''}) => {

    return (
        <div className={`flex  bg-white rounded-xl shadow-md p-4 items-center ${className}`}>
            {children}
        </div>
    )
}