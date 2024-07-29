"use client";

import useGeneral from "@/hooks/useGeneral";
import { Button } from "antd";
import Link from "next/link";

export default function Home() {
  const { setIsQuestUser } = useGeneral();
  return (
    <div>
      <Link href="/login"> 
        <Button
          onClick={() => {
            setIsQuestUser(false);
          }}
        >
          login
        </Button>
      </Link>
      <Button onClick={() => {
            setIsQuestUser(true);
          }}>create form localy</Button>
    </div>
  );
}
