import MenuIcon from "@/app/assets/icon/menu.svg";
import getItems from "@/app/network/getItems/getItems";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fonts } from "../fonts/font";
import Footer from "../footer/footer";
import ProdectCard from "../prodectCard/card";
import DoubleHandleSlider from "../twoWayRengeBar/rengebar";

import "./style.css";
const PaginatedItems = ({
  itemsPerPage,
  maxPagination = 0,
  onPage,
  prodectItems,
}) => {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const handleChange = (event, value) => {
    setPage(value);
    if (onPage) {
      onPage(value);
    }
  };

  return (
    <>
      <div className="w-full h-full grid  grid-cols-prodect001-auto-fit gap-5">
        {prodectItems.map((item, index) => {
          return (
            <div key={index} className=" ">
              <ProdectCard
                marginOff
                widthFull
                onDisplay={(value) => {
                  router.push(`/review/${value?.prodectId}`, { scroll: true });
                }}
                id={item._id}
                header={item.header}
                des={item.description}
                image={`${item.mainImage.host}${item.mainImage.path}${item.mainImage.webUrl}`}
                price={item.price}
                discount={item.discount}
              />
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-center text-white">
        <Pagination
          count={maxPagination}
          page={page}
          onChange={handleChange}
          color="standard"
          className="pagination"
        />
      </div>
    </>
  );
};
interface OptionSelectorProps {
  onChange: any;
  defaultVal: any;
}
const OptionSelector = (props: OptionSelectorProps) => {
  const [option, setOption] = useState(props.defaultVal ?? 0);
  useEffect(() => {
    setOption(props.defaultVal);
  }, [props.defaultVal]);
  const handleChange = (event) => {
    setOption(event.target.value);
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl
        fullWidth
        className="outline-none border-none text-white z-[99999999999999] relative "
      >
        <InputLabel
          className={`${fonts.font_7.className} outline-none border-none z-[99999999999999] relative`}
        ></InputLabel>
        <Select
          sx={{
            boxShadow: "none",
            height: "40px",
            color: "white",
            fontSize: "18px",
            outline: "none",
            ".MuiOutlinedInput-notchedOutline": { border: 0, color: "white" },
            "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              border: 0,
              color: "white",
            },
            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: 0,
                color: "white",
              },
          }}
          value={option}
          onChange={handleChange}
          disableUnderline={false}
          className={` bg-transparent outline-none border-none text-xs md:text-sm custom-select z-[99999999999999999999999999999999999999] text-white relative ${fonts.font_11.className}`}
        >
          <MenuItem
            value={0}
            className={`${fonts.font_11.className} text-xs md:text-sm z-[99999999999999999999999999999999999999] relative `}
          >
            default
          </MenuItem>
          <MenuItem
            id="1"
            value={10}
            className={`${fonts.font_11.className} text-xs`}
          >
            price (low - high)
          </MenuItem>
          <MenuItem
            id="1"
            value={20}
            className={`${fonts.font_11.className} text-xs`}
          >
            price (high - low)
          </MenuItem>
          {/* <MenuItem
            id="1"
            value={30}
            className={`${fonts.font_11.className} text-xs`}
          >
            rate (low - high)
          </MenuItem>
          <MenuItem
            id="1"
            value={40}
            className={`${fonts.font_11.className} text-xs`}
          >
            rate (high - low)
          </MenuItem> */}
        </Select>
      </FormControl>
    </Box>
  );
};
export enum PRODECT_TYPE {
  COFFEE,
  TEA,
}
interface ProductBoxProps {
  prodectType: PRODECT_TYPE;
  isCoffee: boolean;
}
export default function ProductBox(props: ProductBoxProps) {
  const [prodect, setProdect] = useState([]);
  const [totalpagination, setTotalpagination] = useState(1);
  const [activeSelectionOption, setActiveSelectionOption] = useState(false);
  const [filterProdect, setFilterProdect] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProdectLength, setTotalProdectLength] = useState(0);
  const [filter, setFilter] = useState({
    toRate: 0,
    priceRange: {
      min: 0,
      max: 10,
    },
    sortby: 0,
  });
  useEffect(() => {
    let newItems = [];
    // if (filter.toRate!=0 && prodect.length!=0) {

    // }
    if (prodect.length != 0) {
      newItems = prodect.filter((element, index) => {
        return (
          filter.priceRange.min <= element.price &&
          filter.priceRange.max >= element.price
        );
      });
    }
    if (prodect.length != 0) {
      if (filter.sortby == 20) {
        newItems = newItems.sort((a, b) => b.price - a.price);
      } else if (filter.sortby == 30) {
      } else if (filter.sortby == 40) {
      } else if (filter.sortby == 10) {
        newItems = newItems.sort((a, b) => a.price - b.price);
      } else {
      }
    }
    setFilterProdect(newItems);
  }, [filter, prodect.length]);
  function getProdectitemns(page) {
    getItems({
      prodectType: props.isCoffee ? PRODECT_TYPE.COFFEE : PRODECT_TYPE.TEA,
      pagination: page,
      callback: (value) => {
        if (value.data) {
          setTotalpagination(value.data?.totalPagination);
          setProdect(value.data?.items);
          setTotalProdectLength(value.data.totalLength);
          let maxVal = 0;
          value.data?.items.forEach((element) => {
            if (maxVal < element.price) {
              maxVal = element.price;
            }
          });
          setMaxPrice(maxVal);
          setFilter({
            ...filter,
            priceRange: { ...filter.priceRange, max: maxVal },
          });
        }
      },
    });
  }
  useEffect(() => {
    getProdectitemns();
  }, []);

  return (
    <div className="max-w-[1600px] w-full m-auto relative h-auto mt-20 p-4">
      <div
        className={`text-7xl text-center ${fonts.font_7.className} text-white`}
      >
        Tea-Items
      </div>
      <div className="w-full flex mb-20 z-[20] relative">
        <div
          className={`min-w-[300px] h-full  mr-5 ${
            activeSelectionOption
              ? "fixed 1077px:relative"
              : " hidden 1077px:relative 1077px:block"
          } top-0 left-0    bg-black z-[111] px-2 1077px:px-0`}
        >
          <div
            className={`w-full py-2 px-2 ${fonts.font_7.className} text-white`}
          >
            Price Range
          </div>
          <DoubleHandleSlider
            min={filter.priceRange.min}
            max={filter.priceRange.max}
            maxVal={maxPrice}
            onChange={(e) => {
              setFilter({
                ...filter,
                priceRange: { ...filter.priceRange, min: e[0], max: e[1] },
              });
            }}
          />
          {/* <div
            className={`w-full py-2 px-2 ${fonts.font_7.className} text-white`}
          >
            Rating
          </div>
          <div className="w-full flex px-2">
            <StartBar
              onChange={(e) => {
                setFilter({ ...filter, toRate: filter.toRate == e ? 0 : e });
              }}
              value={filter.toRate}
            />
          </div> */}
          <div
            className={`w-full py-2 px-2 ${fonts.font_7.className} text-white block md:hidden`}
          >
            Sort-by
          </div>
          <div className="w-full relative  mt-2 block md:hidden z-[99999999999999999999999999999999]">
            <OptionSelector
              defaultVal={filter.sortby}
              onChange={(e) => {
                setFilter({ ...filter, sortby: e });
              }}
            />
          </div>
        </div>
        <div className={`flex-grow h-full `}>
          <div className="w-full py-2 h-20 flex">
            <div
              className={`flex-grow md:flex-grow-0 md:w-1/2 h-full relative ${fonts.font_11.className} text-white flex items-center text-xs md:text-base`}
            >
              Pagination: {currentPage} - Total Items{" "}
              {`(${totalProdectLength})`}
            </div>
            <div className="flex-grow md:flex-grow-0 md:w-1/2 h-full relative flex justify-end">
              <div className="flex items-center text-xs md:text-base">
                <div
                  className={`text-white ${fonts.font_11.className} hidden md:block`}
                >
                  Sort-by :
                </div>
                <div className="ml-1 flex  items-center">
                  <div className="hidden md:block ">
                    <OptionSelector
                      defaultVal={filter.sortby}
                      onChange={(e) => {
                        setFilter({ ...filter, sortby: e });
                      }}
                    />
                  </div>
                  <div
                    className={`h-6 w-6 relative ml-4 cursor-pointer block 1077px:hidden`}
                    onClick={() => {
                      setActiveSelectionOption(!activeSelectionOption);
                    }}
                  >
                    <MenuIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-wrap justify-center pt-20  ">
            <PaginatedItems
              itemsPerPage={5}
              maxPagination={totalpagination}
              prodectItems={filterProdect}
              onPage={(val) => {
                getProdectitemns(val);
                setCurrentPage(val);
              }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
