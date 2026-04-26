export const IconContainer = ({icon, containerColor}) => {
  return (
    <div className={`border p-3 border-gray-100 rounded-lg flex items-center`} style={{ backgroundColor: containerColor}}>
   
      {icon}
    </div>
  );
};
