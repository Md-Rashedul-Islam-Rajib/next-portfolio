'use client'
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/react/dist/iconify.js'

import { signIn } from 'next-auth/react'
import React from 'react'

const DashboardLogin = () => {
    
  return (
    <div>
      <div className="flex flex-col gap-4 w-40 mx-auto mt-40">
        <Button
          onClick={() =>
            signIn("google",
              { callbackUrl: 'https://nextport-server.vercel.app/dashboard' }
            )
          }
          className="bg-gray-800"
        >
          <Icon icon="devicon:google" width="128" height="128" />
          Sign in with Google
        </Button>
        <Button
          onClick={() =>
            signIn("github",
              {
              callbackUrl: "https://nextport-server.vercel.app/dashboard",
            }
            )
          }
          className="bg-gray-800"
        >
          <Icon icon="line-md:github-loop" width="24" height="24" />
          Sign in with GitHub
        </Button>
      </div>
    </div>
  );
}

export default DashboardLogin
