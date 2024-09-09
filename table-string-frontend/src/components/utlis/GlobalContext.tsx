import { createContext, ReactNode, useEffect, useState } from "react";
import {
  getAllCategory,
  getAllProducts,
  getAllSubCategory,
} from "../services/categoryservices";

interface CategoryProps {
  _id: string;
  category_name: string;
  category_sequence: number;
  category_image: string;
}

interface GlobalContextProps {
  allCategory: CategoryProps[];
  allSubcategory: any[];
  allProducts: any[];
  isLoading: boolean;
  setAllCategory: React.Dispatch<React.SetStateAction<CategoryProps[]>>;
  setAllSubcategory: React.Dispatch<React.SetStateAction<any[]>>;
  setAllProducts: React.Dispatch<React.SetStateAction<any[]>>;
  fetchCategory: () => Promise<void>;
  fetchSubCategory: () => Promise<void>;
  fetchAllProducts: () => Promise<void>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalContext = createContext<GlobalContextProps | null>(null);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [allCategory, setAllCategory] = useState<CategoryProps[]>([]);
  const [allSubcategory, setAllSubcategory] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);

  const [isLoading, setLoading] = useState(false);
  const fetchCategory = async () => {
    try {
      setLoading(true);
      await getAllCategory()
        .then((res) => {
          const data = res.data;

          setAllCategory(data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  };

  const fetchSubCategory = async () => {
    try {
      setLoading(true);
      await getAllSubCategory()
        .then((res) => {
          const data = res.data;

          setAllSubcategory(data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  };

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      await getAllProducts()
        .then((res) => {
          const data = res.data;

          setAllProducts(data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchSubCategory();
    fetchAllProducts();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        allCategory,
        allSubcategory,
        allProducts,
        isLoading,
        setAllProducts,
        setAllCategory,
        setAllSubcategory,
        fetchCategory,
        fetchSubCategory,
        fetchAllProducts,
        setLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
