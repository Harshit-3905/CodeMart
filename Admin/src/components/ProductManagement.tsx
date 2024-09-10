import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import { BACKEND_URL } from "../constants/api";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
}

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [fetching, setFetching] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setFetching(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${BACKEND_URL}/api/v1/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
    setFetching(false);
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${BACKEND_URL}/api/v1/category`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [name]: value });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const formData = new FormData();
      const productData = editingProduct || newProduct;

      Object.keys(productData).forEach((key) => {
        formData.append(
          key,
          productData[key as keyof typeof productData] as string
        );
      });

      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (editingProduct) {
        await axios.put(
          `${BACKEND_URL}/api/v1/admin/product/${editingProduct.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post(`${BACKEND_URL}/api/v1/admin/product`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }
      fetchProducts();
      setNewProduct({});
      setEditingProduct(null);
      setImageFile(null);
    } catch (error) {
      console.error("Failed to save product", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${BACKEND_URL}/api/v1/admin/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  return (
    <div className="bg-orange-500 shadow overflow-hidden sm:rounded-lg p-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
        Product Management
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-black"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={editingProduct?.name || newProduct.name || ""}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-black"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={editingProduct?.description || newProduct.description || ""}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-black"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={editingProduct?.price || newProduct.price || ""}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-1/2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-black"
          >
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={editingProduct?.stock || newProduct.stock || ""}
            onChange={handleInputChange}
            className="mt-1 p-2  block w-1/2 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-black"
          >
            Product Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-white font-semibold
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
        </div>
        <div>
          <label
            htmlFor="categoryId"
            className="block text-sm font-medium text-black"
          >
            Category
          </label>
          <select
            id="categoryId"
            name="categoryId"
            value={editingProduct?.categoryId || newProduct.categoryId || ""}
            onChange={handleInputChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading
            ? "Loading..."
            : editingProduct
            ? "Update Product"
            : "Add Product"}
        </button>
      </form>
      <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {fetching ? (
          <Loading />
        ) : (
          products.map((product) => (
            <li
              key={product.id}
              className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
            >
              <div className="w-full flex items-center justify-between p-6 space-x-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-gray-900 text-sm font-medium truncate">
                      {product.name}
                    </h3>
                    <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                      ${product.price}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-500 text-sm truncate">
                    {product.description}
                  </p>
                </div>
                <img
                  className="w-20 h-20 bg-gray-300 rounded-full flex-shrink-0"
                  src={product.image}
                  alt={product.name}
                />
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="w-0 flex-1 flex">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="-ml-px w-0 flex-1 flex">
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-red-700 font-medium border border-transparent rounded-br-lg hover:text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ProductManagement;
