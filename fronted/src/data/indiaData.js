// India States and Cities Data with Zip Code Ranges

export const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];

export const stateCityData = {
  "Andhra Pradesh": {
    cities: [
      { name: "Visakhapatnam", zipcode: "530001" },
      { name: "Vijayawada", zipcode: "520001" },
      { name: "Guntur", zipcode: "522001" },
      { name: "Nellore", zipcode: "524001" },
      { name: "Kurnool", zipcode: "518001" },
      { name: "Rajahmundry", zipcode: "533101" },
      { name: "Tirupati", zipcode: "517501" },
      { name: "Kadapa", zipcode: "516001" },
      { name: "Kakinada", zipcode: "533001" },
      { name: "Anantapur", zipcode: "515001" }
    ],
    zipRange: "515001-535594"
  },
  "Arunachal Pradesh": {
    cities: ["Itanagar", "Naharlagun", "Pasighat", "Tawang", "Ziro", "Bomdila", "Tezu", "Roing", "Changlang", "Along"],
    zipRange: "790001-792131"
  },
  "Assam": {
    cities: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur", "Bongaigaon", "Karimganj", "Dhubri"],
    zipRange: "781001-788931"
  },
  "Bihar": {
    cities: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Bihar Sharif", "Arrah", "Begusarai", "Katihar"],
    zipRange: "800001-855117"
  },
  "Chhattisgarh": {
    cities: ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Rajnandgaon", "Jagdalpur", "Raigarh", "Ambikapur", "Dhamtari"],
    zipRange: "490001-497778"
  },
  "Goa": {
    cities: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim", "Curchorem", "Sanquelim", "Cuncolim", "Quepem"],
    zipRange: "403001-403806"
  },
  "Gujarat": {
    cities: [
      { name: "Ahmedabad", zipcode: "380001" },
      { name: "Surat", zipcode: "395001" },
      { name: "Vadodara", zipcode: "390001" },
      { name: "Rajkot", zipcode: "360001" },
      { name: "Bhavnagar", zipcode: "364001" },
      { name: "Jamnagar", zipcode: "361001" },
      { name: "Junagadh", zipcode: "362001" },
      { name: "Gandhinagar", zipcode: "382001" },
      { name: "Anand", zipcode: "388001" },
      { name: "Nadiad", zipcode: "387001" },
      { name: "Morbi", zipcode: "363641" },
      { name: "Mehsana", zipcode: "384001" },
      { name: "Bharuch", zipcode: "392001" },
      { name: "Vapi", zipcode: "396191" },
      { name: "Navsari", zipcode: "396445" },
      { name: "Veraval", zipcode: "362265" },
      { name: "Porbandar", zipcode: "360575" },
      { name: "Godhra", zipcode: "389001" },
      { name: "Bhuj", zipcode: "370001" },
      { name: "Palanpur", zipcode: "385001" }
    ],
    zipRange: "360001-396590"
  },
  "Haryana": {
    cities: ["Faridabad", "Gurgaon", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula"],
    zipRange: "121001-136156"
  },
  "Himachal Pradesh": {
    cities: ["Shimla", "Dharamshala", "Solan", "Mandi", "Palampur", "Baddi", "Nahan", "Kullu", "Hamirpur", "Una"],
    zipRange: "171001-177601"
  },
  "Jharkhand": {
    cities: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh", "Giridih", "Ramgarh", "Medininagar", "Chirkunda"],
    zipRange: "813001-835325"
  },
  "Karnataka": {
    cities: ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum", "Gulbarga", "Davanagere", "Bellary", "Bijapur", "Shimoga"],
    zipRange: "560001-591346"
  },
  "Kerala": {
    cities: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Palakkad", "Alappuzha", "Malappuram", "Kannur", "Kottayam"],
    zipRange: "670001-695615"
  },
  "Madhya Pradesh": {
    cities: ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa"],
    zipRange: "450001-488448"
  },
  "Maharashtra": {
    cities: ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Kolhapur", "Amravati", "Navi Mumbai"],
    zipRange: "400001-445402"
  },
  "Manipur": {
    cities: ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Kakching", "Ukhrul", "Senapati", "Tamenglong", "Jiribam", "Moreh"],
    zipRange: "795001-795159"
  },
  "Meghalaya": {
    cities: ["Shillong", "Tura", "Nongstoin", "Jowai", "Baghmara", "Williamnagar", "Nongpoh", "Mairang", "Resubelpara", "Khliehriat"],
    zipRange: "793001-794115"
  },
  "Mizoram": {
    cities: ["Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib", "Lawngtlai", "Saiha", "Mamit", "Khawzawl", "Hnahthial"],
    zipRange: "796001-796901"
  },
  "Nagaland": {
    cities: ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Phek", "Mon", "Longleng", "Kiphire"],
    zipRange: "797001-798627"
  },
  "Odisha": {
    cities: ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore", "Bhadrak", "Baripada", "Jharsuguda"],
    zipRange: "751001-770076"
  },
  "Punjab": {
    cities: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Pathankot", "Hoshiarpur", "Batala", "Moga"],
    zipRange: "140001-160104"
  },
  "Rajasthan": {
    cities: ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar", "Bharatpur", "Sikar"],
    zipRange: "301001-345034"
  },
  "Sikkim": {
    cities: ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Rangpo", "Jorethang", "Singtam", "Ravangla", "Pelling", "Yuksom"],
    zipRange: "737101-737139"
  },
  "Tamil Nadu": {
    cities: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Tiruppur", "Erode", "Vellore", "Thoothukudi"],
    zipRange: "600001-643253"
  },
  "Telangana": {
    cities: ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Ramagundam", "Mahbubnagar", "Nalgonda", "Adilabad", "Suryapet"],
    zipRange: "500001-509412"
  },
  "Tripura": {
    cities: ["Agartala", "Dharmanagar", "Udaipur", "Kailasahar", "Belonia", "Khowai", "Ambassa", "Ranir Bazar", "Sonamura", "Sabroom"],
    zipRange: "799001-799290"
  },
  "Uttar Pradesh": {
    cities: ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Allahabad", "Bareilly", "Aligarh", "Moradabad"],
    zipRange: "201001-285223"
  },
  "Uttarakhand": {
    cities: ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", "Rishikesh", "Pithoragarh", "Nainital", "Almora"],
    zipRange: "244001-263680"
  },
  "West Bengal": {
    cities: ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Bardhaman", "Malda", "Baharampur", "Habra", "Kharagpur"],
    zipRange: "700001-743711"
  },
  "Andaman and Nicobar Islands": {
    cities: ["Port Blair", "Diglipur", "Rangat", "Mayabunder", "Car Nicobar", "Nancowry", "Campbell Bay", "Hut Bay", "Bambooflat", "Garacharma"],
    zipRange: "744101-744304"
  },
  "Chandigarh": {
    cities: ["Chandigarh"],
    zipRange: "160001-160103"
  },
  "Dadra and Nagar Haveli and Daman and Diu": {
    cities: ["Daman", "Diu", "Silvassa"],
    zipRange: "362520-396240"
  },
  "Delhi": {
    cities: ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi", "Central Delhi", "North East Delhi", "North West Delhi", "South East Delhi", "South West Delhi"],
    zipRange: "110001-110097"
  },
  "Jammu and Kashmir": {
    cities: ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Udhampur", "Kathua", "Sopore", "Rajouri", "Punch", "Kupwara"],
    zipRange: "180001-194404"
  },
  "Ladakh": {
    cities: ["Leh", "Kargil", "Nubra", "Zanskar", "Drass", "Padum", "Diskit", "Khaltse", "Nyoma", "Durbuk"],
    zipRange: "194101-194404"
  },
  "Lakshadweep": {
    cities: ["Kavaratti", "Agatti", "Amini", "Andrott", "Minicoy", "Kalpeni", "Kadmat", "Kiltan", "Chetlat", "Bitra"],
    zipRange: "682551-682559"
  },
  "Puducherry": {
    cities: ["Puducherry", "Karaikal", "Mahe", "Yanam", "Ozhukarai", "Villianur", "Bahour", "Nettapakkam", "Ariankuppam", "Mannadipet"],
    zipRange: "533464-673310"
  }
};

// Get cities for a specific state
export const getCitiesByState = (state) => {
  return stateCityData[state]?.cities || [];
};

// Get zip range for a specific state
export const getZipRangeByState = (state) => {
  return stateCityData[state]?.zipRange || "";
};

// Get sample zipcode for a state (first zipcode in range or first city's zipcode)
export const getSampleZipcode = (state) => {
  const cities = stateCityData[state]?.cities;
  
  // If cities have zipcode property, use first city's zipcode
  if (cities && cities.length > 0 && cities[0].zipcode) {
    return cities[0].zipcode;
  }
  
  // Otherwise use range
  const range = stateCityData[state]?.zipRange;
  if (range) {
    return range.split('-')[0];
  }
  return "";
};

// Get zipcode for a specific city in a state
export const getZipcodeByCity = (state, cityName) => {
  const cities = stateCityData[state]?.cities;
  if (!cities) return "";
  
  // Find the city
  const city = cities.find(c => {
    // Handle both object format {name, zipcode} and string format
    const name = typeof c === 'string' ? c : c.name;
    return name === cityName;
  });
  
  // Return zipcode if found
  return city && typeof city === 'object' ? city.zipcode : "";
};
