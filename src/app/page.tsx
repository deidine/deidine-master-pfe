import { Button } from "antd";
import Link from "next/link";

 
export default function Home() {
  return (
   <div>
   <Link href="/login">  <Button>login</Button></Link>
    <Button>create form localy</Button>
   </div>
  );
}
