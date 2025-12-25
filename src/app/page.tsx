import { getUserService } from "@/services/user.service";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const { data } = await getUserService();

  if (!data.user) redirect("/login");
  redirect("/chat");
};

export default HomePage;
