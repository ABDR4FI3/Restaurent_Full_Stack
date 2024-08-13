import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rows: number;
  setRows: React.Dispatch<React.SetStateAction<number>>;
  filtredData: any[];
  toast(message : string): void;
}
const PaginationNav: React.FC<Props> = ({
  page,
  setPage,
  rows,
  setRows,
  filtredData,
  toast,
}) => {
  const RowsOptions = [5, 10, 15];
  return (
    <div className="flex items-center justify-center gap-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg font-montserrat">
      <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-600">
        <label
          htmlFor="rows"
          className="mr-3 text-gray-700 dark:text-gray-300 font-semibold"
        >
          Number of Rows:
        </label>
        <select
          name="rows"
          id="rows"
          value={rows}
          onChange={(e) => setRows(Number(e.target.value))}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        >
          {RowsOptions.map((option) => (
            <option
              key={option}
              value={option}
              className="bg-white dark:bg-gray-700"
            >
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            } else {
              toast("You can't go back any further.");
            }
          }}
          className="flex items-center justify-center p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <GrFormPrevious
            size={35}
            className="text-gray-600 dark:text-gray-300"
          />
        </button>
        <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          {page}
        </div>
        <button
          onClick={() => {
            if (page + 1 <= Math.ceil(filtredData.length / rows)) {
              setPage(page + 1);
            } else {
              toast("You have reached the last page.");
            }
          }}
          className="flex items-center justify-center p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <MdNavigateNext
            size={35}
            className="text-gray-600 dark:text-gray-300"
          />
        </button>
      </div>
    </div>
  );
};

export default PaginationNav;
