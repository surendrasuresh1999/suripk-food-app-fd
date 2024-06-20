import React, { useState } from "react";
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

const rows = [
  { id: 1, name: "Cupcake", calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
  { id: 2, name: "Donut", calories: 452, fat: 25.0, carbs: 51, protein: 4.9 },
  { id: 3, name: "Eclair", calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
  {
    id: 4,
    name: "Frozen yoghurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
  },
  {
    id: 5,
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
  },
  {
    id: 6,
    name: "Honeycomb",
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
  },
  {
    id: 7,
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
  },
  {
    id: 8,
    name: "Jelly Bean",
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
  },
  { id: 9, name: "KitKat", calories: 518, fat: 26.0, carbs: 65, protein: 7.0 },
  {
    id: 10,
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0.0,
  },
];

const tabsArr = [
  { title: "All" },
  { title: "Up coming" },
  { title: "Completed" },
  { title: "Cancel" },
  // { title: "Rejected" },
];
const tableCells = ["Event","Name","Email","Mobile","Date","No.Guests","Action"]
const MyservicesPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
      ) : data.services.length > 0 ? (
        <div className="space-y-6">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6">
            {tabsArr.map((tab, i) => (
              <li
                key={i}
                className={`rounded-3xl ${i === 0 ? "bg-orange-200 font-bold text-orange-500" : "bg-white"} p-3 text-center font-medium tracking-wide shadow`}
                // onClick={()=>se}
              >
                {tab.title}
              </li>
            ))}
          </ul>
          <TableContainer component={Paper}>
            <Table>
              <TableHead className="bg-gray-900">
                <TableRow>
                  {tableCells.map((cell,i)=>(
                    <TableCell key={i} sx={{ color: "#FFF" }} align={i !== 0 ? "center" : ""}>{cell}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.services
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row,index) => (
                    <TableRow key={index}>
                      <TableCell>{row.eventTitle}</TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.phone}</TableCell>
                      <TableCell align="center">{row.eventDate}</TableCell>
                      <TableCell align="center">{row.NumberOfGuests}</TableCell>
                      <TableCell align="center">View Loaction</TableCell>
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
        <div>No data found</div>
      )}
    </div>
  );
};

export default MyservicesPage;
