"use client";
import CustomPagination from "@/components/shared/custom-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Eye } from "lucide-react";
import React, { useState } from "react";

const SessionTable = () => {
  const tableHeaderClass = "text-center text-white font-medium";
  const tableRowClass = "h-[50px] text-center opacity-70 font-medium";

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <Table>
          <TableHeader className="bg-primary hover:bg-primary/90 h-[50px]">
            <TableRow>
              <TableHead className={`${tableHeaderClass}`}>
                Session ID
              </TableHead>
              <TableHead className={`${tableHeaderClass}`}>Date</TableHead>
              <TableHead className={`${tableHeaderClass}`}>
                Summary Preview
              </TableHead>
              <TableHead className={`${tableHeaderClass}`}>Score</TableHead>
              <TableHead className={`${tableHeaderClass}`}>
                Risk Level
              </TableHead>
              <TableHead className={`${tableHeaderClass}`}>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell
                className={`${tableRowClass} text-primary font-semibold opacity-100`}
              >
                SES-2025-1287
              </TableCell>
              <TableCell className={`${tableRowClass}`}>Dec 10, 2025</TableCell>
              <TableCell className={`${tableRowClass} max-w-[150px]`}>
                Patient showed significant improvement in mobility exercises.
                Pain ...
              </TableCell>
              <TableCell className={`${tableRowClass} font-bold opacity-100`}>
                97
              </TableCell>
              <TableCell className={`${tableRowClass}`}>
                <button className="px-8 py-2 bg-green-100 text-green-800 font-bold rounded-md">
                  Low
                </button>
              </TableCell>

              <TableCell
                className={`${tableRowClass} opacity-100 flex items-center justify-center gap-4`}
              >
                <button>
                  <Eye className="h-6 w-6 text-primary" />
                </button>

                <button>
                  <Download className="h-5 w-5 text-primary" />
                </button>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell
                className={`${tableRowClass} text-primary font-semibold opacity-100`}
              >
                SES-2025-1287
              </TableCell>
              <TableCell className={`${tableRowClass}`}>Dec 10, 2025</TableCell>
              <TableCell className={`${tableRowClass} max-w-[150px]`}>
                Patient showed significant improvement in mobility exercises.
                Pain ...
              </TableCell>
              <TableCell className={`${tableRowClass} font-bold opacity-100`}>
                97
              </TableCell>
              <TableCell className={`${tableRowClass}`}>
                <button className="px-8 py-2 bg-green-100 text-green-800 font-bold rounded-md">
                  Low
                </button>
              </TableCell>

              <TableCell
                className={`${tableRowClass} opacity-100 flex items-center justify-center gap-4`}
              >
                <button>
                  <Eye className="h-6 w-6 text-primary" />
                </button>

                <button>
                  <Download className="h-5 w-5 text-primary" />
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="opacity-60">Showing 1 to 5 of 12 results</h1>
        </div>

        <div>
          <CustomPagination
            currentPage={currentPage}
            onPageChange={() => setCurrentPage(5)}
            totalPages={5}
          />
        </div>
      </div>
    </div>
  );
};

export default SessionTable;
