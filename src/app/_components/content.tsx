import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "./orders/data-table";
import { type Order, columns } from "./orders/columns";
import { faker } from "@faker-js/faker";

const data: Order[] = Array.from({ length: 50 }).map(() => ({
  id: faker.number.int().toString(),
  orderDate: faker.date.recent().toLocaleDateString(),
  amount: faker.number.int({ min: 200, max: 1000 }),
  fees: faker.number.int({ max: 20 }).toString(),
}));

export const Content: React.FC = () => {
  return (
    <>
      <div className="mx-10">
        <div className="text-xl flex justify-between items-center font-semibold text-gray-700 dark:text-white">
          <span className="text-gray-600">Overview</span>
          <div className="flex items-center justify-end">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Last Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">7 Days</SelectItem>
                <SelectItem value="dark">1 Month</SelectItem>
                <SelectItem value="system">3 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-6 mt-3 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
          <div className="bg-white rounded-lg dark:bg-gray-700 shadow">
            <div className="p-6 flex flex-col items-start gap-y-2 justify-between">
              <h4 className="text-xm text-gray-700 dark:text-white">
                Online Orders
              </h4>
              <p className="mt-2 text-dark text-3xl font-semibold">231</p>
            </div>
          </div>

          <div className="bg-white rounded-lg dark:bg-gray-700 shadow">
            <div className="p-6 flex flex-col items-start gap-y-2 justify-between">
              <h4 className="text-xm text-gray-700 dark:text-white">
                Amount Received
              </h4>
              <p className="mt-2 text-dark text-3xl font-semibold">
                ₹ 23,92,312.19
              </p>
            </div>
          </div>
        </div>
        <h1 className="text-xl my-6 flex justify-between items-center font-semibold text-gray-600 dark:text-white">
          Transactions | This Month
        </h1>
        <div className="flex w-full">
          <DataTable
            columns={columns}
            data={data}
            showPagination
            showViewControls
            filterColumn="id"
          />
        </div>
      </div>
    </>
  );
};
