import React, { useState } from "react";
import upload_area from "../assets/assets/upload_area.png";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subcategory, setSubcategory] = useState("Topwear");
  
  const [bestseller, setBestseller] = useState(false);
  const [size, setSize] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Submit Handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("Unauthorized: Missing admin token");

    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subcategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(size));

      // ✅ Append all selected images
      images.forEach((img, i) => {
        if (img) formData.append(`image${i + 1}`, img);
      });

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ standardized header
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success(response.data.message || "Product added successfully!");
        // ✅ Reset form
        setName("");
        setDescription("");
        setPrice("");
        setImages([null, null, null, null]);
        setSize([]);
        setBestseller(false);
      } else {
        toast.error(response.data.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(error.response?.data?.message || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle image change
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    setImages((prev) => {
      const updated = [...prev];
      updated[index] = file;
      return updated;
    });
  };

  return (
    <form
      className="flex flex-col w-full items-start gap-3"
      onSubmit={onSubmitHandler}
    >
      {/* Image Upload */}
      <div>
        <p className="mb-2">Upload Images</p>
        <div className="flex gap-2 flex-wrap">
          {images.map((img, index) => (
            <label key={index} htmlFor={`image${index}`}>
              <img
                src={img ? URL.createObjectURL(img) : upload_area}
                alt={`Upload ${index + 1}`}
                className="w-28 h-28 object-cover border cursor-pointer rounded"
              />
              <input
                type="file"
                id={`image${index}`}
                hidden
                accept="image/*"
                onChange={(e) => handleImageChange(e, index)}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2 border rounded"
          type="text"
          placeholder="Enter product name"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2 border rounded"
          placeholder="Write description here..."
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Category</p>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full max-w-[300px] px-3 py-2 border rounded"
        >
          <option value="Men">Male</option>
          <option value="Women">Female</option>
          <option value="Kids">Kids</option>
        </select>
      </div>

      <div className="w-full">
        <p className="mb-2">Subcategory</p>
        <select
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          className="w-full max-w-[300px] px-3 py-2 border rounded"
        >
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
          <option value="Winterwear">Winterwear</option>
        </select>
      </div>

      <div className="w-full">
        <p className="mb-2">Price</p>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full max-w-[150px] px-3 py-2 border rounded"
          type="number"
          placeholder="Enter price"
          required
        />
      </div>

      {/* Size Selection */}
      <div>
        <p className="pb-2">Available Sizes</p>
        <div className="flex gap-3 flex-wrap">
          {["S", "M", "L", "XL", "XXL"].map((s) => (
            <p
              key={s}
              onClick={() =>
                setSize((prev) =>
                  prev.includes(s)
                    ? prev.filter((item) => item !== s)
                    : [...prev, s]
                )
              }
              className={`px-3 py-1 cursor-pointer rounded ${
                size.includes(s)
                  ? "bg-pink-300 text-black font-medium"
                  : "bg-gray-200"
              }`}
            >
              {s}
            </p>
          ))}
        </div>
      </div>

      {/* Bestseller Checkbox */}
      <div className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={(e) => setBestseller(e.target.checked)}
        />
        <label htmlFor="bestseller" className="cursor-pointer">
          Add to Bestseller
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-28 py-3 mt-4 rounded text-white ${
          loading ? "bg-gray-400" : "bg-black hover:bg-gray-800"
        }`}
      >
        {loading ? "ADDING..." : "ADD"}
      </button>
    </form>
  );
};

export default Add;
