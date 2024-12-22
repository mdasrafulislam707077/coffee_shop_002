import { fonts } from "@/app/components/fonts/font";
import Image from "next/image";
export default function BranchInfoPage() {
  return (
    <div className={`w-full relative  `}>
      <div className="w-full relative h-[900px]">
        <Image
          src={
            "https://images.unsplash.com/photo-1507226983735-a838615193b0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&quot"
          }
          alt=""
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="w-[1400px] m-auto relative mt-4 pb-10 text-white">
        <div className={`text-5xl mb-5`} style={fonts.font_3.style}>
          Prodect-Name
        </div>
        <div className="w-full relative" style={fonts.font_11.style}>
          <TextChankMainHeader />
          <TextChankMainHeader />
          <TextChankMainHeader />
        </div>
      </div>
    </div>
  );
}

function TextChankMainHeader() {
  return (
    <div className="w-full relative mb-10 ">
      <TextChankBigHeader />
      <TextChankBigDes />
      <TextChankPointHeader />
      <TextChankPointDes />
      <TextChankPoint />
      <TextChankPoint />

      







    </div>
  );
}
function TextChankBigHeader() {
    return <div className="w-full relative text-xl mb-3" style={fonts.font_1.style}>
 header
    </div>
}

function TextChankBigDes() {
    return <div className="w-full relative  mb-3" >
 Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
        dignissimos iusto nostrum tempora illo neque porro! Est vero nemo dicta
        voluptates veniam, nam in minus repellat dignissimos tenetur nulla ea!
        Natus itaque dolorem eaque, commodi dicta laborum magnam! Explicabo
        accusantium tenetur eveniet cumque? Delectus eaque ducimus,
        perspiciatis, laboriosam eligendi veritatis explicabo sunt, nostrum
        accusamus natus maxime temporibus quae dicta cupiditate.
    </div>
}
function TextChankPointHeader() {
    return <div className="w-full relative" style={fonts.font_1.style}>
    Point-Header
  </div>
}
function TextChankPointDes() {
    return <div className="mt-1 mb-4 text-sm text-gray-300" style={fonts.font_11.style}>   
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus ea nostrum rerum? Beatae, consequatur doloremque porro omnis unde nam dignissimos aliquid molestiae ipsam quo blanditiis est alias voluptatibus ipsa exercitationem!
        Consequuntur voluptatum, earum debitis cumque at quisquam culpa ipsa eos, labore quidem pariatur! Nobis consequuntur sequi minus dignissimos culpa perspiciatis dolor, recusandae reiciendis odio ullam obcaecati, facilis veritatis consectetur alias!
    </div>
}
function TextChankPoint() {
    return <div className="w-full relative flex items-start mt-2">
    <div className="h-[15px] w-[15px]  border p-1 rounded relative border-gray-300 mt-1  mr-4">
      <div className="h-[15px] w-[15px]  relative bg-gray-300 rounded"></div>
    </div>
    <div className="text-sm text-gray-300">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit alias
      et iusto labore, quam quae, atque molestiae tempora eum ut mollitia
      officia culpa quidem voluptate esse repellendus consequuntur soluta
      quisquam!
    </div>
  </div>
}