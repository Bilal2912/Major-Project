import React, {Fragment, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import DetailReviewCard from './DetailReviewCard';
import Pagination from "react-js-pagination";

const AllReviews = () => {

    const { course, loading, error } = useSelector(
        (state) => state.courseDetails
      );

      const [currentPage, setCurrentPage] = useState(1);

      const setCurrentPageNo = (e) => {
        setCurrentPage(e);
      };
  return (
    <Fragment>
        <div className='flex justify-center items-center h-screen'>
            <div className='w-5/6 h-11/12 bg-slate-100 rounded-lg'>
                <div className="flex flex-col items-center mt-5 h-full divide-y divide-black">
                    {course.reviews &&
                    course.reviews.map((review) => (
                        <DetailReviewCard review={review}/>
                    ))}
                </div>
            </div>
        </div>

        <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={4}
                // totalItemsCount={course.reviews.length}
                totalItemsCount={5}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
    </Fragment>
  )
}

export default AllReviews