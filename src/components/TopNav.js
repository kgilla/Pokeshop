const TopNav = ({ searchQuery, setSearchQuery }) => {
  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="h-12 bg-green-600 flex justify-between items-center px-8 w-screen fixed">
      <h1 className="text-white text-lg font-bold">Pokestore</h1>
      <input
        className="rounded-md py-1 px-3"
        value={searchQuery}
        onChange={handleSearchInput}
        placeholder="Search"
      />
    </header>
  );
};

export default TopNav;
