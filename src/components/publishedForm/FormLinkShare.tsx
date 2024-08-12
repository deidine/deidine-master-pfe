"use client";

import { Button, Input, notification } from "antd";
import React, { useEffect, useState } from "react";
import { ImShare } from "react-icons/im";

function FormLinkShare({ shareUrl }: { shareUrl: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // avoiding window not defined error
  }

  const shareLink = `${shareUrl}`;

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        toast({
          title: "Copied!",
          description: "Link copied to clipboard",
        });
      }).catch((error) => {
        console.error("Failed to copy: ", error);
        toast({
          title: "Failed to copy",
          description: "Could not copy to clipboard",
        });
      });
    } else {
      // Fallback for non-supported environments
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        toast({
          title: "Copied!",
          description: "Link copied to clipboard",
        });
      } catch (error) {
        console.error("Failed to copy: ", error);
        toast({
          title: "Failed to copy",
          description: "Could not copy to clipboard",
        });
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };

  function toast({ title, description }: { title: string; description: string }) {
    notification.open({
      message: title,
      description: description,
    });
  }

  return (
    <div className="flex flex-grow gap-4 items-center">
      {/* <Input value={shareLink} readOnly /> */}
      <Button 
        onClick={() => {
          copyToClipboard(shareLink);
        }}
      >
        <ImShare className="mr-2 h-4 w-4" />
        Share link
      </Button>
    </div>
  );
}

export default FormLinkShare;
