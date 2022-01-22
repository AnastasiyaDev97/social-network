import React, {FC, memo, useState} from "react";
import styles from './Paginator.module.css'

type PaginatorPropsType = {
    totalUserCount: number
    pageSize: number
    changePageHandler: (currentPage: number) => void
    portionSize: number
}

const Paginator: FC<PaginatorPropsType> = memo(({
                                                    totalUserCount, pageSize,
                                                    changePageHandler, portionSize
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
    const conditionForShowNextButton = portionCount > portionNumber

    const onPrevButtonClick = () => {
        setPortionNumber(portionNumber - 1)
    }

    const onNextButtonClick = () => {
        setPortionNumber(portionNumber + 1)
    }


    return (
        <div className={styles.paginator}>
            {conditionForShowPrevButton &&
            <button onClick={onPrevButtonClick}>PREV</button>}

            {pages
                .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                .map((page) => {

                    const onPageClick = () => {
                        changePageHandler(page)
                    }

                    return <span key={page}
                                 className={styles.pageNum}
                                 onClick={onPageClick}>{page}</span>
                })}

            {conditionForShowNextButton &&
            <button onClick={onNextButtonClick}>NEXT</button>}
        </div>
    )
})

export default Paginator;