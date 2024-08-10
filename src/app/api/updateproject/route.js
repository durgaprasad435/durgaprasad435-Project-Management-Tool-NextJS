import { NextResponse } from "next/server";
import { db } from "../../../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { GET } from "../allprojects/route";
export async function PUT(request, response) {
  try {
    var body = await request.json();
    const updateRef = doc(db, "projects", body.projectId);
    await updateDoc(updateRef, body);
    return await GET();
  } catch (error) {
    console.log(error);
  }
}
