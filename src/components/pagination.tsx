type Props = {
  nextPage: ()=>void
  backPage: ()=>void
  page: number
}

export const Pagination = ({nextPage,backPage,page}:Props)=>{
  return(
    <footer className=" flex items-center justify-between mt-4 mb-10">
       {page !== 1 
       ? ( <button className="border bg-blue-300 text-white p-2 rounded hover:bg-blue-400" onClick={backPage}>Página Anterior</button>) 
       : (<div></div>)}
        <button className="border bg-blue-300 text-white p-2 rounded hover:bg-blue-400" onClick={nextPage}>Proxima página</button>
      </footer>
  )
}