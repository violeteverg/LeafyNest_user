import { clsx } from "clsx";
import { jwtVerify } from "jose";
import Cookies from "js-cookie";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getJwtSecretKey = () => {
  const secret = import.meta.env.VITE_JWT_SECRET;

  if (!secret || secret.length === 0) {
    throw new Error("The environment variable JWT_SECRET_KEY is not set");
  }
  return secret;
};
export const getToken = () => {
  return Cookies.get("_UserTkn");
};

export const checkToken = async () => {
  const token = Cookies.get("_UserTkn");

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    );

    return payload.name;
  } catch (error) {
    console.error("Gagal memverifikasi token:", error);
    return null;
  }
};

export const getUser = async () => {
  try {
    const token = Cookies.get("_UserTkn");

    if (!token) {
      return null;
    }

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    );
    return {
      id: payload?.id,
      userName: payload?.userValue?.userName,
      email: payload?.userValue?.email,
    };
  } catch (error) {
    console.error("Failed to get user:", error);
    return null;
  }
};

export function calculateTotalSummary(cartItems) {
  // const isArray = Array.isArray(cartItems);
  // const items = isArray ? cartItems : [cartItems];

  return cartItems.reduce(
    (acc, item) => {
      const productPrice = item?.price ?? item?.Product?.price ?? 0;
      acc.totalQuantity += item.quantity || 1;
      acc.totalPrice += (item.quantity || 1) * productPrice;
      return acc;
    },
    { totalQuantity: 0, totalPrice: 0 }
  );
}

export function setSessionStorage(key, value) {
  const item = {
    ...value,
  };
  sessionStorage.setItem(key, JSON.stringify(item));
}

export function getSessionStorageItem(key, _isBuyNow) {
  const itemStr = sessionStorage?.getItem(key);
  if (!itemStr) return null;
  if (key === "_buyagain") {
    const data = JSON.parse(itemStr);
    return data;
  }
  const { index: productId, isBuyNow, quantity, expired } = JSON.parse(itemStr);
  if (Date.now() > expired || _isBuyNow) {
    sessionStorage.removeItem(key);
    return _isBuyNow ? { productId, isBuyNow } : null;
  }

  return { productId, isBuyNow, quantity };
}

export function formatDate(isoDate) {
  return new Date(isoDate).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function generateAvatar(username) {
  return username ? username.slice(0, 2).toUpperCase() : "US";
}
export function formatPrice(price) {
  const numericPrice = typeof price === "string" ? parseInt(price) : price;

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",

    maximumFractionDigits: 0,
  }).format(numericPrice);
}

export function calculateAverageRating(reviews) {
  if (!reviews || reviews.length === 0) {
    return 0;
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;

  return parseFloat(averageRating.toFixed(2));
}
