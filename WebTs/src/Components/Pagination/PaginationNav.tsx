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
    <div className="flex items-center justify-center gap-4 p-2">
      <div className="flex items-center">
        {" "}
        <select
          name="rows"
          id=""
          value={rows}
          onChange={(e) => setRows(Number(e.target.value))}
          className="mx-2 border border-black p-2"
        >
          {RowsOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end items-center gap-8">
        {" "}
        <span
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            } else {
              toast("you can't go back any further.");
            }
          }}
        >
          <GrFormPrevious size={35} />
        </span>
        <div className="text-3xl flex ">{page}</div>
        <span
          onClick={() => {
            if (page + 1 <= Math.ceil(filtredData.length / rows)) {
              setPage(page + 1);
            } else {
              toast("you have reached the last page.");
            }
          }}
        >
          <MdNavigateNext size={35} />
        </span>
      </div>
    </div>
  );
};

export default PaginationNav;
