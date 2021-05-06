import NavBar from "../components/NavBar/NavBar";
import SelectionBar from "../components/SelectionBar/SelectionBar";

export default function Home() {
  return (
    <div className="h-[100vh] w-[100%] ">
      <NavBar />
      <SelectionBar />
    </div>
  );
}
