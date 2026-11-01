import { redirect } from "next/navigation";

// The meal plan moved to its own tab at /meals; old links land there.
export default function Page() {
  redirect("/meals");
}
