
export const Card = ({children, className = '', handleClick}) => {

    return (
        <div className={`flex bg-white rounded-2xl shadow p-4 items-center ${className}`} onClick={handleClick}>
            {children}
        </div>
    )
}