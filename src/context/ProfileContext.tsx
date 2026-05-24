"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { StudentProfile } from "@/types";

const STORAGE_KEY = "aivisor-profile";

interface ProfileContextValue {
  profile: StudentProfile | null;
  setProfile: (profile: StudentProfile) => void;
  clearProfile: () => void;
  loaded: boolean;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<StudentProfile | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setProfileState(JSON.parse(stored) as StudentProfile);
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  const setProfile = useCallback((p: StudentProfile) => {
    setProfileState(p);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  }, []);

  const clearProfile = useCallback(() => {
    setProfileState(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile, clearProfile, loaded }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}
