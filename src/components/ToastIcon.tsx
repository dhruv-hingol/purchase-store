"use client";
import Image from "next/image";
import alertIcon from "../assets/icons/alert-circle.svg";
import CheckCircleIcon from "../assets/icons/check_circle.svg";
export const renderIcon = ({ type }: { type: string }) =>
  type === "error" ? (
    <Image src={alertIcon} alt="alert icon" />
  ) : (
    <Image src={CheckCircleIcon} alt="success icon" />
  );
