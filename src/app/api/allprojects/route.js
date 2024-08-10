import { NextResponse } from "next/server";
import { db } from "../../../firebase/config";
import { getDocs, collection } from "firebase/firestore";
export async function GET(request, response) {
  try {
    const projectRef = await getDocs(collection(db, "projects"));
    var allProjects = [];
    projectRef.forEach((doc) => {
      allProjects.push({ id: doc.id, ...doc.data() });
    });
    return NextResponse.json({
      data: allProjects,
    });
  } catch (error) {
    console.log(error);
  }
}
