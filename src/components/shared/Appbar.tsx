"use client";
import ThemeToggle from "@/components/shared/themetoggle";
import { signIn, signOut } from "next-auth/react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

interface Content {
  content: string;
}

export const Appbar = () => {
  const [sidebarData, setSidebarData] = useState<Content[] | null>([]);
  const [name, setName] = useState<string | null>(null)
  const [show,setShow] = useState<boolean>(false);
  useEffect(() => {
    setSidebarData([
      {content:"first element"} ,
      {content:"second element"}
    ])
    const getName = async()=>{
    const response = await fetch("/api/user", {
      method: 'GET',
    }).then(data => data.json())
      .catch(() => {console.log("Nothing happened");
      });
    
      if(response){
      setName(response.name);
      setShow(true);
    }
  }
    getName()
  }, [])
  

  // Fetch data when sidebar opens
  const handleSidebarOpen = async () => {
    try {
      const response = await fetch("/api/your-endpoint");
      const data = await response.json();
      setSidebarData(data);
    } catch (error) {
      console.error("Error fetching sidebar data:", error);
    }
  };

  return (
    <div>
      <Card className=" flex justify-evenly space-x-11 py-4">
        {show && (
          <div className="flex">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSidebarOpen}
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px]">
                <div className="mt-4">
                    <div className="p-4 mb-2">
                      Hello {' '} <span className=" text-red-700">{name}</span>
                    </div>
                  {sidebarData && sidebarData.map((item, index) => (
                    <Card key={index} className="p-4 mb-2">
                      {item.content}
                    </Card>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        )}
        <ThemeToggle />
        <div className=" flex md:gap-10">
          {!name && 
          <Button variant="outline" onClick={() => signIn()}>
            Signin
          </Button>}
          {name && 
          <Button variant="outline" className=" mr-5" onClick={() => signOut()}>
            Sign out
          </Button>}
        </div>
      </Card>
    </div>
  );
};
