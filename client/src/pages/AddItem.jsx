import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

export default function AddItem() {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState();
  const [message, setMessage] = useState("");
  const [itemId, setItemId] = useState();

  const FileUpload = (e) => {
    const files = e.target.files[0];
    setImage(files);
  };

  const CloudinaryUpload = async (e) => {
    e.preventDefault();

    // Validate all fields
    if (!itemName || !quantity || !price || !image) {
      setMessage("All fields are required");
      toast.error("All fields are required");
      return;
    }

    const itemid = uuidv4(); // Generate item ID
    setItemId(itemid); // Set the generated item ID

    const form = new FormData();
    form.append('itemId', itemid); // Use the generated item ID
    form.append('itemName', itemName);
    form.append('quantity', quantity);
    form.append('price', price);
    form.append('file', image); // Attach the selected file

    try {
      // Send the form data to the server
      const response = await axios.post('http://localhost:4000/item/additem', form);

      // Display success message
      setMessage(response.data.message);
      toast.success("Item added successfully");
    } catch (error) {
      // Handle error
      setMessage(`Error uploading item: ${error.message}`);
      toast.error("Image upload failed");
    }
  };

  const UpdateData = async () => {
    try {
      const response = await axios.post('http://localhost:4000/item/updateitem', {
        itemId,
        itemName,
        quantity,
        price
      });
      toast.success("Data updated successfully");
    } catch (error) {
      console.log("Error while uploading item details:", error.message);
      toast.error("Data not updated");
    }
  };

  const UpdateImage = async () => {
    try {
      const response = await axios.post('http://localhost:4000/item/update/img', {
        index,
        itemId
      });
      console.log(response.data.message);
      toast.success("Image updated successfully");
    } catch (error) {
      console.log("Error while updating item image:", error.message);
      toast.error("Image not updated");
    }
  };

  const DeleteItem = async () => {
    try {
      const response = await axios.post('http://localhost:4000/item/deleteitem', {
        itemId
      });
      toast.success("Item deleted successfully");
      console.log("Item deleted successfully:", response.data.message);
    } catch (error) {
      console.log("Error while deleting item:", error.message);
      toast.error("Error while deleting item");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg overflow-hidden">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Add New Item</h2>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="itemName" className="text-lg text-gray-700">Item Name</label>
          <input
            id="itemName"
            className="w-full p-4 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter item name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="quantity" className="text-lg text-gray-700">Quantity</label>
          <input
            id="quantity"
            className="w-full p-4 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="price" className="text-lg text-gray-700">Price</label>
          <input
            id="price"
            className="w-full p-4 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="image" className="text-lg text-gray-700">Item Image</label>
          <input
            id="image"
            type="file"
            onChange={FileUpload}
            className="w-full p-4 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <button
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          onClick={CloudinaryUpload}
        >
          Add Item
        </button>
        <button
          className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 transform hover:scale-105"
          onClick={UpdateData}
        >
          Update Item
        </button>
        <button
          className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300 transform hover:scale-105"
          onClick={UpdateImage}
        >
          Update Image
        </button>
        <button
          className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300 transform hover:scale-105"
          onClick={DeleteItem}
        >
          Delete Item
        </button>
      </div>

      {message && (
        <p className="mt-6 text-center text-lg text-gray-600">{message}</p>
      )}
    </div>
  );
}
