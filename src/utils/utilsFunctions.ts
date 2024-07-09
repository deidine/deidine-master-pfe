import { elementsData } from "@/data/data";

 function idGenerator(): string {
    return Math.floor(Math.random() * 10001).toString();
  }
   function nameGenerator(): string {
    return Math.random().toString(36).substring(2, 15) ;

    // return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function GetFormById(id:number):Form{
    const data= elementsData.find((element)=>(
         element.id==id
     ))
 return data!;
 }

 function DeleteFormById(id:number):Form[]{
    const data= elementsData.filter(
        (element)=>(
         element.id==id
     ))
 return data!;
 }
export { idGenerator,nameGenerator,GetFormById,DeleteFormById }
