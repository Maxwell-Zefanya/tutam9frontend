export default function Filler () {
    return(
        <div>
            <div className="flex flex-col h-[40px] absolute top-0">
                <div  className="relative top-0 w-screen h-[60px] bg-[#e7e2db]"/>
                <div  className="relative top-0 w-screen h-[40px] bg-[#2A0803]"/>
            </div>

            <div className="flex flex-col h-[40px] absolute bottom-0">
                <div  className="relative bottom-0 w-screen h-[40px] bg-[#2A0803]"/>
                <div  className="relative bottom-0 w-screen h-[60px] bg-[#e7e2db]"/>
            </div>
        </div>
    );
}