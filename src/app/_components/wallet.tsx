import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CiWallet } from "react-icons/ci";

export default function Wallet() {
  return (
    <Button
      variant="default"
      aria-label="Select a team"
      className={cn(
        "w-full h-full p-2.5 justify-between bg-gray-700 shadow-none"
      )}
    >
      <div className="flex justify-center items-start">
        <span className="p-1 my-auto bg-gray-600 rounded-md">
          <CiWallet
            className="h-6 w-6 my-auto text-gray-400"
            aria-hidden="true"
          />
        </span>
        <div className="ml-2 flex flex-col items-start text-sm font-medium truncate">
          <span className="text-xs truncate text-white">Available Credits</span>
          <span className="text-md truncate text-gray-300">222.10</span>
        </div>
      </div>
    </Button>
  );
}
