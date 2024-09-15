import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";

interface Category {
  id: string;
  name: string;
}

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setFetching(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/category`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
    setFetching(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      if (editingCategory) {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/category/${
            editingCategory.id
          }`,
          { name: newCategory },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/category`,
          {
            name: newCategory,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      fetchCategories();
      setNewCategory("");
      setEditingCategory(null);
    } catch (error) {
      console.error("Failed to save category", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCategories();
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  };

  return (
    <div className="bg-orange-500 shadow overflow-hidden sm:rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="categoryName"
            className="block text-sm font-medium text-black"
          >
            Category Name
          </label>
          <input
            type="text"
            id="categoryName"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={loading}
        >
          {loading
            ? "Loading"
            : editingCategory
            ? "Update Category"
            : "Add Category"}
        </button>
      </form>
      <input
        type="text"
        placeholder="Search Categories"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mt-4 p-2 block w-full rounded-md border-gray-300 shadow-sm"
      />
      <ul className="mt-6 flex flex-col gap-2">
        {fetching ? (
          <Loading />
        ) : (
          categories
            .filter((category) =>
              category.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((category) => (
              <li
                key={category.id}
                className="py-2 flex justify-between items-center bg-white px-4"
              >
                <span className="text-md font-medium text-gray-900">
                  {category.name}
                </span>
                <div>
                  <button
                    onClick={() => {
                      setEditingCategory(category);
                      setNewCategory(category.name);
                    }}
                    className="mr-2 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-sm font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
        )}
      </ul>
    </div>
  );
};

export default CategoryManagement;
