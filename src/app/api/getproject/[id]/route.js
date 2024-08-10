import { NextResponse } from "next/server";
import { db } from "../../../../firebase/config";
import { doc, getDoc, collection } from "firebase/firestore";
export async function GET(request, response) {
  try {
    var projectId = await request.url.split("/getproject/")[1];
    const getprojectRef = await getDoc(doc(db, "projects", projectId));
    if (getprojectRef.exists()) {
      return NextResponse.json({
        data: getprojectRef.data(),
      });
    } else {
      return NextResponse.json({
        data: "No such document!",
      });
    }
  } catch (err) {
    console.log(err);
  }
}
