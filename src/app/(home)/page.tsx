"use client";
 
import { Button } from "antd";
import Link from "next/link";

export default function Home() { 
  return (
    <div>
      <h1>Bien venu dans FormBiulder choisir le choix </h1>
      <div className="flex flex-row gap-[40px] mt-[50px] items-center justify-center">
        <div>
          <h3>avecte compte</h3>
          <Link href="/login">
            <Button
              onClick={() => {
              localStorage.setItem("isFormLocalStorage", "false");
              }}
            >
              login
            </Button>
          </Link>
        </div>
        <div>
          <h3>sans compte</h3>

          <Button
            onClick={() => {
              localStorage.setItem("isFormLocalStorage", "true");
 
            }}
          >
            create form localy
          </Button>
        </div>
      </div>
    </div>
  );
}
