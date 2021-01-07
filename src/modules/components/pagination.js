import React, { useEffect, useState } from "react";
import queryDecoder from "../../utils/queryDecoder";
import { Pagination } from '@material-ui/lab';
import '../../index.css';
import { Redirect } from "react-router-dom";

export default ({ location, totalPages }) => {
  const currentUrl = location.pathname;
  const decodedQuery = queryDecoder(location.search);
  const [currentPage, setCurrentPage] = useState(Number(decodedQuery.page) || 1);
  const [pageIsSelected, setPageIsSelected] = useState(false);

  const handlePaginationChange = (e, page) => {
    setPageIsSelected(true);
    setCurrentPage(page);
  }

  console.log({ pageIsSelected, currentPage });

  useEffect(() => {
    setPageIsSelected(false);
  }, [currentPage])

  if (pageIsSelected) {
    return (
      <Redirect to = {`${currentUrl}?page=${currentPage}`} />
    )
  }

  return (
    <Pagination 
      count = {totalPages}
      size = "large"
      variant = "outlined"
      onChange = {handlePaginationChange}
      siblingCount = {2}
      boundaryCount = {2}
      defaultPage = {currentPage}
      className = "d-grid align-tems-center justify-items-center"
    />
  )
}