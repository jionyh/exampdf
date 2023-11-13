import { prisma } from "@/lib/prisma"

export const getData = async(name?:string,pageNumber?:number)=>{

  const page = pageNumber || 1
  const nome = name || ''

  const res = fetch(`http://localhost:3000/api?page=${page}&name=${nome}`)

  console.log(res)
 
}