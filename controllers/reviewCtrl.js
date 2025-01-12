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
      res
        .status(500)
        .json({ message: "Review added Fail", error: error.message });
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

export function deleteReview(req, res) {
  const email = req.params.email;

  if (req.user == null) {
    res.status(401).json({
      message: "Please login and Try again",
    });
    return;
  }

  if (req.user.role == "admin") {
    Review.deleteOne({ email: email })
      .then(() => {
        res.json({
          message: "Review deleted Successfully",
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Review deletion Failed. Try again",
          error: error.message,
        });
      });

    return;
  }

  if (req.user.role == "customer") {
    if (req.user.email == email) {
      Review.deleteOne({ email: email })
        .then(() => {
          res.json({
            message: "Your review delete Successfully",
          });
        })
        .catch(() => {
          res.status(500).json({
            error: "your deletion failed",
          });
        });
    } else {
      res.status(403).json({
        message: "Your are not authorized to perform this action",
      });
    }
  }
}

export function approveReview(req, res) {
  const email = req.params.email;

  if (req.user == null) {
    res.status().json({
      message: "Please login first and try again",
    });

    return;
  }

  if (req.user.role == "admin") {
    Review.updateOne(
      {
        email: email,
      },
      {
        isApproved: true,
      }
    )
      .then(() => {
        res.json({
          message: "Review Approved Successfully",
        });
      })
      .catch(() => {
        res.status(500).json({
          error: "Review Approved Faield",
        });
      });
  } else {
    res.status(403).json({
      message: "Your are not authorized to perform this action",
    });
  }
}
