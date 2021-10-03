// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router';
// import { fetchMoviesReviews } from 'services/movies-api';

// export default function MovieCastView() {
//   // const { movieId } = useParams();
//   const { slug } = useParams();
//   const movieId = slug.match(/[a-z0-9]+$/)[0];
//   const [reviews, setReviews] = useState(null);

//   useEffect(() => {
//     try {
//       fetchMoviesReviews(movieId).then(data => {
//         setReviews(data.results);
//       });
//     } catch {
//       console.log('ERROR');
//     }
//   }, [movieId]);

//   return (
//     <>
//       {/* MovieCastView {movieId} */}
//       <ul>
//         {reviews &&
//           reviews.map(({ author, content, id }) => (
//             <li key={id}>
//               <h3>{author}</h3>
//               <p>{content}</p>
//             </li>
//           ))}
//       </ul>
//     </>
//   );
// }
