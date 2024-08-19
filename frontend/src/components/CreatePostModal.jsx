
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog";

const CreatePostModal = ({open, setOpen}) => {
  return (
    <Dialog open={open}>
        <DialogContent>
            Hello am zaheer
        </DialogContent>
    </Dialog>
  )
}

export default CreatePostModal