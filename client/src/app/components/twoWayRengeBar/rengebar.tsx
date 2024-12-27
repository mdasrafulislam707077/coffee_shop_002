import { useEffect, useState } from "react";
import ReactSlider from "react-slider";
import { fonts } from "../fonts/font";
import "./style.css";
interface DoubleHandleSliderProps{
    max:number,
    min:number,
    onChange:any
    maxVal:any
    minVal :any
}   
const DoubleHandleSlider = ({max=100,min=0,onChange,maxVal = 100,minVal = 0}:DoubleHandleSliderProps) => {
  const [values, setValues] = useState([min, max]);
  useEffect(()=>{
    setValues([min,max])
  },[min,max])
  return (
    <div>
      <div className="w-full  flex items-center h-12 p-1 text-white">
        {" "}
        <span className="flex-grow h-full ">
          {" "}
          <input
            type="number"
            name=""
            id=""
            value={values[0]}
            onChange={(e) => {
                if (e.target.value>maxVal) {
                    setValues([maxVal,values[1]])
                    if (onChange) {
                      onChange([maxVal,values[1]])
                    }
                }else if(e.target.value<minVal){
                    setValues([minVal,values[1]])
                    if (onChange) {
                      onChange([minVal,values[1]])
                    }
                }else if (e.target.value==''|| e.target.value==null || e.target.value==undefined) {
                    setValues([minVal,values[1]])
                    if (onChange) {
                      onChange([minVal,values[1]])
                    }
                }
                
                
                else{
                    setValues([e.target.value,values[1]])
                    if (onChange) {
                      onChange([e.target.value,values[1]])
                    }
                }
               
            }}
            max={maxVal}
            min={minVal}
            className={`p-1 bg-transparent outline-none border rounded-sm  h-full w-full ${fonts.font_7.className}`}
          />
        </span>{" "}
        <span className={`mx-2 ${fonts.font_3.className}`}>to</span>{" "}
        <span className="flex-grow h-full">
          <input
            type="number"
            name=""
            id=""
            value={values[1]}
            onChange={(e) => {
                
                if (e.target.value>maxVal) {
                    setValues([values[0],maxVal])
                    if (onChange) {
                      onChange([values[0],maxVal])
                    }
                }else if(e.target.value<minVal){
                    setValues([values[0],minVal])
                    if (onChange) {
                      onChange([values[0],minVal])
                    }
                }else if (e.target.value==''|| e.target.value==null || e.target.value==undefined) {
                    setValues([values[0],minVal])
                    if (onChange) {
                      onChange([values[0],minVal])
                    }
                }else {
                    setValues([values[0],e.target.value])
                    if (onChange) {
                      onChange([values[0],e.target.value])
                    }
                }
            }}
            max={maxVal}
            min={minVal}
            className={`p-1  bg-transparent outline-none border rounded-sm h-full w-full ${fonts.font_7.className}`}
          />
        </span>{" "}
      </div>
      <ReactSlider
        value={[(min / maxVal)*100,(max / maxVal)*100  ]}
        onChange={(val) => {
          const [min,max]  = val
          if (onChange) {
            onChange([(maxVal/100 )*min,(maxVal/100 )*max])
          }
        }}
        className="horizontal-slider"
        thumbClassName="thumb"
        trackClassName="track"
        withTracks={true}
        pearling
      />
    </div>
  );
};

export default DoubleHandleSlider;
