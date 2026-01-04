import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCamera, FaUser, FaPhoneAlt, FaQuoteLeft } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import { toast, ToastContainer } from "react-toastify";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";

const ProfileSettings = () => {
  const { user, setUser, updateUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [openField, setOpenField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    photoURL: "",
    bio: "",
  });

  const openEdit = (field) => {
    setOpenField(field);
    setFormData({
      name: user?.displayName || "",
      phoneNumber: user?.phoneNumber || "",
      photoURL: user?.photoURL || "",
      bio: user?.bio || "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setLoading(true);
    const updatedData = {};
    if (openField === "name") updatedData.displayName = formData.name;
    if (openField === "phoneNumber") updatedData.phoneNumber = formData.phoneNumber;
    if (openField === "photoURL") updatedData.photoURL = formData.photoURL;
    if (openField === "bio") updatedData.bio = formData.bio;

    try {
      const res = await axiosSecure.patch(`/users/update/${user?.email}`, updatedData);

      if (res.data.modifiedCount > 0) {
        setUser({
          ...user,
          ...updatedData,
        });

        if (updatedData.displayName || updatedData.photoURL) {
          await updateUser({
            displayName: updatedData.displayName || user.displayName,
            photoURL: updatedData.photoURL || user.photoURL,
          });
        }
        toast.success("Profile updated seamlessly!");
        setOpenField(null);
      } else {
        toast.info("No changes were made.");
        setOpenField(null);
      }
    } catch (error) {
      toast.error("Failed to update profile. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <title>MOVIEMASTERpro | Profile Settings</title>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto pt-16"
      >
        <ToastContainer position="top-right" autoClose={3000} />

        {/* Header Section */}
        <div className="mb-10 text-left border-b border-gray-200 dark:border-slate-800 pb-6">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Account Settings</h1>
          <p className="text-slate-500 mt-1">Update your profile and how others see you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Panel: Profile Overview */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm text-center overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
              
              <div className="relative mt-4">
                <div className="relative inline-block">
                  <img
                    src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                    className="w-32 h-32 rounded-2xl border-4 border-white dark:border-slate-900 object-cover shadow-xl"
                    alt="Profile"
                  />
                  <button
                    onClick={() => openEdit("photoURL")}
                    className="absolute -bottom-2 -right-2 bg-primary text-white p-2.5 rounded-xl shadow-lg hover:scale-110 transition-transform active:scale-95"
                  >
                    <FaCamera size={16} />
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                  {user?.displayName || "Member"}
                </h2>
                <div className="flex items-center justify-center gap-2 mt-1 text-slate-500 text-sm">
                  <HiOutlineMail />
                  <span>{user?.email}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-2 text-primary font-semibold text-sm">
                  <FaQuoteLeft size={12} />
                  <span>Bio</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed italic">
                  {user?.bio || "No bio added yet. Tell us something about yourself!"}
                </p>
                <button
                  onClick={() => openEdit("bio")}
                  className="mt-4 btn btn-ghost btn-xs text-primary hover:bg-primary/10 normal-case"
                >
                  Edit Bio
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel: Detailed Info */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-2 shadow-sm">
              {[
                { label: "Full Name", value: user?.displayName, field: "name", icon: <FaUser className="text-blue-500" /> },
                { label: "Phone Number", value: user?.phoneNumber, field: "phoneNumber", icon: <FaPhoneAlt className="text-green-500" /> },
              ].map(({ label, value, field, icon }) => (
                <div
                  key={field}
                  onClick={() => openEdit(field)}
                  className="group flex justify-between items-center p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-2xl transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-5">
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors shadow-sm">
                      {icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-0.5">{label}</p>
                      <p className="font-medium text-slate-700 dark:text-slate-200">{value || "Click to add"}</p>
                    </div>
                  </div>
                  <CiEdit size={24} className="text-slate-300 group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Improved Modal */}
        <AnimatePresence>
          {openField && (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] w-full max-w-md shadow-2xl"
              >
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                   Update <span className="text-primary capitalize">{openField === 'name' ? 'Full Name' : openField}</span>
                </h3>

                <div className="space-y-4">
                  {openField === "bio" ? (
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={5}
                      className="textarea textarea-bordered w-full focus:ring-2 ring-primary/20 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none text-base"
                      placeholder="Share a bit about yourself..."
                    />
                  ) : (
                    <input
                      name={openField}
                      value={formData[openField]}
                      onChange={handleChange}
                      autoFocus
                      className="input input-bordered w-full focus:ring-2 ring-primary/20 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none text-base"
                      placeholder={`Enter your ${openField}`}
                    />
                  )}
                </div>

                <div className="flex justify-end gap-3 mt-8">
                  <button
                    disabled={loading}
                    onClick={() => setOpenField(null)}
                    className="btn btn-ghost px-6 normal-case"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    disabled={loading}
                    className="btn btn-primary px-8 normal-case shadow-lg shadow-primary/20"
                  >
                    {loading ? <span className="loading loading-spinner loading-sm"></span> : "Save Changes"}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProfileSettings;