import { useEffect } from "react";

export default function NavBar() {
  return (
    <div className="h-[10%] w-full flex items-center justify-center shadow-xl flex-col">
      <h1 className="text-3xl font-bold text-green-500">COVID Fighter</h1>
      <p className="text-xs text-gray-300 ">Made by Dhruv Nakum ©2021</p>
    </div>
  );
}
