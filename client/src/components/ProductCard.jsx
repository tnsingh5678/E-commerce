

export default function ProductCard({ quantity, itemName, Urls, price }) {
    return (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-72 h-auto mx-auto my-4 border border-gray-300 transition transform hover:scale-105 hover:shadow-xl">
        <img
          src={Urls[0]}
          alt={itemName}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 truncate">{itemName}</h2>
          <div className="flex justify-between items-center mt-2">
            <p className="text-gray-600 text-sm">Quantity: {quantity}</p>
            <p className="text-green-500 text-lg font-bold">${price}</p>
          </div>
          <button className="w-full mt-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    );
  }

  