import React, { useState, useContext, useEffect } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContent";
import { indianStates, getCitiesByState, getSampleZipcode, getZipcodeByCity } from "../data/indiaData";

import axios from "axios";
import { toast } from "react-toastify";

const Placeorder = () => {
  const [method, setMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [availableStates, setAvailableStates] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const {
    navigate,
    backendUrl,
    token,
    cartitems,
    setCartitems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // ✅ handle input change
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));

    // Handle country change
    if (name === "country" && value.toLowerCase().includes("india")) {
      setAvailableStates(indianStates);
    } else if (name === "country") {
      setAvailableStates([]);
      setAvailableCities([]);
    }

    // Handle state change - filter states and load cities
    if (name === "state" && formData.country.toLowerCase().includes("india")) {
      const filtered = indianStates.filter(state => 
        state.toLowerCase().includes(value.toLowerCase())
      );
      setAvailableStates(filtered);
      setShowStateDropdown(value.length > 0 && filtered.length > 0);
    }

    // Handle city change - filter cities
    if (name === "city" && formData.state) {
      const cities = getCitiesByState(formData.state);
      const filtered = cities.filter(city => {
        const cityName = typeof city === 'string' ? city : city.name;
        return cityName.toLowerCase().includes(value.toLowerCase());
      });
      setAvailableCities(filtered);
      setShowCityDropdown(value.length > 0 && filtered.length > 0);
    }
  };

  // ✅ Handle state selection
  const handleStateSelect = (state) => {
    setFormData((data) => ({ ...data, state, city: "", zipcode: "" }));
    setShowStateDropdown(false);
    const cities = getCitiesByState(state);
    setAvailableCities(cities);
    // Auto-fill sample zipcode
    const sampleZip = getSampleZipcode(state);
    if (sampleZip) {
      setFormData((data) => ({ ...data, zipcode: sampleZip }));
    }
  };

  // ✅ Handle city selection
  const handleCitySelect = (city) => {
    const cityName = typeof city === 'string' ? city : city.name;
    setFormData((data) => ({ ...data, city: cityName }));
    setShowCityDropdown(false);
    
    // Auto-fill zipcode for the selected city
    const zipcode = getZipcodeByCity(formData.state, cityName);
    if (zipcode) {
      setFormData((data) => ({ ...data, zipcode }));
    }
  };

  // ✅ Submit handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("You must login first");

    if (formData.phone.length < 8) {
      return toast.error("Please enter a valid phone number");
    }

    setLoading(true);

    try {
      // ✅ Build order items
      const orderItems = [];
      for (const itemId in cartitems) {
        for (const size in cartitems[itemId]) {
          if (cartitems[itemId][size] > 0) {
            const itemInfo = products.find((p) => p._id === itemId);
            if (itemInfo) {
              orderItems.push({
                ...itemInfo,
                size,
                quantity: cartitems[itemId][size],
              });
            }
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error("Your cart is empty");
        setLoading(false);
        return;
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      // ✅ Correct token header
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      // ✅ Handle COD
      if (method === "cod") {
        const response = await axios.post(
          `${backendUrl}/api/order/place`,
          orderData,
          config
        );

        if (response.data.success) {
          // Clear cart only after successful order placement
          setCartitems({});
          toast.success("Order placed successfully!");
          navigate("/orders");
        } else {
          toast.error(response.data.message);
        }
      }

      // ✅ Handle Stripe
      else if (method === "stripe") {
        const response = await axios.post(
          `${backendUrl}/api/order/stripe`,
          orderData,
          config
        );

        if (response.data.success && response.data.session_url) {
          window.location.replace(response.data.session_url);
        } else {
          toast.error(response.data.message || "Stripe checkout failed");
        }
      } else {
        toast.error("Invalid payment method selected.");
      }
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* ---------------- Left Side ---------------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        {/* Name */}
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            required
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First Name"
          />
          <input
            onChange={onChangeHandler}
            required
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last Name"
          />
        </div>

        {/* Email */}
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email Address"
        />

        {/* Street */}
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
        />

        {/* Country */}
        <input
          required
          onChange={onChangeHandler}
          name="country"
          value={formData.country}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Country (e.g., India)"
        />

        {/* State with Autocomplete */}
        <div className="relative">
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
            onFocus={() => formData.country.toLowerCase().includes("india") && setShowStateDropdown(true)}
            onBlur={() => setTimeout(() => setShowStateDropdown(false), 200)}
          />
          {showStateDropdown && availableStates.length > 0 && (
            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-48 overflow-y-auto shadow-lg">
              {availableStates.map((state, index) => (
                <div
                  key={index}
                  onClick={() => handleStateSelect(state)}
                  className="px-3.5 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {state}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* City with Autocomplete */}
        <div className="relative">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
            disabled={!formData.state}
            onFocus={() => formData.state && setShowCityDropdown(true)}
            onBlur={() => setTimeout(() => setShowCityDropdown(false), 200)}
          />
          {showCityDropdown && availableCities.length > 0 && (
            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-48 overflow-y-auto shadow-lg">
              {availableCities.map((city, index) => {
                const cityName = typeof city === 'string' ? city : city.name;
                const cityZip = typeof city === 'object' ? city.zipcode : '';
                return (
                  <div
                    key={index}
                    onClick={() => handleCitySelect(city)}
                    className="px-3.5 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    <div className="flex justify-between items-center">
                      <span>{cityName}</span>
                      {cityZip && <span className="text-xs text-gray-500">{cityZip}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Zipcode (Auto-filled) */}
        <input
          required
          onChange={onChangeHandler}
          name="zipcode"
          value={formData.zipcode}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Zip code"
        />

        {/* Phone */}
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Phone"
        />
      </div>

      {/* ---------------- Right Side ---------------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />

          <div className="flex gap-3 flex-col lg:flex-row mt-2">
            {/* Stripe */}
            <div
              onClick={() => setMethod("stripe")}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${
                method === "stripe" ? "bg-gray-100" : ""
              }`}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="Stripe" />
            </div>

            {/* COD */}
            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${
                method === "cod" ? "bg-gray-100" : ""
              }`}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          {/* Submit */}
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              disabled={loading}
              className={`bg-black text-white px-16 py-3 text-sm btn-click hover-scale smooth-transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Placing Order..." : "PLACE ORDER"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
