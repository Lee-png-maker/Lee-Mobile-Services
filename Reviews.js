
// ====================================
// Lee Mobile Services - reviews.js
// ====================================

const reviewForm = document.getElementById("reviewForm");
const reviewList = document.getElementById("reviewList");

function loadReviews() {

    const reviews =
        JSON.parse(localStorage.getItem("leeReviews")) || [];

    reviewList.innerHTML = "";

    reviews.forEach(function(review){

        reviewList.innerHTML += `

<div class="review-card">

<h3>${review.name}</h3>

<p>⭐ ${review.rating}/5</p>

<p>${review.comment}</p>

</div>

`;

    });

}

if(reviewForm){

reviewForm.addEventListener("submit",function(e){

e.preventDefault();

const name=document.getElementById("reviewName").value.trim();

const rating=document.getElementById("reviewRating").value;

const comment=document.getElementById("reviewComment").value.trim();

if(name===""||comment===""){

alert("Please complete all fields.");

return;

}

const reviews=
JSON.parse(localStorage.getItem("leeReviews"))||[];

reviews.push({

name:name,
rating:rating,
comment:comment

});

localStorage.setItem("leeReviews",JSON.stringify(reviews));

reviewForm.reset();

loadReviews();

alert("Thank you for your review!");

});

}

loadReviews();
