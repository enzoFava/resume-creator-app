import { useState, useEffect } from "react";
import { getUserData, saveUserData, updateUserData } from "../../api";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useFormHook = (setIsDataSubmitted) => {
  const [data, setData] = useState({
    fullname: "",
    email: "",
    phone_number: "",
    address: "",
    education: "",
    experience: "",
    skills: "",
  });
  const [loadedData, setLoadedData] = useState(null);
  const [pdfData, setPdfData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserData();
        if (response.data) {
          setLoadedData(response.data);
          setData(response.data);
          setPdfData(response.data);
          setIsDataSubmitted(true);
          setLoggedIn(true);
        }
      } catch (error) {
        console.error("Error fetching data ", error);
        setLoadedData(null);
        setPdfData(null);
        setLoggedIn(true);
      }
    };
    fetchData();
  }, [setPdfData, setIsDataSubmitted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await saveUserData(data);
      setIsDataSubmitted(true);
      toast.success("Data saved");
    } catch (error) {
      console.error("Error saving data", error);
    }
  };
  window.scroll(0, 0);

  const handleUpdate = async () => {
    try {
      await updateUserData(data);
      setIsDataSubmitted(true);
      toast.success("Data updated");
    } catch (error) {
      console.error("Error updating data", error);
    }
    window.scroll(0, 0);
  };

  return {
    data,
    pdfData,
    loggedIn,
    loadedData,
    handleChange,
    handleSave,
    handleUpdate,
    setLoggedIn,
  };
};

export default useFormHook;
