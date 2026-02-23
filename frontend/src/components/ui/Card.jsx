
export const Card = ({children, className = ''}) => {

    return (
        <div className={`flex bg-white rounded-2xl shadow p-4 items-center ${className}`}>
            {children}
        </div>
    )
}