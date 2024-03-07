"use client";

import { useRouter } from "next/navigation";
import { useStackApp } from "..";
import MessageCard from "./MessageCard";
import Button from "./Button";

export default function RedirectMessageCard({ 
  type,
  fullPage=false,
}: { 
  type: 'signedIn' | 'signedOut' | 'emailSent' | 'passwordReset' | 'emailVerified',
  fullPage?: boolean, 
}) {
  const stackApp = useStackApp();
  const router = useRouter();

  let title: string;
  let url: string;
  let message: string | null = null;
  let primaryButton: string;
  let secondaryButton: string | null = null;
  switch (type) {
    case 'signedIn': {
      title = "You are already signed in";
      message = 'You are already signed in.';
      url = stackApp.urls.signOut;
      primaryButton = "Go to Home";
      secondaryButton = "Sign Out";
      break;
    }
    case 'signedOut': {
      title = "You are not currently signed in.";
      url = stackApp.urls.home;
      primaryButton = "Go to Home";
      break;
    }
    case 'emailSent': {
      title = "Email sent!";
      message = 'Please check your inbox. Make sure to check your spam folder.';
      url = stackApp.urls.home;
      primaryButton = "Go to Home";
      break;
    }
    case 'passwordReset': {
      title = "Password reset successfully!";
      message = 'Your password has been reset. You can now sign in with your new password.';
      url = stackApp.urls.signIn;
      primaryButton = "Go to Sign In";
      break;
    }
    case 'emailVerified': {
      title = "Email verified!";
      message = 'Your have successfully verified your email.';
      url = stackApp.urls.home;
      primaryButton = "Go to Home";
      break;
    }
  }

  return (
    <MessageCard title={title} fullPage={fullPage}>
      {message && <p className='wl_mb-8'>{message}</p>}

      <div className='wl_flex wl_flex-row wl_align-center wl_justify-center wl_gap-4'>
        {secondaryButton && (
          <Button
            className='wl_btn_ghost'
            onClick={() => router.push(stackApp.urls.signOut.toString())}
          >
            {secondaryButton}
          </Button>
        )}
        
        <Button
          className='wl_btn wl_btn-primary'
          onClick={() => router.push(url.toString())}
        >
          {primaryButton}
        </Button>
      </div>
    </MessageCard>
  );
}
