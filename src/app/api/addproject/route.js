import { NextResponse } from "next/server";
import { db } from "../../../firebase/config";
import { setDoc, doc } from "firebase/firestore";
import { GET } from "../allprojects/route";
import { uuid } from "uuidv4";
export async function POST(request, response) {
  try {
    var body = await request.json();
    var id = uuid();
    body.projectId = id;
    const docRef = await setDoc(doc(db, "projects", id), body);
    return await GET();
  } catch (err) {
    console.log(err);
  }
}
