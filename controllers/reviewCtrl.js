import Review from "../models/review.js";

export function addReview(req, res) {

  if (req.user == null) {
    res.status(401).json({
      message: "Please login first and try again",
    });

    return;
  }

  const reviewData = req.body;

  reviewData.name = req.user.firstName + " " + req.user.lastName;
  reviewData.profilePicture = req.user.profilePicture;
  reviewData.email = req.user.email;

  const newReview = new Review(reviewData);

  newReview
    .save()
    .then(() => {
      res.json({ message: "Review Added Successfully" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Review added Fail", error: error.message });
    });
}

export function getReviews(req, res) {
  const user = req.body;

  if (req.user == null || req.user.role != "admin") {
    Review.find({ isApproved: true }).then((reviews) => {
      res.json(reviews);
    });

    return;
  } else {
    Review.find().then((reviews) => {
      res.json(reviews);
    });
  }
}
