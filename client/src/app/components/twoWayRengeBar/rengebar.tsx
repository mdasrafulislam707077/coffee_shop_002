import { useState } from "react";
import ReactSlider from "react-slider";
import { fonts } from "../fonts/font";
import "./style.css";
interface DoubleHandleSliderProps{
    max:number,
    min:number
}   
const DoubleHandleSlider = ({max=100,min=0}:DoubleHandleSliderProps) => {
  const [values, setValues] = useState([min, max]);

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
                if (e.target.value>max) {
                    setValues([max,values[1]])
                }else if(e.target.value<min){
                    setValues([min,values[1]])
                }else if (e.target.value==''|| e.target.value==null || e.target.value==undefined) {
                    setValues([min,values[1]])
                }
                
                
                else{
                    setValues([e.target.value,values[1]])
                }
               
            }}
            max={max}
            min={min}
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
                
                if (e.target.value>max) {
                    setValues([values[0],max])
                }else if(e.target.value<min){
                    setValues([values[0],min])
                }else if (e.target.value==''|| e.target.value==null || e.target.value==undefined) {
                    setValues([values[0],min])
                }else {
                    setValues([values[0],e.target.value])
                }
            }}
            max={max}
            min={min}
            className={`p-1  bg-transparent outline-none border rounded-sm h-full w-full ${fonts.font_7.className}`}
          />
        </span>{" "}
      </div>
      <ReactSlider
        value={values}
        onChange={(val) => setValues(val)}
        className="horizontal-slider"
        thumbClassName="thumb"
        trackClassName="track"
        min={min}
        max={max}
        withTracks={true}
        pearling
        minDistance={10}
      />
    </div>
  );
};

export default DoubleHandleSlider;
