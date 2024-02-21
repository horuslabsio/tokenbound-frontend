import SearchIcon from "svg/SearchIcon";

const SearchNFT = () => {
  return (
    <div className="relative xsm:w-[90%] w-[14rem]">
      <input
        className="bg-off-white py-4 px-16  w-full h-full rounded-[8px]"
        role="search"
        type="text"
        name="search"
        id="search"
        placeholder="Search NFTs"
      />
      <span
        style={{
          top: "calc(50% - 2em /2)",
        }}
        className="absolute px-4 text-gray-500  left-0"
      >
        <SearchIcon />
      </span>
    </div>
  );
};

export default SearchNFT;
