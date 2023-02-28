import { Box, Button, Container } from "@mui/material";
import React from "react";
import { useAppContext } from "../context/appContext";

const PageBtnContainer = () => {
  const { numOfPages, page, changePage } = useAppContext();
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    changePage(newPage);
  };
  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    changePage(newPage);
  };
  return (
    <Container>
      <Box display={"flex"} mt="2rem">
        <Button variant="contained" onClick={prevPage}>
          prev
        </Button>
        {pages.map((pageNumber) => {
          return (
            <Button
              type="Button"
              key={pageNumber}
              className={pageNumber === page ? "pageBtn active" : "pageBtn"}
              onClick={() => changePage(pageNumber)}
            >
              {pageNumber}
            </Button>
          );
        })}
        <Button variant="contained" onClick={nextPage}>
          next
        </Button>
      </Box>
    </Container>
  );
};
export default PageBtnContainer;
