import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  serverTimestamp
} from "firebase/firestore";
import { db } from "./firebase";

// ===== JOBS =====

// Fetch all jobs for user
export async function getJobs(uid) {
  const ref = collection(db, "users", uid, "jobs");
  const snap = await getDocs(ref);

  return snap.docs.map(d => ({
    id: d.id,
    ...d.data()
  }));
}

// Add new job
export async function addJob(uid, job) {
  const ref = collection(db, "users", uid, "jobs");
  await addDoc(ref, {
    ...job,
    createdAt: serverTimestamp()
  });
}

// Delete job
export async function deleteJob(uid, jobId) {
  const ref = doc(db, "users", uid, "jobs", jobId);
  await deleteDoc(ref);
}

// ===== IMPORTANT DATES =====

export async function getImportantDates(uid) {
  const ref = collection(db, "users", uid, "importantDates");
  const snap = await getDocs(ref);

  return snap.docs.map(d => ({
    id: d.id,
    ...d.data()
  }));
}

export async function addImportantDate(uid, date) {
  const ref = collection(db, "users", uid, "importantDates");
  await addDoc(ref, {
    ...date,
    createdAt: serverTimestamp()
  });
}

export async function deleteImportantDate(uid, dateId) {
  const ref = doc(db, "users", uid, "importantDates", dateId);
  await deleteDoc(ref);
}
