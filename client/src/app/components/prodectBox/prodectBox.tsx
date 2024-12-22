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
import StartBar from "../starbar/starbar";
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

const OptionSelector = () => {
  const [option, setOption] = useState(0);

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth className="outline-none border-none text-white">
        <InputLabel
          className={`${fonts.font_7.className} outline-none border-none `}
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
          className={` bg-transparent outline-none border-none text-sm custom-select text-white ${fonts.font_11.className}`}
        >
          <MenuItem value={0} className={`${fonts.font_11.className} text-sm`}>
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
          <MenuItem
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
          </MenuItem>
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
  isCoffee:boolean
}
export default function ProductBox(props: ProductBoxProps) {
  const [prodect, setProdect] = useState([]);
  const [totalpagination, setTotalpagination] = useState(1);
  function getProdectitemns(page) {
    getItems({
      prodectType: props.isCoffee? PRODECT_TYPE.COFFEE:PRODECT_TYPE.TEA,
      pagination: page,
      callback: (value) => {
        if (value.data) {
          setTotalpagination(value.data?.totalPagination);
          setProdect(value.data?.items);
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
      <div className="w-full flex mb-20">
        <div className={`min-w-[300px] h-full relative mr-5 `}>
          <div
            className={`w-full py-2 px-2 ${fonts.font_7.className} text-white`}
          >
            Price Range
          </div>
          <DoubleHandleSlider />
          <div
            className={`w-full py-2 px-2 ${fonts.font_7.className} text-white`}
          >
            Rating
          </div>
          <div className="w-full flex px-2">
            <StartBar />
          </div>
        </div>
        <div className={`flex-grow h-full `}>
          <div className="w-full py-2 h-20 flex">
            <div
              className={`w-1/2 h-full relative ${fonts.font_11.className} text-white flex items-center`}
            >
              Pagination: 5 - Product (20 to 25) out of 50
            </div>
            <div className="w-1/2 h-full relative flex justify-end">
              <div className="flex items-center">
                <div className={`text-white ${fonts.font_11.className}`}>
                  Sort-by :
                </div>
                <div className="ml-1">
                  <OptionSelector />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-wrap justify-center pt-20  ">
            <PaginatedItems
              itemsPerPage={5}
              maxPagination={totalpagination}
              prodectItems={prodect}
              onPage={(val) => {
                getProdectitemns(val);
              }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
