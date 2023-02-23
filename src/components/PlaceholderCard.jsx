const PlaceholderCard = () => {
  return (
    <div className="max-w-sm border-2 border-gray-300 dark:border-gray-900 shadow-lg rounded-md p-4 bg-amber-100 dark:bg-blue-900">
      <header className="flex justify-between mb-2">
      <PlaceholderBar size="sm"/>
      <PlaceholderBar size="sm"/>
      </header>

      <div className="h-36 border-2 border-gray-300 dark:border-gray-900 rounded flex justify-center items-center bg-red-200 dark:bg-gray-500 mb-2 bg-cover bg-center" style={{backgroundImage: "url(/battle.png)"}}>
      </div>

      <div className="mb-2">
      <PlaceholderBar size="sm"/>
      </div>

      <div className="border-2 dark:border-gray-900 rounded p-1 bg-white border-gray-300 dark:bg-gray-500">
        <PlaceholderBar/>
        <PlaceholderBar/>
        <PlaceholderBar/>
        <PlaceholderBar/>
        <PlaceholderBar/>
      </div>
    </div>
  );
};

const PlaceholderBar = ({size}) => {
  return size === "sm" ?  <div className="h-6 w-16 animate-pulse dark:bg-slate-600 bg-slate-200 rounded-md"></div> :  <div className="h-5 w-60 animate-pulse dark:bg-slate-600 bg-slate-200 my-2 rounded-md"></div>
}

export default PlaceholderCard;
