const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, vlaidateListing } = require("../middleware.js");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const listingController = require("../controller/listings.js");

router
  .route("/")
  // Index Route
  .get(wrapAsync(listingController.index))
  // Now Create a list with post req;
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    vlaidateListing,
    wrapAsync(listingController.createListing)
  );
  // .post(upload.single('listing[image]'),(req,res)=>{
  //   res.send(req.file);
  // } );
// Create New List
// Firstly-> new route to get form .
router.get("/new", isLoggedIn, listingController.renderNewForm);



router
  .route("/:id")
  // Show Route
  .get( wrapAsync(listingController.showListing))
  // update in db route
  .put(
    isLoggedIn,
    isOwner,
    vlaidateListing,
    wrapAsync(listingController.updateListing)
  )
  // Delete route
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.deleteListing)
  );



// Edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  vlaidateListing,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
