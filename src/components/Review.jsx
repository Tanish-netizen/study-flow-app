import { useEffect, useState } from "react";
import styles from './Review.module.css'
import { FaArrowLeft, FaArrowRight, FaQuoteLeft } from "react-icons/fa";

const Review = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 1;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const currentReviews = data.slice(firstIndex, lastIndex)


  const fetchData = async () => {
    try {
      const res = await fetch('https://dummyjson.com/comments')
      const response = await res.json()
      console.log(response.comments);
      setData(response.comments.slice(0, 8))
    }
    catch (error) {
      console.log("Error", error);
    }
  }
  useEffect(() => {
    fetchData()
  }, []);

  const next = () => {
    if (currentPage < data.length) {
      setCurrentPage(currentPage + 1)
    } else {
      setCurrentPage(1)
    }
  };

  const previous = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    } else {
      setCurrentPage(data.length)
    };
  }

  return (
    <section className={styles.reviewSection}>
      <h1>What Students Say?</h1>
      <div className={styles.reviewContent}>
        <div className={styles.reviewButton}>
          <button onClick={previous} ><FaArrowLeft /></button>
        </div>

        {currentReviews.map((item, index) => (
          <div key={item.id} className={styles.reviewCard}>
           <h1 className={styles.reviewQuote}><FaQuoteLeft /></h1>
            <img
              src={`https://i.pravatar.cc/150?img=${index + 1}`}
              alt="profile"
            />

            <p>{item.body}</p>

            <h3>{item.user.username}</h3>

            <span>❤️{item.likes}</span>

            <small>
              {currentPage} / {data.length}
            </small>
          </div>
        ))}

        <div className={styles.reviewButton}>
           <button onClick={next}> <FaArrowRight /> </button></div>
      </div>
    </section>
  )

}
export default Review;