import { IProfile } from "@/app/interfaces/IProfile";

import "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export default class ProfileServices {
  public firebaseInstance;
  public firestore;

  constructor(firebaseInstance: firebase.app.App) {
    this.firebaseInstance = firebaseInstance;
    this.firestore = firebaseInstance.firestore();
  }

  async fetchProfile(uid: string): Promise<any> {
    try {
      const profileDoc = await this.firestore
        .collection("profiles")
        .doc(uid)
        .get();

      if (profileDoc.exists) {
        return { uid, ...profileDoc.data() };
      } else {
        console.log("No such profile exists!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  }

  async addOrUpdateProfile(profile: IProfile): Promise<void> {
    try {
      const doc = this.firestore.collection("profiles").doc(profile.uid);
      await doc.set({ ...profile, id: doc.id }, { merge: true });
      console.log("Profile added or updated successfully");
    } catch (error) {
      console.error("Error adding or updating profile:", error);
      throw error;
    }
  }

  async updateProfile(profile: IProfile): Promise<void> {
    try {
      await this.firestore
        .collection("profiles")
        .doc(profile.uid)
        .update(profile);
      console.log("Profile  updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  }
}
