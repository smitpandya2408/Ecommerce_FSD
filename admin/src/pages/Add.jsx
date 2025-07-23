import React, { useState } from "react";
import upload_area from "../assets/assets/upload_area.png";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subcategory, setSubcategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [size, setSize] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("description", description);
      formdata.append("price", price);
      formdata.append("category", category);
      formdata.append("subCategory", subcategory);
      formdata.append("bestseller", JSON.stringify(bestseller));
      formdata.append("sizes", JSON.stringify(size || []));

      if (image1) formdata.append("image1", image1);
      if (image2) formdata.append("image2", image2);
      if (image3) formdata.append("image3", image3);
      if (image4) formdata.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formdata,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        }

        
      );

      if(response.data.success){
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
      }else{
        toast.error(response.data.message)
      }

      console.log(response.data);
    } catch (error) {
      console.log(error)
      console.log(error.message);
      
    }
  };

  return (
    <form className="flex flex-col w-full items-start gap-3" onSubmit={onSubmitHandler}>
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          {[image1, image2, image3, image4].map((img, index) => (
            <React.Fragment key={index}>
              <label htmlFor={`image${index + 1}`}>
                <img
                  className="w-28 h-28 object-cover border cursor-pointer"
                  src={img ? URL.createObjectURL(img) : upload_area}
                  alt=""
                />
              </label>
              <input
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (index === 0) setImage1(file);
                  if (index === 1) setImage2(file);
                  if (index === 2) setImage3(file);
                  if (index === 3) setImage4(file);
                }}
                type="file"
                id={`image${index + 1}`}
                hidden
              />
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2 border"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2 border"
          placeholder="Write content here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product category</p>
        <select
          className="w-full max-w-[300px] px-3 py-2 border"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
      </div>

      <div className="w-full">
        <p className="mb-2">Product subcategory</p>
        <select
          className="w-full max-w-[300px] px-3 py-2 border"
          onChange={(e) => setSubcategory(e.target.value)}
          value={subcategory}
        >
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
          <option value="Winterwear">Winterwear</option>
        </select>
      </div>

      <div className="w-full">
        <p className="mb-2">Product price</p>
        <input
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          className="w-full max-w-[150px] px-3 py-2 border"
          type="number"
          placeholder="25"
        />
      </div>

      <div>
        <p className="pb-2">Product Size</p>
        <div className="flex gap-3 flex-wrap">
          {["S", "M", "L", "XL", "XXL"].map((s) => (
            <div
              key={s}
              onClick={() =>
                setSize((prev) =>
                  prev.includes(s)
                    ? prev.filter((item) => item !== s)
                    : [...prev, s]
                )
              }
            >
              <p
                className={`${
                  size.includes(s) ? "bg-pink-200" : "bg-slate-200"
                } px-3 py-1 cursor-pointer rounded`}
              >
                {s}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={(e) => setBestseller(e.target.checked)}
        />
        <label htmlFor="bestseller" className="cursor-pointer">
          Add To Bestseller
        </label>
      </div>

      <button
        type="submit"
        className="w-28 py-3 mt-4 bg-black text-white rounded"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
