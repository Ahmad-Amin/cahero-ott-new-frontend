// Community.js
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import AdminEditPost from "../../Components/Admin Components/AdminEditPost";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import axiosInstance from "../../lib/axiosInstance";
import { toast } from "react-toastify";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LoadingWrapper from "../../ui/LoadingWrapper";
import { ThumbsUpIcon, Trash2Icon } from "lucide-react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import PDFViewer from "../../Components/PDFViewer";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ViewMoreModal from "../../Components/Admin Components/ViewMoreModal"; // Import the new modal
import AdminCreatePost from "./AdminCreatePost";

const drawerWidth = 280;

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const AdminCommunity = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [commentText, setCommentText] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchingPost, setFetchingPosts] = useState(false);
  const [fetchingUsers, setFetchingUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [isViewMoreModalOpen, setIsViewMoreModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [openReply, setOpenReply] = useState({});
  const [replyText, setReplyText] = useState({});

  const toggleReply = (commentId) => {
    setOpenReply((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const addReplyToComment = (postId, commentId) => {
    // Logic to add reply to the comment
    console.log("Reply:", replyText[commentId]);
    console.log("Post ID:", postId, "Comment ID:", commentId);

    // Clear the reply text and close the reply box
    setReplyText((prev) => ({
      ...prev,
      [commentId]: "",
    }));
    toggleReply(commentId);
  };
  const openViewMoreModal = (postId) => {
    setIsViewMoreModalOpen(postId);
  };
  const closeViewMoreModal = () => {
    setIsViewMoreModalOpen(null);
  };

  const handleEdit = (post) => {
    setEditData(post);
    setIsEditModalOpen(true);
    closeViewMoreModal();
    setIsCreateModalOpen(false);
  };

  const fetchAllUsers = async () => {
    try {
      setFetchingUsers(true);
      const response = await axiosInstance.get("/users");
      setUsers(response.data.results);
    } catch (e) {
      console.log("Error fetching all users", e);
    } finally {
      setFetchingUsers(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllPosts = async () => {
    try {
      setFetchingPosts(true);
      const response = await axiosInstance.get("/posts");
      setCommunityPosts(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setFetchingPosts(false);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const handleCreateClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handlePostUpload = async (content, imageLink, type) => {
    try {
      await axiosInstance.post("/posts", {
        content,
        assetUrl: imageLink || undefined,
        type: type || undefined,
      });
      toast.success("Post created successfully");
      fetchAllPosts();
    } catch (e) {
      console.log("Error creating the post");
    }
  };

  const handlePostUpdate = async (id, content, assetUrl, type) => {
    try {
      await axiosInstance.patch(`/posts/${id}`, {
        content,
        assetUrl: assetUrl || undefined,
        type: type || undefined,
      });
      toast.success("Post updated successfully");
      fetchAllPosts();
      setIsEditModalOpen(false);
    } catch (e) {
      console.log("Error updating the post");
      toast.error("Error updating the post");
    }
  };

  const addCommentToPost = async (postId) => {
    try {
      await axiosInstance.post(`/posts/${postId}/comments`, {
        comment: commentText[postId],
      });
      toast.success("Comment added successfully");
      setCommentText((prev) => ({ ...prev, [postId]: "" }));
      fetchAllPosts();
    } catch (e) {
      console.log("Error creating the comment");
      toast.error("Error creating the comment");
    }
  };

  const handleDeleteMyComment = async (postId, commentId) => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/posts/${postId}/comments/${commentId}`);
      toast.success("Comment deleted successfully");
      fetchAllPosts();
    } catch (e) {
      const errorMessage =
        e.response?.data?.message || "Error deleting the comment";
      console.log("Error deleting the comment", e);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const likeThePost = async (postId) => {
    try {
      await axiosInstance.post(`/posts/${postId}/like`);
      fetchAllPosts();
    } catch (e) {
      console.log("Error liking the post");
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axiosInstance.delete(`posts/${postId}`);
      toast.success("Post deleted successfully");
      fetchAllPosts();
    } catch (e) {
      console.log("Error deleting the post");
      toast.error("Error deleting the post");
    } finally {
    }
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: "100%",
          backgroundColor: "#131213",
          minHeight: "100vh",
          padding: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <LoadingWrapper loading={fetchingPost || loading}>
          <div
            style={{ position: "relative" }}
            className="mt-5 flex flex-rows items-center"
          >
            <p className="flex-1 text-xl mx-8 text-white font-semibold">
              Community
            </p>
            <button
              className="bg-[#6a55ea] hover:bg-[#5242b6] transition duration-300 w-auto px-5 h-9 text-white font-semibold mr-10 rounded-lg z-10 "
              onClick={handleCreateClick}
            >
              Create
            </button>
          </div>

          <div className="flex flex-row mt-5">
            <div className="flex-1 flex-col mr-5 space-y-5 z-10 flex justify-center">
              {communityPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-[#101011] w-4/6 mx-8 rounded-lg border-2 border-[#404041] relative"
                >
                  <div>
                    <div className="flex flex-row items-center bg-transparent w-full h-16 mt-2 border-b-2 border-[#232323]">
                      <div className="w-10 h-10 rounded-full overflow-hidden mx-5">
                        <img
                          src={`${process.env.PUBLIC_URL}/images/Rectangle.png`}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-row flex-1 items-center justify-between">
                        <div className="flex-1">
                          <h2 className="text-[#b1b1b1] font-semibold">
                            {post.createdBy?.firstName +
                              " " +
                              post.createdBy?.lastName}
                          </h2>
                          <p className="text-xs text-[#b1b1b1]">
                            {post.createdBy.email}
                          </p>
                        </div>
                        {currentUser.role === "admin" && (
                          <div className="px-4">
                            <MoreVertIcon
                              className="text-white cursor-pointer"
                              onClick={() => openViewMoreModal(post.id)}
                            />
                            <ViewMoreModal
                              open={isViewMoreModalOpen === post.id}
                              onClose={closeViewMoreModal}
                              onEdit={() => handleEdit(post)}
                              onDelete={() => handleDeletePost(post.id)}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-b-2 border-[#232323]">
                      <p className="text-white m-8 font-light ">
                        {post.content} {post?.hashtags}
                      </p>
                      {post.type === "image" && post.assetUrl && (
                        <div className=" w-full h-[500px] overflow-hidden px-8 my-8">
                          <img
                            src={post.assetUrl}
                            alt=""
                            className="w-full h-full rounded-lg object-contain"
                          />
                        </div>
                      )}
                      {post.type === "video" && post.assetUrl && (
                        <div className="w-full h-[500px] overflow-hidden px-8 my-8">
                          <video
                            controls
                            src={post.assetUrl}
                            alt=""
                            className="w-full h-full rounded-lg object-center"
                          />
                        </div>
                      )}
                      {post.type === "document" && post.assetUrl && (
                        <div className="w-full px-8 my-8">
                          <PDFViewer link={post.assetUrl} />
                        </div>
                      )}
                      <div className="flex flex-row my-8">
                        <div
                          className="flex flex-row cursor-pointer"
                          onClick={() => likeThePost(post.id)}
                        >
                          {post.likedBy?.includes(currentUser.id) ? (
                            <ThumbUpAltIcon className="text-white ml-8 mr-3" />
                          ) : (
                            <ThumbsUpIcon className="text-white ml-8 mr-3" />
                          )}
                          <p className="text-white">{post.likes || 0} Likes</p>
                        </div>
                        <div className="flex flex-row">
                          <CommentIcon className="text-white ml-8 mr-3" />
                          <p className="text-white">
                            {post.comments.length || 0} Comments
                          </p>
                        </div>
                        <div className="flex flex-row">
                          <ShareIcon className="text-white ml-8 mr-3" />
                          <p className="text-white">
                            {post.shares || 0} Shares
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row">
                      <div className="flex-1">
                        <div className="flex items-center m-5">
                          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                            <img
                              src={`${process.env.PUBLIC_URL}/images/Rectangle.png`}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <textarea
                            value={commentText[post.id] || ""}
                            onChange={(e) =>
                              setCommentText({
                                ...commentText,
                                [post.id]: e.target.value,
                              })
                            }
                            type="text"
                            className="bg-black h-9 text-white rounded-full w-full border border-[#b1b1b1] resize-none outline-none pt-1 pl-3"
                            placeholder="Write your Comment.."
                          />
                        </div>
                      </div>
                      <div className="flex flex-row m-5 space-x-3">
                        <div
                          onClick={() => addCommentToPost(post.id)}
                          className="w-10 h-10 rounded-full border border-[#6a55ea] flex items-center justify-center cursor-pointer"
                        >
                          <SendIcon className="text-[#6a55ea]" />
                        </div>
                      </div>
                    </div>
                    <div className="px-8 flex flex-col gap-5 my-5">
                      {post.comments.map((comment) => (
                        <div key={comment.id}>
                          <div className="flex flex-row gap-3 items-center">
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                              <img
                                src={comment.user.profileImageUrl}
                                alt="Profile"
                                className="w-full h-full object-center"
                              />
                            </div>
                            <div className="flex flex-row justify-between items-center flex-1">
                              <div className="text-white text-xs">
                                <p className="text-sm">
                                  {comment.user.firstName +
                                    " " +
                                    comment.user.lastName}
                                </p>
                                <p className="text-slate-300">
                                  {comment.user.email}
                                </p>
                              </div>
                              {currentUser.role === "admin" && (
                                <div className="text-red-700">
                                  <DeleteOutlineIcon
                                    className="text-[#e53939] hover:text-[#b22c2c] cursor-pointer"
                                    onClick={() =>
                                      handleDeleteMyComment(post.id, comment.id)
                                    }
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                          <p className="text-white mt-4">{comment.comment}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <button
                              className="text-blue-500 text-sm cursor-pointer hover:underline"
                              onClick={() => toggleReply(comment.id)}
                            >
                              Reply
                            </button>
                          </div>
                          {openReply[comment.id] && (
                            <div className="flex flex-row mt-3 items-center">
                              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                                <span className="text-white font-bold">
                                  {currentUser?.firstName?.[0].toUpperCase()}
                                </span>
                              </div>
                              <textarea
                                value={replyText[comment.id] || ""}
                                onChange={(e) =>
                                  setReplyText({
                                    ...replyText,
                                    [comment.id]: e.target.value,
                                  })
                                }
                                type="text"
                                className="bg-black h-9 text-white rounded-full w-full border border-[#b1b1b1] resize-none outline-none pt-1 pl-3"
                                placeholder="Write your Reply.."
                              />
                              <div
                                onClick={() =>
                                  addReplyToComment(post.id, comment.id)
                                }
                                className="w-10 h-10 rounded-full border border-[#6a55ea] flex items-center justify-center cursor-pointer ml-3"
                              >
                                <SendIcon className="text-[#6a55ea]" />
                              </div>
                            </div>
                          )}
                          <div className="border-b border-gray-600 mt-2"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="members-section flex flex-col w-1/4 mx-8 pl-5"
              style={{
                position: "fixed",
                right: "0px",
                top: "125px",
                paddingRight: "1rem",
                marginTop: "20px",
                overflowY: "auto",
                height: "calc(100vh - 100px)",
              }}
            >
              <LoadingWrapper loading={fetchingUsers}>
                <h1 className="text-white text-lg font-semibold mb-2">
                  Members
                </h1>
                {users.map((member) => (
                  <div
                    key={member.id}
                    className="flex flex-row items-center bg-black w-full h-16 border-b-2 border-[#232323]"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden mx-5">
                      <img
                        src={
                          member.profileImageUrl
                            ? member.profileImageUrl
                            : `${process.env.PUBLIC_URL}/images/Rectangle.png`
                        }
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="w-4/5">
                      <h2 className="text-[#b1b1b1] font-semibold">
                        {member.firstName + " " + member.lastName}
                      </h2>
                      <p className="text-[#b1b1b1] font-light">
                        {member.email}
                      </p>
                    </div>
                  </div>
                ))}
              </LoadingWrapper>
            </div>
          </div>
        </LoadingWrapper>
      </Box>

      <AdminEditPost
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onConfirm={() => {
          handleCloseEditModal();
        }}
        onPost={handlePostUpload}
        onUpdate={handlePostUpdate}
        itemType="post"
        editData={editData}
      />
      <AdminCreatePost
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onConfirm={() => {
          handleCloseCreateModal();
        }}
        onPost={handlePostUpload}
        itemType="post"
      />
    </>
  );
};

export default AdminCommunity;
