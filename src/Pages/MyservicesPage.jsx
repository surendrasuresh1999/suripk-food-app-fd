import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import Cookies from "js-cookie";
import { Baseurl } from "../BaseUrl";
import { useQuery } from "@tanstack/react-query";
import Loader from "../common/Loader";
import ConnectionLost from "../common/ConnectionLost";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { EnvelopeIcon, MapPinIcon, UserIcon } from "@heroicons/react/20/solid";
import noDataImg from "../../src/assets/No data-pana (4).svg";
import { useNavigate } from "react-router-dom";
import { isAfter } from "date-fns";
import dayjs from "dayjs";
const tableCells = [
  "Event type",
  "User",
  "Status",
  "Mobile",
  "Date",
  "No.Guests",
  "Action",
];
const MyservicesPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  const jwtToken = Cookies.get("jwtToken");

  const fetchBlogs = async () => {
    return await fetch(`${Baseurl.baseurl}/api/service`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((res) => res.json());
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["blogsData"],
    queryFn: fetchBlogs,
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const renderAddressPopOver = (address) => {
    return (
      <div className="flex justify-center">
        <Popover>
          <PopoverButton className="w-full rounded-md border border-orange-600 px-2 py-1 text-sm/6 font-semibold text-orange-400 outline-none">
            Event location
          </PopoverButton>
          <Transition
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <PopoverPanel
              anchor="bottom"
              className={`popover-shadow food-card divide-y divide-white/5 rounded-md bg-white text-sm/6 text-gray-600 [--anchor-gap:var(--spacing-5)]`}
            >
              <p className="flex items-center gap-1 p-3 text-18size font-semibold">
                <MapPinIcon className="h-4 w-4 text-gray-600" />
                {address}
              </p>
            </PopoverPanel>
          </Transition>
        </Popover>
      </div>
    );
  };

  const handleLogStatus = (date) => {
    const parts = date.split("/");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are zero-indexed
    const year = parseInt(parts[2], 10);
    const result = isAfter(
      new Date(year, month, day),
      dayjs().format("DD/MM/YYYY"),
    );
    return result;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-22size font-bold text-gray-900 sm:text-28size">
        Service history
      </h1>
      <span className="mt-2 text-sm text-gray-500 sm:text-16size">
        Check the status of your recent services
      </span>
      {isPending ? (
        <Loader />
      ) : error ? (
        <ConnectionLost />
      ) : data && data.status === 401 ? (
        navigate("/login")
      ) : data.services?.length > 0 ? (
        <div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead className="bg-gray-900">
                <TableRow>
                  {tableCells.map((cell, i) => (
                    <TableCell
                      key={i}
                      sx={{ color: "#FFF" }}
                      align={i === 0 || i === 1 ? "left" : "center"}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.services
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.eventTitle}</TableCell>
                      <TableCell align="center">
                        <div className="flex flex-col gap-1">
                          <span className="flex items-center gap-1">
                            <UserIcon className="h-4 w-4 text-gray-600" />
                            {row.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <EnvelopeIcon className="h-4 w-4 text-gray-600" />
                            {row.email}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        {handleLogStatus(row.eventDate) ? (
                          <span className="rounded-full bg-indigo-400 p-2 text-white">
                            Up coming
                          </span>
                        ) : (
                          <span className="rounded-full bg-green-400 p-2 text-white">
                            Completed
                          </span>
                        )}
                      </TableCell>
                      <TableCell align="center">{row.phone}</TableCell>
                      <TableCell align="center">{row.eventDate}</TableCell>
                      <TableCell align="center">{row.NumberOfGuests}</TableCell>
                      <TableCell align="center">
                        {renderAddressPopOver(row.eventLocation)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.services.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img src={noDataImg} alt="no-data" className="h-52" />
          <h1 className="text-24size font-bold text-gray-600">
            No service data found
          </h1>
          <p className="mt-2 text-center text-18size text-gray-500">
            You haven't booked any services yet. <br /> Please explore our
            services and make your first booking today!
          </p>
        </div>
      )}
    </div>
  );
};

export default MyservicesPage;
