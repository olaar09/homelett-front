"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FirebaseContext from "./FirebaseContext";
import { message } from "antd";
import { IProfile } from "@/app/interfaces/IProfile";
import APIService from "@/services/APIService";
import APIUtil from "@/services/APIUtil";
import { IAuthRequest } from "@/app/interfaces/IRegisterRequest";
import { AxiosError } from "axios";
import { IDataSourceItem } from "@/app/interfaces/IDatasourceItem";

interface ChatContext {
  scrollToBottom?: () => void;
}

export const ChatContext = createContext<ChatContext>({
  scrollToBottom: async () => {},
});

export const useAuth = () => useContext(ChatContext);
