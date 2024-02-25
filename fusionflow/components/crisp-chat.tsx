"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("64b1e64e-61a4-4386-ad58-e435011da5d7");
  }, []);

  return null;
};