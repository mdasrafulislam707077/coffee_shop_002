export default function Loading(){
    return  <div className="h-full w-full flex justify-center items-center relative p-10">
    <div className="animate-spin 0 h-10 aspect-square absolute border-x-2 rounded-full"></div>
    <div className="animate-spin h-10 aspect-square absolute border-y rounded-full"></div>
  </div>
}