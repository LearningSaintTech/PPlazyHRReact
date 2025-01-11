import React, { useState, useEffect } from 'react';
import { getReimbursements, createReimbursement } from '../../commonComponent/Api'; // Import the new API functions
import UserSideBar from '../components/UserSideBar';
import UserHeader from '../components/UserHeader';

const Reimbursement = () => {
  const [category, setCategory] = useState('Electronics');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [reimbursements, setReimbursements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // For storing the image to preview
  const [modalOpen, setModalOpen] = useState(false); // For controlling modal visibility

  // Fetch reimbursements on component mount
  const fetchReimbursements = async () => {
    setLoading(true);
    try {
      const data = await getReimbursements();
      console.log("data", data);
      setReimbursements(data);
    } catch (error) {
      console.error('Error fetching reimbursements:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Create a new reimbursement
  const handleCreateReimbursement = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('category', category);
    formData.append('description', description);
    formData.append('file', file);
    formData.append('userId', 1); // Example userId. Replace with dynamic value if needed.

    const reimbursementData = {
      category,
      description,
      file,
      userId: 1,
    };

    try {
      setLoading(true);
      await createReimbursement(reimbursementData);  // Call API to create reimbursement
      alert('Reimbursement created successfully!');
      fetchReimbursements(); // Refresh the list of reimbursements
    } catch (error) {
      console.error('Error creating reimbursement:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReimbursements();
  }, []);


  const handleImageClick = (fileUrl) => {
    if (!fileUrl) {
      console.error('No valid image URL found');
      return;
    }
  
    // Prepend 'data:image/jpeg;base64,' if not already present in the base64 string
    const base64Image =`data:image/jpeg;base64,${fileUrl}`;
    
    // Set the image preview to the base64 string
    setImagePreview(base64Image);
  
    // Open the modal to display the image
    setModalOpen(true);
  };
  
  
  

  const closeModal = () => {
    setModalOpen(false);
    setImagePreview(null);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <UserSideBar />
      <div className="flex-1 p-[1.667vw] ml-[15.104vw]">
        <UserHeader title="User Dashboard" avatarSrc="/api/placeholder/35/35" showNotification={true} showChevron={true} />

        <div className="p-[1.25vw] bg-white rounded-[0.417vw] shadow-sm">
          {/* Form Section */}
          <form onSubmit={handleCreateReimbursement} className="mb-[1.667vw]">
            <div className="grid gap-[1.25vw] md:grid-cols-2">
              <div>
                <label className="block mb-[0.417vw] text-[0.729vw] font-medium text-gray-700">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-[0.833vw] py-[0.417vw] text-[0.729vw] border rounded-[0.417vw]"
                >
                  <option>Electronics</option>
                  <option>Other Categories</option>
                </select>
              </div>
              <div>
                <label className="block mb-[0.417vw] text-[0.729vw] font-medium text-gray-700">Upload Image</label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full px-[0.833vw] py-[0.417vw] text-[0.729vw] border rounded-[0.417vw]"
                />
              </div>
            </div>
            <div className="mt-[1.25vw]">
              <label className="block mb-[0.417vw] text-[0.729vw] font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write your description here..."
                className="w-full px-[0.833vw] py-[0.417vw] text-[0.729vw] border rounded-[0.417vw]"
                rows={4}
              />
            </div>
            <div className="flex justify-end mt-[1.25vw]">
              <button
                type="submit"
                className="px-[1.25vw] py-[0.417vw] text-[0.729vw] text-white bg-indigo-600 rounded-[0.417vw] hover:bg-indigo-700"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>

          {/* Table displaying reimbursements */}
          <h2 className="mb-[0.833vw] text-[0.938vw] font-semibold">Reimbursement Records</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-[0.729vw] text-left text-gray-500 border-b">
                    <th className="pb-[0.625vw]">Date</th>
                    <th className="pb-[0.625vw]">Category</th>
                    <th className="pb-[0.625vw]">Description</th>
                    <th className="pb-[0.625vw]">Status</th>
                    <th className="pb-[0.625vw]">Files</th>
                  </tr>
                </thead>
                <tbody>
                  {reimbursements.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-[0.833vw]">
                        No records found.
                      </td>
                    </tr>
                  ) : (
                    reimbursements.map((item, index) => (
                      <tr key={index} className="text-[0.729vw] border-b">
                        <td className="py-[0.833vw]">{formatDate(item.createdAt)}</td>
                        <td>{item.category}</td>
                        <td>{item.description}</td>
                        <td>
                          <span className="px-[0.625vw] py-[0.208vw] rounded-full bg-green-100 text-green-600">
                            {item.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className="text-indigo-600 hover:text-indigo-700"
                            onClick={() => handleImageClick(item.image)} // Assuming 'fileUrl' is the field containing the image URL
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal for image preview */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-[0.833vw] rounded-[0.417vw] relative">
            <button
              onClick={closeModal}
              className="absolute top-[0.417vw] right-[0.417vw] text-[1.042vw] text-gray-600"
            >
              &times;
            </button>
            <img
              src={imagePreview}  // Use base64 encoded image
              alt="Preview"
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Reimbursement;