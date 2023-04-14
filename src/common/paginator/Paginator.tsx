import React, { FC, memo, useState } from "react";
import styles from "./Paginator.module.css";
import SuperButton from "../../components/SuperButton/SuperButton";

type PaginatorPropsType = {
  totalUserCount: number;
  pageSize: number;
  onChangePageClick: (currentPage: number) => void;
  portionSize: number;
  currentPage: number;
};

const Paginator: FC<PaginatorPropsType> = memo(
  ({
    totalUserCount,
    pageSize,
    onChangePageClick,
    portionSize,
    currentPage,
  }) => {
    let [portionNumber, setPortionNumber] = useState(1);

    let pagesCount = Math.ceil(totalUserCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;
    const conditionForShowPrevButton = portionNumber > 1;
    const conditionForShowNextButton = portionCount > portionNumber;

    const onPrevButtonClick = () => {
      setPortionNumber(portionNumber - 1);
    };

    const onNextButtonClick = () => {
      setPortionNumber(portionNumber + 1);
    };

    return (
      <div className={styles.paginator}>
        {conditionForShowPrevButton && (
          <SuperButton onClick={onPrevButtonClick}>PREV</SuperButton>
        )}

        {pages
          .filter(
            (page) =>
              page >= leftPortionPageNumber && page <= rightPortionPageNumber
          )
          .map((page) => {
            const onPageClick = () => {
              onChangePageClick(page);
              window.scrollTo(0, 0);
            };

            return (
              <span
                key={page}
                className={
                  page === currentPage ? styles.currentPage : styles.pageNum
                }
                onClick={onPageClick}
              >
                {page}
              </span>
            );
          })}

        {conditionForShowNextButton && (
          <SuperButton onClick={onNextButtonClick}>NEXT</SuperButton>
        )}
      </div>
    );
  }
);

export default Paginator;
