import { UserProps } from "@/components/shared/home/Navbar";
import { authOptions } from "@/utilities/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";

const Dashboard = async () => {
  const session: UserProps | null = await getServerSession(authOptions);

  return (
    <div className="flex flex-col items-center mt-20 min-h-screen">
      

      {session ? (
        <>
          <p className="text-3xl font-bold mb-6">
            Welcome, {session.user?.name}
          </p>
          {session.user?.image && (
            <Image
              src={session.user.image}
              width={500}
              height={500}
              alt="User Avatar"
              className="w-16 h-16 rounded-full my-3"
            />
          )}
        </>
      ) : (
        <p className="text-lg text-red-500">Not logged in</p>
      )}
    </div>
  );
};

export default Dashboard;
