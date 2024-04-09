import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user detail from frontend
  const { fullName, email, username, password } = req.body;

  // validate detail, make sure all field is required
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // check if the user already exists: username and email
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  console.log(existedUser)

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  // check for images, check for avatar
  //multer file access
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files && Array.isArray(req.files.coverImage)&& req.files.coverImage.length > 0 && req?.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  // upload them to cloudinary,  check for avatar
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    
    throw new ApiError(400, "Avatar is required");
  }

  // create user object - create entry in DB
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  // check for user creation and remove password and refresh token field from response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong when registering user");
  }

  // return response
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully"));
});

export { registerUser };
