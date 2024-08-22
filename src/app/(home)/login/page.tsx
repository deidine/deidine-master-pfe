import React from 'react'
import AuthPage from '@/components/authComponent/AuthPage'

export default function page() {
    return (
        <div className="flex overflow-hidden  overscroll-none flex-row items-center justify-center h-[94vh] w-full relative">
          <AuthPage />
        </div>
      );
}
