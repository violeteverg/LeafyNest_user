import { useEffect, useState } from "react";

export default function useSnap() {
  const [snap, setSnap] = useState(null);
  useEffect(() => {
    const myMidtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY || "";
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", myMidtransClientKey);
    script.async = true;
    script.onload = () => {
      const snap = window.snap;
      if (snap) {
        setSnap(snap);
      } else {
        console.error("Snap object not found");
      }
    };
    script.onerror = () => {
      console.error("Error loading Snap script");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const snapEmbed = (snapToken, embedId, action) => {
    if (snap) {
      snap.embed(snapToken, {
        embedId,
        onSuccess: function (result) {
          action.onSuccess(result);
        },
        onPending: function (result) {
          action.onPending(result);
        },
        onClose: function () {
          action.onClose();
        },
      });
    } else {
      console.error("Snap object is not available");
    }
  };

  return { snapEmbed };
}
