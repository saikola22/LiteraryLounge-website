// import "./Home.css";
// // import articleImage from "../../assets/Article-Writing-1.jpg";

// function Home() {
//   return (
//     <div className='articleHome'>
//       <h1 style={{color:'var(--crimson)'}}> Ocean of Knowledge</h1>
//       {/* <img src={articleImage} alt="" className="artcleImage" /> */}
//       <p className="lead">
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore officia
//         explicabo voluptatum excepturi dignissimos dolorum iste sed culpa nulla
//         ab doloremque error placeat pariatur, similique facere soluta impedit
//         inventore nam voluptas eum, laboriosam ipsam minus voluptatibus quaerat!
//         Consequatur animi exercitationem accusantium repudiandae error
//         voluptate, eveniet adipisci, fuga nostrum eligendi a harum! Atque, nihil
//         eligendi labore, omnis, deleniti dolor est rem vitae id doloribus
//         tempora distinctio excepturi cumque architecto. Repudiandae amet dolor
//         voluptatibus ad in repellendus velit et, inventore, quo corrupti optio
//         ab eum recusandae nisi error aut omnis. Fugiat dolore vero magni ea
//         quibusdam commodi rem dolor repellendus. Voluptatem, assumenda.
//       </p>
//     </div>
//   );
// }

// export default Home;




//////new code

// import React from 'react';
// import './Home.css';
// import bookImage1 from "../../assets/book1.jpg";
// import bookImage2 from "../../assets/book2.jpg";
// import testimonialImage from "../../assets/testimonial.jpg";

import React from 'react';
import './Home.css';
// import categoryImageFiction from "../../assets/fiction.jpg";
// import categoryImageNonFiction from "../../assets/nonfiction.jpg";
// import categoryImageScience from "../../assets/science.jpg";
// import categoryImageHistory from "../../assets/history.jpg";

function Home() {
  return (
    <div className='homePage'>
      <div class="background-image">
      <header className='heroSection'>
        <h1 style={{ color: 'var(--crimson)' }}>Welcome to Book Haven</h1>
        <p className="heroDescription">
          Dive into a vast ocean of stories and knowledge. Discover your next favorite book today!
        </p>
      </header>
      </div>

      <div className='visionSection'>
          <h2>Our Vision</h2>
          <p className="visionText">
            At Book Haven, we believe in the transformative power of reading. Our mission is to create a space where readers of all ages can discover and indulge in the joy of reading. Whether youre looking for the latest bestseller, a timeless classic, or a hidden gem, weve got something for every reader. Join us in exploring the endless possibilities that books offer.
          </p>
        </div>

      <section className='categories'>
        <h2>Explore Categories</h2>
        <div className='categoryList'>
          <div className='categoryItem'>
            { <img src={'https://m.media-amazon.com/images/I/715OLif4XoL._AC_UF1000,1000_QL80_.jpg'} alt="Fiction" className="categoryImage" /> }
            <p>Fiction</p>
            {/* <button className="readMoreButton">Read More</button> */}
          </div>
          <div className='categoryItem'>
            {<img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScLrAKCqKvnYPIh7MKdRMLycVUPuu2OVB3Sw&s'} alt="Non-Fiction" className="categoryImage" /> }
            <p>Non-Fiction</p>
            {/* <button className="readMoreButton">Read More</button> */}
          </div>
          <div className='categoryItem'>
            { <img src={'https://images.squarespace-cdn.com/content/v1/5877ca6986e6c00f05f58f84/1616529078025-0H8KYK9YHKLBA3O5EHQN/the-science-of-science-cover.jpg'} alt="Science" className="categoryImage" /> }
            <p>Science</p>
            {/* <button className="readMoreButton">Read More</button> */}
          </div>
          <div className='categoryItem'>
            { <img src={'https://m.media-amazon.com/images/I/71OXQZezcnL._AC_UF1000,1000_QL80_.jpg'} alt="History" className="categoryImage" /> }
            <p>History</p>
            {/* <button className="readMoreButton">Read More</button> */}
          </div>
        </div>
      </section>

      <section className='testimonials'>
        <h2>What Our Readers Say</h2>
        <div className='testimonialItem'>
          { <img src={'https://www.bookclubbabble.com/wp-content/uploads/2022/04/free-ebook-image.jpg'} alt="Reader" className="testimonialImage" /> }
          <p>"This website has transformed my reading experience!" - Happy Reader</p>
        </div>
      </section>
    </div>
  );
}

export default Home;


